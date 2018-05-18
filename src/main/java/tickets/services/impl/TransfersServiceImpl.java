package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tickets.dao.TransfersRepository;
import tickets.entities.po.AccountPO;
import tickets.entities.po.TransferPO;
import tickets.entities.vo.from_views.PayNowVO;
import tickets.services.AccountsService;
import tickets.services.TransfersService;

/**
 * Created by a297 on 18/3/20.
 */
@Service
public class TransfersServiceImpl implements TransfersService {
    @Autowired
    private AccountsService accountsService;
    @Autowired
    private TransfersRepository transfersRepository;

    @Override
    public String transferToManagers(PayNowVO payNowVO) {

        /**
         * 1、账户有没有？
         * 2、账户密码对不对？
         * 3、余额够不够？
         * 4、-->    1）扣余额  2）tickets经理加钱   3）生成转账记录
         */

        AccountPO accountPO = accountsService.loadAccountByAccountId(payNowVO.getAccountId());
        if (accountPO != null) {
            if (accountPO.getAccountPsw().equals(payNowVO.getAccountPsw())) {
                double yuE = accountPO.getYuE();
                double totalCost = Double.valueOf(payNowVO.getTotalCost());
                if (yuE >= totalCost) {
                    // 扣款
                    accountsService.deduct(accountPO, totalCost);
                    // 转给经理
                    accountsService.addToManager(totalCost);
                    // 生成转账记录
                    String managerAccountId = accountsService.getManagerAccountId();

                    TransferPO transferPO = new TransferPO();
                    transferPO.setPayerAccountId(accountPO.getAccountId());
                    transferPO.setReceiverAccountId(managerAccountId);
                    transferPO.setMoney(totalCost);
                    transferPO.setPaymentType(payNowVO.getPaymentType());

                    transfersRepository.save(transferPO);
                    return "success; 支付成功，请线下使用。";
                } else {
                    return "failure; 余额不足，请切换支付方式。";
                }
            } else {
                return "failure; 支付密码错误，请重新输入。";
            }
        } else {
            return "failure; 该账户不存在, 请输入正确账户。";
        }
    }

    @Override
    public void transferToUser(String userAccount, double moneyBack, int paymentType) {
        AccountPO accountPO = accountsService.loadAccountByAccountId(accountsService.getManagerAccountId());
        // 默认经理钱够
        accountsService.deduct(accountPO, moneyBack);
        accountsService.addToUser(userAccount, moneyBack);
        // 生成转账记录
        TransferPO transferPO = new TransferPO();
        transferPO.setPayerAccountId(accountsService.getManagerAccountId());
        transferPO.setReceiverAccountId(userAccount);
        transferPO.setMoney(moneyBack);
        transferPO.setPaymentType(paymentType);
        transfersRepository.save(transferPO);

    }

    @Override
    public String transfer(String payerAccountId, String psw, int type, String receiverAccountId, double money) {
        AccountPO payerAccountPO = accountsService.loadAccountByAccountId(payerAccountId);
        if (payerAccountPO != null) {
            if (payerAccountPO.getAccountPsw().equals(psw)) {
                double yuE = payerAccountPO.getYuE();
                if (yuE >= money) {
                    // 扣款
                    accountsService.deduct(payerAccountPO, money);
                    // 转
                    accountsService.add(receiverAccountId, money);
                    // 生成转账记录
                    TransferPO transferPO = new TransferPO();
                    transferPO.setPayerAccountId(payerAccountId);
                    transferPO.setReceiverAccountId(receiverAccountId);
                    transferPO.setMoney(money);
                    transferPO.setPaymentType(type);

                    transfersRepository.save(transferPO);
                    return "success; 支付成功。";
                } else {
                    return "failure; 余额不足，请切换支付方式。";
                }

            }
            else {
                return "failure; 支付密码错误，请重新输入。";
            }
        }
        else {
            return "failure; 无转账方账户记录";
        }
    }

}

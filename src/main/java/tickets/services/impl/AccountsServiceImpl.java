package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tickets.dao.AccountsRepository;
import tickets.entities.po.AccountPO;
import tickets.services.AccountsService;

/**
 * Created by a297 on 18/3/20.
 */
@Service
public class AccountsServiceImpl implements AccountsService {
    @Autowired
    private AccountsRepository accountsRepository;

    private static final String managerAccountId = "2";

    @Override
    public AccountPO loadAccountByAccountId(String accountId) {
        return accountsRepository.findByAccountId(accountId);
    }

    @Override
    public String getManagerAccountId() {
        return managerAccountId;
    }

    @Override
    @Transactional
    @Modifying
    public void deduct(AccountPO accountPO, double totalCost) {
     AccountPO payer = accountsRepository.findByAccountId(accountPO.getAccountId());
        double yuE = payer.getYuE();
        yuE -= totalCost;
        payer.setYuE(yuE);
    }

    @Override
    @Transactional
    @Modifying
    public void addToManager(double totalCost) {
        AccountPO managerAccount = accountsRepository.findByAccountId(managerAccountId);
        double yuE = managerAccount.getYuE();
        yuE += totalCost;
        managerAccount.setYuE(yuE);
    }

    @Override
    @Transactional
    @Modifying
    public void addToUser(String userAccount, double moneyBack) {
        AccountPO accountPO = accountsRepository.findByAccountId(userAccount);
        double yuE = accountPO.getYuE();
        yuE += moneyBack;
        accountPO.setYuE(yuE);
    }

    @Override
    @Transactional
    @Modifying
    public void add(String receiverAccountId, double money) {
        AccountPO payer = accountsRepository.findByAccountId(receiverAccountId);
        if (receiverAccountId != null) {
            double yuE = payer.getYuE();
            yuE += money;
            payer.setYuE(yuE);
        }
    }
}

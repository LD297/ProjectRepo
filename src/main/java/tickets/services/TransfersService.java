package tickets.services;

import tickets.entities.vo.from_views.PayNowVO;

/**
 * Created by a297 on 18/3/20.
 */
public interface TransfersService {
    String transferToManagers(PayNowVO payNowVO);

    void transferToUser(String UserAccount, double moneyBack, int paymentType);

    String transfer(String payerAccountId, String psw, int type, String receiverAccountId, double money);
}

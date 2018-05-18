package tickets.services;

import tickets.entities.po.AccountPO;

/**
 * Created by a297 on 18/3/20.
 */
public interface AccountsService {
    AccountPO loadAccountByAccountId(String accountId);

    String getManagerAccountId();

    void deduct(AccountPO accountPO, double totalCost);

    void addToManager(double totalCost);

    void addToUser(String userAccount, double moneyBack);

    void add(String receiverAccountId, double money);

}

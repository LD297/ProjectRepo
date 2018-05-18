package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.AccountPO;

/**
 * Created by a297 on 18/3/16.
 */
public interface AccountsRepository extends JpaRepository<AccountPO, String> {
    AccountPO findByAccountId(String accountId);

}

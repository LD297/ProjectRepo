package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.TransferPO;

import java.util.List;

/**
 * Created by a297 on 18/3/16.
 */
public interface TransfersRepository extends JpaRepository<TransferPO, Integer> {
    List<TransferPO> findByReceiverAccountId(String accountId);

    List<TransferPO> findByPayerAccountId(String accountId);

}

package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.OrderPO;

import java.util.List;

/**
 * Created by a297 on 18/3/16.
 */
public interface OrdersRepository extends JpaRepository<OrderPO, String> {
    List<OrderPO> findByUserEmail(String email);

    OrderPO findById(String id);

    List<OrderPO> findByShowId(int showId);

    List<OrderPO> findByStatus(int i);
}

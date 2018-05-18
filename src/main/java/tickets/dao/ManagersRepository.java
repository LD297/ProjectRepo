package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.ManagerPO;

/**
 * Created by a297 on 18/3/12.
 */
public interface ManagersRepository extends JpaRepository<ManagerPO, String> {
    ManagerPO findById(String id);
    ManagerPO findByToken(String token);

}

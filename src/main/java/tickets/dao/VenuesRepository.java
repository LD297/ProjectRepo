package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.VenuePO;

import java.util.List;

/**
 * Created by a297 on 18/3/9.
 */
public interface VenuesRepository extends JpaRepository<VenuePO, String> {
    VenuePO findById(String id);
    VenuePO findByToken(String token);
    List findByUsed(int used);
}

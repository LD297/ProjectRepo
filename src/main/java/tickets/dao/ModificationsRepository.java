package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.ModificationPO;

/**
 * Created by a297 on 18/3/30.
 */
public interface ModificationsRepository extends JpaRepository<ModificationPO, String> {
    ModificationPO findByVenueId(String id);
}

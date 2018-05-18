package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.ShowPO;

import java.util.List;

/**
 * Created by a297 on 18/3/14.
 */
public interface ShowsRepository extends JpaRepository<ShowPO, Integer>{
    List findByVenueId(String id);
    ShowPO findById(int showId);
    List<ShowPO> findByType(String showType);
    List<ShowPO> findByBalanced(int i);
}

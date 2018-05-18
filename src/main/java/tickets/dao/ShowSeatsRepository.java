package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.ShowSeatPO;

import java.util.List;

/**
 * Created by a297 on 18/3/16.
 */
public interface ShowSeatsRepository extends JpaRepository<ShowSeatPO, Integer> {
    List<ShowSeatPO> findByShowId(int showId);

    ShowSeatPO findById(int id);

}

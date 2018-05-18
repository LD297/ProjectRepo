package tickets.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tickets.entities.po.TicketPO;

import java.util.List;

/**
 * Created by a297 on 18/3/28.
 */
public interface TicketsRepository extends JpaRepository<TicketPO, String> {
    TicketPO findByTicketId(String id);

    List<TicketPO> findByShowId(int showId);
}

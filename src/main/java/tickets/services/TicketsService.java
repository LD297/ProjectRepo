package tickets.services;

import tickets.entities.po.TicketPO;
import tickets.entities.vo.from_views.CheckTicketsLiveVO;

import java.util.List;

/**
 * Created by a297 on 18/3/28.
 */
public interface TicketsService {
    String createTicket(String orderId, int showId, int online);

    String getTicketStatuses(String ticketIds);

    String checkTicketsLive(CheckTicketsLiveVO checkTicketsLiveVO);

    int getTicketNumber(String venueId, int showId);

    int getTotalTicketNumber(int showId);

    List<TicketPO> getTicketsByShowId(int showId);
}

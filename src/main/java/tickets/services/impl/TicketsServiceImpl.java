package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tickets.constants.JsonResult;
import tickets.dao.TicketsRepository;
import tickets.entities.po.OrderPO;
import tickets.entities.po.TicketPO;
import tickets.entities.vo.from_views.CheckTicketsLiveVO;
import tickets.services.OrdersService;
import tickets.services.TicketsService;

import java.util.List;

/**
 * Created by a297 on 18/3/28.
 */
@Service
public class TicketsServiceImpl implements TicketsService {
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private TicketsRepository ticketsRepository;

    @Override
    public String createTicket(String orderId, int showId, int online) {
        TicketPO ticketPO = new TicketPO();
        String id = String.valueOf(System.currentTimeMillis());
        ticketPO.setTicketId(id);
        ticketPO.setShowId(showId);
        ticketPO.setChecked(0);
        ticketPO.setOrderId(orderId);
        ticketPO.setOnline(online);
        ticketsRepository.save(ticketPO);
        return id;
    }

    /**
     * 有可能是空串(陪票前)
     */
    @Override
    public String getTicketStatuses(String ticketIds) {
        String[] ids = ticketIds.split(";");
        System.out.println(" ids: " + ids);
        String statuses = "";
        if (ids.length > 0) {
            for (String id: ids) {
                TicketPO ticketPO = ticketsRepository.findByTicketId(id);
                if (ticketPO != null) {
                    int checked = ticketPO.getChecked();
                    if (checked == 0) {
                        statuses += "未使用;";
                    }
                    else if (checked == 1) {
                        statuses += "已使用;";
                    }
                }
            }
        }
        return statuses;
    }

    @Override
    @Transactional
    @Modifying
    public String checkTicketsLive(CheckTicketsLiveVO checkTicketsLiveVO) {
        String ticketNumber = checkTicketsLiveVO.getTicketNumber();
        TicketPO ticketPO = ticketsRepository.findByTicketId(ticketNumber);
        if (ticketPO != null) {
            int showId = checkTicketsLiveVO.getShowId();
            if (showId == ticketPO.getShowId()){
                int checked = ticketPO.getChecked();
                if (checked == 0) {
                    ticketPO.setChecked(1);
                    return JsonResult.buildResult("success", "检票成功！");
                }
                else {
                    return JsonResult.buildResult("failure", "该票已被使用！");
                }
            }
            else {
                return JsonResult.buildResult("failure", "非该场演出票！");
            }
        }
        else {
            return JsonResult.buildResult("failure", "查无此票！");
        }
    }

    @Override
    public int getTicketNumber(String venueId, int showId) {
        // 所有票（线上＋线下）
        List<TicketPO> ticketPOs = ticketsRepository.findByShowId(showId);
        int number = 0;
        for (TicketPO ticketPO: ticketPOs) {
            String orderId = ticketPO.getOrderId();
            OrderPO orderPO = ordersService.getOrderById(orderId);
            if (!orderPO.getUserEmail().equals(venueId)) {
                number += 1;
            }
        }
        return number;
    }

    @Override
    public int getTotalTicketNumber(int showId) {
        List<TicketPO> ticketPOs = ticketsRepository.findByShowId(showId);
        return ticketPOs.size();
    }

    @Override
    public List<TicketPO> getTicketsByShowId(int showId) {
        return ticketsRepository.findByShowId(showId);
    }
}

package tickets.services;

import tickets.entities.po.OrderPO;
import tickets.entities.po.UserPO;
import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.GenMemberOrderVO;
import tickets.entities.vo.from_views.GenOrderVO;
import tickets.entities.vo.from_views.PayNowVO;
import tickets.entities.vo.to_views.MyOrderVO;

import java.util.List;

/**
 * Created by a297 on 18/3/16.
 */
public interface OrdersService {
    void genOrder(UserPO userPO, GenOrderVO genOrderVO);

    List<MyOrderVO> getOrdersByUserEmail(String email);

    String payNow(PayNowVO payNowVO, UserPO userPO);

    String cancelOrder(UserPO userPO, String orderId);

    String refund(UserPO userPO, String orderId);

    void genOrderLive(VenuePO venuePO, GenOrderVO genOrderVO);

    void genMemberOrderLive(VenuePO venuePO, GenMemberOrderVO genMemberOrderVO);

    OrderPO getOrderById(String orderId);

    double getBalanceMoney(int showId, String venueId);

    List<OrderPO> getOrdersByShowId(int showId);
}

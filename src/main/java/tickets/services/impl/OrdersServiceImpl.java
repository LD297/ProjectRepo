package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tickets.constants.JsonResult;
import tickets.dao.OrdersRepository;
import tickets.dao.ShowSeatsRepository;
import tickets.entities.po.OrderPO;
import tickets.entities.po.ShowSeatPO;
import tickets.entities.po.UserPO;
import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.GenMemberOrderVO;
import tickets.entities.vo.from_views.GenOrderVO;
import tickets.entities.vo.from_views.PayNowVO;
import tickets.entities.vo.to_views.MyOrderVO;
import tickets.entities.vo.to_views.ShowDetailsVO;
import tickets.services.*;
import tickets.utils.DataFormatUtil;
import tickets.utils.MembershipUtil;
import tickets.utils.TimeUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by a297 on 18/3/19.
 * 1、下单
 * 2、付款
 * 3、配票
 * 4、生成票号
 */
@Service
public class OrdersServiceImpl implements OrdersService {
    @Autowired
    private ShowSeatsService showSeatsService;
    @Autowired
    private ShowsService showsService;
    @Autowired
    private TransfersService transfersService;
    @Autowired
    private UsersService usersService;
    @Autowired
    private TicketsService ticketsService;
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ShowSeatsRepository showSeatsRepository;

    private static final double PROFIT_PERCENTAGE = 0.7;

    @Override
    @Transactional
    @Modifying
    public void genOrder(UserPO userPO, GenOrderVO genOrderVO) {
        int showId = genOrderVO.getShowId();
        String venueId = showsService.getVenueIdByShowId(showId);
        OrderPO orderPO = new OrderPO();
        String orderId = System.currentTimeMillis() + "";
        orderPO.setId(orderId);
        orderPO.setUserEmail(userPO.getEmail());
        orderPO.setShowId(showId);
        orderPO.setVenueId(venueId);
        orderPO.setStatus(0);
        String buyMethod = genOrderVO.getBuyMethod();
        orderPO.setBuyMethod(buyMethod);
        if ("SELECT_SEATS".equals(buyMethod)) {
            // 选座购买
            String showSeatIds = showSeatsService.getShowSeatIds(showId, genOrderVO.getSeatsCoordinate());
            orderPO.setShowSeatIds(showSeatIds);
            /**
             * 修改座位信息（可售-->锁定）
             */
            String[] ids = showSeatIds.split(";");
            for (String id : ids) {
                showSeatsService.changeStatus(Integer.valueOf(id), 2);
            }
        } else {
            // 立即购买
            assert buyMethod.equals("BUY_NOW");
            orderPO.setPrice(genOrderVO.getPrice());
            orderPO.setNum(genOrderVO.getNum());
        }
        orderPO.setTicketIds("");
        orderPO.setTotalCost(genOrderVO.getCost());
        orderPO.setOrderTime(TimeUtil.getCurrentTime());

        ordersRepository.save(orderPO);

        if (!genOrderVO.getSelectCoupon().equals("")) {
            // 修改优惠券信息
            String myCoupons = userPO.getCoupons();
            System.out.println(" my old coupons: " + myCoupons);
            String removeStr = genOrderVO.getSelectCoupon() + ";";
            System.out.println(" remove Str: " + removeStr);
            String newCoupons = myCoupons.replace(removeStr, "");
            System.out.println(" my new coupons: " + newCoupons);
            userPO.setCoupons(newCoupons);
        }
    }

    @Override
    public void genOrderLive(VenuePO venuePO, GenOrderVO genOrderVO) {
        OrderPO orderPO = new OrderPO();

        String orderId = System.currentTimeMillis() + "";
        orderPO.setId(orderId);
        /**
         * 线下购买，用户邮箱：场馆id
         */
        orderPO.setUserEmail(venuePO.getId());
        orderPO.setShowId(genOrderVO.getShowId());
        orderPO.setVenueId(venuePO.getId());
        orderPO.setStatus(2);
        orderPO.setBuyMethod(genOrderVO.getBuyMethod());
        // 选座购买
        String showSeatIds = showSeatsService.getShowSeatIds(genOrderVO.getShowId(), genOrderVO.getSeatsCoordinate());
        orderPO.setShowSeatIds(showSeatIds);
        /**
         * 修改座位信息（可售-->锁定）
         * 添加票务信息
         */
        String[] ids = showSeatIds.split(";");
        String ticketIds = "";
        for (String id : ids) {
            showSeatsService.changeStatus(Integer.valueOf(id), 1);
            String ticketId = ticketsService.createTicket(orderPO.getId(), orderPO.getShowId(), 0);
            ticketIds += ticketId;
            ticketIds += ";";
        }
        orderPO.setTicketIds(ticketIds);
        orderPO.setTotalCost(genOrderVO.getCost());
        orderPO.setOrderTime(TimeUtil.getCurrentTime());

        ordersRepository.save(orderPO);
    }

    @Override
    public void genMemberOrderLive(VenuePO venuePO, GenMemberOrderVO genMemberOrderVO) {
        double finalCost = genMemberOrderVO.getFinalCost();
        String costStr = String.valueOf(finalCost);
        GenOrderVO o = new GenOrderVO();
        o.setShowId(genMemberOrderVO.getShowId());
        o.setBuyMethod(genMemberOrderVO.getBuyMethod());
        o.setSeatsCoordinate(genMemberOrderVO.getSeatsCoordinate());
        o.setPrice(genMemberOrderVO.getPrice());
        o.setNum(genMemberOrderVO.getNum());
        o.setSelectCoupon(genMemberOrderVO.getSelectCoupon());
        o.setCost(costStr);

        genOrderLive(venuePO, o);

        // 修改会员消费金额
        usersService.changeConsumption(
                genMemberOrderVO.getUserEmail(),
                '+',
                finalCost
        );
        // 修改会员积分
        int points = MembershipUtil.getMembershipPointByConsumption(costStr);
        usersService.changeMembershipPoint(
                genMemberOrderVO.getUserEmail(),
                '+',
                points
        );

    }

    @Override
    public OrderPO getOrderById(String orderId) {
        return ordersRepository.findById(orderId);
    }

    @Override
    public double getBalanceMoney(int showId, String venueId) {
        List<OrderPO> orderPOs = ordersRepository.findByShowId(showId);
        double moneyToBalance = 0;
        for (OrderPO orderPO : orderPOs) {
            assert orderPO.getStatus() != 1; // 不能说演出结束了还待配票
            if (!orderPO.getUserEmail().equals(venueId)) {
                // 线上用户购买, 已完成／已使用
                if (orderPO.getStatus() == 2) {
                    double cost = Double.valueOf(orderPO.getTotalCost());
                    moneyToBalance += cost;
                }
            }
        }
        return moneyToBalance * PROFIT_PERCENTAGE;
    }

    @Override
    public List<OrderPO> getOrdersByShowId(int showId) {
        return ordersRepository.findByShowId(showId);
    }

    @Override
    public List<MyOrderVO> getOrdersByUserEmail(String email) {
        List<OrderPO> orderPOs = ordersRepository.findByUserEmail(email);
        List myOrderVOs = new ArrayList(orderPOs.size());
        for (OrderPO orderPO : orderPOs) {
            MyOrderVO myOrderVO = new MyOrderVO();

            myOrderVO.setOrderId(orderPO.getId());
            myOrderVO.setStatus(orderPO.getStatus());

            int showId = orderPO.getShowId();
            ShowDetailsVO showDetailsVO = showsService.getShowDetails(showId);

            myOrderVO.setShowId(showDetailsVO.getShowId());
            myOrderVO.setDescription(showDetailsVO.getDescription());
            myOrderVO.setShowTime(showDetailsVO.getShowTime());
            myOrderVO.setAddress(showDetailsVO.getAddress());
            myOrderVO.setPosterUrl(showDetailsVO.getPosterUrl());

            myOrderVO.setBuyMethod(orderPO.getBuyMethod());
            if (orderPO.getStatus() == 2 || orderPO.getBuyMethod().equals("SELECT_SEATS")) {
                // 已配票
                String showSeatIds = orderPO.getShowSeatIds();
                String seatsCoordinate = showSeatsService.getSeatsCoordinate(showSeatIds);
                myOrderVO.setSeatsCoordinate(seatsCoordinate);
            }

            myOrderVO.setPrice(orderPO.getPrice());
            myOrderVO.setNum(orderPO.getNum());

            myOrderVO.setTotalCost(orderPO.getTotalCost());
            myOrderVO.setOrderTime(orderPO.getOrderTime());
            myOrderVO.setPaymentType(orderPO.getPaymentType());

            if (orderPO.getStatus() == 4) {
                double moneyBack = getMoneyBack(orderPO);
                myOrderVO.setRefund(String.valueOf(moneyBack));
            }
            String ticketIds = orderPO.getTicketIds();
            if (ticketIds != "") {
                myOrderVO.setTicketIds(ticketIds);
                String ticketStatuses = ticketsService.getTicketStatuses(orderPO.getTicketIds());
                myOrderVO.setTicketStatuses(ticketStatuses);
            } else {
                myOrderVO.setTicketIds("");
                myOrderVO.setTicketStatuses("");
            }

            myOrderVOs.add(myOrderVO);
        }
        return myOrderVOs;
    }

    /**
     * 付款
     */
    @Override
    @Transactional
    @Modifying
    public String payNow(PayNowVO payNowVO, UserPO userPO) {
        // 返回jsonResult
        /**
         * 转账
         */
        String transferRes = transfersService.transferToManagers(payNowVO);
        if (transferRes.split(";")[0].equals("success")) {
            String orderId = payNowVO.getOrderId();
            OrderPO orderPO = ordersRepository.findById(orderId);
            if (orderPO.getStatus() == 0) {
                /**
                 * 修改订单状态、支付方式
                 * 0待付款，1待配票，2已配票，3支付超时，4退款，5取消
                 */
                orderPO.setStatus(1);
                orderPO.setPayerAccount(payNowVO.getAccountId());
                /**
                 * 修改个人信息：消费金额；积分数
                 */
                double consumption = userPO.getConsumption();
                consumption += Double.valueOf(payNowVO.getTotalCost());
                userPO.setConsumption(consumption);
                System.out.println(" userPo.setConsumption: " + consumption);

                int membershipPointByConsumption = MembershipUtil.getMembershipPointByConsumption(payNowVO.getTotalCost());
                membershipPointByConsumption += userPO.getMembershipPoint();
                userPO.setMembershipPoint(membershipPointByConsumption);
                System.out.println(" userPo.setMembershipPoint: " + membershipPointByConsumption);

                if (orderPO.getShowSeatIds().length() != 0) {
                    /**
                     * 如果是选座购买
                     * 则修改座位信息（锁定-->已售）
                     * 并生成票
                     * 修改订单状态
                     */
                    String[] ids = orderPO.getShowSeatIds().split(";");
                    String ticketIds = "";
                    for (String id : ids) {
                        showSeatsService.changeStatus(Integer.valueOf(id), 1);
                        String ticketId = ticketsService.createTicket(orderPO.getId(), orderPO.getShowId(), 1);
                        ticketIds += ticketId;
                        ticketIds += ";";
                        System.out.println(" ============================ each ticketId: " + ticketId);
                    }
                    System.out.println(" set ticket ids: " + ticketIds);
                    orderPO.setTicketIds(ticketIds);
                    orderPO.setStatus(2);
                }

                return JsonResult.buildResult("success", transferRes.split(";")[1]);
            }
            return JsonResult.buildResult("failure", "支付超时，订单自动取消。");
        } else {
            return JsonResult.buildResult("failure", transferRes.split(";")[1]);
        }
    }

    /**
     * 取消订单
     */
    @Override
    @Transactional
    @Modifying
    public String cancelOrder(UserPO userPO, String orderId) {
        // 修改订单状态
        // 0：待付款（下单15min内）
        // 1：待使用（下单15min内付款）
        // 2：已完成（线下使用）
        // 3：支付超时（下单超过15min未支付）
        // 4：退款
        // 5：取消
        changeOrderStatus(orderId, 5);
        // 恢复座位信息
        changeSeatsInfo(orderId, 0);
        return JsonResult.buildResult("success", "订单已取消。");
    }

    /**
     * 退订
     */
    @Override
    @Transactional
    @Modifying
    public String refund(UserPO userPO, String orderId) {
        // 修改订单状态
        // 0：待付款（下单15min内）
        // 1：待使用（下单15min内付款）
        // 2：已完成（线下使用）
        // 3：支付超时（下单超过15min未支付）
        // 4：退款
        // 5：取消
        changeOrderStatus(orderId, 4);
        // 恢复座位信息
        changeSeatsInfo(orderId, 0);
        // 按一定比例退换金额
        OrderPO orderPO = ordersRepository.findById(orderId);
        String payerAccount = orderPO.getPayerAccount();
        double moneyBack = getMoneyBack(orderPO);
        transfersService.transferToUser(payerAccount, moneyBack, orderPO.getPaymentType());

        return JsonResult.buildResult("success", "已退款。");
    }

    private void changeOrderStatus(String orderId, int status) {
        System.out.println(" changeOrderStatus~~~ " + orderId);
        OrderPO orderPO = ordersRepository.findById(orderId);
        orderPO.setStatus(status);
    }

    private void changeSeatsInfo(String orderId, int status) {
        OrderPO orderPO = ordersRepository.findById(orderId);
        if (!orderPO.getShowSeatIds().equals("")) {
            assert orderPO.getShowSeatIds().length() > 0;
            String[] ids = orderPO.getShowSeatIds().split(";");
            for (String id : ids) {
                showSeatsService.changeStatus(Integer.valueOf(id), status);
            }
        }
    }

    /**
     * 按比例退款
     */
    private double getMoneyBack(OrderPO orderPO) {
        String totalCost = orderPO.getTotalCost();
        double cost = Double.valueOf(totalCost);

        int showID = orderPO.getShowId();
        ShowDetailsVO showDetailsVO = showsService.getShowDetails(showID);
        String showTime = showDetailsVO.getShowTime();

        if (TimeUtil.intervalOver(showTime, 7)) {
            return Double.valueOf(DataFormatUtil.keepTwoBit(cost));
        } else if (TimeUtil.intervalOver(showTime, 3)) {
            return Double.valueOf(DataFormatUtil.keepTwoBit(cost * 0.9));
        } else if (TimeUtil.intervalOver(showTime, 1)) {
            return Double.valueOf(DataFormatUtil.keepTwoBit(cost * 0.7));
        } else {
            return Double.valueOf(DataFormatUtil.keepTwoBit(cost * 0.5));
        }
    }

    @Scheduled(cron = "0 0/1 * * * *")
    public void checkOvertimeOrderTimer() {
        System.out.println("---------- checkOvertimeOrderTimer");
        List<OrderPO> unpaidOrders = ordersRepository.findByStatus(0);

        for (OrderPO orderPO : unpaidOrders) {
            String orderTime = orderPO.getOrderTime();
            if(TimeUtil.intervalOverMinute(orderTime, 3)) {
                // TODO: 18/3/29 为什么这里就不能用注解直接set？非要save？而且调用changeStatus也不行？
                orderPO.setStatus(3);
                ordersRepository.save(orderPO);
                if (orderPO.getBuyMethod().equals("SELECT_SEATS")) {
                    changeSeatsInfo(orderPO.getId(), 0);
                }

            }
        }
    }

    @Scheduled(cron = "0 0/1 * * * *")
    public void setTicketsTimer() {
        System.out.println("----------- setTicketsTimer");
        // 等待配票的order
        // 检查（开始时间－现在<14天）的order
        // 按票价查找座位
        // 数目够-->
        // 1）修改order状态为已配票2
        // 2）修改订单上座位信息
        // 3）修改showseat座位信息
        // 数目不够-->
        // 1）修改订单状态为退款
        // 2）全额退款
        //
        List<OrderPO> ordersWithoutTickets = ordersRepository.findByStatus(1);
        List<OrderPO> toSetTickets = new ArrayList<>(ordersWithoutTickets.size());
        for (OrderPO orderPO: ordersWithoutTickets) {
            int showId = orderPO.getShowId();
            ShowDetailsVO showDetailsVO = showsService.getShowDetails(showId);
            String time = showDetailsVO.getShowTime();
            if (!TimeUtil.intervalOver(time, 14)) {
                // 开票两周前
                toSetTickets.add(orderPO);
            }
        }
        for (OrderPO orderPO: toSetTickets) {
            assert orderPO.getBuyMethod().equals("BUY_NOW");
            int showId = orderPO.getShowId();
            String price = orderPO.getPrice();
            String num = orderPO.getNum();
            List<ShowSeatPO> seats = showSeatsRepository.findByShowId(showId);
            List<ShowSeatPO> seatsAvail = new ArrayList<>(seats.size());
            for (ShowSeatPO seat: seats) {
                if (seat.getPrice() == Double.valueOf(price)) {
                    // 价格
                    if (seat.getStatus() == 0) {
                        // 可售
                        seatsAvail.add(seat);
                    }
                }
            }
            if (seatsAvail.size() < Integer.valueOf(num)) {
                // 配票失败
                // 订单状态
                orderPO.setStatus(4);
                ordersRepository.save(orderPO);
                // 全额退款
                String payerAccountId = orderPO.getPayerAccount();
                String totalCost = orderPO.getTotalCost();
                int paymentType = orderPO.getPaymentType();
                transfersService.transferToUser(payerAccountId, Double.valueOf(totalCost), paymentType);
            }
            else {
                // 配票
                String showSeatIds = "";
                String ticketIds = "";
                for (int i = 0; i < Integer.valueOf(num); i++) {
                    ShowSeatPO seat = seatsAvail.get(i);

                    showSeatIds += seat.getId();
                    showSeatIds += ";";
                    String ticketId = ticketsService.createTicket(orderPO.getId(), orderPO.getShowId(), 1);
                    System.out.println("------------- 系统配票： " + ticketId);
                    ticketIds += ticketId;
                    ticketIds += ";";

                    seat.setStatus(1);
                    showSeatsRepository.save(seat);
                }
                orderPO.setShowSeatIds(showSeatIds);
                orderPO.setTicketIds(ticketIds);
                orderPO.setStatus(2);
                ordersRepository.save(orderPO);
            }

        }
    }
}

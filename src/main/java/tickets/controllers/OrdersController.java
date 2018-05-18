package tickets.controllers;

import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tickets.constants.JsonResult;
import tickets.entities.po.UserPO;
import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.GenMemberOrderVO;
import tickets.entities.vo.from_views.GenOrderVO;
import tickets.entities.vo.from_views.PayNowVO;
import tickets.entities.vo.to_views.MyOrderVO;
import tickets.services.OrdersService;
import tickets.services.UsersService;
import tickets.services.VenuesService;

import java.util.List;

/**
 * Created by a297 on 18/3/19.
 */
@Controller
@RequestMapping(value = "/api/orders", produces = "application/json;charset=UTF-8")
public class OrdersController {
    @Autowired
    private UsersService usersService;
    @Autowired
    private VenuesService venuesService;
    @Autowired
    private OrdersService ordersService;

    @RequestMapping(value = "/genOrder", method = RequestMethod.POST)
    public @ResponseBody
    String genOrder(@RequestBody GenOrderVO genOrderVO, @CookieValue("userToken") String token) {
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            ordersService.genOrder(userPO, genOrderVO);
            return JsonResult.buildResult("success", "下单成功，请尽快支付。");
        }
        else {
            return JsonResult.buildResult("failure", "登录超时，请重新登录");
        }

    }

    @RequestMapping(value = "/myOrders", method = RequestMethod.GET)
    public @ResponseBody
    String getMyOrders(@CookieValue("userToken") String token) {
        System.out.println(">>>>>>>>> get my orders: " + token);
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            List<MyOrderVO> myOrderVOs =  ordersService.getOrdersByUserEmail(userPO.getEmail());
            return JSONArray.toJSONString(myOrderVOs);
        }
        return "";
    }

    @RequestMapping(value = "/payNow", method = RequestMethod.POST)
    public @ResponseBody
    String payNow(@RequestBody PayNowVO payNowVO, @CookieValue("userToken") String token) {
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            String jsonRes = ordersService.payNow(payNowVO, userPO);
            return jsonRes;
        }
        else {
            return JsonResult.buildResult("failure", "登录超时，请重新登录");
        }
    }

      @RequestMapping(value = "/cancel", method = RequestMethod.POST)
    public @ResponseBody
    String cancelOrder(@CookieValue("userToken") String token, @RequestBody String orderId) {
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            String jsonRes = ordersService.cancelOrder(userPO, orderId);
            return jsonRes;
        }
        else {
            return JsonResult.buildResult("failure", "登录超时，请重新登录");
        }
    }

    @RequestMapping(value = "/refund", method = RequestMethod.POST)
    public @ResponseBody
    String refund(@CookieValue("userToken") String token, @RequestBody String orderId) {
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            String jsonRes = ordersService.refund(userPO, orderId);
            return jsonRes;
        }
        else {
            return JsonResult.buildResult("failure", "登录超时，请重新登录");
        }
    }

    @RequestMapping(value = "/genOrderLive", method = RequestMethod.POST)
    public @ResponseBody
    String genOrderLive(@RequestBody GenOrderVO genOrderVO, @CookieValue("venueToken") String token) {
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            ordersService.genOrderLive(venuePO, genOrderVO);
            return JsonResult.buildResult("success", "购票成功。");
        }
        else {
            return JsonResult.buildResult("failure", "登录超时，请重新登录");
        }
    }

    @RequestMapping(value = "/genMemberOrderLive", method = RequestMethod.POST)
    public @ResponseBody
    String genMemberOrderLive(@RequestBody GenMemberOrderVO genMemberOrderVO, @CookieValue("venueToken") String token) {
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            ordersService.genMemberOrderLive(venuePO, genMemberOrderVO);
            return JsonResult.buildResult("success", "购票成功。");
        }
        else {
            return JsonResult.buildResult("failure", "登录超时，请重新登录");
        }
    }

    @RequestMapping(value = "/myLiveTickets", method = RequestMethod.GET)
    public @ResponseBody String getMyLiveTickets(@CookieValue("venueToken") String token) {
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            List<MyOrderVO> myLiveTickets = ordersService.getOrdersByUserEmail(venuePO.getId());
            return JSONArray.toJSONString(myLiveTickets);
        }
        else {
            return "";
        }
    }
}

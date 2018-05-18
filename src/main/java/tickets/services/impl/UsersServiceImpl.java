package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tickets.constants.UserStatus;
import tickets.dao.UsersRepository;
import tickets.entities.po.UserPO;
import tickets.entities.vo.from_views.RegistrationVO;
import tickets.entities.vo.to_views.MemberInfoVO;
import tickets.entities.vo.to_views.MyInfoVO;
import tickets.entities.vo.to_views.MyOrderVO;
import tickets.entities.vo.to_views.MyStatisticsVO;
import tickets.services.OrdersService;
import tickets.services.UsersService;
import tickets.utils.EmailUtil;
import tickets.utils.Encrypt;
import tickets.utils.MembershipUtil;

import java.util.List;

/**
 * Created by a297 on 18/2/5.
 */
@Service
public class UsersServiceImpl implements UsersService {
    private static final String NO_COOKIE_TIP = "l.noCoookie.ch";
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private UsersRepository usersRepository;
    @Override
    public UserPO loadUserByEmail(String email) {
        System.out.println(" ===== impl ===== loadUserByEmail");

        return usersRepository.findByEmail(email);
    }
    @Override
    public boolean update(UserPO u) {
        System.out.println(" ===== impl ===== update");
        if (u == null || loadUserByEmail(u.getEmail()) == null) {
            throw new NullPointerException();
        }
        usersRepository.save(u);
        return true;
    }
    @Override
    public boolean register(RegistrationVO registrationVO) {
        System.out.println(" ===== impl ===== registrationVO");
        String email = registrationVO.getEmail();
        UserPO userPO = loadUserByEmail(email);
        if (userPO == null) {
            userPO = new UserPO();
        }
        userPO.setName(registrationVO.getNickname());
        userPO.setPassword(registrationVO.getPassword());
        userPO.setEmail(registrationVO.getEmail());
        userPO.setStatus(UserStatus.INACTIVE.getIndex());

        try {
            userPO = EmailUtil.activateMail(userPO);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        userPO.setCookie(NO_COOKIE_TIP);
        usersRepository.save(userPO);
        return true;
    }
    @Override
    public String login(UserPO userPO) {
        String cookie = System.currentTimeMillis() + userPO.getEmail();
        try {
            String realCookie = Encrypt.md5(cookie);
            userPO.setCookie(realCookie);
            usersRepository.save(userPO);
            return realCookie;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @Override
    public UserPO loadUserByCookie(String cookie) {
        return usersRepository.findByCookie(cookie);
    }
    @Override
    public MyInfoVO getMyInfo(UserPO userPO) {
        MyInfoVO myInfoVO = new MyInfoVO();

        myInfoVO.setEmail(userPO.getEmail());
        myInfoVO.setName(userPO.getName());

        // 会员等级（头衔，折扣，等级规则）
        double consumption = userPO.getConsumption();
        String membershipTitle = MembershipUtil.getMembershipTitle(consumption);
        double discount = MembershipUtil.getDiscount(membershipTitle);
        String membershipTitleRules = MembershipUtil.getMembershipTitleRules();

        myInfoVO.setMembershipTitle(membershipTitle);
        myInfoVO.setDiscount(discount);
        myInfoVO.setMembershipTitleRules(membershipTitleRules);

        // 会员积分（积分，可用优惠券，积分规则，已有优惠券）
        int membershipPoint = userPO.getMembershipPoint();
        String availableCoupons = MembershipUtil.getAvailableCoupons(membershipPoint);
        String membershipPointRules = MembershipUtil.getMembershipPointRules();

        myInfoVO.setMembershipPoint(userPO.getMembershipPoint());
        myInfoVO.setAvailableCoupons(availableCoupons);
        myInfoVO.setMembershipPointRules(membershipPointRules);
        myInfoVO.setMyCoupons(userPO.getCoupons());

        return myInfoVO;
    }
    @Override
    @Transactional
    @Modifying
    public void exchangeCoupon(UserPO userPO, String coupon) {
        /**
         * 1、修改我的优惠券
         */
        String coupons = userPO.getCoupons();
        if (coupons != "") {
            coupons += coupon;
        }
        else {
            coupons = coupon;
        }
        coupons += ";";
        userPO.setCoupons(coupons);
        /**
         * 2、修改我的积分
         */
        int membershipPoints = userPO.getMembershipPoint();
        int point = MembershipUtil.getMemberShipPointByCoupon(coupon);
        membershipPoints -= point;
        userPO.setMembershipPoint(membershipPoints);
    }
    @Override
    @Transactional
    @Modifying
    public void changeName(UserPO userPO, String newName) {
        userPO.setName(newName);
    }
    @Override
    @Transactional
    @Modifying
    public void cancelEmail(UserPO userPO) {
        userPO.setCancel(1);
    }
    @Override
    public MemberInfoVO getMemberInfo(UserPO userPO) {
        String membershipTitle = MembershipUtil.getMembershipTitle(userPO.getConsumption());
        double discount = MembershipUtil.getDiscount(membershipTitle);

        MemberInfoVO memberInfoVO = new MemberInfoVO();
        memberInfoVO.setUserEmail(userPO.getEmail());
        memberInfoVO.setMembershipTitle(membershipTitle);
        memberInfoVO.setDiscount(discount);
        return memberInfoVO;
    }
    @Override
    @Transactional
    @Modifying
    public void changeConsumption(String userEmail, char c, double finalCost) {
        UserPO userPO = loadUserByEmail(userEmail);
        double consumption = userPO.getConsumption();
        if (c == '+') {
            consumption += finalCost;
        }
        else if (c == '-') {
            consumption -= finalCost;
        }
        userPO.setConsumption(consumption);
    }
    @Override
    @Transactional
    @Modifying
    public void changeMembershipPoint(String userEmail, char c, int points) {
        UserPO userPO = loadUserByEmail(userEmail);
        int membeshipPoints = userPO.getMembershipPoint();
        if (c == '+') {
            membeshipPoints += points;
        }
        else if (c == '-') {
            membeshipPoints -= points;
        }
        userPO.setMembershipPoint(membeshipPoints);
    }

    @Override
    public MyStatisticsVO getMyStatistics(UserPO userPO) {
        MyStatisticsVO statisticsVO = new MyStatisticsVO();
        int orderWithTickets = 0;
        int refundedOrder = 0;
        List<MyOrderVO> orders = ordersService.getOrdersByUserEmail(userPO.getEmail());
        for (MyOrderVO orderVO: orders) {
            if (orderVO.getStatus() == 2){
                orderWithTickets += 1;
            }
            else if (orderVO.getStatus() == 4) {
                refundedOrder += 1;
            }
        }
        statisticsVO.setWithTicketNum(orderWithTickets);
        statisticsVO.setRefundNum(refundedOrder);
        statisticsVO.setConsumption(userPO.getConsumption());

        return statisticsVO;
    }
}

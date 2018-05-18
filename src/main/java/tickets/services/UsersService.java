package tickets.services;

import tickets.entities.po.UserPO;
import tickets.entities.vo.from_views.RegistrationVO;
import tickets.entities.vo.to_views.MemberInfoVO;
import tickets.entities.vo.to_views.MyInfoVO;
import tickets.entities.vo.to_views.MyStatisticsVO;

/**
 * Created by a297 on 18/2/5.
 */
public interface UsersService {
    UserPO loadUserByEmail(String email);

    boolean update(UserPO userPO);

    // 第一次注册 ｜｜ 激活码失效，重新注册
    boolean register(RegistrationVO registrationVO);

    String login(UserPO userPO);

    UserPO loadUserByCookie(String cookie);

    MyInfoVO getMyInfo(UserPO userPO);

    void exchangeCoupon(UserPO userPO, String coupon);

    void changeName(UserPO userPO, String newName);

    void cancelEmail(UserPO userPO);

    MemberInfoVO getMemberInfo(UserPO userPO);

    void changeConsumption(String userEmail, char c, double finalCost);

    void changeMembershipPoint(String userEmail, char c, int points);

    MyStatisticsVO getMyStatistics(UserPO userPO);
}

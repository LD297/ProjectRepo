package tickets.controllers;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tickets.constants.JsonResult;
import tickets.constants.ResultMsg;
import tickets.constants.UserStatus;
import tickets.entities.po.UserPO;
import tickets.entities.vo.from_views.LoginVO;
import tickets.entities.vo.from_views.RegistrationVO;
import tickets.entities.vo.to_views.MyInfoVO;
import tickets.entities.vo.to_views.MyStatisticsVO;
import tickets.services.UsersService;

import javax.mail.MessagingException;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;

/**
 * Created by a297 on 18/2/3.
 */
@Controller
@RequestMapping(value = "/api/users", produces = "application/json;charset=UTF-8")
public class UsersController {
    private static final String MAGIC = "lch520";
    @Autowired
    private UsersService usersService;
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public
    @ResponseBody
    String register(@RequestBody RegistrationVO registrationVO) {
        System.out.println("============= /api/users/register: " + registrationVO.getEmail() + " name=" + registrationVO.getNickname());
        String email = registrationVO.getEmail();
        UserPO userPO = usersService.loadUserByEmail(email);
        if (userPO != null) {
            if (userPO.getCancel() == 0) {
                // 注册过，状态未知
                int status = userPO.getStatus();
                if (status == UserStatus.INACTIVE.getIndex()) {
                    // 等待激活
                    callRegistrationService(registrationVO);
                    return JsonResult.buildResult(ResultMsg.GOTOACTIVATE.toString(), "已发送激活链接，请打开邮箱点击链接进行确认");
                } else if (status == UserStatus.ACTIVE.getIndex()) {
                    // 已经激活
                    return JsonResult.buildResult(ResultMsg.GOTOLOGIN.toString(), "账户已经注册，请登录");
                } else if (status == UserStatus.INVALID.getIndex()) {
                    // 禁用
                    return JsonResult.buildResult(ResultMsg.ERROR.toString(), "该邮箱账号已被禁，请用其他邮箱注册");

                } else {
                    // TODO: 18/2/7   未知状态 ＝> 错误, 尝试assert
                    return JsonResult.buildResult(ResultMsg.ERROR.toString(), "未知错误，请稍后再试");
                }
            }
            else {
                // 账户被禁用
                return JsonResult.buildResult(ResultMsg.ERROR.toString(), "该邮箱账号已被禁，请用其他邮箱注册");
            }
        } else {
            // 未注册
            callRegistrationService(registrationVO);
            return JsonResult.buildResult(ResultMsg.GOTOACTIVATE.toString(), "已发送激活链接，请打开邮箱点击链接进行确认");
        }
    }
    private String callRegistrationService(RegistrationVO registrationVO) {
        boolean result = usersService.register(registrationVO);
        if (result) {
            return "success";
        } else {
            return "fail";
        }
    }
    @RequestMapping(value = "/activatemail", method = RequestMethod.GET)
    public
    @ResponseBody
    String activatemail(String email, String token) throws MessagingException, NoSuchAlgorithmException {
        //获取激活参数
        System.out.println("=============== 激活参数：");
        System.out.println("email: " + email + ",  token: " + token);
        UserPO user = usersService.loadUserByEmail(email);
        if (user == null) {
            // TODO: 18/2/7 assert一下？
            return new JSONObject().toJSONString("查无此人");
        } else {
            if (user.getStatus() == UserStatus.INVALID.getIndex()) {
                return new JSONObject().toJSONString("账户被禁，请用其他账号");
            } else if (user.getStatus() == UserStatus.ACTIVE.getIndex()) {
                return new JSONObject().toJSONString("账户已经激活，请登录");
            } else {
                // 等待激活
                Timestamp dueTime = user.getActivateTime();
                Timestamp currentTime = new Timestamp(System.currentTimeMillis());
                if (currentTime.after(dueTime)) {
                    // 过期
                    return new JSONObject().toJSONString("链接已经失效，请重新注册");
                } else {
                    // 没过期
                    if (!token.equals(user.getToken())) {
                        return new JSONObject().toJSONString("激活码不对，请重新注册");
                    } else {
                        // 成功激活
                        user.setStatus(UserStatus.ACTIVE.getIndex());
                        user.setToken(MAGIC);
                        usersService.update(user);
                        return new JSONObject().toJSONString("成功激活，请登录");
                    }
                }
            }
        }
    }
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public
    @ResponseBody
    String login(@RequestBody LoginVO loginVO) {
        System.out.println("============= /api/users/login: " + "email=" + loginVO.getEmail());
        String email = loginVO.getEmail();
        UserPO userPO = usersService.loadUserByEmail(email);
        if (userPO != null) {
            if (userPO.getCancel() == 0) {
                if (userPO.getStatus() == UserStatus.ACTIVE.getIndex()) {
                    String password = userPO.getPassword();
                    if (password.equals(loginVO.getPassword())) {
                        String token = usersService.login(userPO);
                        return JsonResult.buildResult(token, ResultMsg.GOTOHOMEPAGE.toString(), "登录成功，即将跳转主页");
                    } else {
                        return JsonResult.buildResult(ResultMsg.WRONGPSW.toString(), "密码错误");
                    }
                }
                else {
                    return JsonResult.buildResult(ResultMsg.ERROR.toString(), "该账号未激活，请前往邮箱激活。");
                }
            }
            else {
                return JsonResult.buildResult(ResultMsg.ERROR.toString(), "该邮箱账号已被禁，请用其他邮箱登录");
            }
        }
        else {
            return JsonResult.buildResult(ResultMsg.ERROR.toString(), "该邮箱未注册，请先注册再登录");
        }
    }
    @RequestMapping(value = "/myInfo", method = RequestMethod.GET)
    public @ResponseBody
    String getMyInfo(@CookieValue("userToken") String token) {
        System.out.println("---------------------------------- get my info: " + token);
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            MyInfoVO myInfoVO = usersService.getMyInfo(userPO);
            return JSONObject.toJSONString(myInfoVO);
        }
        return "";
    }
    @RequestMapping(value = "/exchangeCoupon", method = RequestMethod.POST)
    public @ResponseBody
    String exchangeCoupon(@CookieValue("userToken") String token, @RequestBody String coupon) {
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            usersService.exchangeCoupon(userPO, coupon);
            return JsonResult.buildResult("success", "兑换成功！");
        }
        return JsonResult.buildResult("failure", "账户身份验证失败，请重新登录。");
    }
    @RequestMapping(value = "/changeName", method = RequestMethod.POST)
    public @ResponseBody
    String changeName(@CookieValue("userToken") String token, @RequestBody String newName) {
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            usersService.changeName(userPO, newName);
            return JsonResult.buildResult("success", "修改成功！");
        }
        return JsonResult.buildResult("failure", "账户身份验证失败，请重新登录。");
    }
    @RequestMapping(value = "/cancelEmail", method = RequestMethod.POST)
    public @ResponseBody
    String cancelEmail(@CookieValue("userToken") String token) {
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            usersService.cancelEmail(userPO);
            return JsonResult.buildResult("success", "注销成功！");
        }
        return JsonResult.buildResult("failure", "账户身份验证失败，请重新登录。");
    }

    @RequestMapping(value = "/myStatistics", method = RequestMethod.GET)
    public @ResponseBody
    String getMyStatistics(@CookieValue("userToken") String token) {
        System.out.println("---------------------------------- get my info: " + token);
        UserPO userPO = usersService.loadUserByCookie(token);
        if (userPO != null) {
            MyStatisticsVO myStatisticsVO = usersService.getMyStatistics(userPO);
            return JSONObject.toJSONString(myStatisticsVO);
        }
        return "";
    }
}

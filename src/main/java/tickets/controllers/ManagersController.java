package tickets.controllers;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tickets.constants.JsonResult;
import tickets.entities.po.ManagerPO;
import tickets.entities.vo.from_views.ApplicationExaminationVO;
import tickets.entities.vo.from_views.BalanceVO;
import tickets.entities.vo.from_views.ManagerLoginVO;
import tickets.entities.vo.from_views.UpdateVenueInfoVO;
import tickets.entities.vo.to_views.ManagerStatisticsVO;
import tickets.services.ManagersService;

import java.util.List;

/**
 * Created by a297 on 18/3/12.
 */
@Controller
@RequestMapping(value = "/api/managers", produces = "application/json;charset=UTF-8")
public class ManagersController {
    @Autowired
    private ManagersService managersService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody String login(@RequestBody ManagerLoginVO managerLoginVO) {
        ManagerPO managerPO = managersService.loadManagerById(managerLoginVO.getId());
        if (managerPO != null) {
            String password = managerPO.getPsw();
            if (password.equals(managerLoginVO.getPsw())) {
                String token = managersService.login(managerPO);
                return JsonResult.buildResult(token, "success", "登陆成功，即将跳转页面");
            }
            else {
                return JsonResult.buildResult("failure", "密码错误");
            }
        }
        else {
            System.out.println("login: manager po is null");
            return JsonResult.buildResult("failure", "帐号错误，请重新输入");
        }
    }

    @RequestMapping(value = "/applications", method = RequestMethod.GET)
    public @ResponseBody String fetchApplications(@CookieValue("managerToken") String token) {
        ManagerPO managerPO = managersService.loadManagerByToken(token);
        if (managerPO != null) {
            List applicationVOList = managersService.fetchApplications();
            return JSONArray.toJSONString(applicationVOList);
        }
        else {
            System.out.println(" /applications manager po is null");
            return JsonResult.buildResult("failure", "身份验证超时，请重新登录");
        }
    }

    @RequestMapping(value = "/applicationExamination", method = RequestMethod.POST)
    public @ResponseBody String applicationExamination(@RequestBody ApplicationExaminationVO vo, @CookieValue("managerToken") String token) {
        ManagerPO managerPO = managersService.loadManagerByToken(token);
        if (managerPO != null) {
            String res = managersService.applicationExamination(vo);
            if ("success".equals(res)) {
                return JsonResult.buildResult("success", "操作成功，即将刷新当前页...");
            }
            else {
                return JsonResult.buildResult("failure", "操作失败，请稍后再试...");
            }
        }
        else {
            System.out.println("/applicationExamination:  manager po is null");
            return JsonResult.buildResult("failure", "身份验证超时，请重新登录");
        }
    }


    @RequestMapping(value = "/balance", method = RequestMethod.POST)
    public @ResponseBody String balance(@RequestBody BalanceVO balanceVO, @CookieValue("managerToken") String token) {
        ManagerPO managerPO = managersService.loadManagerByToken(token);
        if (managerPO != null) {
            System.out.println("----------- 结算：" + balanceVO.toString());
            String res = managersService.balance(balanceVO, managerPO);
            return JsonResult.buildResult(res.split(";")[0], res.split(";")[1]);
        }
        else {
            return JsonResult.buildResult("failure", "身份验证超时，请重新登录");
        }
    }

    @RequestMapping(value = "/managerStatistics", method = RequestMethod.GET)
    public @ResponseBody String getManagerStatistics(@CookieValue("managerToken") String token) {
        ManagerPO managerPO = managersService.loadManagerByToken(token);
        if (managerPO != null) {
            ManagerStatisticsVO vo = managersService.getManagerStatistics(managerPO);
            return JSONObject.toJSONString(vo);
        }
        else {
            return JsonResult.buildResult("failure", "身份验证超时，请重新登录");
        }
    }

    @RequestMapping(value = "/modifications", method = RequestMethod.GET)
    public @ResponseBody String fetchModifications(@CookieValue("managerToken") String token) {
        ManagerPO managerPO = managersService.loadManagerByToken(token);
        if (managerPO != null) {
            List<UpdateVenueInfoVO> vos = managersService.fetchModifications();
            return JSONArray.toJSONString(vos);
        }
        else {
            return JsonResult.buildResult("failure", "身份验证超时，请重新登录");
        }
    }

    @RequestMapping(value = "/modificationExamination", method = RequestMethod.POST)
    public @ResponseBody String modificationExamination(@RequestBody ApplicationExaminationVO vo, @CookieValue("managerToken") String token) {
        ManagerPO managerPO = managersService.loadManagerByToken(token);
        if (managerPO != null) {
            String res = managersService.modificationExamination(vo);
            if ("success".equals(res)) {
                return JsonResult.buildResult("success", "操作成功，即将刷新当前页...");
            }
            else {
                return JsonResult.buildResult("failure", "操作失败，请稍后再试...");
            }
        }
        else {
            return JsonResult.buildResult("failure", "身份验证超时，请重新登录");
        }
    }

}

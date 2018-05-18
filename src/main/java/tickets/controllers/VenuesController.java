package tickets.controllers;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tickets.constants.JsonResult;
import tickets.entities.po.UserPO;
import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.*;
import tickets.entities.vo.to_views.MemberInfoVO;
import tickets.entities.vo.to_views.ShowStatisticsVO;
import tickets.entities.vo.to_views.VenueInfoVO;
import tickets.services.TicketsService;
import tickets.services.UsersService;
import tickets.services.VenuesService;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by a297 on 18/3/9.
 */
@Controller
@RequestMapping(value = "/api/venues", produces = "application/json;charset=UTF-8")
public class VenuesController {
    @Autowired
    private VenuesService venuesService;
    @Autowired
    private UsersService usersService;
    @Autowired
    private TicketsService ticketsService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody String login(@RequestBody VenueLoginVO venueLoginVO) {
        System.out.println(" =============== /api/venues/login:  id = " + venueLoginVO.getId());
        VenuePO venuePO = venuesService.loadVenueById(venueLoginVO.getId());
        if (venuePO != null) {
            if (venuePO.getUsed() == 0) {
                return JsonResult.buildResult("failure", "正等待审核。");
            }
            else if(venuePO.getUsed() == -1) {
                return JsonResult.buildResult("failure", "审核不通过，请重新申请。");
            }
            else {
                assert venuePO.getUsed() == 1;
                String password = venuePO.getPsw();
                if (password.equals(venueLoginVO.getPsw())) {
                    String token = venuesService.login(venuePO);
                    return JsonResult.buildResult(token, "success", "登陆成功，即将跳转场馆页面");
                }
                else {
                    return JsonResult.buildResult("failure", "密码错误");
                }
            }
        }
        else {
            System.out.println("login: venue po is null");
            return JsonResult.buildResult("failure", "帐号错误，请重新输入");
        }
    }

    @RequestMapping(value = "/apply", method = RequestMethod.POST)
    public @ResponseBody String apply(@RequestBody ApplicationVO applicationVO) {
        String venueId = venuesService.apply(applicationVO);
        if (venueId.toCharArray().length == 7) {
            return JsonResult.buildResult("success", "申请成功，等待审核。登录帐号：" + venueId);
        }
        return JsonResult.buildResult("failure", "系统错误，请稍后重试");
    }

    @RequestMapping(value = "/myVenue", method = RequestMethod.GET)
    public @ResponseBody String getMyVenue(@CookieValue("venueToken") String token) {
        System.out.println("get my venue cookie: " + token);
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            VenueInfoVO venueInfoVO = venuesService.getMyVenue(venuePO);
            System.out.println("get my venue: " + venueInfoVO.toString());
            return JSONObject.toJSONString(venueInfoVO);
        }
        else {
            return "";
        }
    }

    @RequestMapping(value = "/release", method = RequestMethod.POST)
    public @ResponseBody String release(@RequestBody ReleaseVO releaseVO, @CookieValue("venueToken") String token) {
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            venuesService.release(releaseVO);
            return JsonResult.buildResult("success", "发布成功！");
        }
        else {
            System.out.println(" release: venue po is null");
            return JsonResult.buildResult("failure", "发布失败");
        }
    }

    @RequestMapping(value = "/preUploadPoster", method = RequestMethod.POST)
    public @ResponseBody String preUploadPoster(@RequestParam MultipartFile file, @CookieValue("venueToken") String token) {
        System.out.println("============= preload poster");
        // 获取文件名
        String fileName = file.getOriginalFilename();
        System.out.println("上传的文件名：" + fileName);
        String newFileName = System.currentTimeMillis() + fileName;
        // 获取文件后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        System.out.println("上传的文件名：" + suffixName);
        // 文件上传后路径
        String filePath = "/Users/a297/Desktop/Tickets/static/";
        System.out.println("上传后的路径：" + filePath);
        // 文件上传后保存
        File dest = new File(filePath + newFileName);
        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        String status = "failure";
        try {
            file.transferTo(dest);
            status = "success";
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map<String, String> resp = new HashMap<>();
        resp.put("status", status);
        resp.put("url", "http://localhost:8080/api/static/" + newFileName);
        return JSONObject.toJSONString(resp);
    }

    @RequestMapping(value = "/myShows", method = RequestMethod.GET)
    public @ResponseBody String getMyShows(@CookieValue("venueToken") String token) {
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            List myShows = venuesService.getMyShows(venuePO.getId());
            return JSONArray.toJSONString(myShows);
        }
        else {
            return "";
        }
    }

    @RequestMapping(value = "/memberInfo", method = RequestMethod.GET)
    public @ResponseBody String getMemberInfo(@RequestParam String email) {
        UserPO userPO = usersService.loadUserByEmail(email);
        MemberInfoVO memberInfoVO = null;
        if (userPO != null) {
            memberInfoVO = usersService.getMemberInfo(userPO);

            memberInfoVO.setMsg("success");
            memberInfoVO.setWords("合法会员。");
        }
        else {
            memberInfoVO = new MemberInfoVO();
            memberInfoVO.setMsg("failure");
            memberInfoVO.setWords("查无此人。");
        }
        System.out.println(" get member info : " + memberInfoVO.toString());
        return JSONObject.toJSONString(memberInfoVO);
    }

    @RequestMapping(value = "/checkTicketsLive", method = RequestMethod.POST)
    public @ResponseBody String checkTicketsLive(@RequestBody CheckTicketsLiveVO checkTicketsLiveVO, @CookieValue("venueToken") String token) {
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            String jsonRes = ticketsService.checkTicketsLive(checkTicketsLiveVO);
            return jsonRes;
        }
        else {
            return JsonResult.buildResult("failure", "场馆登录超时，请重新登录。");
        }
    }

    @RequestMapping(value = "/venueStatistics", method = RequestMethod.GET)
    public @ResponseBody String getVenueStatistics(@CookieValue("venueToken") String token) {
        System.out.println("get my venue cookie: " + token);
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            List<ShowStatisticsVO> showStatisticsVOs = venuesService.getVenueStatistics(venuePO);
            return JSONArray.toJSONString(showStatisticsVOs);
        }
        else {
            System.out.println(" venuePO is null in getVenueStatistics: ");
            return "";
        }
    }

    @RequestMapping(value = "/updateVenueInfo", method = RequestMethod.POST)
    public @ResponseBody String updateVenueInfo(@CookieValue("venueToken") String token, @RequestBody UpdateVenueInfoVO updateVenueInfoVO) {
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            venuesService.updateVenueInfo(venuePO, updateVenueInfoVO);
            return JsonResult.buildResult("success", "修改已提交，请耐心等待审核。");
        }
        else {
            return JsonResult.buildResult("failure", "身份验证失败，请重新登录。");
        }
    }

    @RequestMapping(value = "/venueInfo", method = RequestMethod.GET)
    public @ResponseBody String getVenueInfo(@CookieValue("venueToken") String token) {
        System.out.println("get my venue cookie: " + token);
        VenuePO venuePO = venuesService.loadVenueByToken(token);
        if (venuePO != null) {
            UpdateVenueInfoVO vo = venuesService.getVenueInfo(venuePO);
            return JSONObject.toJSONString(vo);
        }
        else {
            return "";
        }
    }
}



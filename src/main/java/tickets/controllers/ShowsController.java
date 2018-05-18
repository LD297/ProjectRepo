package tickets.controllers;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import tickets.entities.vo.to_views.ShowDetailsVO;
import tickets.entities.vo.to_views.ShowsInHomepageVO;
import tickets.services.ShowsService;

import java.util.List;

/**
 * Created by a297 on 18/3/18.
 */
@Controller
@RequestMapping(value = "/api/shows", produces = "application/json;charset=UTF-8")
public class ShowsController {
    @Autowired
    private ShowsService showsService;

    @RequestMapping(value = "/details", method = RequestMethod.GET)
    public @ResponseBody
    String getShowDetails(@RequestParam int showId) {
        ShowDetailsVO detailsVO = showsService.getShowDetails(showId);
        return JSONObject.toJSONString(detailsVO);
    }

    @RequestMapping(value = "/sortRes", method = RequestMethod.GET)
    public @ResponseBody
    String getSortRes(@RequestParam String showType) {
        System.out.println("------------- show type: " + showType);
        List sortRes = showsService.getSortRes(showType);
        return JSONArray.toJSONString(sortRes);
    }

    @RequestMapping(value = "/showsInHomepage", method = RequestMethod.GET)
    public @ResponseBody
    String getShowsInHomepage() {
        ShowsInHomepageVO showsInHomepageVO = showsService.getShowsInHomepage();
        return JSONObject.toJSONString(showsInHomepageVO);
    }

    @RequestMapping(value = "/balances", method = RequestMethod.GET)
    public @ResponseBody
    String getBalances() {
        List unsettled = showsService.getBalances();
        return JSONArray.toJSONString(unsettled);
    }

}

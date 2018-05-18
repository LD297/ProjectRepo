package tickets.controllers;

import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import tickets.services.ShowSeatsService;
import tickets.services.UsersService;

import java.util.List;

/**
 * Created by a297 on 18/3/21.
 */
@Controller
@RequestMapping(value = "/api/showSeats", produces = "application/json;charset=UTF-8")
public class ShowSeatsController {
    @Autowired
    private UsersService usersService;
    @Autowired
    private ShowSeatsService showSeatsService;

    @RequestMapping(value = "/selectSeatsInfo", method = RequestMethod.GET)
    public @ResponseBody
    String getSelectSeatsInfo(@RequestParam int showId) {
        System.out.println("/selectSeatsInfo, showID: " + showId);
        List showSeats = showSeatsService.getShowSeatsByShowId(showId);
        return JSONArray.toJSONString(showSeats);
    }
}

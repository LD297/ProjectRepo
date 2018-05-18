package tickets.constants;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by a297 on 18/2/7.
 */
public class JsonResult {
    public static String buildResult(String msg, String words) {
        JSONObject object = new JSONObject();
        object.put("msg", msg);
        object.put("words", words);
        return object.toString();
    }
    public static String buildResult(String token, String msg, String words) {
        JSONObject object = new JSONObject();
        object.put("token", token);
        object.put("msg", msg);
        object.put("words", words);
        return object.toString();
    }
}

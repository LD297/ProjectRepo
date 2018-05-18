package tickets.utils;

import java.security.NoSuchAlgorithmException;

/**
 * Created by a297 on 18/3/12.
 */
public class Authority {
    public static String getToken(String param) {
        String token = System.currentTimeMillis() + param;
        try {
            return Encrypt.md5(token);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }
}

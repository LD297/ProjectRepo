package tickets.utils;

/**
 * Created by a297 on 18/3/30.
 */
public class VenueUtil {
    private static int VENUE_NUM = 3;
    public static String genIdentificationCode(int bit) {

        String res = VENUE_NUM + 1 + "";
        int len = res.toCharArray().length;
        int dif = bit - len;
        for (int i = 0; i < dif; i ++) {
            res += 0;
        }
        VENUE_NUM += 1;
        return res;
    }
}

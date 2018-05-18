package tickets.utils;

import java.text.DecimalFormat;

/**
 * Created by a297 on 18/3/29.
 */
public class DataFormatUtil {
    public static String keepTwoBit(double number) {
        DecimalFormat df = new DecimalFormat(".##");
        String stringNumber = df.format(number);
        return stringNumber;
    }
}

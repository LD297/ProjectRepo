package tickets.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by a297 on 18/3/19.
 */
public class TimeUtil {
    private static final int DAY_MILLIS = 24*60*60*1000;
    private static final int MINUTE_MILLIS = 60*1000;

    public static String getCurrentTime() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String currentTime = df.format(System.currentTimeMillis());
        return currentTime;
    }
    public static Timestamp getTimeStamp(String time) {
        return Timestamp.valueOf(time);
    }
    public static boolean intervalOver(String time, int i) {
        long current = System.currentTimeMillis();
        long showTime = getTimeStamp(time).getTime();
        if (showTime - current > DAY_MILLIS * i) {
            return true;
        }
        else {
            return false;
        }
    }
    public static boolean intervalOverMinute(String theTime, int i) {
        long current = System.currentTimeMillis();
        long time = getTimeStamp(theTime).getTime();
        if (current - time > MINUTE_MILLIS * i) {
            return true;
        }
        else {
            return false;
        }
    }
    private static long dateToLong(Date date) {
        return date.getTime();
    }
    public static long stringToLong(String stringTime, String formatType) {
        Date date = stringToDate(stringTime, formatType);
        if (date == null) {
            return 0;
        }
        else {
            long time = dateToLong(date);
            return time;
        }
    }
    private static Date stringToDate(String stringTime, String formatType) {
        SimpleDateFormat df = new SimpleDateFormat(formatType);
        Date date = null;
        try {
             date = df.parse(stringTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }


}

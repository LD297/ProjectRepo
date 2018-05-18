package tickets.utils;

/**
 * Created by a297 on 18/3/25.
 */
public class MembershipUtil {
    private static final String membershipTitleRules =
            "普通会员（无折扣）；白银会员（消费满3000，订票95折）；" +
                    "黄金会员（满5000，85折）；" +
                    "铂金会员（满10000，7折）";
    private static final String membershipPointRules =
            "积分兑换规则：1元＝1积分。" +
                    "500积分＝10元代金券；" +
                    "1000积分＝20元代金券；" +
                    "2000积分＝30代金券";
    
    private static final String LEVEL_1_TITLE = "普通会员";
    private static final String LEVEL_2_TITLE = "白银会员";
    private static final String LEVEL_3_TITLE = "黄金会员";
    private static final String LEVEL_4_TITLE = "铂金会员";


    public static String getMembershipTitleRules() {
        return membershipTitleRules;
    }

    public static String getMembershipPointRules() {
        return membershipPointRules;
    }

    public static String getMembershipTitle(double consumption) {
        if (consumption < 3000) {
            return LEVEL_1_TITLE;
        }
        else if (consumption < 5000) {
            return LEVEL_2_TITLE;
        }
        else if (consumption < 10000) {
            return LEVEL_3_TITLE;
        }
        return LEVEL_4_TITLE;
    }

    public static String getAvailableCoupons(double consumption) {
        int point = (int) consumption;
        String availableCoupons = "";
        if (point >= 2000) {
            availableCoupons = "30;20;10;";
        }
        else if (point >= 1000) {
            availableCoupons = "20;10;";
        }
        else if (point >= 500) {
            availableCoupons = "10;";
        }
        return availableCoupons;
    }

    public static int getMembershipPointByConsumption(String totalCost) {
        double realCost = Double.valueOf(totalCost);
        return (int) realCost;
    }

    public static int getMemberShipPointByCoupon(String coupon) {
        int couponValue = Integer.valueOf(coupon);
        if (couponValue == 10) {
            return 500;
        }
        if (couponValue ==20) {
            return 1000;
        }
        if (couponValue == 30) {
            return 2000;
        }
        return 0;
    }

    public static double getDiscount(String membershipTitle) {
        if (membershipTitle.equals(LEVEL_2_TITLE)) {
            return 0.95;
        }
        if (membershipTitle.equals(LEVEL_3_TITLE)) {
            return 0.85;
        }
        if (membershipTitle.equals(LEVEL_4_TITLE)) {
            return 0.7;
        }
        return 1.00;
    }
}

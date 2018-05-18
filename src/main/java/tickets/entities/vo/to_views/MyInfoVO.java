package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/25.
 */
public class MyInfoVO {
    private String email;
    // 用户名
    private String name;
    // 会员头衔
    private String membershipTitle;
    // 折扣
    private double discount;
    // 会员头衔规则（含优惠）
    private String membershipTitleRules;
    // 会员积分
    private int membershipPoint;
    // 会员积分规则（含优惠）
    private String membershipPointRules;
    // 可兑优惠券（以；分割）
    private String availableCoupons;
    // 我的优惠券（以；分割）
    private String myCoupons;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMembershipTitle() {
        return membershipTitle;
    }

    public void setMembershipTitle(String membershipTitle) {
        this.membershipTitle = membershipTitle;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getMembershipTitleRules() {
        return membershipTitleRules;
    }

    public void setMembershipTitleRules(String membershipTitleRules) {
        this.membershipTitleRules = membershipTitleRules;
    }

    public int getMembershipPoint() {
        return membershipPoint;
    }

    public void setMembershipPoint(int membershipPoint) {
        this.membershipPoint = membershipPoint;
    }

    public String getMembershipPointRules() {
        return membershipPointRules;
    }

    public void setMembershipPointRules(String membershipPointRules) {
        this.membershipPointRules = membershipPointRules;
    }

    public String getAvailableCoupons() {
        return availableCoupons;
    }

    public void setAvailableCoupons(String availableCoupons) {
        this.availableCoupons = availableCoupons;
    }

    public String getMyCoupons() {
        return myCoupons;
    }

    public void setMyCoupons(String myCoupons) {
        this.myCoupons = myCoupons;
    }

    @Override
    public String toString() {
        return "MyInfoVO{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", membershipTitle='" + membershipTitle + '\'' +
                ", discount=" + discount +
                ", membershipTitleRules='" + membershipTitleRules + '\'' +
                ", membershipPoint=" + membershipPoint +
                ", membershipPointRules='" + membershipPointRules + '\'' +
                ", availableCoupons='" + availableCoupons + '\'' +
                ", myCoupons='" + myCoupons + '\'' +
                '}';
    }
}

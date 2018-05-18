package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/27.
 */
public class MemberInfoVO {
    private String msg;
    private String words;

    private String userEmail;
    private String membershipTitle;
    private double discount;


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getWords() {
        return words;
    }

    public void setWords(String words) {
        this.words = words;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
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
}

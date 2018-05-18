package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/29.
 */
public class ManagerStatisticsVO {
    private int venueNum;
    private int memberNum;
    private int showNum;
    private double onlineTotalIncome;
    // onlineTotalIncome * 0.3
    private double onlineFinalIncome;

    public int getVenueNum() {
        return venueNum;
    }

    public void setVenueNum(int venueNum) {
        this.venueNum = venueNum;
    }

    public int getMemberNum() {
        return memberNum;
    }

    public void setMemberNum(int memberNum) {
        this.memberNum = memberNum;
    }

    public int getShowNum() {
        return showNum;
    }

    public void setShowNum(int showNum) {
        this.showNum = showNum;
    }

    public double getOnlineTotalIncome() {
        return onlineTotalIncome;
    }

    public void setOnlineTotalIncome(double onlineTotalIncome) {
        this.onlineTotalIncome = onlineTotalIncome;
    }

    public double getOnlineFinalIncome() {
        return onlineFinalIncome;
    }

    public void setOnlineFinalIncome(double onlineFinalIncome) {
        this.onlineFinalIncome = onlineFinalIncome;
    }

    @Override
    public String toString() {
        return "ManagerStatisticsVO{" +
                "venueNum=" + venueNum +
                ", memberNum=" + memberNum +
                ", showNum=" + showNum +
                ", onlineTotalIncome=" + onlineTotalIncome +
                ", onlineFinalIncome=" + onlineFinalIncome +
                '}';
    }
}

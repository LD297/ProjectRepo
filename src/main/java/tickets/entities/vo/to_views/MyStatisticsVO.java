package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/29.
 */
public class MyStatisticsVO {
    private int withTicketNum;
    private int refundNum;
    private double consumption;

    public int getWithTicketNum() {
        return withTicketNum;
    }

    public void setWithTicketNum(int withTicketNum) {
        this.withTicketNum = withTicketNum;
    }

    public int getRefundNum() {
        return refundNum;
    }

    public void setRefundNum(int refundNum) {
        this.refundNum = refundNum;
    }

    public double getConsumption() {
        return consumption;
    }

    public void setConsumption(double consumption) {
        this.consumption = consumption;
    }

    @Override
    public String toString() {
        return "MyStatisticsVO{" +
                "withTicketNum=" + withTicketNum +
                ", refundNum=" + refundNum +
                ", consumption=" + consumption +
                '}';
    }
}

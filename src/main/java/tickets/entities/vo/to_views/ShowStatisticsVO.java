package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/29.
 */
public class ShowStatisticsVO {
    private ShowDetailsVO showDetailsVO;
    private int onlineOrderNum;
    private int offlineOrderNum;
    private int refundOrderNum;
    private double onlineOrderMoney;
    // onlineOrderMoney * 比例
    private double onlineFinalMoney;
    private double offlineOrderMoney;

    public ShowDetailsVO getShowDetailsVO() {
        return showDetailsVO;
    }

    public void setShowDetailsVO(ShowDetailsVO showDetailsVO) {
        this.showDetailsVO = showDetailsVO;
    }

    public int getOnlineOrderNum() {
        return onlineOrderNum;
    }

    public void setOnlineOrderNum(int onlineOrderNum) {
        this.onlineOrderNum = onlineOrderNum;
    }

    public int getOfflineOrderNum() {
        return offlineOrderNum;
    }

    public void setOfflineOrderNum(int offlineOrderNum) {
        this.offlineOrderNum = offlineOrderNum;
    }

    public int getRefundOrderNum() {
        return refundOrderNum;
    }

    public void setRefundOrderNum(int refundOrderNum) {
        this.refundOrderNum = refundOrderNum;
    }

    public double getOnlineOrderMoney() {
        return onlineOrderMoney;
    }

    public void setOnlineOrderMoney(double onlineOrderMoney) {
        this.onlineOrderMoney = onlineOrderMoney;
    }

    public double getOnlineFinalMoney() {
        return onlineFinalMoney;
    }

    public void setOnlineFinalMoney(double onlineFinalMoney) {
        this.onlineFinalMoney = onlineFinalMoney;
    }

    public double getOfflineOrderMoney() {
        return offlineOrderMoney;
    }

    public void setOfflineOrderMoney(double offlineOrderMoney) {
        this.offlineOrderMoney = offlineOrderMoney;
    }

    @Override
    public String toString() {
        return "ShowStatisticsVO{" +
                "showDetailsVO=" + showDetailsVO +
                ", onlineOrderNum=" + onlineOrderNum +
                ", offlineOrderNum=" + offlineOrderNum +
                ", refundOrderNum=" + refundOrderNum +
                ", onlineOrderMoney=" + onlineOrderMoney +
                ", onlineFinalMoney=" + onlineFinalMoney +
                ", offlineOrderMoney=" + offlineOrderMoney +
                '}';
    }
}

package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/20.
 */
public class PayNowVO {
    private String orderId;
    private String totalCost;
    private int paymentType;
    private String accountId;
    private String accountPsw;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(String totalCost) {
        this.totalCost = totalCost;
    }

    public int getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(int paymentType) {
        this.paymentType = paymentType;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getAccountPsw() {
        return accountPsw;
    }

    public void setAccountPsw(String accountPsw) {
        this.accountPsw = accountPsw;
    }

    @Override
    public String toString() {
        return "PayNowVO{" +
                "orderId='" + orderId + '\'' +
                ", totalCost='" + totalCost + '\'' +
                ", paymentType='" + paymentType + '\'' +
                ", accountId='" + accountId + '\'' +
                ", accountPsw='" + accountPsw + '\'' +
                '}';
    }
}

package tickets.entities.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by a297 on 18/3/16.
 */
@Entity(name = "orders")
@Table(name = "orders")
public class OrderPO {
    // 订单id（自增）
    @Id
    private String id;
    // 下单用户
    private String userEmail;
    // 演出id
    private int showId;
    // 场馆Id
    private String venueId;
    // 订单状态
    // 0：待付款
    // 1：待配票
    // 2：已配票
    // 3：支付超时（下单超过15min未支付）
    // 4：退款
    // 5：取消
    private int status;

    // 购买方式（"SELECT_SEATS" 或 "BUY_NOW"）
    private String buyMethod;
    /**
     * 购买方式为"SELECT_SEATS"时，填该项（以;分割）
     */
    private String showSeatIds = "";
    /**
     * 票号，以;分割
     */
    private String ticketIds = "";
    /**
     * 购买方式为"BUY_NOW"时，填该项
     */
    private String price = "";
    /**
     * 购买方式为"BUY_NOW"时，填该项
     */
    private String num = "";
    // 合计
    private String totalCost;
    // 下单时间
    private String orderTime;
    // 0：支付宝
    // 1：微信
    private int paymentType = 0;
    private String payerAccount="";

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }

    public String getVenueId() {
        return venueId;
    }

    public void setVenueId(String venueId) {
        this.venueId = venueId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getBuyMethod() {
        return buyMethod;
    }

    public void setBuyMethod(String buyMethod) {
        this.buyMethod = buyMethod;
    }

    public String getShowSeatIds() {
        return showSeatIds;
    }

    public void setShowSeatIds(String showSeatIds) {
        this.showSeatIds = showSeatIds;
    }

    public String getTicketIds() {
        return ticketIds;
    }

    public void setTicketIds(String ticketIds) {
        this.ticketIds = ticketIds;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(String totalCost) {
        this.totalCost = totalCost;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public int getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(int paymentType) {
        this.paymentType = paymentType;
    }

    public String getPayerAccount() {
        return payerAccount;
    }

    public void setPayerAccount(String payerAccount) {
        this.payerAccount = payerAccount;
    }

    @Override
    public String toString() {
        return "OrderPO{" +
                "id='" + id + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", showId=" + showId +
                ", venueId='" + venueId + '\'' +
                ", status=" + status +
                ", buyMethod='" + buyMethod + '\'' +
                ", showSeatIds='" + showSeatIds + '\'' +
                ", ticketIds='" + ticketIds + '\'' +
                ", price='" + price + '\'' +
                ", num='" + num + '\'' +
                ", totalCost='" + totalCost + '\'' +
                ", orderTime='" + orderTime + '\'' +
                ", paymentType=" + paymentType +
                ", payerAccount='" + payerAccount + '\'' +
                '}';
    }
}

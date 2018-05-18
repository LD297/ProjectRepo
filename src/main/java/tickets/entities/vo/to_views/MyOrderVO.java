package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/19.
 */
public class MyOrderVO {
    private String orderId;
    private int status;

    private int showId;
    private String description;
    private String showTime;
    private String address;
    private String posterUrl;

    private String buyMethod;
    private String seatsCoordinate;
    private String ticketIds;
    private String ticketStatuses;
    private String price;
    private String num;

    private String totalCost;
    private String orderTime;
    private int paymentType;

    private String refund;
    private String refundDescription;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getBuyMethod() {
        return buyMethod;
    }

    public void setBuyMethod(String buyMethod) {
        this.buyMethod = buyMethod;
    }

    public String getSeatsCoordinate() {
        return seatsCoordinate;
    }

    public void setSeatsCoordinate(String seatsCoordinate) {
        this.seatsCoordinate = seatsCoordinate;
    }

    public String getTicketIds() {
        return ticketIds;
    }

    public void setTicketIds(String ticketIds) {
        this.ticketIds = ticketIds;
    }

    public String getTicketStatuses() {
        return ticketStatuses;
    }

    public void setTicketStatuses(String ticketStatuses) {
        this.ticketStatuses = ticketStatuses;
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

    public String getRefund() {
        return refund;
    }

    public void setRefund(String refund) {
        this.refund = refund;
    }

    public String getRefundDescription() {
        return refundDescription;
    }

    public void setRefundDescription(String refundDescription) {
        this.refundDescription = refundDescription;
    }

    @Override
    public String toString() {
        return "MyOrderVO{" +
                "orderId='" + orderId + '\'' +
                ", status=" + status +
                ", showId=" + showId +
                ", description='" + description + '\'' +
                ", showTime='" + showTime + '\'' +
                ", address='" + address + '\'' +
                ", posterUrl='" + posterUrl + '\'' +
                ", buyMethod='" + buyMethod + '\'' +
                ", seatsCoordinate='" + seatsCoordinate + '\'' +
                ", ticketIds='" + ticketIds + '\'' +
                ", ticketStatuses='" + ticketStatuses + '\'' +
                ", price='" + price + '\'' +
                ", num='" + num + '\'' +
                ", totalCost='" + totalCost + '\'' +
                ", orderTime='" + orderTime + '\'' +
                ", paymentType=" + paymentType +
                ", refund='" + refund + '\'' +
                ", refundDescription='" + refundDescription + '\'' +
                '}';
    }
}

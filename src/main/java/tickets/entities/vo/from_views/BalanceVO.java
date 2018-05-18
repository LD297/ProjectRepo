package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/28.
 */
public class BalanceVO {
    private int balanced;
    private String posterUrl;
    private String description;
    private String address;
    private String stageName;
    private String venueId;
    private String showTime;
    private int ticketNumber;
    private String ticketNumberPercent;
    private double money;
    private int showId;

    private int paymentType;
    private String accountId;
    private String accountPsw;

    public int getBalanced() {
        return balanced;
    }

    public void setBalanced(int balanced) {
        this.balanced = balanced;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public String getVenueId() {
        return venueId;
    }

    public void setVenueId(String venueId) {
        this.venueId = venueId;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public int getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(int ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getTicketNumberPercent() {
        return ticketNumberPercent;
    }

    public void setTicketNumberPercent(String ticketNumberPercent) {
        this.ticketNumberPercent = ticketNumberPercent;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
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
        return "BalanceVO{" +
                "balanced=" + balanced +
                ", posterUrl='" + posterUrl + '\'' +
                ", description='" + description + '\'' +
                ", address='" + address + '\'' +
                ", stageName='" + stageName + '\'' +
                ", venueId='" + venueId + '\'' +
                ", showTime='" + showTime + '\'' +
                ", ticketNumber=" + ticketNumber +
                ", ticketNumberPercent='" + ticketNumberPercent + '\'' +
                ", money=" + money +
                ", showId=" + showId +
                ", paymentType=" + paymentType +
                ", accountId='" + accountId + '\'' +
                ", accountPsw='" + accountPsw + '\'' +
                '}';
    }
}

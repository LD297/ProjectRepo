package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/27.
 */
public class GenMemberOrderVO {
    private int showId;
    // "SELECT_SEATS" 或 "BUY_NOW"
    private String buyMethod;
    private String seatsCoordinate;
    private String price;
    private String num;
    private String selectCoupon;
    private double cost;
    private String userEmail;
    private double finalCost;

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
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

    public String getSelectCoupon() {
        return selectCoupon;
    }

    public void setSelectCoupon(String selectCoupon) {
        this.selectCoupon = selectCoupon;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public double getFinalCost() {
        return finalCost;
    }

    public void setFinalCost(double finalCost) {
        this.finalCost = finalCost;
    }

    @Override
    public String toString() {
        return "GenMemberOrderVO{" +
                "showId=" + showId +
                ", buyMethod='" + buyMethod + '\'' +
                ", seatsCoordinate='" + seatsCoordinate + '\'' +
                ", price='" + price + '\'' +
                ", num='" + num + '\'' +
                ", selectCoupon='" + selectCoupon + '\'' +
                ", cost=" + cost +
                ", userEmail='" + userEmail + '\'' +
                ", finalCost=" + finalCost +
                '}';
    }
}

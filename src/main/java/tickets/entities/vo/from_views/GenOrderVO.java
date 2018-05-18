package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/19.
 *
 * 1、SELECT_SEATS（选座购买，1～6张）
 *      座位信息："1，1；1，2；"
 * 2、BUY_NOW（立即购买，1～20张，演出前两周配票，失败则退款）
 *      价格、数量："2.00;3"
 */

public class GenOrderVO {
    private int showId;
    // "SELECT_SEATS" 或 "BUY_NOW"
    private String buyMethod;
    private String seatsCoordinate;
    private String price;
    private String num;
    private String selectCoupon;
    private String cost;

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

    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    @Override
    public String toString() {
        return "GenOrderVO{" +
                "showId=" + showId +
                ", buyMethod='" + buyMethod + '\'' +
                ", seatsCoordinate='" + seatsCoordinate + '\'' +
                ", price='" + price + '\'' +
                ", num='" + num + '\'' +
                ", selectCoupon='" + selectCoupon + '\'' +
                ", cost='" + cost + '\'' +
                '}';
    }
}

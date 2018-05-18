package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/21.
 */
public class ShowSeatVO {
    private int showSeatId;
    private int lineNumber;
    private int colNumber;
    // 0：可售
    // 1：已售
    // 2：锁定
    private int status;
    private double price;
    private int priceLevel;

    public int getShowSeatId() {
        return showSeatId;
    }

    public void setShowSeatId(int showSeatId) {
        this.showSeatId = showSeatId;
    }

    public int getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(int lineNumber) {
        this.lineNumber = lineNumber;
    }

    public int getColNumber() {
        return colNumber;
    }

    public void setColNumber(int colNumber) {
        this.colNumber = colNumber;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getPriceLevel() {
        return priceLevel;
    }

    public void setPriceLevel(int priceLevel) {
        this.priceLevel = priceLevel;
    }

    @Override
    public String toString() {
        return "ShowSeatVO{" +
                "showSeatId=" + showSeatId +
                ", lineNumber=" + lineNumber +
                ", colNumber=" + colNumber +
                ", status=" + status +
                ", price=" + price +
                ", priceLevel=" + priceLevel +
                '}';
    }
}

package tickets.entities.po;

import javax.persistence.*;

/**
 * Created by a297 on 18/3/16.
 */
@Entity(name = "showSeats")
@Table(name = "showSeats")
public class ShowSeatPO {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private int showId;
    private int lineNumber;
    private int colNumber;
    // 0：可售
    // 1：已售
    // 2：锁定
    private int status = 0;
    private double price;
    private int priceLevel;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
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
        return "ShowSeatPO{" +
                "id=" + id +
                ", showId=" + showId +
                ", lineNumber=" + lineNumber +
                ", colNumber=" + colNumber +
                ", status=" + status +
                ", price=" + price +
                ", priceLevel=" + priceLevel +
                '}';
    }
}

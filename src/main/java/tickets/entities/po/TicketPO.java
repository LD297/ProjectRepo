package tickets.entities.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by a297 on 18/3/28.
 */
@Entity(name = "tickets")
@Table(name = "tickets")
public class TicketPO {
    @Id
    private String ticketId;
    /**
     * 0：未检票
     * 1：已检票
     */
    private int checked;
    private int showId;
    private String orderId;
    /**
     * 是用户线上订的
     * 还是线下购买
     */
    private int online;

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public int getChecked() {
        return checked;
    }

    public void setChecked(int checked) {
        this.checked = checked;
    }

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getOnline() {
        return online;
    }

    public void setOnline(int online) {
        this.online = online;
    }

    @Override
    public String toString() {
        return "TicketPO{" +
                "ticketId='" + ticketId + '\'' +
                ", checked=" + checked +
                ", showId=" + showId +
                ", orderId='" + orderId + '\'' +
                ", online=" + online +
                '}';
    }
}

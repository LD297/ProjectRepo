package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/28.
 */
public class CheckTicketsLiveVO {
    private int showId;
    private String ticketNumber;

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    @Override
    public String toString() {
        return "CheckTicketsLiveVO{" +
                "showId=" + showId +
                ", ticketNumber='" + ticketNumber + '\'' +
                '}';
    }
}

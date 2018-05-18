package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/18.
 */
public class ShowDetailsVO {
    private int showId;
    private String description;
    private String showTime;
    private String address;
    private String posterUrl;
    private String prices;

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

    public String getPrices() {
        return prices;
    }

    public void setPrices(String prices) {
        this.prices = prices;
    }

    @Override
    public String toString() {
        return "ShowDetailsVO{" +
                "showId=" + showId +
                ", description='" + description + '\'' +
                ", showTime='" + showTime + '\'' +
                ", address='" + address + '\'' +
                ", posterUrl='" + posterUrl + '\'' +
                ", prices='" + prices + '\'' +
                '}';
    }
}

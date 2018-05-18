package tickets.entities.vo.from_views;

import java.util.List;

/**
 * Created by a297 on 18/3/14.
 */
public class ReleaseVO {
    private String venueId;
    private String showTime;
    private String type;
    private String description;
    private String posterUrl;
    private List prices;
    private List showSeatsInfo;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public List getPrices() {
        return prices;
    }

    public void setPrices(List prices) {
        this.prices = prices;
    }

    public List getShowSeatsInfo() {
        return showSeatsInfo;
    }

    public void setShowSeatsInfo(List showSeatsInfo) {
        this.showSeatsInfo = showSeatsInfo;
    }

    @Override
    public String toString() {
        return "ReleaseVO{" +
                "venueId='" + venueId + '\'' +
                ", showTime='" + showTime + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", posterUrl='" + posterUrl + '\'' +
                ", prices=" + prices +
                ", showSeatsInfo=" + showSeatsInfo +
                '}';
    }
}

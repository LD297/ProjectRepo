package tickets.entities.po;

import javax.persistence.*;

/**
 * Created by a297 on 18/3/14.
 */
@Entity(name = "shows")
@Table(name = "shows")
public class ShowPO {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private String venueId;
    // 演出开始时间（暂定无场次区别）
    private String showTime;
    private String type;
    private String description;
    private String posterUrl;
    private String prices;
    private int balanced;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getPrices() {
        return prices;
    }

    public void setPrices(String prices) {
        this.prices = prices;
    }

    public int getBalanced() {
        return balanced;
    }

    public void setBalanced(int balanced) {
        this.balanced = balanced;
    }

    @Override
    public String toString() {
        return "ShowPO{" +
                "id=" + id +
                ", venueId='" + venueId + '\'' +
                ", showTime='" + showTime + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", posterUrl='" + posterUrl + '\'' +
                ", prices='" + prices + '\'' +
                ", balanced=" + balanced +
                '}';
    }
}

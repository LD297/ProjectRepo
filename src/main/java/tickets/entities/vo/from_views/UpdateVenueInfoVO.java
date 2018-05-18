package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/30.
 */
public class UpdateVenueInfoVO {
    private String venueId;
    private String name;
    private String address;
    private int status;

    public String getVenueId() {
        return venueId;
    }

    public void setVenueId(String venueId) {
        this.venueId = venueId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UpdateVenueInfoVO{" +
                "venueId='" + venueId + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", status=" + status +
                '}';
    }
}

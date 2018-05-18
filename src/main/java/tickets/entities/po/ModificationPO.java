package tickets.entities.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by a297 on 18/3/30.
 */
@Entity(name = "modifications")
@Table(name = "modifications")
public class ModificationPO {
    @Id
    private String venueId;
    private String name;
    private String address;
    // 0待审核，1审核通过，2审核失败
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
        return "ModificationPO{" +
                "venueId='" + venueId + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", status=" + status +
                '}';
    }
}

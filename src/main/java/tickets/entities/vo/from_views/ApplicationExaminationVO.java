package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/13.
 *
 * 界面 --> controller
 * 经历审核场馆
 */
public class ApplicationExaminationVO {
    private String operation;
    private String venueId;

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getVenueId() {
        return venueId;
    }

    public void setVenueId(String venueId) {
        this.venueId = venueId;
    }
}

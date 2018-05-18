package tickets.entities.vo.back_end;

/**
 * Created by a297 on 18/3/11.
 */
public class SeatVO {
    private int status;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "SeatVO{" +
                "status=" + status +
                '}';
    }
}

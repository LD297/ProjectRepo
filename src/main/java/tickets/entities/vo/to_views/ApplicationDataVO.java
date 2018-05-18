package tickets.entities.vo.to_views;

/**
 * Created by a297 on 18/3/12.
 *
 * controller --> 界面
 * 经理查看申请
 */
public class ApplicationDataVO {
    private String id;
    private String address;
    private String stageName;
    private int row;
    private int col;
    private int used;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public int getUsed() {
        return used;
    }

    public void setUsed(int used) {
        this.used = used;
    }

    @Override
    public String toString() {
        return "ApplicationDataVO{" +
                "id='" + id + '\'' +
                ", address='" + address + '\'' +
                ", stageName='" + stageName + '\'' +
                ", row=" + row +
                ", col=" + col +
                ", used=" + used +
                '}';
    }
}

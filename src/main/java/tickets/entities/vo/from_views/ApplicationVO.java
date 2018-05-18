package tickets.entities.vo.from_views;

/**
 * Created by a297 on 18/3/11.
 *
 * 界面 --> controller
 * 场馆申请
 */
public class ApplicationVO {
    private String address;
    private String stageName;
    private String psw;
    private int row;
    private int col;

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

    public String getPsw() {
        return psw;
    }

    public void setPsw(String psw) {
        this.psw = psw;
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

    @Override
    public String toString() {
        return "ApplicationVO{" +
                "address='" + address + '\'' +
                ", stageName='" + stageName + '\'' +
                ", psw='" + psw + '\'' +
                ", row=" + row +
                ", col=" + col +
                '}';
    }
}

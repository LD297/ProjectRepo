package tickets.entities.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by a297 on 18/3/9.
 */
@Entity(name = "venues")
@Table(name = "venues")
public class VenuePO {
    @Id
    private String id;
    private String psw;
    private String address;
    private String stageName;
    private int row = 0;
    private int col = 0;
    private String token = "";
    // －1：未申请(不通过)
    // 0：待审核
    // 1：通过
    private int used = -1;
    private String accountId = "3";

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPsw() {
        return psw;
    }

    public void setPsw(String psw) {
        this.psw = psw;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getUsed() {
        return used;
    }

    public void setUsed(int used) {
        this.used = used;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @Override
    public String toString() {
        return "VenuePO{" +
                "id='" + id + '\'' +
                ", psw='" + psw + '\'' +
                ", address='" + address + '\'' +
                ", stageName='" + stageName + '\'' +
                ", row=" + row +
                ", col=" + col +
                ", token='" + token + '\'' +
                ", used=" + used +
                ", accountId='" + accountId + '\'' +
                '}';
    }
}

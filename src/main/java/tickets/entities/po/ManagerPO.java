package tickets.entities.po;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by a297 on 18/3/12.
 */
@Entity(name = "managers")
public class ManagerPO {
    @Id
    private String id;
    private String psw;
    private String token;
    private String accountId;

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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @Override
    public String toString() {
        return "ManagerPO{" +
                "id='" + id + '\'' +
                ", psw='" + psw + '\'' +
                ", token='" + token + '\'' +
                ", accountId='" + accountId + '\'' +
                '}';
    }
}

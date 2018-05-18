package tickets.entities.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by a297 on 18/3/16.
 */
@Entity(name = "accounts")
@Table(name = "accounts")
public class AccountPO {
    @Id
    private String accountId;
    private String accountPsw;
    private double yuE;
    // 0：支付宝
    // 1：微信
    private int accountType;

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getAccountPsw() {
        return accountPsw;
    }

    public void setAccountPsw(String accountPsw) {
        this.accountPsw = accountPsw;
    }

    public double getYuE() {
        return yuE;
    }

    public void setYuE(double yuE) {
        this.yuE = yuE;
    }

    public int getAccountType() {
        return accountType;
    }

    public void setAccountType(int accountType) {
        this.accountType = accountType;
    }

    @Override
    public String toString() {
        return "AccountPO{" +
                "accountId='" + accountId + '\'' +
                ", accountPsw='" + accountPsw + '\'' +
                ", yuE=" + yuE +
                ", accountType=" + accountType +
                '}';
    }
}

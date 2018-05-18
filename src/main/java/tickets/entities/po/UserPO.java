package tickets.entities.po;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

/**
 * Created by a297 on 18/2/6.
 */
@Entity
@Table(name = "users")
public class UserPO {
    @Id
    private String email;
    private String name;
    private int status;
    private String token;
    private Timestamp activateTime;
    private String password;
    private String cookie;
    // 该用户是否被注销
    // 0：否
    // 1：是
    private int cancel = 0;
    private double consumption = 0.00;
    private int membershipPoint = 0;
    // 以；分割的优惠券面值
    private String coupons = "";

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Timestamp getActivateTime() {
        return activateTime;
    }

    public void setActivateTime(Timestamp activateTime) {
        this.activateTime = activateTime;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCookie() {
        return cookie;
    }

    public void setCookie(String cookie) {
        this.cookie = cookie;
    }

    public int getCancel() {
        return cancel;
    }

    public void setCancel(int cancel) {
        this.cancel = cancel;
    }

    public double getConsumption() {
        return consumption;
    }

    public void setConsumption(double consumption) {
        this.consumption = consumption;
    }

    public int getMembershipPoint() {
        return membershipPoint;
    }

    public void setMembershipPoint(int membershipPoint) {
        this.membershipPoint = membershipPoint;
    }

    public String getCoupons() {
        return coupons;
    }

    public void setCoupons(String coupons) {
        this.coupons = coupons;
    }

}

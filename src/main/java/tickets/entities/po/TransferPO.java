package tickets.entities.po;

import javax.persistence.*;

/**
 * Created by a297 on 18/3/16.
 */
@Entity(name = "transfers")
@Table(name = "transfers")
public class TransferPO {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int transferId;
    // 支付方
    private String payerAccountId;
    // 收款方
    private String receiverAccountId;
    // 0：支付宝
    // 1：微信
    private int paymentType;
    // 转账金额
    private double money;

    public int getTransferId() {
        return transferId;
    }

    public void setTransferId(int transferId) {
        this.transferId = transferId;
    }

    public String getPayerAccountId() {
        return payerAccountId;
    }

    public void setPayerAccountId(String payerAccountId) {
        this.payerAccountId = payerAccountId;
    }

    public String getReceiverAccountId() {
        return receiverAccountId;
    }

    public void setReceiverAccountId(String receiverAccountId) {
        this.receiverAccountId = receiverAccountId;
    }

    public int getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(int paymentType) {
        this.paymentType = paymentType;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "TransferPO{" +
                "transferId=" + transferId +
                ", payerAccountId='" + payerAccountId + '\'' +
                ", receiverAccountId='" + receiverAccountId + '\'' +
                ", paymentType=" + paymentType +
                ", money=" + money +
                '}';
    }
}

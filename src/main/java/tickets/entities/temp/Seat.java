package tickets.entities.temp;

/**
 * Created by a297 on 18/3/9.
 */
public class Seat {
    // 场馆7位识别码
    private String id;
    // 几排
    private int lineNumber;
    // 几座
    private int colNumber;
    // 0：无效格子
    // 1：有座位（可售）
    // 3：已售
    // 4：锁定（待支付）
    private int status;
    // 当前座位价格
    // 默认0
    private double price = 0.00;
    // 价格等级（便于界面显示颜色）
    // 取值：1、2、3
    private int priceLevel;
}

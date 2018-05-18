package tickets.entities.temp;

import java.util.List;

/**
 * Created by a297 on 18/3/9.
 */
public class SeatsInLine {
    // 场馆7位识别码
    private String id;
    // 第几排
    private int lineNumber;
    // 每一排座位（每一排格子）
    private List<Seat> seats;
}

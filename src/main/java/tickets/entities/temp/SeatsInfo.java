package tickets.entities.temp;

import java.util.List;

/**
 * Created by a297 on 18/3/9.
 */
public class SeatsInfo {
    // 场馆7位识别码
    private String id;
    // 座位信息（所有格子）
    private List<SeatsInLine> seatsInLines;
}

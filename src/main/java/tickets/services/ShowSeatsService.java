package tickets.services;

import java.util.List;

/**
 * Created by a297 on 18/3/16.
 */
public interface ShowSeatsService {
    void saveShowSeatsInfo(int showId, List showSeatsInfo);

    String getShowSeatIds(int showId, String seatsCoordinate);

    String getSeatsCoordinate(String showSeatIds);

    void changeStatus(int id, int status);

    List getShowSeatsByShowId(int showId);
}

package tickets.services;

import tickets.entities.vo.to_views.ShowDetailsVO;
import tickets.entities.vo.to_views.ShowsInHomepageVO;

import java.util.List;

/**
 * Created by a297 on 18/3/16.
 */
public interface ShowsService {
    ShowDetailsVO getShowDetails(int showId);

    String getVenueIdByShowId(int showId);

    List getSortRes(String showType);

    ShowsInHomepageVO getShowsInHomepage();

    void changeBalanced(int showId, int i);

    List getBalances();
}

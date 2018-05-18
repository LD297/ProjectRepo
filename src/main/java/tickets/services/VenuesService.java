package tickets.services;

import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.ApplicationVO;
import tickets.entities.vo.from_views.UpdateVenueInfoVO;
import tickets.entities.vo.to_views.ShowStatisticsVO;
import tickets.entities.vo.to_views.VenueInfoVO;
import tickets.entities.vo.from_views.ReleaseVO;

import java.util.List;

/**
 * Created by a297 on 18/3/9.
 */
public interface VenuesService {
    VenuePO loadVenueById(String id);
    String login(VenuePO venuePO);
    VenuePO loadVenueByToken(String token);
    /**
     *
     * @param venueId
     * @param i venuePO: used属性的值，0为待审核，1为通过，－1不通过(初始为－1)
     * @return
     */
    String changeUsed(String venueId, int i);
    VenueInfoVO getMyVenue(VenuePO venuePO);
    String release(ReleaseVO releaseVO);
    List getMyShows(String id);
    List getMyLiveTickets(String id);
    List<ShowStatisticsVO> getVenueStatistics(VenuePO venuePO);

    void updateVenueInfo(VenuePO venuePO, UpdateVenueInfoVO updateVenueInfoVO);

    UpdateVenueInfoVO getVenueInfo(VenuePO venuePO);

    String apply(ApplicationVO applicationVO);
}

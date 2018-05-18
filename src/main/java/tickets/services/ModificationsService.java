package tickets.services;

import tickets.entities.po.ModificationPO;
import tickets.entities.vo.from_views.UpdateVenueInfoVO;

import java.util.List;

/**
 * Created by a297 on 18/3/30.
 */
public interface ModificationsService {
    void createModification(UpdateVenueInfoVO updateVenueInfoVO);

    ModificationPO getModificationByVenueId(String id);

    List<ModificationPO> getAllModifications();

    ModificationPO findByVenueId(String venueId);
}

package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tickets.dao.ModificationsRepository;
import tickets.entities.po.ModificationPO;
import tickets.entities.vo.from_views.UpdateVenueInfoVO;
import tickets.services.ModificationsService;

import java.util.List;

/**
 * Created by a297 on 18/3/30.
 */
@Service
public class ModificationsServiceImpl implements ModificationsService {
    @Autowired
    private ModificationsRepository modificationsRepository;
    @Override
    public void createModification(UpdateVenueInfoVO updateVenueInfoVO) {
        ModificationPO modificationPO = new ModificationPO();
        modificationPO.setVenueId(updateVenueInfoVO.getVenueId());
        modificationPO.setName(updateVenueInfoVO.getName());
        modificationPO.setAddress(updateVenueInfoVO.getAddress());
        modificationPO.setStatus(0);
        modificationsRepository.save(modificationPO);
    }

    @Override
    public ModificationPO getModificationByVenueId(String id) {
        return modificationsRepository.findByVenueId(id);
    }

    @Override
    public List<ModificationPO> getAllModifications() {
        return modificationsRepository.findAll();
    }

    @Override
    public ModificationPO findByVenueId(String venueId) {
        return modificationsRepository.findByVenueId(venueId);
    }
}

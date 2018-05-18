package tickets.services;

import tickets.entities.po.ManagerPO;
import tickets.entities.vo.from_views.ApplicationExaminationVO;
import tickets.entities.vo.from_views.BalanceVO;
import tickets.entities.vo.from_views.UpdateVenueInfoVO;
import tickets.entities.vo.to_views.ManagerStatisticsVO;

import java.util.List;

/**
 * Created by a297 on 18/3/12.
 */
public interface ManagersService {
    ManagerPO loadManagerById(String id);

    String login(ManagerPO managerPO);

    ManagerPO loadManagerByToken(String token);

    List fetchApplications();

    String applicationExamination(ApplicationExaminationVO vo);

    String balance(BalanceVO balanceVO, ManagerPO managerPO);

    ManagerStatisticsVO getManagerStatistics(ManagerPO managerPO);

    List<UpdateVenueInfoVO> fetchModifications();

    String modificationExamination(ApplicationExaminationVO vo);
}

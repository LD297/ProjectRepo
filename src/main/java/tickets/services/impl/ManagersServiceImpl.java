package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tickets.dao.*;
import tickets.entities.po.ManagerPO;
import tickets.entities.po.ModificationPO;
import tickets.entities.po.OrderPO;
import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.ApplicationExaminationVO;
import tickets.entities.vo.from_views.BalanceVO;
import tickets.entities.vo.from_views.UpdateVenueInfoVO;
import tickets.entities.vo.to_views.ApplicationDataVO;
import tickets.entities.vo.to_views.ManagerStatisticsVO;
import tickets.services.*;
import tickets.utils.Authority;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by a297 on 18/3/12.
 */
@Service
public class ManagersServiceImpl implements ManagersService {
    @Autowired
    private ManagersRepository managersRepository;
    @Autowired
    private VenuesRepository venuesRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ShowsRepository showsRepository;
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private VenuesService venuesService;
    @Autowired
    private TransfersService transfersService;
    @Autowired
    private ShowsService showsService;
    @Autowired
    private ModificationsService modificationsService;
    @Autowired
    private TransfersRepository transfersRepository;

    @Override
    public ManagerPO loadManagerById(String id) {
        return managersRepository.findById(id);
    }

    @Override
    public String login(ManagerPO managerPO) {
        String token = Authority.getToken(managerPO.getId());
        managerPO.setToken(token);
        managersRepository.save(managerPO);
        return token;
    }

    @Override
    public ManagerPO loadManagerByToken(String token) {
        return managersRepository.findByToken(token);
    }

    @Override
    public List fetchApplications() {
        // 所有场馆
        List<VenuePO> venuePOs = venuesRepository.findAll();
        List<ApplicationDataVO> dataVOs = new ArrayList<>();
        for (VenuePO venue: venuePOs) {
            String venueId = venue.getId();
            ApplicationDataVO dataVO = new ApplicationDataVO();
            dataVO.setId(venueId);
            dataVO.setAddress(venue.getAddress());
            dataVO.setStageName(venue.getStageName());
            dataVO.setRow(venue.getRow());
            dataVO.setCol(venue.getCol());
            dataVO.setUsed(venue.getUsed());
            dataVOs.add(dataVO);
        }
        return dataVOs;
    }

    @Override
    public String applicationExamination(ApplicationExaminationVO vo) {
        String operation = vo.getOperation();
        String venueId = vo.getVenueId();
        if ("pass".equals(operation)) {
            return venuesService.changeUsed(venueId, 1);
        }
        else if ("out".equals(operation)) {
            return venuesService.changeUsed(venueId, 2);
        }
        else {
            return "failure";
        }
    }

    @Override
    public String balance(BalanceVO balanceVO, ManagerPO managerPO) {
        /**
         * 1、经理account -- 转账 --> 场馆account
         * 2、修改show的balanced
         */
        String venueId = balanceVO.getVenueId();
        double money = balanceVO.getMoney();
        VenuePO venuePO = venuesService.loadVenueById(venueId);
        String venueAccountId = venuePO.getAccountId();
        int paymentType = balanceVO.getPaymentType();
        String psw = balanceVO.getAccountPsw();
        String accountId = balanceVO.getAccountId();
        String res = transfersService.transfer(accountId, psw, paymentType, venueAccountId, money);
        if (res.split(";")[0].equals("success")) {
            // 修改show的balanced
            showsService.changeBalanced(balanceVO.getShowId(), 1);
        }
        return res;
    }

    @Override
    public ManagerStatisticsVO getManagerStatistics(ManagerPO managerPO) {
        ManagerStatisticsVO statisticsVO = new ManagerStatisticsVO();
        List venues = venuesRepository.findByUsed(1);
        int venueNum = venues.size();
        statisticsVO.setVenueNum(venueNum);

        List members = usersRepository.findByCancel(0);
        int memberNum = members.size();
        statisticsVO.setMemberNum(memberNum);

        List shows = showsRepository.findAll();
        int showNum = shows.size();
        statisticsVO.setShowNum(showNum);

        String accountId = managerPO.getAccountId();

        // 在线销售额
        List<OrderPO> orders = ordersRepository.findByStatus(2);
        double in = 0;
        for (OrderPO orderPO: orders) {
            in += Double.valueOf(orderPO.getTotalCost());
        }
        statisticsVO.setOnlineTotalIncome(in);
        statisticsVO.setOnlineFinalIncome(in * 0.3);
        return statisticsVO;
    }

    @Override
    public List<UpdateVenueInfoVO> fetchModifications() {
        List<ModificationPO> pos = modificationsService.getAllModifications();
        List<UpdateVenueInfoVO> vos = new ArrayList<>(pos.size());
        for (ModificationPO po: pos) {

            UpdateVenueInfoVO vo = new UpdateVenueInfoVO();
            vo.setVenueId(po.getVenueId());
            vo.setName(po.getName());
            vo.setAddress(po.getAddress());
            vo.setStatus(po.getStatus());

            vos.add(vo);
        }
        return vos;
    }

    @Override
    @Transactional
    @Modifying
    public String modificationExamination(ApplicationExaminationVO vo) {
        /**
         * 1、修改modificationPO
         * 2、修改venuePO
         */
        String venueId = vo.getVenueId();
        ModificationPO modificationPO = modificationsService.findByVenueId(venueId);
        VenuePO venuePO = venuesRepository.findById(venueId);
        String operation = vo.getOperation();
        if ("pass".equals(operation)) {

            modificationPO.setStatus(1);

            venuePO.setAddress(modificationPO.getAddress());
            venuePO.setStageName(modificationPO.getName());

            return "success";
        }
        else if ("out".equals(operation)) {
            modificationPO.setStatus(2);
            return "success";
        }
        else {
            return "failure";
        }
    }
}

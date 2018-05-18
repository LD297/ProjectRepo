package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tickets.dao.ShowsRepository;
import tickets.dao.VenuesRepository;
import tickets.entities.po.ModificationPO;
import tickets.entities.po.OrderPO;
import tickets.entities.po.ShowPO;
import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.ApplicationVO;
import tickets.entities.vo.from_views.ReleaseVO;
import tickets.entities.vo.from_views.UpdateVenueInfoVO;
import tickets.entities.vo.to_views.ShowDetailsVO;
import tickets.entities.vo.to_views.ShowStatisticsVO;
import tickets.entities.vo.to_views.VenueInfoVO;
import tickets.services.*;
import tickets.utils.Authority;
import tickets.utils.TimeUtil;
import tickets.utils.VenueUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by a297 on 18/3/9.
 */
@Service
public class VenuesServiceImpl implements VenuesService {
    @Autowired
    private ShowSeatsService showSeatsService;
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private ShowsService showsService;
    @Autowired
    private TicketsService ticketsService;
    @Autowired
    private ModificationsService modificationsService;
    @Autowired
    private VenuesRepository venuesRepository;
    @Autowired
    private ShowsRepository showsRepository;

    @Override
    public VenuePO loadVenueById(String id) {
        return venuesRepository.findById(id);
    }

    @Override
    public String login(VenuePO venuePO) {
        String token = Authority.getToken(venuePO.getId());
        venuePO.setToken(token);
        venuesRepository.save(venuePO);
        return token;
    }

    @Override
    public VenuePO loadVenueByToken(String token) {
        return venuesRepository.findByToken(token);
    }


    /**
     * 0、如果申请过（未审核｜已批准｜已拒绝），删除数据库中原座位信息
     * 1、设置"地址、舞台名称、可选票价"
     * 2、设置状态为待审核(used=0)
     */
    @Override
    public String apply(ApplicationVO applicationVO) {

        // 1、设置"地址、舞台名称、行、列"
        VenuePO venuePO = new VenuePO();
        venuePO.setAddress(applicationVO.getAddress());
        venuePO.setStageName(applicationVO.getStageName());
        venuePO.setPsw(applicationVO.getPsw());
        venuePO.setRow(applicationVO.getRow());
        venuePO.setCol(applicationVO.getCol());
        // 2、设置状态为待审核(used=0)
        venuePO.setUsed(0);

        String venueId = VenueUtil.genIdentificationCode(7);
        venuePO.setId(venueId);
        System.out.println("生成场馆id：" + venueId);
        venuesRepository.save(venuePO);

        return venueId;
    }

    @Override
    public String changeUsed(String venueId, int i) {
        VenuePO venuePO = loadVenueById(venueId);
        if (venuePO != null) {
            venuePO.setUsed(i);
            venuesRepository.save(venuePO);
            return "success";
        }
        else {
            return "failure";
        }
    }

    @Override
    public VenueInfoVO getMyVenue(VenuePO venuePO) {

        VenueInfoVO venueInfoVO = new VenueInfoVO();

        venueInfoVO.setId(venuePO.getId());
        venueInfoVO.setAddress(venuePO.getAddress());
        venueInfoVO.setStageName(venuePO.getStageName());
        venueInfoVO.setRow(venuePO.getRow());
        venueInfoVO.setCol(venuePO.getCol());
        venueInfoVO.setUsed(venuePO.getUsed());

        return venueInfoVO;
    }

    @Override
    public String release(ReleaseVO releaseVO) {
        ShowPO showPO = new ShowPO();
        showPO.setVenueId(releaseVO.getVenueId());
        showPO.setShowTime(releaseVO.getShowTime());
        showPO.setType(releaseVO.getType());
        showPO.setDescription(releaseVO.getDescription());
        showPO.setPosterUrl(releaseVO.getPosterUrl());
        String prices = "";
        for (Object eachPrice: releaseVO.getPrices()) {
            prices += (String) eachPrice;
            prices += ";";
        }
        showPO.setPrices(prices);
        ShowPO newShowPO = showsRepository.save(showPO);

        showSeatsService.saveShowSeatsInfo(newShowPO.getId(), releaseVO.getShowSeatsInfo());

        return "success";
    }

    @Override
    public List getMyShows(String id) {
        List myShows = showsRepository.findByVenueId(id);
        return myShows;
    }

    @Override
    public List getMyLiveTickets(String id) {
        List myLiveTickets = ordersService.getOrdersByUserEmail(id);
        return myLiveTickets;
    }

    @Override
    public List<ShowStatisticsVO> getVenueStatistics(VenuePO venuePO) {
        String venueId = venuePO.getId();
        List<ShowPO> showPOs = getMyShows(venueId);
        List<ShowStatisticsVO> vos = new ArrayList<>(showPOs.size());
        for (ShowPO showPO: showPOs) {
            String time = showPO.getShowTime();
            long showTime = TimeUtil.getTimeStamp(time).getTime();
            if (showTime < System.currentTimeMillis()) {
                ShowStatisticsVO statisticsVO = new ShowStatisticsVO();

                int showId = showPO.getId();
                ShowDetailsVO showDetailsVO = showsService.getShowDetails(showId);
                statisticsVO.setShowDetailsVO(showDetailsVO);

                List<OrderPO> orderPOs = ordersService.getOrdersByShowId(showId);
                double onlineOrderMoney = 0;
                double offlineOrderMoney = 0;
                int refundOrderNum = 0;

                int onlineOrderNum = 0;
                int offlineOrderNum = 0;

                for (OrderPO order: orderPOs) {
                    assert order.getStatus() != 1;
                    if (order.getStatus() == 2) {
                        if (order.getUserEmail().equals(venueId)) {
                            offlineOrderMoney += Double.valueOf(order.getTotalCost());
                            offlineOrderNum += 1;
                        }
                        else {
                            onlineOrderMoney += Double.valueOf(order.getTotalCost());
                            onlineOrderNum += 1;
                        }
                    }
                    else if (order.getStatus() == 4) {
                        refundOrderNum += 1;
                    }
                }
                statisticsVO.setOnlineOrderMoney(onlineOrderMoney);
                statisticsVO.setOnlineFinalMoney(onlineOrderMoney * 0.7);
                statisticsVO.setOfflineOrderMoney(offlineOrderMoney);

                statisticsVO.setOnlineOrderNum(onlineOrderNum);
                statisticsVO.setOfflineOrderNum(offlineOrderNum);

                statisticsVO.setRefundOrderNum(refundOrderNum);

                System.out.println("------------ venue statistics: " + statisticsVO.toString());

                vos.add(statisticsVO);
            }
        }
        return vos;
    }

    @Override
    public void updateVenueInfo(VenuePO venuePO, UpdateVenueInfoVO updateVenueInfoVO) {
        modificationsService.createModification(updateVenueInfoVO);
    }

    @Override
    public UpdateVenueInfoVO getVenueInfo(VenuePO venuePO) {
        ModificationPO modificationPO = modificationsService.getModificationByVenueId(venuePO.getId());
        UpdateVenueInfoVO vo = new UpdateVenueInfoVO();

        if (modificationPO != null) {
            vo.setVenueId(modificationPO.getVenueId());
            vo.setName(modificationPO.getName());
            vo.setAddress(modificationPO.getAddress());
            vo.setStatus(modificationPO.getStatus());
        }
        else {
            // 没有申请修改，就是原来的信息
            vo.setVenueId(venuePO.getId());
            vo.setName(venuePO.getStageName());
            vo.setAddress(venuePO.getAddress());
            vo.setStatus(venuePO.getUsed());
        }
        return vo;
    }
}

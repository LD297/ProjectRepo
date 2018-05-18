package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tickets.dao.ShowsRepository;
import tickets.dao.VenuesRepository;
import tickets.entities.po.ShowPO;
import tickets.entities.po.VenuePO;
import tickets.entities.vo.from_views.BalanceVO;
import tickets.entities.vo.to_views.ShowDetailsVO;
import tickets.entities.vo.to_views.ShowsInHomepageVO;
import tickets.services.OrdersService;
import tickets.services.ShowsService;
import tickets.services.TicketsService;
import tickets.utils.DataFormatUtil;
import tickets.utils.TimeUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by a297 on 18/3/18.
 */
@Service
public class ShowsServiceImpl implements ShowsService {
    @Autowired
    private TicketsService ticketsService;
    @Autowired
    private ShowsRepository showsRepository;
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private VenuesRepository venuesRepository;

    @Override
    public ShowDetailsVO getShowDetails(int showId) {
        ShowDetailsVO detailsVO = new ShowDetailsVO();
        detailsVO.setShowId(showId);

        ShowPO showPO = showsRepository.findById(showId);
        detailsVO.setDescription(showPO.getDescription());
        detailsVO.setShowTime(showPO.getShowTime());
        detailsVO.setPosterUrl(showPO.getPosterUrl());
        detailsVO.setPrices(showPO.getPrices());

        String venueId = showPO.getVenueId();
        VenuePO venuePO = venuesRepository.findById(venueId);
        detailsVO.setAddress(venuePO.getAddress());

        return detailsVO;
    }

    @Override
    public String getVenueIdByShowId(int showId) {
        ShowPO showPO = showsRepository.findById(showId);
        return showPO.getVenueId();
    }

    @Override
    public List getSortRes(String showType) {
        List<ShowPO> showPOs = filterNotStart(showsRepository.findByType(showType));
        List showDetailsVOs = new ArrayList();
        for (ShowPO showPO: showPOs) {
            int showId = showPO.getId();
            ShowDetailsVO showDetailsVO = getShowDetails(showId);
            showDetailsVOs.add(showDetailsVO);
        }
        return showDetailsVOs;
    }

    private List filterNotStart(List<ShowPO> shows) {
        // 检查是否过期
        List<ShowPO> notStart = new ArrayList<>(shows.size());
        long current = System.currentTimeMillis();
        for (ShowPO showPO: shows) {
            String time = showPO.getShowTime();
            long longShowTime = TimeUtil.getTimeStamp(time).getTime();
            if (longShowTime > current) {
                notStart.add(showPO);
            }
        }
        return notStart;
    }

    @Override
    public ShowsInHomepageVO getShowsInHomepage() {
        List<ShowPO> vocalConcerts = filterNotStart(showsRepository.findByType("vocalConcert"));
        List<ShowPO> concerts = filterNotStart(showsRepository.findByType("concert"));
        List<ShowPO> operas = filterNotStart(showsRepository.findByType("opera"));
        List<ShowPO> dramas = filterNotStart(showsRepository.findByType("drama"));
        List<ShowPO> dances = filterNotStart(showsRepository.findByType("dance"));
        List<ShowPO> childrens = filterNotStart(showsRepository.findByType("children"));
        List<ShowPO> comics = filterNotStart(showsRepository.findByType("comic"));

        ShowsInHomepageVO vo = new ShowsInHomepageVO();
        vo.setVocalConcertShows(takeFirstShows(vocalConcerts, 5));
        vo.setConcertShows(takeFirstShows(concerts, 5));
        vo.setOperaShows(takeFirstShows(operas, 5));
        vo.setDramaShows(takeFirstShows(dramas, 5));
        vo.setDanceShows(takeFirstShows(dances, 5));
        vo.setChildrenShows(takeFirstShows(childrens, 5));
        vo.setComicShows(takeFirstShows(comics, 5));

        return vo;
    }

    @Override
    @Transactional
    @Modifying
    public void changeBalanced(int showId, int i) {
        ShowPO showPO = showsRepository.findById(showId);
        showPO.setBalanced(i);
    }

    @Override
    public List getBalances() {
        List<ShowPO> showPOs = showsRepository.findAll();
        List<ShowPO> overShows = new ArrayList<>(showPOs.size());
        long now = System.currentTimeMillis();
        for (ShowPO showPO: showPOs) {
            String showTime = showPO.getShowTime();
            long showTimeLong = TimeUtil.stringToLong(showTime, "yyyy-MM-dd HH:mm:ss");
            if (showTimeLong < now) {
                overShows.add(showPO);
            }
        }
        List<BalanceVO> balances = changeToBalanceVOs(overShows);
        return balances;
    }

    private List<BalanceVO> changeToBalanceVOs(List<ShowPO> unsettledShowPOs) {
        List<BalanceVO> vos = new ArrayList<>(unsettledShowPOs.size());
        for (ShowPO showPO: unsettledShowPOs) {
            BalanceVO balanceVO = new BalanceVO();

            balanceVO.setBalanced(showPO.getBalanced());
            balanceVO.setPosterUrl(showPO.getPosterUrl());
            balanceVO.setDescription(showPO.getDescription());

            int showId = showPO.getId();
            String venueId = showPO.getVenueId();

            ShowDetailsVO showDetailsVO = getShowDetails(showId);
            VenuePO venuePO = venuesRepository.findById(venueId);

            balanceVO.setShowId(showDetailsVO.getShowId());
            balanceVO.setAddress(showDetailsVO.getAddress());
            balanceVO.setStageName(venuePO.getStageName());
            balanceVO.setVenueId(venueId);
            balanceVO.setShowTime(showPO.getShowTime());

            int ticketNumber = ticketsService.getTicketNumber(venueId, showId);
            int totalTicketNumber = ticketsService.getTotalTicketNumber(showId);

            balanceVO.setTicketNumber(ticketNumber);
            double percent = (ticketNumber * 1.00 / totalTicketNumber) * 100;
            String strPercent = DataFormatUtil.keepTwoBit(percent);
            balanceVO.setTicketNumberPercent(strPercent + "%");

            if (percent == 0) {
                balanceVO.setTicketNumberPercent("0%");
            }

            double money = ordersService.getBalanceMoney(showId, venueId);
            balanceVO.setMoney(Double.valueOf(DataFormatUtil.keepTwoBit(money)));

            vos.add(balanceVO);
        }
        return vos;
    }

    private List takeFirstShows(List<ShowPO> origins, int maxSize) {
        if (origins.size() > maxSize) {
            List<ShowPO> firsts = new ArrayList<>(maxSize);
            for (int i = 0; i < maxSize; i += 1) {
                firsts.add(origins.get(i));
            }
            return firsts;
        }
        return origins;
    }
}

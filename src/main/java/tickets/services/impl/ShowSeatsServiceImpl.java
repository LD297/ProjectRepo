package tickets.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tickets.dao.ShowSeatsRepository;
import tickets.entities.po.ShowSeatPO;
import tickets.entities.vo.to_views.ShowSeatVO;
import tickets.services.ShowSeatsService;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * Created by a297 on 18/3/18.
 */
@Service
public class ShowSeatsServiceImpl implements ShowSeatsService {
    @Autowired
    private ShowSeatsRepository showSeatsRepository;

    @Override
    public void saveShowSeatsInfo(int showId, List showSeatsInfo) {
        for (int i = 0; i < showSeatsInfo.size(); i += 1){
            List eachLine = (List) showSeatsInfo.get(i);
            for ( int j = 0; j < eachLine.size(); j += 1) {
                LinkedHashMap showSeatMap = (LinkedHashMap) eachLine.get(j);
                // 生成ShowSeatPO
                ShowSeatPO showSeatPO = new ShowSeatPO();
                showSeatPO.setShowId(showId);
                showSeatPO.setLineNumber(i + 1);
                showSeatPO.setColNumber(j + 1);
                showSeatPO.setPrice(Double.valueOf((String) showSeatMap.get("price")));
                showSeatPO.setPriceLevel((Integer) showSeatMap.get("priceLevel"));
                showSeatPO.setStatus(0);
                System.out.print("showSeatPO: ");
                System.out.println(showSeatPO.toString());
                showSeatsRepository.save(showSeatPO);
            }
        }
    }

    @Override
    public String getShowSeatIds(int showId, String seatsCoordinate) {
        System.out.println("-------- seats coordinate: " + seatsCoordinate);
        List<ShowSeatPO> showSeatPOs = showSeatsRepository.findByShowId(showId);
        String[] coordinates = seatsCoordinate.split(";");
        String showSeatIds = "";
        for (String coordinate: coordinates) {
//            System.out.println("-------- coordinate: " + coordinate);
            String lineNumber = coordinate.split(",")[0];
            String colNumber = coordinate.split(",")[1];
            for (ShowSeatPO showSeatPO: showSeatPOs) {
//                System.out.println("--------- show seat PO:" + showSeatPO.getLineNumber() + ", " + showSeatPO.getColNumber());
                if (Integer.valueOf(lineNumber) == showSeatPO.getLineNumber()
                        && Integer.valueOf(colNumber) == showSeatPO.getColNumber()) {
                    showSeatIds += showSeatPO.getId();
                    showSeatIds += ";";
                }
            }
        }
        System.out.println("=========== get show seat ids: " + showSeatIds);
        return showSeatIds;
    }

    @Override
    public String getSeatsCoordinate(String showSeatIds) {
        String[] ids = showSeatIds.split(";");
        String coordinate = "";
        for (String id: ids) {
            ShowSeatPO showSeatPO = showSeatsRepository.findById(Integer.valueOf(id));
            String theCoordinate = showSeatPO.getLineNumber() + "," + showSeatPO.getColNumber() + ";";
            coordinate += theCoordinate;
        }
        return coordinate;
    }

    @Override
    @Transactional
    @Modifying
    public void changeStatus(int id, int status) {
        ShowSeatPO showSeatPO = showSeatsRepository.findById(Integer.valueOf(id));
        showSeatPO.setStatus(status);
    }

    @Override
    public List getShowSeatsByShowId(int showId) {
        List<ShowSeatPO> showSeatsPOs = showSeatsRepository.findByShowId(showId);
        List showSeatVOs = new ArrayList(showSeatsPOs.size());
        for (ShowSeatPO po: showSeatsPOs) {
            ShowSeatVO vo = new ShowSeatVO();

            vo.setShowSeatId(po.getId());
            vo.setLineNumber(po.getLineNumber());
            vo.setColNumber(po.getColNumber());
            vo.setStatus(po.getStatus());
            vo.setPrice(po.getPrice());
            vo.setPriceLevel(po.getPriceLevel());

            showSeatVOs.add(vo);
        }
        return showSeatVOs;
    }
}

/**
 * Created by a297 on 18/3/27.
 */
import React from 'react';
import { connect } from 'dva';
import VenueNav from '../../components/page_constitution/VenueNav';
import styles from './BuyTicketsLive.css';
import ShowPrices from '../../components/users/select_seats/ShowPrices';
import BuyTicketsLivePane from '../../components/venues/BuyTicketsLivePane';


function BuyTicketsLive({pricesStr, showDetails, showSeats, genOrderLiveRes, genMemberOrderLiveRes}) {
  return (
    <div>
      <VenueNav selectedKey="buyticketslive"/>
      <div className={styles.ContentDiv}>
        <ShowPrices pricesStr={pricesStr} />
        <BuyTicketsLivePane showDetails={showDetails} showSeats={showSeats} genOrderLiveRes={genOrderLiveRes} genMemberOrderLiveRes={genMemberOrderLiveRes} />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  // 演出信息，座位信息，票价信息，生成订单结果
  const  {showDetails, pricesStr, showSeats} = state.shows;
  const { genOrderLiveRes, genMemberOrderLiveRes } = state.orders;
  console.log('---------------- map state in buy tickets live: ', { showDetails, pricesStr, showSeats, genOrderLiveRes });
  return { showDetails, pricesStr, showSeats, genOrderLiveRes, genMemberOrderLiveRes };
}
export default connect(mapStateToProps)(BuyTicketsLive);

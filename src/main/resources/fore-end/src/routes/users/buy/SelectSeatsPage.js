/**
 * Created by a297 on 18/3/20.
 */
import React from 'react';
import { connect } from 'dva';
import Navigation from '../../../components/page_constitution/Navigation';
import Footer from '../../../components/page_constitution/Footer';
import ShowPrices from '../../../components/users/select_seats/ShowPrices';
import SelectSeatsPane from '../../../components/users/select_seats/SelectSeatsPane';
import styles from './SelectSeatsPage.css';

function SelectSeatsPage({pricesStr, showDetails, showSeats, genOrderRes, myInfo}) {
  return (
    <div>
      <Navigation />
      <div className={styles.ContentDiv}>
        <ShowPrices pricesStr={pricesStr} />
        <SelectSeatsPane showDetails={showDetails} showSeats={showSeats} genOrderRes={genOrderRes} myInfo={myInfo} />
      </div>
      <Footer />
    </div>
  );
}
function mapStateToProps(state) {
  const pricesStr = state.shows.prices;
  const showDetails = state.shows.showDetails;
  const showSeats = state.shows.showSeats;
  const genOrderRes = state.orders.genOrderRes;
  const myInfo = state.users.myInfo;
  console.log('------------------------- map in select seats page: ',
    pricesStr, showDetails, showSeats, genOrderRes, myInfo );

  return { pricesStr, showDetails, showSeats, genOrderRes, myInfo };
}
export default connect(mapStateToProps)(SelectSeatsPage);

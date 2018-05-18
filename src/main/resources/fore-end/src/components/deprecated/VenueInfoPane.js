/**
 * Created by a297 on 18/3/8.
 */
import React from 'react';
import {connect} from 'dva';
import styles from './VenueInfoPane.css';
import ShowSeats from './ShowSeats';
import ShowPrices from '../users/select_seats/ShowPrices';

function VenueInfoPane({prices, squares, stageName}) {
  console.log('============= venueInfoPane: ', prices, squares, stageName);
  return (
    <div className={styles.VenueInfoPane}>
      <ShowPrices prices={prices}/>
      <ShowSeats squares={squares} stageName={stageName}/>
    </div>
  );
}
export default connect()(VenueInfoPane);

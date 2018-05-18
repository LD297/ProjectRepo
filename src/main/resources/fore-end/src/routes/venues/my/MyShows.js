/**
 * Created by a297 on 18/3/13.
 */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import VenueNav from '../../../components/page_constitution/VenueNav';
import styles from './MyShows.css';

function MyShows({ dispatch, myShows }) {

  const clickCheckTicketsLive = (e) => {
    console.log('check tickets live: ', e.target.value);
    const showId = parseInt(e.target.value);
    let showDetails = {};
    for (let i = 0; i < myShows.length; i += 1) {
      if (myShows[i].id === showId) {
        showDetails = myShows[i];
        break;
      }
    }
    dispatch({
      type: 'shows/deliverShowDetails',
      payload: showDetails,
    });
    setTimeout(() => {
      window.location.href = "/#/checkticketslive";
    }, 1500);
  };

  const clickBuyTicketsLive = (e) => {
    console.log(' go to buy tickets live ', e.target.value);
    const showId = parseInt(e.target.value);
    let showDetails = {};
    for (let i = 0; i < myShows.length; i += 1) {
      if (myShows[i].id === showId) {
        showDetails = myShows[i];
        break;
      }
    }
    dispatch({
      type: 'shows/deliverShowDetails',
      payload: showDetails,
    });
    dispatch({
      type: 'shows/deliverPrices',
      payload: showDetails.prices,
    });
    dispatch({
      type: 'shows/fetchShowSeats',
      payload: showId,
    });
    setTimeout(() => {
      window.location.href = "/#/buyticketslive";
    }, 1500);
  };

  var showMyShows = [];
  if (myShows.length > 0) {
    console.log('length: ' + myShows.length);
    myShows.forEach(function (value, index, arr) {
      console.log('my show: ', value);
      showMyShows.push(
        <div key={index + 1} className={styles.EachShow}>
          <img src={value.posterUrl} alt="这是一张海报" className={styles.Poster} />
          <div>
            <h3>{value.description}</h3>
            <p>时间：{value.showTime}</p>
            <Button value={value.id} className={styles.CheckTicketsBtn} onClick={clickCheckTicketsLive}>检票入场</Button>
            <Button value={value.id} onClick={clickBuyTicketsLive}>现场购票</Button>
          </div>
          <div className={styles.Clear} />
          <hr />
        </div>
      );
    });
  }
  else {
    showMyShows = (
      <h2 style={{textAlign: 'center', marginTop: '10%'}}>您还没有发布演出。</h2>
    );
  }
  return (
    <div>
      <VenueNav selectedKey="myshows" />
      <div className={styles.MyShowList}>
        { showMyShows }
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  console.log('map in myShows page: ', state.venues.myShows );
  return { myShows: state.venues.myShows };
}

export default connect(mapStateToProps)(MyShows);

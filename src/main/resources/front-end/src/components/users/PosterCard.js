/**
 * Created by a297 on 18/2/11.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './PosterCard.css';
import P0Src from '../../assets/p-0.png';

function PosterCard({ dispatch, showDetails }) {

  let posterUrl = {P0Src};
  let description = "";
  let lowest = "--";
  if (showDetails !== undefined) {
    posterUrl = showDetails.posterUrl;
    description = showDetails.description;
    let prices = showDetails.prices.split(";");
    prices.pop();
    let pricesFloatArr = [];
    prices.forEach(function (value, index, arr) {
      pricesFloatArr.push(parseFloat(value));
    });
    lowest = Math.min(...pricesFloatArr);

  }

  const clickPosterCard = function () {
    const showId = showDetails.id;
    dispatch({
      type: 'shows/fetchShowDetails',
      payload: showId
    });
    setTimeout(() => { window.location.href = "/#/buy" }, 1000);
  };

  return (
    <div className={styles.Main} onClick={clickPosterCard}>
      <div className={styles.Card}>
        <img src={posterUrl} />
        <p className={styles.ShowName}>
          { description }
        </p>
        <span className={styles.ShowPrice}>
          ￥{lowest}起
        </span>
        <span className={styles.ShowPlace}>
          |&nbsp;详情
        </span>
      </div>
    </div>
  );
}
export default connect()(PosterCard);

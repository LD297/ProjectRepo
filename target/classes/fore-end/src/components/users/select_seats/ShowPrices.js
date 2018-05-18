/**
 * Created by a297 on 18/3/8.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './ShowPrices.css';

const bgColors =
  // 灰色，玫红，橘黄，紫色，蓝色，青色，绿色
  [
    '#bebebe', '#FF366D', '#ff8403', '#9800FF', '#00f1ff', '#007aff', '#28e61b'
  ];
function ShowPrices({pricesStr}) {

  var priceTags = [];

  if (pricesStr !== undefined) {
    const prices = pricesStr.split(";");
    prices.pop();
    for (var i = 0; i < prices.length; i ++) {
      const bgStyle = {
        backgroundColor: bgColors[i+1],
        display: 'inline-block',
        width: '20px',
        height: '10px'
      };
      priceTags.push(
        <div key={i}>
          <span style={bgStyle} />
          <span>&nbsp;&nbsp;¥{ prices[i] }</span>
        </div>
      );
    }
    priceTags.push(
      <div key={i}>
        <span style={{
          backgroundColor: '#bebebe',
          display: 'inline-block',
          width: '20px',
          height: '10px'
        }} />
        <span>&nbsp;&nbsp;已售</span>
      </div>
    );
    priceTags.push(
      <div key={i + 1}>
        <span style={{
          backgroundColor: '#862628',
          display: 'inline-block',
          width: '20px',
          height: '10px'
        }} />
        <span>&nbsp;&nbsp;锁定</span>
      </div>
    );
    priceTags.push(
      <div key={i + 2}>
        <span style={{
          backgroundColor: '#28e61b',
          display: 'inline-block',
          width: '20px',
          height: '10px'
        }} />
        <span>&nbsp;&nbsp;已选</span>
      </div>
    );
  }

  return (
    <div className={styles.ShowPricesDiv}>
      {priceTags}
    </div>
  );
}
// function mapStateToProps(state) {
//   const pricesStr = state.shows.prices;
//   return { pricesStr };
// }
export default connect()(ShowPrices);

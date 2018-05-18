/**
 * Created by a297 on 18/2/12.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Tag } from 'antd';
import imgSrc from '../../assets/p-0.png';
import styles from './EachSortResult.css';

function EachSortResult({ dispatch, showDetails }) {

  let posterUrl = imgSrc;
  let description = "";
  let time = "";
  let lowest = "--";
  if (showDetails !== undefined) {
    posterUrl = showDetails.posterUrl;
    description = showDetails.description;
    time = showDetails.showTime;
    let prices = showDetails.prices.split(";");
    prices.pop();
    let pricesFloatArr = [];
    prices.forEach(function (value, index, arr) {
      pricesFloatArr.push(parseFloat(value));
    });
    lowest = Math.min(...pricesFloatArr);
  }

  const clickBuyNow = () => {
    const showId = showDetails.showId;
    dispatch({
      type: 'shows/fetchShowDetails',
      payload: showId
    });
    setTimeout(() => { window.location.href = "/#/buy" }, 1000);
  };
  return (
    <div>
      <div className={styles.EachSortResult}>
        <Row>
          <Col span={7}>
            <img src={posterUrl} />
          </Col>
          <Col offset={1} span={6} className={styles.Text}>
            { description }
            <br />
            <br />
            { time }
            <br />
            <br />
            ￥{lowest} 起
          </Col>
          <Col offset={6} span={4} className={styles.BuyTagCol}>
            <Tag className={styles.BuyTag} onClick={clickBuyNow}>立即购买</Tag>
          </Col>
        </Row>
      </div>
      <hr />
    </div>
  );
}
export default connect()(EachSortResult);

/**
 * Created by a297 on 18/3/8.
 */
import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import styles from './Square.css';

const bgColors =
  [
    '#bebebe', '#FF366D', '#ff8403', '#9800FF', '#00f1ff', '#007aff', '#28e61b'
  ];
function ShowSquare({x, y, squareInfo}) {

  const priceLevel = squareInfo.priceLevel;
  const divStyle = {backgroundColor: bgColors[priceLevel]};
  const tooltipStr = x + "排" + y + "列" + "  ¥" + squareInfo.price;
  return (
  <Tooltip placement="top" title={tooltipStr}>
    <div style={divStyle} className={styles.square} />
  </Tooltip>
  );
}
export default connect()(ShowSquare);

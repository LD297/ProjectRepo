/**
 * Created by a297 on 18/3/27.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Select } from 'antd';
const Option = Select.Option;

function GenBuyTicketsLiveOrder({
  description, showTime, selected, originalCost}) {
  const selectedSeatsInfo = [];
  selected.forEach(function (value, index, arr) {
    selectedSeatsInfo.push(
      <span key={index + 1}>{value.x}排{value.y}列&nbsp;¥{value.price}&nbsp;&nbsp;&nbsp;&nbsp;</span>
    );
  });
  return (
    <div>
      <h3>{description}</h3>
      <p>时间：{showTime}</p>
      <p>座位：{selectedSeatsInfo} </p>
      <p>合计：{originalCost} 元</p>
    </div>
  );
}
export default connect()(GenBuyTicketsLiveOrder);

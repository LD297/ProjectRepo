/**
 * Created by a297 on 18/3/16.
 */
import React from 'react';
import { connect } from 'dva';

function SeatsPane({ seatsInfo }) {

  let seatsAllLines = [];
  console.log('====== seats pane: seatsInfo', seatsInfo);
  if (plainSquares !== undefined) {
    var lineKey = 1;
    var squareNumber = 1;
    for (let i = 0; i < seatsInfo.length; i ++) {
      let seatsInLine = [];
      seatsInfo.forEach((seat, index) => {
        if (seat.status === 0) {
          // 无效
          seatsInLine.push(
          );
          squareNumber += 1;
        }
        else if (seat.status === 1) {
          // 有效
          seatsInLine.push(
          );
        }
      });
    }
  }

  return (
    <div style={{display: 'flex'}}>
      <h3> --- 舞台 --- </h3>
      { seatsAllLines }
    </div>
  );
}
export default connect()(SeatsPane);

/**
 * Created by a297 on 18/3/16.
 */
import React from 'react';
import { connect } from 'dva';
import PlainSquare from './PlainSquare';
import styles from './GenSeatsPane.css';

function GenSeatsPane({ m, n }) {

  let seats = [];
  let keyInRow = 1;
  let keyInCol = 1;
  for (let i = 1; i <= m; i ++) {
    let seatsInLine = [];
    for (let j = 1; j <= n; j ++) {
      seatsInLine.push(
        // 根据 m、n 生成的格子
        <PlainSquare key={keyInRow} x={i} y={j}/>
      );
      keyInRow += 1;
    }
    seats.push
    (
      <div className={styles.seatsInLine} key={keyInCol}>
        { seatsInLine }
      </div>
    );
    keyInCol += 1;
  }

  return (
    <div className={styles.seats}>
      { seats }
    </div>
  );
}
export default connect()(GenSeatsPane);

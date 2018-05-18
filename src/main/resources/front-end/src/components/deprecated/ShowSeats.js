/**
 * Created by a297 on 18/3/8.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './ShowSeats.css';
import ShowSquare from './ShowSquare';
import HiddenSquare from './HiddenSquare';

function ShowSeats({squares, stageName}) {

  var seatsAllLines = [];
  console.log('====== in show seats component: ' + squares === undefined);
  if (squares !== undefined) {
    // todo 为啥执行两遍
    console.log(' show seats========== squares != undefined');
    var lineKey = 1;
    var squareNumber = 1;
    for (var i = 0; i < squares.length; i ++) {
      var seatsInLine = [];
      squares[i].forEach((square, index) => {
        // console.log('======== index: ' + index);
        if (square.status === 0) {
          // 无seat
          seatsInLine.push(
            <HiddenSquare key={squareNumber}/>
          );
          squareNumber += 1;
        }
        else if (square.status === 1) {
          // 有seat
          seatsInLine.push(
            <ShowSquare x={lineKey} y={index+1} squareInfo={square} key={squareNumber} />
          );
          squareNumber += 1;
        }
      });
      seatsAllLines.push(
        <div className={styles.seatsInLine} key={lineKey}>
            { seatsInLine }
          </div>
      );
      lineKey += 1;
    }
  }
  return (
    <div className={styles.ShowSeatsDiv}>
      <h3> 舞台 ( {stageName} ) </h3>
      <br />
        { seatsAllLines }
      </div>
  );
}
export default connect()(ShowSeats);

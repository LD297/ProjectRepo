/**
 * Created by a297 on 18/3/5.
 */
import React from 'react';
import {connect} from 'dva';
import {Tooltip, Button} from 'antd';
import styles from './AddSeatsPricePane.css';
import AddSeatPrice from './AddSeatPrice';


function SeatsPane({seatsParams, handleSeatPriceChange}) {


  const handleSelect = (selectInfo) => {
    console.log("===== handle in seats pane: " + selectInfo);
    handleSeatPriceChange(selectInfo);
  };

  const m = seatsParams.param_m;
  const n = seatsParams.param_n;
  const stageName = seatsParams.param_stageName;
  const prices = seatsParams.param_prices;

  // console.log(m + " " + n + " " + stageName + " " + prices + " ~~~~~~~~~~~ ");

  let seats = [];
  let keyInRow = 1;
  let keyInCol = 1;
  for (let i = 1; i <= m; i++) {
    let seatsInLine = [];
    for (let j = 1; j <= n; j++) {
      seatsInLine.push
      (
        <AddSeatPrice key={keyInRow} handleSelect={handleSelect} x={i} y={j} stageName={stageName}
                      prices={prices}/>
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
    <div>
      <div className={styles.stepTips}>
        <h3>步骤提示：</h3>
        <div className={styles.clearFloat}/>
        <Tooltip placement="right" title="单击或拖拽鼠标建立选区即可选择；再次操作，即可取消">
          <Button className={styles.steps}>1、选择坐标方格</Button>
          <div className={styles.clearFloat}/>
        </Tooltip>
        <Tooltip placement="right" title="基于预设信息，选择座位类型">
          <Button className={styles.steps}>2、选择座位类型</Button>
          <div className={styles.clearFloat}/>
        </Tooltip>
        <Tooltip placement="right" title="保存座位信息">
          <Button className={styles.steps}>3、确认添加完毕</Button>
          <div className={styles.clearFloat}/>
        </Tooltip>
      </div>
      <div className={styles.seatsFrame}>
        <h3>== 舞台 ==</h3>
        <div className={styles.seats}>
          { seats }
        </div>
      </div>
      <div className={styles.clearFloat}/>
    </div>
  );
}
export default connect()(SeatsPane);

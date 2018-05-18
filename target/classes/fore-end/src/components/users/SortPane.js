/**
 * Created by a297 on 18/2/12.
 */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './SortPane.css';

function SortPane({dispatch}) {
  const clickButton = (e) => {
    console.log("button value: ", e.target.value);
    dispatch({
      type: 'shows/fetchSortRes',
      payload: e.target.value,
    });
  };

  return (
    <div className={styles.SortPane}>
      分类:&nbsp;&nbsp;
      <Button value="vocalConcert" onClick={clickButton}>演唱会</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button value="concert" onClick={clickButton}>音乐会</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button value="opera" onClick={clickButton}>曲苑杂谈</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button value="drama" onClick={clickButton}>话剧歌剧</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button value="dance" onClick={clickButton}>舞蹈芭蕾</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button value="children" onClick={clickButton}>儿童亲子</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button value="comic" onClick={clickButton}>动漫</Button>
    </div>
  );
}
export default connect()(SortPane);

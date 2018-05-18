/**
 * Created by a297 on 18/3/8.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './Square.css';

function HiddenSquare() {
  return (
    <div className={styles.square} />
  );
}
export default connect()(HiddenSquare);

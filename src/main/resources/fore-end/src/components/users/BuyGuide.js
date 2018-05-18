/**
 * Created by a297 on 18/2/13.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './BuyGuide.css';

function BuyGuide() {
  return (
    <div className={styles.Body}>
      <Row>
        <Col offset={2} span={14} className={styles.BuyGuideCol}>
          购票说明
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={14} className={styles.BuyGuideCol}>
          购票提示
        </Col>
      </Row>
    </div>
  );
}

export default connect()(BuyGuide);

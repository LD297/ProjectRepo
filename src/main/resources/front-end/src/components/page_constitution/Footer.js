/**
 * Created by a297 on 18/2/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Icon } from 'antd';
import styles from './Footer.css';

function Footer() {
  return (
    <footer className={styles.Footer}>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.LabelText}>
          <h3>订购方式</h3>
          <div>在线订购</div>
          <div>电话订购</div>
          <div>大客户团体订购</div>
        </Col>
        <Col span={4} className={styles.LabelText}>
          <h3>配送方式</h3>
        </Col>
        <Col span={4} className={styles.LabelText}>
          <h3>支付方式</h3>
          <div>
            <div><Icon type="alipay"/></div>
            <div><Icon type="wechat"/></div>
          </div>
        </Col>
        <Col span={4} className={styles.LabelText}>
          <h3>联系我们</h3>
        </Col>
      </Row>
    </footer>
  );
}

export default connect()(Footer);

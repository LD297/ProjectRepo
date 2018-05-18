/**
 * Created by a297 on 18/2/14.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import Nav from  '../../components/page_constitution/Navigation';
import VenueInfoInput from '../../components/venues/application/VenueInfoInput';
import styles from './VenueApplication.css';

function VenueInfo() {
  return (
    <div>
      <Nav selectedKey="venueapplication" />
      <Row>
        <Col offset={3} span={18} className={styles.VenueInfoInputCol}>
          <VenueInfoInput />
        </Col>
      </Row>
    </div>
  );
}
export default connect()(VenueInfo);

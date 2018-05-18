/**
 * Created by a297 on 18/3/30.
 */
import React from 'react';
import {connect} from 'dva';
import {Input, Button, message} from 'antd';
import VenueNav from '../../../components/page_constitution/VenueNav';

function VenueInfo({venueInfo}) {

  const {status} = venueInfo;
  let statusStr = "--";

  if (status == 0) {
    statusStr = "待审核";
  }
  else if (status == 1) {
    statusStr = "审核通过";
  }
  else if (status == 2 || status == -1) {
    statusStr = ""
  }

  return (
    <div>
      <VenueNav selectedKey="venueinfo"/>
      <div style={{margin: '5% 0 0 40%'}}>
        <h3>查看场馆信息</h3>
        <br />
        <p>
          地址：{venueInfo.address}
        </p>
        <p>名称：{venueInfo.name}</p>
        <p>状态：{statusStr}</p>
        <br />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {venueInfo: state.venues.venueInfo}
}
export default connect(mapStateToProps)(VenueInfo);

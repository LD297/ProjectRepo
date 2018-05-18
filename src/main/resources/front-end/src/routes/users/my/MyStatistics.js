/**
 * Created by a297 on 18/3/18.
 */
import React from 'react';
import { connect } from 'dva';
import Navigation from '../../../components/page_constitution/Navigation';


function MyStatistics({ myStatistics }) {

  return (
    <div>
      <Navigation selectedKey="mystatistics" />
      <div style={{ width: '60%', margin: '10% auto 0', paddingLeft: '25%' }}>
        <h3>个人统计(截至目前)</h3>
        <br />
        <p>有效订单数：{myStatistics.withTicketNum}</p>
        <p>退订数：{myStatistics.refundNum}</p>
        <p>总消费金额：{myStatistics.consumption}</p>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {myStatistics: state.users.myStatistics};
}
export default connect(mapStateToProps)(MyStatistics);

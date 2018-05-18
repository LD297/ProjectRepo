/**
 * Created by a297 on 18/3/12.
 */
import React from 'react';
import { connect } from 'dva';
import ManagerNav from '../../components/page_constitution/ManagerNav';

function ManagerStatistics({ managerStatistics }) {
  return (
    <div>
      <ManagerNav selectedKey="ManagerStatistics" />
      <div style={{ width: '60%', margin: '8% auto 0', paddingLeft: '25%' }}>
        <h3>统计信息(截至目前)</h3>
        <br />
        <p>在用场馆数：{managerStatistics.venueNum}</p>
        <p>注册会员数：{managerStatistics.memberNum}</p>
        <p>发布演出数：{managerStatistics.showNum}</p>
        <p>在线销售额：{managerStatistics.onlineTotalIncome}</p>
        <p>在线抽成额：{managerStatistics.onlineFinalIncome}</p>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {managerStatistics: state.managers.managerStatistics};
}
export default connect(mapStateToProps)(ManagerStatistics);

/**
 * Created by a297 on 18/3/13.
 */
import React from 'react';
import { connect } from 'dva';
import { List, Avatar } from 'antd';
import VenueNav from '../../components/page_constitution/VenueNav';

function VenueStatistics({ venueStatistics }) {
  return (
    <div>
      <VenueNav selectedKey="venuestatistics" />
      <div style={{marginTop: '5%'}}>
        <List
          style={{marginLeft: '30%'}}
          itemLayout="horizontal"
          dataSource={venueStatistics}
          renderItem={
            item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.showDetailsVO.posterUrl}/>}
                  title={item.showDetailsVO.description}
                  description={
                    <div>
                      <p>时间：{item.showDetailsVO.showTime}</p>
                      <p>线上订单数：{item.onlineOrderNum}</p>
                      <p>线下订单数：{item.offlineOrderNum}</p>
                      <p>退款订单数：{item.refundOrderNum}</p>
                      <p>在线销售额：{item.onlineOrderMoney}</p>
                      <p>在线抽成额：{item.onlineFinalMoney}</p>
                      <p>线下销售额：{item.offlineOrderMoney}</p>
                    </div>
                  }
                />
              </List.Item>
            )}
        />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return { venueStatistics: state.venues.venueStatistics };
}
export default connect(mapStateToProps)(VenueStatistics);

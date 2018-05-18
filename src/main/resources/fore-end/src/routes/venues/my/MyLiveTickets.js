/**
 * Created by a297 on 18/3/13.
 */
import React from 'react';
import {connect} from 'dva';
import {List, Avatar} from 'antd';
import VenueNav from '../../../components/page_constitution/VenueNav';
import styles from './MyLiveTickets.css';

function MyLiveTickets({myLiveTickets}) {

  let showMyLiveTickets = <div />;
  if (myLiveTickets.length > 0) {
    showMyLiveTickets = <List
      itemLayout="horizontal"
      dataSource={myLiveTickets}
      renderItem={
        item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.posterUrl}/>}
              title={item.description}
              description={
                <div>
                  <p>时间：{item.showTime}</p>
                  <p>地点：{item.address}</p>
                  <p>
                    订单编号：{item.orderId}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    下单时间：{item.orderTime}
                  </p>
                  <div>
                    <p>购买方式：选座购买</p>
                    <p>座位：（排,列;）{item.seatsCoordinate}</p>
                    <p>票号：{item.ticketIds}</p>
                    <p>状态：{item.ticketStatuses}</p>
                    <h3>合计：{item.totalCost}元</h3>
                  </div>
                  <p className={styles.BuyLiveTickets}>现场购票</p>
                </div>
              }
            />
          </List.Item>
        )}
    />;
  }


  return (
    <div>
      <VenueNav selectedKey="mylivetickets"/>
      <div className={styles.MyLiveTicketList}>
        { showMyLiveTickets }
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {myLiveTickets: state.venues.myLiveTickets};
}
export default connect(mapStateToProps)(MyLiveTickets);

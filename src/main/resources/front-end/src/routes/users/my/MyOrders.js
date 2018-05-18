/**
 * Created by a297 on 18/3/18.
 */
import React from 'react';
import {connect} from 'dva';
import {Tabs, List, Button, Avatar, Modal, Select, Input, message} from 'antd';
import Navigation from '../../../components/page_constitution/Navigation';
import md5 from 'js-md5';
import styles from './MyOrders.css';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyOrders extends React.Component {
  state = {
    visible: false,
    // 立即付款
    currentOrderId: '',
    currentTotalCost: '',
    currentPaymentType: 0,
    accountId: '',
    accountPsw: '',
  };
  // 确认支付
  handlePay = (e) => {
    const {currentOrderId, currentTotalCost, currentPaymentType, accountId, accountPsw} = this.state;
    if (accountId === '') {
      message.error('请输入支付账号！');
    }
    else if (accountPsw === '') {
      message.error('请输入支付密码！');
    }
    else {
      console.log('＝＝＝＝＝＝＝＝＝＝ 支付参数: ',
        {
          orderId: currentOrderId,
          totalCost: currentTotalCost,
          paymentType: currentPaymentType,
          accountId: accountId,
          accountPsw: md5(accountPsw + "")
        }
      );
      this.props.dispatch({
        type: 'orders/payNow',
        payload: {
          orderId: currentOrderId,
          totalCost: currentTotalCost,
          paymentType: currentPaymentType,
          accountId: accountId,
          accountPsw: md5(accountPsw)
        }
      });
      this.setState({
        visible: false,
      });
    }
  };
  // 取消支付
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  clickPayNow = (e) => {
    console.log('pay now ---------------- ', e.target.value);
    const params = e.target.value;
    this.setState({
      visible: true,
      currentOrderId: params.split(";")[0],
      currentTotalCost: params.split(";")[1],
    });
  };
  clickCancelOrder = (e) => {
    console.log('cancel order ---------------- ', e.target.value);
    const orderId = e.target.value;
    this.props.dispatch({
      type: 'orders/cancelOrder',
      payload: orderId,
    });
  };
  clickRefund = (e) => {
    console.log('refund------------ ', e.target.value);
    const orderId = e.target.value;
    this.props.dispatch({
      type: 'orders/refund',
      payload: orderId,
    });
  };


  changePaymentType = (value) => {
    console.log('currentPaymentType', value);
    this.setState({
      currentPaymentType: value
    });
  };
  changeAccountId = (e) => {
    console.log('change account id: ', e.target.value);
    this.setState({
      accountId: e.target.value
    });
  };
  changeAccountPsw = (e) => {
    console.log('change account psw: ', e.target.value);
    this.setState({
      accountPsw: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    const {payNowRes, cancelOrderRes, refundRes} = nextProps;
    if (payNowRes !== undefined) {
      if (payNowRes.msg !== '') {
        if (payNowRes.msg === 'success') {
          message.success(payNowRes.words);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
        else {
          message.error(payNowRes.words);
        }
      }
    }
    if (cancelOrderRes !== undefined) {
      if (cancelOrderRes.msg !== '') {
        if (cancelOrderRes.msg === 'success') {
          message.success(cancelOrderRes.words);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
        else {
          message.error(cancelOrderRes.words);
        }
      }
    }
    if (refundRes !== undefined) {
      if (refundRes.msg !== '') {
        if (refundRes.msg === 'success') {
          message.success(refundRes.words);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
        else {
          message.error(refundRes.words);
        }
      }
    }
  };

  render() {
    const ordersToPay = [];
    const ordersToSetTickets = [];
    const ordersSetTickets = [];
    const ordersOvertime = [];
    const ordersRefunded = [];
    const ordersCanceled = [];
    const myOrders = this.props.myOrders;
    if (myOrders !== undefined) {
      myOrders.forEach(function (value, index, arr) {
        if (value.status === 0) {
          ordersToPay.push(value);
        }
        else if (value.status === 1) {
          ordersToSetTickets.push(value);
        }
        else if (value.status === 2) {
          ordersSetTickets.push(value);
        }
        else if (value.status === 3) {
          ordersOvertime.push(value);
        }
        else if (value.status === 4) {
          ordersRefunded.push(value);
        }
        else if (value.status === 5) {
          ordersCanceled.push(value);
        }
      });
    }
    const payNowModal = (
      <Modal
        title="立即付款"
        visible={this.state.visible}
        onOk={this.handlePay}
        onCancel={this.handleCancel}
        okText="确认支付"
        cancelText="取消"
      >
        <p>合计：{this.state.currentTotalCost}元</p>
        支付方式：
        <Select defaultValue={0} style={{width: 90}} onChange={this.changePaymentType}>
          <Option value={0}>支付宝</Option>
          <Option value={1}>微信</Option>
        </Select>
        <br />
        <br />
        输入帐号：<Input placeholder="帐号" style={{width: 200}} onChange={this.changeAccountId}/>
        <br />
        <br />
        支付密码：<Input type="password" placeholder="密码" style={{width: 200}} onChange={this.changeAccountPsw}/>
      </Modal>);
    // console.log('hhh', ordersToPay, ordersToUse);

    return (
      <div>
        <Navigation selectedKey="myorders"/>
        <Tabs defaultActiveKey="1" className={styles.Tab}>
          <TabPane tab="待付款" key="1">
            <List
              itemLayout="horizontal"
              dataSource={ordersToPay}
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
                          {item.buyMethod === "BUY_NOW" ? (
                            <div>
                              <p>购买方式：立即购买</p>
                              <p>¥{item.price} x {item.num}</p>
                              <h3>合计：{item.totalCost}元</h3>
                            </div>
                          ) : (
                            <div>
                              <p>购买方式：选座购买</p>
                              <p>排，列：{item.seatsCoordinate}</p>
                              <h3>合计：{item.totalCost}元</h3>
                            </div>
                          )}
                          <Button
                            className={styles.PayNowBtn}
                            value={item.orderId + ";" + item.totalCost}
                            onClick={this.clickPayNow}
                          >
                            立即付款
                          </Button>
                          { payNowModal }
                          <Button
                            className={styles.CancelOrderBtn}
                            value={item.orderId}
                            onClick={this.clickCancelOrder}
                          >
                            取消订单
                          </Button>
                        </div>
                      }
                    />
                  </List.Item>
                )}
            />
          </TabPane>
          <TabPane tab="待配票" key="2">
            <List
              itemLayout="horizontal"
              dataSource={ordersToSetTickets}
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
                            <p>购买方式：立即购买</p>
                            <p>¥{item.price} x {item.num}</p>
                            <h3>合计：{item.totalCost}元</h3>
                          </div>
                          <Button className={styles.HasPayedBtn} disabled>待配票</Button>
                          <Button
                            type="danger"
                            className={styles.RefundBtn}
                            value={item.orderId}
                            onClick={this.clickRefund}
                          >退款</Button>
                        </div>
                      }
                    />
                  </List.Item>
                )}
            />
          </TabPane>
          <TabPane tab="已预定" key="3">
            <List
              itemLayout="horizontal"
              dataSource={ordersSetTickets}
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
                          {item.buyMethod === "BUY_NOW" ? (
                            <div>
                              <p>购买方式：立即购买</p>
                              <p>¥{item.price} x {item.num}</p>
                              <h3>合计：{item.totalCost}元</h3>
                              <p>座位：（排,列;）{item.seatsCoordinate}</p>
                              <p>票号：{item.ticketIds}</p>
                              <p>状态：{item.ticketStatuses}</p>
                            </div>
                          ) : (
                            <div>
                              <p>购买方式：选座购买</p>
                              <p>座位：（排,列;）{item.seatsCoordinate}</p>
                              <p>票号：{item.ticketIds}</p>
                              <p>状态：{item.ticketStatuses}</p>
                              <h3>合计：{item.totalCost}元</h3>
                            </div>
                          )}
                          <Button className={styles.HasPayedBtn} disabled>已配票</Button>
                          <Button
                            type="danger"
                            className={styles.RefundBtn}
                            value={item.orderId}
                            onClick={this.clickRefund}
                          >退款</Button>
                        </div>
                      }
                    />
                  </List.Item>
                )}
            />
          </TabPane>
          <TabPane tab="支付超时" key="4">
            <List
              itemLayout="horizontal"
              dataSource={ordersOvertime}
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
                          {item.buyMethod === "BUY_NOW" ? (
                            <div>
                              <p>购买方式：立即购买</p>
                              <p>¥{item.price} x {item.num}</p>
                              <h3>合计：{item.totalCost}元</h3>
                            </div>
                          ) : (
                            <div>
                              <p>购买方式：选座购买</p>
                              <p>排，列：{item.seatsCoordinate}</p>
                              <h3>合计：{item.totalCost}元</h3>
                            </div>
                          )}
                          <p className={styles.OverTimeBtn}>支付超时</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
            />
          </TabPane>
          <TabPane tab="退款" key="5">
            <List
              itemLayout="horizontal"
              dataSource={ordersRefunded}
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
                          {item.buyMethod === "BUY_NOW" ? (
                            <div>
                              <p>购买方式：立即购买</p>
                              <p>¥{item.price} x {item.num}</p>
                              <p>合计：{item.totalCost}元</p>
                              <p>排，列：{item.seatsCoordinate}</p>
                            </div>
                          ) : (
                            <div>
                              <p>购买方式：选座购买</p>
                              <p>排，列：{item.seatsCoordinate}</p>
                              <p>合计：{item.totalCost}元</p>
                            </div>
                          )}
                          <h3>退款：{item.refund}</h3>
                          <p className={styles.HasCanceledBtn}>已退款</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
            />
          </TabPane>
          <TabPane tab="取消" key="6">
            <List
              itemLayout="horizontal"
              dataSource={ordersCanceled}
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
                          {item.buyMethod === "BUY_NOW" ? (
                            <div>
                              <p>购买方式：立即购买</p>
                              <p>¥{item.price} x {item.num}</p>
                              <h3>合计：{item.totalCost}元</h3>
                            </div>
                          ) : (
                            <div>
                              <p>购买方式：选座购买</p>
                              <p>排，列：{item.seatsCoordinate}</p>
                              <h3>合计：{item.totalCost}元</h3>
                            </div>
                          )}
                          <p className={styles.HasCanceledBtn}>已取消</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {myOrders, payNowRes, cancelOrderRes, refundRes} = state.orders;
  return {myOrders, payNowRes, cancelOrderRes, refundRes};
}
export default connect(mapStateToProps)(MyOrders);

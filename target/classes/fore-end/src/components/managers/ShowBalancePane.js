/**
 * Created by a297 on 18/3/28.
 */
import React from 'react';
import {connect} from 'dva';
import {List, Avatar, Tabs, message, Button, Modal, Select, Input} from 'antd';
import avatarSrc from '../../assets/cinema.png';
import md5 from 'js-md5';

const Option = Select.Option;
const TabPane = Tabs.TabPane;

class ShowBalancePane extends React.Component {
  state = {
    balances: [
      // {
      //   balanced: 0,
      //   posterUrl: avatarSrc,
      //   description: '五月天演唱会',
      //   address: '南京市栖霞区',
      //   stageName: '艾乐大剧院',
      //   venueId: '1111111',
      //   showTime: '2018-03-12 18:00:32',
      //   ticketNumber: 4,
      //   ticketNumberPercent: '60%',
      //   money: 60000,
      // }
    ],
    visible: false,
    currentPaymentType: 0,
    accountId: '',
    accountPsw: '',
    theBalance: {},
  };
  callback = (key) => {
    console.log(key);
  };
  clickBalance = (e) => {
    const index = parseInt(e.target.value);
    const {balances} = this.state;
    this.setState({
      theBalance: balances[index],
      visible: true
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log('------- will receive: ', nextProps.balances);
    if (nextProps.balances !== undefined) {
      this.setState({
        balances: nextProps.balances
      });
    }
  }

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
      let theBalance = this.state.theBalance;
      theBalance.paymentType = this.state.currentPaymentType;
      theBalance.accountId = this.state.accountId;
      theBalance.accountPsw = md5(this.state.accountPsw);

      console.log('结算的 balance： ', theBalance);

      this.props.dispatch({
        type: 'managers/balance',
        payload: theBalance
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

  render() {
    const toBalance = [];
    const balanced = [];
    const {balances} = this.state;
    if (balances !== undefined) {
      if (balances.length > 0) {
        balances.forEach((currentValue, index) => {
          if (currentValue.balanced === 0) {
            toBalance.push({
              theIndex: index,
              posterUrl: currentValue.posterUrl,
              description: currentValue.description,
              address: currentValue.address,
              stageName: currentValue.stageName,
              venueId: currentValue.venueId,
              showTime: currentValue.showTime,
              ticketNumber: currentValue.ticketNumber,
              ticketNumberPercent: currentValue.ticketNumberPercent,
              money: currentValue.money,
            });
          }
          else if (currentValue.balanced === 1) {
            balanced.push({
              posterUrl: currentValue.posterUrl,
              description: currentValue.description,
              address: currentValue.address,
              stageName: currentValue.stageName,
              venueId: currentValue.venueId,
              showTime: currentValue.showTime,
              ticketNumber: currentValue.ticketNumber,
              ticketNumberPercent: currentValue.ticketNumberPercent,
              money: currentValue.money,
            });
          }
        })
      }
    }

    console.log('----------- balances: ', toBalance, balanced);

    const balanceNowModal = (
      <Modal
        title="立即付款"
        visible={this.state.visible}
        onOk={this.handlePay}
        onCancel={this.handleCancel}
        okText="确认支付"
        cancelText="取消"
      >
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


    return (
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={this.callback}
          style={{
            backgroundColor: '#fafafa',
            padding: '2%',
            width: '60%',
            margin: '3% auto'
          }}
        >
          <TabPane tab="待结算" key="1">
            <List
              itemLayout="horizontal"
              dataSource={toBalance}
              renderItem={
                item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.posterUrl}/>}
                      title={item.description}
                      description={
                        <div>
                          <p>地址：{item.address}</p>
                          <p>舞台：{item.stageName}</p>
                          <p>场馆编号：{item.venueId}</p>
                          <p>演出时间：{item.showTime}</p>
                          <p>结算票数：{item.ticketNumber}</p>
                          <p>线上购买率：{item.ticketNumberPercent}</p>
                          <p>结算金额：
                            <span style={{color: 'red'}}>
                              {item.money}&nbsp;
                            </span>
                            元</p>
                          <Button
                            value={item.theIndex}
                            onClick={this.clickBalance}
                            style={{
                              float: 'right',
                              backgroundColor: 'rgb(255, 92, 0)',
                              color: 'white',
                              fontSize: '16px'
                            }}
                          >结算</Button>
                          {balanceNowModal}
                        </div>
                      }
                    />
                  </List.Item>
                )
              }
            />
          </TabPane>
          <TabPane tab="已结算" key="2">
            <List
              itemLayout="horizontal"
              dataSource={balanced}
              renderItem={
                item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.posterUrl}/>}
                      title={item.description}
                      description={
                        <div>
                          <p>地址：{item.address}</p>
                          <p>舞台：{item.stageName}</p>
                          <p>场馆编号：{item.venueId}</p>
                          <p>演出时间：{item.showTime}</p>
                          <p>结算票数：{item.ticketNumber}</p>
                          <p>线上购买率：{item.ticketNumberPercent}</p>
                          <p>结算金额：{item.money}&nbsp;元</p>
                          <p
                            value={item.theIndex}
                            onClick={this.clickBalance}
                            style={{
                              float: 'right',
                              color: 'rgb(255, 92, 0)',
                              fontSize: '16px',
                              fontWeight: 500
                            }}
                          >已结算</p>
                        </div>
                      }
                    />
                  </List.Item>
                )
              }
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {balances: state.managers.balances};
}
export default connect(mapStateToProps)(ShowBalancePane);

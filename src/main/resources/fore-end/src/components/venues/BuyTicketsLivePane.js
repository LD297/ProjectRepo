/**
 * Created by a297 on 18/3/27.
 */
import React from 'react';
import {connect} from 'dva';
import {Button, message, Modal, Input} from 'antd';
import styles from './BuyTicketsLivePane.css';
import SelectSeat from '../users/select_seats/SelectSeat';
import GenBuyTicketsLiveOrder from './GenBuyTicketsLiveOrder';
import * as security from '../../utils/security';


class BuyTicketsLivePane extends React.Component {

  state = {
    selected: [],
    cost: -1,
    visible: false,
    whetherMemberVisible: false,
    userEmailInputVisible: false,
    userEmailInput: '',
    memberInfo: {},
    finalOrderVisible: false,
  };
  genOrder = () => {
    console.log(' gen order : ', this.state);
    const {selected} = this.state;
    if (selected.length === 0) {
      message.warning('请选择座位');
    }
    else {
      this.setState({
        visible: true
      });
    }
  };
  orderNow = () => {
    const {selected, cost} = this.state;
    const {showDetails} = this.props;
    let seatsCoordinate = "";
    selected.forEach(function (value, index, arr) {
      seatsCoordinate += `${value.x},${value.y};`;
    });
    this.props.dispatch({
      type: 'orders/genOrderLive',
      payload: {
        showId: showDetails.id,
        buyMethod: "SELECT_SEATS",
        seatsCoordinate: seatsCoordinate,
        price: '',
        num: '',
        selectCoupon: '',
        cost: cost
      }
    });
  };
  onClick = (selectSeatInfo) => {
    const {selected} = this.state;
    if (selectSeatInfo.operation === 'plus') {
      // 添加座位
      selected.push(selectSeatInfo);
      let cost = 0;
      selected.forEach(function (value, index, arr) {
        cost += value.price;
      });
      this.setState({selected, cost});
    }
    else {
      // 取消座位
      const newSelected = [];
      console.log('cancel seats: ', selected, selectSeatInfo);
      selected.forEach(function (value, index, arr) {
        if (value.id !== selectSeatInfo.id) {
          newSelected.push(value);
        }
      });
      let cost = 0;
      newSelected.forEach(function (value, index, arr) {
        cost += value.price;
      });
      this.setState({
        selected: newSelected,
        cost: cost
      });
    }
  };

  handleOk = (e) => {
    const signature = security.checkLog("venueToken");
    if (signature === undefined) {
      message.warning("请先登录！");
    }
    else {
      const {selected, cost} = this.state;
      const {showDetails} = this.props;
      let seatsCoordinate = "";
      selected.forEach(function (value, index, arr) {
        seatsCoordinate += `${value.x},${value.y};`;
      });
      /**
       * 输入会员邮箱，查看折扣［消费后可换积分］
       */
      this.setState({
        visible: false,
      });
      setTimeout(() => {
        this.setState({
          whetherMemberVisible: true,
        });
      }, 600);
      // setTimeout(() => {
      //   this.setState({whetherMemberVisible: true});}, 1500);
      // console.log('－－－－－－生成订单：',
      //   {
      //     showId: showDetails.id,
      //     buyMethod: 'SELECT_SEATS',
      //     seatsCoordinate: seatsCoordinate,
      //     price: '',
      //     num: '',
      //     cost: cost
      //   }
      // );
      // this.props.dispatch({
      //   type: 'orders/genOrder',
      //   payload: {
      //     showId: showDetails.showId,
      //     buyMethod: 'SELECT_SEATS',
      //     seatsCoordinate: seatsCoordinate,
      //     price: '',
      //     num: '',
      //     selectCoupon: selectCoupon,
      //     cost: finalCost
      //   }
      // });
    }
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  clickIsMember = (e) => {
    this.setState({
      whetherMemberVisible: false
    });
    setTimeout(() => {
      this.setState({
        userEmailInputVisible: true,
      });
    }, 600);
  };
  clickNoMember = (e) => {
    this.orderNow();
    this.setState({
      whetherMemberVisible: false
    });
  };

  userEmailInputOk = (e) => {
    const {userEmailInput} = this.state;
    /**
     * 1、得到会员信息
     * 2、折扣
     * 3、计算出总价
     *
     */
    this.props.dispatch({
      type: 'venues/fetchMemberInfo',
      payload: userEmailInput
    });
    this.setState({
      userEmailInputVisible: false,
    });
  };
  cancelUserEmailInput = (e) => {
    this.setState({
      userEmailInputVisible: false,
    });
  };
  changeUserEmailInput = (e) => {
    console.log(' chang user email input: ', e.target.value);
    this.setState({
      userEmailInput: e.target.value
    });
  };

  finalOrderOk = (e) => {
    const {selected, cost} = this.state;
    const {showDetails, memberInfo} = this.props;
    let seatsCoordinate = "";
    selected.forEach(function (value, index, arr) {
      seatsCoordinate += `${value.x},${value.y};`;
    });
    this.props.dispatch({
      type: 'orders/genMemberOrderLive',
      payload: {
        showId: showDetails.id,
        buyMethod: "SELECT_SEATS",
        seatsCoordinate: seatsCoordinate,
        price: '',
        num: '',
        selectCoupon: '',
        cost: cost,
        userEmail: memberInfo.userEmail,
        finalCost: cost * memberInfo.discount
      }
    });
    this.setState({
      finalOrderVisible: false,
    });
  };
  cancelFinalOrder = (e) => {
    this.setState({
      finalOrderVisible: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log('-------------- will receive in select seats pane: ', nextProps);
    if (nextProps.genOrderLiveRes !== undefined) {
      const res = nextProps.genOrderLiveRes;
      if (res.msg !== '') {
        if (res.msg === "success") {
          message.success(res.words);
          setTimeout(() => {
            window.location.href = '/#/myshows';
            window.location.reload();
          }, 1000);
        }
        else if (res.msg === "failure") {
          message.error(res.words);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    }
    if (nextProps.memberInfo !== undefined) {
      const memberInfo = nextProps.memberInfo;
      if (memberInfo.msg === "success") {
        let final = true;
        if (nextProps.genMemberOrderLiveRes !== undefined) {
          if (nextProps.genMemberOrderLiveRes.msg !== '') {
            final = false;
          }
        }
        this.setState({
          memberInfo: memberInfo,
          userEmailInputVisible: false,
          finalOrderVisible: final,
        });
      }
      else if (memberInfo.msg === "failure") {
        message.error(memberInfo.words);
      }
    }
    if (nextProps.genMemberOrderLiveRes !== undefined) {
      const genMemberOrderLiveRes = nextProps.genMemberOrderLiveRes;
      if (genMemberOrderLiveRes.msg !== '') {
        if (genMemberOrderLiveRes.msg === "success") {
          message.success(genMemberOrderLiveRes.words);
          setTimeout(() => {
            window.location.href = '/#/myshows';
            window.location.reload();
          }, 1000);
        }
        else if (genMemberOrderLiveRes.msg === "failure") {
          message.error(genMemberOrderLiveRes.words);
        }
      }
    }
  }

  render() {
    let seats = [];
    const showSeats = this.props.showSeats;
    if (showSeats !== undefined) {
      if (showSeats.length > 0) {
        let seatsInLine = [];
        let oldLine = 1;
        let keyInCol = 1;
        for (let i = 0; i < showSeats.length; i += 1) {
          const value = showSeats[i];
          if (value.lineNumber !== oldLine) {
            seats.push(
              <div className={styles.SelectSeatsInLine} key={keyInCol}>
                {seatsInLine}
              </div>
            );
            keyInCol += 1;
            oldLine = value.lineNumber;
            seatsInLine = [];
          }
          seatsInLine.push(
            <SelectSeat onClick={this.onClick} key={value.showSeatId} id={value.showSeatId} x={value.lineNumber}
                        y={value.colNumber} status={value.status} price={value.price} priceLevel={value.priceLevel}/>
          );
        }
        seats.push(
          <div className={styles.SelectSeatsInLine} key={keyInCol}>
            {seatsInLine}
          </div>
        );
      }
    }

    const {selected} = this.state;
    const {showDetails} = this.props;
    const selectedItems = [];
    // 总计
    const {cost} = this.state;
    let totalCost = (cost === -1 ? '--' : cost + " 元");
    if (selected.length > 0) {
      selected.forEach(function (value, index, arr) {
        selectedItems.push(
          <span key={index + 1}>{value.x}排{value.y}列&nbsp;¥{value.price}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        );
      });
    }
    const genOrderModal = (
      <Modal
        title="生成订单"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <GenBuyTicketsLiveOrder
          description={showDetails.description}
          showTime={showDetails.showTime}
          selected={selected}
          originalCost={cost}
        />
      </Modal>
    );

    const whetherMemberModal = (
      <Modal
        title="购买身份"
        visible={this.state.whetherMemberVisible}
        onOk={this.clickIsMember}
        onCancel={this.clickNoMember}
        okText="是"
        cancelText="不是"
      >
        <p>会员？</p>
      </Modal>
    );

    const userEmailInput = (
      <Modal
        title="输入会员邮箱"
        visible={this.state.userEmailInputVisible}
        onOk={this.userEmailInputOk}
        onCancel={this.cancelUserEmailInput}
        okText="确认"
        cancelText="取消"
      >
        <Input style={{width: '200px'}} onChange={this.changeUserEmailInput}/>
      </Modal>
    );

    const {memberInfo} = this.state;
    let memberPart = <div />
    if (memberInfo !== undefined) {
      const discount = memberInfo.discount;
      const afterCost = cost * discount;
      const membershipTitle = memberInfo.membershipTitle;
      memberPart = (
        <div>
          <p>{membershipTitle}折后价：{afterCost}元</p>
        </div>
      );
    }
    const finalOrderModal = (
      <Modal
        title="生成订单"
        visible={this.state.finalOrderVisible}
        onOk={this.finalOrderOk}
        onCancel={this.cancelFinalOrder}
        okText="确认"
        cancelText="取消"
      >
        <GenBuyTicketsLiveOrder
          description={showDetails.description}
          showTime={showDetails.showTime}
          selected={selected}
          originalCost={cost}
        />
        { memberPart }
      </Modal>
    );

    return (
      <div>
        <div className={styles.SelectSeatsPane}>
          <div className={styles.StageName}>
            <h3> --- 舞台 --- </h3>
          </div>
          { seats }
          <div className={styles.Calculation}>
            <br />
            <br />
            <span>已选：</span>
            { selectedItems }
            <br />
            <span>合计：{totalCost}</span>
          </div>
          <br />
          <Button className={styles.GenOrderBtn} onClick={this.genOrder}>生成订单</Button>
          { genOrderModal }
          { whetherMemberModal }
          { userEmailInput }
          { finalOrderModal }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {memberInfo: state.venues.memberInfo}
}
export default connect(mapStateToProps)(BuyTicketsLivePane);

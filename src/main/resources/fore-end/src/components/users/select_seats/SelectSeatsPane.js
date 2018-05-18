/**
 * Created by a297 on 18/3/20.
 */
import React from 'react';
import {connect} from 'dva';
import {Button, message, Modal} from 'antd';
import styles from './SelectSeatsPane.css';
import SelectSeat from './SelectSeat';
import GenSelectSeatsOrder from '../orders/GenSelectSeatsOrder';
import * as security from '../../../utils/security';

class SelectSeatsPane extends React.Component {

  state = {
    selected: [],
    cost: -1,
    visible: false,
    selectCoupon: '',
  };

  changeCoupon = (value) => {
    console.log('buy pane coupon: ', value);
    this.setState({
      selectCoupon: value
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

  handleOk = (e) => {
    const signature = security.checkLog();
    if (signature === undefined) {
      message.warning("请先登录！");
    }
    else {
      const {selected, cost, selectCoupon} = this.state;
      const {showDetails, myInfo} = this.props;
      let seatsCoordinate = "";
      selected.forEach(function (value, index, arr) {
        seatsCoordinate += `${value.x},${value.y};`;
      });
      let finalCost = cost * myInfo.discount;
      if (selectCoupon !== '') {
        finalCost -= parseFloat(selectCoupon);
      }
      this.props.dispatch({
        type: 'orders/genOrder',
        payload: {
          showId: showDetails.showId,
          buyMethod: 'SELECT_SEATS',
          seatsCoordinate: seatsCoordinate,
          price: '',
          num: '',
          selectCoupon: selectCoupon,
          cost: finalCost
        }
      });
    }
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

componentWillReceiveProps(nextProps)
{
  console.log('-------------- will receive in select seats pane: ', nextProps);
  if (nextProps.genOrderRes !== undefined) {
    const res = nextProps.genOrderRes;
    if (res.msg !== '') {
      if (res.msg === "success") {
        message.success(res.words);
        setTimeout(() => {
          window.location.href = '/#/myorders';
        }, 1000);
      }
      else {
        message.error(res.words);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
  const {showDetails, myInfo} = this.props;
  const selectedItems = [];
  // 总计
  const {cost, selectCoupon} = this.state;
  let totalCost = (cost === -1 ? '--' : cost + " 元");
  // 打折
  const discount = myInfo.discount;
  const afterDiscount = cost * discount;
  // 优惠券
  let finalCost = afterDiscount;
  if (selectCoupon !== '') {
    finalCost -= parseFloat(selectCoupon);
  }
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
      <GenSelectSeatsOrder
        description={showDetails.description}
        showTime={showDetails.showTime}
        address={showDetails.address}
        selected={selected}
        originalCost={cost}
        membershipTitle={myInfo.membershipTitle}
        afterDiscount={afterDiscount}
        myCoupons={myInfo.myCoupons}
        changeCoupon={this.changeCoupon}
        finalCost={finalCost}
      />
    </Modal>
  );
  return (
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
    </div>
  );
}
}
// function mapStateToProps(state) {
//   const showDetails = state.shows.showDetails;
//   const showSeats = state.shows.showSeats;
//   const genOrderRes = state.orders.genOrderRes;
//   const myInfo = state.users.myInfo;
//   return { showDetails, showSeats, genOrderRes, myInfo };
// }
export default connect()(SelectSeatsPane);

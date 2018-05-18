/**
 * Created by a297 on 18/2/13.
 */
import React from 'react';
import {connect} from 'dva';
import {Row, Col, Tag, InputNumber, Button, Radio, message, Modal} from 'antd';
import logoSrc from '../../assets/logo.png';
import styles from './BuyPane.css';
import GenOrder from './orders/GenOrder';
import * as security from '../../utils/security';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class BuyPane extends React.Component {

  state = {
    totalCost: '--',
    selectPrice: '',
    selectNum: 1,
    visible: false,
    myInfo: {},
    selectCoupon: '',
  };

  changeCoupon = (value) => {
    console.log('buy pane coupon: ', value);
    this.setState({
      selectCoupon: value
    });
  };

  changeInputNumber = (value) => {
    console.log('change number: ' + value);
    this.setState({
      selectNum: value,
    });
    const selectPrice = this.state.selectPrice;
    if (selectPrice !== '') {
      this.setState({
        totalCost: value * selectPrice,
      });
    }
  };
  changePrice = (e) => {
    console.log('select price: ', e.target.value);
    const selectNum = this.state.selectNum;
    this.setState({
      selectPrice: e.target.value,
      totalCost: selectNum * (e.target.value),
    });
  };
  buyNow = () => {
    console.log('立即购买！', this.state);
    const totalCost = this.state.totalCost;
    if (totalCost === '--') {
      message.warning('请选择票档');
    }
    else {
      this.setState({
        visible: true
      });
    }
  };
  selectSeats = () => {
    const signature = security.checkLog();
    if (signature === undefined) {
      message.warning("请先登录！");
    }
    else {
      console.log(' go to select seats ', this.props.showDetails.showId);
      this.props.dispatch({
        type: 'shows/fetchShowSeats',
        payload: this.props.showDetails.showId,
      });
      this.props.dispatch({
        type: 'shows/deliverPrices',
        payload: this.props.showDetails.prices,
      });
      setTimeout(() => {
        window.location.href = "/#/selectseats";
      }, 1500);
    }
  };
  /**
   * 确认生成订单(立即购买)
   */
  handleOk = (e) => {
    const signature = security.checkLog();
    if (signature === undefined) {
      message.warning("请先登录！");
    }
    else {
      const showDetails = this.props.showDetails;
      const {totalCost, selectCoupon, selectPrice, selectNum, myInfo} = this.state;
      let cost = totalCost * myInfo.discount;
      if (selectCoupon !== '') {
        cost -= parseFloat(selectCoupon);
      }
      this.props.dispatch({
        type: 'orders/genOrder',
        payload: {
          showId: showDetails.showId,
          buyMethod: 'BUY_NOW',
          seatsCoordinate: '',
          price: selectPrice,
          num: selectNum,
          selectCoupon: selectCoupon,
          cost: cost
        }
      });
    }
  };
  /**
   * 取消生成订单
   */
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log('-------------- will receive in buy pane: ', nextProps);
    // if (nextProps.genOrderRes !== undefined) {
    //   const res = nextProps.genOrderRes;
    //   if (res.msg !== '') {
    //     if (res.msg === "success") {
    //       message.success(res.words);
    //       setTimeout(() => {
    //         window.location.href = '/#/myorders';
    //       }, 1000);
    //     }
    //     else {
    //       message.error(res.words);
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 1000);
    //     }
    //   }
    // }
    if (nextProps.myInfo !== undefined) {
      this.setState({
        myInfo: nextProps.myInfo,
      });
    }
  }

  render() {
    const showDetails = this.props.showDetails;
    // 选择票档
    var priceRadioBtns = [];
    if (showDetails.prices !== undefined) {
      var prices = showDetails.prices.split(";");
      prices.pop();
      for (let i = 0; i < prices.length; i += 1) {
        const value = prices[i];
        priceRadioBtns.push(
          <RadioButton className={styles.PriceRadioBtn} key={value} value={value}>{value}&nbsp;元</RadioButton>
        );
      }
    }
    // 总计
    const {totalCost, selectCoupon}  = this.state;
    const totalCostStr = (totalCost === '--' ? totalCost : totalCost + '元');
    const {selectPrice, selectNum, myInfo} = this.state;
    // 打折
    const discount = myInfo.discount;
    const afterDiscount = totalCost * discount;
    // 优惠券
    let finalCost = afterDiscount;
    if (selectCoupon !== '') {
      finalCost -= parseFloat(selectCoupon);
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
        <GenOrder
          description={showDetails.description}
          showTime={showDetails.showTime}
          address={showDetails.address}
          price={selectPrice}
          number={selectNum}
          originalCost={totalCost}
          membershipTitle={myInfo.membershipTitle}
          afterDiscount={afterDiscount}
          myCoupons={myInfo.myCoupons}
          changeCoupon={this.changeCoupon}
          finalCost={finalCost}
        />
      </Modal>
    );
    return (
      <div>
        <Row className={styles.BuyPaneRow}>
          <Col offset={3} span={3} className={styles.BuyPaneImgCol}>
            <img src={showDetails.posterUrl}/>
          </Col>
          <Col offset={1} span={10} className={styles.BuyPaneTextCol}>
            <h3>{showDetails.description}</h3>
            <br />
            <br />
            <br />
            时间: &nbsp;{showDetails.showTime}
            <br />
            地点: &nbsp;{showDetails.address}
            <br />
          </Col>
        </Row>
        <Row>
          <Col offset={2} span={14} className={styles.BuyPaneSeatCol}>
            选择票档:&nbsp;&nbsp;
            <RadioGroup onChange={this.changePrice}>
              { priceRadioBtns }
            </RadioGroup>
            <br />
            <br />
            选择数量:&nbsp;&nbsp;
            <InputNumber
              min={1}
              max={20}
              defaultValue={1}
              onChange={this.changeInputNumber}/>
            <br />
            <br />
            合计:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.CostSpan}>{totalCostStr}</span>
            <br />
            <br />
            <Button className={styles.BuyBtn} onClick={this.buyNow}>立即购买</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button className={styles.SeatsBtn} onClick={this.selectSeats}>选座购票</Button>
          </Col>
          <Col offset={1} span={5} className={styles.AdsPane}>
            <img src={logoSrc}/>
          </Col>
        </Row>
        { genOrderModal }
      </div>
    );
  }
}
function mapStateToProps(state) {
  const showDetails = state.shows.showDetails;
  const myInfo = state.users.myInfo;
  console.log('----------------------- map in buy pane: ', showDetails, myInfo);
  return {showDetails, myInfo};
}
export default connect(mapStateToProps)(BuyPane);

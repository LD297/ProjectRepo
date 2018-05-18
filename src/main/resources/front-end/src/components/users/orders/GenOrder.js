/**
 * Created by a297 on 18/3/18.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Select } from 'antd';
const Option = Select.Option;

class GenOrder extends React.Component {

  state = {
    selectCoupon: '',
  };

  changeCoupon = (value) => {
    console.log(' change coupon: ', value);
    this.props.changeCoupon(value);
  };

  render () {
    const {description, showTime, address, price, number, originalCost, membershipTitle, afterDiscount, myCoupons, finalCost} = this.props;

    let couponsExchanged = [];
    let couponPart = <div style={{marginBottom: '10px'}}>无可用券</div>;
    if (myCoupons !== undefined) {
      if (myCoupons.length > 0) {
        let couponsArr = myCoupons.split(";");
        if (couponsArr.length > 1) {
          couponsArr.pop();
        }
        if (couponsArr.indexOf('30') >= 0) {
          couponsExchanged.push(
            <Option value={'30'} key={'30'}>30元</Option>
          );
        }
        if (couponsArr.indexOf('20') >= 0) {
          couponsExchanged.push(
            <Option value={'20'} key={'20'}>20元</Option>
          );
        }
        if (couponsArr.indexOf('10') >= 0) {
          couponsExchanged.push(
            <Option value={'10'} key={'10'}>10元</Option>
          );
        }
        couponPart =
          <div>
            可用券：
            <Select onChange={this.changeCoupon}
                    style={{width: '120px', marginBottom: '10px'}}>{ couponsExchanged }</Select>
          </div>
      }
    }

    return (
      <div>
        <h3>{description}</h3>
        <p>时间：{showTime}</p>
        <p>地点：{address}</p>
        <p>票价：{price} 元</p>
        <p>数量：{number}</p>
        <p>合计：{originalCost} 元</p>
        <p>{membershipTitle}折后：{afterDiscount} 元</p>
        { couponPart }
        <p>总计：{finalCost} 元</p>
      </div>
    );
  }
}
export default connect()(GenOrder);

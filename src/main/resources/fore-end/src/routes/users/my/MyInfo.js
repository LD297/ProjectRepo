/**
 * Created by a297 on 18/3/18.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Popover, Icon, Modal, message } from 'antd';
import Navigation from '../../../components/page_constitution/Navigation';
import Footer from '../../../components/page_constitution/Footer';
import styles from './MyInfo.css'
import * as security from '../../../utils/security';

class MyInfo extends React.Component {

  state = {
    myInfo: {},
    editingName: false,
    newName: '',
    exchangeCouponModalVisible: false,
    couponToExchange: '',
    cancelEmailModalVisible: false,
  };
  // const myInfo = {
  //   email: '875928078',
  //   nickname: 'w_297',
  //   membershipTitle: '白金会员',
  //   membershipPoint: 2000,
  //   availableCoupons: [5, 10, 20],
  //   myCoupons: [10, 20],
  // };

  componentWillReceiveProps(nextProps) {
    if (nextProps.myInfo !== undefined) {
      this.setState({
        myInfo: nextProps.myInfo,
        newName: nextProps.myInfo.name
      });
    }
    if (nextProps.exchangeCouponRes !== undefined) {
      const res = nextProps.exchangeCouponRes;
      if (res.msg === 'success') {
        message.success(res.words);
        setTimeout(() => { window.location.reload(); }, 1500);
      }
      else if (res.msg === 'failure') {
        message.error(res.words);
      }
    }
    if (nextProps.changeNameRes !== undefined) {
      const res = nextProps.changeNameRes;
      if (res.msg === 'success') {
        message.success(res.words);
        setTimeout(() => { window.location.reload(); }, 1500);
      }
      else if (res.msg === 'failure') {
        message.error(res.words);
      }
    }
    if (nextProps.cancelEmailRes !== undefined) {
      const res = nextProps.cancelEmailRes;
      if (res.msg === 'success') {
        // 退出账号
        // 返回注册界面
        message.success(res.words);
        setTimeout(
          () => {
            security.logout("userToken");
            window.location.href = "/#/register";
          }, 1500
        );
      }
      else if (res.msg === 'failure') {
        message.error(res.words);
      }
    }
  }

  clickEditNameBtn = (e) => {
    this.setState({
      editingName: true
    });
  };

  changeNameInput = (e) => {
    console.log("newName: ", e.target.value);
    this.setState({
      newName: e.target.value
    });
  };

  saveNameChange = (e) => {
    const { name } = this.state.myInfo;
    const { newName } = this.state;
    if (newName !== name) {
      this.props.dispatch({
        type: 'users/changeName',
        payload: newName
      });
    }
    this.setState({
      editingName: false
    });
  };

  goToModifyPsw = (e) => {
    alert("前往修改密码");
    window.location.href = "/#/securitymodification";
  };

  clickCouponsAvail = (e) => {
    console.log("选择兑换：", e.target.value);
    this.setState({
      couponToExchange: e.target.value,
      exchangeCouponModalVisible: true
    });
  };
  confirmExchangeCoupon = (e) => {
    // 兑换
    this.props.dispatch({
      type: 'users/exchangeCoupon',
      payload: this.state.couponToExchange
    });
    this.setState({
      exchangeCouponModalVisible: false,
    });
  };
  cancelExchangeCoupon = (e) => {
    this.setState({
      exchangeCouponModalVisible: false
    });
  };
  clickCancelEmailBtn = (e) => {
    this.setState({
      cancelEmailModalVisible: true
    });
  };
  confirmCancelEmail = (e) => {
    this.props.dispatch({
      type: 'users/cancelEmail',
      payload: ''
    });
    this.setState({
      cancelEmailModalVisible: false
    });
  };
  cancelCancelEmail = (e) => {
    this.setState({
      cancelEmailModalVisible: false
    });
  };

  render () {
    const { myInfo, editingName } = this.state;
    const { email, name, membershipTitle, membershipTitleRules, membershipPoint, membershipPointRules, availableCoupons, myCoupons } = myInfo;

    let couponsAvail = [];
    if (availableCoupons !== undefined) {
      if (availableCoupons.length > 0) {
        let couponsArr = availableCoupons.split(";");
        if (couponsArr.length > 1) {
          couponsArr.pop();
        }
        for (let i = 0; i < couponsArr.length; i += 1) {
          couponsAvail.push(
            <Button
              style={{marginRight: '10px', backgroundColor: 'orange', color: 'white'}}
              key={i + 1}
              value={couponsArr[i]}
              onClick={this.clickCouponsAvail}
            >
              {couponsArr[i]}元
            </Button>
          );
        }
      }
    }
    let couponsExchanged = [];
    if (myCoupons !== undefined) {
      if (myCoupons.length > 0) {
        let couponsArr = myCoupons.split(";");
        if (couponsArr.length > 1) {
          couponsArr.pop();
        }
        for (let i = 0; i < couponsArr.length; i += 1) {
          couponsExchanged.push(
            <Button style={{marginRight: '10px'}} key={i + 1}>{couponsArr[i]}元</Button>
          );
        }
      }
    }
    const namePart = (
      editingName
        ?
        <span>
          <Input defaultValue={name} className={styles.NameInput} onChange={this.changeNameInput} style={{width: '120px'}} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={this.saveNameChange}>保存更改</Button>
        </span>
        :
        <span>
          {name}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={this.clickEditNameBtn}>点击修改</Button>
        </span>
    );
    return (
      <div>
        <Navigation selectedKey="myinfo" />
        <div className={styles.MyInfoPane}>
          <h2>我的信息</h2>
          <br/>
          <p>邮箱：{email}</p>
          <p>用户名：
            {namePart}
          </p>
          <p>
            会员：{membershipTitle}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Popover
              content={membershipTitleRules}
              title="会员等级"
              trigger="hover"
              placement="bottomRight"
            >
              <Icon type="question-circle-o" />
            </Popover>
          </p>
          <p>
            积分：{membershipPoint}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Popover
              content={membershipPointRules}
              title="会员积分"
              trigger="hover"
              placement="right"
            >
              <Icon type="question-circle-o" />
            </Popover>
          </p>
          <p>可兑换优惠券：
            {couponsAvail}
          </p>
          <p>我的优惠券：{couponsExchanged}</p>
          <Button type="danger" onClick={this.clickCancelEmailBtn}>注销会员</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="dashed" onClick={this.goToModifyPsw}>修改密码</Button>
          <Modal
            title="兑换优惠券"
            visible={this.state.exchangeCouponModalVisible}
            onOk={this.confirmExchangeCoupon}
            onCancel={this.cancelExchangeCoupon}
            okText="确认"
            cancelText="取消"
          >
            <p>确认兑换<em> {this.state.couponToExchange} 元优惠券</em> ?</p>
          </Modal>
          <Modal
            title="注销会员"
            visible={this.state.cancelEmailModalVisible}
            onOk={this.confirmCancelEmail}
            onCancel={this.cancelCancelEmail}
            okText="确认"
            cancelText="取消"
          >
            <em style={{color: 'red'}}>注销后，该邮箱将无法重新注册使用。您确定继续？</em>
          </Modal>
        </div>
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { myInfo, exchangeCouponRes, changeNameRes, cancelEmailRes } = state.users;
  return { myInfo, exchangeCouponRes, changeNameRes, cancelEmailRes };
}
export default connect(mapStateToProps)(MyInfo);

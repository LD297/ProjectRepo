/**
 * Created by a297 on 18/3/16.
 */
import React from 'react';
import { connect } from 'dva';
import { InputNumber, Input, Steps, Button, message } from 'antd';
import GenSeatsPane from './gen_seats/GenSeatsPane';
import styles from './VenueInfoInput.css';
import md5 from 'js-md5';

const Step = Steps.Step;

class VenueInfoInput extends React.Component {

  state = {
    current: 0,
    address: '',
    stageName: '',
    psw: '',
    m: 10,
    n: 10,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
      const applyRes = nextProps.applyRes;
      if (applyRes.msg === 'success') {
        message.success(applyRes.words);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      else {
        message.error(applyRes.words);
      }
    }
  }
  changeAddress = (e) => {
    this.setState({
      address: e.target.value
    });
  };
  changeStageName = (e) => {
    this.setState({
      stageName: e.target.value,
    });
  };
  changePsw = (e) => {
    this.setState({
      psw: e.target.value
    });
  };
  checkBasicInfo = () => {
    const { address, stageName, psw } = this.state;
    if (address === '') {
      message.error('地址不得为空');
      return false;
    }
    if (stageName === '') {
      message.error('场馆名称不得为空');
      return false;
    }
    if(psw === '') {
      message.error('登录密码不得为空');
    }
    return true;
  };
  changeM = (value) => {
    this.setState({
      m: value,
    });
  };
  changeN = (value) => {
    this.setState({
      n: value,
    });
  };
  checkSquareNumbers = () => {
    if (this.state.m === undefined || this.state.n === undefined) {
      message.error('输入不得为空');
      return false;
    }
    return true;
  };
  next() {
    const current = this.state.current;
    var res = false;
    if (current === 0) {
      res = this.checkBasicInfo();
    }
    if (current === 1) {
      res = this.checkSquareNumbers();
    }
    else if (current == 2) {
      res = this.checkSeatsInfo();
    }
    if (res) {
      const next = current + 1;
      this.setState({current: next});
    }
  };
  prev() {
    const current = this.state.current - 1;
    this.setState({current});
  };
  handleFinish = () => {

    console.log('------------------- handle finish: ' , {
      address: this.state.address,
      stageName: this.state.stageName,
      psw: this.state.psw,
      row: this.state.m,
      col: this.state.n,
    });
    this.props.dispatch({
      type: 'venues/apply',
      payload: {
        address: this.state.address,
        stageName: this.state.stageName,
        psw: md5(this.state.psw),
        row: this.state.m,
        col: this.state.n,
      }
    });
  };
  render () {
    const { current, m, n, address, stageName, psw } = this.state;
    const steps = [
      {
        title: '添加基本信息',
        content:
          <div className={styles.BasicInfoDiv}>
            <div>
              详细地址：<Input defaultValue={address} className={styles.AddressInput} onChange={this.changeAddress} />
            </div>
            <div className={styles.StageNameInputDiv}>
              场馆名称：<Input defaultValue={stageName} className={styles.StageNameInput} onChange={this.changeStageName} />
            </div>
            <div className={styles.PswInputDiv}>
              登录密码：<Input type="password" defaultValue={psw} className={styles.PswInput} onChange={this.changePsw} />
            </div>
          </div>,
      }, {
        title: '添加座位',
        content:
          <div className={styles.AddSquresDiv}>
            输入行数：<InputNumber min={1} defaultValue={m} onChange={this.changeM} />
            <br />
            <br />
            输入列数：<InputNumber min={1} max={40}  defaultValue={n} onChange={this.changeN} />
          </div>,
      }, {
        title: '生成座位信息',
        content:
          <div>
            <h3> --- 舞台 ---</h3>
            <GenSeatsPane m={m} n={n} />
          </div>
      }
    ];
    const theContent = steps[this.state.current].content;

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title}/>)}
        </Steps>
        <div className={styles.stepsContent}>{theContent}</div>
        <div className={styles.stepsAction}>
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={this.handleFinish}>完成</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
              上一步
            </Button>
          }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const applyRes = state.venues.applyRes;
  return { applyRes };
}
export default connect(mapStateToProps)(VenueInfoInput);

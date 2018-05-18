/**
 * Created by a297 on 18/2/14.
 */
import React from 'react';
import {connect} from 'dva';
import { InputNumber, Input } from 'antd';
import styles from './DrawVenuePlan.css';
import {Steps, Button, message} from 'antd';
import LevelAndPrice from './LevelAndPrice';
import SeatsPane from '../venues/release/AddSeatsPricePane';
import VenueInfoPane from './VenueInfoPane';

const Step = Steps.Step;

/**
 * 1、m排，n列，f层，p种价格
 * 2、m排，n列，f层，p种价格，p种颜色
 * 3、每个小方格：x排，y列，楼层，价格，座位颜色
 * 4、选择后：
 *          自身颜色改变（通过自身state的价格与颜色的index映射）
 *          座位信息记录（通过传给SeatsPane，再传给DrawVenuePlan）
 *
 */

class DrawVenuePlan extends React.Component {

  state = {
    current: 0,
    m: 10,
    n: 10,
    address: '',
    stageName: '',
    prices: [],
    squaresInfo: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
      const applyRes = nextProps.applyRes;
      if (applyRes.msg === 'success') {
        message.success(applyRes.words);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        message.error(applyRes.words);
      }
    }
  }

  handleFinish = () => {

    let pricesStr = '';
    const  { prices } = this.state;
    prices.forEach(function (value, index, arr) {
      pricesStr += value;
      pricesStr += ';';
    });
    console.log('pricesStr :' + pricesStr);
    this.props.dispatch({
      type: 'venues/apply',
      payload: {
        address: this.state.address,
        stageName: this.state.stageName,
        prices: pricesStr,
        squaresInfo: this.state.squaresInfo
      }
    });
  };

  handleSelect = (selectInfo) => {
    const { status, price, x, y, priceLevel }  =  selectInfo;
// console.log(' x: ' + x + ' y: ' + y + ' price: ' + price + ' status: ' + status + ' level ' + priceLevel);
const squares = this.state.squaresInfo;
Object.assign(squares[x-1][y-1], { status }, { price }, { priceLevel });
};

  submitPrices = (values) => {
    this.setState({
      prices: values.names,
    });
    // console.log("===== submit prices: " + this.state.stageName);
    if (this.state.stageName.length === 0) {
      message.error('看台名称不得为空');
    }
    else {
      const current = this.state.current;
      const next = current + 1;
      this.setState({current: next});
    }
  };

  stageNameChange = (e) => {
    const { value } = e.target;
    // console.log("stage name change: " + value);
    this.setState({
      stageName: value,
    });
  };

  initSeatsSquares = () => {
    const m = this.state.m;
    const n = this.state.n;
    var squareNumber = 1;
    var squaresAllLines = [];
    for (let i = 0; i < m; i ++) {
      var squaresInLine = [];
      for (let j = 0; j < n; j ++) {
        squaresInLine.push(
        {
          status: 0,
          price: 0,
          priceLevel: 0,
          key: squareNumber
        });
        squareNumber += 1;
      }
      squaresAllLines.push(squaresInLine);
    }
    this.setState({
      squaresInfo: squaresAllLines
    });
  };

  checkSeatsInfo = () => {
    // todo 检查确实添加了座位
    //
    // const m = this.state.m;
    // const n = this.state.n;
    // const info = this.state.squaresInfo;
    // for (var i = 0 ; i < m; i ++) {
    //   for (var j = 0; j < n; j ++) {
        // console.log('x=' + i + ' y=' + j + ' ' + info[i][j].status + '')
    //     console.log('x = ' + i + ', y = ' + j);
    //     console.log(info[i][j]);
    //   }
    // }
    return true;
  };

  checkPresetInfo = () => {
    if (this.state.stageName === undefined || this.state.prices.length === 0) {
      message.error('名称或票价不得为空');
      return false;
    }
    return true;
  };

  checkSquareNumbers = () => {
    if (this.state.m === undefined || this.state.n === undefined) {
      message.error('输入不得为空');
      return false;
    }
    this.initSeatsSquares();
    return true;
  };

  checkAddress = () => {
    if (this.state.address === undefined) {
      message.error('地址不得为空');
      return false;
    }
    return true;
  };

  changeM = (value) => {
    // console.log('valueM ' + value);
    this.setState({
      m: value,
    });
  };

  changeN = (value) => {
    // console.log('valueN ' + value);
    this.setState({
      n: value,
    });
  };

  changeAddress = (e) => {
    const { value } = e.target;
    // console.log("address change: " + value);
    this.setState({
      address: value
    });
  };

  next() {
    const current = this.state.current;
    var res = false;
    if (current === 0) {
      res = this.checkAddress();
    }
    if (current === 1) {
      res = this.checkSquareNumbers();
    }
    else if (current == 2) {
      res = this.checkPresetInfo();
    }
    else if (current == 3) {
      res = this.checkSeatsInfo();
    }
    if (res) {
      const next = current + 1;
      this.setState({current: next});
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({current});
  }

  render() {
    // for VenueInfoPane
    const squares = this.state.squaresInfo;
    const prices = this.state.prices;
    // console.log('>>>>>>>>>>>>>     ' + prices);
    const stageName = this.state.stageName;

    const seatsParams =
        {
          param_m: this.state.m,
          param_n: this.state.n,
          param_stageName: this.state.stageName,
          param_prices: this.state.prices,
      };
    const steps = [{
      title: '添加地址',
      content:
      <div>
        地址：<Input className={styles.AddressInput} onChange={this.changeAddress} />
      </div>
    },{
      title: '添加方格',
      content:
        <div className={styles.AddSquresDiv}>
          输入观众席最大排数：<InputNumber min={1} defaultValue={10} onChange={this.changeM} />
          <br />
          <br />
          输入每排最大座位数：<InputNumber min={1} max={40}  defaultValue={10} onChange={this.changeN} />
        </div>,
    }, {
      title: '预设信息',
      content:
        <div className={styles.PreSetInfoDiv}>
          <div className={styles.StageNameDiv}>
            舞台名称：<Input className={styles.StageNameInput} onChange={this.stageNameChange} />
          </div>
          <br />
          <LevelAndPrice submitPrices={this.submitPrices} />
        </div>,
    }, {
      title: '添加座位',
      content:
        <div>
          <SeatsPane seatsParams={seatsParams} handleSelect={this.handleSelect} />
        </div>,
    }, {
      title: '生成场馆信息',
      content: <VenueInfoPane squares={squares} prices={prices} stageName={stageName} />,
    }];

    const {current} = this.state;
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
export default connect(mapStateToProps)(DrawVenuePlan);

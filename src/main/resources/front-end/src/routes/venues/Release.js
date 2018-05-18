/**
 * Created by a297 on 18/3/13.
 */
import React from 'react';
import { connect } from 'dva';
import { message, Steps, Button, Row, Col } from 'antd';
import VenueNav from '../../components/page_constitution/VenueNav';
import ReleaseForm from '../../components/venues/release/ReleaseForm';
import LevelAndPrice from '../../components/deprecated/LevelAndPrice';
import AddSeatsPricePane from '../../components/venues/release/AddSeatsPricePane';
import styles from './Release.css';

const Step = Steps.Step;
class Release extends React.Component {

  state = {
    current: 0,
    venueId: '',
    showTime: '',
    type: '',
    description: '',
    posterUrl: '',
    prices: [],
    seatsPriceInfo: [],
  };
  componentWillReceiveProps(nextPros) {
    if (nextPros.releaseRes !== undefined) {
      if (nextPros.releaseRes.msg !== '') {
        const releaseRes = nextPros.releaseRes;
        if (releaseRes.msg === 'success') {
          message.success(releaseRes.words);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
        else {
          message.error(releaseRes.words);
        }
      }
    }
  }

  initSeatsInfo = () => {
    const m = this.props.myVenue.row;
    const n = this.props.myVenue.col;
    var squareNumber = 1;
    var squaresAllLines = [];
    for (let i = 0; i < m; i ++) {
      var squaresInLine = [];
      for (let j = 0; j < n; j ++) {
        squaresInLine.push(
          {
            price: 0,
            priceLevel: 0,
            key: squareNumber
          });
        squareNumber += 1;
      }
      squaresAllLines.push(squaresInLine);
    }
    this.setState({
      seatsPriceInfo: squaresAllLines
    });
  };

  handleSeatPriceChange = (changeInfo) => {
    const { x, y, price, priceLevel }  = changeInfo;
    const seatsPriceInfo = this.state.seatsPriceInfo;
    Object.assign(seatsPriceInfo[x-1][y-1], { price }, {priceLevel});

  };

  submitReleaseInfo = (payload) => {
    console.log('submit release info in release page:', payload);
    const cur = this.state.current;
    this.setState({
      venueId: payload.venueId,
      showTime: payload.showTime,
      type: payload.type,
      description: payload.description,
      posterUrl: payload.posterUrl,
      current: cur + 1
    });
  };
  submitPrices = (values) => {
    const cur = this.state.current;
    this.setState({
      prices: values.names,
      current: cur + 1,
    });
    this.initSeatsInfo();
  };
  handleFinish = () => {
    console.log('=========== finish ===========', this.state);
    const seatsPriceValid = this.checkSeatsPrice();
    if (seatsPriceValid) {
      const { venueId, showTime, type, description, posterUrl, prices, seatsPriceInfo } = this.state;
      this.props.dispatch({
        type: 'venues/release',
        payload: { venueId, showTime, type, description, posterUrl, prices, showSeatsInfo: seatsPriceInfo },
      });
    }
    else {
      message.error('座位票价不得为空！');
    }
  };
  checkSeatsPrice = () => {
    const seatsPriceInfo = this.state.seatsPriceInfo;
    console.log('check seats price: ', seatsPriceInfo);
    var allValid = true;
    seatsPriceInfo.forEach(function (value, index, arr) {
      value.forEach(function (v, i, a) {
        console.log(' seat price status:  ', v);
        if (v.priceLevel === 0) {
          allValid = false;
        }
      });
    });
    return allValid;
  };

  render () {
    const seatsParams = {
      param_m: this.props.myVenue.row,
      param_n: this.props.myVenue.col,
      param_stageName: this.props.myVenue.stageName,
      param_prices: this.state.prices,
    };
    const steps = [
      {
        title: '添加演出信息',
        content: <ReleaseForm submitReleaseInfo={this.submitReleaseInfo} />
      }, {
        title: '添加可选票价',
        content: <LevelAndPrice submitPrices={this.submitPrices} />
      }, {
        title: '添加座位信息',
        content: <AddSeatsPricePane seatsParams={seatsParams} handleSeatPriceChange={this.handleSeatPriceChange} />
      }
    ];
    const theContent = steps[this.state.current].content;
    return (
      <div>
        <VenueNav selectedKey="release" />
        <Row>
          <Col offset={3} span={18} className={styles.ReleaseInfoInputCol}>
            <div>
              <Steps current={this.state.current}>
                {steps.map(item => <Step key={item.title} title={item.title}/>)}
              </Steps>
              <div className={styles.stepsContent}>{theContent}</div>
              <div className={styles.stepsAction}>
                {
                  this.state.current === steps.length - 1
                  &&
                  <Button type="primary" onClick={this.handleFinish}>完成</Button>
                }
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const releaseRes = state.venues.releaseRes;
  const myVenue = state.venues.myVenue;
  return { releaseRes, myVenue };
}
export default connect(mapStateToProps)(Release);

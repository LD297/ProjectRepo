/**
 * Created by a297 on 18/3/20.
 */
import React from 'react';
import { connect } from 'dva';
import { Tooltip, Button } from 'antd';

const bgColors =
  [
    '#bebebe',  // 灰色: 已售
    '#FF366D', '#ff8403', '#9800FF', '#00f1ff', '#007aff', // 玫红，橘黄，紫色，蓝色，青色: 可售
    '#862628',  // 暗红: 锁定
    '#28e61b',  // 绿色: 已选
  ];
class SelectSeat extends React.Component {

  state = {
    // 格子属性
    id: 0,
    x: 0,
    y: 0,
    status: 0,
    price: 0.00,
    priceLevel: 0,

    // 是否选座
    isSelected: false,
  };

  componentWillMount() {
    const id = this.props.id;
    const x = this.props.x;
    const y = this.props.y;
    const status = this.props.status;
    const price = this.props.price;
    const priceLevel = this.props.priceLevel;
    this.setState({
      id, x, y, status, price, priceLevel
    });
  }

  handleClick = (e) => {
    if (this.state.status === 0) {
      // 可售的座位
      if (this.state.isSelected) {
        // 取消选择
        this.setState({
          isSelected: false
        });
        this.props.onClick({
          operation: 'minus',
          id: this.state.id,
          x: this.state.x,
          y: this.state.y,
          price: this.state.price
        });
      }
      else {
        // 用户选择
        this.setState({
          isSelected: true
        });
        this.props.onClick({
          operation: 'plus',
          id: this.state.id,
          x: this.state.x,
          y: this.state.y,
          price: this.state.price
        });
      }
    }
  };

  render() {
    var canvasStyle = {
      width: '15px',
      height: '15px',
      margin: '3px',
      flex: '0 0 auto',
      background: '#FF366D'
    };
    const { status, priceLevel } = this.state;
    let bgColor = bgColors[parseInt(priceLevel)];
    if (status === 1) {
      bgColor = '#bebebe';
    }
    else if (status === 2) {
      bgColor  = '#862628';
    } else if (status === 0) {
      if (this.state.isSelected) {
        bgColor = '#28e61b';
      }
    }

    Object.assign(canvasStyle, {background: bgColor});
    const x = this.state.x;
    const y = this.state.y;
    const priceStr = ('¥'+ this.state.price);
    const toolTipTitle = x + "排" + y + "列 " + priceStr;

    return (
      <div>
        <Tooltip placement="top" title={toolTipTitle}>
          <canvas style={canvasStyle} onClick={this.handleClick} />
        </Tooltip>
      </div>
    );
  }
}
export default connect()(SelectSeat);

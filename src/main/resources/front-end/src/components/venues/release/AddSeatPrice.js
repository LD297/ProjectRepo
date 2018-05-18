/**
 * Created by a297 on 18/3/5.
 */
import React from 'react';
import { connect } from 'dva';
import { Tooltip, Alert, Modal, Button, Select } from 'antd';
const Option = Select.Option;
const bgColors =
  // 灰色，玫红，橘黄，紫色，蓝色，青色，绿色
  [
    '#bebebe', '#FF366D', '#ff8403', '#9800FF', '#00f1ff', '#007aff', '#28e61b'
  ];
class AddSeatPrice extends React.Component {

  state = {
    // 格子属性
    x: 0,
    y: 0,
    price: 0,
    priceLevel: 0,

    // 场馆信息
    stageName: '',
    prices: [],

    // 格子界面显示
    visible: false,
  };

  componentWillMount() {
    const x = this.props.x;
    const y = this.props.y;
    const stageName = this.props.stageName;
    const prices = this.props.prices;
    this.setState({
      x, y, stageName, prices, price: prices[0]
    });
  }
  /**
   * 添加座位 || 删除座位
   */
  handleClick = (e) => {
    if (this.state.priceLevel === 0) {
      // 添加座位信息
      this.setState({
        visible: true,
      });
    }
    else {
      // 删除座位信息
      this.setState({
        price: 0,
        priceLevel: 0,
      });
      this.props.handleSelect({
        x: this.props.x,
        y: this .props.y,
        price: 0,
        priceLevel: 0
      });
    }

  };
  /**
   * 选择座位价格
   */
  handlePriceChange = (value) => {
    // console.log("price change: " + value);
    this.setState({
      price: value,
    });
  };
  /**
   * 确认添加座位
   */
  handleOk = (e) => {
    const prices = this.state.prices;
    let selectPrice = this.state.price;
    if (selectPrice === 0) {
      selectPrice = prices[0];
    }
    const index = prices.indexOf(selectPrice);
    // 当前格子颜色改变
    this.setState({
      visible: false,
      priceLevel: index + 1,
    });
    // 将格子信息传递给父组件
    const selectInfo = {
      x: this.props.x,
      y: this .props.y,
      price: selectPrice,
      priceLevel: index + 1
    };
    console.log('传给父组件的消息：' + selectInfo.x + selectInfo.y + selectInfo.price + selectInfo.priceLevel);
    this.props.handleSelect(selectInfo);
  };
  /**
   * 取消添加座位
   */
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    // console.log("======== prices: " + this.state.prices);
    /**
     * canvas bgColor
     */
    var canvasStyle =  {
      width: '15px',
      height: '15px',
      margin: '3px',
      flex: '0 0 auto',
      background: '#FF366D'
    };
    var bgColorIndex = this.state.priceLevel;
    console.log("============ canvas bgColor index : " + bgColorIndex);
    Object.assign(canvasStyle, {background: bgColors[parseInt(bgColorIndex)]})
    // console.log("============ canvas style : " + canvasStyle.background);
    /**
     * options
     */
    const prices = this.state.prices;
    var options = [];
    for (var i = 0; i < prices.length; i ++) {
      options.push(<Option value={prices[i]} key={i}>{prices[i]}&nbsp;&nbsp;</Option>)
    }
    const defaultPrice = prices[0];
    /**
     * others settings
     */
    const x = this.state.x;
    const y = this.state.y;
    const priceStr = (bgColorIndex === 0 ? '' : ' ¥'+ this.state.price);
    const toolTipTitle = x + "排" + y + "列 " + priceStr;
    const stageName = this.state.stageName;

    return (
      <div>
        <Tooltip placement="top" title={toolTipTitle}>
          <canvas
            style={canvasStyle}
            onClick={this.handleClick} />
        </Tooltip>
        <Modal
          title="添加座位信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <div>
            舞台名称：<em>{stageName}</em>
          </div>
          <br />
          <div>
            选择票价：
            <Select defaultValue={defaultPrice} onChange={this.handlePriceChange}>
              {options}
            </Select>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect()(AddSeatPrice);

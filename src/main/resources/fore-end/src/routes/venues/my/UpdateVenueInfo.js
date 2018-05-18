/**
 * Created by a297 on 18/3/30.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, message } from 'antd';
import VenueNav from '../../../components/page_constitution/VenueNav';

class UpdateVenueInfo extends React.Component {

  state = {
    newName: '',
    newAddress: '',
  };

  changeAddress = (e) => {
    this.setState({
      newAddress: e.target.value
    });
  };

  changeName = (e) => {
    this.setState({
      newName: e.target.value
    });
  };

  saveUpdate = (e) => {
    const { newName, newAddress } = this.state;
    const { myVenue } = this.props;
    if (newName == '') {
      message.warning('场馆名称不得为空！');
    }
    else if (newAddress == '') {
      message.warning('场馆地址不得为空');
    }
    else {
      console.log('修改：' , newName, newAddress);
      this.props.dispatch({
        type: 'venues/updateVenueInfo',
        payload: {
          venueId: myVenue.id,
          name: newName,
          address: newAddress,
          status: 0,
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    const updateVenueInfoRes = nextProps.updateVenueInfoRes;
    console.log('----------- will receive: ', nextProps);
    if (updateVenueInfoRes !== undefined) {
      if (updateVenueInfoRes.msg !== '') {
        if (updateVenueInfoRes.msg === 'success'){
          message.success(updateVenueInfoRes.words);
          setTimeout(
            () => {window.location.href="/#/venueinfo"}
            , 1500);
        }
        else if (updateVenueInfoRes.nsg === 'failure') {
          message.error(updateVenueInfoRes.words);
        }
      }
    }
  }

  render () {

    const { myVenue } = this.props;
    const { newName, newAddress } = this.state;
    const addressValue = (
      newAddress == '' ? myVenue.address : newAddress
    );
    const nameValue = (
      newName == '' ? myVenue.stageName : newName
    );

    return (
      <div>
        <VenueNav selectedKey="updatevenueinfo" />
        <div style={{ margin: '5% 0 0 40%' }}>
          <h3>修改场馆基本信息</h3>
          <br />
          <p>
            地址：
            <Input
              value={addressValue}
              onChange={this.changeAddress}
              style={{ width: '200px' }}
            />
          </p>
          <p>名称：
            <Input
              value={nameValue}
              onChange={this.changeName}
              style={{ width: '200px' }}
            />
          </p>
          <br />
          <Button type="primary" onClick={this.saveUpdate}>保存修改</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myVenue: state.venues.myVenue,
    updateVenueInfoRes: state.venues.updateVenueInfoRes
  };
}
export default connect(mapStateToProps)(UpdateVenueInfo);

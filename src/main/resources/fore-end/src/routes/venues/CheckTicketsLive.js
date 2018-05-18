/**
 * Created by a297 on 18/3/27.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Input, message } from 'antd';
import VenueNav from '../../components/page_constitution/VenueNav';

class CheckTicketsLive extends React.Component{

  state = {
    ticketNumber: '',
  };

  changeTicketInput = (e) => {
    this.setState({
      ticketNumber: e.target.value
    });
  };

  handleClick = (e) => {
    const { ticketNumber } = this.state;
    console.log('----------- 检票: ', ticketNumber);
    if (ticketNumber == "") {
      message.warning('请输入票号');
    }
    else {
      this.props.dispatch({
        type: 'venues/checkTicketsLive',
        payload: {
          showId: this.props.showDetails.id,
          ticketNumber: ticketNumber
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkTicketLiveRes !== undefined) {
      const { checkTicketLiveRes } = nextProps;
      if (checkTicketLiveRes.msg !== '') {
        if (checkTicketLiveRes.msg == "success") {
          message.success(checkTicketLiveRes.words);
          setTimeout(()=>{
            this.setState({
              ticketNumber: '',
            });
          }, 1500);
        }
        else if (checkTicketLiveRes.msg == "failure") {
          message.error(checkTicketLiveRes.words);
        }
      }
    }
  }

  render () {
    const { showDetails }  = this.props;
    const value = this.state.ticketNumber;
    return (
      <div>
        <VenueNav selectedKey="checkticketslive" />
        <div style={{textAlign: 'center', marginTop: '5%'}}>
          <h2><span style={{color: '#FF5C00'}}>[ 检票 ]</span> {showDetails.description} </h2>
          <br />
          票号：<Input style={{width: '240px', marginRight: '15px'}} onChange={this.changeTicketInput} value={value} />
          <Button type="primary" onClick={this.handleClick}>确认检票</Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    showDetails: state.shows.showDetails,
    checkTicketLiveRes: state.venues.checkTicketLiveRes
  };
}
export default connect(mapStateToProps)(CheckTicketsLive);

/**
 * Created by a297 on 18/3/12.
 */
import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import ManagerNav from '../../components/page_constitution/ManagerNav';
import ShowBalancePane from '../../components/managers/ShowBalancePane';

class Balance extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { balanceRes } = nextProps;
    if (balanceRes !== undefined) {
      if (balanceRes.msg !== '') {
        if (balanceRes.msg == "success") {
          message.success(balanceRes.words);
          setTimeout(
            () => {
              window.location.reload();
            },
            1500
          );
        }
        else if (balanceRes.msg == "failure") {
          message.error(balanceRes.words);
        }
      }
    }
  }

  render () {
    return (
      <div>
        <ManagerNav selectedKey="balance" />
        <ShowBalancePane />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {balanceRes: state.managers.balanceRes};
}
export default connect(mapStateToProps)(Balance);

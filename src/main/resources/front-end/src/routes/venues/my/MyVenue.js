/**
 * Created by a297 on 18/3/13.
 */
import React from 'react';
import { connect } from 'dva';
import { message, Input } from 'antd';
import VenueNav from '../../../components/page_constitution/VenueNav';
import GenSeatsPane from '../../../components/venues/application/gen_seats/GenSeatsPane';
import styles from './MyVenue.css';

class MyVenue extends React.Component {

  render () {
    var showMyVenue = [];
    const  { myVenue } = this.props;
    if (myVenue !== undefined) {
      const used = myVenue.used;
      if (used !== -1) {
        // 申请过
        var statusStr = '';
        if (used === 0) {
          statusStr = '待审核';
        }
        else if (used === 1) {
          statusStr = '通过';
        }
        else if (used === 2) {
          statusStr = '不通过　';
        }
        showMyVenue = (
          <div className={styles.ShowMyVenueDiv}>
            <div className={styles.VenueInfoDiv}>
              <p>地址：{myVenue.address}</p>
              <p>名称：{myVenue.stageName}</p>
              <p>状态：{statusStr}</p>
              <p>座位信息：(共{myVenue.row}排{myVenue.col}列)</p>
            </div>
            <div className={styles.ShowVenueSeatsDiv}>
              <h3>--- 舞台 ---</h3>
              <GenSeatsPane m={myVenue.row} n={myVenue.col} />
            </div>
          </div>
        );
      }
      else {
        showMyVenue = (
          <h2 style={{textAlign: 'center', marginTop: '10%'}}>您还没有申请场馆，请尽快申请。（场馆审核通过即可发布演出）</h2>
        );
      }
    }
    else {
      showMyVenue = (
        <h2 style={{textAlign: 'center', marginTop: '10%'}}>您还没有申请场馆，请尽快申请。（场馆审核通过即可发布演出）</h2>
      );
    }

    return (
      <div>
        <VenueNav selectedKey="myvenue" />
        { showMyVenue }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {myVenue: state.venues.myVenue};
}
export default connect(mapStateToProps)(MyVenue);

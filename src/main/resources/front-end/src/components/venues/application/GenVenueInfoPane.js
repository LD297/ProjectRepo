/**
 * Created by a297 on 18/3/17.
 */
import React from 'react';
import { connect } from 'dva';
import SeatsPane from '../../deprecated/SeatsPane';


function GenVenueInfoPane({ venueInfo }) {
  return (
    <div>
      <p>地址：{ venueInfo.address }</p>
      <p>名称：{ venueInfo.stageName }</p>
      <p>座位信息：</p>
      <SeatsPane seatsInfo={venueInfo.squaresInfo} />
    </div>
  );
}
export default connect()(GenVenueInfoPane);

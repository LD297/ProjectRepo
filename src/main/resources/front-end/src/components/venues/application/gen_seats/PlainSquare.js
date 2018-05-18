/**
 * Created by a297 on 18/3/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';

class PlainSquare extends React.Component {

  render () {
    const toolTipTitle = this.props.x + "排" + this.props.y + "列 ";
    const canvasStyle = {
      width: '15px',
      height: '15px',
      margin: '3px',
      flex: '0 0 auto',
      backgroundColor: '#28e61b',
    };
    return (
      <div>
        <Tooltip placement="top" title={toolTipTitle}>
          <canvas style={canvasStyle} />
        </Tooltip>
      </div>
    );
  }
}
export default connect()(PlainSquare);

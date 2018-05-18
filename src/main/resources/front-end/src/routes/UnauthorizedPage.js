/**
 * Created by a297 on 18/3/26.
 */
import React from 'react';
import { connect } from 'dva';

function UnauthorizedPage() {
  return (
    <h1>无访问权限</h1>
  );
}
export default connect()(UnauthorizedPage);

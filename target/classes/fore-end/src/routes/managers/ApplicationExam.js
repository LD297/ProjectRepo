/**
 * Created by a297 on 18/3/12.
 */
import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import ManagerNav from '../../components/page_constitution/ManagerNav';
import ShowApplicationPane from '../../components/managers/ShowApplicationsPane';

class ApplicationExam extends React.Component{

  componentWillReceiveProps(nextProps) {
    if (nextProps != undefined) {
      const applicationExaminationRes = nextProps. applicationExaminationRes;
      if ('success' === applicationExaminationRes.msg) {
        message.success(applicationExaminationRes.words);
      }
      else {
        message.fail(applicationExaminationRes.words);
      }
      setTimeout(() => {window.location.reload();}, 1500);
    }
  }

  render () {
    return (
      <div>
        <ManagerNav selectedKey="applicationexam" />
        <ShowApplicationPane />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    applicationExaminationRes: state.managers.applicationExaminationRes
  };

}
export default connect(mapStateToProps)(ApplicationExam);

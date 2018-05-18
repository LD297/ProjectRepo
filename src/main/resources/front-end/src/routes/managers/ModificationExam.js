/**
 * Created by a297 on 18/3/30.
 */
import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import ManagerNav from '../../components/page_constitution/ManagerNav';
import ShowModificationsPane from '../../components/managers/ShowModificationsPane';

class ModificationExam extends React.Component{

  componentWillReceiveProps(nextProps) {
    if (nextProps != undefined) {
      const modificationExaminationRes = nextProps. modificationExaminationRes;
      if ('success' === modificationExaminationRes.msg) {
        message.success(modificationExaminationRes.words);
      }
      else {
        message.fail(modificationExaminationRes.words);
      }
      setTimeout(() => {window.location.reload();}, 1500);
    }
  }

  render () {
    return (
      <div>
        <ManagerNav selectedKey="modificationexam" />
        <ShowModificationsPane />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    modificationExaminationRes: state.managers.modificationExaminationRes
  };

}
export default connect(mapStateToProps)(ModificationExam);

/**
 * Created by a297 on 18/2/8.
 */
/**
 * Created by a297 on 18/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import LoginForm from '../../../components/users/LoginForm';
import Navigaton from '../../../components/page_constitution/Navigation';
import Footer from '../../../components/page_constitution/Footer';
import styles from './UserLogin.css';

class UserLogin extends React.Component {

  componentWillReceiveProps(nextProps) {
    console.log("============== will = " + nextProps);

    if (nextProps !== null) {
      console.log("============== login page will receive = " + nextProps.loginRes);
      const loginRes = nextProps.loginRes;
      if (loginRes.msg === "GOTOHOMEPAGE") {
        message.success(loginRes.words);
        setTimeout(() => {
          window.location.href = "/#/homepage";
        }, 1500);
      }
      else {
        message.error(loginRes.words);
      }
    }
  }
  render() {
    return (
      <div>
        <Navigaton />
        <div className={styles.FloatPane}>
          <LoginForm />
          <a href="/#/register">去注册</a>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loginRes = state.users.loginRes;
  console.log("============== in login page  map = " + loginRes.msg);
  return  { loginRes };
}
export default connect(mapStateToProps)(UserLogin);

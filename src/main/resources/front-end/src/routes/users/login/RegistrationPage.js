/**
 * Created by a297 on 18/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import RegistrationForm from '../../../components/users/RegistrationForm';
import styles from './RegistrationPage.css';
import Navigation from '../../../components/page_constitution/Navigation';
import Footer from '../../../components/page_constitution/Footer';

class RegistrationPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    console.log("============== will = " + nextProps);
    if (nextProps !== null) {
      console.log("============== register page will receive = " + nextProps.registrationRes);
      const registrationRes = nextProps.registrationRes;
      if (registrationRes.msg === "ERROR") {
        message.error(registrationRes.words);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else if (registrationRes.msg === "GOTOAVTIVATE" || registrationRes.msg === "GOTOLOGIN") {
        message.success(registrationRes.words);
        setTimeout(() => {
          window.location.href = "/#/login";
        }, 1500);
      }
      else {
        message.error("未知错误，请稍后再试");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  }
  render() {
    return (
      <div>
        {/*<MainLayout className={styles.FloatPane} />*/}
        <Navigation />
        <div className={styles.FloatPane}>
          <RegistrationForm />
          <a href="/#/login">去登录</a>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const registrationRes = state.users.registrationRes;
  console.log("============== in register page map = " + registrationRes.msg);
  return  { registrationRes };
}
export default connect(mapStateToProps)(RegistrationPage);

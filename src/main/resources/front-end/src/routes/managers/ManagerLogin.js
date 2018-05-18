/**
 * Created by a297 on 18/3/12.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, message } from 'antd';
import styles from './ManagerLogin.css';
import md5 from 'js-md5';

class ManagerLogin extends React.Component {

  state = {
    id: '',
    psw: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
      const loginRes = nextProps.loginRes;
      if (loginRes.msg === 'success') {
        message.success(loginRes.words);
        setTimeout(() => {
          window.location.href = "/#/applicationexam";
        }, 1500);
      }
      else {
        message.error(loginRes.words);
      }
    }
  }

  changeInput = (e) => {
    // console.log("=== " + e.target.value);
    this.setState({
      id: e.target.value
    });
  };

  changePsw = (e) => {
    this.setState({
      psw: e.target.value
    });
  };


  handleLogin = () => {
    console.log(' ====== manager login in routes: ', this.state.id, md5(this.state.psw));
    this.props.dispatch({
      type: 'managers/login',
      payload: {
        id: this.state.id,
        psw: md5(this.state.psw)
      }
    });
  };

  render () {
    return (
      <div className={styles.ManagerLogin}>
        <h2>票务经理登录</h2>
        <hr />
        帐号：
        <Input className={styles.IDInput} onChange={this.changeInput} />
        <br />
        密码：
        <Input className={styles.IDInput} onChange={this.changePsw} type="password" />
        <br />
        <Button type="primary" className={styles.LoginBtn} onClick={this.handleLogin}>确认登录</Button>
      </div>
    );
  };
}
function mapStateToProps(state) {
  const loginRes = state.managers.loginRes;
  return { loginRes };
}
export default connect(mapStateToProps)(ManagerLogin);

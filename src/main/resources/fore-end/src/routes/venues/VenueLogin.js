/**
 * Created by a297 on 18/3/9.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, message } from 'antd';
import styles from './VenueLogin.css';
import md5 from 'js-md5';

class VenueLogin extends React.Component {

  state = {
    id: '',
    psw: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
      const loginRes = nextProps.loginRes;
      if (loginRes.msg === 'success') {
        message.success(loginRes.words, 2);
        setTimeout(() => {
          window.location.href = "/#/myvenue";
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
    console.log(' ====== venue login in routes: ' , this.state.id, md5(this.state.psw));
    this.props.dispatch({
      type: 'venues/login',
      payload: {
        id: this.state.id,
        psw: md5(this.state.psw)
      }
    });
  };

  render () {
    return (
      <div className={styles.VenueLogin}>
        <h2>场馆登录</h2>
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
  const loginRes = state.venues.loginRes;
  return { loginRes };
}
export default connect(mapStateToProps)(VenueLogin);

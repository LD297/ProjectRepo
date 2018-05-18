import React from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Tooltip, Icon, message} from 'antd';
import md5 from 'js-md5';
import styles from './RegistrationForm.css';
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    // autoCompleteResult: [],
  };
  clickRegister = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const hide = message.loading('正在提交, 请稍后...', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 3000);
      }
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of forms: ', values);
        this.props.dispatch({
          type: 'users/register',
          payload: {
            nickname: values.nickname,
            password: md5(values.password),
            email: values.email,
          }
        });
      }
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('确认密码与密码不一致!');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: {span: 12},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 8},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={styles.RegistrationPane}>
        <h1>注&nbsp;册</h1>
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                    <Icon type="user"/>
                &nbsp;
                  </span>
            )}
          >
            {getFieldDecorator('nickname', {
              rules: [{required: true, message: '请输入用户名!', whitespace: true}],
            })(
              <Input placeholder="用户名"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                    <Icon type="lock"/>
                &nbsp;
                  </span>
            )}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" placeholder="密码"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                    <Icon type="lock"/>
                &nbsp;
                  </span>
            )}
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认密码!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} placeholder="确认密码"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={(
            <span>
                    <Icon type="mail"/>
              &nbsp;
                  </span>
          )}
          >
            {
              getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  message: '邮箱地址不合法',
                }, {
                  required: true,
                  message: '请输入邮箱地址',
                }],
              })(
                <Input placeholder="邮箱地址"/>
              )
            }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={this.clickRegister} className={styles.Btn}>注册</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
RegistrationForm = Form.create({})(RegistrationForm);
export default connect()(RegistrationForm);

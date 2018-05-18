/**
 * Created by a297 on 18/2/8.
 */
import React from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Icon} from 'antd';
import md5 from 'js-md5';
import styles from './LoginForm.css';
const FormItem = Form.Item;

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of forms: ', values);
        this.props.dispatch({
          type: 'users/login',
          payload: {
            email: values.email,
            password: md5(values.password),
          }
        });
      }
    });
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
      <div className={styles.LoginPane}>
        <h1>登&nbsp;录</h1>
        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} className={styles.FormItem} label={(
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
          <FormItem
            {...formItemLayout}
            className={styles.FormItem}
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
          <FormItem {...tailFormItemLayout} className={styles.FormItem}>
            <Button type="primary" htmlType="submit" className={styles.Btn}>登&nbsp;录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
LoginForm = Form.create({})(LoginForm);
export default connect()(LoginForm);

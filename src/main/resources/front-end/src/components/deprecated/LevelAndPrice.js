/**
 * Created by a297 on 18/2/22.
 */
import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Button, InputNumber, message} from 'antd';
import styles from './LevelAndPrice.css';
const FormItem = Form.Item;

let uuid = 0;
class DynamicLevelAndPriceSet extends React.Component {
  remove = (k) => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  add = () => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify forms to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const keys = values.keys;
        if (keys.length == 0) {
          message.error('请输入票价信息');
        }
        else {
          console.log('Received values of forms: ', values);
          this.props.submitPrices(values);
        }
      }
    });
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {span: 6, offset: 0},
        sm: {span: 5, offset: 4},
      },
    };
    const formItemLayoutForSubmit = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
      },
    };
    getFieldDecorator('keys', {initialValue: []});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k) => {
      return (
        <FormItem
          {...formItemLayoutWithOutLabel}
          required={false}
          key={k}
          className={styles.FormItem}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入票价",
            }],
          })(
            <InputNumber min={0} step={0.01} className={styles.PriceInput} />
          )}
          {keys.length > 1 ? (
            <Icon
              className={styles.DynamicDeleteButton}
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <div>
        <p className={styles.AddPriceLabel}>可选票价：</p>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} className={styles.AddPriceButton}>
              <Icon type="plus"/> 添加票价
            </Button>
          </FormItem>
          <FormItem {...formItemLayoutForSubmit}>
            <Button type="primary" htmlType="submit" className={styles.SubmitBtn}>确认</Button>
            <br />
            <em className={styles.SubmitTip}>[请务必点击确认，以保存票价信息]</em>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const LevelAndPrice = Form.create()(DynamicLevelAndPriceSet);
export default connect()(LevelAndPrice);


/**
 * Created by a297 on 18/3/14.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, DatePicker, Button, Select, Input } from 'antd';
import styles from './ReleaseForm.css';
import UploadPoster from './UploadPoster';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class ReleaseShowForm extends React.Component {

  checkPoster = (rule, value, callback) => {
    console.log('~~~~~~~~~~~~~~~~~~ check poster: ', rule, value);
    if (value !== undefined) {
      if (value[0].size > 1048576) {
        callback('上传海报不得超过1M!');
        return;
      }
    }
    callback();
    return;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
        'show-type': fieldsValue['show-type'],
        'description': fieldsValue['description'],
        'poster': fieldsValue['poster'][0],
      };
      this.props.submitReleaseInfo({
        venueId: this.props.venueId,
        showTime: values['date-time-picker'],
        type: values['show-type'],
        description: values['description'],
        posterUrl: values['poster'].url
      });
      // console.log('Received values of forms: ', values);
      // this.props.dispatch({
      //   type: 'venues/release',
      //   payload: {
      //     venueId: this.props.venueId,
      //     showTime: values['date-time-picker'],
      //     type: values['show-type'],
      //     description: values['description'],
      //     posterUrl: values['poster'].url
      //   }
      // });
    });
  };

  render () {
    // console.log('===============render in release forms ===============: ', this.props.hasValidVenue);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const hasValidVenue = this.props.hasValidVenue;
    var releaseForm = (
      hasValidVenue
      ? (
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="演出时间："
          >
            {getFieldDecorator('date-time-picker', {
              rules: [
                { type: 'object', required: true, message: '请选择演出时间!' }
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='演出类型：'
          >
            {getFieldDecorator('show-type', {
              rules: [
                { type: 'string', required: true, message: '请选择演出类型!' }
              ],
            })(
              <Select style={{ width: 120 }}>
                <Option value="vocalConcert">演唱会</Option>
                <Option value="concert">音乐会</Option>
                <Option value="opera">曲苑杂谈</Option>
                <Option value="drama">话剧歌剧</Option>
                <Option value="dance">舞蹈芭蕾</Option>
                <Option value="children">儿童亲子</Option>
                <Option value="comic">动漫</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="上传海报："
          >
            {getFieldDecorator('poster', {
              rules: [
                { type: 'array', required: true, message: '请上传的海报!'},
                { validator: this.checkPoster }
              ],
            })(
              <UploadPoster />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='演出描述：'
          >
            {getFieldDecorator('description', {
              rules: [
                { type: 'string', required: true, message: '请输入演出描述!' }
              ],
            })(
              <TextArea maxLength="50" rows={5} />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button className={styles.SubmitBtn} type="primary" htmlType="submit">点击添加票价信息</Button>
          </FormItem>
        </Form>)
      : (
      <h3>您还没有通过审核的场馆，请审核通过后再发布。</h3>
    ));
    return (
      <div  className={styles.ReleaseFormDiv}>
        <h1>
          发布计划
        </h1>
        { releaseForm }
      </div>
    );
  }
}
const ReleaseForm = Form.create()(ReleaseShowForm);
function mapStateToProps(state) {
  const id = state.venues.myVenue.id;
  const used  = state.venues.myVenue.used;
  return {
    venueId: id,
    hasValidVenue: (used === 1)
  };

}
export default connect(mapStateToProps)(ReleaseForm);

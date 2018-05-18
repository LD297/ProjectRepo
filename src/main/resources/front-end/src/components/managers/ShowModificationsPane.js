/**
 * Created by a297 on 18/3/30.
 */
import React from 'react';
import { connect } from 'dva';
import { List, Avatar, Tabs, Radio, message } from 'antd';
import avatarSrc from '../../assets/cinema.png';
import styles from './ShowApplicationsPane.css';



const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class ShowModificationsPane extends React.Component {

  state = {
    modifications: [],
  };

  changeRatioBtn = (e) => {
    const operation = e.target.value;
    console.log(' changeRatioBtn: ', operation);
    var strArray = operation.split(";");
    console.log(`ratio checked: ${strArray}`);
    message.loading('正在处理，请稍后...', 2);
    this.props.dispatch({
      type: 'managers/modificationExamination',
      payload: {
        operation: strArray[0],
        venueId: strArray[1]
      }
    });
  };

  callback = (key) => {
    console.log(key);
  };

  componentWillReceiveProps(nextProps) {
    console.log('component will receive: ');
    console.log(nextProps.modifications);
    this.setState({
      modifications: nextProps.modifications
    });
  }

  render () {
    const toExam = [];
    const rejected = [];
    const passed = [];
    const { modifications } = this.state;
    if (modifications !== undefined) {
      if (modifications.length > 0) {
        modifications.forEach((currentValue, index) => {
          if (currentValue.status == 0) {
            toExam.push({
              title: currentValue.venueId,
              name: currentValue.name,
              address: currentValue.address,
              key: index + 1
            });
          }
          else if (currentValue.status == 1) {
            passed.push({
              title: currentValue.venueId,
              name: currentValue.name,
              address: currentValue.address,
              key: index + 1
            });
          }
          else if (currentValue.status == 2) {
            rejected.push({
              title: currentValue.venueId,
              name: currentValue.name,
              address: currentValue.address,
              key: index + 1
            });
          }
        });
      }
    }
    console.log('---------- 所有修改：', toExam, rejected, passed);
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.Tab}>
          <TabPane tab="待审核" key="1">
            <List
              itemLayout="horizontal"
              dataSource={toExam}
              renderItem={
                item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={avatarSrc} />}
                      title={'账号：' + item.title}
                      description={
                        <div>
                          <div>{'地址：' + item.address}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {'名称：' + item.name }
                            <RadioGroup onChange={this.changeRatioBtn} defaultValue={item.title} className={styles.RadioGroup}>
                              <RadioButton value={"out;"+item.title}>
                                拒绝
                              </RadioButton>
                              <RadioButton value={"pass;"+item.title}>
                                批准
                              </RadioButton>
                            </RadioGroup>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              className={styles.ToDoList}
            />
          </TabPane>
          <TabPane tab="已拒绝" key="2">
            <List
              itemLayout="horizontal"
              dataSource={rejected}
              renderItem={
                item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={avatarSrc} />}
                      title={'账号：' + item.title}
                      description={
                        <div>
                          <div>{'地址：' + item.address}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {'名称：' + item.name }
                            <p style={{color: 'red'}}>已拒绝</p>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              className={styles.ToDoList}
            />
          </TabPane>
          <TabPane tab="已通过" key="3">
            <List
              itemLayout="horizontal"
              dataSource={passed}
              renderItem={
                item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={avatarSrc} />}
                      title={'账号：' + item.title}
                      description={
                        <div>
                          <div>{'地址：' + item.address}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {'名称：' + item.name }
                            <p style={{color: 'red'}}>已通过</p>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              className={styles.ToDoList}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('========= map in showModificationsPane: ', state.managers.modifications)
  return { modifications: state.managers.modifications, };
}
export default connect(mapStateToProps)(ShowModificationsPane);

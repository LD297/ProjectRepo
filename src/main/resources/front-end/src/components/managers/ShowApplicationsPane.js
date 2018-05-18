/**
 * Created by a297 on 18/3/12.
 */
import React from 'react';
import { connect } from 'dva';
import { List, Avatar, Tabs, Radio, message } from 'antd';
import avatarSrc from '../../assets/cinema.png';
import styles from './ShowApplicationsPane.css';
import GenSeatsPane from '../venues/application/gen_seats/GenSeatsPane';


const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ShowApplicationsPane extends React.Component {

  state = {
    applications: [],
  };

  changeRatioBtn = (e) => {
    const operation = e.target.value;
    var strArray = operation.split(";");
    console.log(`ratio checked: ${strArray}`);
    message.loading('正在处理，请稍后...', 2);
    this.props.dispatch({
      type: 'managers/applicationExamination',
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
    console.log(nextProps.applications);
    this.setState({
      applications: nextProps.applications
    });
  }

  render () {
    const toExam = [];
    const rejected = [];
    const passed = [];
    const { applications } = this.state;
    if (applications !== undefined) {
      if (applications.length > 0) {
        applications.forEach((currentValue, index) => {
          if (currentValue.used == 0) {
            toExam.push({
              title: currentValue.id,
              address: currentValue.address,
              stageName: currentValue.stageName,
              row: currentValue.row,
              col: currentValue.col,
              key: index + 1
            });
          }
          else if (currentValue.used == 1) {
            passed.push({
              title: currentValue.id,
              address: currentValue.address,
              stageName: currentValue.stageName,
              row: currentValue.row,
              col: currentValue.col,
              key: index + 1
            });
          }
          else if (currentValue == -1) {
            rejected.push({
              title: currentValue.id,
              address: currentValue.address,
              stageName: currentValue.stageName,
              row: currentValue.row,
              col: currentValue.col,
              key: index + 1
            });
          }
        });
      }
    }
    console.log('---------- 所有申请：',toExam, rejected, passed)
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
                            {'名称：' + item.stageName }
                            <RadioGroup onChange={this.changeRatioBtn} defaultValue={item.title} className={styles.RadioGroup}>
                              <RadioButton value={"out;"+item.title}>
                                拒绝
                              </RadioButton>
                              <RadioButton value={"pass;"+item.title}>
                                批准
                              </RadioButton>
                            </RadioGroup>
                            <span className={styles.Clear} />
                          </div>
                          <div className={styles.SeatsInfoDiv}>
                            <h3> --- 舞台 --- </h3>
                            <GenSeatsPane m={item.row} n={item.col}  />
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
                            {'名称：' + item.stageName }
                            <p style={{color: 'red'}}>已拒绝</p>
                          </div>
                          <div className={styles.SeatsInfoDiv}>
                            <h3> --- 舞台 --- </h3>
                            <GenSeatsPane m={item.row} n={item.col}  />
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
                            {'名称：' + item.stageName }
                            <p style={{color: 'red'}}>已通过</p>
                          </div>
                          <div className={styles.SeatsInfoDiv}>
                            <h3> --- 舞台 --- </h3>
                            <GenSeatsPane m={item.row} n={item.col}  />
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
  console.log('========== map in ShowApplicationsPane: ');
  return {
    applications: state.managers.applications,
  };
}
export default connect(mapStateToProps)(ShowApplicationsPane);

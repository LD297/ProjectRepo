/**
 * Created by a297 on 18/3/12.
 */
import React from 'react';
import { connect } from 'dva';
import { Menu, message } from 'antd';
import * as security from '../../utils/security';

const SubMenu = Menu.SubMenu;

function ManagerNav ({selectedKey}) {
  const handleClick = (e) => {
    console.log('click', e.key);
    if (e.key === "logout") {
      security.logout("managerToken");
      message.success("成功退出。");
      setTimeout(() => {
        window.location.href = "/#/managerlogin";
      }, 1000);
    }
    else {
      const path = '/#/' + e.key;
      window.location.href = path;
    }
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[selectedKey]}
      mode="horizontal"
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <SubMenu title="审批场馆">
        <Menu.Item key="applicationexam">场地注册</Menu.Item>
        <Menu.Item key="modificationexam">信息修改</Menu.Item>
      </SubMenu>
      <Menu.Item key="balance">支付结算</Menu.Item>
      <Menu.Item key="managerstatistics">统计信息</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );
}
export default connect()(ManagerNav);

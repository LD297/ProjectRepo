/**
 * Created by a297 on 18/3/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Menu, message } from 'antd';
import * as security from '../../utils/security';

const SubMenu = Menu.SubMenu;

function VenueNav ({ selectedKey }) {
  const handleClick = (e) => {
    console.log('click ', e);
    if (e.key === "logout") {
      security.logout("venueToken");
      message.success("成功退出。");
      setTimeout(() => {
        window.location.href = "/#/venuelogin";
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
      <SubMenu title="我的场馆">
        <Menu.Item key="myvenue">查看场馆</Menu.Item>
        <Menu.Item key="venueinfo">场馆信息</Menu.Item>
        <Menu.Item key="updatevenueinfo">修改信息</Menu.Item>
      </SubMenu>
      <SubMenu title="我的演出">
        <Menu.Item key="myshows">查看演出</Menu.Item>
        <Menu.Item key="release">发布计划</Menu.Item>
      </SubMenu>
      <SubMenu title="我的票务">
        <Menu.Item key="mylivetickets">现场购票</Menu.Item>
      </SubMenu>
      <Menu.Item key="venuestatistics">
        统计信息
      </Menu.Item>
      <Menu.Item key="logout">
        退出登录
      </Menu.Item>
    </Menu>
    );
}
export default connect()(VenueNav);

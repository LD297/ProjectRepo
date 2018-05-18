/**
 * Created by a297 on 18/2/10.
 */
import React from 'react';
import {connect} from 'dva';
import {Menu, Icon, message} from 'antd';
import styles from './Navigation.css';
import * as security from '../../utils/security';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Navigation({selectedKey}) {
  const handleClick = (e) => {
    console.log('click ', e);
    if (e.key === "logout") {
      security.logout("userToken");
      message.success("成功退出。");
      setTimeout(() => {
        window.location.href = "/#/login";
      }, 1000);
    }
    else {
      var path = '/#/' + e.key;
      console.log('>>>>>>>>>> go to: ', path);
      window.location.href = path;
    }
  };

  const signature = security.checkLog("userToken");

  if (signature === undefined || signature === "undefined") {
    return (
      <Menu
        onClick={handleClick}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        className={styles.Menu}
      >
        <SubMenu title={<span><Icon type="bars"/>站内导航</span>} className={styles.MenuItem}>
          <MenuItemGroup title="全部">
            <Menu.Item key="homepage">首页</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="演出分类">
            <Menu.Item key="classification/vocalConcert">演唱会</Menu.Item>
            <Menu.Item key="classification/concert">音乐会</Menu.Item>
            <Menu.Item key="classification/opera">曲苑杂谈</Menu.Item>
            <Menu.Item key="classification/drama">话剧歌剧</Menu.Item>
            <Menu.Item key="classification/dance">舞蹈芭蕾</Menu.Item>
            <Menu.Item key="classification/children">儿童亲子</Menu.Item>
            <Menu.Item key="classification/comic">动漫</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="login" className={styles.MenuItem}>
        <Icon type="login"/>用户登录
      </Menu.Item>
        <Menu.Item key="venuelogin" className={styles.MenuItem}>
          <Icon type="login"/>场馆登录
        </Menu.Item>
        <Menu.Item key="venueapplication" className={styles.MenuItem}>
          <Icon type="user" />场馆注册
        </Menu.Item>
      </Menu>
    );
  }
  else {
    return (
      <Menu
        onClick={handleClick}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        className={styles.Menu}
      >
        <SubMenu title={<span><Icon type="bars"/>站内导航</span>} className={styles.MenuItem}>
          <MenuItemGroup title="全部">
            <Menu.Item key="homepage">首页</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="演出分类">
            <Menu.Item key="classification/vocalConcert">演唱会</Menu.Item>
            <Menu.Item key="classification/concert">音乐会</Menu.Item>
            <Menu.Item key="classification/opera">曲苑杂谈</Menu.Item>
            <Menu.Item key="classification/drama">话剧歌剧</Menu.Item>
            <Menu.Item key="classification/dance">舞蹈芭蕾</Menu.Item>
            <Menu.Item key="classification/children">儿童亲子</Menu.Item>
            <Menu.Item key="classification/comic">动漫</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu title={<span><Icon type="user"/>个人中心</span>} className={styles.MenuItem}>
          <Menu.Item key="myinfo">我的信息</Menu.Item>
          <Menu.Item key="myorders">我的订单</Menu.Item>
          <Menu.Item key="mystatistics">我的统计</Menu.Item>
        </SubMenu>
        <Menu.Item key="logout" className={styles.MenuItem}>
          <Icon type="logout"/>退出登录
        </Menu.Item>
      </Menu>
    );
  }

}
export default connect()(Navigation);

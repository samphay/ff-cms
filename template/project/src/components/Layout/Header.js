import React from 'react';
import './layout.less';
import {Menu, Icon} from 'antd';
import PasswordModal from './PasswordModal'
import {TITLE} from "../../utils/config";

const SubMenu = Menu.SubMenu;

function Header({user, groups, logout, selectGroup, password}) {

  const menuItems = [];
  for (let i = 0; i < groups.length; i++) {
    menuItems.push(
      <Menu.Item key={groups[i].id}>
        <a onClick={selectGroup.bind(null, groups[i].id)}>
          {groups[i].name}
        </a>
      </Menu.Item>);
  }
  /*menuItems.push(
    <Menu.Item key={'/all'}>
      <a onClick={selectGroup.bind(null, null)}>
        {'全部'}
      </a>
    </Menu.Item>);*/
  menuItems.push(
    <SubMenu key="/login" title={
      <span>
        <Icon type="user"/>
        {user.name}
      </span>
    }>
      <Menu.Item key="/logout">
        <a onClick={logout}>
          注销
        </a>
      </Menu.Item>
      <Menu.Item key="/password">
        <a onClick={password}>
          修改密码
        </a>
      </Menu.Item>
    </SubMenu>
  );

  return (
    <div
      className="layout-header-main"
    >
      <div className="layout-header-logoWrap" >
        <div className="layout-header-logo"/>
        <div className="layout-header-title">
          {TITLE}
        </div>
        <Icon type={"edit"}/>
      </div>
      <Menu
        selectedKeys={[]}
        mode="horizontal"
        className="layout-header-nav"
      >
        {menuItems}
      </Menu>
      <PasswordModal/>
    </div>
  );
}

export default Header;

import {connect} from 'dva';
import React from 'react';
import './layout.less';
import {Menu, Icon, Layout} from 'antd';
const {Sider} = Layout;
import {Link} from 'dva/router';

const SubMenu = Menu.SubMenu;

function LeftMenu({dispatch, current, openKeys: keys, userMenus}) {
  const menuItems = [];
  userMenus.map((menus, i) => {
    if (menus.pageUrlStatus && (menus.pageUrlStatus == 1 || menus.pageUrlStatus == 3)) { // 当只有当状态为1,3时才在新系统显示
      let submenuItems = [];
      if (menus.children) {
        menus.children.map((item, j) => {
          if (item.pageUrlStatus && (item.pageUrlStatus == 1 || item.pageUrlStatus == 3)) {
            submenuItems.push(
              <Menu.Item key={item.id}>
                <Link to={(item.pageUrl + '/' + item.id || '/menus')}>
                  <Icon type={(item.pageIcon || 'right')}/>
                  {item.name}
                </Link>
              </Menu.Item>);
          }
        })
      }
      menuItems.push(
        <SubMenu
          key={menus.id}
          title={
            <span>
              <Icon type={(menus.pageIcon || 'bars')}/>
              <span>
                {menus.name}
              </span>
            </span>
          }
        >
          {submenuItems}
        </SubMenu>);
    }
  });

  const getAncestorKeys = (key) => {
    const map = {
      '/menus': ['/system'],
    };
    return map[key] || [];
  };

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(keys.indexOf(key) > -1));
    const latestCloseKey = keys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch({
      type: 'app/openMenu',
      payload: {openKeys: nextOpenKeys},
    });
  };

  const handleClick = (e) => {
    dispatch({
      type: 'app/clickItem',
      payload: {current: e.key},
    });
  };

  return (
    <div className="layout-leftMenu-normal">
      <Menu
        openKeys={keys}
        selectedKeys={[current]}
        onOpenChange={onOpenChange}
        inlineCollapsed={false}
        onClick={handleClick}
        mode="inline"
        className="layout-leftMenu-main"
      >
        {menuItems}
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  const {current, openKeys, userMenus} = state.app;
  return {
    current,
    openKeys,
    userMenus,
  };
}

export default connect(mapStateToProps)(LeftMenu);

import React from 'react';
import './layout.less';
import FFHeader from './Header';
import LeftMenu from './LeftMenu';
import FFooter from './Footer';
import {Layout} from "antd";

function App(
  { children, location, user, groups, logout, selectGroup, password }) {
  return (
    <Layout>
      <FFHeader
        location={location} user={user} groups={groups}
        logout={logout} selectGroup={selectGroup} password={password}
      />
      <LeftMenu location={location} />
      <div className="layout-app-content">
        <div className="layout-app-main">
          {children}
        </div>
      </div>
      <FFooter location={location} />
    </Layout>
  );
}

export default App;

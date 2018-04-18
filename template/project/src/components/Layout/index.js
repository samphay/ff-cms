import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import AppComponent from './App';

function App({ children, location, dispatch, app }) {
  const { user, groups } = app;

  const logout = () => {
    dispatch({ type: 'app/logout', payload: {} });
  };

  const selectGroup = (id) => {
    dispatch({ type: 'app/userMenus', payload: id ? { menuGroupId: id } : {} });
  };

  const password = () => {
    dispatch({ type: 'passwordModal/showModal', payload: { data: { visible: true } } });
  };

  return (
    <LocaleProvider locale={zh_CN}>
      <AppComponent
        location={location}
        user={user}
        groups={groups}
        logout={logout}
        selectGroup={selectGroup}
        password={password}
      >
        {children}
      </AppComponent>
    </LocaleProvider>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};
function propsMap({ app }) {
  return { app };
}
export default connect(propsMap)(App);

import React from 'react';
import { connect } from 'dva';
import './Login.less';
import LoginComponent from './Login';

function Login({ dispatch, loading, visibility }) {
  const loginProps = {
    loading,
    visibility,
    onOk(data) {
      dispatch({ type: 'login/login', payload: data });
    },
  };

  return (
    <div>
      <div className="spin">
        <LoginComponent {...loginProps} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { visibility } = state.login;
  return {
    loading: state.loading.models.login,
    visibility,
  };
}

export default connect(mapStateToProps)(Login);

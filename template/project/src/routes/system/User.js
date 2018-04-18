import React from 'react';
import { connect } from 'dva';
import UserComponent from '../../components/system/user/User';

function User() {
  return (
      <UserComponent />
  );
}
/*
function mapStateToProps() {
  return {};
}
*/
export default connect(/*mapStateToProps*/)(User);

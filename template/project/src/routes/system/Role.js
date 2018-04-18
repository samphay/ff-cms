import React from 'react';
import { connect } from 'dva';
import RoleComponent from '../../components/system/role/Role';

function Role({ location }) {
  return (
      <RoleComponent />
  );
}
/*
function mapStateToProps() {
  return {};
}
*/
export default connect(/*mapStateToProps*/)(Role);

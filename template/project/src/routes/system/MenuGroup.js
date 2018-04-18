import React from 'react';
import { connect } from 'dva';
import MenuGroupComponent from '../../components/system/menuGroup/MenuGroup';

function MenuGroup({ location }) {
  return (
      <MenuGroupComponent />
  );
}
/*
function mapStateToProps() {
  return {};
}
*/
export default connect(/*mapStateToProps*/)(MenuGroup);

import React from 'react';
import { connect } from 'dva';
import MenusComponent from '../../components/system/menus/Menus';

function Menus({ location }) {
  return (
      <MenusComponent />
  );
}
export default connect(/*mapStateToProps*/)(Menus);

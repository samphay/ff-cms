import React from 'react';
import './layout.less';
import {FOOTER} from "../../utils/config";

function Footer({ location }) {
  return (
    <div
      className="layout-footer-main"
    >
      <p>{FOOTER}</p>
    </div>
  );
}

export default Footer;

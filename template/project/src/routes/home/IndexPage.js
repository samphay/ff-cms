import React from 'react';
import './IndexPage.less';
import { TITLE} from "../../utils/config";
export default function IndexPage() {
  return (
    <div className="index-normal">
      <h1 className="index-title">欢迎进入<br />{TITLE}</h1>
    </div>
  );
}


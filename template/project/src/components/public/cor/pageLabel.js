import React from 'react'
import { Menu, Icon, Dropdown, Button, Badge } from 'antd'
import './cms.less'
/**
 * props示例：
 * {
    current: {text: '顾客类型',import PageLabel from './pageLabel' database:'ykee_customer', tableName: 'customer_level'},
    labelList: [
      {text: '顾客类型', database:'ykee_customer', tableName: 'customer_level'},
      ...
    ],
    onClick: ({key, item}) => {

    }
  }
 *
 */
//表格左上角label,如果只有一个的时候可以不设置该组件的labelList属性
const PageLabel = (props) => {
  const {current, labelList, onClick, editBtnHandle, isCorTable, refreshHandle, num} = props;
  if (labelList && labelList.length > 0) {
    const menu = (
      <Menu onClick={onClick}>
        {labelList.map(function (item, key) {
          return <Menu.Item key={key}>{item.text}</Menu.Item>
        })}
      </Menu>
    );
    return <div className={isCorTable ? "page_label_box borderAll" : "page_label_box"}>
      <Dropdown overlay={menu}>
        <a id="labelText" className="ant-dropdown-link" href="javascript:void(0);">
          {current.text} <Icon type="down"/>
        </a>
      </Dropdown>
    </div>
  } else {
    return <div className={isCorTable ? "page_label_box borderAll" : "page_label_box"}>
      <a className="ant-dropdown-link" href="javascript:void(0);">
        {current.text||current}
        {num ? <span>&nbsp;&nbsp;&nbsp;</span> : ''}
        {num ? <Badge count={num} /> : ''}
      </a>
      { (editBtnHandle&& typeof editBtnHandle === 'function') ? <Icon type="edit" style={{fontSize:'16px', verticalAlign:'-2px'}} onClick={editBtnHandle}/>: ''}
      { (refreshHandle && typeof refreshHandle === 'function') ? <Button icon="reload" style={{float:'right', margin: '8px 10px 0px 0px'}} onClick={refreshHandle}/>: ''}
    </div>
  }
};

export default PageLabel

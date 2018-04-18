import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form,Button,Icon} from 'antd';
import MenuGroupRemoveModal from './MenuGroupRemoveModal';
import MenuGroupAddModal from './MenuGroupAddModal';

const FormItem = Form.Item;

function MenuGroupSetModal({dispatch,form,data}) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  function addMenuHandler() {
    dispatch({
      type: 'addMenuFormModal/fetchAddMenus',
      payload: {visible:true},
    });
  }

  function removeMenuHandler() {
    dispatch({
      type: 'removeMenuFormModal/fetchRemoveMenus',
      payload: {groupId:data.groupId,visible:true},
    });
  }
  function hideModelHandler(){
    dispatch({
      type: 'setMenuFormModal/toggleModal',
      payload: {
        data:{
          visible:false
        }
      },
    });
  }

  function onFieldChange() {}

  //详细的菜单信息
  function menusForGroupHtml(data){
    let html;
    if (data.menusData == null || data.menusData.length == 0) {
      html = "菜单组：《" + data.menusGroupName + "》下无挂载菜单！";
    } else {
      html = "菜单组：《" + data.menusGroupName + "》下挂载菜单有:<br />";

      for (var i = 0; i < data.menusData.length; i++) {
        html += data.menusData[i].name + "<br />";
      }
    }

    let rawHTML = {
      __html: html
    };
    return rawHTML;

  }


  return (
    <span>
        <Modal
          title="菜单信息"
          visible={data.visible}
          onCancel={hideModelHandler}
          footer={[
          <Button key="remove" type="primary" onClick={removeMenuHandler.bind(null)}>移除菜单</Button>,
          <Button key="add" type="primary" onClick={addMenuHandler.bind(null)}>添加菜单</Button>
          ]}
        >
          <div dangerouslySetInnerHTML={menusForGroupHtml(data)}></div>
        </Modal>
      <MenuGroupAddModal></MenuGroupAddModal>
      <MenuGroupRemoveModal></MenuGroupRemoveModal>
      </span>
  );
}


function mapStateToProps(state) {
  const data = state.setMenuFormModal;
  return {
    data
  };
}


export default connect(mapStateToProps)(Form.create()(MenuGroupSetModal));

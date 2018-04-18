import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form,Input, Icon, Select, Row,Col} from 'antd';
const FormItem = Form.Item;
import {openNotice} from '../../../utils'
const Option = Select.Option;
import AllMenusModal from './allMenusModal';

function AddEditModal({dispatch,form,addEditFormModal}) {
    const {visible,paramsData,confirmLoading} = addEditFormModal;

    function saveMenuHander() {
      var flag = false,msg='';

      if(!paramsData.name){
        flag = true; msg = '名称不能为空!'
      }else if(!paramsData.pageUrlStatus){
        flag = true; msg = '位置不能为空!'
      }
      if(flag){
        openNotice('warning', '提示', msg);
        return ;
      }
      dispatch({
        type: 'addEditFormModal/saveMenu',
        payload: {
          data:paramsData
        },
      });
    }
    function initAllMenuData() {
      dispatch({
        type: 'allMenusTable/initAllMenuData',
        payload: { visible:true },
      });
    }
    function hideModelHandler() {
      dispatch({
        type: 'addEditFormModal/toggleModal',
        payload: {
            visible:false
        },
      });
    }
     const onchange=(type,value) => {
        paramsData.name = document.getElementsByClassName("name")[0].value;
        paramsData.scripturl = document.getElementsByClassName("scripturl")[0].value;
        paramsData.pageUrl = document.getElementsByClassName("pageUrl")[0].value;
        paramsData.pageIcon = document.getElementsByClassName("pageIcon")[0].value;
        paramsData.orderOn = document.getElementsByClassName("orderOn")[0].value;
        paramsData.description = document.getElementsByClassName("description")[0].value;
        if(type == 'select'){
          paramsData.pageUrlStatus = value
        }
        dispatch({
          type: `addEditFormModal/onchangeFiled`
        });
    };
    return (
        <span>
          <Modal title="新增菜单" visible={visible} onOk={saveMenuHander} confirmLoading={confirmLoading} onCancel={hideModelHandler}>
            <div className="Menus">
                  <Form>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>名称 : </label>
                          <Input className='name' onChange={onchange}  value={paramsData.name}/>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>绑定接口 : </label>
                          <Input className='scripturl' onChange={onchange}  value={paramsData.scripturl}/>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>路由地址 : </label>
                          <Input className='pageUrl' onChange={onchange}  value={paramsData.pageUrl}/>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>图标 : </label>
                          <Input className='pageIcon' onChange={onchange}  value={paramsData.pageIcon}/>
                        </Col>
                      </Row>
                       <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>顺序 : </label>
                          <Input className='orderOn' onChange={onchange}  value={paramsData.orderOn}/>
                        </Col>
                      </Row>
                       <Row gutter={16} style={{ marginTop: "16px"}}>
                        <Col className="gutter-row" span={20} >
                          <label>位置 : </label>
                          <Select  style={{ width: 298 }} multiple={false} value={paramsData.pageUrlStatus ? ''+paramsData.pageUrlStatus:null} onSelect={onchange.bind(this,'select')} >
                                <Option value="1">兼容新老框架</Option>
                                <Option value="2">老框架</Option>
                                <Option value="3" >新框架</Option>
                          </Select>
                        </Col>
                      </Row>
                        <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>描述 : </label>
                          <Input className='description' type='textarea' onChange={onchange}  value={paramsData.description}/>
                        </Col>
                      </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={20}  style={{ marginTop:"20px",verticalAlign: "sub"}}>
                            <label>上级菜单 : </label>
                            <Input  style={{ width: 296 }} className='parentName' data-parentId={paramsData.parentId} value={paramsData.parentName}  addonAfter={<Icon type="plus-circle" onClick={initAllMenuData} />} />
                          </Col>
                        </Row>
                    </Form>
                </div>
          </Modal>
          <AllMenusModal></AllMenusModal>
        </span>
    );
}
function mapStateToProps({addEditFormModal}) {
  return {addEditFormModal};
}

export default connect(mapStateToProps)(Form.create()(AddEditModal));

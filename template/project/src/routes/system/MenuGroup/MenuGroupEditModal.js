/**
 * Created by wangcuijiao on 2017/3/9.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form,Input,InputNumber,Select, Icon,Row,Col} from 'antd';
const FormItem = Form.Item;
import {openNotice} from '../../../utils'
const Option = Select.Option;

function MenuGroupEditModal({dispatch,form,editMenuFormModal}) {
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const {visible,paramsData} = editMenuFormModal;
  // const formItemLayout = {
  //   labelCol: { span: 6 },
  //   wrapperCol: { span: 14 },
  // };

  function saveMenuGroupHandler() {
    var flag = false,msg='';

    if(!paramsData.name){
      flag = true; msg = '名称不能为空!'
    }
    if(flag){
      openNotice('warning', '提示', msg);
      return ;
    }
    dispatch({
      type: 'editMenuFormModal/saveMenuGroup',
      payload: {menuGroup:paramsData},
    });
    // form.validateFields((err, values) => {
    //   if (!err) {
    //     var menuGroup={};
    //     menuGroup.name=values.name;
    //     menuGroup.description=values.description;
    //
    //     if(data.isEdit){
    //       menuGroup.id=data.id;
    //       menuGroup.createTime=data.createTime;
    //     }
    //
    //
    //   }
    // });
  }

  function hideModelHandler() {
    dispatch({
      type: 'editMenuFormModal/showModal',
      payload: {visible:false}
    });
  }

  const onchange=(type,value) => {
    paramsData.name = document.getElementsByClassName("name")[0].value;
    paramsData.description = document.getElementsByClassName("description")[0].value;
    dispatch({
      type: `editMenuFormModal/onchangeFiled`
    });
  };

  return (
    <span>
        <Modal
          title="编辑菜单组"
          visible={visible}
          onOk={saveMenuGroupHandler}
          onCancel={hideModelHandler}
        >
          {/*<Form layout="horizontal">*/}
             <div className="MenuGroup">
                  <Form>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>名称 : </label>
                          <Input className='name' onChange={onchange}  value={paramsData.name}/>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                          <label>描述 : </label>
                          <Input type="textarea" className='description' onChange={onchange}  value={paramsData.description}/>
                        </Col>
                      </Row>
                    </Form>
                </div>
            {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="名称"*/}
              {/*hasFeedback*/}
            {/*>*/}
              {/*{*/}
                {/*form.getFieldDecorator('name', {*/}
                  {/*initialValue: data.name,*/}
                  {/*rules: [{ required: true, message: '请输入名称!' }],*/}
                {/*})(<Input />)*/}
              {/*}*/}
            {/*</FormItem>*/}
            {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="描述"*/}
              {/*hasFeedback*/}
            {/*>*/}
              {/*{*/}
                {/*form.getFieldDecorator('description', {*/}
                  {/*initialValue: data.description*/}
                {/*})(<Input type="textarea" rows={4}/>)*/}
              {/*}*/}
            {/*</FormItem>*/}
          {/*</Form>*/}
        </Modal>
      </span>
  );
}


function mapStateToProps({editMenuFormModal}) {
  return {editMenuFormModal};
}


export default connect(mapStateToProps)(Form.create()(MenuGroupEditModal));

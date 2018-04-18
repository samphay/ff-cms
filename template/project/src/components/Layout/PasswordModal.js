import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input} from 'antd';
const FormItem = Form.Item;

function PasswordModal({dispatch,form,data}) {
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  
  function savePasswordHandler() {

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'passwordModal/password',
          payload: {
            data:values
          },
        });
      }
    });
  }

  function hideModelHandler() {
    dispatch({
      type: 'passwordModal/hideModal',
      payload: {
        data:{visible:false}
      },
    });
  }
  
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('newpwd')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  return (
    <span>
      <Modal
        title="修改密码"
        visible={data.visible}
        onOk={savePasswordHandler}
        onCancel={hideModelHandler}
      >
        <Form
          horizontal
        >
          <FormItem
            {...formItemLayout}
            label="旧密码"
            hasFeedback
          >
            {
              form.getFieldDecorator('oldpwd', {
                initialValue: data.oldpwd,
                rules: [{ required: true, message: '请输入旧密码!' }],
              })(<Input type="password" />)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
            hasFeedback
          >
            {
              getFieldDecorator('newpwd', {
                initialValue: data.newpwd,
                rules: [{ required: true, message: '请输入新密码!' }],
              })(<Input type="password" />)
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="确认新密码"
          >
            {
              getFieldDecorator('newpwd1', {
                initialValue: data.newpwd1,
                rules: [{ required: true, message: '请确认新密码!' },{ validator: checkPassword }],
              })(<Input type="password" />)
            }
          </FormItem>
        </Form>
        <div style={{color:'#f00',textAlign:'center',visibility:data.failNote}}>*密码修改失败</div>
      </Modal>
    </span>
  );
}

function mapStateToProps(state) {
  const data = state.passwordModal;
  return {
    data
  };
}

export default connect(mapStateToProps)(Form.create()(PasswordModal));

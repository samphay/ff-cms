import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  checkPassword = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="修改密码"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="新密码"
            >
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }]
                })(<Input type="password" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
            >
              {
                getFieldDecorator('password_re', {
                  rules: [{ required: true, message: '请输入密码!' },{ validator: this.checkPassword }]
                })(<Input type="password" />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserCreateModal);

import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class RoleEditModal extends Component {
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
        if(this.updateTime){
          values.updateTime = this.updateTime;
        }
        if(this.createTime){
          values.createTime = this.createTime;
        }

        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, description,createTime, updateTime } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    this.updateTime = updateTime;
    this.createTime = createTime;

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="新增角色"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
            <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="描述"
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input  type="textarea"/>)
              }
            </FormItem>


          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RoleEditModal);

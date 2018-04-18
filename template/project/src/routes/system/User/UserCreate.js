import { connect } from 'dva';
import { Form, Input, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

function UserCreate({ dispatch,list, form, hideModelHandler, realname, username, password, password_re, email, role, description, createTime }) {

  const { getFieldDecorator, validateFields, getFieldValue } = form;

  const okHandler = () => {

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/create',
          payload: values,
        });
        hideModelHandler();
      }
    });
  };

  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const plainOptions = list.map(function (item) {
    return {label:item.name, value:item.id}
  })

  return (
    <div className='normal'>
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {
            getFieldDecorator('realname', {
              initialValue: realname,
              rules: [{ required: true, message: '请输入用户名!' }]
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="登录名"
        >
          {
            getFieldDecorator('username', {
              initialValue: username,
              rules: [{ required: true, message: '请输入登录名!' }]
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {
            getFieldDecorator('password', {
              initialValue: password,
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
              initialValue: password_re,
              rules: [{ required: true, message: '请输入密码!' },{ validator: checkPassword }]
            })(<Input type="password" />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {
            getFieldDecorator('email', {
              initialValue: email,
              rules: [{
                type: 'email', message: '输入邮箱无效!',
              }]
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="角色"
        >
          {
            getFieldDecorator('role', {
              initialValue: role,
              rules: [{ required: true, message: '请选择用户角色!' }]
            })(<CheckboxGroup options={plainOptions} />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          {
            getFieldDecorator('description', {
              initialValue: description,
            })(<Input type="textarea" />)
          }
        </FormItem>
      </Form>
      <div className='mfooter'>
        <Button type="" size="large" onClick={hideModelHandler}>取消</Button>
        <Button type="primary" size="large" onClick={okHandler}>确定</Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, realname, username, password, password_re, email, role, description, createTime } = state.userCreate;
  return {
    loading: state.loading.models.userCreate,
    list,
    realname,
    username,
    password,
    password_re,
    email,
    role,
    description,
    createTime,
  };
}

export default connect(mapStateToProps)(Form.create()(UserCreate));

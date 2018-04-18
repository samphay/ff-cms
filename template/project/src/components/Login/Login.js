import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Input, Alert } from 'antd';
import config from '../../utils/config';
import style from './Login.less';

const FormItem = Form.Item;

const Login = ({ loading, onOk, visibility, form: { getFieldDecorator, validateFieldsAndScroll } }) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      onOk(values);
    });
  }

  return (
    <div>
      <div className={style.loginForm}>
        <div className={style.loginLogo}>
          <span>CMS</span>
        </div>
        <Form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名',
                },
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码',
                },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={loading}>
              登录
            </Button>
          </Row>
        </Form>
      </div>
      <Alert
        message="错误提示"
        description="登录失败，请确认输入信息正确并该用户没有被冻结"
        type="error"
        showIcon
        style={{ float: 'right', width: 500, margin: 30, background: 'rgba(0,0,0,0.2)', visibility }}
      />
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func,
};

export default Form.create()(Login);

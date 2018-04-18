import React, {Component} from 'react';
import {Col, Form, Row} from 'antd';
import classNames from "classnames";
import _extends from "babel-runtime/helpers/extends";
import PropTypes from "prop-types";
import style from './style.less'
const FormItem = Form.Item;
export default function FFormItem(props) {
  const {formConfig, className, getFieldDecorator, getFieldValue,getFieldProps, getFieldsValue, formData} = props;
  return (
    <Row className={classNames([className])}>
      {
        formConfig.map((item, i) => {
          let {show = () => true,formItemProps={},label,component,componentComputedProps} = item;
          const fieldsValue = getFieldsValue()||{};
          show = show.bind(item, fieldsValue);
          if (!show()) {
            return false
          }
          formItemProps = Object.assign({
            labelCol: {
              span: 4
            },
            wrapperCol: {
              span: label?20:24
            }
          },formItemProps);
          function getComputedComponent(fieldElem) {
            const newProps = _extends({}, fieldElem.props,componentComputedProps?componentComputedProps(fieldsValue):{});
            return React.cloneElement(fieldElem, newProps);

          }
          return (
            <Col
              key={i}
              span={item.span || 24}
              children={
                <FormItem
                  label={label}
                  {...formItemProps}
                >
                  {
                    getFieldDecorator(item.id, {
                      initialValue: item.value || formData[item.id],
                      ...item.option
                    })(getComputedComponent(component))
                  }
                </FormItem>
              }
            />
          )
        })
      }
    </Row>
  )
}
FFormItem.propTypes = {
  formConfig: PropTypes.array.isRequired,
}

/**
 * CopyRight Samphay.
 * 2018/4/8
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {Icon, Form} from "antd";
const FormItem = Form.Item;
@Form.create()
export default class FFEditableText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    }
    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.confirmEdit = this.confirmEdit.bind(this)
  }

  static propTypes = {
    onChange:PropTypes.func,
    editComponent:PropTypes.object,
    value:PropTypes.any,
  };

  state = {
    value: "",
    editable: false
  };

  componentWillMount() {

  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }
  openEdit(){
    this.setState({
      editable:true
    })
  }
  closeEdit(){
    this.setState({
      editable:false
    })
  }
  confirmEdit(){
    const {form,onChange} = this.props;
    const {
      validateFields,
      getFieldsValue,
    } = form;
    const {value} = {...getFieldsValue()};
    this.setState({
      value
    })
    onChange&&onChange(value);
    this.closeEdit()
  }
  render() {
    const {state,openEdit,closeEdit,confirmEdit,props} = this;
    const {value, editable, editComponent} = state;
    const {valueFormat=function (value) {
      return value
    }} = props;
    const {
      validateFields,
      getFieldsValue,
      getFieldDecorator
    } = props.form;
    if (!editable) {
      // console.log(value)
      return (
        <span>
          {valueFormat(value)}
          <Icon
            type={"edit"}
            style={{cursor: "pointer"}}
            onClick={openEdit}
          />
        </span>
      )
    }
    return (
      <div>
        <FormItem>
          {
            getFieldDecorator("value", {
              initialValue: value,
            })(editComponent)
          }
        </FormItem>
        <Icon
          type={"close"}
          style={{cursor: "pointer"}}
          onClick={closeEdit}
        />
        <Icon
          type={"check"}
          style={{cursor: "pointer"}}
          onClick={confirmEdit}
        />
      </div>
    )
  }
}

// export default Form.create()(FFEditableText)

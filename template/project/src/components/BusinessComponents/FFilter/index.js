/**
 * CopyRight Samphay.
 * 2018/1/10
 */
import React, {Component} from 'react';
import style from './index.less';
import PropTypes from "prop-types";
import {Button, Col, Form, Input, Row} from "antd";

const FormItem = Form.Item;
const FFilterStore = {
  form:{}
};
class FFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    };
    FFilterStore.form = props.form;
    this.getData = this.getData.bind(this);
    this.clickButton = this.clickButton.bind(this);
    this.saveValue = this.saveValue.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func,
    submitText: PropTypes.string,
    span: PropTypes.number,
    formItems: PropTypes.array,
    onSubmit: PropTypes.func,
    showSubmit: PropTypes.bool,
  };

  state = {
    value: {},
    span:3,
    showSubmit:false
  };

  componentWillMount() {

  }

  saveValue() {
    this.getData(data=>{
      this.setState({
        value: {...data}
      });
    });
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prop, state) {
  }

  componentWillUnmount() {

  }

  getData(fn) {
    const {
      validateFields,
      getFieldsValue,
    } = this.state.form;
    validateFields((e) => {
      if (e) {
        return console.log(e)
      }
      fn && fn.call(this, {...getFieldsValue()});
    })
  }

  clickButton() {
    const {onSubmit} = this.state;
    this.getData(data => {
      onSubmit && onSubmit(data)
    });
  }

  render() {
    const {state, clickButton} = this;
    const {form, formItems, showSubmit, submitText,span} = state;
    const {
      getFieldDecorator
    } = form;
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
    };
    return (
      <Form>
        <Row type={"flex"}>
          {
            formItems.map((item, i) => {
              return <Col
                key={i}
                span={24/span}
                children={
                  <FormItem
                    label={item.label||" "}
                    {...formItemLayout}
                    {...item.formItemProps}
                    colon={item.label?item.label.trim() != "":false}
                  >
                    {
                      getFieldDecorator(item.id, {
                        initialValue: item.value,
                        ...item.option
                      })(item.component)
                    }
                  </FormItem>
                }
              />
            })
          }
        </Row>
        {
          showSubmit ?
            <Row>
              <Col
                children={
                  <div className={style.subBtnWrap}>
                    <Button
                      type={"primary"}
                      onClick={clickButton}
                    >
                      {submitText || "信息过滤"}
                    </Button>
                  </div>
                }
              />
            </Row>
            : ""
        }
      </Form>

    )
  }
}

export default Form.create({
  onValuesChange({onChange},changed,all){
    const {form} = FFilterStore;
    const {
      validateFields,
      getFieldsValue,
    } = form;
    if(onChange){
      onChange.call(this, {...getFieldsValue(),...changed});
    }
  }
})(FFilter)


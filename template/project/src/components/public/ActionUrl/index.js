/**
 * CopyRight Samphay.
 * 2017/11/13
 */
"use strict";
import React, {Component} from 'react';
import {
  Col, Form, Input, Modal, Row, Select, Checkbox, Radio, Button, DatePicker, Popconfirm, Table, Card,
  Icon
} from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
import PropTypes from 'prop-types';
export class ActionUrl extends Component {
  constructor(props){
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.keyValueElOnChange = this.keyValueElOnChange.bind(this);
    this.addKeyValue = this.addKeyValue.bind(this);
    this.deleteKeyValue = this.deleteKeyValue.bind(this);
  }
  static propTypes = {
    actionUrl: PropTypes.string,
    onChange: PropTypes.func
  };
  state = {
    actionUrl:"",
    action:"",
    package_name:"",
    activity_name:"",
    extra_map:[],
    bundle_map:[],
    uri:""
  };
  componentWillReceiveProps(nextProps){
    const {value} = nextProps;
    if(!value){
      this.setState(
        {
          actionUrl:"",
          action:"",
          package_name:"",
          activity_name:"",
          extra_map:[],
          bundle_map:[],
          uri:""
        }
      )
    }else{
      const state = JSON.parse(value);
      this.setState({
        ...state
      });
    }
  }
  componentDidMount(){
    const {value} = this.props;
    if(value){
      const state = JSON.parse(value);
      this.setState({
        ...state
      });
    }
  }
  onChangeHandle(type, value) {
    const state = {};
    const {action,package_name,activity_name,extra_map,bundle_map,uri} = this.state;
    const actionUrl = {
      action,package_name,activity_name,extra_map,bundle_map,uri
    };
    const {onChange} = this.props;
     if(type){
       state[type] = value;
       this.setState(state);
       actionUrl[type] = value;
     }
    for(let key in actionUrl){
      if(actionUrl.hasOwnProperty(key)){
        if(String(actionUrl[key])===""){
          delete actionUrl[key];
        }
      }
    }
    actionUrl.behavior = "activity";
    onChange({
      type:"change",
      timeStamp:new Date()*1,
      target:{
        value:JSON.stringify(actionUrl)
      }
    })
  };
  keyValueElOnChange(name,index,key,value){
    const {onChangeHandle,state} = this;
    const data = state[name];
    data[index][key] = value;
    onChangeHandle(name,data);
  };
  addKeyValue(name){
    const {onChangeHandle,state} = this;
    const data = state[name];
    data.push({
      key:"",
      type:"string",
      value:""
    });
    onChangeHandle(name,data);
  };
  deleteKeyValue(name,index){
    const {onChangeHandle,state} = this;
    const data = state[name];
    data.splice(index, 1);
    onChangeHandle(name,data);
  }
  keyValueEl(name,data){
    const {keyValueElOnChange} = this;
    return (
      <div>
        {data.map((item,i)=>{
          return (
            <div style={{marginTop: '10px'}} key={i}>
              <div style={{display:"inline-block",padding:"0 16px 0 0"}}>
                <Input
                  className="input"
                  style={{width:"140px"}}
                  placeholder="请输入key"
                  maxLength="100"
                  value={item.key}
                  onChange={(e)=>{keyValueElOnChange(name,i,"key",e.target.value)}}
                />
              </div>
              <div style={{display:"inline-block"}}>
                <Input
                  className="input"
                  style={{width:"140px"}}
                  placeholder="请输入value"
                  maxLength="100"
                  value={item.value}
                  onChange={(e)=>{keyValueElOnChange(name,i,"value",e.target.value)}}
                />
              </div>
              <Icon style={{display:"inline-block",padding:"0 0 0 6px",cursor:"pointer"}}
                    onClick={()=>{this.deleteKeyValue(name,i)}}
                    type={"delete"}
              />
            </div>
          )
        })}
      </div>
    )
  }
  render(){
    const {action,package_name,activity_name,extra_map,bundle_map,uri} = this.state;
    return(
      <div>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col className="gutter-row input-wd" span={24}>
            <label>
              Action名
            </label>
            <Input
              onChange={(e) => this.onChangeHandle("action", e.target.value)}
              value={action}
              className="input" placeholder="请输入Action名" maxLength="100"
              name="url"
            />
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col className="gutter-row input-wd" span={24}>
            <label>
              packageName
            </label>
            <Input
              onChange={(e) => this.onChangeHandle("package_name", e.target.value)}
              value={package_name}
              className="input" placeholder="请输入packageName" maxLength="100"
              name="url"
            />
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col className="gutter-row input-wd" span={24}>
            <label>
              activityName
            </label>
            <Input
              onChange={(e) => this.onChangeHandle("activity_name", e.target.value)}
              value={activity_name}
              className="input" placeholder="请输入activityName" maxLength="100"
              name="url"
            />
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col className="gutter-row input-wd" span={4}>
            <label style={{width:"100%"}}>
              extraMap
            </label>
          </Col>
          <Col className="gutter-row input-wd" span={20}>
            {this.keyValueEl("extra_map",extra_map)}
            <div style={{overflow:"hidden",width:"300px",padding:"12px",textAlign:"center"}}>
              <div
                style={{width:"280px",padding:"4px",borderRadius:"2px",display:"inline-block",cursor:"pointer",whiteSpace:"nowrap",border:"1px dashed"}}
                type={"primary"}
                onClick={()=>{this.addKeyValue("extra_map")}}
              >
                <Icon type={"plus"}></Icon>
                添加
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col className="gutter-row input-wd" span={4}>
            <label style={{width:"100%"}}>
              bundleMap
            </label>
          </Col>
          <Col className="gutter-row input-wd" span={20}>
            {this.keyValueEl("bundle_map",bundle_map)}
            <div style={{overflow:"hidden",width:"300px",padding:"12px",textAlign:"center"}}>
              <div
                style={{width:"280px",padding:"4px",borderRadius:"2px",display:"inline-block",cursor:"pointer",whiteSpace:"nowrap",border:"1px dashed"}}
                type={"primary"}
                onClick={()=>{this.addKeyValue("bundle_map")}}
              >
                <Icon type={"plus"}></Icon>
                添加
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col className="gutter-row input-wd" span={24}>
            <label>
              url
            </label>
            <Input
              onChange={(e) => this.onChangeHandle("uri", e.target.value)}
              value={uri}
              className="input" placeholder="请输入url" maxLength="100"
              name="url"
            />
          </Col>
        </Row>
      </div>
    )
  }
}

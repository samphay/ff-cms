/**
 * CopyRight Samphay.
 * 2017/12/13
 */
"use strict";
import {Component} from "react";
import React from "react";
import Picker from "./Picker";
import './index.less';
import * as services from "../../../services";
import PropTypes from 'prop-types';
export default class ClientTypePicker extends Component{
  constructor(props){
    super(props);
    this.getSourceList = this.getSourceList.bind(this);
  }
  static propTypes = {
    selectedData: PropTypes.array,
    onChangeClientType: PropTypes.func,
    onChangeDnum: PropTypes.func
  };
  state={
    sourceList:[],
    dataSource:[]
  };
  getSourceList() {
    const This = this;
    services.ajax(
      // "/userCenter/sysConfigMsg/getClienttypeListByLicence",
      "/xvod/clientType/v1/getClientTypeCodeList",
      {
        page: JSON.stringify({"size": -1, "page": -1, "key": "updateTime", "value": "desc", "echo": 1, "search": ""})
      }
    ).then(function (data) {
      const listData = data.data;
      const sourceList = [];
      listData.map((item) => {
        sourceList.push({
          clientType:item.code
        })
      });
      This.setState({
        sourceList
      });
    });
  }
  componentWillReceiveProps(newProps){

  }
  componentDidMount() {
    this.getSourceList();
  }
  render(){
    const {sourceList} = this.state;
    const {dnum,onChangeClientType,onChangeDnum,config} = this.props;
    let {selectedData=[]} = this.props;
    return (
      <div className="picker">
        <Picker
          sourceList = {sourceList}
          config={config}
          selectedData = {selectedData}
          dnum={dnum}
          onChangeClientType={onChangeClientType}
          onChangeDnum={onChangeDnum}
        />
      </div>
    )
  }
}

/**
 * CopyRight Samphay.
 * 2017/12/13
 */
"use strict";
import * as services from "../../../services";
import {Component} from "react";
import React from "react";
import {Button, Col, Popconfirm, Row, Table, Select, Modal} from "antd";

const Option = Select.Option;
export default class ClientTypeViewer extends Component {
  constructor(props) {
    super(props);
    this.editClientTypeSelected = this.editClientTypeSelected.bind(this);
    this.deleteClientTypeSelected = this.deleteClientTypeSelected.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSysChangeHandle = this.onSysChangeHandle.bind(this);
    this.onAppChangeHandle = this.onAppChangeHandle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteClientType = this.deleteClientType.bind(this);
    this.deleteAllClientType = this.deleteAllClientType.bind(this);
    this._deleteByClientType = this._deleteByClientType.bind(this);
    this._getSource = this._getSource.bind(this);
  }

  state = {
    visible: false,
    onEditIndex: 0,
    onEditData: {},
    tableViewProps: {
      rowKey: (item, index) => { return item.clientType || index},
      // pagination: false,
      pagination: {
        showSizeChanger: true,
        defaultPageSize: 5,
        pageSizeOptions: ['5', '10', '20', '40'],
      },
      columns: [
        {
          title: '机型',
          dataIndex: 'clientType',
          key: 'clientType',
          className: 'tableCenter',
        },/*
        {
          title: '系统版本',
          dataIndex: 'systemVersion',
          key: 'systemVersion',
          className: 'tableCenter',
        },*/
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          className: 'tableCenter',
        }],
      loading: false,
    },
    dataSource: [],
    sysListData: [],
    rowSelection: {
      type: 'checkBox',
    },
    selectedRowKeys: []
  };
  editClientTypeSelected = () => {
    const {onChange} = this.props;
    const {onEditIndex, onEditData, dataSource} = this.state;
    dataSource[onEditIndex] = onEditData;
    this.setState({
      dataSource,
    });
    onChange(dataSource);
    this.closeModal();
  };

  openModal(onEditIndex) {
    const This = this;
    const onEditData = Object.assign({}, This.props.source[onEditIndex]);
    services.ajax(
      "/userCenter/sysConfigMsg/getVersionListByClienttype",
      {
        page: JSON.stringify({
          "size":1000,
          "page":0,
          "key":"updateTime",
          "value":"desc",
          "echo":1,
          "search":onEditData.clientType})
      }
    ).then(function(data){
      let tem = {};
      data.data.map(function(item){
        if(item.systemVersion&&item.systemVersion!="null"){
          tem[item.systemVersion] = item;
        }
      });
      const sysListData = Object.keys(tem);
      This.setState({
        onEditIndex,
        onEditData,
        sysListData,
        visible: true,
      });
    });

  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  deleteClientTypeSelected = (index,data) => {
    const {onChange} = this.props;
    const {_deleteByClientType} = this;
    const dataSource = _deleteByClientType(data);
    this.setState({
      dataSource,
    });
    onChange(dataSource);
  };
  _getSource(source){
    const This = this;
    const {deleteClientTypeSelected,openModal} = This;
    const {
      edit,
      cancel
    } = this.props;
    // const _source = [];
    return source.map((item, index) => {
      let tem = {
        clientType:item
      };
      tem.operation = (<div>
        {edit?
          <span
            style={{cursor: 'pointer', padding: '0 8px 0 0'}} onClick={function () {
            openModal(index);
          }} className="edit"
          >编辑</span>:""}
        {
          cancel?<Popconfirm
            title="你确定要移除这个机型?" onConfirm={() => {
            deleteClientTypeSelected(index,item);
          }} okText="删除" cancelText="点错了"
          >
            <span style={{cursor: 'pointer'}} className="cancel">删除</span>
          </Popconfirm>:""
        }
      </div>);
      return tem;
    })
  }
  componentWillReceiveProps(newProps){
    const {source} = newProps;
    this.setState({
      dataSource:this._getSource(source),
    });
    return {...newProps};
  }
  componentDidMount() {
    const {source} = this.props;
    this.setState({
      dataSource: this._getSource(source),
    });
  }

  onSysChangeHandle(value) {
    const {onEditData} = this.state;
    onEditData.systemVersion = value;
    this.setState({
      onEditData,
    });
  }

  onAppChangeHandle(e, v) {
    const {onEditData} = this.state;
    onEditData.appVersion = e.target.value;
    this.setState({
      onEditData,
    });
  }

  onChange(selectedRowKeys) {
    this.setState({
      selectedRowKeys
    });
  }
  _deleteByClientType(clientType){
    const {dataSource} = this.state;
    const tem = [];
    clientType = clientType + "";
    dataSource.map(function (item) {
      const reg = new RegExp(item.clientType);
      if(!reg.test(clientType)){
        tem.push(item);
      }
    });
    console.log(tem,clientType)
    return tem;
  }
  deleteClientType() {
    Modal.confirm({
      content: "你确定要删除所选机型？",
      onOk: () => {
        const {selectedRowKeys, dataSource} = this.state;
        const {_deleteByClientType} = this;
        let clientTypeSelectedData = _deleteByClientType(selectedRowKeys);
        this.setState({
          dataSource: clientTypeSelectedData,
          selectedRowKeys:[]
        });
        const {onChange} = this.props;
        onChange(clientTypeSelectedData)
      }
    });

  }

  deleteAllClientType = () => {
    Modal.confirm({
      content: "你确定要清空所有机型？",
      onOk: () => {
        this.setState({
          dataSource: []
        });
        const {onChange} = this.props;
        onChange([])
      }
    });
  };

  render() {
    const {sysListData, selectedRowKeys, rowSelection, dataSource,tableViewProps} = this.state;
    const {deleteAllClientType} = this;
    return (
      <div>
        <div style={{position: "absolute", top: 0}}>
          <Button type={"primary"} onClick={deleteAllClientType}>清空</Button>
          {
            selectedRowKeys.length > 0 ?
              <Button type={"primary"} style={{margin: "0 0 0 12px"}} onClick={this.deleteClientType}>删除机型</Button>
              : ""
          }
        </div>
        <Table
          {...tableViewProps}
          dataSource={dataSource}
          rowSelection={{
            ...rowSelection,
            selectedRowKeys: selectedRowKeys,
            onChange: this.onChange,
          }}
        />
        <Modal
          title="编辑"
          visible={this.state.visible}
          onOk={this.editClientTypeSelected}
          onCancel={this.closeModal}
        >
          <Row gutter={16} style={{marginTop: '10px'}}>
            <Col className="gutter-row input-wd" span={24}>
              <label>机型 : </label>
              <span>
                  {this.state.onEditData.clientType}
                </span>
            </Col>
          </Row>
          <Row gutter={16} style={{marginTop: '10px'}}>
            <Col className="gutter-row input-wd" span={24}>
              <label>系统版本 : </label>
              <Select
                style={{width: "300px"}}
                className="sys_version_name"
                showSearch
                placeholder={"请选择系统版本"}
                onSelect={this.onSysChangeHandle}
                value={this.state.onEditData.systemVersion || undefined}
              >
                {sysListData.map((item, i) => {
                  return <Option value={item} key={i}>{item}</Option>;
                })}
              </Select>
              {/*<Input
                  className="sys_version_name" placeholder="请输入系统版本" maxLength="100" onChange={this.onSysChangeHandle}
                  name="sys_version_name" value={this.state.onEditData.systemVersion}
                />*/}
            </Col>
          </Row>
          {/*<Row gutter={16} style={{marginTop: '10px'}}>
              <Col className="gutter-row input-wd" span={24}>
                <label>应用版本 : </label>
                <Input
                  className="app_version_name" placeholder="请输入应用版本" maxLength="100" onChange={this.onAppChangeHandle}
                  name="app_version_name" value={this.state.onEditData.appVersion}
                />
              </Col>
            </Row>*/}
        </Modal>
      </div>
    );
  }
}

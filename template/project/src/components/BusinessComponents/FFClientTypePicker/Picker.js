/**
 * CopyRight Samphay.
 * 2017/12/13
 */
"use strict";
import React from "react";
import {Component} from "react";
import {Col, Input, Modal, Row, Select, Button, Table} from "antd";
import Search from "../../../components/public/Search";

const Option = Select.Option;
import ClientTypeViewer from './ClientTypeViewer'

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.unSelectAll = this.unSelectAll.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
    this.getLicenceTypeList = this.getLicenceTypeList.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onChangeViewer = this.onChangeViewer.bind(this);
    this.onChangeDnum = this.onChangeDnum.bind(this);
  }

  state = {
    config: {
      search: true,
      searchType: true,
      edit:true,
      cancel:true,
      dnum:true
    },
    dnum:"",
    modalVisible: false,
    selectedTem: [],
    selectedData: [],
    licenceName: "全部",
    selectedRowKeys: [],
    selectState: 0,
    licenceTypeList: [],
    sourceKV: {},
    tableViewProps: {
      rowKey: (item, index) => { return item.clientType || index},
      hideDefaultSelections: true,
      pagination: {
        showSizeChanger: true,
        defaultPageSize: 10,
        pageSizeOptions: ['5', '10', '20', '40', "200"], /* ,
          onChange: function (page, pageSize, a) {
            console.log(page, pageSize, a)
          },
          onShowSizeChange: function (page, pageSize, a) {
            console.log(page, pageSize, a)
          }*/
      },
      columns: [
        {
          title: '机型名称',
          dataIndex: 'clientType',
          key: 'clientType',
          className: 'tableCenter',
        }/*,
        {
          title: '牌照方',
          dataIndex: 'licenceName',
          key: 'licenceName',
          className: 'tableCenter',
        }*/
      ],
      loading: false,
    },
    dataSource: [],
    sourceList: [],
    rowSelection: {
      type: 'checkBox',
    },
  };

  getLicenceTypeList(dataSource) {
    let sourceKV = {}, licenceTypeList = [{
      id: "",
      name: "全部"
    }], licenceTypeData = {};
    for (let i in dataSource) {
      if (dataSource.hasOwnProperty(i)) {
        sourceKV[dataSource[i].clientType] = dataSource[i];
        licenceTypeData[dataSource[i].licence] = dataSource[i].licenceName;
      }
    }
    for (let i in licenceTypeData) {
      if (licenceTypeData.hasOwnProperty(i)) {
        licenceTypeList.push({
          id: i,
          name: licenceTypeData[i]
        })
      }
    }
    this.setState({
      sourceKV,
      licenceTypeList
    });
  }

  onChange(selectedRowKeys, selectedRows) {
    const {sourceKV} = this.state;
    this.setState({
      selectedRowKeys,
    });
    const selectedTem = selectedRowKeys.map((key) => {
      return Object.assign({
        appVersion: "",
        systemVersion: ""
      }, sourceKV[key]);
    });
    this.setState({
      selectedTem
    })
  }

  selectAll() {
    const {dataSource, sourceKV} = this.state;
    const selectedRowKeys = dataSource.map((item) => {
      return item.clientType
    });
    this.setState({
      selectedRowKeys,
      selectState: 1
    });
    const selectedTem = selectedRowKeys.map((key) => {
      return Object.assign({
        appVersion: "",
        systemVersion: ""
      }, sourceKV[key]);
    });
    this.setState({
      selectedTem
    })
  }

  unSelectAll() {
    this.setState({
      selectedRowKeys: [],
      selectState: 0
    });
    const selectedTem = [];
    this.setState({
      selectedTem
    })
  }
  _getProps(props){
    let {config:config_} = this.state;
    const {selectedData,sourceList,dnum,config} = props;
    config_ = Object.assign(config_,config);
    this.setState({
      selectedData,
      sourceList,
      config:config_,
      dnum,
      dataSource:sourceList
    });
    this.getLicenceTypeList(sourceList);
  }
  componentWillReceiveProps(newProps){
    this._getProps(newProps);
    return {...newProps};
  }
  componentDidMount() {
    this._getProps(this.props);
  }
  onSearch = (type, keywords) => {
    const result = [];
    const {unSelectAll} = this;
    const {sourceList} = this.state;
    sourceList.map((data) => {
      let keywords_ = keywords.toUpperCase(),
        data_ = data[type].toUpperCase();
      const reg = new RegExp(keywords_);
      let isMatch = reg.test(data_);
      if (type == "licence") {
        isMatch = keywords_ == "" ? true : keywords_ == data_;
        unSelectAll();
      }
      if (isMatch) {
        result.push(data);
        if (type == "licence") {
          this.setState({
            licenceName: keywords_ == "" ? "全部" : data.licenceName
          });
        }
      }
    });
    this.setState({
      dataSource: result,
    });
  };

  triggerModal(modalVisible) {
    const selectedRowKeys = [];
    if (modalVisible) {
      const {selectedData} = this.state;
      selectedData.map(function (item) {
        selectedRowKeys.push(item.clientType);
      });
    }
    this.setState({
      modalVisible,
      selectedRowKeys
    })
  }

  onConfirm() {
    const {onChangeClientType} = this.props;
    const {selectedTem} = this.state;
    this.setState({
      selectedData: selectedTem
    });
    onChangeClientType(selectedTem);
    this.triggerModal(false);
  }

  onChangeViewer(selectedData) {
    const {onChangeClientType} = this.props;
    this.setState({
      selectedData
    });
    onChangeClientType(selectedData);
  }
  onChangeDnum(dnum){
    const {onChangeDnum} = this.props;
    dnum = dnum.replace(/，/g,",");
    this.setState({
      dnum
    });
    onChangeDnum(dnum);
  }
  render() {
    const {
      config,
      licenceTypeList,
      selectState,
      licenceName,
      selectedRowKeys,
      rowSelection,
      modalVisible,
      selectedData,
      dataSource,
      dnum
    } = this.state;
    const {onSearch, triggerModal, onChangeViewer,onChangeDnum} = this;
    return (
      <div>
        <div>
          <Row gutter={16} style={{marginTop: '10px'}}>
            <Col className="gutter-row input-wd" span={24}>
              <div className="btnWrap" style={{width: '96%', margin: '0 auto', overflow: 'hidden'}}>
                <Button type={'primary'} onClick={() => {
                  triggerModal(true)
                }} style={{float: 'right'}}>选择机型</Button>
              </div>
              <div className="tbWrap" style={{padding: '8px 18px'}}>
                {
                  selectedData.length > 0 ?
                    <ClientTypeViewer
                      {...config}
                      onChange={onChangeViewer}
                      source={selectedData}
                    /> : <div style={{textAlign: 'center'}}>请选择机型</div>
                }
              </div>
            </Col>
          </Row>
          {
            config.dnum?
              <Row gutter={16} style={{marginTop: '10px'}}>
                <Col className="gutter-row input-wd" span={24}>
                  <label>设备序列号 : </label>
                  <Input
                    onChange={(e) => onChangeDnum( e.target.value)}
                    value={dnum}
                    className="dnum" placeholder="多个设备序列号，以','隔开" maxLength="100"
                    name="dnum"
                  />
                </Col>
              </Row>:""
          }
        </div>
        <Modal
          title={"选择机型"}
          className="picker"
          width={800}
          visible={modalVisible}
          onOk={this.onConfirm}
          onCancel={() => {
            triggerModal(false)
          }}
        >
          <div>
            {/*<Select
              style={{display: "inline-block", width: "220px", position: "relative", top: "28px", margin: "0 12px 0 0"}}
              placeholder={"请选择牌照方"}
              onSelect={onSearch.bind(this, "licence")}
            >
              {
                licenceTypeList.map((item, i) => {
                  return (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  );
                })
              }
            </Select>*/}
            {
              selectState == 1 ? <Button type={"primary"} onClick={this.unSelectAll}
                                         style={{position: "relative", top: "28px"}}>取消全选{licenceName}</Button> :
                <Button type={"primary"} onClick={this.selectAll}
                        style={{position: "relative", top: "28px"}}>一键全选{licenceName}</Button>
            }
            {
              config.search?<Search
                onSearch={this.onSearch.bind(this, "clientType")}
              />:""
            }
          </div>
          <Table
            {...this.state.tableViewProps}
            rowSelection={{
              ...rowSelection,
              selectedRowKeys: selectedRowKeys,
              onChange: this.onChange,
            }}
            dataSource={dataSource}
          />
        </Modal>
      </div>
    );
  }
}

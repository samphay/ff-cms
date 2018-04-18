/**
 * CopyRight Samphay.
 * 2018/3/31
 */
import React, {Component} from 'react';
import Picker from './Picker';
import Viewer from "./Viewer";
import PropTypes from 'prop-types';
import classNames from "classnames";
import style from "./style.less";
import {ajax} from "../../../services/index";
import {Button, Col, Row, Modal} from "antd";

export default class FFSourcePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    };
    this.fetch = this.fetch.bind(this);
    this.openPicker = this.openPicker.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onViewSelect = this.onViewSelect.bind(this);
    this.delViewSelected = this.delViewSelected.bind(this);
    this.operationWrap = this.operationWrap.bind(this);
  }

  static propTypes = {
    value: PropTypes.array,
    columns: PropTypes.array,
    className:PropTypes.string,
    selectText :PropTypes.string,
    filter:PropTypes.any,
    indexKey:PropTypes.string,
    placeholder:PropTypes.string,
    listOperation:PropTypes.array,
    lazyLoad:PropTypes.bool,
    viewDragable:PropTypes.bool,
  };

  state = {
    visible: false,
    viewDragable: false,
    value: [],
    sourceData: [],
    sourceKVData: {},
    total: 0,
    viewSelected: []
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

  fetch(filterParams = {}) {
    const {action, actionProps,indexKey} = this.props;
    const {sourceKVData} = this.state;
    let Type = "GET";
    const {setSendData, setResultData} = actionProps;
    const sendData = setSendData({
      page: JSON.stringify({
        page: 0,
        size: 10,
        search: ""
      }),
      ...filterParams
    });
    const resourceData = ajax(action, {
      ...sendData
    }, Type);
    resourceData.then((data = {}) => {
      const {data: sourceData = [], total = 0} = setResultData(data) || {};
      sourceData.map(item=>{
        sourceKVData[item[indexKey]] = item
      });
      this.setState({
        visible: true,
        sourceData,
        total,
        sourceKVData
      })
    })
  }

  openPicker() {
    const {form = {}, filterValue = []} = this.props;
    const {getFieldsValue, validateFields} = form;
    if (filterValue.length > 0) {
      validateFields(filterValue, {force: true}, (e) => {
        if (e) {
          return false;
        }
        const filterParams = getFieldsValue(filterValue);
        this.fetch(filterParams);
      });
    } else {
      this.fetch();
    }
  }

  closePicker() {
    this.setState({
      visible: false
    })
  }

  onChange(value) {
    const {onChange} = this.props;
    this.setState({
      value
    });
    onChange && onChange(value)
  }

  onViewSelect(viewSelected) {
    this.setState({
      viewSelected
    })
  }

  operationWrap(listOperation) {
    let newOperation = [];
    listOperation.map(item => {
      if (item.render) {
        item.render = item.render.bind(this);
      }
      newOperation.push(item)
    });
    return newOperation;
  }

  static confirmToDel(resolve){
    Modal.confirm({
      content: "确定要删除？",
      onOk: resolve,
      okText: "确定",
      cancelText: "取消"
    })
  };
  delViewSelected() {
    const {onChange} = this;
    FFSourcePicker.confirmToDel(() => {
      const {viewSelected, value, indexKey} = this.state;
      const newValue = value.filter(item => viewSelected.indexOf(item[indexKey]) < 0);
      this.setState({
        viewSelected: []
      });
      onChange(newValue)
    });
  }

  delViewItem(data) {
    const {onChange} = this;
    FFSourcePicker.confirmToDel(() => {
      const {value, indexKey} = this.state;
      const newValue = value.filter(item => data[indexKey] != item[indexKey]);
      onChange(newValue)
    })
  }
  editViewItem(data,index) {
    const {onChange} = this;
    console.log(data,index)
  }

  render() {
    const {openPicker, closePicker, fetch, onChange, onViewSelect, delViewSelected} = this;
    const {className, selectText, filter, columns, indexKey, placeholder, listOperation,lazyLoad=false} = this.props;
    const {visible, sourceData, total, value = [], viewSelected = [],sourceKVData,viewDragable} = this.state;
    return (
      <div className={classNames(style.sourcePickerWrap, className)}>
        <Row type={"flex"} className={style.header}>
          <Col span={20} className="filter">
            {filter}
          </Col>
          <Col span={4} className="button">
            <Row type={"flex"}>
              <Col pull={12} span={12}>
                {
                  viewSelected.length > 0 ? <Button type={"primary"} onClick={delViewSelected}>
                      删除选中
                    </Button>
                    : ""
                }
              </Col>
              <Col pull={4} span={12}>
                <Button type={"primary"} onClick={openPicker}>
                  {value.length > 0 ? "修改" : "添加"}{selectText}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={style.viewer}>
          <Viewer
            placeholder={placeholder}
            columns={[
              ...columns
            ]}
            dragable={viewDragable}
            listOperation={this.operationWrap(listOperation)}
            indexKey={indexKey}
            selectedRowKeys={viewSelected}
            value={value}
            onSelect={onViewSelect}
            onChange={onChange}
          />
        </div>
        {
          visible ?
            <Picker
              sourceKVData={sourceKVData}
              lazyLoad={lazyLoad}
              fetch={fetch}
              total={total}
              indexKey={indexKey}
              title={selectText}
              columns={columns}
              value={value}
              onChange={onChange}
              dataSource={sourceData}
              onClose={closePicker}
            /> : ""
        }
      </div>
    )
  }
}

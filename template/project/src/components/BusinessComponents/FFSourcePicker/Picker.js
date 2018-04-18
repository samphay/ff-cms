/**
 * CopyRight Samphay.
 * 2018/4/2
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import {Modal, Table} from "antd";
import FFormPage from "../FFormPage";

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    };
    this.onChange = this.onChange.bind(this);
    this.onRowChange = this.onRowChange.bind(this);
    this.onOk = this.onOk.bind(this);
    this.localSearch = this.localSearch.bind(this);
  }

  static propTypes = {
    title: PropTypes.string,
    total: PropTypes.number,
    onClose: PropTypes.func,
    dataSource: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
    sourceKVData: PropTypes.object,
    lazyLoad: PropTypes.bool
  };

  state = {
    pageParam: {
      size: 10,
      page: 1
    },
    total:0,
    filterParam: {},
    search: "",
    indexKey: "",
    value: [],
    selectedRowKeys: [],
    sourceKVData: {}
  };

  componentWillMount() {

  }

  componentDidMount() {
    const {value=[],indexKey} = this.props;
    let {selectedRowKeys,sourceKVData} = this.state;
    value.map(item=>{
      if(selectedRowKeys.indexOf(item[indexKey])<0){
        selectedRowKeys.push(item[indexKey]);
        sourceKVData[item[indexKey]] = item;
      }
    });
    this.setState({
      selectedRowKeys,
      sourceKVData
    })

  }

  componentWillReceiveProps(newProps) {
    const {value=[],indexKey} = this.props;
    let {selectedRowKeys,sourceKVData} = this.state;
    value.map(item=>{
      if(selectedRowKeys.indexOf(item[indexKey])<0){
        selectedRowKeys.push(item[indexKey]);
        sourceKVData[item[indexKey]] = item;
      }
    });
    this.setState({
      ...newProps,
      selectedRowKeys,
      sourceKVData
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

  onChange(data, type) {
    const { localSearch} = this;
    const { lazyLoad=false} = this.state;
    const { fetch} = this.props;
    const {page, size, search, filterValue: filterParam} = data;
    switch (type) {
      case "page":
        this.setState({
          pageParam: {
            page,
            size
          }
        });
        break;
      case "search":
        this.setState({
          search
        });
        if(!lazyLoad){
          localSearch(search);
        }
        break;
      case "filterValue":
        this.setState({
          filterParam
        });
        break;
    }
    if(lazyLoad){
      const param = {
        page: JSON.stringify({
          page:page-1,
          size,
          search
        }),
        name:search
      };
      fetch(param);
    }
  }
  localSearch(search){
    const {sourceKVData} = this.state;
    const dataSource = [];
    Object.keys(sourceKVData).map(key=>{
      const textItem = JSON.stringify(sourceKVData[key]).toLocaleLowerCase();
      if(textItem.indexOf(search.toLocaleLowerCase())>=0){
        dataSource.push(sourceKVData[key])
      }
    });
    this.setState({
      dataSource,
      total:dataSource.length
    });
  }
  onRowChange(selectedRowKeys) {
    const {sourceKVData} = this.state;
    let value = selectedRowKeys.map(key=>{
      return sourceKVData[key];
    });
    // console.log(selectedRowKeys,value)
    this.setState({
      selectedRowKeys, value
    });
  }
  onOk(){
    const {value,onClose,onChange} = this.state;
    onChange&&onChange(value);
    onClose()
  }
  render() {
    const {onChange, onRowChange,onOk} = this;
    const {pageParam} = this.state;
    const {onClose,title="", dataSource, columns, indexKey, total, value, selectedRowKeys} = this.state;
    return (
      <Modal
        title={title}
        width={800}
        visible={true}
        onCancel={onClose}
        onOk={onOk}
      >
        <FFormPage
          indexKey={indexKey}
          total={total}
          pageParam={pageParam}
          onChange={onChange}
          onRowChange={onRowChange}
          rowSelectable={true}
          rowSelection={
            {
              selectedRowKeys,
              selectedRows: value
            }
          }
          columns={[...columns]}
          dataSource={dataSource}
        />
      </Modal>
    )
  }
}

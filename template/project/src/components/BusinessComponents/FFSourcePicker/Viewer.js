/**
 * CopyRight Samphay.
 * 2018/4/2
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import style from './style.less';
import {Button} from "antd";
import FFormPage from "../FFormPage";
import FFEditableText from "../FFEditableText";

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    };
    this.onChange = this.onChange.bind(this);
    this.onRowChange = this.onRowChange.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    dragable: PropTypes.bool
  };

  state = {
    value:[],
    dragable:false,
    pageParam: {
      size: 10,
      page: 1
    },
    selectedRowKeys:[]
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
  onChange(data, type) {
    const {localSearch, originData, lazyLoad} = this.state;
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
        const setSourceData = (sourceData) => {
          this.setState({
            sourceData
          })
        };
        localSearch && localSearch(search, originData, setSourceData);
        break;
      case "filterValue":
        this.setState({
          filterParam
        });
        break;
    }
  }

  onRowChange(selectedRowKeys){
    const {onSelect }= this.props;
    onSelect&&onSelect(selectedRowKeys);
  }
  onEditChange(newValue,key,index){
    const {value} = this.state;
    const {onChange} = this.props;
    value[index][key] = newValue;
    // console.log(value,index,key,value[index][key])
    this.onValueChange(value)
  }
  onValueChange(value){
    const {onChange} = this.props;
    this.setState({
      value
    })
    onChange&&onChange(value);
  }
  render() {
    const {onChange,onRowChange,onEditChange,onValueChange} = this;
    const {className,pageParam,columns,indexKey,listOperation,dragable, value=[],placeholder,selectedRowKeys} = this.state;
    let newColumns = [];
    columns.map((item,index)=>{
      let newItem = {...item};
      if(newItem.editable) {
      // if(false) {
        /*newItem.render = (text, data, index) => {
          // console.log(text, data, item.dataIndex || item.key, index)
          let oldRender = function (EditComponent) {
            // console.log(arguments)
            return EditComponent
          };
          oldRender = oldRender.bind(null,
            <EditableText
              key={index}
              value={text}
              valueFormat={item.valueFormat || item.render}
              editComponent={item.editComponent}
              onChange={(newValue) => {
                const valueWrap = item.editValueWrap || function (value) {
                  return value
                }
                onEditChange(valueWrap(newValue), item.dataIndex || item.key, index)
                // onEditChange(newValue, item.dataIndex || item.key, index)
              }}
            />, text, data, index
          );
          return oldRender()
        }*/
        newItem.render = (text, data, index) => {
          return (function (Text) {
            return Text
          }).bind(null,
            <FFEditableText
              key={index}
              value={text}
              valueFormat={item.valueFormat || item.render}
              editComponent={item.editComponent}
              onChange={(newValue) => {
                const valueWrap = item.editValueWrap || function (value) {
                  return value
                }
                onEditChange(valueWrap(newValue), item.dataIndex || item.key, index)
                // onEditChange(newValue, item.dataIndex || item.key, index)
              }}
            />, text, data, index
          )()
        }
      }
      newColumns.push(newItem);
    })
    if(value.length==0){
      return <div style={{textAlign:"center",padding:"14px"}}>
        {placeholder}
      </div>
    }
    return (
      <div className={classNames(style.sourcePickerViewer)}>
        <FFormPage
          showSearch={false}
          pageParam={pageParam}
          onRowChange={onRowChange}
          rowSelectable={true}
          rowSelection={
            {
              selectedRowKeys,
            }
          }
          onChange={onChange}
          columns={[
            ...newColumns
          ]}
          columnsOperations={listOperation}
          indexKey={indexKey}
          total={value.length}
          dataSource={value}
          onSort={(data)=>{
            onValueChange(data)
          }}
        />
      </div>
    )
  }
}

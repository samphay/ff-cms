/**
 * CopyRight Samphay.
 * 2018/1/10
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import style from './index.less';
import {Card, Col, Input, Row, Table} from "antd";
import FFilter from "../FFilter";
import FFSearch from "../FFSearch";
import FFDataTable from "../FFDataTable/FFDataTable";
export default class FFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    };
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onRowChange = this.onRowChange.bind(this);
  }

  static propTypes = {
    indexKey: PropTypes.string,
    pageParam:PropTypes.object,
    total: PropTypes.number,
    pageSizeOptions: PropTypes.array,
    columns: PropTypes.array,
    rowClassName: PropTypes.any,
    filterSpan: PropTypes.number,
    filterItem: PropTypes.array,
    dataSource: PropTypes.array,
    showSearch: PropTypes.bool,
    loading: PropTypes.bool,
    onChange:PropTypes.func,
    columnsOperations: PropTypes.array,
    rowSelection: PropTypes.object,
    onRowChange: PropTypes.func,
    rowSelectable:PropTypes.bool,
    sortable: PropTypes.bool,
    onSort: PropTypes.func,
  };

  state = {
    indexKey: "",
    pageParam:{
      page:1,
      size:20,
    },
    total: 0,
    pageSizeOptions: ["5", "10", "20", "50", "100"],
    columns: [],
    dataSource: [],
    filterItem: [],
    filterValue: {},
    filterSpan:3,
    search:"",
    showSearch:true,
    searchBounce : 1000,
    loading:false,
    rowSelectable:false,
    rowSelection:{
      selectedRowKeys:[],
      selectedRows:[]
    },
    sortable:false
  };
  componentWillMount() {

  }

  componentDidMount() {
    const {pageSizeOptions} = this.state;
    const {total} = this.props;
    if(total>0&&pageSizeOptions[4]<total){
      pageSizeOptions[4] = total+"";
    }
    this.setState({
      pageSizeOptions
    })
  }

  componentWillReceiveProps(newProps) {
    const {pageSizeOptions} = this.state;
    const {total} = newProps;
    if(total>0&&pageSizeOptions[4]<total){
      pageSizeOptions[4] = total+"";
    }
    this.setState({
      ...newProps,
      pageSizeOptions
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
  onShowSizeChange(page,size){
    this.setState({
      pageSize:size,
      current:page
    });
    const {onChange} = this;
    onChange("page",{
      page,size
    })
  }
  onPageChange(page,size){
    this.setState({
      pageSize:size,
      current:page
    });
    const {onChange} = this;
    onChange("page",{
      page,size
    })
  }
  onSearchChange(search){
    const {onChange} = this;
    this.setState({
      search
    });
    onChange("search",{search})
  }
  onFilterChange(filterValue){
    const {onChange} = this;
    this.setState({
      filterValue
    });
    onChange("filterValue",{filterValue})
  }
  onChange(type,value){
    const {
      onChange,
      filterValue,
      search,
      pageParam,
    } = this.state;
    const data = {
      filterValue,
      search,
      ...pageParam,
      ...value
    };
    onChange&&onChange(data,type)
  }
  getColumns(){
    const {columns,pageParam,columnsOperations=[]} = this.state;
    const {size:pageSize,page:current} = pageParam;
    const columnsData = [
      {
        title: '序号',
        dataIndex: '_index',
        className: "tableCenter",
        render(text, data, index) {
          return (current-1)*pageSize+(index + 1)
        }
      },
      ...columns
    ];
    if(columnsOperations.length>0){
      columnsData.push({
        title: '操作',
        className: "tableCenter",
        dataIndex: 'operation',
        render(text,data,index){
          return (
            <div>
              {
                columnsOperations.map((item,i)=>{
                  let {operate,name,className,isShow,render} = item;
                  switch (typeof isShow){
                    default:{
                      isShow = isShow===undefined?true:!!isShow;
                      break;
                    }
                    case "function":{
                      isShow = isShow(data);
                      if(typeof isShow !== "boolean"){
                        console.error(`columnsOperations[${i}].isShow方法必须return一个Boolean类型`)
                      }
                    }
                  }
                  if(!isShow){
                    return ""
                  }
                  if(render){
                    return <span
                      key={i}
                      className={className}
                      style={
                        {
                          margin:"4px",
                          display:"inline-block",
                          verticalAlign:"top",
                          cursor:"pointer"
                        }
                      }>
                    {render(data,index)}
                  </span>
                  }
                  return <span
                    key={i}
                    className={className}
                    onClick={
                      () => {
                        operate && operate(data,index)
                      }
                    }
                    title={name}
                    style={
                      {
                        margin:"4px",
                        display:"inline-block",
                        verticalAlign:"top",
                        cursor:"pointer"
                      }
                    }>
                    {name}
                  </span>
                })
              }
            </div>
          )
        }
      })
    }
    return columnsData;
  }
  onRowChange(selectedRowKeys, selectedRows){
    const {rowSelection,onRowChange} = this.state;
    this.setState({
      rowSelection:{
        ...rowSelection,
        selectedRowKeys,
        selectedRows
      }
    });
    onRowChange&&onRowChange(selectedRowKeys, selectedRows);
  }
  render() {
    const {
      state,
      onShowSizeChange,
      onPageChange,
      onSearchChange,
      getColumns,
      onFilterChange,
      onRowChange
    } = this;
    const {
      indexKey,
      pageParam,
      total,
      pageSizeOptions,
      columns,
      dataSource,
      rowClassName,
      filterItem,
      filterSpan,
      search,
      showSearch,
      loading,
      sortable,
      onSort,
      rowSelection:rowSelectionState
    } = state;
    const {size:pageSize,page:current} = pageParam;
    const pagination = {
      current,
      pageSize,
      total,
      pageSizeOptions,
      showSizeChanger: true,
      onShowSizeChange,
      onChange:onPageChange
    };
    const newColumns = getColumns(columns);
    const pageTotal = total||dataSource.length;
    const showPage = (total>pageSize||true);
    let rowSelection = {};
    if(this.state.rowSelectable){
      rowSelection = {
        onChange: onRowChange,
        ...rowSelectionState,
      };
    }
    return (
      <div className={style.appAuthTableWrap}>
        {
          filterItem&&filterItem.length>0?<Card>
            <FFilter
              span={filterSpan}
              onChange={(data) => {
                onFilterChange(data)
              }}
              formItems={filterItem}
            />
          </Card>:""
        }
        <Card>
          <Row type={"flex"} className={style.tableTitle} >
            <Col span={12}>
              <div className={style.listInfo}>
                {`${showPage?`显示第 ${(current - 1) * pageSize + 1} 至 ${Math.min(current * pageSize,pageTotal)} 项结果，`:""}共 ${pageTotal} 项`}
              </div>
            </Col>
            <Col span={12}>
              <div className={style.searchWrap}>
                <FFSearch
                  isShow={showSearch}
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
            </Col>
          </Row>
          <FFDataTable
            loading={loading}
            rowKey={(item, i) => indexKey?(item[indexKey] || i):i}
            indexKey={indexKey}
            rowClassName={rowClassName}
            pagination={showPage?pagination:false}
            rowSelection={this.state.rowSelectable?rowSelection:null}
            columns={newColumns}
            sortable={sortable}
            onSort={onSort}
            dataSource={dataSource}
          />
        </Card>
      </div>
    )
  }
}

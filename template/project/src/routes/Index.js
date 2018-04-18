/**
 * CopyRight Samphay.
 * 2018/1/2
 */
"use strict";
import React from "react";
import { TableView, Title, Header, Filters } from './../components/public/cor';
import PropTypes from "prop-types";
export default class Index extends React.Component{
  constructor(props){
    super(props);
    this.operation = this.operation.bind(this);
    this.state = {
      ...props
    }
  }
  static propTypes = {
    handlePools: PropTypes.object.isRequired
  };
  componentWillReceiveProps(newProps){
    this.state = {
      ...newProps
    }
  }
  operation({key,type,data}){
    const { actionHead,handlePools} = this.props;
    if(handlePools[key]){
      handlePools[key]({
        data,
        type,
        key,
      })
    }else{
      console.error(`function:${key}没有找到，请检查[~/src/routes/${actionHead}/index.js]里面的handlePools是否定义${key}`)
    }
  }
  render(){
    const {operation} = this;
    const { state={}, dispatch ,children,actionHead,title} = this.props;
    const { configData={}, loading, list, total,pageParam={}} = state;
    // 新增按钮配置
    const headerProps = {
      ele: configData.buttonInfo || [],
      clickFn(config) {
        const {type,url} = config;
        switch (type) {
          case 'add': {
            operation({
              key:url,
              type
            });
            break;
          }
          case 'url': {
            dispatch({
              type: `${actionHead}/buttonGetFetch`,
              payload: {
                url,
              },
            });
            break;
          }
        }
      },
    };
// 筛选动态配置
    const filtersProps = {
      selectItem: {
        fileds: configData.paramFilters || [],
        handle(name, value) {
          dispatch({
            type: `${actionHead}/setFilter`,
            payload: {
              name,
              value,
              type: 'filter',
            },
          });
        },
      },
    };
// 列表的动态配置
    const tableViewProps = {
      tableHeads: configData.tableHeads || [], // 可配置数据列表
      operations: configData.operations || [], // 可配置数据操作
      columns: [],
      dataSource: list,
      total,
      loading,
      pageParam: {
        current: pageParam.page,
        pageSize: pageParam.size,
// 每页面数量回调
        onShowSizeChange: (current, size) => {
          dispatch({
            type: `${actionHead}/fetch`,
            payload: {
              pageParam: {
                page: 1,
                size,
              },
            },
          });
        },
// 翻页回调
        onChange: (current) => {
          dispatch({
            type: `${actionHead}/fetch`,
            payload: {
              pageParam: {
                ...pageParam,
                page: current,
              },
            },
          });
        },
// 搜索回调
        onSearch(value) {
          dispatch({
            type: `${actionHead}/fetch`,
            payload: {
              pageParam: {
                ...pageParam,
                page: 1,
                search: value,
              },
            },
          });
        },
      },
// 排序回调
      sortParamChange(pagination, filters, sorter) {
        if (sorter.field) {
          dispatch({
            type: `${actionHead}/setFilter`,
            payload: {
              value: sorter.order,
              name: sorter.field,
              type: 'sort',
            },
          });
        }
      },
// 操作(编辑,删除)回调
      operationCb(config, data) {
        operation({
          key:config.key,
          type:"operation",
          data
        });
      },
    };
    return (
      <div className="normal">
        <Title name={`当前位置：${title}`} />
        <Header {...headerProps} />
        <Filters {...filtersProps} />
        <TableView {...tableViewProps} />
        {children}
      </div>
    );
  }
}

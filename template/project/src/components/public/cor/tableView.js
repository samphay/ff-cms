import React from 'react'
import {Table, Pagination, Card, Popconfirm, Icon} from 'antd'
import Search from './Search';

//表格组件
const TableView = (props) => {
  let {
    pageParam,
    dataSource,
    columns,
    total,
    loading,
    sortParamChange,
    tableHeads,
    operations,
    operationCb
  } = props;
  let onSearch = pageParam && pageParam.onSearch || null;
  const searchProps = {onSearch};
  //可配置数据通道
  if (tableHeads && (tableHeads instanceof Array)) {
    columns = tableHeads.map(function (value) {
      return {
        title: value.displayName,
        dataIndex: value.fieldName,
        className: 'tableCenter',
        sorter: value.supportSort == "true" ? true : false,
        render: function (text, data) {
          if (value.render) {
            let strData = value.render.replace(/({)(.|\n|\r)*(})/, function (val) {
              try {
                return eval(val.trim().substring(1, val.trim().length - 1));
              }
              catch (e) {
                console.error("表格中" + val.name + '列中的render自定义书写格式有问题');
                return '';
              } // 解决列表某些字段不存在的情况
            });
            return (
              <div dangerouslySetInnerHTML={{__html: strData}}/>
            )
          } else {
            return text;
          }
        }
      };
    });
    if (operations && operations.length != 0) {
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        className: 'tableCenter pointer',
        ele: operations || [],
        operationCb: {}
      });
    }
  }
  if (columns.length == 0) {
    return null;
  }
  columns.unshift({
    title: "序列",
    dataIndex: 'index',
    key: 'index',
    className: 'tableCenter',
    render: (text, data, index) => (index + 1)
  });
  columns.map(function (item, key) {
    if (item.operationCb) {
      item.render = function (text, data, index) {
        return item.ele.map(function (val, index) {
          let isShow = true;
          if (val.access) {
            try {
              isShow = eval(val.access.trim())
            } catch (e) {
              console.error("操作列表中的 " + val.operateName + " 字段权限控制js代码有问题")
            }
          } // 执行
          if (val.icon) {
            return (
              <span
                key={index}
                onClick={
                  operationCb.bind(this, val, data)
                }
                style={
                  {
                    fontSize: "15px",
                    padding: "6px",
                    display: isShow ? "inline-block" : "none"
                  }
                }>
              <Icon type={val.icon}/>
            </span>)
          } else {
            return (
              <span
                style={{display: isShow ? "inline-block" : "none", padding: "5px"}}
                onClick={operationCb.bind(this, val, data)}
                key={index}
              >
                {val.operateName}
              </span>
            )
          }
        })
      };
      return item;
    } else {
      return item;
    }
  });

  return (
    <Card style={{marginTop: 5}}>
      <div style={{marginBottom: -26}}>
        总共有{total ? total : 0}项结果
      </div>
      {
        onSearch ? <Search  {...searchProps}/> : null
      }
      <Table
        columns={columns}
        dataSource={dataSource}
        size="middle"
        loading={loading}
        rowKey={
          (record, index) => index
        }
        onChange={sortParamChange}
        pagination={false}
      />
        {
          pageParam ?
            <Pagination
              className="ant-table-pagination"
              total={total}
              current={pageParam.current}
              showSizeChanger={true}
              onShowSizeChange={pageParam.onShowSizeChange}
              onChange={pageParam.onChange}
            /> : null
        }
    </Card>
  )
};

export default TableView

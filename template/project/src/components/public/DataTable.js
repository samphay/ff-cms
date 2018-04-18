/**
 * Created by wangcuijiao on 2017/5/22.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Table,Pagination, Card } from 'antd'
import Search from './Search';

const DataTable = ({ onChange,onSearch,dataSource,columns,total, ...tableProps }) => {

  const searchProps = {onSearch}

  return (
    <Card style={{ marginTop: 5 }}>
      <div style={{marginBottom:-26}}>总共有{total?total:0}项结果</div>
      <Search {...searchProps}/>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={tableProps.loading}
        size="middle"
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={tableProps.current}
        showSizeChanger = {true}
        pageSizeOptions = {tableProps.pageSizeOptions}
        onShowSizeChange = {onChange}
        onChange={onChange}
      />
    </Card>
  )
}

DataTable.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  dataSource: PropTypes.array,
  columns: PropTypes.array,
}

export default DataTable

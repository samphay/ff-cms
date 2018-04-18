/**
 * Created by wangcuijiao on 2017/3/24.
 */

import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Popconfirm} from 'antd';
import './index.less';
import MenuGroupEditModal from './MenuGroupEditModal';
import MenuGroupSetModal from './MenuGroupSetModal';
import Title from './../../../components/public/Title';
import ButtonHeader from './../../../components/public/ButtonHeader';
import DataTable from './../../../components/public/DataTable';

function MenuGroups({ dispatch,list: dataSource,loading, total, page: current,pageSize}) {

  //删除表格的某一行数据
  function deleteHandler(id) {
    dispatch({
      type: 'menuGroup/remove',
      payload: id,
    });
  }

  //编辑
  function editHandler(record) {
    dispatch({
      type: 'editMenuFormModal/toggleModal',
      payload: {data:Object.assign(record)},
    });
  }

  //设置菜单
  function setMenuHandler(record) {
    dispatch({
      type: 'setMenuFormModal/toggleModal',
      payload: {
        data:Object.assign(record,{visible:true})
      },
    });
  }

  const btnHeaderProps={
    btnText:'新增菜单组',
    //新增
    onBtnAdd(){
      dispatch({
        type: 'editMenuFormModal/showModal',
        payload: {visible:true}
      });
    }
  }

  const dataTableProps = {
    //table属性
    dataSource:dataSource,
    columns: [
      {title: '序号', dataIndex: 'index', key: 'index', className:'tableCenter'},
      {title: '名称', dataIndex: 'name', key: 'name',  className:'tableCenter'},
      {title: '创建时间', dataIndex: 'createTime', key: 'createTime',  className:'tableCenter'},
      {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime',  className:'tableCenter'},
      {title: '操作', key: 'operation',
        render: (text, record) => (
          <span className='operation'>
            <a onClick={editHandler.bind(null, record)}>编辑</a>
            <Popconfirm title="确定删除此菜单组吗?" onConfirm={deleteHandler.bind(null, record.id)} okText="确定" cancelText="取消">
            <a >删除</a>
           </Popconfirm>
          <a onClick={setMenuHandler.bind(null, record)}>设置菜单</a>
        </span>
        ),
      },
    ],
    loading:loading,
    size:"middle",
    pagination:false,
    //分页属性
    total:total,
    current:current,
    showSizeChanger:true,
    pageSizeOptions:['3', '5', '10', '20'],
   //切换页面
    onChange(page,pageSize){
      dispatch(routerRedux.push({
        pathname: '/menuGroup/11',
        query: { page,pageSize },
      }));
    },
    //搜索
    onSearch (value) {
      value.length ? dispatch(routerRedux.push({
        pathname: '/menuGroup/11',
        query: {keyword: value}
      })) : dispatch(routerRedux.push({
        pathname: '/menuGroup/11',
        query: {keyword: ''}
      }))
    }
  }

  return (
    <div className='normal'>
        <Title name="当前位置：系统管理>菜单组管理"/>
        <ButtonHeader {...btnHeaderProps}/>
        <DataTable {...dataTableProps}/>
        <MenuGroupEditModal></MenuGroupEditModal>
        <MenuGroupSetModal></MenuGroupSetModal>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page, pageSize, sortedInfo} = state.menuGroup;
  return {
    loading: state.loading.models.menuGroup,
    list,
    total,
    page,
    pageSize,
    sortedInfo,
  };
}

export default connect(mapStateToProps)(MenuGroups);

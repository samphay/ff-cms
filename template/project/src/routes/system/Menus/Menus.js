import React from 'react';
import { connect } from 'dva';
import {Popconfirm} from 'antd';
import { routerRedux } from 'dva/router';
import Title from './../../../components/public/Title';
import ButtonHeader from './../../../components/public/ButtonHeader';
import DataTable from './../../../components/public/DataTable';
import './system.less';
import AddEditModal from './addEditModal';

function Menus({dispatch,list:dataSource,total,page: current,pageSize,loading,parentData,selfData}) {

  //删除一个菜单
  function deleteHandler(id) {
    console.log(id);
    dispatch({
      type: 'menus/remove',
      payload: { id },
    });
  }

  //点击编辑  显示弹出框
  function editHander(record) {
    dispatch({
      type: 'addEditFormModal/toggleModal',
      payload: {
        visible:true
      },
    });

    dispatch({
      type: 'addEditFormModal/initParentData',
      payload: {
        data:record
      },
    });
  }

  const btnHeaderProps={
    btnText:'新增菜单',
    //新增
    onBtnAdd(){
      dispatch({
        type: 'addEditFormModal/showModal',
        payload: {visible:true}
      });
    }
  }

  const dataTableProps = {
    //table属性
    dataSource:dataSource,
    columns:[
      {title: '序号', dataIndex: 'index', key: 'index',className:'tableCenter'},
      {title: '名称', dataIndex: 'name', key: 'name', className:'tableCenter'},
      {title: '路由信息', dataIndex: 'pageUrl', key: 'pageUrl', className:'tableCenter'},
      {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', className:'tableCenter', render: (text, record) => {return text}},
      {title: '图标', dataIndex: 'pageIcon', key: 'pageIcon', className:'tableCenter', render: (text, record) => {return text}},
      {title: '位置', dataIndex: 'pageUrlStatus', key: 'pageUrlStatus', className:'tableCenter', render: (text, record) => {
        switch (text) {
          case 1:{
            return "新老框架兼容";
            break;
          }
          case 3:{
            return '新框架';
            break;
          }
          default:{
            return '老框架';
            break;
          }
        }
      }},
      {title: '权重', dataIndex: 'orderOn', key: 'orderOn', className:'tableCenter', render: (text, record) => {return text}},
      {title: '操作', key: 'id',className:'tableCenter',
        render: (text, record) => (
          <span className='operation'>
            <a onClick={editHander.bind(null, record)}>编辑</a>
            <Popconfirm title="请确认是否删除?" onConfirm={deleteHandler.bind(null, record.id)}>
             <a href="">删除</a>
            </Popconfirm>
          </span>
        )
      }
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
        pathname: '/menus/11',
        query: { page ,pageSize},
      }));
    },
    //搜索
    onSearch (value) {
      value.length ? dispatch(routerRedux.push({
        pathname: '/menus/11',
        query: {keyword: value}
      })) : dispatch(routerRedux.push({
        pathname: '/menus/11',
        query: {keyword: ''}
      }))
    }
  }


  return (
    <div className='normal menuCss'>
      <Title name="当前位置：系统管理>菜单管理"/>
      <ButtonHeader {...btnHeaderProps}/>
      <DataTable {...dataTableProps}/>
      <AddEditModal >
      </AddEditModal>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page,pageSize } = state.menus;
  return {
    loading: state.loading.models.role,
    list,
    total,
    page,
    pageSize,
  };
}

export default connect(mapStateToProps)(Menus);


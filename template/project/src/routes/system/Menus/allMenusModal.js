import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Icon} from 'antd';
import DataTable from '../../../components/public/DataTable'

function AllMenusModal({dispatch,list:dataSource,total,page: current,pageSize,loading,visible}) {

  function okHandler() {
    dispatch({
      type: 'allMenusTable/initAllMenuData',
      payload: { visible:false },
    });
  }

  function hideModelHandler() {
    dispatch({
      type: 'allMenusTable/hideAllMenusTable',
      payload: { visible:false },
    });
  }


  //选择上级菜单时
  function chooseParentMenu(record) {
    let data = {
      name:record.name,
      id:record.id
    }

    //1、隐藏当前对话框
    dispatch({
      type: 'allMenusTable/hideAllMenusTable',
      payload: { visible:false },
    });

    //修改父对话框中 上级菜单的内容
    dispatch({
      type: 'addEditFormModal/changeSuperior',
      payload: { data },
    });
  }


  const dataTableProps = {
    //table属性
    dataSource:dataSource,
    columns:[
      {title: '序号', dataIndex: 'index', key: 'index', className:'tableCenter'},
      {title: '名称', dataIndex: 'name', key: 'name', className:'tableCenter'},
      {title: '链接地址', dataIndex: 'href', key: 'href', className:'tableCenter'},
      {title: '链接地址', dataIndex: 'scripturl', key: 'scripturl',className:'tableCenter', render: (text, record) => {return text}},
      {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', className:'tableCenter', render: (text, record) => {return text}},
      {title: '图标', dataIndex: 'icon', key: 'icon', className:'tableCenter', render: (text, record) => {return text}},
      {title: '权重', dataIndex: 'orderOn', key: 'orderOn', className:'tableCenter', render: (text, record) => {return text}},
      {title: '操作', key: 'id', className:'tableCenter',
        render: (text, record) => (
          <span className='operation'>
            <Icon type="plus" onClick={chooseParentMenu.bind(null,record)}/>
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
      dispatch({
        type: 'allMenusTable/initAllMenuData',
        payload: { page ,pageSize},
      });
    },
    //搜索
    onSearch (value) {
      value.length ? dispatch({
        type: 'allMenusTable/initAllMenuData',
        payload: {keyword: value}
      }): dispatch({
        type: 'allMenusTable/initAllMenuData',
        payload: {keyword: ''}
      });
    }
  }

  return (
    <div className='clearfix'>
      <Modal
        title="新增菜单"
        visible={visible}
        onOk={okHandler}
        onCancel={hideModelHandler}
        width = {900}
      >
        <DataTable {...dataTableProps}/>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page,pageSize,visible } = state.allMenusTable;
  return {
    loading: state.loading.models.role,
    list,
    total,
    page,
    pageSize,
    visible,
  };
}

export default connect(mapStateToProps)(AllMenusModal);

/**
 * Created by wangcuijiao on 2017/3/24.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import './index.less';
import { Modal, Form,Input,Icon} from 'antd';
import DataTable from './../../../components/public/DataTable'
const FormItem = Form.Item;

function MenuGroupAddModal({dispatch,list:dataSource,total,page: current,pageSize,loading,visible,groupId,menusData}) {

  //增加菜单操作
  function addMenusHandler(record,index){
    let myData=dataSource.slice();
    for(var i=0;i<myData.length;i++){
      if(record.id==myData[i].id){
        myData[i].operate='minus';
      }
    }
    dispatch({
      type: 'addMenuFormModal/updateData',
      payload: {data:myData}
    });
  }

  function okHandler() {
    let myData=menusData.slice(),myMenus=[];
    //原本有的id
    for(var i=0;i<myData.length;i++){
      myMenus.push(myData[i].id)
    }

    for(var i=0;i<dataSource.length;i++){
      if(dataSource[i].operate=='minus'){
        myData.push(dataSource[i]);
        myMenus.push(dataSource[i].id);
      }
    }

    //saveMenus
    dispatch({
      type: 'setMenuFormModal/saveMenus',
      payload: {menusData:myData},
    });

    dispatch({
      type: 'addMenuFormModal/updateMenus',
       payload: {groupId:groupId,menus:myMenus}
    });
  }

  function hideModelHandler() {
    dispatch({
      type: 'addMenuFormModal/hideAllMenusTable',
      payload: { visible:false },
    });
  }

  function onFieldChange() {}

  const dataTableProps = {
    //table属性
    dataSource:dataSource,
    columns:[
      {title: '序号', dataIndex: 'index', key: 'index', className:'tableCenter', render: text => <a href="">{text}</a>},
      {title: '名称', dataIndex: 'name', key: 'name',  className:'tableCenter'},
      {title: '链接地址', dataIndex: 'href', key: 'href', className:'tableCenter'},
      {title: 'js地址', dataIndex: 'scripturl', key: 'scripturl',  className:'tableCenter'},
      {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime',  className:'tableCenter'},
      {title: '图标', dataIndex: 'icon', key: 'icon',  className:'tableCenter'},
      {title: '权重', dataIndex: 'orderOn', key: 'orderOn',  className:'tableCenter'},
      {title: '操作', key: 'operate', key: 'operate',
        render: (text, record,index) => (
          <span className='operation'>
          <a onClick={addMenusHandler.bind(null, record,index)}><Icon type={dataSource[index].operate}/></a>
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
      dispatch({
        type: 'addMenuFormModal/fetchAddMenus',
        payload: { page ,pageSize},
      });
    },
    //搜索
    onSearch (value) {
      value.length ? dispatch({
        type: 'addMenuFormModal/fetchAddMenus',
        payload: {keyword: value},
      }): dispatch({
        type: 'addMenuFormModal/fetchAddMenus',
        payload: {keyword: ''}
      });
    }
  }

  return (
    <div className='clearfix'>
      <Modal
        title="选择菜单"
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
  const { list, total, page,pageSize,visible,iconType,menus } = state.addMenuFormModal;
  const {groupId,menusData}=state.setMenuFormModal;
  return {
    loading: state.loading.models.menuGroup,
    list,
    total,
    page,
    pageSize,
    visible,
    iconType,
    menus,

    groupId,
    menusData
  };
}

export default connect(mapStateToProps)(Form.create()(MenuGroupAddModal));

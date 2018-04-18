/**
 * Created by wangcuijiao on 2017/3/24.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import  './index.less';
import { Modal, Form,Input,Icon} from 'antd';
import DataTable from './../../../components/public/DataTable'
const FormItem = Form.Item;

function MenuGroupRemoveModal({dispatch,list:dataSource,total,page: current,pageSize,loading,visible,groupId,}) {

  //移除菜单操作
  function removeMenusHandler(record,index){
    let myData=dataSource.slice();
    for(var i=0;i<myData.length;i++){
      if(record.id==myData[i].id){
        myData[i].operate='plus';
      }
    }
    dispatch({
      type: 'removeMenuFormModal/updateData',
      payload: {data:myData}
    });
  }

  function okHandler() {
    let myData=[],myMenus=[];
    for(var i=0;i<dataSource.length;i++){
      if(dataSource[i].operate=='minus'){
        myData.push(dataSource[i]);
      }else{
        myMenus.push(dataSource[i].id);
      }
    }

    //saveMenus
   dispatch({
      type: 'setMenuFormModal/saveMenus',
      payload: {menusData:myData},
    });

    dispatch({
      type: 'removeMenuFormModal/updateMenus',
      payload: {groupId:groupId,menus:myMenus}
    });
  }

  function hideModelHandler() {
    dispatch({
      type: 'removeMenuFormModal/hideAllMenusTable',
      payload: { visible:false },
    });
  }

  function onFieldChange() {}

  const dataTableProps = {
    //table属性
    dataSource:dataSource,
    columns:[
      {title: '序号',dataIndex: 'index', key: 'index', className:'tableCenter', render: text => <a href="">{text}</a>},
      {title: '名称', dataIndex: 'name', key: 'name',  className:'tableCenter'},
      {title: '链接地址',dataIndex: 'href', key: 'href',  className:'tableCenter'},
      {title: 'js地址',dataIndex: 'scripturl', key: 'scripturl',  className:'tableCenter'},
      {title: '更新时间',dataIndex: 'updateTime', key: 'updateTime',  className:'tableCenter'},
      {title: '图标', dataIndex: 'icon', key: 'icon', className:'tableCenter'},
      {title: '权重', dataIndex: 'orderOn', key: 'orderOn',  className:'tableCenter'},
      {title: '操作', dataIndex: 'operate', key: 'operate',
        render: (text, record,index) => (
          <span className='operation'>
          <a onClick={removeMenusHandler.bind(null, record,index)}><Icon type={dataSource[index].operate}/></a>
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
        type: 'removeMenuFormModal/fetchRemoveMenus',
        payload: { page ,pageSize},
      });
    },
    //搜索
    onSearch (value) {
      value.length ? dispatch({
        type: 'removeMenuFormModal/fetchRemoveMenus',
        payload: {groupId,keyword: value}
      }): dispatch({
        type: 'removeMenuFormModal/fetchRemoveMenus',
        payload: {groupId,keyword: ''},
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
  const { list, total, page,pageSize,visible,iconType,groupId,menus} = state.removeMenuFormModal;
  return {
    loading: state.loading.models.menuGroup,
    list,
    total,
    page,
    pageSize,
    visible,
    iconType,
    groupId,
    menus,
  };
}


export default connect(mapStateToProps)(Form.create()(MenuGroupRemoveModal));

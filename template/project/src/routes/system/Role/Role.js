import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import  './index.less';
import { Popconfirm,Button, Row, Col,Card} from 'antd'
import Title from './../../../components/public/Title';
import DataTable from './../../../components/public/DataTable';
import RoleModal from './RoleModal';
import TreeModal from './TreeModal';

function Roles({ dispatch,list: dataSource,loading, total, page: current,pageSize ,checkedKeys}) {

  //删除表格的某一行数据
  function deleteHandler(id) {
    dispatch({
      type: 'role/remove',
      payload: id,
    });
  }

  //编辑
  function editHandler(id, values) {
    dispatch({
      type: 'role/patch',
      payload: { id, values },
    });
  }

  //新增
  function createHandler(values) {
    dispatch({
      type: 'role/create',
      payload: values,
    });
  }

  //初始化角色对应的菜单树
  function onloadHandler(id) {
    dispatch({
      type: 'roleMenuTree/fetchMenuTree',
      payload: {id},
    });
  }

  //保存角色对应的菜单树
  function saveMenuTree(id) {
    dispatch({
      type: 'roleMenuTree/saveMenuTree',
      payload: {id,checkedKeys},
    });
  }


  const dataTableProps = {
    //table属性
    dataSource:dataSource,
    columns:[
      {title: '序号', dataIndex: 'index', key: 'index', className:'tableCenter'},
      {title: '名称', dataIndex: 'name', key: 'name', className:'tableCenter'},
      {title: '创建时间', dataIndex: 'createTime', key: 'createTime', className:'tableCenter'},
      {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', className:'tableCenter', render: (text, record) => {return text}},
      {title: '操作', key: 'operation', className:'tableCenter',
        render: (text, record) => (
          <span className='operation'>
          <RoleModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </RoleModal>
          <Popconfirm title="请确认是否删除?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
          <TreeModal  recordId={record.id} onload = {onloadHandler} save = {saveMenuTree}>
            <a>管理</a>
          </TreeModal>
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
        pathname: '/role/11',
        query: { page ,pageSize},
      }));
    },
    //搜索
    onSearch (value) {
      value.length ? dispatch(routerRedux.push({
        pathname: '/role/11',
        query: {keyword: value}
      })) : dispatch(routerRedux.push({
        pathname: '/role/11',
        query: {keyword: ''}
      }))
    }
  }

  return (
    <div className='normal'>
      <Title name="当前位置：系统管理>角色管理"/>
      <Card>
        <Row gutter={24}>
          <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
            <RoleModal record={{}} onOk={createHandler}>
             <Button type="primary">新增角色</Button>
            </RoleModal>
          </Col>
            <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
          </Col>
        </Row>
      </Card>
      <DataTable {...dataTableProps}/>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page,pageSize } = state.role;
  const { checkedKeys} = state.roleMenuTree;
  return {
    loading: state.loading.models.role,
    list,
    total,
    page,
    pageSize,
    checkedKeys
  };
}

export default connect(mapStateToProps)(Roles);

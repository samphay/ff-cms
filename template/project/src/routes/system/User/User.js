import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Icon,Card } from 'antd';
import { routerRedux } from 'dva/router';
import   './index.less';
import { PAGE_SIZE } from '../../../utils/constants';
import Title from './../../../components/public/Title';
import UserModal from './UserModal';
import UserCreateModal from './UserCreateModal';
import UserEditModal from './UserEditModal';

function User({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'user/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/user/11',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'user/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'user/create',
      payload: values,
    });
  }

  function passwordHandler(id, values) {
    dispatch({
      type: 'user/password',
      payload: { id, values },
    });
  }

  function freezeHandler(id, isOpen) {
    dispatch({
      type: 'user/freeze',
      payload: { id, isOpen:parseInt(isOpen)?0:1 },
    });
  }

  function onloadUserCreate(values) {
    dispatch({
      type: 'userCreate/fetchRoles',
      payload: {values},
    });
  }

  function onloadUserEdit(values) {
    dispatch({
      type: 'userEdit/fetchRoles',
      payload: {values},
    });
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      className:'tableCenter',
      render: (text, record, index) => {return index+1},
    },
    {
      title: '用户名',
      dataIndex: 'realname',
      className:'tableCenter',
      key: 'realname',
    },
    {
      title: '登录名',
      dataIndex: 'username',
      className:'tableCenter',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      className:'tableCenter',
      key: 'email',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      className:'tableCenter',
      key: 'updateTime',
    },
    {
      title: '状态',
      dataIndex: 'isOpen',
      className:'tableCenter',
      key: 'isOpen',
      render: text => {return parseInt(text)?"已开启":"已冻结"},
    },
    {
      title: '操作',
      key: 'operation',
      className:'tableCenter',
      render: (text, record) => (
        <span className='operation'>
          <UserEditModal record={record} onload={onloadUserEdit}>
            <a title="编辑"><Icon type="edit" /></a>
          </UserEditModal>
          <Popconfirm title="确定删除吗?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a title="删除" href=""><Icon type="delete" /></a>
          </Popconfirm>
          <UserModal onOk={passwordHandler.bind(null, record.id)}>
            <a title="修改密码"><Icon type="bars" /></a>
          </UserModal>
          <Popconfirm title={parseInt(record.isOpen)?"确定冻结此用户吗?":"确定开启此用户吗?"} onConfirm={freezeHandler.bind(null, record.id, record.isOpen)}>
            <a>{parseInt(record.isOpen)?"冻结用户":"开启用户"}</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className='normal'>
      <Title name="当前位置：系统管理>用户管理"/>
      <Card>
          <UserCreateModal record={{}} onload={onloadUserCreate}>
            <Button type="primary">新增用户</Button>
          </UserCreateModal>
      </Card>
      <Card style={{ marginTop: 5 }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.user;
  return {
    loading: state.loading.models.user,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(User);

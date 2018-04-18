import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Popconfirm} from 'antd'
import {TableView, Title, Header, Filters} from './../../components/public/cor';
function configMenu({location, dispatch, configMenu}) {
//获取的model的参数
  const {list, total, pageParam, loading} = configMenu;
  const actionTypeHead = 'configMenu/';
// 新增按钮配置
  const headerProps = {
    ele:[{
        name:"新增",
        type:"",
        url:""
    }],
    clickFn:function () {
      dispatch(routerRedux.push('menuConfigAdd/0/0/add'));
    }
  };
  //删除表格的某一行数据
  function deleteHandler(id) {
    dispatch({
      type: `${actionTypeHead}remove`,
      payload: id,
    });
  };
  //点击编辑  显示弹出框
  function editHander(record) {
    dispatch(routerRedux.push('menuConfigAdd/'+ record.id+'/'+ record.menuName+'/edit'));
  };
  //点击复制  显示弹出框
  function copyHander(record) {
    dispatch(routerRedux.push('menuConfigAdd/'+ record.id+'/'+ record.menuName+'/copy'));
  };
  // 列表的动态配置
  const tableViewProps = {
    columns: [
      {title: '名称', dataIndex: 'name', key: 'name', className:'tableCenter'},
      {title: '挂载菜单', dataIndex: 'menuName', key: 'menuName', className:'tableCenter'},
      {title: '创建时间', dataIndex: 'updateTime',key: 'updateTime', className:'tableCenter'},
      {title: '操作',  dataIndex: 'operation', key: 'operation', className:'tableCenter',
        render: (text, record) => (
          <span className='operation'>
             <a onClick={editHander.bind(null, record)}>编辑</a>
             <Popconfirm title="请确认是否删除?" onConfirm={deleteHandler.bind(null, record.id)}>
               <a style={{marginLeft: "10px"}} href="">删除</a>
             </Popconfirm>
               <a style={{marginLeft: "10px"}} onClick={copyHander.bind(null, record)}>复制</a>
            </span>
        )
      }
    ],
    dataSource: list,
    total: total,
    loading: loading,
    pageParam: {
      current: pageParam.pageNo,
      pageSize: pageParam.pageSize,
      onShowSizeChange: (current, pageSize) => {
        dispatch({
          type: actionTypeHead + 'fetch',
          payload: {
            pageParam: {
              pageNo: 1,
              pageSize: pageSize,
              keyword: ''
            }
          }
        });
      },
      onChange: (current) => {
        dispatch({
          type: actionTypeHead + 'fetch',
          payload: {
            pageParam: {
              ...pageParam,
              pageNo: current,
            },
          }
        });
      },
      //搜索
      onSearch (value) {
        dispatch({
          type: actionTypeHead + 'fetch',
          payload: {
            pageParam: {
              ...pageParam,
              pageNo: 1,
              keyword: value
            }
          }
        })
      },
    }
  };
  return (
    <div className='normal'>
      <Title name='当前位置：菜单配置管理>菜单配置列表'/>
      <Header {...headerProps}/>
      {/*<Filters {...filtersProps}/>*/}
      <TableView {...tableViewProps}/>
    </div>
  );
}
function mapStateToProps({configMenu}) {
  return {configMenu}
}
export default connect(mapStateToProps)(configMenu);

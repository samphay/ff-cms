/**
 * Created by lqt on 2017/3/1.
 */
import * as rolesService from '../../../services/system/role';
import {openNotice} from './../../../utils'
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'roleMenuTree',
  state: {
    expandedKeys: [],//默认展开指定的树节点
    autoExpandParent: true,//是否自动展开父节点
    checkedKeys: [],//选中复选框的树节点
    selectedKeys: [],//设置选中的树节点
    dataSource:[],
  },
  reducers: {
    save(state, { payload: { dataSource,expandedKeys,autoExpandParent,checkedKeys,selectedKeys} }) {
      return { ...state,
        dataSource:dataSource?dataSource:state.dataSource,
        expandedKeys:expandedKeys?expandedKeys:state.expandedKeys,
        autoExpandParent:autoExpandParent?autoExpandParent:state.autoExpandParent,
        checkedKeys:checkedKeys?checkedKeys:state.checkedKeys,
        selectedKeys:selectedKeys?selectedKeys:state.selectedKeys,
      };
    },

  },
  effects: {
    //查询
    *fetchMenuTree({ payload: { id } }, { call, put }) {
      const { data,checks } = yield call(rolesService.fetchMenuTree, { id });
      yield put({
        type: 'save',
        payload: {
          dataSource:data,
          expandedKeys: [],//默认展开指定的树节点
          autoExpandParent: true,//是否自动展开父节点
          checkedKeys: checks,//选中复选框的树节点
          selectedKeys: [],//设置选中的树节点
        },
      });
    },
    //点击
    *onCheck({ payload: { checkedKeys ,dataSource} }, { call, put }){
      console.log('---点击---');
      yield put({
        type: 'save',
        payload: {
          checkedKeys,
          dataSource
        },
      });
    },

    //选择
    *onSelect({ payload: { selectedKeys ,dataSource} }, { call, put }){
      console.log('---选择---');
      yield put({
        type: 'save',
        payload: {
          selectedKeys,
          dataSource
        },
      });
    },

    //展开
    *onExpand({ payload: { expandedKeys,autoExpandParent,dataSource } }, { call, put }){
      console.log('---展开---');
      yield put({
        type: 'save',
        payload: {
          expandedKeys,
          autoExpandParent,
          dataSource
        },
      });
    },

    //保存角色树
    *saveMenuTree({ payload: { id ,checkedKeys} }, { call, put }){
      console.log('---保存角色树---'+id);
      console.log('---保存角色树---'+checkedKeys);

     var data = yield call(rolesService.saveMenuTree, id,checkedKeys);
      yield put({ type: 'reload' });
      if(data.status==200){
        openNotice('success', '提示', '操作成功');
      }
    },
    *remove({ payload: id }, { call, put }) {
      yield call(rolesService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(rolesService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(rolesService.create, values);
      yield put({ type: 'reload' });
    },
    *pageSizeChanges({ payload: values }, { call, put }) {
      yield call(rolesService.pageSizeChanges, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.role.page);
      const pageSize = yield select(state => state.role.pageSize);
      yield put({ type: 'role/fetch', payload: { page ,pageSize} });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      //当路由发生变化，会触发这个
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/roleMenuTree/:MenuId').exec(pathname);
        if (match) { // 进入页面时候,获取配置系统的参数。
          dispatch({ type: 'fetch', payload: query });
        }
      });

    },
  },
};

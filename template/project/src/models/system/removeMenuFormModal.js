/**
 * Created by wangcuijiao on 2017/3/24.
 */
import * as menuGroupService from '../../services/system/menuGroup';
import {notification } from 'antd'
export default {
  namespace: 'removeMenuFormModal',
  state: {
    list: [],
    total: null,
    page: null,
    pageSize: 10,
    visible:false,
    groupId:'',
  },
  reducers: {

    save(state, { payload: { data: list, total, page, pageSize ,visible,groupId} }) {
      return  {
        ...state,
        list:list?list:state.list,
        total:total?total:state.total,
        page:page?page:state.page,
        pageSize:pageSize?pageSize:state.pageSize,
        visible:visible!=undefined?visible:state.visible,

        groupId:groupId!=undefined?groupId:state.groupId,
      };
    },
  },
  effects: {
    //显示对话框且显示表数据
    *fetchRemoveMenus({ payload: { visible ,groupId,page = 1,pageSize = 10,keyword = ''} }, { call, put }) {
      const srcData = yield call(menuGroupService.fetchRemoveMenus, { groupId,page,pageSize,keyword});
      let myData=[];
      for(var i=0;i<srcData.data.length;i++){
        myData.push(Object.assign(srcData.data[i],{operate:'minus'}))
      }

      yield put({
        type: 'save',
        payload: {
          visible:visible,
          data:myData,
          total: parseInt(srcData.iTotalDisplayRecords, 10),
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
          groupId:groupId,
        },
      });
    },


    *updateData({ payload: { data } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {data:data}
      });
    },


    //更新表单信息
    *updateMenus({ payload: {groupId,menus} }, { call, put }) {
      const responeData = yield call(menuGroupService.updateMenus, {id:groupId,menus});
      if(responeData.status == 200){
        notification['success']({
          message: '消息提示',
          description: '菜单移除成功！',
        });
        yield put({
          type: 'save',
          payload: {
            visible:false,
          },
        });
      }else{
        notification['error']({
          message: '消息提示',
          description: '菜单移除失败！',
        });
      }

    },

    //初始化，请求 所有菜单的数据
    *hideAllMenusTable({ payload: { visible } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          visible:visible,
        },
      });
    },

    *remove({ payload: id }, { call, put }) {
      yield call(menuGroupService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(menuGroupService.patch, id, values);
      yield put({ type: 'reload' });
    },

    *pageSizeChanges({ payload: values }, { call, put }) {
      yield call(menuGroupService.pageSizeChanges, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.addMenuFormModal.page);
      const pageSize = yield select(state => state.addMenuFormModal.pageSize);
      yield put({ type: 'fetchRemoveMenus', payload: { page ,pageSize} });
    },

  },
  subscriptions: {

  },
};

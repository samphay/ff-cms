/**
 * Created by wangcuijiao on 2017/5/24.
 */
import * as menuGroupService from '../../services/system/menuGroup';
import {notification } from 'antd'
export default {
  namespace: 'editMenuFormModal',
  state: {
    visible:false,
    paramsData:{},
  },
  reducers: {
    save(state, { payload }) {
      return {...state, ...payload};
    },
    onchangeFileds(state,action){
      var paramData = state.paramData;
      return {...state, ...paramData}
    }
  },
  effects: {
    //控制弹出框的显示和隐藏
    *showModal({ payload }, { call, put }) {

      yield put({
        type: 'save',
        payload: {
          visible:payload.visible,
          paramsData:{}
        },
      });
    },
    //控制弹出框的显示和隐藏
    *toggleModal({ payload: { data } }, { call, put }){
      yield put({
        type: 'save',
        payload: {
            visible:true,
            paramsData:data
        },
      });
    },
    *onchangeFiled({payload},{select,put}){
      yield put({type: 'onchangeFileds'});
    },
    //保存表单信息
    *saveMenuGroup({ payload: { menuGroup } }, { call, put }) {
      const nameData = yield call(menuGroupService.checkNameExist, { name:menuGroup.name,id:menuGroup.id});
     if(!nameData.data){
       const menuData = yield call(menuGroupService.saveMenuGroup, { menuGroup});
       if(menuData.status==200){
         notification['success']({
           message: '消息提示',
           description: '保存成功！',
         });
         yield put({
           type: 'save',
           payload: {
               visible:false,
           },
         });
         yield put({ type: 'menuGroup/reload' });
       }
     }else
       notification['error']({
         message: '消息提示',
         description:'名称重复！',
       });
    }
  },
  subscriptions: {

  },
};

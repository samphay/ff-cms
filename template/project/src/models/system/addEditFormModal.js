
import * as menusService from '../../services/system/menus';

export default {
  namespace: 'addEditFormModal',
  state: {
    paramsData:{},
    visible:false,
    confirmLoading:false
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
    //初始化 form表单
    *fetch({ payload: { record } }, { call, put }) {
      const data = yield call(menusService.findNameById, { id:record.parentId});
      yield put({type: 'save', payload: {paramsData:data}});
    },
    *changeSuperior({ payload: { data } }, { call, put, select }) {
      var paramsData = yield select(function (state) {
        return state.addEditFormModal.paramsData
      });
      paramsData.parentId = data.id;
      paramsData.parentName = data.name;
      yield put({
        type: 'save',
        payload: {
          paramsData:paramsData
        },
      });
    },
    *onchangeFiled({payload},{select,put}){
      yield put({type: 'onchangeFileds'});
    },

    //保存表单信息
    *saveMenu({ payload: { data } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          data:{
            confirmLoading:true
          }
        },
      });

      yield put({
        type: 'save',
        payload: {
          visible:false,
        },
      });
      const responeData = yield call(menusService.saveMenu, { data});
      //如果保存成功，则隐藏弹出框，刷新表格
      if(responeData.status == 200){
        yield put({
          type: 'save',
          payload: {
              confirmLoading:false
          },
        });
        yield put({ type: 'menus/reload' });
      }

    },
    //控制弹出框的显示和隐藏
    *showModal({ payload }, { call, put }){
      yield put({
        type: 'save',
        payload: {
          visible:payload.visible,
          paramsData:{}
        },
      });
    },

    //控制弹出框的显示和隐藏
    *toggleModal({payload}, { call, put }){
      yield put({
        type: 'save',
        payload: {
           ...payload
        },
      });
    },

    //控制弹出框的显示和隐藏
    *initParentData({ payload: { data } }, { call, put }){
      const parentData = yield call(menusService.findNameById, { id:data.parentId});
      let name = "";
      if(parentData.data){
        name = parentData.data.name;
      }
      yield put({
        type: 'save',
        payload: {
          paramsData:Object.assign(data,{
            parentName:name
          })
        },
      });
    }
  },
  subscriptions: {

  },
};

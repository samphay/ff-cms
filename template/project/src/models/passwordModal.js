import * as iService from '../services/login';

export default {
  namespace: 'passwordModal',
  state: {
    visible:false,
    oldpwd: null,
    newpwd: null,
    newpwd1: null,
    failNote: 'hidden'
  },
  reducers: {

    save(state, { payload: { data} }) {
      return  {
        ...state,
        visible:data.visible!=undefined?data.visible:state.visible,
        oldpwd:data.oldpwd!=undefined?data.oldpwd:state.oldpwd,
        newpwd:data.newpwd!=undefined?data.newpwd:state.newpwd,
        newpwd1:data.newpwd1!=undefined?data.newpwd1:state.newpwd1,
        failNote:data.failNote!=undefined?data.failNote:state.failNote,
      };

    },
  },
  effects: {
    *showModal({ payload: { data } }, { call, put }){
      yield put({
        type: 'save',
        payload: {
          data:{
            visible:data.visible,
            failNote: 'hidden'
          }
        },
      });
    },

    *hideModal({ payload: { data } }, { call, put }){
      yield put({
        type: 'save',
        payload: {
          data:{
            visible:data.visible,
          }
        },
      });
    },

    *password({ payload: { data } }, { call, put }) {
      const responeData = yield call(iService.password, { data });
      if(responeData.status == 200){
        yield put({
          type: 'save',
          payload: {
            data:{
              visible:!responeData.data,
              failNote: responeData.data?'hidden':'visible'
            }
          },
        });
      }
    },
  },
  subscriptions: {

  },
};

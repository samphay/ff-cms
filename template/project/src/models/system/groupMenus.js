
import * as menuGroupService from '../../services/system/menuGroup';

export default {
  namespace: 'groupMenus',
  state: {
    data:[],
    groupMenusIds:null,
  },
  reducers: {
    save(state, { payload: { data,groupMenusIds } }) {
      console.log(data);
      return { ...state, data,groupMenusIds};
    },

  },
  effects: {
    *fetchGroupMenus({ payload: { id } }, { call, put }) {
      const { data} = yield call(menuGroupService.fetchGroupMenus, { id});

      console.log("----fetchGroupMenus--------groupMenusData-----------");
      console.log(data);

      yield put({
        type: 'save',
        payload: {
          data:data,
        },
      });
    },


    //保存GroupMenusIds
    *saveGroupMenusIds({ payload: { id ,groupMenusIds} }, { call, put }){
      console.log('---保存角色树---'+id);
      console.log('---保存角色树---'+groupMenusIds);
      yield call(menuGroupService.saveGroupMenusIds, id,groupMenusIds);
      yield put({ type: 'reload' });

    },



  },
  subscriptions: {

  },
};

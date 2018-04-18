import * as usersService from '../../services/system/user';

export default {
  namespace: 'userEdit',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list };
    },
  },
  effects: {
    *fetchRoles({ payload: {} }, { call, put }) {
      const data = yield call(usersService.getRole, {});
      yield put({
        type: 'save',
        payload: {
          data: data.data,
        },
      });
    },
  },
  subscriptions: {
    /*setup ({dispatch}) {
      dispatch({type: 'fetch'})
    }*/
  },
};

import * as usersService from '../../services/system/user';

export default {
  namespace: 'userCreate',
  state: {
    list: [],
    realname: null,
    username: null,
    password: null,
    password_re: null,
    email: null,
    role: null,
    description: null,
    createTime: null,
  },
  reducers: {
    save(state, { payload: { data: list, realname, username, password, password_re, email, role, description, createTime } }) {
      return { ...state, list, realname, username, password, password_re, email, role, description, createTime };
    },
  },
  effects: {
    *fetchRoles({ payload: { realname, username, password, password_re, email, role, description, createTime } }, { call, put }) {
      const data = yield call(usersService.getRole, {});
      yield put({
        type: 'save',
        payload: {
          data: data.data,
          realname,
          username,
          password,
          password_re,
          email,
          role,
          description,
          createTime,
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

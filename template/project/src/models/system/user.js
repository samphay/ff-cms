import * as usersService from '../../services/system/user';
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'user',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const data = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.data,
          total: parseInt(data.iTotalDisplayRecords, 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *password({ payload: { id, values } }, { call, put }) {
      yield call(usersService.password, id, values);
      yield put({ type: 'reload' });
    },
    *freeze({ payload: { id, isOpen } }, { call, put }) {
      yield call(usersService.freeze, id, isOpen);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.user.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/user/:MenuId').exec(pathname);
        if (match) { // 进入页面时候,获取配置系统的参数。
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};

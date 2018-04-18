
import * as menusService from '../../services/system/menus';
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'menus',
  state: {
    list: [],
    total: null,
    page: null,
    pageSize: 10,
  },
  reducers: {
    save(state, { payload: { data: list, total, page, pageSize } }) {
      return { ...state, list, total, page ,pageSize };
    },
  },
  effects: {
    *fetch({ payload: { page = 1,pageSize = 10,keyword = '' } }, { call, put }) {
      const srcData= yield call(menusService.fetch, { page , pageSize,keyword});
      yield put({
        type: 'save',
        payload: {
          data:srcData.data,
          total: parseInt(srcData.iTotalDisplayRecords, 10),
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(menusService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(menusService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(menusService.create, values);
      yield put({ type: 'reload' });
    },
    *pageSizeChanges({ payload: values }, { call, put }) {
      yield call(menusService.pageSizeChanges, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.menus.page);
      const pageSize = yield select(state => state.menus.pageSize);
      yield put({ type: 'fetch', payload: { page ,pageSize} });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      //当路由发生变化，会触发这个
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/menus/:MenuId').exec(pathname);
        if (match) { // 进入页面时候,获取配置系统的参数。
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};

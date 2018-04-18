import * as menuGroupService from '../../services/system/menuGroup';
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'menuGroup',
  state: {
    list: [],
    total: null,
    page: null,      //当前页号
    pageSize:10,   //每页的个数
    sortedInfo:null,  //字段排序
    groupMenusData:[],
  },
  reducers: {
    save(state, { payload: { data: list, total, page, pageSize, sortedInfo,groupMenusData} }) {
      return { ...state, list, total, page ,pageSize, sortedInfo,groupMenusData };
    },
  },
  effects: {
    *fetch({ payload: { page = 1,pageSize = 10,keyword = '' } }, { call, put }) {
      const srcData = yield call(menuGroupService.fetch, { page , pageSize,keyword});
      yield put({
        type: 'save',
        payload: {
          data:srcData.data,
          total: parseInt(srcData.iTotalDisplayRecords, 10),
          page: parseInt(page, 10),
          pageSize:pageSize,
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
    *create({ payload: values }, { call, put }) {
      yield call(menuGroupService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.menuGroup.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/menuGroup/:MenuId').exec(pathname);
        if (match) { // 进入页面时候,获取配置系统的参数。
          dispatch({ type: 'fetch', payload: query });
        }
      });

    },
  },
};

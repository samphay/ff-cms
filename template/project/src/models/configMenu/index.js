import * as configMenu from '../../services/configMenu/index.js';
import pathToRegexp from 'path-to-regexp'
export default {
  namespace: 'configMenu',
  state: {
    list: [],
    loading: false, // 列表的展示蒙层的标识
    pageParam: { // 分页+名称筛选的参数
      pageNo: 1,
      pageSize: 10,
      keyword: ''
    },
    // configData: {}, // 界面的配置参数
    total: 0, // 列表的总数
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    showLoading(state, {payload}){
      return {...state, loading: true};
    },
    hideLoading(state, {payload}){
      return {...state, loading: false};
    },
    setConfig(state, action) {
      return {...state, configData: action.payload.configData, filterParam: action.payload.filterParam};
    },
    selelctFliter(state, action){
      return {...state, configData: action.payload.configData};
    }
  },
  effects: {
    *fetch({payload}, {call, put, select}) {
      yield put({type: 'showLoading'});
      const srcData = yield call(configMenu.fetch, {...payload});
      yield put({
        type: 'save',
        payload: {
          ...payload,
          list: srcData.data,
          total: parseInt(srcData.iTotalDisplayRecords, 10),
        },
      });
      yield put({type: 'hideLoading'});
    },
    *reload(action, { put, select }) {
      const pageParam = yield select(state => state.configMenu.pageParam);
      yield put({ type: 'fetch', payload: {pageParam} });
    },
    *remove({payload}, {call, put, select}) {
      const data = yield call(configMenu.deleteFn, {payload});
      if(data.status==200){
        yield put({ type: 'reload' });
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        const match = pathToRegexp('/menuConfig/:MenuId').exec(location.pathname);
        if (match) { // 进入页面时候,获取配置系统的参数。
          dispatch({
            type: 'fetch',
            payload: {
              pageParam: {
                pageNo: 1,
                pageSize: 10,
              }
            }
          });
        }
      });
    },
  },
};

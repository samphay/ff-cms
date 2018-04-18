import * as menusService from '../../services/system/menus';

export default {
  namespace: 'allMenusTable',
  state: {
    list: [],
    total: null,
    page: null,
    pageSize: 10,
    visible: false
  },
  reducers: {
    save(state, {payload: {data: list, total, page, pageSize, visible, vs}}) {
      return {
        ...state,
        list: list ? list : state.list,
        total: total ? total : state.total,
        page: page ? page : state.page,
        pageSize: pageSize ? pageSize : state.pageSize,
        visible: visible != undefined ? visible : state.visible,
      };
    },
  },
  effects: {
    //初始化，请求 所有菜单的数据
    * initAllMenuData({payload: {visible, page = 1, pageSize = 10, keyword = ''}}, {call, put}) {
      const srcData = yield call(menusService.findAllMenusData, {page, pageSize, keyword});
      yield put({
        type: 'save',
        payload: {
          visible: visible,
          data: srcData.data,
          total: parseInt(srcData.iTotalDisplayRecords, 10),
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
        },
      });
    },

    //初始化，请求 所有菜单的数据
    * hideAllMenusTable({payload: {visible}}, {call, put}) {
      console.log(visible);
      yield put({
        type: 'save',
        payload: {
          visible: visible,
        },
      });
    }

  },
  subscriptions: {},
};

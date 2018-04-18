/**
 * Created by wangcuijiao on 2017/3/24.
 */

import * as menuGroupService from '../../services/system/menuGroup';

export default {
  namespace: 'setMenuFormModal',
  state: {
    visible: false,

    menusGroupName: '', //菜单组名字
    menusData: [],  //菜单信息数据 已经存在的
    groupId: '',    //同一个groupId下有多个菜单

  },
  reducers: {

    save(state, {payload: {data}}) {

      return {
        ...state,
        visible: data.visible != undefined ? data.visible : state.visible,

        menusGroupName: data.menusGroupName != undefined ? data.menusGroupName : state.menusGroupName,
        menusData: data.menusData != undefined ? data.menusData : state.menusData,
        groupId: data.groupId != undefined ? data.groupId : state.groupId,
      };

    },
  },
  effects: {
    //控制弹出框的显示和隐藏
    * toggleModal({payload: {data}}, {call, put}) {
      const menusData = yield call(menuGroupService.fetchMenuInfo, {id: data.id});
      yield put({
        type: 'save',
        payload: {
          data: {
            visible: data.visible,
            menusData: menusData.data,
            menusGroupName: data.name,
            groupId: data.id
          }

        },
      });
    },

    //保存新的菜单
    * saveMenus({payload: {menusData}}, {call, put}) {
      yield put({
        type: 'save',
        payload: {
          data: {
            menusData: menusData,
          }
        },
      });
    },

  },
  subscriptions: {},
};

import {routerRedux} from 'dva/router';
import {userInfo, logout, getGroups, userMenus} from '../services/login';
import {parse} from 'qs'
import {linkMaps} from '../constants';

const ancestor = {};
let pathname = "";
let current = "";
let Reg = /^#\/([^\?]+)/;
let MenuIdReg = /\/?([0-9][0-9a-zA-Z]{23})/;
const checkPathName = Reg.exec(location.hash);
const CurrentIdData = MenuIdReg.exec(location.hash);
if(checkPathName){
  pathname = checkPathName[1];
}
if(CurrentIdData){
  current = CurrentIdData[1];
}
export default {
  namespace: 'app',
  state: {
    current,
    openKeys: [],
    groups: [],
    userMenus: [],
    pathname,
    user: {
      name: 'admin'
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'queryUser'});
      dispatch({type: 'userMenus'});
    }
  },
  effects: {
    * queryUser({payload}, {call, put}) {
      const data = yield call(userInfo, parse(payload));
      if (data.status == 200) {
        const username = localStorage.getItem('username');
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: username
            }
          }
        })
      }
      else {
        yield put(routerRedux.push({
          pathname: '/login',
          query: {},
        }));
      }
    },
    * logout({payload}, {call, put}) {
      const data = yield call(logout, parse(payload));
      if (data.status == 302) {
        yield put(routerRedux.push({
          pathname: '/login',
          query: {},
        }));
      }
    },
    * getGroups({payload}, {call, put}) {
      const data = yield call(getGroups, parse(payload));
      if (data.status == 200) {
        yield put({
          type: 'groups',
          payload: {
            groups: data.data
          }
        })
      }
    },
    * userMenus({payload}, {call, put, select}) {
      const {pathname,current} = yield select((state)=>{
        return state.app;
      });
      const data = yield call(userMenus, parse(payload));
      if (data.status == 200) {
        let menus = data.data.data;
        yield put({
          type: 'groups',
          payload: {
            userMenus: menus
          }
        });
        const openKeys = [];
        if(menus){
          outer:
            for(let i in menus){
              if(menus.hasOwnProperty(i)){
                const items = menus[i];
                if(items.children){
                  for(let j in items.children){
                    if(items.children.hasOwnProperty(j)){
                      const item = items.children[j];
                      let key = item.id;
                      if(key===current){
                        openKeys.push(items.id);
                        break outer;
                      }
                    }
                  }
                }
              }
            }
        }
        /*menus&&menus.map((items)=>{
          if(items.children){
            items.children.map((item)=>{
              // let key = `/${item.pageUrl}/${item.id}`;
              let key = `${item.id}`;
              if(key==current){
                openKeys.push(items.id);

              }
              ancestor[key] = {
                parentId: items.id,
                parentName: items.name,
                pageId: item.id,
                pageName: item.name
              }
            })
          }
        });*/
        yield put({
          type:"save",
          payload:{
            openKeys
          }
        });
        /*if(ancestor[pathname]){
          yield put({
            type:"save",
            payload:{
              openKeys:[ancestor[pathname].parentId],
              current:ancestor[pathname].pageId
            }
          });
        }*/
      }
    },
    * openMenu({payload}, {put}) {
      yield put({
        type: 'open',
        payload: {
          openKeys: payload.openKeys
        }
      })
    },
    * clickItem({payload}, {put}) {
      yield put({
        type: 'click',
        payload: {
          current: payload.current
        }
      })
    },
    * pathname({payload}, {put}) {
      yield put({
        type: 'save',
        payload: {
          pathname: payload.pathname
        }
      })
    },
  },
  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    open(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    click(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    groups(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}

import { routerRedux } from 'dva/router';
import {login} from '../services/login';
import {parse} from 'qs'

export default {
  namespace: 'login',
  state: {
    visibility: 'hidden',
    user: {
      name: ''
    },
  },
  subscriptions: {

  },
  effects: {
    *login ({ payload }, {call, put,select}) {
      const data = yield call(login, parse(payload))
      if (data.msg=="OK") {
        console.log("login ok");
        localStorage.setItem('username',payload.username);
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: payload.username
            }
          }
        });
        yield put({
          type: 'app/loginSuccess',
          payload: {
            user: {
              name: payload.username
            }
          }
        });
        // yield put({ type: 'app/getGroups', payload: {} });
        yield put({ type: 'app/userMenus', payload: {} });
        yield put(routerRedux.push({
          pathname: '/',
          query: {},
        }));
      } else {
        console.log("login fail")
        yield put({
          type: 'loginFail'
        })
      }
    },
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        visibility: 'hidden'
      }
    },
    loginFail (state) {
      return {
        ...state,
        visibility: 'visible'
      }
    },
  }
}

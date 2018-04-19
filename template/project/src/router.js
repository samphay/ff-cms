import React from 'react';
import {Router} from 'dva/router';
import App from './components/Layout';
import Login from './components/Login';

export default function ({history, app}) {

  const cached = {};

  function registerModel(app, model) {
    if (!cached[model.namespace]) {
      app.model(model);
      cached[model.namespace] = 1;
    }
  }
  const configRoutes = [];
  const routes = [
    {
      path: '/login',
      app: app,
      component: Login,
      getIndexRoute(nextState, cb) {
        registerModel(app, require("./models/login"));
        cb(null, {component: Login})
      }
    },
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        cb(null, {component: require('./routes/home/IndexPage')})
      },
      childRoutes: [
        {
          path: '/menus/:MenuId',
          name: '菜单管理',
          getIndexRoute(nextState, cb) {
            // require.ensure([], require => {
            registerModel(app, require("./models/system/menus"));
            registerModel(app, require("./models/system/addEditFormModal"));
            registerModel(app, require("./models/system/allMenusTable"));
            cb(null, {component: require("./routes/system/Menus/Menus")})
            // })
          }
        },
        {
          path: '/menuGroup/:MenuId',
          name: '菜单组管理',
          getIndexRoute(nextState, cb) {
            // require.ensure([], require => {
            registerModel(app, require("./models/system/menuGroup"));
            registerModel(app, require("./models/system/editMenuFormModal"));
            registerModel(app, require("./models/system/setMenuFormModal"));
            registerModel(app, require("./models/system/addMenuFormModal"));
            registerModel(app, require("./models/system/removeMenuFormModal"));
            cb(null, {component: require("./routes/system/MenuGroup/MenuGroup")})
            // })
          }
        },
        {
          path: '/role/:MenuId',
          name: '角色管理',
          getIndexRoute(nextState, cb) {
            // require.ensure([], require => {
            registerModel(app, require("./models/system/role"));
            registerModel(app, require("./models/system/role/roleMenuTree"));
            cb(null, {component: require("./routes/system/Role/Role")})
            // })
          }
        },
        {
          path: '/user/:MenuId',
          name: '用户管理',
          getIndexRoute(nextState, cb) {
            // require.ensure([], require => {
            registerModel(app, require("./models/system/user"));
            registerModel(app, require("./models/system/userCreate"));
            registerModel(app, require("./models/system/userEdit"));
            cb(null, {component: require("./routes/system/User/User")})
            // })
          }
        },
        {
          path: '/menuConfig/:MenuId',
          name: '菜单配置列表',
          getIndexRoute(nextState, cb) {
            // require.ensure([], require => {
            registerModel(app, require("./models/configMenu/index"));
            cb(null, {component: require("./routes/configMenu/index")})
            // })
          }
          ,
        },
        {
          path: "/menuConfigAdd/:MenuId/:name/:type",
          name: '菜单配置-新增',
          getIndexRoute(nextState, cb) {
            // require.ensure([], require => {
            registerModel(app, require("./models/configMenu/add"));
            cb(null, {component: require("./routes/configMenu/add")})
            // })
          },
        },
        ...configRoutes,
        {
          path: "*",
          component: ({location}) => {
            return <div>【{location.pathname}】正在努力开发……</div>
          }
        }
      ]
    }
  ];
  return <div>
    <Router history={history} routes={routes}/>
  </div>
}

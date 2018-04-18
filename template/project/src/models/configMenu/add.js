import {getConfig, savePageConfigure, getMenus} from '../../services/configMenu/add'
import {openNotice} from '../../utils'
import pathToRegexp from 'path-to-regexp'
import {hashHistory} from 'dva/router'

export default {
  namespace: 'menuConfigAdd',
  state: {
    visible:false,
    tempDetail:{}, //临时数据详情
    detail: {}, // 首页列表编辑信息
    muenId:'', //菜单ID
    muenName:"", //菜单名称
    detailLoading: true,
    menus:[],
    // 静态数据
    filterItem: [ // 筛选类型
      {
        "text": "输入框(string)",
        "value": "string"
      }, {
         "text": "时间(timepicker)",
         "value": "timepicker"
      },
      {
        "text": "时间段(timepickers)",
        "value": "timepickers"
      },
      {
         "text": "接口(select)",
         "value": "selectUrl"
      },{
        "text": "静态数据(selectData)",
        "value": "selectData"
      }
    ], // 筛选条件
    formatTime: [ // 时间格式筛选类型
      {
        "text": "YYYY-MM-DD",
        "value": "YYYY-MM-DD"
      }, {
        "text": "YYYY/MM/DD",
        "value": "YYYY/MM/DD"
      },
      {
        "text": "YYYY-MM-DD HH:mm:ss",
        "value": "YYYY-MM-DD HH:mm:ss"
      },
      {
        "text": "YYYY/MM/DD HH:mm:ss",
        "value": "YYYY/MM/DD HH:mm:ss"
      },
      {
        "text": "timestamp(时间戳)",
        "value": "timestamp"
      }], // 筛选条件
    filterArr:[{
        name:'',
        filed:'',
        type:'',
        defaultValue:'',
        multiple:'',
        url:''
    }], // 筛选数组
    bottonItem: [ // 筛选类型
      {
        "text": "add",
        "value": "add"
      }, {
        "text": "url",
        "value": "url"
      }],
    bottonArr:[{
      name:'',
      type:'',
      url:''
    }],
    tableHeadArr:[
      {
        displayName:'',
        fieldName:'',
        supportSort:false,
        render:''
      }
    ],
    operateInfoArr:[
      {
        operateName: "编辑",
        icon: "icon-img",
        key: ""
      }
    ],
  },
  subscriptions: {
    setup({dispatch, history}, done) {
      history.listen(function (location) {
        const match = pathToRegexp('/menuConfigAdd/:MenuId/:name/:type').exec(location.pathname);

        if (match) {
          dispatch({type: 'getMenus'});
          if( match[1]== 0 ) {
            dispatch({type: 'init'});
          } else {
            dispatch({ // 获取首页配置信息
              type: 'getConfigs',
              payload: {
                id:match[1],
                muenName :match[2],
                type:match[3]
              }
            });
          }
        }
      });
    }
  },
  effects: {
    // 初始化
    *init({payload}, {call, put}){
      yield put({
        type: 'initData',
        payload: {
          muenId:"", //菜单ID
          muenName:"新增", //菜单名称
          detail:{},
          filterArr:[], // 筛选数组
          bottonArr:[],
          tableHeadArr:[],
          operateInfoArr:[]
        }
      });
    },
    // 获取菜单配置信息
    *getMenus({payload}, {call, put}){
      const data = yield call(getMenus, payload);

      if (data.data) {
        var datas = data.data.map(function (data) {
            var obj = {};
            obj.label = data.name;
            obj.value = data.id;
            // obj.children= data.children.map(function (value) {
            //   var objs={};
            //   objs.label = value.text;
            //   objs.value = value.id;
            //   return objs;
            // });
          return obj
        });
        datas.unshift({label:"请选择",value:''})
        yield put({
          type: 'setMenus',
            payload: {
              menus: datas|| {},
            }
           }
        )}
    },
    // 获取菜单配置信息
    *getConfigs({payload}, {call, put,select}){
      const data = yield call(getConfig, payload);
      if(payload.type=='copy'){
        data.data.id='';
        data.data.menuId='';
        data.data.name='';
      }
      if (data.status == 200) {
        let tempDetail=JSON.parse(JSON.stringify(data.data));
        delete tempDetail.id;
        delete tempDetail.menuId;
        delete tempDetail.name;
          yield put({
            type: 'getdetail',
            payload: {
              tempDetail:tempDetail,
              detail: data.data || {},
              filterArr : data.data.paramFilters,
              tableHeadArr : data.data.tableHeads,
              bottonArr : data.data.buttonInfo,
              operateInfoArr : data.data.operations
            }
          });
        yield put({
          type: 'hideDetailLoading'
        })}
    },
    // 保存临时数据
    *saveTem({payload}, {call, put,select}){
      let detail = yield select(state=>{
        return state.menuConfigAdd.detail
      });
      yield put({
        type: 'getdetail',
        payload: {
          visible:false,
          detail: {
            ...detail,
            ...payload.tempDetail
          },
          filterArr : payload.tempDetail.paramFilters,
          tableHeadArr : payload.tempDetail.tableHeads,
          bottonArr : payload.tempDetail.buttonInfo,
          operateInfoArr : payload.tempDetail.operations
        }
      });
    },
    // 保存菜单配置信息
    *add({payload}, {call, put}){
      const data = yield call(savePageConfigure,payload);
      if (data.status == 200) {
        openNotice('success', '提示', "保存成功");
        hashHistory.goBack();
      }else {
        openNotice('error', '保存失败', data.msg);
      }
    },
    *managerItem({payload},{select,put}){
      yield put({
        type: 'managerItems',
        payload
      });
    },
    // onchange
    *onchangeFiled({payload},{select,put}){
      yield put({
        type: 'onchangeFileds',
        payload
      });
    },

  },
  reducers: {
    initData(state, action){
      return {...state, ...action.payload}
    },
    getdetail(state, action){
      return {...state, ...action.payload}
    },
    hideDetailLoading(state){
      return {...state, detailLoading: false}
    },
    setMenus(state, action){
      return {...state, ...action.payload}
    },
    managerItems(state,action){
      var {filterArr,tableHeadArr,bottonArr, operateInfoArr} = state;
      switch (action.payload.action){
        case 'filterItemAdd' :{
          filterArr.splice(action.payload.idx+1, 0, {name:'', filed:'', type:'string'});
          break ;
        }
        case 'filterItemDelete' :{
          filterArr.splice(action.payload.idx, 1);
          break ;
        }
        case 'tableItemAdd' :{
          tableHeadArr.splice(action.payload.idx+1, 0, {
            displayName:'',
            fieldName:'',
            supportSort:"false",
            render:''});
          break ;
        }
        case 'tableItemDelete' :{
          tableHeadArr.splice(action.payload.idx, 1);
          break ;
        }
        case 'buttonItemAdd' :{
          bottonArr.splice(action.payload.idx+1, 0, {name:'', url:'', type:''});
          break ;
        }
        case 'buttonItemDelete' :{
          bottonArr.splice(action.payload.idx, 1);
          break ;
        }
        case 'operateInfoAdd' :{
          operateInfoArr.splice(action.payload.idx+1,0, {
            operateName: "",
            icon: "",
            key: ""
          });
          break ;
        }
        case 'operateInfoDelete' :{
          operateInfoArr.splice(action.payload.idx, 1);
          break ;
        }
      };
      return {...state, ...filterArr, ...tableHeadArr, ...bottonArr,...operateInfoArr}
    },
    onchangeFileds(state,action){
      var bottonArr = state.bottonArr;
      return {...state, ...bottonArr}
    },
  }
}

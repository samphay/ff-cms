/**
 * CopyRight Samphay.
 * 2017/12/31
 */
"use strict";
import {ajax} from "../services";
import {openNotice} from "../utils";
import pathToRegexp from "path-to-regexp/index";

export const effects = function (props) {
  const {
    namespace,
    type,
    needFirstFetch=true,
    setFetchSendData,
    setFetchResult,
    setAddProps,
    setDeleteProps,
    setConfigFieldsValue=[]
  } = props;
  return {
    /**
     * indexTable 获取数据通用方法
     * @param payload
     * @param call
     * @param put
     * @param select
     */
      * fetch({ payload }, { call, put, select }) {
      const configData = yield select((state) => {
        return state[namespace];
      });
      let { pageParam } = payload||{};
      yield put({ type: 'loading' });
      pageParam = Object.assign({},configData.pageParam, pageParam);
      const paramData = {
        ...pageParam,
        ...configData.filterParam
      };
      const sendData = setFetchSendData(paramData);
      let srcData = {};
      if(sendData){
        srcData = yield call(ajax,
          configData.configData.url,
          sendData,
        );
      }
      yield put({
        type: 'save',
        payload: {
          ...payload,
          ...setFetchResult(srcData,paramData),
          pageParam
        },
      });
      yield put({ type: 'loading' });
    },
    /**
     * 筛选条件
     * @param payload
     * @param select
     * @param put
     */
      * setFilter({ payload },{select,put}){
      const {name:key,value,type} = payload;
      const configData = yield select((state) => {
        return state[namespace];
      });
      const {filterParam,pageParam} = configData;
      if(type==="filter"){
        filterParam[key] = value;
      }else if(type==="sort"){
        filterParam.key = key;
        filterParam.value = value === 'ascend' ? 'asc' : 'desc';
      }
      yield put({
        type:"save",
        payload:{
          filterParam
        }
      });
      yield put({
        type:"fetch",
        payload:{
          pageParam
        }
      })
    },
    /**
     * 添加数据
     * @param payload
     * @param call
     * @param select
     * @param put
     */
      * add({ payload },{call,select,put}){
      const {url,type,setSendData,fixData} = setAddProps;
      const configData = yield select(function (state) {
        return state[namespace];
      });
      const pageParam = configData.pageParam;
      const data = yield call(ajax, url, setSendData(payload),type||"post");
      const ret = fixData(data);
      const {isSuccess,success,successMsg,fail,failedMsg} = ret;
      if (isSuccess) {
        if(success){
          yield success({call,select,put});
        }
        yield put({type: 'fetch', payload: {pageParam}});
        openNotice('success', '提示', successMsg||"保存成功");
      } else {
        if(fail){
          fail();
        }
        openNotice('error', '保存失败', failedMsg);
      }
    },
    /**
     * 删除数据
     * @param payload
     * @param call
     * @param select
     * @param put
     */
      * delete({ payload },{call,select,put}){
      const {url,type,setSendData,fixData} = setDeleteProps;
      const configData = yield select(function (state) {
        return state[namespace];
      });
      const pageParam = configData.pageParam;
      const data = yield call(ajax, url, setSendData(payload),type||"post");
      const ret = fixData(data);
      const {isSuccess,success,successMsg,fail,failedMsg} = ret;
      if (isSuccess) {
        if(success){
          yield success({call,select,put});
        }
        yield put({type: 'fetch', payload: {pageParam}});
        openNotice('success', '提示', successMsg||"删除成功");
      } else {
        if(fail){
          fail();
        }
        openNotice('error', '删除失败', failedMsg);
      }
    },
    /**
     * 获取配置信息
     * @param payload
     * @param call
     * @param put
     */
      * getConfig({ payload }, { call, put }) {
      const data = yield call(ajax,
        '/xbase/pageConfigure/getPageConfigureByMenuId',
        {
          menuId: payload.MenuId,
        },
      );
      const filterParam = {};
      if (data.data) {
        const { paramFilters } = data.data;
        for (const id in paramFilters) {
          if(paramFilters.hasOwnProperty(id)){
            const Filters = paramFilters[id];
            filterParam[Filters.field] = '';
            if(setConfigFieldsValue.length>0){
              setConfigFieldsValue.map(({key,value})=>{
                if(Filters.field==key){
                  filterParam[Filters.field] = value;
                  data.data.paramFilters[id].default = value
                }
              })
            }
            if (Filters.type === 'selectUrl') {
              try {
                const filterData = yield call(ajax, Filters.url);
                let {data:ret} = filterData;
                if(!(ret instanceof Array)){
                  for(let key in ret){
                    if(ret.hasOwnProperty(key)){
                      if(ret[key] instanceof Array){
                        Filters.selectData  = ret[key];
                      }
                    }
                  }
                }else{
                  Filters.selectData = ret;
                }
              } catch (e) {
                Filters.selectData = [];
              }
            } else if (Filters.type === 'selectData') {
              try {
                Filters.selectData = JSON.parse(Filters.url.replace(/\s/g, ''));
              } catch (e) {
                Filters.selectData = [];
              }
            }
          }
        }
        if (data.status === 200) {
          yield put({ type: 'save', payload: { configData: data.data, filterParam } });
          if(needFirstFetch){
            yield put({ type: 'fetch', payload: { pageParam: { page: 1, size: 10, search: '' } } });
          }
        }
      }
    },
    * buttonGetFetch({payload}, {call, put, select}) {
      const data = yield call(ajax, payload.url);
      if (data && data.status*1 === 200) {
        openNotice('success', '提示', '操作成功');
      } else {
        openNotice('error', '操作失败', data && data.msg || 'fail');
      }
    },
  }
};


export const fetch = (props) => {
  const { namespace, setSendData, setResult, url ,loadingName} = props;
  return function* ({ payload }, { call, put, select }) {
    yield put({
      type:"save",
      payload:{
        [loadingName]:true
      }
    });
    const configData = yield select((state) => {
      return state[namespace];
    });
    const {sendData,saveData} = yield setSendData.call(props,{payload, state: configData},{ call, put, select });
    const srcData = yield call(ajax,
      url,
      sendData
    );
    const resultData = yield setResult.call(props,{data: srcData, saveData},{ call, put, select });
    yield put({
      type: 'save',
      payload: {
        ...payload,
        ...resultData,
        [loadingName]:false
      },
    });
  }
};

export const post = (props) => {
  return function* (action, {call, select, put}) {
    const {payload} = action;
    const {url, type, setSendData, setResult} = props;
    const sendData = setSendData.call(props,payload)
    if(!sendData){
      return false
    }
    const data = yield call(ajax, url, sendData, type || "post");
    const ret = setResult.call(props,data);
    const {
      isSuccess = (data)=>data.return_code==1000,
      success,
      successMsg,
      fail,
      failedMsg
    } = ret;
    if (isSuccess) {
      if (success) {
        const successFn = yield success({call, select, put});
        if(successFn){
          yield successFn;
        }
      }
      if(successMsg){
        openNotice('success', '提示', successMsg || "操作成功");
      }
    } else {
      if (fail) {
        yield fail({call, select, put});
      }
      if(failedMsg){
        openNotice('error', '操作失败', failedMsg);
      }
    }
  }
};

export const subscriptions = function (props) {
  const {namespace} = props;
  return {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        const match = pathToRegexp(`/${namespace}/:MenuId`).exec(location.pathname);
        if (match) {
          dispatch({
            type: 'getConfig',
            payload: { MenuId: match[1] },
          });
        }
      });
    },
  }
};

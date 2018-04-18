/**
 * CopyRight Samphay.
 * 2018/3/29
 */
import React from 'react';
import {connect} from 'dva';
import Index from './../../Index';
import {Modal} from "antd";
import Add from "./add";
import style from './index.less';

const namespace = "vodActiveManage";

function PageComponent(props) {
  const {dispatch, state} = props;
  const {formData, addModalVisible} = state;
  const handlePools = {
    add(data) {
      dispatch({
        type: namespace + `/openAddModal`,
        payload: {
          ...data
        }
      })
    },
    edit(data) {
      dispatch({
        type: namespace + `/openAddModal`,
        payload: {
          ...data
        }
      })
    },
    del(data) {
      Modal.confirm({
        content:"你确定要删除这条数据吗？",
        onOk(){
          dispatch({
            type: namespace + `/delete`,
            payload: {
              ...data
            }
          })
        }
      })
    },
    offLine(data) {
      Modal.confirm({
        content:"你确定要下线吗？",
        onOk(){
          dispatch({
            type: namespace + `/changeRelease`,
            payload: {
              ...data,
              saleStatus:0
            },
          })
        }
      })
    },
    publish(data) {
      Modal.confirm({
        content:"你确定要发布吗？",
        onOk(){
          dispatch({
            type: namespace + `/changeRelease`,
            payload: {
              ...data,
              saleStatus:1
            },
          })
        }
      })
    }
  };
  return (
    <Index
      {...props}
      handlePools={handlePools}
      title={"活动管理>首开活动"}
      actionHead={namespace}
    >
      <Add
        dispatch={dispatch}
        namespace={namespace}
        state={
          {
            ...state,
            formData,
            visible: addModalVisible
          }
        }
      />
    </Index>
  );
}

function propsMap(state) {
  return {state: state[namespace]};
}

export default connect(propsMap)(PageComponent);

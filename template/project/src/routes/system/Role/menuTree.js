/**
 * Created by lqt on 2017/3/1.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import  './index.less';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
let a = 1;

function menuTree({ dispatch,expandedKeys,autoExpandParent,checkedKeys,selectedKeys,roleID,onload,dataSource}) {

  //点击三角展开
  const onExpand = (expandedKeys) => {
    dispatch({
      type:'roleMenuTree/onExpand',
      payload:{
        expandedKeys,
        autoExpandParent:false,
        dataSource

      }
    });
  };

  //点击多选框 选择
  const onCheck = (checkedKeys) => {
    console.log(checkedKeys);
    dispatch({
      type:'roleMenuTree/onCheck',
      payload:{checkedKeys,dataSource}
    });
  };

  //点击文字选择
  const onSelect = (selectedKeys, info) => {
    dispatch({
      type:'roleMenuTree/onSelect',
      payload:{selectedKeys,dataSource}
    });
  };



  const loop = data => data&&data.map((item) => {
    if (item.children) {
      return (
        <TreeNode key={item.id} title={item.text} >
          {loop(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.id} title={item.text}/>;
  });


  return (
    <div className='normal'>

        <Tree
          checkable
          onExpand={onExpand.bind(this)} expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck.bind(this)} checkedKeys={checkedKeys}
          onSelect={onSelect.bind(this)} selectedKeys={selectedKeys}
        >
          {loop(dataSource)}

        </Tree>
    </div>
  );
}

function mapStateToProps(state) {

  const { expandedKeys,autoExpandParent,checkedKeys,selectedKeys,dataSource} = state.roleMenuTree;
  return {
    expandedKeys,
    autoExpandParent,
    checkedKeys,
    selectedKeys,
    dataSource
  };
}

export default connect(mapStateToProps)(menuTree);

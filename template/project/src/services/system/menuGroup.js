/**
 * Created by wangcuijiao on 2017/2/24.
 */
import {request} from '../../utils/request';
import {CADILLAC_URL} from '../../utils/constants'

//查询
export function fetch({ page,pageSize, keyword }) {
  var pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":keyword});
  var tmpData = request(CADILLAC_URL+'/menuGroup/getPage?page='+pages, {
    credentials:'include',
    mode: 'no-cors',
  },{
    current:page,
    pageSize:pageSize
  });

  return tmpData;
}

//删除
export function remove(id) {
  return request(CADILLAC_URL+'/menuGroup/delete?id='+id, {
    method: 'GET',
    credentials:'include',
    mode: 'no-cors',
  });
}

//编辑
export function patch(id, values) {
  var menuGroup = JSON.stringify({"id":id,"name":values.name,"description":values.description,"createTime":values.createTime,"updateTime":values.updateTime});
  return request(CADILLAC_URL+'/menuGroup/save?menuGroup='+menuGroup, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

//创建
export function create({name,description}) {
  var menuGroup = JSON.stringify({"name":name,"description":description});
  return request(CADILLAC_URL+'/menuGroup/save?menuGroup='+menuGroup, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

//重构
//菜单信息 通过 父级菜单的ID 查询菜单信息
export function fetchMenuInfo({ id }) {
  var tmpData = request(CADILLAC_URL+'/menuGroup/getGroupMenus?id=' + id, {
    credentials:'include',
    mode: 'no-cors',
  });
  return tmpData;
}

//查询ParentMenus所有数据  添加菜单
export function fetchAddMenus({ page,pageSize,keyword }) {
  var pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":keyword});
  var tmpData = request(CADILLAC_URL+'/menuController/getPageParentMenusByGroup?page=' + pages, {
    credentials:'include',
    mode: 'no-cors',
  },{
    current:page,
    pageSize:pageSize
  });

  return tmpData;
}
//更新菜单
export function updateMenus({ id,menus }) {
  let params;
  if(menus!==null&&menus.length!=0){
    let myMenus = '["';
    for(let i = 0;i<menus.length;i++){
      myMenus = myMenus + menus[i] + '","';
    }
    myMenus = myMenus + '"]';
    myMenus = myMenus.replace(',""','');

    params = 'id=' + id + '&menus='+myMenus;
  }else{
    let myMenus = '[]';
    params = 'id=' + id + '&menus='+myMenus;
  }

  return request(CADILLAC_URL+'/menuGroup/updateMenus', {
    credentials:'include',
    mode: 'no-cors',
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params,
  });
}

//查询ParentMenus所有数据  移除菜单
export function fetchRemoveMenus({ groupId,page,pageSize,keyword }) {
  var pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":keyword});
  var tmpData = request(CADILLAC_URL+'/menuController/getPageParentMenusByGroup?page=' + pages+'&groupId='+groupId, {
    credentials:'include',
    mode: 'no-cors',
  },{
    current:page,
    pageSize:pageSize
  });

  return tmpData;
}

//检查名称是否重名
export function checkNameExist({ name,id }) {
  var tmpData = request(CADILLAC_URL+'/menuGroup/checkName?name='+name+'&id='+id, {
    credentials:'include',
    mode: 'no-cors',
  });
  return tmpData;
}

//编辑菜单保存
export function saveMenuGroup({ menuGroup }) {
  var menuGroups = JSON.stringify(menuGroup);
  var tmpData = request(CADILLAC_URL+'/menuGroup/save?menuGroup='+menuGroups, {
    credentials:'include',
    mode: 'no-cors',
  });
  return tmpData;
}




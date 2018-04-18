import {request,requestTree} from '../../utils/request';
import {CADILLAC_URL} from '../../utils/constants'

//查询数据
export function fetch({ page,pageSize,keyword }) {
  var pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":keyword});
  var tmpData = request(CADILLAC_URL+'/roleController/getPageRoles?page='+pages, {
    credentials:'include',
    mode: 'no-cors',
  },{
    current:page,
    pageSize:pageSize
  });

  return tmpData;
}

//查询角色对应的菜单树
export function fetchMenuTree({ id }) {
  return requestTree(CADILLAC_URL+'/roleController/getMenuTreeForRole?roleId='+id, {
    credentials:'include',
    mode: 'no-cors',

    method: 'GET',
  });
}

//删除
export function remove(id) {
  return request(CADILLAC_URL+'/roleController/delRole?id='+id, {
    method: 'GET',
    credentials:'include',
    mode: 'no-cors',
  });
}

//编辑
export function patch(id, values) {
  var role = JSON.stringify({"id":id,"name":values.name,"description":values.description,"createTime":values.createTime,"updateTime":values.updateTime});
  return request(CADILLAC_URL+'/roleController/saveRole?role='+role, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

//保存角色
export function create({name,description}) {
  var role = JSON.stringify({"name":name,"description":description});
  return request(CADILLAC_URL+'/roleController/saveRole?role='+role, {
    credentials:'include',
    mode: 'no-cors',

    method: 'GET',
  });
}
//保存角色的菜单树
export function saveMenuTree(id,checks) {

  let grants = '["';
  for(let i = 0;i<checks.length;i++){
    grants = grants + checks[i] + '","';
  }
  grants = grants + '"]';
  grants = grants.replace(',""','');

  let params = 'roleId=' + id + '&grants='+grants;
  return request(CADILLAC_URL+'/roleController/saveGrant', {
    credentials:'include',
    mode: 'no-cors',
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:params,
  });
}


//页数更改
export function pageSizeChanges({page,pageSize}) {
  var pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":""});
  var tmpData = request(CADILLAC_URL+'/roleController/getPageRoles?page='+pages, {
    credentials:'include',
    mode: 'no-cors',
  });

  return tmpData;
}

import {request} from '../../utils/request';
import {CADILLAC_URL} from '../../utils/constants'

//菜单管理 查询数据
export function fetch({ page,pageSize,keyword }) {
  let pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":keyword});
  return request(CADILLAC_URL+'/menuController/getPageMenus?page='+pages, {
    credentials:'include',
    mode: 'no-cors',
  },{
    current:page,
    pageSize:pageSize
  });

}


//菜单管理 通过 父级菜单的ID 查询父级菜单的名字
export function findNameById({ id }) {
  var tmpData = request(CADILLAC_URL+'/menuController/getMenuById?id='+id, {
    credentials:'include',
    mode: 'no-cors',
  });
  return tmpData;
}


//查找所有的菜单的数据
export function findAllMenusData({ page,pageSize,keyword }) {
  var pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":keyword});
  var tmpData = request(CADILLAC_URL+'/menuController/getPageAllParentMenus?page='+pages, {
    credentials:'include',
    mode: 'no-cors',
  },{
    current:page,
    pageSize:pageSize
  });
  return tmpData;
}

//保存菜单
export function saveMenu({ data }) {

  for(let key in data){
    if(data[key] == ''){
      delete data[key];
    }
  }
  var menu = JSON.stringify(data);
  var tmpData = request(CADILLAC_URL+'/menuController/saveMenu?menu='+menu, {
    credentials:'include',
    mode: 'no-cors',
  });

  return tmpData;
}


//菜单管理 删除
export function remove(id) {
  return request(CADILLAC_URL+'/menuController/delMenu?id='+id.id, {
    method: 'GET',
    credentials:'include',
    mode: 'no-cors',
  });
}

//菜单管理 编辑
export function patch(id, values) {
  var role = JSON.stringify({"id":id,"name":values.name,"description":values.description,"createTime":values.createTime,"updateTime":values.updateTime});
  return request(CADILLAC_URL+'/roleController/saveRole?role='+role, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

//菜单管理 保存菜单
export function create({name,description}) {
  var role = JSON.stringify({"name":name,"description":description});
  return request(CADILLAC_URL+'/roleController/saveRole?role='+role, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}



//菜单管理 页数更改
export function pageSizeChanges({page,pageSize}) {
  var pages = JSON.stringify({"size":pageSize,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":""});
  var tmpData = request(CADILLAC_URL+'/roleController/getPageRoles?page='+pages, {
    credentials:'include',
    mode: 'no-cors',
  });

  return tmpData;
}

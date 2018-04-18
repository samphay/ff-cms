import {request} from '../../utils/request';
import {CADILLAC_URL,PAGE_SIZE} from '../../utils/constants'

export function fetch({ page }) {
  var pages = JSON.stringify({"size":PAGE_SIZE,"page":page-1,"key":"updateTime","value":"desc","echo":1,"search":""});

  return request(CADILLAC_URL+'/userController/getPageUsers?page='+pages, {
    credentials:'include',
    mode: 'no-cors',
  });
}

export function remove(id) {
  return request(CADILLAC_URL+'/userController/delUser?id='+id, {
    method: 'GET',
    credentials:'include',
    mode: 'no-cors',
  });
}

export function patch(id, values) {
  let data = {"id":id,"realname":values.realname,"username":values.username,"roles":values.role};
  if (values.email)
  {
    data.email = values.email;
  }
  if (values.createTime)
  {
    data.createTime = values.createTime;
  }
  if (values.desc)
  {
    data.desc = values.desc;
  }
  let user = JSON.stringify(data);
  return request(CADILLAC_URL+'/userController/saveUser?user='+user, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

export function password(id, values) {
  return request(CADILLAC_URL+'/userController/updatePassword?id='+id+"&password="+values.password, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

export function freeze(id, flag) {
  return request(CADILLAC_URL+'/userController/updateIsOpen?id='+id+"&isOpen="+flag, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

export function create(values) {
  let data = {"realname":values.realname,"username":values.username,"password":values.password,"roles":values.role};
  if (values.email)
  {
    data.email = values.email;
  }
  if (values.createTime)
  {
    data.createTime = values.createTime;
  }
  if (values.desc)
  {
    data.desc = values.desc;
  }
  let user = JSON.stringify(data);
  return request(CADILLAC_URL+'/userController/saveUser?user='+user, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

export function create1({values}) {
  var user = JSON.stringify({"id":values.id,"realname":values.realname,"username":values.username,"email":values.email,"createTime":values.createTime,"roles":values.roles,"desc":values.desc});
  return request(CADILLAC_URL+'/userController/saveUser?user='+user, {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

export function getRole() {
  return request(CADILLAC_URL+'/roleController/getAllRoles', {
    credentials:'include',
    mode: 'no-cors',
    method: 'GET',
  });
}

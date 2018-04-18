import {request, requestSny} from '../../utils/request'
import {BASE_URL} from '../../utils/constants'
//查询数据
export function fetch(params, filters, url) {
  var param = params.pageParam;
  var pages = JSON.stringify({
    'size': param.pageSize,
    'page': param.pageNo - 1,
    'key': 'updateTime',
    'value': 'desc',
    'echo': 1,
    'search': param.keyword || ''
  });
  return request(BASE_URL+'/pageConfigure/getPageConfigureByPage?page=' + pages, {
    method: 'GET',
    credentials:'include',
    mode: 'no-cors'
  }, {
    current: param.pageNo,
    pageSize: param.pageSize
  });
}

//保存根据角色获取菜单
export function deleteFn(param) {
  var tmpData = request(BASE_URL+'/pageConfigure/deletePageConfigure?id=' + param.payload, {
    credentials:'include',
    mode: 'no-cors'
  });
  return tmpData;
}

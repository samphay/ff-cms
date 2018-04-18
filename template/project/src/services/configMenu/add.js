import {request} from '../../utils/request';
import {BASE_URL} from '../../utils/constants'
import {obj2params} from '../../utils/index'
//根据栏目的内容获取对应的配置
export function getConfig({ id }) {
    var tmpData = request(BASE_URL+'/pageConfigure/getPageConfigureById?id=' + id, {
      credentials: 'include',
      mode: 'no-cors',
    });
    return tmpData;
}
//保存根据菜单id获取配置数据
export function savePageConfigure(param) {

    let params = {
      pageConfigure:JSON.stringify(param)
    };
    return request(BASE_URL+'/pageConfigure/savePageConfigure', {
      credentials:'include',
      mode: 'no-cors',
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body:obj2params(params),
    });
    return tmpData;
}
//保存根据角色获取菜单
export function getMenus(param) {
    var tmpData = request(BASE_URL+'/pageConfigure/getMenuInfos', {
      credentials:'include',
      mode: 'no-cors'
    });
    return tmpData;
}

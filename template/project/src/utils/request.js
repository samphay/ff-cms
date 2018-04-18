import fetch from 'dva/fetch';
let checkedID = [];
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function getCheckedID(data) {
  for(let i = 0;i<data.length;i++){
    if(data[i].checked){
      checkedID.push(data[i].id);
    }
    if(data[i].children){
      getCheckedID(data[i].children);
    }
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param custom
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options, custom) {
  const response = await fetch(url, options);
  checkStatus(response);
  let data ;
  try {
    data = await response.json()
  }catch(e){
    console.error(e)
  }
  if(!data.data){
    data.data = [];
  }
  if(custom){
    let count = custom.pageSize * (custom.current - 1) + 1;
    if(data.data!=null){
      for(let i = 0;i<data.data.length;i++){
        data.data[i]['index'] = count++;
      }
    }
  }
  if (data.status==503){
    return document.location = './#/login';
    // return browserHistory.push('/#/login');
  }
    //

  return data;
}
/*

export  async function requestTree(url, options, custom) {
  const response = await fetch(url.replace('/api','system'), options);
  const data = await response.json();
  if(custom){
    let count = custom.pageSize * (custom.current - 1) + 1;
    for(let i = 0;i<data.data.length;i++){
      data.data[i]['index'] = count++;
    }
  }
  if (data.status==503){
    return document.location = './#/login';
    // return browserHistory.push('/#/login');
  }
    // document.location = './#/login';

  checkedID = [];
  getCheckedID(data);
  const ret = {data:data, headers: {}, checks:checkedID};
  ret.headers['totalCount'] = data.iTotalDisplayRecords;
  return ret;
}

export  async function requestHierarchy(url, options, custom) {
  const response = await fetch(url, options);

  const data = await response.json();
  if(custom){
    let count = custom.pageSize * (custom.current - 1)+0;  //注意此特例，index从0开始
    for(let i = 0;i<data.appHierarchyList.length;i++){
      data.appHierarchyList[i]['index'] = count++;
    }
  }
  if (data.status==503){
    return document.location = './#/login';
    // return browserHistory.push('/#/login');
  }

    // document.location = './#/login';
  const ret = {data:data, headers: {}};
  ret.headers['totalCount'] = data.appHierarchyList.length;
  return ret;
}

export  async function requestSoft(url, options, custom) {
  const response = await fetch(url, options);

  const data = await response.json();
  if(custom){
    let count = custom.pageSize * (custom.current - 1) + 1;
    for(let i = 0;i<data.data.result.length;i++){
      data.data.result[i]['index'] = count++;
    }
  }
  if (data.status==503){
    return document.location = './#/login';
    // return browserHistory.push('/#/login');
  }
    // document.location = './#/login';
  const ret = {data:data.data.result, headers: {}};
  ret.headers['totalCount'] = data.data.totalCount;
  return ret;
}
*/



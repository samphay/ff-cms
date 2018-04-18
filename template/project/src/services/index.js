/**
 * CopyRight Samphay.
 * 2017/12/13
 */
"use strict";
import {request} from "../utils/request";
import {obj2params, paramSny} from "../utils";

export async function ajax(url, data, type) {
  if (!url) {
    return false
  }
  type = type || 'GET';
  type = type.toLocaleUpperCase();
  let BODY = {};
  if (type == 'GET') {
    url = url + '?' + paramSny(data)
  } else {
    BODY = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: obj2params(data)
    }
  }
  return request(url, Object.assign({
    credentials: 'include', mode: 'no-cors', method: type
  }, BODY));
}

import {request} from '../utils/request'
import {CADILLAC_URL, UPGRADE_URL, DEBUG, menuGroupId} from '../constants'

export function login (params) {
  return request(CADILLAC_URL+'/login/login?username='+params.username+'&password='+params.password, {
    method: 'GET',
    mode: 'no-cors',
    credentials:'include'
  })
}

export function password ({data}) {
  return request(CADILLAC_URL+'/userController/updateCurrentUserPassword?oldPassword='+data.oldpwd+'&newPassword='+data.newpwd, {
    method: 'GET',
    mode: 'no-cors',
    credentials:'include'
  })
}

export function logout (params) {
  return request(CADILLAC_URL+'/login/logout', {
    method: 'GET',
    mode: 'no-cors',
    credentials:'include'
  })
}

export function userInfo (params) {
  return request(CADILLAC_URL+'/buttonController/getButtonsAuthorized', {
    method: 'GET',
    mode: 'no-cors',
    credentials:'include'
  })
}

export function getGroups (params) {
  return request(CADILLAC_URL+'/menuGroup/getNonemptyGroups', {
    method: 'GET',
    mode: 'no-cors',
    credentials:'include'
  })
}

export function userMenus (params) {
    return request(CADILLAC_URL+'/menuController/getUserMenus?menuGroupId='+(menuGroupId), {
      method: 'GET',
      mode: 'no-cors',
      credentials:'include'
    })
}

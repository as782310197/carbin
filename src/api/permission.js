import { axios } from '@/utils/request'

const api = {
  permissionPage: '/system/moduleAction/findPage',
  permissionSave: '/system/moduleAction/save'
}

export default api

export function getPermissionPage (parameter) {
  return axios({
    url: api.permissionPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function permissionSave (parameter) {
  return axios({
    url: api.permissionSave,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveUser (parameter) {
  return axios({
    url: api.saveUser,
    method: 'post',
    data: parameter
  })
}

export function getUserInfo (parameter) {
  return axios({
    url: api.userInfo,
    method: 'post',
    data: parameter
  })
}

export function removeUser (parameter) {
  return axios({
    url: api.removeUser,
    method: 'post',
    data: parameter
  })
}

import { axios } from '@/utils/request'

const api = {
  userPage: '/system/user/findPage',
  saveUser: '/system/user/save',
  userInfo: '/system/user/get',
  removeUser: '/system/user/remove'
}

export default api

export function getUserPage (parameter) {
  return axios({
    url: api.userPage,
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

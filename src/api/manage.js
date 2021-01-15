import { axios } from '@/utils/request'

const api = {
  rolePage: '/system/role/findPage',
  roleInfo: '/system/role/get',
  removeRole: '/system/role/delete',
  getPermissonData: '/system/moduleAction/getPermissonData',
  roleList: '/system/role/findList',
  saveRole: '/system/role/save'
}

export default api

export function getRoleList (parameter) {
  return axios({
    url: api.roleList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getRolePage (parameter) {
  return axios({
    url: api.rolePage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getRoleInfo (parameter) {
  return axios({
    url: api.roleInfo,
    method: 'post',
    data: parameter
  })
}

export function removeRole (parameter) {
  return axios({
    url: api.removeRole,
    method: 'post',
    data: parameter
  })
}

export function getPermissonData (parameter) {
  return axios({
    url: api.getPermissonData,
    method: 'post',
    data: parameter
  })
}

export function saveRole (parameter) {
  return axios({
    url: api.saveRole,
    method: 'post',
    data: parameter
  })
}

import { axios } from '@/utils/request'

const api = {
  personList: '/basis/bizEnterprisestaff/findList',
  personPage: '/basis/bizEnterprisestaff/findPage',
  savePerson: '/basis/bizEnterprisestaff/save',
  personInfo: '/basis/bizEnterprisestaff/get',
  removePreson: '/basis/bizEnterprisestaff/remove'
}

export default api

export function getPersonList (parameter) {
  return axios({
    url: api.personList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getPersonPage (parameter) {
  return axios({
    url: api.personPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function savePerson (parameter) {
  return axios({
    url: api.savePerson,
    method: 'post',
    data: parameter
  })
}

export function getPresonInfo (parameter) {
  return axios({
    url: api.personInfo,
    method: 'post',
    data: parameter
  })
}

export function removePreson (parameter) {
  return axios({
    url: api.removePreson,
    method: 'post',
    data: parameter
  })
}

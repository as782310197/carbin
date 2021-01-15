import { axios } from '@/utils/request'

const api = {
  enterpriseList: '/basis/bizEnterprise/findList',
  enterprisePage: '/basis/bizEnterprise/findPage',
  saveEnterprise: '/basis/bizEnterprise/save',
  enterpriseInfo: '/basis/bizEnterprise/get',
  removeEnterprise: '/basis/bizEnterprise/remove'
}

export default api

export function getEnterpriseList (parameter) {
  return axios({
    url: api.enterpriseList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getEnterprisePage (parameter) {
  return axios({
    url: api.enterprisePage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveEnterprise (parameter) {
  return axios({
    url: api.saveEnterprise,
    method: 'post',
    data: parameter
  })
}

export function getEnterpriseInfo (parameter) {
  return axios({
    url: api.enterpriseInfo,
    method: 'post',
    data: parameter
  })
}

export function removeEnterprise (parameter) {
  return axios({
    url: api.removeEnterprise,
    method: 'post',
    data: parameter
  })
}

import { axios } from '@/utils/request'

const api = {
  icpList: '/basis/bizDevices/findList',
  icpPage: '/basis/bizDevices/findPage',
  saveIcp: '/basis/bizDevices/save',
  icpInfo: '/basis/bizDevices/get',
  removeIcp: '/basis/bizDevices/remove'
}

export default api

export function getIcpList (parameter) {
  return axios({
    url: api.icpList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getIcpPage (parameter) {
  return axios({
    url: api.icpPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveIcp (parameter) {
  return axios({
    url: api.saveIcp,
    method: 'post',
    data: parameter
  })
}

export function getIcpInfo (parameter) {
  return axios({
    url: api.icpInfo,
    method: 'post',
    data: parameter
  })
}

export function removeIcp (parameter) {
  return axios({
    url: api.removeIcp,
    method: 'post',
    data: parameter
  })
}

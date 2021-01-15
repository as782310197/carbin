import { axios } from '@/utils/request'

const api = {
  supervisionBidList: '/project/bizSupervisionSection/findList',
  supervisionBidPage: '/project/bizSupervisionSection/findPage',
  saveSupervisionBid: '/project/bizSupervisionSection/save',
  supervisionBidInfo: '/project/bizSupervisionSection/get',
  removeSupervisionBid: '/project/bizSupervisionSection/remove'
}

export default api

export function getSupervisionBidList (parameter) {
  return axios({
    url: api.supervisionBidList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSupervisionBidPage (parameter) {
  return axios({
    url: api.supervisionBidPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveSupervisionBid (parameter) {
  return axios({
    url: api.saveSupervisionBid,
    method: 'post',
    data: parameter
  })
}

export function getSupervisionBidInfo (parameter) {
  return axios({
    url: api.supervisionBidInfo,
    method: 'post',
    data: parameter
  })
}

export function removeSupervisionBid (parameter) {
  return axios({
    url: api.removeSupervisionBid,
    method: 'post',
    data: parameter
  })
}

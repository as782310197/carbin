import { axios } from '@/utils/request'

const api = {
  constructionBidList: '/project/bizConstructionSection/findList',
  constructionBidPage: '/project/bizConstructionSection/findPage',
  saveConstructionBid: '/project/bizConstructionSection/save',
  constructionBidInfo: '/project/bizConstructionSection/get',
  removeConstructionBid: '/project/bizConstructionSection/remove'
}

export default api

export function getConstructionBidList (parameter) {
  return axios({
    url: api.constructionBidList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getConstructionBidPage (parameter) {
  return axios({
    url: api.constructionBidPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveConstructionBid (parameter) {
  return axios({
    url: api.saveConstructionBid,
    method: 'post',
    data: parameter
  })
}

export function getConstructionBidInfo (parameter) {
  return axios({
    url: api.constructionBidInfo,
    method: 'post',
    data: parameter
  })
}

export function removeConstructionBid (parameter) {
  return axios({
    url: api.removeConstructionBid,
    method: 'post',
    data: parameter
  })
}

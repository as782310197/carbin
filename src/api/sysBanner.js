import { axios } from '@/utils/request'
// 代理结构模块
const api = {
  findSysBannerPage: '/system/sysBanner/findSysBannerPage',
  getSysBanner: '/system/sysBanner/get',
  removeSysBanner: '/system/sysBanner/remove',
  saveSysBanner: '/system/sysBanner/save'
}

export default api

export function getSysBannerPage (parameter) {
  return axios({
    url: api.findSysBannerPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSysBannerInfo (parameter) {
  return axios({
    url: api.getSysBanner,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function removeSysBanner (parameter) {
  return axios({
    url: api.removeSysBanner,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveSysBanner (parameter) {
  return axios({
    url: api.saveSysBanner,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

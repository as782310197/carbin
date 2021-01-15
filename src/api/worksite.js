import { axios } from '@/utils/request'

const api = {
  worksiteList: '/project/bizConstructionPoint/findList',
  worksitePage: '/project/bizConstructionPoint/findPage',
  saveWorksite: '/project/bizConstructionPoint/save',
  worksiteInfo: '/project/bizConstructionPoint/get',
  removeWorksite: '/project/bizConstructionPoint/remove'
}

export default api

export function getWorksiteList (parameter) {
  return axios({
    url: api.worksiteList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getWorksitePage (parameter) {
  return axios({
    url: api.worksitePage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveWorksite (parameter) {
  return axios({
    url: api.saveWorksite,
    method: 'post',
    data: parameter
  })
}

export function getWorksiteInfo (parameter) {
  return axios({
    url: api.worksiteInfo,
    method: 'post',
    data: parameter
  })
}

export function removeWorksite (parameter) {
  return axios({
    url: api.removeWorksite,
    method: 'post',
    data: parameter
  })
}

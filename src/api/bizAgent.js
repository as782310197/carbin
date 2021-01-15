import { axios } from '@/utils/request'
// 代理结构模块
const api = {
  findBizAgentPage: '/biz/bizAgent/findBizAgentPage',
  findBizAgent: '/biz/bizAgent/get',
  removeBizAgent: '/biz/bizAgent/remove',
  saveBizAgent: '/biz/bizAgent/save'
}

export default api

export function getfindBizAgentPage (parameter) {
  return axios({
    url: api.findBizAgentPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getfindBizAgent (parameter) {
  return axios({
    url: api.findBizAgent,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function removeBizAgent (parameter) {
  return axios({
    url: api.removeBizAgent,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveBizAgent (parameter) {
  return axios({
    url: api.saveBizAgent,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

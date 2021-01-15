import { axios } from '@/utils/request'
// 企业相关接口
const api = {
  findBizEnterprisePage: '/biz/bizEnterprise/findBizEnterprisePage',
  findBizEnterprise: '/biz/bizEnterprise/get',
  removeBizEnterprise: '/biz/bizEnterprise/remove',
  saveBizEnterprise: '/biz/bizEnterprise/save',
  qualityPassBizEnterprise: '/biz/bizEnterprise/qualityPass',
  qualityRejectBizEnterprise: '/biz/bizEnterprise/qualityReject'
}

export default api

export function getfindBizEnterprisePage (parameter) {
  return axios({
    url: api.findBizEnterprisePage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getfindBizEnterprise (parameter) {
  return axios({
    url: api.findBizEnterprise,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function removeBizEnterprise (parameter) {
  return axios({
    url: api.removeBizEnterprise,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveBizEnterprise (parameter) {
  return axios({
    url: api.saveBizEnterprise,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function qualityPassBizEnterprise (parameter) {
  return axios({
    url: api.qualityPassBizEnterprise,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function qualityRejectBizEnterprise (parameter) {
  return axios({
    url: api.qualityRejectBizEnterprise,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

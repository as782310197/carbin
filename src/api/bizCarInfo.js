import { axios } from '@/utils/request'
// 车辆管理相关接口
const api = {
	// 车辆管理
	findCarInfoPage: '/biz/bizCarInfo/findCarInfoPage', // 获取车辆信息分页
	updateCarInfo: '/biz/bizCarInfo/updateCarInfo', // 更新车辆信息
	auditPassCarInfo: '/biz/bizCarInfo/auditPassCarInfo', // 审核通过
	auditRejectCarInfo: '/biz/bizCarInfo/auditRejectCarInfo', // 审核不通过
	// 车主管理（会员）
	findMemberPage: '/biz/bizMember/findMemberPage', // 获取车主信息分页
  updateBizMember: '/biz/bizMember/updateBizMember', // 更新车辆信息
  memberAuthPass: '/biz/bizMember/memberAuthPass', // 车主认证通过
  memberAuthFailed: '/biz/bizMember/memberAuthFailed' // 车主认证不通过
}

export default api

export function auditPassCarInfo (parameter) {
  return axios({
    url: api.auditPassCarInfo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function auditRejectCarInfo (parameter) {
  return axios({
    url: api.auditRejectCarInfo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function findCarInfoPage (parameter) {
  return axios({
    url: api.findCarInfoPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function updateCarInfo (parameter) {
  return axios({
    url: api.updateCarInfo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function findMemberPage (parameter) {
  return axios({
    url: api.findMemberPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function updateBizMember (parameter) {
  return axios({
    url: api.updateBizMember,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function memberAuthPass (parameter) {
  return axios({
    url: api.memberAuthPass,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function memberAuthFailed (parameter) {
  return axios({
    url: api.memberAuthFailed,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

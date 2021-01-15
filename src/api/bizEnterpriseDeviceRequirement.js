import { axios } from '@/utils/request'
// 设备需求相关接口
const api = {
	// 设备需求管理
	findBizEnterpriseDeviceRequirementPage: '/biz/bizEnterpriseDeviceRequirement/findBizEnterpriseDeviceRequirementPage', // 获取设备需求分页
	getBizEnterpriseDeviceRequirement: '/biz/bizEnterpriseDeviceRequirement/get', // 获取（查看）设备需求
	getDeviceRecord: '/biz/bizEnterpriseDeviceRequirement/getDeviceRecord', // 获取巡查记录
	removeBizEnterpriseDeviceRequirement: '/biz/bizEnterpriseDeviceRequirement/remove', // 删除设备需求
  saveBizEnterpriseDeviceRequirement: '/biz/bizEnterpriseDeviceRequirement/save', // 保存设备需求
  platformAuditPass: '/biz/bizEnterpriseDeviceRequirement/platformAuditPass', // 平台审核通过
  platformAuditReject: '/biz/bizEnterpriseDeviceRequirement/platformAuditReject', // 平台审核不通过
  enterpriseAuditPass: '/biz/bizEnterpriseDeviceRequirement/enterpriseAuditPass', // 企业审核通过
  enterpriseAuditReject: '/biz/bizEnterpriseDeviceRequirement/enterpriseAuditReject' // 企业审核不通过
}

export default api

export function platformAuditPass (parameter) {
  return axios({
    url: api.platformAuditPass,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function platformAuditReject (parameter) {
  return axios({
    url: api.platformAuditReject,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function enterpriseAuditPass (parameter) {
  return axios({
    url: api.enterpriseAuditPass,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function enterpriseAuditReject (parameter) {
  return axios({
    url: api.enterpriseAuditReject,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function findBizEnterpriseDeviceRequirementPage (parameter) {
  return axios({
    url: api.findBizEnterpriseDeviceRequirementPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getBizEnterpriseDeviceRequirement (parameter) {
  return axios({
    url: api.getBizEnterpriseDeviceRequirement,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getDeviceRecord (parameter) {
  return axios({
    url: api.getDeviceRecord,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function removeBizEnterpriseDeviceRequirement (parameter) {
  return axios({
    url: api.removeBizEnterpriseDeviceRequirement,
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
export function saveBizEnterpriseDeviceRequirement (parameter) {
  return axios({
    url: api.saveBizEnterpriseDeviceRequirement,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

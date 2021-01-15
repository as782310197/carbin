import { axios } from '@/utils/request'
// 用车需求模块
const api = {
    findBizEnterpriseRequirementPage: '/biz/bizEnterpriseRequirement/findBizEnterpriseRequirementPage', // 获取用车需求分页
    findBizEnterpriseRequirement: '/biz/bizEnterpriseRequirement/get', // 获取用车需求
    removeBizEnterpriseRequirement: '/biz/bizEnterpriseRequirement/remove', // 删除用车需求
    saveBizEnterpriseRequirement: '/biz/bizEnterpriseRequirement/save', // 保存用车需求
    auditPassRequirement: '/biz/bizEnterpriseRequirement/auditPassRequirement', // 审核通过
    rejectRequirement: '/biz/bizEnterpriseRequirement/rejectRequirement' // 审核不通过
}
export function auditPassRequirement (parameter) {
    return axios({
        url: api.auditPassRequirement,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function rejectRequirement (parameter) {
    return axios({
        url: api.rejectRequirement,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function findBizEnterpriseRequirementPage (parameter) {
    return axios({
        url: api.findBizEnterpriseRequirementPage,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function findBizEnterpriseRequirement (parameter) {
    return axios({
        url: api.findBizEnterpriseRequirement,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function removeBizEnterpriseRequirement (parameter) {
    return axios({
      url: api.removeBizEnterpriseRequirement,
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
}

export function saveBizEnterpriseRequirement (parameter) {
    return axios({
        url: api.saveBizEnterpriseRequirement,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

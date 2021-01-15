import { axios } from '@/utils/request'
// 业务员模块
const api = {
  findBizStaffPage: '/biz/bizStaff/findBizStaffPage',
  findBizStaff: '/biz/bizStaff/get',
  removeBizStaff: '/biz/bizStaff/remove',
  saveBizStaff: '/biz/bizStaff/save'
}

export function getfindBizStaffPage (parameter) {
  return axios({
    url: api.findBizStaffPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getfindBizStaff (parameter) {
  return axios({
    url: api.findBizStaff,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function removeBizStaff (parameter) {
  return axios({
    url: api.removeBizStaff,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveBizStaff (parameter) {
  return axios({
    url: api.saveBizStaff,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

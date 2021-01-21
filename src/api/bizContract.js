import { axios } from '@/utils/request'
// 合同管理
const api = {
  findBizContractPage: '/biz/bizContract/findBizContractPage', // 获取合同分页
  getBizContract: '/biz/bizContract/get', // 获取合同
  saveBizContract: '/biz/bizContract/save', // 保存合同
  getContractById: '/biz/bizContract/getContract', // 根据合同id获取合同
  saveContractAttachment: '/biz/bizContract/saveContractAttachment', // 保存合同附件，id与content字段有效
  uploadDeviceOrderExcel: '/upload/uploadDeviceOrderExcel'
}

export default api

export function getfindBizContractPage (parameter) {
  return axios({
    url: api.findBizContractPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getBizContract (parameter) {
  return axios({
    url: api.getBizContract,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveBizContract (parameter) {
  return axios({
    url: api.saveBizContract,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getContractById (parameter) {
  return axios({
    url: api.getContractById,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function uploadDeviceOrderExcel (parameter) {
  return axios({
    url: api.uploadDeviceOrderExcel,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function saveContractAttachment (parameter) {
  return axios({
    url: api.saveContractAttachment,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

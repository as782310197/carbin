import { axios } from '@/utils/request'
// 企业相关接口
const api = {
  findBizOrderPage: '/biz/bizOrder/findBizOrderPage',
  saveBizOrder: '/biz/bizOrder/save',
  terminatesBizOrder: '/biz/bizOrder/terminates', // 终止用车订单
  findDeviceOrderPage: '/biz/bizOrder/findDeviceOrderPage', // 设备订单
  uploadDeviceOrderExcel: '/biz/bizOrder/uploadDeviceOrderExcel' // 上传excel
}

export default api

export function findBizOrderPage (parameter) {
  return axios({
    url: api.findBizOrderPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveBizOrder (parameter) {
  return axios({
    url: api.saveBizOrder,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function terminatesBizOrder (parameter) {
  return axios({
    url: api.terminatesBizOrder,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function findDeviceOrderPage (parameter) {
  return axios({
    url: api.findDeviceOrderPage,
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

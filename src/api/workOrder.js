import { axios } from '@/utils/request'

const api = {
  workOrderPage: '/task/bizTaskFaultOrder/findPage',
  saveWorkOrder: '/task/bizTaskFaultOrder/save',
  workOrderInfo: '/task/bizTaskFaultOrder/get',
  removeWorkOrder: '/task/bizTaskFaultOrder/remove',
  acceptWorkOrder: '/task/bizTaskFaultOrder/accept',
  handleWorkOrder: '/task/bizTaskFaultOrder/handle',
  rejectWorkOrder: '/task/bizTaskFaultOrder/reject',
  closeWorkOrder: '/task/bizTaskFaultOrder/close'
}

export default api

export function getWorkOrderPage (parameter) {
  return axios({
    url: api.workOrderPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 保存任务
export function saveWorkOrder (parameter) {
  return axios({
    url: api.saveWorkOrder,
    method: 'post',
    data: parameter
  })
}

export function getWorkOrderInfo (parameter) {
  return axios({
    url: api.workOrderInfo,
    method: 'post',
    data: parameter
  })
}

export function removeWorkOrder (parameter) {
  return axios({
    url: api.removeWorkOrder,
    method: 'post',
    data: parameter
  })
}

// 接收工单
export function acceptWorkOrder (parameter) {
  return axios({
    url: api.acceptWorkOrder,
    method: 'post',
    data: parameter
  })
}
// 处理工单
export function handleWorkOrder (parameter) {
  return axios({
    url: api.handleWorkOrder,
    method: 'post',
    data: parameter
  })
}
// 驳回工单
export function rejectWorkOrder (parameter) {
  return axios({
    url: api.rejectWorkOrder,
    method: 'post',
    data: parameter
  })
}
// 关闭工单
export function closeWorkOrder (parameter) {
  return axios({
    url: api.closeWorkOrder,
    method: 'post',
    data: parameter
  })
}

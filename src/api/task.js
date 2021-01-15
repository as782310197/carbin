import { axios } from '@/utils/request'

const api = {
  taskList: '/task/bizTask/findList',
  taskPage: '/task/bizTask/findPage',
  saveTask: '/task/bizTask/save',
  taskInfo: '/task/bizTask/get',
  removeTask: '/task/bizTask/remove',
  submitAuditTask: '/task/bizTask/submit',
  exportExcel: '/task/bizTask/exportExcel',
  approveTask: '/task/bizTask/approve',
  auditTask: '/task/bizTask/audit',
  rejectTask: '/task/bizTask/reject'
}

export default api

export function getTaskList (parameter) {
  return axios({
    url: api.taskList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getTaskPage (parameter) {
  return axios({
    url: api.taskPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveTask (parameter) {
  return axios({
    url: api.saveTask,
    method: 'post',
    data: parameter
  })
}

export function getTaskInfo (parameter) {
  return axios({
    url: api.taskInfo,
    method: 'post',
    data: parameter
  })
}

export function removeTask (parameter) {
  return axios({
    url: api.removeTask,
    method: 'post',
    data: parameter
  })
}
// 提交审核任务
export function submitAuditTask (parameter) {
  return axios({
    url: api.submitAuditTask,
    method: 'post',
    data: parameter
  })
}

// 导出简报
export function exportExcel (parameter) {
  return axios({
    url: api.exportExcel,
    method: 'get',
    data: parameter,
    headers: {
      'Accept': 'application/octet-stream'
    },
    responseType: 'arraybuffer'
  })
}

// 审批任务
export function approveTask (parameter) {
  return axios({
    url: api.approveTask,
    method: 'post',
    data: parameter
  })
}
// 审核任务
export function auditTask (parameter) {
  return axios({
    url: api.auditTask,
    method: 'post',
    data: parameter
  })
}
// 驳回任务
export function rejectTask (parameter) {
  return axios({
    url: api.rejectTask,
    method: 'post',
    data: parameter
  })
}

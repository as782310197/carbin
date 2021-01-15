import { axios } from '@/utils/request'

const api = {
  operationLogPage: '/system/operationLog/findOperationLogPage'
}

export default api

export function getOperationLogPage (parameter) {
  return axios({
    url: api.operationLogPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

import { axios } from '@/utils/request'

const api = {
  monitoringTreeList: '/task/bizTaskTerminalData/getProjectTree',
  taskMessageInfo: '/task/bizTaskTerminalData/getBizTaskTerminalData',
  spotlightInfo: '/task/bizTaskTerminalData/importTerminalData'
}

export default api

export function getMonitoringTreeList () {
  return axios({
    url: api.monitoringTreeList,
    method: 'post',
    data: '',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getTaskMessageInfo (parameter) {
  return axios({
    url: api.taskMessageInfo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSpotlightInfo (parameter) {
  return axios({
    url: api.spotlightInfo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

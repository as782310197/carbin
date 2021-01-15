import { axios } from '@/utils/request'

const api = {
  sysConfigPage: '/system/sysConfig/findSysConfigPage',
  saveSysConfig: '/system/sysConfig/save',
  sysConfigInfo: '/system/sysConfig/get',
  removeSysConfig: '/system/sysConfig/remove'
}

export default api

export function getSysConfigPage (parameter) {
  return axios({
    url: api.sysConfigPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveSysConfig (parameter) {
  return axios({
    url: api.saveSysConfig,
    method: 'post',
    data: parameter
  })
}

export function getSysConfigInfo (parameter) {
  return axios({
    url: api.sysConfigInfo,
    method: 'post',
    data: parameter
  })
}

export function removeSysConfig (parameter) {
  return axios({
    url: api.removeSysConfig,
    method: 'post',
    data: parameter
  })
}

import { axios } from '@/utils/request'

const api = {
  modulePage: '/system/module/findModulePage',
  moduleList: '/system/module/findModuleList',
  moduleInfo: '/system/module/get',
  menuInfo: '/system/module/getMenuInfo',
  saveModule: '/system/module/save',
  removeModule: '/system/module/remove',
  menuPage: '/system/module/findMenuPage'
}

export default api

export function getModulePage (parameter) {
  return axios({
    url: api.modulePage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveModule (parameter) {
  return axios({
    url: api.saveModule,
    method: 'post',
    data: parameter
  })
}

export function getModuleInfo (parameter) {
  return axios({
    url: api.moduleInfo,
    method: 'post',
    data: parameter
  })
}

export function getMenuInfo (parameter) {
  return axios({
    url: api.menuInfo,
    method: 'post',
    data: parameter
  })
}

export function getModuleList (parameter) {
  return axios({
    url: api.moduleList,
    method: 'post',
    data: parameter
  })
}

export function getMenuPage (parameter) {
  return axios({
    url: api.menuPage,
    method: 'post',
    data: parameter
  })
}

export function removeModule (parameter) {
  return axios({
    url: api.removeModule,
    method: 'post',
    data: parameter
  })
}

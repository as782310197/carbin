import { axios } from '@/utils/request'
// 字典
const api = {
	// 字典
	findSysItemPage: '/system/sysItem/findSysItemPage', // 获取数据字典分页
	getSysItem: '/system/sysItem/get', // 更新数据字典
	removeSysItem: '/system/sysItem/remove', // 删除数据字典
	saveSysItem: '/system/sysItem/save', // 保存数据字典
	// 字典子项
	findSysItemDetailPage: '/system/sysItemDetail/findSysItemDetailPage', // 获取数据字典分页子项
  getSysItemDetail: '/system/sysItemDetail/get', // 更新数据字典子项
  removeSysItemDetail: '/system/sysItemDetail/remove', // 删除数据字典子项
  saveSysItemDetail: '/system/sysItemDetail/save' // 保存数据字典子项
}

export default api

export function findSysItemPage (parameter) {
  return axios({
    url: api.findSysItemPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getSysItem (parameter) {
  return axios({
    url: api.getSysItem,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function removeSysItem (parameter) {
  return axios({
    url: api.removeSysItem,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function saveSysItem (parameter) {
  return axios({
    url: api.saveSysItem,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function findSysItemDetailPage (parameter) {
  return axios({
    url: api.findSysItemDetailPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getSysItemDetail (parameter) {
  return axios({
    url: api.getSysItemDetail,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function removeSysItemDetail (parameter) {
  return axios({
    url: api.removeSysItemDetail,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function saveSysItemDetail (parameter) {
  return axios({
    url: api.saveSysItemDetail,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

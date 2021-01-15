import { axios } from '@/utils/request'

const api = {
    helpAdminFindSysFaqPage: '/system/sysFaq/findSysFaqPage',
    helpAdminGet: '/system/sysFaq/get',
    helpAdminRemove: '/system/sysFaq/remove',
    helpAdminSave: '/system/sysFaq/save'
}
// 获取帮助文档分页
export function helpAdminFindSysFaqPage (parameter) {
    return axios({
        url: api.helpAdminFindSysFaqPage,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
// 获取帮助文档
export function helpAdminGet (parameter) {
    return axios({
        url: api.helpAdminGet,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
// 删除帮助文档
export function helpAdminRemove (parameter) {
    return axios({
      url: api.helpAdminRemove,
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
}
// 保存帮助文档
export function helpAdminSave (parameter) {
    return axios({
        url: api.helpAdminSave,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

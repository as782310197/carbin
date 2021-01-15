import { axios } from '@/utils/request'

const api = {
  positionList: '/common/getPositionList'
}

export default api

export function getPositionList (parameter) {
  return axios({
    url: api.positionList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

import { axios } from '@/utils/request'
// 收货地址相关接口
const api = {

	findBizEnterpriseAddressPage: '/biz/bizEnterpriseAddress/findBizEnterpriseAddressPage',
	getBizEnterpriseAddress: '/biz/bizEnterpriseAddress/get',
	saveBizEnterpriseAddress: '/biz/bizEnterpriseAddress/save'
}

export default api

export function findBizEnterpriseAddressPage (parameter) {
  return axios({
    url: api.findBizEnterpriseAddressPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getBizEnterpriseAddress (parameter) {
  return axios({
    url: api.getBizEnterpriseAddress,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveBizEnterpriseAddress (parameter) {
  return axios({
    url: api.saveBizEnterpriseAddress,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

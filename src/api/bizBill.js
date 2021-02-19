import { axios } from '@/utils/request'
// 账单相关接口
const api = {
	createBizBillManully: '/biz/bizBill/createBizBillManully', // 手动生成账单
	importBizBillvoucherImage: '/biz/bizBill/importBizBillvoucherImage', // 上传凭证
  findBizBillPage: '/biz/bizBill/findBizBillPage', // 获取账单分页
  findBillPage: '/biz/bizBill/findBillPage', // 获取账单分页（不区分）
  getBizOrder: '/biz/bizBill/get', // 获取账单
  removebizBill: '/biz/bizBill/remove', // 删除账单
	savebizBill: '/biz/bizBill/save', // 保存账单
	// 申请发票相关接口
  applyBizBillInvoice: '/biz/bizBillInvoice/applyBizBillInvoice', // 申请发票
  cancleBizBillInvoice: '/biz/bizBillInvoice/cancleBizBillInvoice', // 发票取消
  findBizBillInvoicePage: '/biz/bizBillInvoice/findBizBillInvoicePage', // 获取账单发票分页
  findBizBillInvoice: '/biz/bizBillInvoice/get', // 获取发票信息
  madeOutBizBillInovice: '/biz/bizBillInvoice/madeOutBizBillInovice', // 发票开具
  passBizBillInovice: '/biz/bizBillInvoice/passBizBillInovice', // 发票审核通过
  rejectBizBillInovice: '/biz/bizBillInvoice/rejectBizBillInovice', // 发票审核驳回
  // 设备账单模块
  findDeviceBillPage: '/biz/bizBill/findDeviceBillPage', // 获取设备账单分页
  getTaxCategoryTree: '/system/taxCategory/getTaxCategoryTree', // 获取税收分类树
  uploadNo: '/biz/bizBillInvoice/loadNo' //跟新快递单号
}

export default api

export function cancleBizBillInvoice (parameter) {
  return axios({
    url: api.cancleBizBillInvoice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function uploadNo (parameter) {
  return axios({
    url: api.uploadNo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function findBillPage (parameter) {
  return axios({
    url: api.findBillPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function findBizBillInvoice (parameter) {
  return axios({
    url: api.findBizBillInvoice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function madeOutBizBillInovice (parameter) {
  return axios({
    url: api.madeOutBizBillInovice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function passBizBillInovice (parameter) {
  return axios({
    url: api.passBizBillInovice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function rejectBizBillInovice (parameter) {
  return axios({
    url: api.rejectBizBillInovice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function applyBizBillInvoice (parameter) {
  return axios({
    url: api.applyBizBillInvoice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function findBizBillInvoicePage (parameter) {
  return axios({
    url: api.findBizBillInvoicePage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function createBizBillManully (parameter) {
  return axios({
    url: api.createBizBillManully,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function importBizBillvoucherImage (parameter) {
  return axios({
    url: api.importBizBillvoucherImage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function findBizBillPage (parameter) {
  return axios({
    url: api.findBizBillPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function removebizBill (parameter) {
  return axios({
    url: api.removebizBill,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getBizOrder (parameter) {
  return axios({
    url: api.getBizOrder,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function savebizBill (parameter) {
  return axios({
    url: api.savebizBill,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function findDeviceBillPage (parameter) {
  return axios({
    url: api.findDeviceBillPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getTaxCategoryTree (parameter) {
  return axios({
    url: api.getTaxCategoryTree,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancleBizBillInvoice = cancleBizBillInvoice;
exports.findBizBillInvoice = findBizBillInvoice;
exports.madeOutBizBillInovice = madeOutBizBillInovice;
exports.passBizBillInovice = passBizBillInovice;
exports.rejectBizBillInovice = rejectBizBillInovice;
exports.applyBizBillInvoice = applyBizBillInvoice;
exports.findBizBillInvoicePage = findBizBillInvoicePage;
exports.createBizBillManully = createBizBillManully;
exports.importBizBillvoucherImage = importBizBillvoucherImage;
exports.findBizBillPage = findBizBillPage;
exports.removebizBill = removebizBill;
exports.getBizOrder = getBizOrder;
exports.savebizBill = savebizBill;
exports.findDeviceBillPage = findDeviceBillPage;
exports["default"] = void 0;

var _request = require("@/utils/request");

var api = {
  createBizBillManully: '/biz/bizBill/createBizBillManully',
  // 手动生成账单
  importBizBillvoucherImage: '/biz/bizBill/importBizBillvoucherImage',
  // 上传凭证
  findBizBillPage: '/biz/bizBill/findBizBillPage',
  // 获取账单分页
  getBizOrder: '/biz/bizBill/get',
  // 获取账单
  removebizBill: '/biz/bizBill/remove',
  // 删除账单
  savebizBill: '/biz/bizBill/save',
  // 保存账单
  // 申请发票相关接口
  applyBizBillInvoice: '/biz/bizBillInvoice/applyBizBillInvoice',
  // 申请发票
  cancleBizBillInvoice: '/biz/bizBillInvoice/cancleBizBillInvoice',
  // 发票取消
  findBizBillInvoicePage: '/biz/bizBillInvoice/findBizBillInvoicePage',
  // 获取账单发票分页
  findBizBillInvoice: '/biz/bizBillInvoice/get',
  // 获取发票信息
  madeOutBizBillInovice: '/biz/bizBillInvoice/madeOutBizBillInovice',
  // 发票开具
  passBizBillInovice: '/biz/bizBillInvoice/passBizBillInovice',
  // 发票审核通过
  rejectBizBillInovice: '/biz/bizBillInvoice/rejectBizBillInovice',
  // 发票审核驳回
  // 设备账单模块
  findDeviceBillPage: '/biz/bizBill/findDeviceBillPage' // 获取设备账单分页

};
var _default = api;
exports["default"] = _default;

function cancleBizBillInvoice(parameter) {
  return (0, _request.axios)({
    url: api.cancleBizBillInvoice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function findBizBillInvoice(parameter) {
  return (0, _request.axios)({
    url: api.findBizBillInvoice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function madeOutBizBillInovice(parameter) {
  return (0, _request.axios)({
    url: api.madeOutBizBillInovice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function passBizBillInovice(parameter) {
  return (0, _request.axios)({
    url: api.passBizBillInovice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function rejectBizBillInovice(parameter) {
  return (0, _request.axios)({
    url: api.rejectBizBillInovice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function applyBizBillInvoice(parameter) {
  return (0, _request.axios)({
    url: api.applyBizBillInvoice,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function findBizBillInvoicePage(parameter) {
  return (0, _request.axios)({
    url: api.findBizBillInvoicePage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function createBizBillManully(parameter) {
  return (0, _request.axios)({
    url: api.createBizBillManully,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function importBizBillvoucherImage(parameter) {
  return (0, _request.axios)({
    url: api.importBizBillvoucherImage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function findBizBillPage(parameter) {
  return (0, _request.axios)({
    url: api.findBizBillPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function removebizBill(parameter) {
  return (0, _request.axios)({
    url: api.removebizBill,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function getBizOrder(parameter) {
  return (0, _request.axios)({
    url: api.getBizOrder,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function savebizBill(parameter) {
  return (0, _request.axios)({
    url: api.savebizBill,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function findDeviceBillPage(parameter) {
  return (0, _request.axios)({
    url: api.findDeviceBillPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
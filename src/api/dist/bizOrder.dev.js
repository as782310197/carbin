"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBizOrderPage = findBizOrderPage;
exports.saveBizOrder = saveBizOrder;
exports.terminatesBizOrder = terminatesBizOrder;
exports.findDeviceOrderPage = findDeviceOrderPage;
exports["default"] = void 0;

var _request = require("@/utils/request");

var api = {
  findBizOrderPage: '/biz/bizOrder/findBizOrderPage',
  saveBizOrder: '/biz/bizOrder/save',
  terminatesBizOrder: '/biz/bizOrder/terminates',
  // 终止用车订单
  findDeviceOrderPage: '/biz/bizOrder/findDeviceOrderPage' // 设备订单

};
var _default = api;
exports["default"] = _default;

function findBizOrderPage(parameter) {
  return (0, _request.axios)({
    url: api.findBizOrderPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function saveBizOrder(parameter) {
  return (0, _request.axios)({
    url: api.saveBizOrder,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function terminatesBizOrder(parameter) {
  return (0, _request.axios)({
    url: api.terminatesBizOrder,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

function findDeviceOrderPage(parameter) {
  return (0, _request.axios)({
    url: api.findDeviceOrderPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
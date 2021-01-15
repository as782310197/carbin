"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constantRouterMap = exports.asyncRouterMap = void 0;

var _layouts = require("@/layouts");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: _layouts.BasicLayout,
  meta: {
    title: '首页'
  },
  // 登录后定向跳转的页面，现为首页
  redirect: '/index',
  children: [// 平台概况（首页）
  {
    path: '/index',
    name: 'platformOverview',
    // component: PageView,
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/platformOverview/platformOverview'));
      });
    },
    meta: {
      title: '平台概况',
      icon: 'home',
      keepAlive: false // permission: ['index']

    }
  }, // 富文本输入框测试
  // {
  //   path: '/richeditor',
  //   name: 'richeditor',
  //   component: PageView,
  //   redirect: '/richeditor/test',
  //   meta: {
  //     title: '测试',
  //     icon: 'schedule'
  //     // permission: ['agency']
  //   },
  //   children: [
  //     {
  //       path: '/richeditor/test',
  //       name: 'test',
  //       // src\views\richeditor\test.vue
  //       component: () => import('@/views/richeditor/test'),
  //       meta: {
  //         title: '富文本',
  //         keepAlive: false
  //         // permission: ['agencyManagement']
  //       }
  //     }
  //   ]
  // },
  // 业务管理
  {
    path: '/workManagement',
    name: 'workManagement',
    component: _layouts.PageView,
    redirect: '/workManagement/agencyManagement',
    meta: {
      title: '业务管理',
      icon: 'schedule',
      permission: ['workManagement']
    },
    children: [{
      path: '/workManagement/agencyManagement',
      name: 'agencyManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/workManagement/agencyManagement'));
        });
      },
      meta: {
        title: '代理机构管理',
        keepAlive: false,
        permission: ['agencyManagement']
      }
    }, {
      path: '/workManagement/salesmanManagement',
      name: 'salesmanManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/workManagement/salesmanManagement'));
        });
      },
      meta: {
        title: '业务员管理',
        keepAlive: false,
        permission: ['salesmanManagement']
      }
    }]
  }, // 企业管理
  {
    path: '/business',
    name: 'businessManagement',
    // 路由名称
    component: _layouts.PageView,
    redirect: '/businessManagement/businessManagement',
    // 重定向
    // hidden: true, // 可以在菜单中不展示这个路由，包括子路由。效果可以查看 other 下的路由配置。
    meta: {
      title: '企业管理',
      // 菜单项名称
      icon: 'idcard',
      // 菜单项图标
      permission: ['business'] // 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示 *（默认情况下）
      // hiddenHeaderContent: true //可以强制当前页面不显示 PageHeader 组件中的页面带的 面包屑和页面标题栏

    },
    children: [{
      path: '/businessManagement/businessManagement',
      name: 'businessManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/businessManagement/businessManagement'));
        });
      },
      meta: {
        title: '企业管理',
        keepAlive: true,
        permission: ['businessManagement']
      }
    }, {
      path: '/businessManagement/enterpriseAudit',
      name: 'enterpriseAuditList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/businessManagement/enterpriseAudit'));
        });
      },
      meta: {
        title: '企业审核',
        keepAlive: true,
        // 缓存页面.
        permission: ['enterpriseAudit']
      }
    }]
  }, // 车辆管理
  {
    path: '/vehicle',
    name: 'vehicleManagement',
    component: _layouts.PageView,
    redirect: '/vehicleManagement/vehicleManagement',
    meta: {
      title: '车辆管理',
      icon: 'car',
      permission: ['vehicle']
    },
    children: [{
      path: '/vehicleManagement/ownerManagement',
      name: 'ownerManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/vehicleManagement/ownerManagement'));
        });
      },
      meta: {
        title: '车主管理',
        keepAlive: false,
        permission: ['ownerManagement']
      }
    }, {
      path: '/vehicleManagement/vehicleManagement',
      name: 'vehicleManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/vehicleManagement/vehicleManagement'));
        });
      },
      meta: {
        title: '车辆管理',
        keepAlive: false,
        permission: ['vehicleManagement']
      }
    }]
  }, // 设备管理
  // {
  //   path: '/equipmentManagement',
  //   name: 'equipmentManagement',
  //   component: PageView,
  //   redirect: '/equipmentManagement/equipmentOwner',
  //   meta: {
  //     title: '设备管理',
  //     icon: 'dashboard',
  //     permission: ['equipmentManagement']
  //   },
  //   children: [
  //     {
  //       path: '/equipmentManagement/equipmentOwner',
  //       name: 'equipmentOwnerList',
  //       component: () => import('@/views/equipmentManagement/equipmentOwner'),
  //       meta: {
  //         title: '设备主管理',
  //         keepAlive: false,
  //         permission: ['equipmentOwner']
  //       }
  //     },
  //     {
  //       path: '/equipmentManagement/equipmentList',
  //       name: 'equipmentList',
  //       component: () => import('@/views/equipmentManagement/equipmentList'),
  //       meta: {
  //         title: '设备管理',
  //         keepAlive: false,
  //         permission: ['equipmentList']
  //       }
  //     }
  //   ]
  // },
  // 合同管理
  {
    path: '/contract',
    name: 'contract',
    component: _layouts.PageView,
    redirect: '/contract/contractManagement',
    meta: {
      title: '合同管理',
      icon: 'file',
      permission: ['contract']
    },
    children: [{
      path: '/contract/contractManagement',
      name: 'contractManagement',
      // src\views\contract\contractManagement.vue
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/contract/contractManagement'));
        });
      },
      meta: {
        title: '合同管理',
        keepAlive: false,
        permission: ['contractManagement']
      }
    }]
  }, // 租赁管理
  {
    path: '/leaseManagement',
    name: 'leaseManagement',
    component: _layouts.PageView,
    redirect: '/leaseManagement/carRentalDemandManagement',
    meta: {
      title: '租赁管理',
      icon: 'audit',
      permission: ['leaseManagement']
    },
    children: [{
      path: '/leaseManagement/carRentalDemandManagement',
      name: 'carRentalDemandManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/leaseManagement/carRentalDemandManagement'));
        });
      },
      meta: {
        title: '租车需求管理',
        keepAlive: false,
        permission: ['carRentalDemandManagement']
      }
    }, {
      path: '/leaseManagement/equipmentRequirements',
      name: 'equipmentRequirementsList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/leaseManagement/equipmentRequirements'));
        });
      },
      meta: {
        title: '设备需求管理',
        keepAlive: false,
        permission: ['equipmentRequirements']
      }
    }, {
      path: '/leaseManagement/carRentalOrderManagement',
      name: 'carRentalOrderManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/leaseManagement/carRentalOrderManagement'));
        });
      },
      meta: {
        title: '租车订单管理',
        keepAlive: false,
        permission: ['carRentalOrderManagement']
      }
    }, {
      path: '/leaseManagement/equipmentOrder',
      name: 'equipmentOrderList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/leaseManagement/equipmentOrder'));
        });
      },
      meta: {
        title: '设备订单管理',
        keepAlive: false,
        permission: ['equipmentOrder']
      }
    }]
  }, // 核算管理
  {
    path: '/accountingManagement',
    name: 'accountingManagement',
    component: _layouts.PageView,
    redirect: '/accountingManagement/vehicleManagement',
    meta: {
      title: '核算管理',
      icon: 'money-collect',
      permission: ['accountingManagement']
    },
    children: [{
      path: '/accountingManagement/billManagement',
      name: 'billManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/accountingManagement/billManagement'));
        });
      },
      meta: {
        title: '账单管理',
        keepAlive: false,
        permission: ['billManagement']
      }
    }, {
      path: '/accountingManagement/settlementManagement',
      name: 'settlementManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/accountingManagement/settlementManagement'));
        });
      },
      meta: {
        title: '结算管理',
        keepAlive: false,
        permission: ['settlementManagement']
      }
    }, {
      path: '/accountingManagement/equipmentBill',
      name: 'equipmentBillList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/accountingManagement/equipmentBill'));
        });
      },
      meta: {
        title: '设备账单管理',
        keepAlive: false,
        permission: ['equipmentBill']
      }
    }]
  }, // 发票管理
  {
    path: '/invoices',
    name: 'controlOverInvoices',
    component: _layouts.PageView,
    redirect: '/controlOverInvoices/invoiceApplication',
    meta: {
      title: '发票管理',
      icon: 'printer',
      permission: ['invoices']
    },
    children: [{
      path: '/controlOverInvoices/invoiceApplication',
      name: 'invoiceApplicationList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/controlOverInvoices/invoiceApplication'));
        });
      },
      meta: {
        title: '开票申请',
        keepAlive: false,
        permission: ['invoiceApplication']
      }
    }, {
      path: '/controlOverInvoices/invoiceManagement',
      name: 'invoiceManagementList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/controlOverInvoices/invoiceManagement'));
        });
      },
      meta: {
        title: '开票管理',
        keepAlive: false,
        permission: ['invoiceManagement']
      }
    }, {
      path: '/controlOverInvoices/shippingAddress',
      name: 'shippingAddress',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/controlOverInvoices/shippingAddress'));
        });
      },
      meta: {
        title: '收货地址',
        keepAlive: false,
        permission: ['shippingAddress']
      }
    }]
  }, // system 系统管理
  {
    path: '/system',
    name: 'system',
    component: _layouts.PageView,
    redirect: '/system/userManagement',
    meta: {
      title: '系统管理',
      icon: 'setting',
      permission: ['system']
    },
    children: [{
      path: '/system/user',
      name: 'UserList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/User'));
        });
      },
      meta: {
        title: '用户管理',
        keepAlive: false,
        permission: ['user']
      }
    }, {
      path: '/system/RoleManagement',
      name: 'RoleList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/RoleManagement'));
        });
      },
      meta: {
        title: '角色管理',
        keepAlive: false,
        permission: ['RoleManagement']
      }
    }, {
      path: '/system/permission',
      name: 'PermissionList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/Permission'));
        });
      },
      meta: {
        title: '权限管理',
        keepAlive: false,
        permission: ['permission']
      }
    }, {
      path: '/system/module',
      name: 'ModuleList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/Module'));
        });
      },
      meta: {
        title: '模块管理',
        keepAlive: false,
        permission: ['module']
      }
    }, {
      path: '/system/menu',
      name: 'MemuList',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/Menu'));
        });
      },
      meta: {
        title: '菜单管理',
        keepAlive: false,
        permission: ['menu']
      }
    }, {
      path: '/system/system-configuration',
      name: 'SystemConfiguration',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/SystemConfiguration'));
        });
      },
      meta: {
        title: '系统配置管理',
        keepAlive: false,
        permission: ['system-configuration']
      }
    }, {
      path: '/system/help-admin',
      name: 'helpadmin',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/HelpAdmin'));
        });
      },
      meta: {
        title: '帮助管理',
        keepAlive: false,
        permission: ['help-admin']
      }
    }, {
      path: '/system/banner',
      name: 'banner',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/system/bannerManagement'));
        });
      },
      meta: {
        title: '轮播图管理',
        keepAlive: false,
        permission: ['banner']
      }
    }]
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}];
/**
 * 基础路由
 * @type { *[] }
 */

exports.asyncRouterMap = asyncRouterMap;
var constantRouterMap = [{
  path: '/user',
  component: _layouts.UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [{
    path: 'login',
    name: 'login',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/user/Login'));
      });
    }
  }, {
    path: 'forgetPassword',
    name: 'forgetPassword',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/user/ForgetPassword'));
      });
    }
  }, {
    path: 'register',
    name: 'register',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/user/Register'));
      });
    }
  }, {
    path: 'register-result',
    name: 'registerResult',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/user/RegisterResult'));
      });
    }
  } // {
  //   path: 'recover',
  //   name: 'recover',
  //   component: undefined
  // }
  ]
}, {
  path: '/test',
  component: _layouts.BlankLayout,
  redirect: '/test/home',
  children: [{
    path: 'home',
    name: 'TestHome',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/Home'));
      });
    }
  }]
}, {
  path: '/404',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/404'));
    });
  }
}];
exports.constantRouterMap = constantRouterMap;
// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  // RouteView,
  BlankLayout,
  PageView
} from '@/layouts'
// import { RouteView } from '@/layouts/index'
// import {
//   bxAnaalyse
// } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    // 登录后定向跳转的页面，现为首页
    redirect: '/index',
    children: [
      // 平台概况（首页）
      {
        path: '/index',
        name: 'platformOverview',
        // component: PageView,
        component: () => import('@/views/platformOverview/platformOverview'),
        meta: {
          title: '平台概况',
          icon: 'home',
          keepAlive: false
          // permission: ['index']
        }
      },
      // 富文本输入框测试
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
        component: PageView,
        redirect: '/workManagement/agencyManagement',
        meta: {
          title: '业务管理',
          icon: 'schedule',
          permission: ['workManagement']
        },
        children: [
          {
            path: '/workManagement/agencyManagement',
            name: 'agencyManagementList',
            component: () => import('@/views/workManagement/agencyManagement'),
            meta: {
              title: '代理机构管理',
              keepAlive: false,
              permission: ['agencyManagement']
            }
          },
          {
            path: '/workManagement/salesmanManagement',
            name: 'salesmanManagementList',
            component: () => import('@/views/workManagement/salesmanManagement'),
            meta: {
              title: '业务员管理',
              keepAlive: false,
              permission: ['salesmanManagement']
            }
          }
        ]
      },
      // 企业管理
      {
        path: '/business',
        name: 'businessManagement', // 路由名称
        component: PageView,
        redirect: '/businessManagement/businessManagement', // 重定向
        // hidden: true, // 可以在菜单中不展示这个路由，包括子路由。效果可以查看 other 下的路由配置。
        meta: {
          title: '企业管理', // 菜单项名称
          icon: 'idcard', // 菜单项图标
          permission: ['business'] // 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示 *（默认情况下）
          // hiddenHeaderContent: true //可以强制当前页面不显示 PageHeader 组件中的页面带的 面包屑和页面标题栏
        },
        children: [
          {
            path: '/businessManagement/businessManagement',
            name: 'businessManagementList',
            component: () => import('@/views/businessManagement/businessManagement'),
            meta: {
              title: '企业管理',
              keepAlive: true,
              permission: ['businessManagement']
            }
          },
          {
            path: '/businessManagement/enterpriseAudit',
            name: 'enterpriseAuditList',
            component: () => import('@/views/businessManagement/enterpriseAudit'),
            meta: {
              title: '企业审核',
              keepAlive: true, // 缓存页面.
              permission: ['enterpriseAudit']
            }
          }
        ]
      },
      // 认证管理
      {
        path: '/authentication',
        name: 'authentication',
        component: PageView,
        redirect: '/authentication/authenticationManagement',
        meta: {
          title: '认证管理',
          icon: 'exception',
          permission: ['authentication']
        },
        children: [
          {
            path: '/authentication/authenticationManagement',
            name: 'authenticationManagement',
            component: () => import('@/views/authentication/authenticationManagement'),
            meta: {
              title: '认证管理',
              keepAlive: false,
              permission: ['authenticationManagement']
            }
          }
        ]
      },
      // 车辆管理
      {
        path: '/vehicle',
        name: 'vehicleManagement',
        component: PageView,
        redirect: '/vehicleManagement/vehicleManagement',
        meta: {
          title: '车辆管理',
          icon: 'car',
          permission: ['vehicle']
        },
        children: [
          {
            path: '/vehicleManagement/vehicleManagement',
            name: 'vehicleManagementList',
            component: () => import('@/views/vehicleManagement/vehicleManagement'),
            meta: {
              title: '车辆列表',
              keepAlive: false,
              permission: ['vehicleManagement']
            }
          }
        ]
      },
      // 设备管理
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
        component: PageView,
        redirect: '/contract/contractManagement',
        meta: {
          title: '合同管理',
          icon: 'file',
          permission: ['contract']
        },
        children: [
          {
            path: '/contract/contractManagement',
            name: 'contractManagement',
            // src\views\contract\contractManagement.vue
            component: () => import('@/views/contract/contractManagement'),
            meta: {
              title: '合同管理',
              keepAlive: false,
              permission: ['contractManagement']
            }
          }
        ]
      },

      // 测试模块
      {
        path: '/test',
        name: 'test',
        component: PageView,
        redirect: '/test/testView',
        meta: {
          title: '测试模块',
          icon: 'file',
          permission: ['test']
        },
        children: [
          {
            path: '/test/testView',
            name: 'testView',
            // src\views\contract\contractManagement.vue
            component: () => import('@/views/test/testView'),
            meta: {
              title: '测试',
              keepAlive: false,
              permission: ['testView']
            }
          }
        ]
      },
      //设备主信息
      {
        path: '/personInfo',
        name: 'personInfo',
        component: PageView,
        redirect: '/personInfo/shebeiInfo',
        meta: {
          title: '设备主信息',
          icon: 'file',
          permission: ['personInfo']
        },
        children: [
          {
            path: '/personInfo/shebeiInfo',
            name: 'shebeiInfo',
            // src\views\contract\contractManagement.vue
            component: () => import('@/views/personInfo/shebeiInfo'),
            meta: {
              title: '个体工商户',
              keepAlive: false,
              permission: ['shebeiInfo']
            }
          }
        ]
      },
      // 车辆租赁
      {
        path: '/carLeaseManagement',
        name: 'carLeaseManagement',
        component: PageView,
        redirect: '/leaseManagement/carRentalDemandManagement',
        meta: {
          title: '车辆租赁',
          icon: 'audit',
          permission: ['carLeaseManagement']
        },
        children: [
          {
            path: '/carLeaseManagement/carRentalDemandManagement',
            name: 'carRentalDemandManagementList',
            component: () => import('@/views/leaseManagement/carRentalDemandManagement'),
            meta: {
              title: '租车需求管理',
              keepAlive: false,
              permission: ['carRentalDemandManagement']
            }
          },
          {
            path: '/carLeaseManagement/carRentalOrderManagement',
            name: 'carRentalOrderManagementList',
            component: () => import('@/views/leaseManagement/carRentalOrderManagement'),
            meta: {
              title: '租车订单管理',
              keepAlive: false,
              permission: ['carRentalOrderManagement']
            }
          }
        ]
      },
      // 设备租赁
      {
        path: '/equipmentLeaseManagement',
        name: 'equipmentLeaseManagement',
        component: PageView,
        redirect: '/leaseManagement/carRentalDemandManagement',
        meta: {
          title: '设备租赁',
          icon: 'audit',
          permission: ['equipmentLeaseManagement']
        },
        children: [
          {
            path: '/equipmentLeaseManagement/equipmentRequirements',
            name: 'equipmentRequirementsList',
            component: () => import('@/views/leaseManagement/equipmentRequirements'),
            meta: {
              title: '设备需求管理',
              keepAlive: false,
              permission: ['equipmentRequirements']
            }
          },
          {
            path: '/equipmentLeaseManagement/equipmentOrder',
            name: 'equipmentOrderList',
            component: () => import('@/views/leaseManagement/equipmentOrder'),
            meta: {
              title: '设备订单管理',
              keepAlive: false,
              permission: ['equipmentOrder']
            }
          }
        ]
      },
      // 核算管理
      {
        path: '/accountingManagement',
        name: 'accountingManagement',
        component: PageView,
        redirect: '/accountingManagement/vehicleManagement',
        meta: {
          title: '核算管理',
          icon: 'money-collect',
          permission: ['accountingManagement']
        },
        children: [
          {
            path: '/accountingManagement/billManagement',
            name: 'billManagementList',
            component: () => import('@/views/accountingManagement/billManagement'),
            meta: {
              title: '租车账单管理',
              keepAlive: false,
              permission: ['billManagement']
            }
          },
          // {
          //   path: '/accountingManagement/settlementManagement',
          //   name: 'settlementManagementList',
          //   component: () => import('@/views/accountingManagement/settlementManagement'),
          //   meta: {
          //     title: '结算管理',
          //     keepAlive: false,
          //     permission: ['settlementManagement']
          //   }
          // },
          {
            path: '/accountingManagement/equipmentBill',
            name: 'equipmentBillList',
            component: () => import('@/views/accountingManagement/equipmentBill'),
            meta: {
              title: '设备账单管理',
              keepAlive: false,
              permission: ['equipmentBill']
            }
          }
        ]
      },
      // 发票管理
      {
        path: '/invoices',
        name: 'controlOverInvoices',
        component: PageView,
        redirect: '/controlOverInvoices/invoiceApplication',
        meta: {
          title: '发票管理',
          icon: 'printer',
          permission: ['invoices']
        },
        children: [
          {
            path: '/controlOverInvoices/invoiceApplication',
            name: 'invoiceApplicationList',
            component: () => import('@/views/controlOverInvoices/invoiceApplication'),
            meta: {
              title: '开票申请',
              keepAlive: false,
              permission: ['invoiceApplication']
            }
          },
          {
            path: '/controlOverInvoices/invoiceManagement',
            name: 'invoiceManagementList',
            component: () => import('@/views/controlOverInvoices/invoiceManagement'),
            meta: {
              title: '开票管理',
              keepAlive: false,
              permission: ['invoiceManagement']
            }
          },
          {
            path: '/controlOverInvoices/shippingAddress',
            name: 'shippingAddress',
            component: () => import('@/views/controlOverInvoices/shippingAddress'),
            meta: {
              title: '收货地址',
              keepAlive: false,
              permission: ['shippingAddress']
            }
          }
        ]
      },
      // system 系统管理
      {
        path: '/system',
        name: 'system',
        component: PageView,
        redirect: '/system/userManagement',
        meta: {
          title: '系统管理',
          icon: 'setting',
          permission: ['system']
        },
        children: [
          {
            path: '/system/user',
            name: 'UserList',
            component: () => import('@/views/system/User'),
            meta: {
              title: '用户管理',
              keepAlive: false,
              permission: ['user']
            }
          },
          {
            path: '/system/RoleManagement',
            name: 'RoleList',
            component: () => import('@/views/system/RoleManagement'),
            meta: {
              title: '角色管理',
              keepAlive: false,
              permission: ['RoleManagement']
            }
          },
          {
            path: '/system/permission',
            name: 'PermissionList',
            component: () => import('@/views/system/Permission'),
            meta: {
              title: '权限管理',
              keepAlive: false,
              permission: ['permission']
            }
          },
          {
            path: '/system/module',
            name: 'ModuleList',
            component: () => import('@/views/system/Module'),
            meta: {
              title: '模块管理',
              keepAlive: false,
              permission: ['module']
            }
          },
          {
            path: '/system/menu',
            name: 'MemuList',
            component: () => import('@/views/system/Menu'),
            meta: {
              title: '菜单管理',
              keepAlive: false,
              permission: ['menu']
            }
          },
          {
            path: '/system/datadictionary',
            name: 'DataDictionary',
            // src\views\system\DataDictionary.vue
            component: () => import('@/views/system/DataDictionary'),
            meta: {
              title: '数据字典管理',
              keepAlive: false,
              permission: ['datadictionary']
            }
          },
          {
            path: '/system/system-configuration',
            name: 'SystemConfiguration',
            component: () => import('@/views/system/SystemConfiguration'),
            meta: {
              title: '系统配置管理',
              keepAlive: false,
              permission: ['system-configuration']
            }
          },
          {
            path: '/system/help-admin',
            name: 'helpadmin',
            component: () => import('@/views/system/HelpAdmin'),
            meta: {
              title: '帮助管理',
              keepAlive: false,
              permission: ['help-admin']
            }
          },
          {
            path: '/system/banner',
            name: 'banner',
            component: () => import('@/views/system/bannerManagement'),
            meta: {
              title: '轮播图管理',
              keepAlive: false,
              permission: ['banner']
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
      path: '/user',
      component: UserLayout,
      redirect: '/user/login',
      hidden: true,
      children: [{
          path: 'login',
          name: 'login',
          component: () => import('@/views/user/Login')
        },
        {
          path: 'forgetPassword',
          name: 'forgetPassword',
          component: () => import('@/views/user/ForgetPassword')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/user/Register')
        },
        {
          path: 'register-result',
          name: 'registerResult',
          component: () => import('@/views/user/RegisterResult')
        }
        // {
        //   path: 'recover',
        //   name: 'recover',
        //   component: undefined
        // }
      ]
    },
    {
      path: '/test',
      component: BlankLayout,
      redirect: '/test/home',
      children: [{
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }]
    },
    {
      path: '/404',
      component: () => import('@/views/exception/404')
    }
  ]

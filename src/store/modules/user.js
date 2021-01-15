import Vue from 'vue'
// import { login, logout } from '@/api/login'
import {
  login,
  getInfo
} from '@/api/login'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  welcome
} from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve(response)
        }).catch(error => {
          // console.log(error)
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result
          /* result.role = {
            'id': 'admin',
            'name': '管理员',
            'describe': '拥有所有权限',
            'status': 1,
            'creatorId': 'system',
            'createTime': 1497160610259,
            'deleted': 0,
            'permissions': [{
              'roleId': 'admin',
              'permissionId': 'agency',
              'permissionName': '业务管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'agencyManagement',
              'permissionName': '代理机构管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'salesmanManagement',
              'permissionName': '业务员管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'business',
              'permissionName': '企业管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'businessManagement',
              'permissionName': '企业管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'enterpriseAudit',
              'permissionName': '企业审核',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'vehicle',
              'permissionName': '车辆管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'ownerManagement',
              'permissionName': '车主管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'vehicleManagement',
              'permissionName': '车辆管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            },
            {
              'roleId': 'admin',
              'permissionId': 'contract',
              'permissionName': '合同管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            },
            {
              'roleId': 'admin',
              'permissionId': 'contractManagement',
              'permissionName': '合同管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            },
            {
              'roleId': 'admin',
              'permissionId': 'leaseManagement',
              'permissionName': '租赁管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'carRentalDemandManagement',
              'permissionName': '租车需求管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'carRentalOrderManagement',
              'permissionName': '租车订单管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'accountingManagement',
              'permissionName': '核算管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'billManagement',
              'permissionName': '账单管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'settlementManagement',
              'permissionName': '结算管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'invoices',
              'permissionName': '发票管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'invoiceApplication',
              'permissionName': '开票申请',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'invoiceManagement',
              'permissionName': '开票管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            },
            {
              'roleId': 'admin',
              'permissionId': 'shippingAddress',
              'permissionName': '收货地址',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            },
            {
              'roleId': 'admin',
              'permissionId': 'userManagement',
              'permissionName': '系统管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'user',
              'permissionName': '用户管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'RoleManagement',
              'permissionName': '角色管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'permission',
              'permissionName': '权限管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'module',
              'permissionName': '模块管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'menu',
              'permissionName': '菜单管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'system',
              'permissionName': '系统管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'system-configuration',
              'permissionName': '系统配置管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }, {
              'roleId': 'admin',
              'permissionId': 'help-admin',
              'permissionName': '帮助管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            },
            {
              'roleId': 'admin',
              'permissionId': 'banner',
              'permissionName': '轮播图管理',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }
          ]
          }
           result.role.permissions.push({
            'roleId': 'admin',
            'permissionId': 'support',
            'permissionName': '超级模块',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'import',
              'describe': '导入',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }, {
              'action': 'export',
              'describe': '导出',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }) */
          // console.log(result)
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => {
                  return action.action
                })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => {
              return permission.permissionId
            })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', {
            name: result.name,
            welcome: welcome()
          })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({
      commit,
      state
    }) {
      // return new Promise((resolve) => {
      //   logout(state.token).then(() => {
      //     resolve()
      //   }).catch(() => {
      //     resolve()
      //   }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
      //   })
      // })
    }

  }
}

export default user

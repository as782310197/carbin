<template>
  <a-card class="moduleCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="角色名称">
                <a-input
                  placeholder="请输入角色名称"
                  v-decorator="['name']"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="状态">
                <a-select
                  v-decorator="['status']"
                  placeholder="请选择状态"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ textAlign: 'right' }">
              <a-button type="primary" html-type="submit">
                查询
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                清空
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 添加按钮 -->
      <div class="addDiv">
        <a-button type="primary" @click="addDrawerShow" style="margin-bottom: 20px;" v-if="actionList.add === 1">
          <a-icon type="plus" /> 增加 </a-button>
      </div>
    </div>
    <div class="tableDiv">
      <!-- 表格 -->
      <s-table
        size="default"
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        ref="table"
      >
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <a-divider type="vertical" v-if="actionList.get === 1 || actionList.delete === 1" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="confirm(record)"
            @cancel="cancel"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="#">
              删除
            </a>
          </a-popconfirm>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改抽屉 -->
    <div>
      <a-drawer
        width="80%"
        @close="onClose"
        :title="title"
        :visible="visible"
        :confirmLoading="addLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit(form)">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="唯一键">
            <a-input
              placeholder="请输入唯一键"
              v-decorator="['roleCode', {rules: [{required: true, message: '请输入唯一码'}]}]"
            />
          </a-form-item>
          <a-form-item label="角色名称">
            <a-input
              placeholder="请输入角色名称"
              v-decorator="['name', {rules: [{required: true, message: '请输入角色名称'}]}]"
            />
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              placeholder="请选择状态"
              v-decorator="['status']"
            >
              <a-select-option :value="1">正常</a-select-option>
              <a-select-option :value="2">禁用</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="备注说明">
            <a-textarea
              :row="3"
              id="describe"
              placeholder="请输入备注说明"
              v-decorator="['description', {rules: [{required: true, message: '备注说明不能为空'}]}]"
            />
          </a-form-item>
          <!-- <a-form-item label="拥有权限">
            <a-row :gutter="24" v-for="(permission, index) in permissions" :key="index">
              <a-col :xl="8" :lg="24">
                <a-checkbox @change="chooseName(permission)" :options="permission.name" v-model="permission.selectedName">
                  {{ permission.name }}：
                </a-checkbox>
              </a-col>
              <a-col :xl="16" :lg="24" v-if="permission.actionsOptions.length > 0">
                <a-checkbox
                  :indeterminate="permission.indeterminate"
                  :checked="permission.checkedAll"
                  :disabled="!permission.selectedName"
                  @change="onChangeCheckAll($event, permission)">
                  全选
                </a-checkbox>
                <a-checkbox-group :options="permission.actionsOptions" :disabled="!permission.selectedName" v-model="permission.selected" @change="onChangeCheck(permission)" />
              </a-col>
            </a-row>
          </a-form-item> -->
          <a-form-item label="拥有权限">
            <a-row>
              <a-col
                :class="item.permissionId === current ? 'active' : ''"
                :span="4"
                v-for="item in permissions"
                :key="item.permissionId"
                @click="addPermission(item)"
                style="cursor: pointer; text-align: center;"
              >
                {{ item.name + '/' + item.description }}
                <!-- {{ item.name }} -->
              </a-col>
            </a-row>
            <a-row :gutter="24" v-for="(permission, index) in btnPer" :key="index">
              <a-col :xl="8" :lg="24">
                <a-checkbox @change="chooseName(permission)" :options="permission.name" v-model="permission.selectedName">
                  {{ permission.name }}：
                </a-checkbox>
              </a-col>
              <a-col :xl="16" :lg="24" v-if="permission.actionData.length > 0">
                <a-checkbox
                  :indeterminate="permission.indeterminate"
                  :checked="permission.checkedAll"
                  :disabled="!permission.selectedName"
                  @change="onChangeCheckAll($event, permission)">
                  全选
                </a-checkbox>
                <a-checkbox-group :options="permission.actionData" :disabled="!permission.selectedName" v-model="permission.selected" @change="onChangeCheck(permission)" />
              </a-col>
            </a-row>
          </a-form-item>
          <!-- <a-form-item label="数据权限">
            <a-tree
              :showLine="true"
              @expand="onExpand"
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              @check="onCheck"
              :selected-keys="selectedKeys"
              :tree-data="treeData"
              checkable
              v-model="checkedList"
            >
              <a-icon slot="switcherIcon" type="caret-down" />
            </a-tree>
          </a-form-item> -->
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" html-type="submit" @click="handleSubmit" :disabled="saveDisabled">保存</a-button>
        </div>
      </a-drawer>
    </div>
    <!-- 查看页面抽屉 -->
    <div>
      <a-drawer
        :width="800"
        @close="onReadClose"
        :title="readTitle"
        :visible="visibleRead"
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-card
          :bordered="true"
          title="基本信息"
          size="small"
        >
          <detail-list :col="3">
            <detail-list-item term="唯一键" >{{ obj.roleCode }}</detail-list-item>
            <detail-list-item term="角色名">{{ obj.name }}</detail-list-item>
            <detail-list-item term="状态">{{ obj.status==1?'启用':'禁用' }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="备注说明">
              {{ obj.description }}
            </detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="拥有权限">
              <a-row
                :gutter="24"
                :style="{ marginBottom: '12px' }">
                <a-col :span="24" v-for="(role, index) in obj.permissions" :key="index" :style="{ marginBottom: '12px' }">
                  <a-col :lg="6" :md="24">
                    <span>{{ role.name + (role.description ? ('/' + role.description) : '' ) }}：</span>
                  </a-col>
                  <a-col :lg="18" :md="24" v-if="role.actionData.length > 0">
                    <a-tag color="cyan" v-for="(action, k) in role.actionData" :key="k">{{ action.describe }}</a-tag>
                  </a-col>
                  <a-col :span="18" v-else>-</a-col>
                </a-col>
              </a-row>
            </detail-list-item>
          </detail-list>
          <!-- <detail-list :col="1">
            <detail-list-item term="数据权限">
              数据权限列表
            </detail-list-item>
          </detail-list> -->
        </a-card>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// getRoleInfo, removeRole, getRolePage, getPermissonData, saveRole
import { STable } from '@/components'
import { getRoleInfo, removeRole, getRolePage, getPermissonData, saveRole } from '@/api/manage'
// import { getMonitoringTreeList } from '@/api/Monitoring'
import pick from 'lodash.pick'
import DetailList from '@/components/DescriptionList/DescriptionList'
import AFormItem from 'ant-design-vue/es/form/FormItem'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'TableList',
  components: {
    AFormItem,
    STable,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      // checkedList: [],
      // 数据权限
      // autoExpandParent: false, // 是否自动展开父节点
      // expandedKeys: [], // （受控）展开指定的树节点
      // selectedKeys: [], // （受控）设置选中的树节点
      // checkedKeys: [],
      // treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
      // treeData: [],
      obj: {},
      saveDisabled: false,
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      title: '',
      readTitle: '',
      visible: false,
      visibleRead: false,
      addLoading: false,
      readLoading: false,
      loading: false,
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true, // 快速跳转至某页
        pageSize: 10,
        // total: 50,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      mdl: {},
      permissions: [],
      btnPer: [],
      current: '',
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '唯一识别码',
          dataIndex: 'roleCode',
          key: 'roleCode',
          align: 'center',
          ellipsis: true
        },
        {
          title: '角色名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          ellipsis: true
        }, {
          title: '操作',
          // width: '150px',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          align: 'center',
          ellipsis: true
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getRolePage(parameter)
          .then(res => {
            console.log('getRoleList', res)
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    this.loadPermissions()
    // 权限按钮显示
    const pathPermissionId = this.$route.path.split('/').pop()
    let btnPermission = this.roles.permissions.filter(v => v.permissionId === pathPermissionId)
    btnPermission = btnPermission[0].actionList
    btnPermission.forEach(v => {
      if (v === 'add') {
        this.actionList.add = 1
      } else if (v === 'get') {
        this.actionList.get = 1
      } else if (v === 'update') {
        this.actionList.update = 1
      } else if (v === 'delete') {
        this.actionList.delete = 1
      }
    })
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    })
  },
  // watch: {
  //   permissions (newVal, oldVal) {
  //     this.permissions = newVal
  //   }
  // },
  methods: {
    // 遍历一级菜单
    addPermission (item) {
      this.current = item.permissionId
      if (item.children.length === 0) {
        this.btnPer = [item]
      } else {
        this.btnPer = item.children
      }
      console.log(item)
    },
    // 权限选择前的名字
    chooseName (permission) {
      if (!permission.selectedName) {
        this.permissions.forEach((v, i, arr) => {
          if (v.children && v.children.length === 0) {
            if (v.permissionId === permission.permissionId) {
              arr[i].selected = []
              arr[i].checkedAll = false
              arr[i].indeterminate = false
            }
          } else {
            v.children.forEach((val, j, arr2) => {
              if (val.permissionId === permission.permissionId) {
                arr2[j].selected = []
                arr2[j].checkedAll = false
                arr2[j].indeterminate = false
              }
            })
          }
        })
      }
    },
    // 查询按钮
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          console.log('Received values of form: ', values)
          this.queryParam = {
            entity: {
              status: values.status,
              name: values.name
            }
          }
          this.$refs.table.refresh(true)
        } else {
          console.log('error', error)
        }
      })
    },
    // 重置按钮
    handleReset (e) {
      console.log('重置搜索框！')
      this.searchForm.resetFields()
    },
    // 添加按钮
    addDrawerShow (record) {
      this.title = '添加角色'
      this.visible = true
      this.addPermission(this.permissions[0])
    },
    // 修改按钮
    handleEdit (e) {
      this.addPermission(this.permissions[0])
      var obj = { id: e.id }
      getRoleInfo(obj).then(res => {
        this.form.setFieldsValue(pick(res.result, 'id', 'roleCode', 'name', 'status', 'description'))
        // var data = []
        console.log(res.result)
        this.permissions.forEach((v, i, arr) => {
          if (v.children && v.children.length === 0) {
            res.result.permissions.forEach(val => {
              if (v.permissionId === val.permissionId) {
                arr[i].selected = val.actionData.map(vv => vv.action)
                arr[i].indeterminate = (val.actionData.length > 0 && v.actionData.length !== val.actionData.length)
                arr[i].selectedName = true
                arr[i].checkedAll = (v.actionData.length === val.actionData.length)
              }
            })
          } else {
            v.children.forEach((v2, j) => {
              res.result.permissions.forEach(val => {
                if (v2.permissionId === val.permissionId) {
                  arr[i].children[j].selected = val.actionData.map(vv => vv.action)
                  arr[i].children[j].indeterminate = (val.actionData.length > 0 && v.children[j].actionData.length !== val.actionData.length)
                  arr[i].children[j].selectedName = true
                  arr[i].children[j].checkedAll = (v.children[j].actionData.length === val.actionData.length)
                }
              })
            })
          }
        })
      })
      this.visible = true
      this.title = '修改角色信息'
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交信息: ', values)
          // console.log('permissions: ' + JSON.stringify(this.permissions))
          console.log(this.permissions)
          // 用于判断children即二级菜单是否有选中，如果有选中就把一级菜单权限添加进权限列表，添加一次
          var count = 0
          // 存放权限路由列表
          var menuCheck = []
          // 遍历权限列表，筛选出选中的路由
          this.permissions.forEach(v => {
            // 判断子级是否存在，如果不存在则判断是否选中，选中就添加进新数组
            if (v.children.length === 0) {
              if (v.selectedName) {
                menuCheck.push(v)
              }
            } else {
              // 每次有子级把数量清0
              count = 0
              // 遍历子级
              v.children.forEach(val => {
                // 判断子级是否有选中路由
                if (val.selectedName) {
                  // 自增1
                  count++
                  // 当数量等于1时添加父级菜单进权限列中，只添加一次
                  if (count === 1) {
                    menuCheck.push({
                      name: v.name,
                      permissionId: v.permissionId
                    })
                  }
                  menuCheck.push(val)
                }
              })
            }
          })
          console.log(menuCheck)
          // 把数据调换成服务器需要的格式
          var permissionDtoList = []
          menuCheck.forEach(v => {
            const obj = {}
            obj.permissionId = v.permissionId
            obj.name = v.name
            // 判断选中的按钮权限是否存在
            if (v.selected && v.selected.length > 0) {
              obj.actionData = v.actionData.map(val => {
                for (const item of v.selected) {
                  if (val.value === item) {
                    return {
                      action: val.value,
                      describe: val.label
                    }
                  }
                }
              })
              // 过滤掉空的占位符
              obj.actionData = obj.actionData.filter(v => v)
            }
            permissionDtoList.push(obj)
          })
          console.log(permissionDtoList)
          permissionDtoList = permissionDtoList.filter(v => v)
          values.permissionDtoList = permissionDtoList
          console.log(values)
          saveRole(values).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
              this.visible = false
              this.saveDisabled = false
            } else {
              this.$message.error(res.message)
              this.saveDisabled = false
            }
            this.loadPermissions()
          })
        } else {
          console.log('错误信息: ', err)
          this.saveDisabled = false
          this.form.option.focus = true
          this.confirmLoading = false
          this.form.resetFields()
        }
      })
    },
    // 关闭添加抽屉页面
    onClose (e) {
      this.visible = false
      this.form.resetFields()
      this.permissions = this.permissions.map((v, i, arr) => {
        if (v.children && v.children.length === 0) {
          v.selectedName = false
          v.selected = []
          v.indeterminate = false
          v.checkedAll = false
          return v
        } else {
          v.children = v.children.map(val => {
            val.selectedName = false
            val.selected = []
            val.indeterminate = false
            val.checkedAll = false
            return val
          })
          return v
        }
      })
    },
    // 查看按钮
    handleRead (e) {
      this.readTitle = '查看角色信息'
      var param = { id: e.id }
      getRoleInfo(param).then(res => {
        this.obj = res.result
      })
      this.visibleRead = true
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      console.log('record！', e)
      var obj = { id: e.id }
      removeRole(obj).then(res => {
        if (res.code === 1) {
          this.$success({
            title: '提示信息',
            content: '删除成功',
            onOk: () => this.$refs.table.refresh(true)
          })
        } else {
          this.$error({
            title: '提示信息',
            content: '删除失败' + res.message
          })
        }
      })
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    okHandle () {
      this.$refs.table.refresh(true)
      this.visible = false
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 权限选择部分
    onChangeCheck (permission) {
      permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionData.length)
      permission.checkedAll = permission.selected.length === permission.actionData.length
    },
    onChangeCheckAll (e, permission) {
      // console.log('permission:', permission)
      Object.assign(permission, {
        selected: e.target.checked ? permission.actionData.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    loadPermissions () {
      getPermissonData().then(res => {
        if (res.code === 1) {
          // console.log(JSON.stringify(res.result))
          const result = res.result
          this.permissions = result.map(v => {
            if (v.children.length === 0) {
              v.selectedName = false
              v.checkedAll = false
              v.indeterminate = false
              v.selected = []
              v.actionData = v.actionData.map(v2 => {
                return {
                  label: v2.describe,
                  value: v2.action
                }
              })
              return v
            } else {
              v.children = v.children.map(val => {
                val.selectedName = false
                val.checkedAll = false
                val.indeterminate = false
                val.selected = []
                val.actionData = val.actionData.map(v3 => {
                  return {
                    label: v3.describe,
                    value: v3.action
                  }
                })
                return val
              })
              return v
            }
          })
          console.log(this.permissions)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .active {
    color: #36d;
  }
</style>

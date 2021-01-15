<template>
  <a-card class="userCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="用户名称">
                <a-input
                  v-decorator="['name']"
                  placeholder="请输入用户名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="用户角色">
                <a-select
                  v-decorator="['roleId']"
                  placeholder="请选择用户角色"
                >
                  <a-select-option v-for="item in templateDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
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
      <S-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :loading="loading"
        :rowKey="record => record.id"
        ref="table"
      >
        <!-- <span slot="status" slot-scope="text">
          {{ text | statusFilter }}
        </span> -->
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
      </S-table>
    </div>
    <!-- 添加、修改抽屉 -->
    <div>
      <a-drawer
        :width="700"
        @close="onClose"
        :title="title"
        :visible="visible"
        :confirmLoading="addLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <a-form-item>
            <a-input hidden="hidden" v-decorator="['id']"/>
          </a-form-item>
          <a-form-item label="登录账号">
            <a-input
              v-decorator="['username', {
                rules: [{ required: true, message: '登录账号不能为空' }]
              }]"
              placeholder="请输入登录账号"
            />
          </a-form-item>
          <a-form-item label="登录密码">
            <a-input
              v-decorator="['password', {
                rules: [{ required: true, message: '登录密码不能为空' }]
              }]"
              placeholder="请输入登录密码"
            />
          </a-form-item>
          <a-form-item label="用户名称">
            <a-input
              v-decorator="['name', {
                rules: [{ required: true, message: '请选择用户' }]
              }]"
              placeholder="请选择用户"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="联系方式">
            <a-input
              v-decorator="['telephone', {
                rules: [
                  { required: true, message: '联系方式不能为空' }
                ]
              }]"
              @blur="MobileNumberValidator"
              placeholder="请输入联系方式"
            />
          </a-form-item>
          <a-form-item label="用户角色">
            <a-select
              v-decorator="['roleId', {
                rules: [{ required: true, message: '请选择用户角色' }]
              }]"
              placeholder="请选择用户角色"
            >
              <a-select-option v-for="item in templateDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="是否启用">
            <a-radio-group
              v-decorator="[
                'status', {
                  rules: [{ required: true, message: '请选择' }]
                }]"
            >
              <a-radio :value="1">启用</a-radio>
              <a-radio :value="0">禁用</a-radio>
            </a-radio-group>
          </a-form-item>
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
        :width="600"
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
          <detail-list :col="2">
            <detail-list-item term="用户ID">{{ obj.id }}</detail-list-item>
            <detail-list-item term="用户名称">{{ obj.name }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="联系方式">{{ obj.telephone }}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="登录账号">{{ obj.username }}</detail-list-item>
            <detail-list-item term="登录密码">{{ obj.password }}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="用户角色">{{ obj.roleName }}</detail-list-item>
            <detail-list-item term="状态">{{ obj.status === 1 ? "启用":"禁用" }}</detail-list-item>
          </detail-list>
        </a-card>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import DetailList from '@/components/DescriptionList/DescriptionList'
import { STable } from '@/components'
import { getUserPage, saveUser, getUserInfo, removeUser } from '@/api/user'
import { getRoleList } from '@/api/manage'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'UserList',
  components: {
    AFormItem,
    DetailList,
    DetailListItem,
    STable
  },
  data () {
    return {
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
      queryParam: [],
      obj: {},
      actionList: {}, // 权限按钮
      templateDatas: [],
      // 表格分页栏设置
      pagination: {
        // pageSize: 10,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '用户名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true,
          width: '10%'
        },
        {
          title: '登录账号',
          dataIndex: 'username',
          key: 'username',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '用户角色',
          dataIndex: 'roleName',
          key: 'roleName',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '状态',
          dataIndex: 'statusName',
          key: 'statusName',
          align: 'center',
          // scopedSlots: { customRender: 'status' },
          ellipsis: true,
          width: '10%'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          // fixed: 'right',
          align: 'center'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getUserPage(parameter)
          .then(res => {
            if (res.code === 1) {
              return res.result
            }
          })
      }
    }
  },
  // filters: {
  //   statusFilter (status) {
  //     const statusMap = {
  //       1: '正常',
  //       0: '禁用'
  //     }
  //     return statusMap[status]
  //   }
  // },
  created () {
    this.fetchTemplateData()
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
  methods: {
    // 手机号验证
    MobileNumberValidator (e) {
      const idcardReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (e.target.value && !idcardReg.test(e.target.value)) {
        const arr = [{
          message: '请输入正确的手机号码格式',
          field: 'telephone'
        }]
        this.form.setFields({ telephone: { value: e.target.value, errors: arr } })
      }
    },
    // 新增按钮
    addDrawerShow () {
      this.title = '添加用户'
      this.visible = true
    },
    // 查询按钮
    handleSearch (e) {
      console.log('查询列表！')
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          console.log('Received values of form: ', values)
          var param = {
            entity: {
              name: values.name,
              roleId: values.roleId
            }
          }
          Object.assign(this.queryParam, param)
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
    // 修改按钮
    handleEdit (e) {
      this.title = '修改用户信息'
      this.visible = true
      const param = { id: e.id }
      getUserInfo(param).then(res => {
        this.obj = res.result
        if (res.result.userType === 0) {
          this.presonInputDisabled = false
        }
        this.form.setFieldsValue(pick(res.result, 'id', 'username', 'name', 'password', 'roleId', 'telephone', 'status'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交信息: ', values)
          saveUser(values).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
              this.visible = false
              this.saveDisabled = false
            } else {
              this.$message.error('保存失败：' + res.message)
              this.saveDisabled = false
              console.log('保存失败：' + res.message)
            }
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
      this.presonInputDisabled = true
      this.form.resetFields()
    },
    // 查看按钮
    handleRead (e) {
      // console.log('查看数据！')
      this.readTitle = '查看用户信息'
      this.visibleRead = true
      var param = { id: e.id }
      getUserInfo(param).then(res => {
        this.obj = res.result
      })
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      const param = {
        roleId: e.roleId,
        id: e.id
      }
      removeUser(param).then(res => {
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
    fetchTemplateData () {
      console.log('in method')
      // 这里是自定义的一个请求方法,请求角色下拉列表
      var param = {}
      getRoleList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.templateDatas.push(r)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

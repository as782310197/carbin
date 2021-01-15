<template>
  <a-card class="icpCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="工控机名称">
                <a-input
                  v-decorator="['name']"
                  placeholder="请输入工控机名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="部署位置">
                <a-input
                  v-decorator="['position']"
                  placeholder="请输入部署位置"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="状态">
                <a-select
                  v-decorator="['status']"
                  placeholder="请选择状态"
                >
                  <a-select-option value="1">
                    已启用
                  </a-select-option>
                  <a-select-option value="0">
                    已停用
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24" :style="{ textAlign: 'right' }">
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
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        ref="table"
      >
        <span slot="status" slot-scope="text">
          {{ text | statusFilter }}
        </span>
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" style="color:#556B2F;" v-if="actionList.update === 1">
            <a-icon type="edit" /> 修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" style="color:#696969;" v-if="actionList.get === 1">
            <a-icon type="profile" />查看
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
            <a href="#" style="color:#FF4500;">
              <a-icon type="close-circle" />删除
            </a>
          </a-popconfirm>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改抽屉 -->
    <div>
      <a-drawer
        :width="600"
        @close="onClose"
        :title="title"
        :visible="visible"
        :confirmLoading="addLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="工控机IP">
            <a-input
              v-decorator="['ip', {
                rules: [{ required: true, message: '工控机IP不能为空' }]
              }]"
              placeholder="请输入工控机IP"
            />
          </a-form-item>
          <a-form-item label="工控机名称">
            <a-input
              v-decorator="['name', {
                rules: [{ required: true, message: '工控机名称不能为空' }]
              }]"
              placeholder="请输入工控机名称"
            />
          </a-form-item>
          <a-form-item label="部署位置">
            <a-input
              v-decorator="['position', { rules: [{ required: true, message: '部署位置不能为空' }]}]"
              placeholder="请输入部署位置"
            />
          </a-form-item>
          <a-form-item label="负责人">
            <a-input
              v-decorator="['charger', {
                rules: [
                  { required: true, message: '负责人不能为空' }
                ]
              }]"
              placeholder="请输入负责人"
            />
          </a-form-item>
          <a-form-item label="负责人电话">
            <a-input
              v-decorator="['phone', {
                rules: [
                  { required: true, message: '负责人电话不能为空' }
                ]
              }]"
              @blur="MobileNumberValidator"
              placeholder="请输入负责人电话"
            />
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              v-decorator="[
                'status',
                { rules: [{ required: true, message: '请选择状态' }] },
              ]"
              placeholder="请选择状态"
            >
              <a-select-option :value="1">
                启用
              </a-select-option>
              <a-select-option :value="0">
                停用
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea
              v-decorator="['memo', {
                rules: [{ required: false, message: '请输入备注信息' }]
              }]"
              placeholder="请输入备注信息..."
              :rows="8"
            />
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
            <detail-list-item term="工控机ID">{{ obj.id }}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="工控机IP">{{ obj.ip }}</detail-list-item>
            <detail-list-item term="工控机名称">{{ obj.name }}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="部署位置">{{ obj.position }}</detail-list-item>
            <detail-list-item term="状态">{{ obj.status === 1 ? "已启用":"已停用" }}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="负责人">{{ obj.charger }}</detail-list-item>
            <detail-list-item term="负责人电话">{{ obj.phone }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="备注">
              {{ obj.memo }}
            </detail-list-item>
          </detail-list>
        </a-card>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getIcpPage, saveIcp, getIcpInfo, removeIcp } from '@/api/icp'
import DetailList from '@/components/DescriptionList/DescriptionList'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'IcpList',
  components: {
    AFormItem,
    STable,
    DetailList,
    DetailListItem
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
      obj: {},
      // 查询参数
      queryParam: {},
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '工控机ID',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          ellipsis: true
        },
        {
          title: '工控机IP',
          dataIndex: 'ip',
          key: 'ip',
          align: 'center',
          ellipsis: true
        },
        {
          title: '工控机名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '部署位置',
          dataIndex: 'position',
          key: 'position',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' },
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' }, // 插槽
          key: 'operation',
          // fixed: 'right',
          align: 'center'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getIcpPage(parameter)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: '已启用',
        0: '已停用'
      }
      return statusMap[status]
    }
  },
  created () {
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
          field: 'phone'
        }]
        this.form.setFields({ phone: { value: e.target.value, errors: arr } })
      }
    },
    // 新增按钮
    addDrawerShow () {
      this.title = '添加工控机'
      this.visible = true
    },
    // 查询按钮
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          var param = {
            entity: {
              name: values.name,
              position: values.position,
              status: values.status
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
      this.searchForm.resetFields()
    },
    // 修改按钮
    handleEdit (e) {
      this.title = '修改工控机信息'
      this.visible = true
      const param = { id: e.id }
      getIcpInfo(param).then(res => {
        this.obj = res.result
        this.form.setFieldsValue(pick(res.result, 'id', 'ip', 'name', 'position', 'charger', 'phone', 'status', 'memo'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          saveIcp(values).then(res => {
            if (res.code === 1) {
              // this.$success({
              //   title: '提示信息',
              //   content: '保存成功',
              //   onOk: () => this.okHandle()
              // })
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
              this.visible = false
              this.saveDisabled = false
            } else {
              // this.$error({
              //   title: '提示信息',
              //   content: '保存失败' + res.message
              // })
              this.$message.error('保存失败：' + res.message)
              this.saveDisabled = false
            }
          })
        } else {
          console.log('错误信息: ', err)
          this.saveDisabled = false
          this.form.option.focus = true // 对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验
          this.confirmLoading = false
          this.form.resetFields()
        }
      })
    },
    // 关闭添加抽屉页面
    onClose (e) {
      this.visible = false
      this.form.resetFields()
    },
    // 查看按钮
    handleRead (e) {
      this.readTitle = '查看工控机信息'
      this.visibleRead = true
      var param = { id: e.id }
      getIcpInfo(param).then(res => {
        this.obj = res.result
      })
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      const param = {
        id: e.id
      }
      removeIcp(param).then(res => {
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
      this.form.resetFields()
      this.$refs.table.refresh(true)
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <a-card class="permisionCard">
    <!-- 搜索 -->
    <div>
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col span="8">
              <a-form-item label="权限名称">
                <a-input
                  placeholder="请输入权限名称"
                />
              </a-form-item>
            </a-col>
            <a-col span="8">
              <a-form-item label="状态">
                <a-select
                  placeholder="请选择状态"
                  default-value="0"
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
    </div>
    <div class="tableDiv">
      <!-- 表格 -->
      <s-table
        size="default"
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        :loading="loading"
        ref="table"
      >
        <span slot="actions" slot-scope="text, record">
          <a-tag v-for="(action, index) in record.actionDtos" :key="index">{{ action.description }}</a-tag>
        </span>
        <span slot="status" slot-scope="text">
          {{ text | statusFilter }}
        </span>
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <!-- <a-divider type="vertical" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="confirm(record)"
            @cancel="cancel"
            okText="确定"
            cancelText="取消"
          >
            <a href="#">
              删除
            </a>
          </a-popconfirm> -->
        </template>
      </s-table>
    </div>
    <!-- 添加、修改抽屉 -->
    <div>
      <a-drawer
        :width="600"
        @close="onClose"
        title="修改权限信息"
        :visible="visible"
        :confirmLoading="addLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <a-form-item
            label="唯一识别码"
          >
            <a-input
              v-decorator="['url']"
              placeholder="请输入URL地址"
              disabled="disabled"
            />
          </a-form-item>
          <a-form-item
            label="类别"
          >
            <a-input
              v-decorator="['description']"
              placeholder="请输入类别"
              disabled="disabled"
            />
          </a-form-item>
          <a-form-item
            label="权限名称"
          >
            <a-input
              v-decorator="['moduleName']"
              placeholder="请输入权限名称"
              disabled="disabled"
            />
          </a-form-item>
          <a-form-item
            label="状态"
          >
            <a-select
              v-decorator="['status']"
              placeholder="请选择状态"
            >
              <a-select-option :value="1">正常</a-select-option>
              <a-select-option :value="0">禁用</a-select-option>
            </a-select>
          </a-form-item>
          <a-divider />
          <a-form-item
            label="赋予权限"
          >
            <a-select
              style="width: 100%"
              mode="multiple"
              v-decorator="['actions']"
              :allowClear="true"
              placeholder="请选择权限"
            >
              <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.value">{{ action.label }}</a-select-option>
            </a-select>
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
        :width="800"
        @close="onReadClose"
        :title="readTitle"
        :visible="visibleRead"
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="唯一识别码" :span="2">
            {{ viewDetails.url }}
          </a-descriptions-item>
          <a-descriptions-item label="类别" :span="2">
            {{ viewDetails.description }}
          </a-descriptions-item>
          <a-descriptions-item label="权限名称" :span="2">
            {{ viewDetails.moduleName }}
          </a-descriptions-item>
          <a-descriptions-item label="状态" :span="2">
            {{ viewDetails.status === 1 ? '正常' : '禁用' }}
          </a-descriptions-item>
          <a-descriptions-item label="描述" :span="4">
            {{ viewDetails.description }}
          </a-descriptions-item>
          <a-descriptions-item label="赋予权限" :span="4">
            {{ viewDetails.decStr }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import DetailList from '@/components/DescriptionList/DescriptionList'
import { STable } from '@/components'
import { getPermissionPage, permissionSave } from '@/api/permission'
import pick from 'lodash.pick'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'ModuleList',
  components: {
    STable,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      viewDetails: {},
      saveDisabled: false,
      searchForm: this.$form.createForm(this), // 搜索
      form: this.$form.createForm(this), // 添加表单
      readTitle: '',
      visible: false,
      visibleRead: false,
      addLoading: false,
      readLoading: false,
      loading: false,
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        // showSizeChanger: true,
        // showQuickJumper: true,
        // pageSize: 10,
        // total: 50,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      mdl: {},
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '唯一识别码',
          dataIndex: 'url',
          align: 'center',
          ellipsis: true
        },
        {
          title: '类别',
          dataIndex: 'description',
          align: 'center',
          ellipsis: true
        },
        {
          title: '权限名称',
          dataIndex: 'moduleName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '可操作权限',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'actions' },
          align: 'left'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          // fixed: 'right',
          align: 'center'
        }
      ],
      // 向后端拉取可以用的操作列表
      permissionList: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getPermissionPage(parameter)
          .then(res => {
            if (res.code === 1) {
              return res.result
            } else {
              this.$message.error(res.message)
            }
          })
      },

      selectedRowKeys: [],
      selectedRows: [],
      permissionId: '' // 需要修改权限的id
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: '正常',
        0: '禁用'
      }
      return statusMap[status]
    }
  },
  created () {
    this.loadPermissionList()
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
    loadPermissionList () {
      // permissionList
      new Promise(resolve => {
        const data = [
          // { label: '列表', value: 'query', defaultChecked: false },
          // { label: '查询', value: 'query', defaultChecked: false },
          { label: '新增', value: 'add', defaultChecked: false },
          { label: '修改', value: 'update', defaultChecked: false },
          { label: '删除', value: 'delete', defaultChecked: false },
          { label: '查看', value: 'get', defaultChecked: false },
          // { label: '审核', value: 'examine', defaultChecked: false },
          { label: '导入', value: 'import', defaultChecked: false },
          { label: '导出', value: 'export', defaultChecked: false }
        ]
        resolve(data)
      }).then(res => {
        this.permissionList = res
      })
    },
    // 搜索按钮
    handleSearch () {},
    // 重置按钮
    handleReset () {
      console.log('重置搜索框！')
      this.searchForm.resetFields()
    },
    // 修改按钮
    handleEdit (record) {
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'url', 'description', 'moduleName', 'actions', 'status'))
      })
      this.permissionId = record.id
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 阻止默认事件
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交信息: ', values)
          const param = {
            moduleId: this.permissionId,
            actions: JSON.parse(JSON.stringify(values.actions))
          }
          permissionSave(param).then(res => {
            if (res.code === 1) {
              this.visible = false
              this.saveDisabled = false
              this.$message.success('保存成功')
              this.confirmLoading = false
              // this.$emit('handleSubmit', values)
              this.form.resetFields()
              this.$refs.table.refresh(true)
            }
          })
          // setTimeout(() => {
          //   this.visible = false
          //   this.saveDisabled = false
          //   this.$message.success('保存成功')
          //   this.confirmLoading = false
          //   // this.$emit('handleSubmit', values)
          //   this.form.resetFields()
          // }, 1500)
        } else {
          console.log('错误信息: ', err)
          this.saveDisabled = false
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
    handleRead (record) {
      var str = record.actionList && record.actionList.map(v => {
        return v.description
      })
      record.decStr = str && str.length > 0 ? str.join('、') : ''
      this.viewDetails = record
      this.readTitle = '查看权限信息'
      this.visibleRead = true
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      this.$success({
        title: '提示信息',
        content: '删除成功'
      })
      console.log(e)
      // var index = this.data.findIndex(v => e === v.key)
      // this.data.splice(index, 1)
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>

<style scoped>

</style>

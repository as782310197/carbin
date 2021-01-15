<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="名称">
              <a-input
                v-decorator="['name']"
                placeholder="请输入名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="手机号码">
              <a-input
                v-decorator="['phone']"
                placeholder="请输入手机号码"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '3px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 按钮部分 -->
    <div class="button_div">
      <a-button type="primary" @click="handleAdd" v-if="actionList.add === 1">添加</a-button>
    </div>
    <!-- 表格部分 -->
    <div class="table_div">
      <s-table
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
            @confirm="handleDelete(record)"
            @cancel="handleCancelDeletion"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="javaScript:void(0)">删除</a>
          </a-popconfirm>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改表单部分 -->
    <div class="add_div">
      <a-drawer
        :width="600"
        @close="onClose"
        :title="addDrawerTitle"
        :visible="addDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <!-- :default-value="moment(joinTime, 'YYYY-MM-DD')" -->
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSaveSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="姓名">
            <a-input
              v-decorator="['name', {rules: [
                { required: true, message: '名称不能为空' }
              ]}]"
              placeholder="请输入名称"
            />
          </a-form-item>
          <a-form-item label="手机号码">
            <a-input
              v-decorator="['phone', {rules: [
                { required: true, message: '手机号码不能为空' }
              ]}]"
              placeholder="请输入手机号码"
            />
          </a-form-item>
          <a-form-item label="职位">
            <a-input
              v-decorator="['position', {rules: [
                { required: true, message: '职位不能为空' }
              ]}]"
              placeholder="请输入职位"
            />
          </a-form-item>
          <a-form-item label="加入日期">
            <a-date-picker
              placeholder="请输入加入日期"
              v-decorator="['joinDate', {rules: [
                { required: true, message: '加入日期不能为空' }
              ]}]"
            />
          </a-form-item>
          <a-form-item label="分成比例">
            <a-input
              v-decorator="['rate', {rules: [
                { required: true, message: '分成比例不能为空' }
              ]}]"
              placeholder="请输入分成比例"
            />
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              v-decorator="['status', {
                rules: [{ required: true, message: '请选择' }]
              }]"
              placeholder="请选择"
            >
              <a-select-option :value="1">启用</a-select-option>
              <a-select-option :value="0">禁用</a-select-option>
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
          v-show="saveDivVisible"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" html-type="submit" @click="handleSaveSubmit" :disabled="saveDisabled">保存</a-button>
        </div>
      </a-drawer>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="650"
        @close="onReadDrawerClose"
        title="查看业务员信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="姓名" :span="2">
            {{ readListData.name }}
          </a-descriptions-item>
          <a-descriptions-item label="手机号码" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="职位" :span="2">
            {{ readListData.position }}
          </a-descriptions-item>
          <a-descriptions-item label="加入日期" :span="2">
            {{ readListData.joinDate }}
          </a-descriptions-item>
          <a-descriptions-item label="分成比例" :span="2">
            {{ readListData.rate }}
          </a-descriptions-item>
          <a-descriptions-item label="状态" :span="2">
            {{ readListData.status === 1 ? '启用' : '禁用' }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
  // getfindBizStaffPage, getfindBizStaff, removeBizStaff, saveBizStaff
import moment from 'moment'
import { STable } from '@/components'
import { getfindBizStaffPage, saveBizStaff, removeBizStaff } from '@/api/bizStaff.js'
import pick from 'lodash.pick'
// 引入权限数据
import { mapState } from 'vuex'

export default {
  components: {
			STable
	},
  data () {
    return {
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      addDrawerTitle: '', // 添加、修改抽屉的标题
      addDrawerVisible: false, // 添加、修改抽屉的可见性
      saveDisabled: false, // 设置保存按钮是否可操作
      saveDivVisible: true, // 设置保存按钮所在操作栏的可见性
      readDrawerVisible: false, // 查看抽屉的可见性
      readListData: [], // 存放查看信息的数组
      actionList: {}, // 权限按钮
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      queryParam: {}, // 查询数据字段
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true
        },
        {
          title: '职位',
          dataIndex: 'position',
          key: 'position',
          align: 'center',
          ellipsis: true
        },
        {
          title: '加入日期',
          dataIndex: 'joinDate',
          key: 'joinDate',
          align: 'center',
          ellipsis: true
        },
        {
          title: '分成比例',
          dataIndex: 'rate',
          key: 'rate',
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          // fixed: 'right',
          align: 'center',
          width: '20%'
        }
      ],
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        console.log(parameter)
        return getfindBizStaffPage(parameter).then(res => {
          console.log('getfindBizStaffPage', res)
          return res.result
        })
      }
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
    moment,
    // 查询按钮
    handleSearchSubmit (e) {
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          const param = {
            entity: {
              name: values.name,
              phone: values.phone
            }
          }
          Object.assign(this.queryParam, param)
          this.$refs.table.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
    // 清空查询输入框按钮
    handleSearchReset () {
      this.searchForm.resetFields()
    },
    // 添加按钮
    handleAdd () {
      this.addDrawerTitle = '添加业务员'
      this.addDrawerVisible = true
    },
    // 修改按钮
    handleEdit (record) {
      this.addDrawerTitle = '修改业务员信息'
      this.addDrawerVisible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          joinDate: moment(record.joinDate, 'YYYY-MM-DD')
        })
        this.form.setFieldsValue(pick(record, 'id', 'position', 'name', 'rate', 'phone', 'status'))
      })
    },
    // 保存按钮
    handleSaveSubmit () {
      this.saveDisabled = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
         /*  const param = {
            id: values.id,
            name: values.name,
            phone: values.phone,
            position: values.position,
            rate: values.rate,
            joinDate: values.joinTime,
            status: values.status
          } */
          if (values.phone && !(/^1[3456789]\d{9}$/.test(values.phone))) {
            this.$message.error('手机号码有误，请重填')
            this.saveDisabled = false
            return
          }
          saveBizStaff(values).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
            } else {
              this.$message.error(res.message)
            }
            this.addDrawerVisible = false
            this.saveDisabled = false
          })
        } else {
          this.$message.error('带*号的数据不能为空')
          this.saveDisabled = false
        }
      })
    },
    // 查看按钮
    handleRead (record) {
      console.log(record)
      this.readListData = record
      this.readDrawerVisible = true
    },
    // 删除按钮
    handleDelete (key) {
      removeBizStaff({ id: key.id }).then(res => {
        if (res.code === 1) {
          console.log(1)
          this.$message.success('删除成功')
          this.$refs.table.refresh(true)
        } else {
          console.log(456)
          this.$message.error(res.result)
        }
      })
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
    },
    // 关闭添加修改抽屉按钮
    onClose () {
      this.addDrawerVisible = false
      this.form.resetFields()
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>

</style>

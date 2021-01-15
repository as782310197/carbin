<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
        <a-row>
          <!-- <a-col :span="12">
            <a-form-item label="账单名称">
              <a-input
                v-decorator="['billName']"
                placeholder="请输入账单名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="账单周期">
              <a-input
                v-decorator="['billCycle']"
                placeholder="请输入账单周期"
              />
            </a-form-item>
          </a-col> -->
          <a-col :span="9">
            <a-form-item label="开始时间">
              <a-date-picker
                v-decorator="['startDate']"
                placeholder="请选择开始时间"
                style="width: 100%;"
                @change="startDateChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="结束时间">
              <a-date-picker
                v-decorator="['endDate']"
                placeholder="请选择结束时间"
                style="width: 100%;"
                @change="endDateChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '2px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 开具申请发票 -->
    <div>
      <div class="button_div">
        <a-button type="primary" @click="openInvoice" v-if="actionList.add === 1">开具</a-button>
      </div>
      <a-modal
        title="选择开票类型"
        :visible="visibleInvoice"
        @ok="handleOkInvoice"
        @cancel="handleCancelInvoice"
        width="30%"
      >
        <a-radio-group
          :default-value="1"
          @change="handleChangeInvoice"
        >
          <a-radio :value="1">增值税专用发票</a-radio>
          <a-radio :value="0">增值税普通发票</a-radio>
        </a-radio-group>
        <a-tree-select
          v-model="invoiceItemTreeValue"
          style="width: 100%; margin-top: 20px;"
          :allowClear="true"
          :tree-data="invoiceItemTreeData"
          placeholder="请选择发票品目"
          @change="selectInvoiceItemChange"
        >
        </a-tree-select>
      </a-modal>
    </div>
    <!-- 表格部分 -->
    <div class="table_div">
      <s-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        :row-selection="rowSelection"
        ref="table"
        v-if="invoiceReload"
      >
        <template slot="operation" slot-scope="text,record">
          <!-- <a @click="handleIssue(record)">
            申请发票
          </a>
          <a-divider type="vertical" /> -->
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
        </template>
      </s-table>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="650"
        @close="onReadDrawerClose"
        title="查看申请开票信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="账单名称" :span="4">
            {{ readListData.billName }}
          </a-descriptions-item>
          <a-descriptions-item label="账单金额" :span="2">
            {{ readListData.rent }}
          </a-descriptions-item>
          <a-descriptions-item label="账单周期" :span="2">
            {{ readListData.billCycle }}
          </a-descriptions-item>
          <a-descriptions-item label="需支付金额" :span="2">
            {{ readListData.amount }}
          </a-descriptions-item>
          <a-descriptions-item label="支付状态" :span="2">
            {{ readListData.statusName }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
  // applyBizBillInvoice
// findBizBillInvoicePage
import { STable } from '@/components'
import { findBillPage, applyBizBillInvoice, getTaxCategoryTree } from '@/api/bizBill.js'
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
      visibleInvoice: false, // 开具发票模态框，用于选择开票类型
      invoiceReload: true, // 重置table数据中的复选框
      invoiceIds: [], // 选择的数据ids
      invoiceType: 0, // 开具发票类型
      rowSelection: {
        onChange: (ids, data) => {
          this.invoiceIds = data.map(v => v.id)
        }
      },
      columns: [
        {
          title: '账单名称',
          dataIndex: 'billName',
          key: 'billName',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '账单金额',
          dataIndex: 'rent',
          key: 'rent',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '账单周期',
          dataIndex: 'billCycle',
          key: 'billCycle',
          align: 'center',
          ellipsis: true
        },
        {
          title: '需支付金额',
          dataIndex: 'amount',
          key: 'amount',
          align: 'center',
          ellipsis: true
        },
        {
          title: '支付状态',
          dataIndex: 'statusName',
          key: 'statusName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
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
      queryParam: {
        entity: {
          applyInvoiceStatus: 0,
          status: 1
        }
      },
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findBillPage(parameter).then(res => {
          return res.result
        })
      },
      // 树结构，发票品目
      invoiceItemTreeValue: undefined, // 指定当前选中的条目
      invoiceItemTreeData: [], // 发票品目的数据
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      startTime: '', // 开始时间
      endTime: '' // 结束时间
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
    this.getTaxTree()
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    })
  },
  methods: {
    // 获取发票品目分类树
    getTaxTree () {
      var param = {}
      getTaxCategoryTree(param).then(res => {
        if (res.code === 1) {
          this.invoiceItemTreeData = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选中树节点时触发的事件
    selectInvoiceItemChange (e) {
      console.log('invoiceItemTreeValue:' + this.invoiceItemTreeValue)
    },
    // 切换选中的发票类型
    handleChangeInvoice (e) {
      this.invoiceType = e.target.value
    },
    // 开具发票的确认事件
    handleOkInvoice () {
      if (!this.invoiceItemTreeValue) {
        this.$message.error('发票品目不能为空')
        return
      }
      this.invoiceReload = false
      applyBizBillInvoice({
        billids: JSON.parse(JSON.stringify(this.invoiceIds)),
        invoiceType: this.invoiceType,
        invoiceCode: this.invoiceItemTreeValue
      }).then(res => {
        this.visibleInvoice = false
        this.invoiceReload = true
        this.invoiceItemTreeValue = undefined
        if (res.code === 1) {
          this.visibleInvoice = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 开具发票的取消事件
    handleCancelInvoice () {
      this.visibleInvoice = false
      this.invoiceItemTreeValue = undefined
    },
    // 打开开具发票模态框
    openInvoice () {
      if (this.invoiceIds.length > 0) {
        this.visibleInvoice = true
      } else {
        this.$message.error('请先选择数据')
      }
    },
    // 开始时间
    startDateChange (data, dataString) {
      this.startDate = dataString
    },
    startTimeChange (data, dataString) {
      this.startTime = dataString
    },
    // 结束时间
    endDateChange (data, dataString) {
      this.endDate = dataString
    },
    endTimeChange (data, dataString) {
      this.endTime = dataString
    },
    // 查询按钮
    handleSearchSubmit (e) {
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        // console.log(values)
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              applyInvoiceStatus: 0,
              status: 1,
              // billName: values.billName,
              // billCycle: values.billCycle,
              startDate: this.startDate,
              endDate: this.endDate
            }
          }
          // 把entity存入queryParam中
          Object.assign(this.queryParam, param)
          // 重新刷新表格
          this.$refs.table.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
    // 清空查询输入框按钮
    handleSearchReset () {
      this.searchForm.resetFields()
      this.startDate = ''
      this.endDate = ''
    },
    // 开具按钮
    handleIssue () {
      this.$confirm({
        title: '确定要申请开票吗？',
        content: '',
        onOk () {},
        onCancel () {}
      })
    },
    // 查看按钮
    handleRead (record) {
      this.readListData = record
      this.readDrawerVisible = true
    },
    // 删除按钮
    handleDelete (key) {
      const index = this.loadData.key
      this.loadData.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
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

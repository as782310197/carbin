<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="车主姓名">
              <a-input
                v-decorator="['carOwner']"
                placeholder="请输入车主姓名"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item label="联系电话">
              <a-input
                v-decorator="['phone']"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col> -->
          <a-col :span="8">
            <a-form-item label="开始时间">
              <a-date-picker
                v-decorator="['startTime']"
                placeholder="请选择开始时间"
                style="width: 100%;"
                @change="startTimeChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="结束时间">
              <a-date-picker
                v-decorator="['endTime']"
                placeholder="请选择结束时间"
                style="width: 100%;"
                @change="endTimeChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="订单状态">
              <a-select
                v-decorator="['status']"
                placeholder="请选择"
              >
                <a-select-option value="0">待企业支付</a-select-option>
                <a-select-option value="1">已打款</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '6px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
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
          <a @click="handleStopOrder(record)" v-if="actionList.delete === 1 && record.status === 0">
            终止订单
          </a>
          <a-divider type="vertical" v-if="actionList.delete === 1 && record.status === 0" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
        </template>
      </s-table>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="1000"
        @close="onReadDrawerClose"
        title="查看租车订单信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered title="订单信息" :column="4">
          <a-descriptions-item label="企业金额" :span="2">
            {{ readListData.amount }}
          </a-descriptions-item>
          <a-descriptions-item label="账单周期" :span="2">
            {{ readListData.billCycle }}
          </a-descriptions-item>
          <a-descriptions-item label="车主" :span="2">
            {{ readListData.carOwner }}
          </a-descriptions-item>
          <!-- <a-descriptions-item label="车主身份类型" :span="2">
            {{ readListData.carOwnerType }}
          </a-descriptions-item> -->
          <a-descriptions-item label="企业手续费" :span="2">
            {{ readListData.charge }}
          </a-descriptions-item>
          <a-descriptions-item label="开始日期" :span="2">
            {{ readListData.startDate }}
          </a-descriptions-item>
          <a-descriptions-item label="企业名称" :span="2">
            {{ readListData.enterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="车牌号" :span="2">
            {{ readListData.identifyNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="发放租金" :span="2">
            {{ readListData.payRent }}
          </a-descriptions-item>
          <a-descriptions-item label="订单周期" :span="2">
            {{ readListData.period }}
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="账单租金" :span="2">
            {{ readListData.rent }}
          </a-descriptions-item>
          <a-descriptions-item label="订单状态" :span="2">
            {{ readListData.statusName }}
          </a-descriptions-item>
          <a-descriptions-item label="发票手续费" :span="2">
            {{ readListData.taxCharge }}
          </a-descriptions-item>
        </a-descriptions>
        <!-- <a-divider />
        <a-descriptions size="small" bordered title="车辆信息" :column="4">
          <a-descriptions-item label="车牌号" :span="2">
            {{ readListData.carNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="车主姓名" :span="2">
            {{ readListData.name }}
          </a-descriptions-item>
          <a-descriptions-item label="日租金" :span="2">
            200
          </a-descriptions-item>
          <a-descriptions-item label="车辆型号" :span="2">
            东风日产牌EQ7250AC
          </a-descriptions-item>
          <a-descriptions-item label="车辆品牌" :span="2">
            {{ readListData.vehicleBrand }}
          </a-descriptions-item>
          <a-descriptions-item label="发动机号" :span="2">
            386853A
          </a-descriptions-item>
          <a-descriptions-item label="车架号" :span="2">
            LGBF1DE058R125339
          </a-descriptions-item>
          <a-descriptions-item label="车辆使用油号" :span="2">
            96
          </a-descriptions-item>
          <a-descriptions-item label="行驶证扫描件" :span="3">
            <img src="#">
          </a-descriptions-item>
        </a-descriptions> -->
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// terminatesBizOrder, findBizOrderPage
import { STable } from '@/components'
import { findBizOrderPage, terminatesBizOrder } from '@/api/bizOrder.js'
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
      queryParam: {},
      columns: [
        {
          title: '企业名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '车主姓名',
          dataIndex: 'carOwner',
          key: 'carOwner',
          align: 'center',
          ellipsis: true
        },
        // {
        //   title: '身份类型',
        //   dataIndex: 'carOwnerType',
        //   key: 'carOwnerType',
        //   align: 'center',
        //   ellipsis: true
        // },
        {
          title: '车牌号',
          dataIndex: 'identifyNumber',
          key: 'identifyNumber',
          align: 'center',
          ellipsis: true
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true
        },
        {
          title: '订单状态',
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
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findBizOrderPage(parameter).then(res => {
          return res.result
        })
      },
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
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    })
  },
  methods: {
    // 开始时间
    startTimeChange (data, dataString) {
      this.startTime = dataString
    },
    // 结束时间
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
              carOwner: values.carOwner,
              // phone: values.phone,
              status: values.status,
              startTime: this.startTime,
              endTime: this.endTime
            }
          }
          // 把entity存入queryParam中
          Object.assign(this.queryParam, param)
          // 重新刷新表格s
          this.$refs.table.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
    // 清空查询输入框按钮
    handleSearchReset () {
      this.searchForm.resetFields()
      this.startTime = ''
      this.endTime = ''
    },
    // 终止订单按钮
    handleStopOrder (item) {
      var _this = this
      this.$confirm({
        title: '确定终止订单?',
        content: '',
        onOk () {
          terminatesBizOrder({
            id: item.id
          }).then(res => {
            if (res.code === 1) {
              _this.$message.success('已终止订单')
              _this.$refs.table.refresh(true)
            } else {
              _this.$message.error(res.message)
            }
          })
        },
        onCancel () {
          _this.$message.info('取消终止订单')
        }
      })
      // this.$message.warning('已终止订单')
    },
    // 查看按钮
    handleRead (record) {
      this.readListData = record
      this.readDrawerVisible = true
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

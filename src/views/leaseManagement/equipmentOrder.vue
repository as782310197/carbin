<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="设备主姓名">
              <a-input
                v-decorator="['carOwner']"
                placeholder="请输入设备主姓名"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="8">
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
          <a-col :span="4" :style="{ textAlign: 'center' }">
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
    <!-- 按钮部分 -->
    <div class="button_div">
      <a-button type="primary" @click="handleImport">导入设备租金结算</a-button>
    </div>
    <!-- 表格部分 -->
    <div class="table_div">
      <s-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        ref="table"
        :scroll="{ x: 'calc(1200px + 90%)' }"
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
        title="查看设备订单信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered title="订单信息" :column="4">
          <a-descriptions-item label="租赁公司名称" :span="4">
            {{ readListData.enterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="车主" :span="2">
            {{ readListData.deviceOwner }}
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="设备类型" :span="2">
            {{ readListData.deviceType }}
          </a-descriptions-item>
          <a-descriptions-item label="设备租金" :span="2">
            {{ readListData.rent }}
          </a-descriptions-item>
          <a-descriptions-item label="发放租金" :span="2">
            {{ readListData.payRent }}
          </a-descriptions-item>
          <a-descriptions-item label="企业金额" :span="2">
            {{ readListData.amount }}
          </a-descriptions-item>
          <a-descriptions-item label="综合服务费" :span="2">
            {{readListData.charge+readListData.taxCharge }}
          </a-descriptions-item>
          <a-descriptions-item label="订单状态" :span="2">
            {{ readListData.statusName }}
          </a-descriptions-item>
          <a-descriptions-item label="创建时间" :span="2">
            {{ readListData.createTime }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
    <!-- 导入工程租金结算部分 -->
    <div class="add_div">
      <a-drawer
        :width="800"
        @close="onClose"
        title="结算"
        :visible="importDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px',
          width: '600px',
          margin: '0 auto'
        }"
      >
        <a-descriptions title="导入设备租金结算">
          <a-descriptions-item label="操作说明" span="3">
            1、上传文件需要与下载模板文件模板列一致。
            <br />
            2、若系统检查到异常情况,将会直接回滚本次所有操作,需要下载检查所在行,再进行上传。
            <br />
            3、上传完成需要前往<strong>账单管理-->设备账单-->手动生成账单-->打款支付。</strong>
          </a-descriptions-item>
          <a-descriptions-item label="租金结算表" span="3">
            <a href="http://boss.wangshuibao.com/api/uploadFiles/租金结算表.xlsx">
              <a-button icon="download" size="small">模板下载</a-button>
            </a>
          </a-descriptions-item>
          <a-descriptions-item label="上传文件" span="3">
            <a-upload
              name="file"
              :multiple="true"
              :headers="headers"
              :fileList="downloadFiles"
              :customRequest="downloadFilesCustomRequest"
            >
              <a-button type="primary" size="small"> <a-icon type="upload" /> 上传excel </a-button>
            </a-upload>
          </a-descriptions-item>

        </a-descriptions>
      </a-drawer>
    </div>
    <!-- 导入失败弹窗 -->
    <div class="error_div">
      <a-modal
        :visible="uploadErrorModal"
        title="导入失败"
        :footer="null"
        @cancel="uploadErrorModalCancel"
      >
        <div>{{ uploadErrorMessage }}</div>
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { findDeviceOrderPage, terminatesBizOrder, uploadDeviceOrderExcel } from '@/api/bizOrder.js'
// 引入权限数据
import { mapState } from 'vuex'

export default {
  components: {
    STable
  },
  data () {
    return {
      sucdate: '123',
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      readDrawerVisible: false, // 查看抽屉的可见性
      importDrawerVisible: false, // 导入抽屉的可见性
      readListData: [], // 存放查看信息的数组
      actionList: {}, // 权限按钮
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      queryParam: {},
      columns: [
        {
          title: '租赁公司名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '设备类型',
          dataIndex: 'deviceType',
          key: 'deviceType',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '设备型号',
          dataIndex: 'model',
          key: 'model',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '机械品牌',
          dataIndex: 'brand',
          key: 'brand',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '设备主姓名',
          dataIndex: 'deviceOwner',
          key: 'deviceOwner',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '账单周期',
          dataIndex: 'billCycle',
          key: 'billCycle',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '账单租金',
          dataIndex: 'rent',
          key: 'rent',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '发放租金',
          dataIndex: 'payRent',
          key: 'payRent',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '企业金额',
          dataIndex: 'amount',
          key: 'amount',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '企业手续费',
          dataIndex: 'charge',
          key: 'charge',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '发票手续费',
          dataIndex: 'taxCharge',
          key: 'taxCharge',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '订单状态',
          dataIndex: 'statusName',
          key: 'statusName',
          align: 'center',
          ellipsis: true,
          width: '20%'
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
          fixed: 'right',
          align: 'center',
          width: '150px'
        }
      ],
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findDeviceOrderPage(parameter).then(res => {
          return res.result
        })
      },
      // 上传时的头部信息
      headers: {
        authorization: 'authorization-text'
      },
      downloadFiles: [],
      uploadErrorModal: false, // 导入失败弹窗的可见性
      uploadErrorMessage: '', // 导入失败描述信息
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
    },
    // 导入工程租金结算
    handleImport () {
      this.importDrawerVisible = true
    },
    // 导入抽屉关闭
    onClose () {
      this.importDrawerVisible = false
    },
    oncks(val) {
      alert(val)
    },
    // 上传图片
    downloadFilesCustomRequest (data) {
      var fd = new FormData()
      fd.append('file', data.file)
      uploadDeviceOrderExcel(fd).then(res => {
        if (res.code === 1) {
           this.$message.info('导入成功');
         
        }else{
          this.$message.info(res.message);
          this.importDrawerVisible = false
         this.$refs.table.refresh(true)
          // self.$refs.table.refresh(true)
        }
        // if (res.code === 1) {
        //   var result = res.result
        //   var failedCount = result.failedCount
        //   this.importDrawerVisible = false
        //   self.$refs.table.refresh(true)
        //   if (failedCount > 0) {
        //     this.uploadErrorMessage = result.errorMessage
        //     const self = this
        //     this.$error({
        //       title: '导入失败',
        //       // content: result.errorMessage,
        //       content: (
        //         <div>
        //           <p>共{result.improtCount}条,成功{result.successCount}条，失败{result.failedCount}条</p>
        //           <p>{result.errorMessage}</p>
        //         </div>
        //       ),
        //       onOk () {}
        //     })
        //     // this.uploadErrorModal = true
        //   } else {
        //     this.$success({
        //       title: '导入成功',
        //       // content: '导入成功！',
        //       content: (
        //         <div>
        //           <p>共{result.improtCount}条,成功{result.successCount}条，失败{result.failedCount}条</p>
        //         </div>
        //       ),
        //       onOk () {}
        //     })
        //   }
        // }
        // if (res.code === 1) {
        //   this.$message.success('上传成功')
        //   this.importDrawerVisible = false
        //   this.$refs.table.refresh(true)
        // } else {
        //   // this.$message.error('上传失败')
        //   this.importDrawerVisible = false
        //   this.uploadErrorMessage = res.data.message
        //   this.uploadErrorModal = true
        // }
      })
    },
    // 导入失败弹框取消按钮
    uploadErrorModalCancel () {
      this.uploadErrorModal = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>

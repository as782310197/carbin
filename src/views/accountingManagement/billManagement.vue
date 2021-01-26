<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <!-- <a-col :span="8">
            <a-form-item label="账单名称">
              <a-input
                v-decorator="['billName']"
                placeholder="请输入账单名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="账单金额">
              <a-input
                v-decorator="['rent']"
                placeholder="请输入账单金额"
              />
            </a-form-item>
          </a-col> -->
          <a-col :span="8">
            <a-form-item label="开始时间">
              <a-date-picker
                v-decorator="['startDate']"
                placeholder="请选择开始时间"
                style="width: 100%;"
                @change="startDateChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="结束时间">
              <a-date-picker
                v-decorator="['endDate']"
                placeholder="请选择结束时间"
                style="width: 100%;"
                @change="endDateChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="状态">
              <a-select
                v-decorator="['status']"
                placeholder="请选择状态"
              >
                <a-select-option value="0">未上传凭证</a-select-option>
                <a-select-option value="1">已上传凭证</a-select-option>
                <a-select-option value="2">已申请发票</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 手动生成账单 -->
    <div class="button_div">
      <a-button type="primary" @click="handleAdd">手动生成账单</a-button>
    </div>
    <!-- 手动生成账单的抽屉 -->
    <div class="hand_bill" v-if="handBillToggle">
      <a-drawer
        width="80%"
        @close="handBillClose"
        title="手动生成账单"
        :visible="handBillToggle"
      >
        <div class="search_div">
          <a-form :form="handSearchForm" @submit="handSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-row :gutter="24">
              <!-- <a-col :span="10">
                <a-form-item label="手机号码">
                  <a-input
                    v-decorator="['phone']"
                    placeholder="请输入手机号码"
                  />
                </a-form-item>
              </a-col> -->
              <a-col :span="6">
                <a-form-item label="车主姓名">
                  <a-input
                    v-decorator="['carOwner']"
                    placeholder="请输入车主姓名"
                  />
                </a-form-item>
              </a-col>
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
              <a-col :span="24" :style="{ textAlign: 'right' }">
                <a-button type="primary" html-type="submit">
                  查询
                </a-button>
                <a-button :style="{ marginLeft: '8px' }" @click="handSearchReset">
                  清空
                </a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="button_div">
          <a-button type="primary" @click="handBill" :disabled="billDisabled" v-if="actionList.add === 1">生成账单</a-button>
        </div>
        <s-table
          :columns="handColumns"
          :data="handLoadData"
          :rowKey="record => record.id"
          :pagination="handPagination"
          ref="handTable"
          :row-selection="rowSelection"
        >
          <!-- :rowSelection="{ selectedRowKeys: selhand }" -->
        </s-table>
      </a-drawer>
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
          <a @click="handleUploadPaymentVoucher(record)" v-if="actionList.update === 1 && record.status === 0">
            上传支付凭证
          </a>
          <a-divider type="vertical" v-if="((actionList.update === 1 && actionList.get === 1) || actionList.get !== 1) && record.status === 0" />
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
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="600"
        @close="onReadDrawerClose"
        title="查看结算信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" title="基本信息" bordered :column="4">
          <a-descriptions-item label="账单名称" :span="4">
            {{ readListData.billName }}
          </a-descriptions-item>
          <a-descriptions-item label="账单周期" :span="4">
            {{ readListData.billCycle }}
          </a-descriptions-item>
          <a-descriptions-item label="需支付金额" :span="4">
            {{ readListData.amount }}元
          </a-descriptions-item>
          <a-descriptions-item label="数量" :span="4">
            {{ readListData.count }}
          </a-descriptions-item>
          <a-descriptions-item label="账单金额" :span="4">
            {{ readListData.rent }}元
          </a-descriptions-item>
          <a-descriptions-item label="支付状态" :span="4">
            {{ readListData.statusName }}
          </a-descriptions-item>
          <a-descriptions-item label="支付凭证" :span="4" v-if="!upLoadVisible || !showUpload">
            <!-- <img :src="readListData.businessLicenseImg"> -->
            <viewer class="imgBox" :images="readListData.voucherImage" v-if="readListData.voucherImage">
              <img
                class="img"
                :src="readListData.voucherImage"
              >
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
        <a-divider v-if="upLoadVisible" />
        <!-- 上传支付凭证 -->
        <div v-if="upLoadVisible && showUpload">
          <a-form :form="upLoadForm" @submit="handlefixPayment" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-form-item label="上传支付凭证">
              <a-upload
                :action="`${baseURL}/upload/singleFileUpload`"
                list-type="picture-card"
                :file-list="fileListImg"
                :before-upload="beforeUpload"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileListImg.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传图片
                  </div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisibleImg" :footer="null" @cancel="handleCancelImg">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-form-item>
            <div class="fix_payment_btn_box">
              <a-button type="primary" class="fix_payment_btn" @click="handlefixPayment">确定已打款</a-button>
            </div>
          </a-form>
        </div>
        <!-- 已上传支付凭证 -->
        <div v-else-if="!showUpload" class="confirmed-box">
          <span>已上传支付凭证</span>
        </div>
      </a-drawer>
    </div>
  </a-card>
</template>
<script>
// createBizBillManully, findBizBillPage ,getBizOrder ,removebizBill ,savebizBill, importBizBillvoucherImage
import { STable } from '@/components'
import { findBizBillPage, createBizBillManully, removebizBill, importBizBillvoucherImage } from '@/api/bizBill.js'
import { findBizOrderPage } from '@/api/bizOrder.js'
import { baseUrl } from '@/utils/util.js'
// 引入权限数据
import { mapState } from 'vuex'

function getBase64 (file, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  components: {
    STable
  },
  data () {
    return {
      rowSelection: {
        onChange: (ids, data) => {
          this.handBillIds = data.map(v => v.id)
        }
        // onSelect: (record, selected, selectedRows) => {
        //   console.log(record, selected, selectedRows)
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //   console.log(selected, selectedRows, changeRows)
        // }
      },
      fileListImg: [],
      previewImage: '',
      previewVisibleImg: false,
      billDisabled: false,
      handBillIds: [], // 手动生成账单选中的id数组
      handSearchForm: this.$form.createForm(this), // 手动生成账单搜索
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      upLoadForm: this.$form.createForm(this), // 上传支付凭证表单
      addDrawerTitle: '', // 添加、修改抽屉的标题
      addDrawerVisible: false, // 添加、修改抽屉的可见性
      saveDisabled: false, // 设置保存按钮是否可操作
      saveDivVisible: true, // 设置保存按钮所在操作栏的可见性
      readDrawerVisible: false, // 查看抽屉的可见性
      upLoadVisible: false, // 上传支付凭证块的显示与否
      showUpload: true, // 是否已上传支付凭证
      readListData: [], // 存放查看信息的数组
      handBillToggle: false, // 默认手动生成账单抽屉为关闭状态
      actionList: {}, // 权限按钮
      settlementMethodChooseList: [
        {
          key: '0',
          value: '一次性支付'
        },
        {
          key: '1',
          value: '分期支付'
        }
      ],
      lease: [
        {
          id: '0',
          company: '海信电视城'
        },
        {
          id: '1',
          company: '海底捞'
        }
      ],
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      handPagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      queryParam: {},
      queryParam1: {
        entity: {
          applyBillStatus: 0
        }
      },
      handColumns: [
        {
          title: '企业名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          width: 100,
          ellipsis: true
        },
        {
          title: '订单周期',
          dataIndex: 'billCycle',
          key: 'billCycle',
          align: 'center',
          width: 100,
          ellipsis: true
        },
        {
          title: '账单租金',
          dataIndex: 'rent',
          key: 'rent',
          align: 'center',
          width: 100,
          ellipsis: true
        },
        {
          title: '手续费',
          dataIndex: 'charge',
          key: 'charge',
          align: 'center',
          width: 100,
          ellipsis: true
        },
        {
          title: '企业支付金额',
          dataIndex: 'amount',
          key: 'amount',
          align: 'center',
          width: 150,
          ellipsis: true
        },
        {
          title: '车主姓名',
          dataIndex: 'carOwner',
          key: 'carOwner',
          align: 'center',
          width: 100,
          ellipsis: true
        },
        {
          title: '车牌号',
          dataIndex: 'identifyNumber',
          key: 'identifyNumber',
          align: 'center',
          width: 100,
          ellipsis: true
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          width: 100,
          ellipsis: true
        }
      ],
      columns: [
        {
          title: '账单名称',
          dataIndex: 'billName',
          key: 'billName',
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
          title: '账单周期',
          dataIndex: 'billCycle',
          key: 'billCycle',
          align: 'center',
          ellipsis: true
        },
        {
          title: '账单金额',
          dataIndex: 'rent',
          key: 'rent',
          align: 'center',
          ellipsis: true
        },
        {
          title: '数量',
          dataIndex: 'count',
          key: 'count',
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
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findBizBillPage(parameter).then(res => {
          console.log(res.result)
          return res.result
        })
      },
      handLoadData: parameter => {
        Object.assign(parameter, this.queryParam1)
        return findBizOrderPage(parameter).then(res => {
          return res.result
        })
      },
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
  },
  computed: {
    // 基础路径
    baseURL () {
      return baseUrl()
    },
    ...mapState({
      roles: state => state.user.roles
    })
  },
  methods: {
    handSearchReset () {
      this.handSearchForm.resetFields()
      this.startTime = ''
      this.endTime = ''
    },
    // 选择账单数据
    // selhand () {},
    // 生成账单
    handBill () {
      if (this.handBillIds.length > 0) {
        this.billDisabled = true
        var that = this
        // debugger
        this.$confirm({
          title: '信息',
          content: h => <div>确定生成订单</div>,
          onOk () {
            createBizBillManully({
              orderIds: JSON.parse(JSON.stringify(that.handBillIds)),
              type: 1
            }).then(res => {
              if (res.code === 1) {
                that.handBillToggle = false
                that.$refs.table.refresh(true)
                that.$message.success('手动生成账单成功')
                that.handBillIds = []
              } else {
                that.$message.error(res.message)
              }
              that.billDisabled = false
            })
          },
          onCancel () {
            that.billDisabled = false
          }
        })
      } else {
        this.$message.error('请选择数据')
      }
    },
    // 手动生成账单搜索
    handSearchSubmit (e) {
      e.preventDefault()
      this.handSearchForm.validateFields((err, values) => {
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              carOwner: values.carOwner,
              // phone: values.phone,
              startTime: this.startTime,
              endTime: this.endTime
            }
          }
          // 把entity存入queryParam中
          Object.assign(this.queryParam1, param)
          // 重新刷新表格
          this.$refs.handTable.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
    // 关闭手动生成账单抽屉
    handBillClose () {
      this.handBillToggle = false
      this.handBillIds = []
      this.handSearchForm.resetFields()
      this.startTime = ''
      this.endTime = ''
    },
    // 手动生成账单
    handleAdd () {
      this.handBillToggle = true
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
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              // billName: values.billName,
              // rent: values.rent,
              status: values.status,
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
    // 上传支付凭证按钮
    handleUploadPaymentVoucher (record) {
      this.readListData = JSON.parse(JSON.stringify(record))
      this.readListData.voucherImage = []
      if (record.voucherImage) {
        this.readListData.voucherImage[0] = record.voucherImage
      }
      if (record.voucherImage === null) {
        this.showUpload = true
        this.upLoadVisible = true
      } else {
        this.showUpload = false
        this.upLoadVisible = false
      }
      // this.readListData = record
      this.readDrawerVisible = true
    },
    // 查看按钮
    handleRead (record) {
      // voucherImage
      this.readListData = JSON.parse(JSON.stringify(record))
      this.readListData.voucherImage = []
      if (record.voucherImage) {
        this.readListData.voucherImage[0] = record.voucherImage
      }
      this.readDrawerVisible = true
      this.upLoadVisible = false
      this.showUpload = true
    },
    // 删除按钮
    handleDelete (key) {
      /* const index = this.loadData.key
      this.loadData.splice(index, 1)
      this.$message.success('删除成功') */
      removebizBill({
        id: key.id
      }).then(res => {
        if (res.code === 1) {
          this.$message.success('删除成功')
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.fileListImg = []
      this.form.resetFields()
    },
    // 确定已打款按钮
    handlefixPayment () {
      var id = this.readListData.id
      if (this.fileListImg.length > 0) {
        var img = this.fileListImg[0].response.url
      } else {
        this.$message.error('上传凭证图片不能为空')
        return
      }
      importBizBillvoucherImage({
        billId: id,
        voucherImage: img
      }).then(res => {
        if (res.code === 1) {
          this.$message.success('上传成功')
          this.readDrawerVisible = false
          this.$refs.table.refresh(true)
          this.form.resetFields()
          this.fileListImg = []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 上传图片
    handleCancelImg () {
      this.previewVisibleImg = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisibleImg = true
    },
    handleChange (info) {
      this.fileListImg = info.fileList
      if (info.file.status === 'uploading') {
        this.addLoading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.addLoading = false
        var list = []
        info.fileList.forEach(v => {
          if (v.url) {
            list.push(v)
          } else {
            if (v.response.status === 'error') {
              this.$message.error('上传图片失败')
            } else {
              list.push(v)
            }
          }
        })
        this.fileListImg = list
      }
    },
    beforeUpload (file) {
      return new Promise((resolve, reject) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          this.$message.error('You can only upload JPG file!')
          return reject(new Error('您只能输入图片'))
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!')
          return reject(new Error('图片大小不能超过2MB'))
        }
        return resolve(true)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .fix_payment_btn_box{
    width: 100%;
    .fix_payment_btn{
      // margin-top: 100px;
      margin-left: 240px;
    }
  }
  .imgBox {
    img {
      width: 200px;
    }
  }
  // 已上传支付凭证
  .confirmed-box {
    width: 100%;
    // margin-top: 50px;
    // margin-left: 40%;
    span {
      display: inline-block;
      width: 150px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: #9D9D9D;
      font-size: 18px;
      border-radius: 5px;
      margin-top: 30px;
      margin-left: 35%;
      background-color: #F0F0F0;
    }
  }
</style>

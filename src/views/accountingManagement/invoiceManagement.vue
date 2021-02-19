<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="发票抬头">
              <a-input
                v-decorator="['enterpriseName']"
                placeholder="请输入发票抬头"
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
          <a-col :span="8">
            <a-form-item label="发票状态">
              <a-select
                v-decorator="['status']"
                placeholder="请选择发票状态"
              >
                <a-select-option v-for="item of statusList" :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
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
      <router-link :to="{ name: 'invoiceApplicationList' }" class="link">
        <a-button type="primary" v-if="actionList.add === 1">申请发票</a-button>
      </router-link>
      <!-- <a-button type="primary" @click="handleInfo" class="distance_left">信息管理</a-button>
      <a-button type="primary" @click="handleAddress" class="distance_left">收货地址</a-button> -->
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
          <a @click="cancleIssue(record)" v-if="actionList.delete === 1 && record.status === 0">
            发票取消
          </a>
          <a-divider type="vertical" v-if="(actionList.get === 1 || actionList.delete === 1) && record.status === 0" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <a-divider type="vertical" v-if="((actionList.update === 1 && actionList.get === 1) || actionList.get !== 1) && record.status === 2" />
          <a @click="handleIssue(record)" v-if="record.status === 2">
            开具发票
          </a>
           <a-divider type="vertical"/>
          <a @click="handleUploadVoucher(record)" v-if="record.statusName === '已开具' && record.sendNo === null ">
            上传凭证
          </a>
          <a-divider type="vertical" v-if="((actionList.update === 1 && actionList.get === 1) || actionList.get !== 1) && record.status === 0" />
          <a-dropdown v-if="record.status === 0">
            <a class="ant-dropdown-link" v-if="actionList.update === 1">
              审核 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="record.status === 0">
                <a @click="handleApproved(record)">申请通过</a>
              </a-menu-item>
              <a-menu-item v-if="record.status === 0">
                <a @click="handleUnApproved(record)">驳回申请</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </s-table>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="650"
        @close="onReadDrawerClose2"
        title="查看发票信息"
        :visible="readDrawerVisible2"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions title="基本信息" size="small" bordered>
          <a-descriptions-item label="发票抬头" :span="3">
            {{ readListData.enterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="税号" :span="3">
            {{ readListData.license }}
          </a-descriptions-item>
          <a-descriptions-item label="发票金额" :span="3">
            {{ readListData.amount }}
          </a-descriptions-item>
          <a-descriptions-item label="账单周期" :span="3">
            {{ readListData.billCycle }}
          </a-descriptions-item>
          <a-descriptions-item label="发票类型" :span="3">
            {{ readListData.invoiceTypeName }}
          </a-descriptions-item>
          <a-descriptions-item label="状态" :span="3">
            {{ readListData.statusName }}
          </a-descriptions-item>
         <a-descriptions-item label="快递单号" :span="3">
            {{ readListData.idStr }}
          </a-descriptions-item>
         
        </a-descriptions>
        <hr />
        <div>
          <a-form :form="uploadForm" @submit="handlefixPayment" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-form-item label="上传支付凭证">
              <a-col :span="8">
              <a-upload
                :action="`${baseURL}/upload/singleFileUpload`"
                list-type="picture-card"
                :file-list="fileListImg2"
                :before-upload="beforeUpload"
                @preview="handlePreview2"
                @change="handleChange2"
              >
                <div v-if="fileListImg2.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传图片
                  </div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisibleImg2" :footer="null" @cancel="handleCancelImg">
                <img alt="example" style="width: 100%" :src="previewImage2" />
              </a-modal>
              </a-col>
            </a-form-item>
            <a-form-item label="快递单号">
               <a-col :span="9">
               <a-input
                v-decorator="['sendNo']"
                placeholder="请输入快递单号"
              />
               </a-col>
            </a-form-item>
            <div class="fix_payment_btn_box" style="margin-left:200px">
              <a-button type="primary" class="fix_payment_btn" @click="handlefixPayment">提交</a-button>
            </div>
          </a-form>
        </div>
       
      </a-drawer>
    </div>
    <!-- 信息管理 -->
    <!-- <div class="info_div">
      <a-modal
        :visible="infoModalVisable"
        title="信息管理"
        width="50%"
        @ok="handleInfoSubmit"
        @cancel="handleInfoCancel"
      >
        <a-form :form="infoForm" @submit="handleInfoSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-item label="企业抬头">
            <a-input
              v-decorator="['name', {rules: [
                { required: true, message: '企业抬头不能为空' }
              ]}]"
              placeholder="请输入企业抬头"
            />
          </a-form-item>
          <a-form-item label="发票类型">
            <a-radio-group
              v-decorator="['type', { initialValue: 0, rules: [{ required: true, message: '请选择发票类型' }]}]"
            >
              <a-radio :value="0">增值税普通发票</a-radio>
              <a-radio :value="1">增值税专用发票</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="税务登记号">
            <a-input
              v-decorator="['number', {rules: [
                { required: true, message: '税务登记号不能为空' }
              ]}]"
              placeholder="请输入税务登记号"
            />
          </a-form-item>
          <a-form-item label="开户银行名称">
            <a-input
              v-decorator="['bankName', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入开户银行名称"
            />
          </a-form-item>
          <a-form-item label="基本开户账号">
            <a-input
              v-decorator="['accountNumber', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入基本开户账号"
            />
          </a-form-item>
          <a-form-item label="注册场所地址">
            <a-input
              v-decorator="['address', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入注册场所地址"
            />
          </a-form-item>
          <a-form-item label="注册固定电话">
            <a-input
              v-decorator="['phone', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入注册固定电话"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div> -->
    <!-- 收货地址 -->
    <!-- <div class="address_div">
      <a-modal
        :visible="addressModalVisable"
        title="收货地址"
        width="50%"
        @ok="handleAddressSubmit"
        @cancel="handleAddressCancel"
      >
        <a-form :form="addressForm" @submit="handleAddressSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-item label="姓名">
            <a-input
              v-decorator="['name', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入收方姓名"
            />
          </a-form-item>
          <a-form-item label="手机号码">
            <a-input
              v-decorator="['phone', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入手机号码"
            />
          </a-form-item>
          <a-form-item label="收货城市">
            <a-input
              v-decorator="['city', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入收货城市"
            />
          </a-form-item>
          <a-form-item label="详细地址">
            <a-input
              v-decorator="['address', {rules: [
                { required: false }
              ]}]"
              placeholder="请输入详细地址"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div> -->
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
import { STable } from '@/components'
import { baseUrl } from '@/utils/util.js'
import { findBizBillInvoicePage, passBizBillInovice, rejectBizBillInovice, madeOutBizBillInovice, cancleBizBillInvoice,uploadNo } from '@/api/bizBill.js'
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
      info: [],
      fileListImg: [],
      fileListImg2: [],
      uploadForm:this.$form.createForm(this),
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      infoForm: this.$form.createForm(this), // 信息管理表单
      addressForm: this.$form.createForm(this), // 收货地址表单
      addDrawerTitle: '', // 添加、修改抽屉的标题
      addDrawerVisible: false, // 添加、修改抽屉的可见性
      saveDisabled: false, // 设置保存按钮是否可操作
      saveDivVisible: true, // 设置保存按钮所在操作栏的可见性
      readDrawerVisible: false, // 查看抽屉的可见性
      readDrawerVisible2: false,
      infoModalVisable: false, // 信息管理弹框的可见性
      addressModalVisable: false, // 收货地址弹框的可见性
      readListData: [], // 存放查看信息的数组
      actionList: {}, // 权限按钮
      previewImage2: '',
      previewVisibleImg2: false,
      statusList: [
        {
          key: '0',
          value: '待审核'
        },
        {
          key: '2',
          value: '审核通过'
        },
        {
          key: '1',
          value: '审核驳回'
        },
        {
          key: '3',
          value: '已开具'
        },
        {
          key: '4',
          value: '已取消'
        }
      ],
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      queryParam: {},
      columns: [
        {
          title: '发票抬头',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '税号',
          dataIndex: 'license',
          key: 'license',
          align: 'center',
          ellipsis: true
        },
        {
          title: '发票类型',
          dataIndex: 'invoiceTypeName',
          key: 'invoiceTypeName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '发票金额',
          dataIndex: 'amount',
          key: 'amount',
          align: 'center',
          ellipsis: true
        },
        {
          title: '发票状态',
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
        return findBizBillInvoicePage(parameter).then(res => {
          console.log(res.result)
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
     baseURL () {
      return baseUrl()
    },
    ...mapState({
      roles: state => state.user.roles
    })
  },
  methods: {
    // 上传图片
    handleCancelImg () {
      this.previewVisibleImg2 = false
    },
    cancleIssue (val) {
      var _this = this
      this.$confirm({
        title: '是否取消发票？',
        content: '',
        onOk () {
          cancleBizBillInvoice({
            id: val.id
          }).then(res => {
            if (res.code === 1) {
              _this.$message.success('发票取消成功')
              _this.$refs.table.refresh(true)
            } else {
              _this.$message.error(res.message)
            }
          })
        },
        onCancel () {
          _this.$message.info('取消发票')
        }
      })
    },

     handleChange2 (info) {
      this.fileListImg2 = info.fileList
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
        this.fileListImg2 = list
       
      }
    },

    handlefixPayment (e) {
      e.preventDefault()
      var id=this.readListData.idStr
      console.log(id)
      this.uploadForm.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          console.log(values.sendNo)
          values.idStr=this.readListData.idStr
          values.licenseImage2 = this.fileListImg2[0].response.url
          console.log(this.fileListImg2[0].response.url)
         
          uploadNo(values).then(res => {
            if (res.code === 1) {
              this.$message.info('上传成功')
              // this.$message.success('保存成功')
              location.reload() // 强迫浏览器刷新当前页面
              // this.$refs.table.refresh(true)
              // this.form.refresh()
              // this.form.resetFields()
              // this.$refs.table.refresh(true)
            } else {
              this.$message.error(res.message)
            }
            this.addDrawerVisible = false
            this.saveDisabled = false
          })
          // 查询条件entity对象里放查询各个查询字段
          // const param = {
          //   entity: {
          //     // billName: values.billName,
          //     // rent: values.rent,
          //     status: values.status,
          //     startDate: this.startDate,
          //     endDate: this.endDate
          //   }
          // }
          // 把entity存入queryParam中
        //   Object.assign(this.queryParam, param)
        //   // 重新刷新表格
        //   this.$refs.table.refresh(true)
        } else {
          console.log('error', err)
        }
      })
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
    },
    async handlePreview2 (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage2 = file.url || file.preview
      this.previewVisibleImg2 = true
    },
    // 上传支付凭证按钮
    handleUploadVoucher (record) {
     
      this.readListData = JSON.parse(JSON.stringify(record))
      console.log(this.readListData)
      this.readDrawerVisible2=true
     
    },
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
              status: values.status,
              enterpriseName: values.enterpriseName,
              startTime: this.startTime,
              endTime: this.endTime
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
      this.startTime = ''
      this.endTime = ''
    },
    // 信息管理按钮
    handleInfo () {
      this.infoModalVisable = true
    },
    // 收货地址按钮
    handleAddress () {
      this.addressModalVisable = true
    },
    // 开具发票按钮
    handleIssue (val) {
      var _this = this
      this.$confirm({
        title: '是否通过申请？',
        content: '',
        onOk () {
          madeOutBizBillInovice({
            id: val.id
          }).then(res => {
            if (res.code === 1) {
              _this.$message.success('发票申请成功')
              _this.$refs.table.refresh(true)
            } else {
              _this.$message.error(res.message)
            }
          })
        },
        onCancel () {
          _this.$message.info('取消申请')
        }
      })
    },
    // 申请通过按钮
    handleApproved (val) {
      var _this = this
      this.$confirm({
        title: '是否通过审核？',
        content: '',
        onOk () {
          passBizBillInovice({
            id: val.id
          }).then(res => {
            if (res.code === 1) {
              _this.$message.success('发票审核成功')
              _this.$refs.table.refresh(true)
            } else {
              _this.$message.error(res.message)
            }
          })
        },
        onCancel () {
          _this.$message.info('取消审核')
        }
      })
    },
    // 驳回申请按钮
    handleUnApproved (val) {
      var _this = this
      this.$confirm({
        title: '是否驳回申请？',
        content: '',
        onOk () {
          rejectBizBillInovice({
            id: val.id
          }).then(res => {
            if (res.code === 1) {
              _this.$message.success('发票驳回成功')
              _this.$refs.table.refresh(true)
            } else {
              _this.$message.error(res.message)
            }
          })
        },
        onCancel () {
          _this.$message.info('取消驳回')
        }
      })
    },
    
    onReadDrawerClose2 () {
      this.readDrawerVisible2 = false
      this.fileListImg = []
      this.form.resetFields()
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
    },
    // 信息管理表单提交按钮
    // handleInfoSubmit (e) {
    //   console.log(e)
    // },
    // handleInfoCancel () {
    //   this.infoModalVisable = false
    //   this.infoForm.resetFields()
    // },
    // // 信息管理表单提交按钮
    // handleAddressSubmit (e) {
    //   console.log(e)
    // },
    // handleAddressCancel () {
    //   this.addressModalVisable = false
    //   this.addressForm.resetFields()
    // },
    onTimeChange (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>

<style lang="less" scoped>
  .distance_left {
    margin-left: 20px;
  }
  .ant-descriptions + .ant-descriptions {
    margin-top: 20px;
  }
</style>

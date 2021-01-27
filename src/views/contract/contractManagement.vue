<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="合同编号">
              <a-input
                v-decorator="['contractCode']"
                placeholder="请输入合同编号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="企业名称">
              <a-input
                v-decorator="['enterpriseName']"
                placeholder="请输入企业名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同类型">
              <a-select
                v-decorator="['type']"
                placeholder="请选择合同类型"
              >
                <a-select-option value="1">租车合同</a-select-option>
                <a-select-option value="2">设备出租合同</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
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
          <a-col :span="4" :style="{ textAlign: 'center' }">
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
        <span slot="contractType" slot-scope="text">
          {{ text | typeFilter }}
        </span>
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <!-- <a-divider type="vertical" v-if="actionList.get === 1 || actionList.delete === 1" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="handleDelete(record)"
            @cancel="handleCancelDeletion"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="javaScript:void(0)">删除</a>
          </a-popconfirm> -->
          <a-divider type="vertical" v-if="!record.content || record.content === ''" />
          <a @click="handleUploadFlied(record)" v-if="!record.content || record.content === ''">上传附件</a>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改表单部分 -->
    <div class="add_div">
      <a-drawer
        :width="800"
        @close="onClose"
        :title="addDrawerTitle"
        :visible="addDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" @submit="handleSaveSubmit">
          <a-form-item hidden="hidden">
            <a-input v-decorator="['id']"></a-input>
          </a-form-item>
          <a-form-item label="合同编号">
            <a-input
              v-decorator="['contractCode', {rules: [
                { required: true, message: '合同编号不能为空' }
              ]}]"
              placeholder="请输入合同编号"
              :disabled="contractCodeDisabled"
            />
          </a-form-item>
          <a-form-item label="租赁公司名称">
            <a-input
              v-decorator="['serviceEnterpriseName', {rules: [
                { required: true, message: '租赁公司名称不能为空' }
              ]}]"
              placeholder="请输入租赁公司名称"
              defaultValue="合生科技有限公司"
            />
          </a-form-item>
          <a-form-item hidden="hidden"><!-- 企业id -->
            <a-input
              v-decorator="['enterpriseId', {initialValue: enterpriseId, rules: [
                { required: true, message: '企业名称不能为空' }
              ]}]"
              placeholder="请输入企业名称"
            />
          </a-form-item>
          <a-form-item label="企业名称">
            <a-input
              v-decorator="['enterpriseName', {initialValue: enterpriseName, rules: [
                { required: true, message: '企业名称不能为空' }
              ]}]"
              placeholder="请输入企业名称"
              @click="openChooseEnterpriseModal"
            />
          </a-form-item>
          <!-- 选择企业弹框 -->
          <a-modal
            width="60%"
            :visible="chooseEnterpriseModalVisible"
            title="选择企业"
            :closable="false"
            @ok="onChooseEnterprise"
            @cancel="onChooseEnterpriseClose"
          >
            <s-table
              size="small"
              :columns="enterpriseColumns"
              :data="enterpriseLoadData"
              :pagination="enterprisePagination"
              :rowKey="record => record.id"
              :row-selection="{ hideDefaultSelections: true, type: 'radio', selectedRowKeys: enterpriseSelectedRowKeys, onChange: onEnterpriseSelectChange }"
              ref="enterpriseTable"
            >
            </s-table>
          </a-modal>
          <a-form-item label="合同类型">
            <a-select
              v-decorator="['type', {rules: [
                { required: true, message: '合同类型不能为空' }
              ]}]"
              placeholder="请选择合同类型"
            >
              <a-select-option :value="1">租车合同</a-select-option>
              <a-select-option :value="2">设备出租合同</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="税点">
            <a-input
              v-decorator="['rate', {rules: [
                { required: true, message: '税点不能为空' }
              ]}]"
              placeholder="请输入大于0，小于1的小数(最多保留小数后四位)"
              @blur="taxRateValidator"
            />
          </a-form-item>
          <a-form-item label="服务费点数">
            <a-input
              v-decorator="['serviceRate', {rules: [
                { required: true, message: '服务费点数不能为空' }
              ]}]"
              placeholder="请输入大于0，小于1的小数(最多保留小数后四位)"
              @blur="serviceChargeValidator"
            />
          </a-form-item>
          <a-form-item label="上传附件（pdf文件）">
            <a-upload
              name="file"
              :file-list="fileList"
              :action="`${baseURL}/upload/singleFileUpload`"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <a-button v-if="fileList.length < 1"> <a-icon type="upload" /> 上传附件 </a-button>
            </a-upload>
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
        :width="700"
        @close="onReadDrawerClose"
        title="查看合同信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="合同编号" :span="4">
            {{ readListData.contractCode }}
          </a-descriptions-item>
          <a-descriptions-item label="租赁公司名称" :span="4">
            {{ readListData.serviceEnterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="企业名称" :span="4">
            {{ readListData.enterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="合同类型" :span="4">
            {{ readListData.type === 1 ? '租车合同' : '设备出租合同' }}
          </a-descriptions-item>
          <a-descriptions-item label="税点" :span="2">
            {{ readListData.rate }}
          </a-descriptions-item>
          <a-descriptions-item label="服务费点数" :span="2">
            {{ readListData.serviceRate }}
          </a-descriptions-item>
          <a-descriptions-item label="附件(pdf文件)" :span="4">
            <a :href="readListData.content" target="_blank">
              <a-icon type="link" />
              合同附件链接
            </a>
          </a-descriptions-item>
          <a-descriptions-item label="创建时间" :span="4">
            {{ readListData.createTime }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
    <!-- 上传附件 -->
    <div class="upload_div">
      <a-modal
        :visible="UploadDrawerVisible"
        :closable="false"
        title="上传附件"
        @ok="handleUploadSubmit"
        @cancel="onUploadDrawerClose"
      >
        <div class="upload-box">
          <h3><strong> 上传附件（只支持上传pdf文件）</strong></h3>
          <div class="file-box">
            <a-upload
              name="file"
              :file-list="fileList"
              :action="`${baseURL}/upload/singleFileUpload`"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <a-button v-if="fileList.length < 1"> <a-icon type="upload" /> 上传附件 </a-button>
            </a-upload>
          </div>
        </div>
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getfindBizContractPage, saveBizContract, saveContractAttachment } from '@/api/bizContract'
import { getfindBizEnterprisePage } from '@/api/bizEnterprise.js'
import pick from 'lodash.pick'
import { baseUrl } from '@/utils/util.js'
// 引入权限数据
import { mapState } from 'vuex'

// function getBase64 (file, callback) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = error => reject(error)
//   })
// }

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
      UploadDrawerVisible: false, // 上传附件抽屉的可见性
      UploadDisabled: false, // 上传附件确定按钮的可操作性
      actionList: {}, // 权限按钮
      fileList: [], // 上传图片
      fileUrl: '',
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      queryParam: {}, // 查询数据字段
      columns: [
        {
          title: '合同编号',
          dataIndex: 'contractCode',
          key: 'contractCode',
          align: 'center',
          ellipsis: true
        },
        {
          title: '租赁公司名称',
          dataIndex: 'serviceEnterpriseName',
          key: 'serviceEnterpriseName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '企业名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '合同类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'contractType' },
          key: 'type',
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
        return getfindBizContractPage(parameter).then(res => {
          return res.result
        })
      },
      contractId: '', // 合同id
      // 选择企业弹窗
      enterpriseQueryParam: {
        entity: {
          status: 2
        }
      }, // 选择企业弹框查询参数
      enterprisePagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      }, // 选择企业弹框表格的分页
      chooseEnterpriseModalVisible: false, // 选择企业弹框的可见性
      enterpriseRowInfo: {}, // 选中企业行的信息
      enterpriseId: '', // 企业id
      enterpriseName: '', // 企业名称
      enterpriseSelectedRowKeys: [], // 选中的行Key值
      enterpriseColumns: [
        {
          title: '企业名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '法人代表',
          dataIndex: 'legalPerson',
          key: 'legalPerson',
          align: 'center',
          ellipsis: true
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
          align: 'center',
          ellipsis: true
        }
      ],
      enterpriseLoadData: parameter => {
        Object.assign(parameter, this.enterpriseQueryParam)
        return getfindBizEnterprisePage(parameter).then(res => {
          return res.result
        })
      },
      contractCodeDisabled: false, // 合同编号输入框的可编辑性
      startTime: '', // 开始时间
      endTime: '' // 结束时间
    }
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        1: '租车合同',
        2: '设备出租合同'
      }
      return typeMap[type]
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
    }),
    // 基础路径
    baseURL () {
      return baseUrl()
    }
  },
  methods: {
    moment,
    // 验证税率
    taxRateValidator (e) {
      var value = e.target.value
      var value1 = parseFloat(value).toFixed(4)
      if (value >= 1 || value < 0) {
        const arr = [{
          message: '请输入大于0，小于1的小数',
          field: 'rate'
        }]
        this.form.setFields({ rate: { value: value, errors: arr } })
      } else if (value > value1) {
        const arr = [{
          message: '最多保留小数后四位',
          field: 'rate'
        }]
        this.form.setFields({ rate: { value: value, errors: arr } })
      }
    },
    // 验证服务费
    serviceChargeValidator (e) {
      var value = e.target.value
      var value1 = parseFloat(value).toFixed(4)
      if (value >= 1 || value < 0) {
        const arr = [{
          message: '请输入大于0，小于1的小数',
          field: 'serviceRate'
        }]
        this.form.setFields({ serviceRate: { value: value, errors: arr } })
      } else if (value > value1) {
        const arr = [{
          message: '最多保留小数后四位',
          field: 'serviceRate'
        }]
        this.form.setFields({ serviceRate: { value: value, errors: arr } })
      }
    },
    // 点击企业名称输入框,打开选择企业弹框
    openChooseEnterpriseModal () {
      this.chooseEnterpriseModalVisible = true
    },
    // 选择企业表格选中项发生变化时的回调
    onEnterpriseSelectChange (enterpriseSelectedRowKeys, data) {
      this.enterpriseSelectedRowKeys = enterpriseSelectedRowKeys
      this.enterpriseRowInfo = data[0]
    },
    // 选择企业弹框的确定按钮
    onChooseEnterprise () {
      this.enterpriseId = this.enterpriseRowInfo.id
      this.enterpriseName = this.enterpriseRowInfo.enterpriseName
      this.chooseEnterpriseModalVisible = false
      console.log(this.enterpriseId, this.enterpriseName)
    },
    // 选择企业弹框的取消按钮
    onChooseEnterpriseClose () {
      this.chooseEnterpriseModalVisible = false
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
          const param = {
            entity: {
              contractCode: values.contractCode,
              enterpriseName: values.enterpriseName,
              type: values.type,
              startTime: this.startTime,
              endTime: this.endTime
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
      this.startTime = ''
      this.endTime = ''
    },
    // 上传附件按钮
    handleUploadFlied(record) {
      this.contractId = record.id
      this.UploadDrawerVisible = true
    },
    // 关闭上传附加抽屉
    onUploadDrawerClose () {
      this.UploadDrawerVisible = false
      this.fileList = []
    },
    // 上传附件的确定按钮
    handleUploadSubmit () {
      var id = this.contractId
      if (this.fileList.length > 0) {
        var file = this.fileList[0].response.url
        // this.fileUrl = file
      } else {
        this.$message.error('上传附件不能为空')
        return
      }
      console.log(file)
      // this.UploadDrawerVisible = false
      // this.fileList = []
      saveContractAttachment({
        id: id,
        content: file
      }).then(res => {
        if (res.code === 1) {
          this.$message.success('上传成功')
          this.UploadDrawerVisible = false
          this.$refs.table.refresh(true)
          this.form.resetFields()
          this.fileList = []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 添加按钮
    handleAdd () {
      this.addDrawerTitle = '添加合同'
      this.addDrawerVisible = true
      this.enterpriseSelectedRowKeys = []
      this.enterpriseId = ''
      this.enterpriseName = ''
      this.contractCodeDisabled = false
    },
    // 修改按钮
    handleEdit (record) {
      this.addDrawerTitle = '修改合同信息'
      this.addDrawerVisible = true
      this.contractCodeDisabled = true
      this.fileList = []
      if (record.content && record.content !== '') {
        // const content = JSON.stringify(record.content)
        this.fileList = [{
          uid: '-1',
          name: '合同附件.pdf',
          status: 'done',
          url: record.content,
          response: {
            url: record.content
          }
        }]
      }
      this.$nextTick(() => {
        // this.form.setFieldsValue({
        //   joinDate: moment(record.joinDate, 'YYYY-MM-DD')
        // })
        this.enterpriseId = record.enterpriseId
        this.enterpriseName = record.enterpriseName
        this.enterpriseSelectedRowKeys = [record.enterpriseId]
        this.form.setFieldsValue(pick(record, 'id', 'contractCode', 'serviceEnterpriseName', 'type', 'rate', 'serviceRate'))
      })
    },
    // 保存按钮
    handleSaveSubmit () {
      this.saveDisabled = true
      var fileUrl = ''
      if (this.fileList.length > 0) {
        if (this.fileList[0].response.url) {
          fileUrl = this.fileList[0].response.url
        }
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          values.content = fileUrl
          console.log(values)
          saveBizContract(values).then(res => {
            console.log(res)
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
            } else {
              this.$message.error(res.message)
            }
            this.addDrawerVisible = false
            this.saveDisabled = false
            this.fileList = []
          })
        } else {
          this.saveDisabled = false
        }
      })
    },
    // 查看按钮
    handleRead (record) {
      this.readListData = record
      this.readDrawerVisible = true
    },
    // 删除按钮
    handleDelete (key) {
      // removeBizStaff({ id: key.id }).then(res => {
      //   console.log(res)
      //   if (res.code === 1) {
      //     console.log(1)
      //     this.$message.success('删除成功')
      //     this.$refs.table.refresh(true)
      //   } else {
      //     console.log(456)
      //     this.$message.error(res.result)
      //   }
      // })
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
    },
    // 关闭添加修改抽屉按钮
    onClose () {
      this.addDrawerVisible = false
      this.form.resetFields()
      this.fileList = []
      this.enterpriseSelectedRowKeys = []
      this.enterpriseId = ''
      this.enterpriseName = ''
      this.contractCodeDisabled = false
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.form.resetFields()
    },
    // 上传附件
    handleChange (info) {
      this.fileList = info.fileList
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
              this.$message.error('上传附件失败')
            } else {
              list.push(v)
            }
          }
        })
        this.fileList = list
      }
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
    beforeUpload (file) {
      return new Promise((resolve, reject) => {
        const isPDF = file.type === 'application/pdf'
        if (!isPDF) {
          this.$message.error('您只能上传PDF文件!')
          return reject(new Error('您只能上传PDF文件'))
        }
        // const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isLt2M) {
        //   this.$message.error('文件大小不能超过2MB!')
        //   return reject(new Error('文件大小不能超过2MB'))
        // }
        return resolve(true)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .file-box {
      margin-top: 20px;
    }
  }
</style>

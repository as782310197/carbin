<template>
  <a-card class="personCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="所属任务">
                <!-- <a-input
                  v-decorator="['taskName']"
                  placeholder="请输入"
                /> -->
                <a-select
                  v-decorator="['taskId']"
                  placeholder="请选择所属项目"
                >
                  <a-select-option v-for="item in taskListDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="状态">
                <a-select
                  v-decorator="['status']"
                  placeholder="请选择"
                >
                  <a-select-option :value="0">待处理</a-select-option>
                  <a-select-option :value="1">处理中</a-select-option>
                  <a-select-option :value="2">已处理</a-select-option>
                  <a-select-option :value="3">已关闭</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="开始时间">
                <a-date-picker
                  v-decorator="['startDate']"
                  style="width: 100%"
                  @change="startTimeChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="结束时间">
                <a-date-picker
                  v-decorator="['endDate']"
                  style="width: 100%"
                  @change="endTimeChange"
                />
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
      <s-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        ref="table"
      >
        <!-- <span slot="status" slot-scope="text">
          {{ text | statusFilter }}
        </span> -->
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
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              处理 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="acceptWorkOrder(record)">接收工单</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="handleWorkOrder(record)">处理工单</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="rejectWorkOrder(record)">驳回工单</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="closeWorkOrder(record)">关闭工单</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </s-table>
    </div>
    <!-- 添加抽屉 -->
    <div>
      <a-drawer
        :width="800"
        @close="onClose"
        :title="title"
        :visible="visible"
        :confirmLoading="addLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="所属任务">
            <a-input
              v-decorator="['taskName', {
                rules: [{ required: true, message: '请选择任务' }]
              }]"
              placeholder="请选择"
              @click="handleChoiceTask"
            >
            </a-input>
            <!-- 任务搜索弹框 -->
            <a-modal
              :visible="choiceTaskVisible"
              title="任务搜索"
              size="small"
              @ok="handleChoiceOk"
              @cancel="handleChoiceCancel"
              class="taskModal"
              width="50%"
            >
              <div class="taskSearchForm">
                <a-form :form="taskSearchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleTaskSearch">
                  <a-row>
                    <a-col :span="18" style="textAlign:center;">
                      <a-form-item>
                        <a-input
                          v-decorator="['name']"
                          placeholder="请输入任务名称"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="6" style="textAlign:center;">
                      <a-form-item>
                        <a-button type="primary" html-type="submit" @click="handleTaskSearch">搜索</a-button>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
              <div class="taskTable">
                <s-table
                  :columns="taskColumns"
                  :data="taskData"
                  :pagination="taskPagination"
                  :rowKey="record => record.id"
                  ref="taskTable"
                  :rowSelection="{ type:'radio', selectedRowKeys, selectedRows, onChange: onSelectChange }"
                  size="small"
                  bordered
                >
                </s-table>
              </div>
            </a-modal>
          </a-form-item>
          <a-form-item label="标题">
            <a-input
              v-decorator="['title', {
                rules: [{ required: true, message: '请输入信息' }]
              }]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="工单内容">
            <a-input
              v-decorator="['description', {
                rules: [{ required: true, message: '请输入信息' }]
              }]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="图片">
            <!-- http://localhost:8088/upload/singleFileUpload -->
            <a-upload
              :action="`${baseURL}/upload/singleFileUpload`"
              list-type="picture-card"
              :file-list="fileList"
              :before-upload="beforeUpload"
              @preview="handlePreview"
              @change="handleChange"
              v-decorator="['attachments']"
            >
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  上传图片
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
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
        <a-card
          :bordered="true"
          title="基本信息"
          size="small"
        >
          <detail-list :col="1">
            <detail-list-item term="所属任务">{{ obj.taskName }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="标题">{{ obj.title }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="工单内容">{{ obj.description }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="图片" class="imageList">
              <!-- <img :src="item" v-for="(item, index) of obj.attachments" :key="index" v-show="obj.attachments"> -->
              <div>
                <viewer class="imgBox" :images="obj.attachments">
                  <img
                    :src="item"
                    v-for="(item, index) of obj.attachments"
                    :key="index"
                    v-show="obj.attachments"
                  >
                </viewer>
              </div>
            </detail-list-item>
          </detail-list>
        </a-card>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// import { getTaskPage, getTaskInfo } from '@/api/task'
//  saveWorkOrder,
import { baseUrl } from '@/utils/util.js'
import { getTaskPage, getTaskList } from '@/api/task'
import { getWorkOrderPage, saveWorkOrder, getWorkOrderInfo, removeWorkOrder, acceptWorkOrder, handleWorkOrder, rejectWorkOrder, closeWorkOrder } from '@/api/workOrder'
import { STable } from '@/components'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import DetailList from '@/components/DescriptionList/DescriptionList'
import UploadImgGroup from '@/components/UploadImgGroup'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

function getBase64 (file, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'PersonList',
  components: {
    STable,
    AFormItem,
    DetailList,
    DetailListItem,
    UploadImgGroup
  },
  data () {
    return {
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      saveDisabled: false, // 保存按钮可点击
      taskId: '',
      taskSelectName: '',
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      taskSearchForm: this.$form.createForm(this), // 添加表单
      title: '',
      readTitle: '',
      visible: false,
      editVisible: false,
      visibleRead: false,
      choiceTaskVisible: false, // 任务名称搜索泡泡弹框
      taskLoading: false,
      addLoading: false,
      editLoading: false,
      readLoading: false,
      taskSearchQueryParam: [],
      queryParam: [],
      obj: {},
      fileList: [], // 上传图片
      // defaultFileList: [], // 默认显示的图片
      showModal: false,
      previewVisible: false,
      previewImage: '',
      selectedRowKeys: [], // 选中此处可配置默认列
      selectedRows: [],
      taskListDatas: [],
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        // showSizeChanger: true,
        // showQuickJumper: true,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      taskPagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '所属任务',
          dataIndex: 'taskName',
          key: 'taskName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'statusName',
          key: 'statusName',
          // scopedSlots: { customRender: 'status' },
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
          title: '创建人',
          dataIndex: 'creatorName',
          key: 'creatorName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          align: 'center',
          width: '25%'
        }
      ],
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        console.log(Object.assign(parameter, this.queryParam))
        return getWorkOrderPage(parameter)
          .then(res => {
            console.log('getRoleList', res)
            return res.result
          })
      },
      // 搜索任务名称泡泡弹框表格
      taskColumns: [
        {
          title: '任务名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '所属项目',
          dataIndex: 'projectName',
          key: 'projectName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '所属监理标',
          dataIndex: 'supervisionSectionName',
          key: 'supervisionSectionName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '所属施工标',
          dataIndex: 'constructionSectionName',
          key: 'constructionSectionName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '所属工点',
          dataIndex: 'constructionPointName',
          key: 'constructionPointName',
          align: 'center',
          ellipsis: true
        }
      ],
      taskData: parameter => {
        Object.assign(parameter, this.taskSearchQueryParam)
        console.log(Object.assign(parameter, this.taskSearchQueryParam))
        console.log('getTaskList', parameter)
        return getTaskPage(parameter)
          .then(res => {
            console.log('getTaskList', res)
            return res.result
          })
      }
    }
  },
  computed: {
    // 基础路径
    baseURL () {
      return baseUrl()
    },
    ...mapState({
      roles: state => state.user.roles
    })
    // 查看数据回显图片
    // picture () {
    //   console.log(typeof this.obj.attachments)
    //   if (!this.obj.attachments) {
    //     return []
    //   } else {
    //     console.log(typeof this.obj.attachments, this.obj.attachments)
    //     return this.obj.attachments
    //   }
    // }
  },
  created () {
    this.fetchTaskData()
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
  methods: {
    // 开始时间
    startTimeChange (date, dateStr) {
      console.log(dateStr)
      this.startTime = dateStr
      if (this.endTime) {
        if (new Date(dateStr).getTime() > new Date(this.endTime).getTime()) {
          this.$message.warning('开始时间不能大于结束时间')
           this.searchForm.resetFields('startTime', [])
        }
      }
    },
    // 结束时间
    endTimeChange (date, dateStr) {
      console.log(dateStr)
      this.endTime = dateStr
      if (this.startTime) {
        if (new Date(dateStr).getTime() < new Date(this.startTime).getTime()) {
          this.$message.warning('结束时间不能小于开始时间')
          this.searchForm.resetFields('endTime', [])
        }
      }
    },
    // 任务查询按钮
    handleTaskSearch (e) {
      e.preventDefault()
      this.taskSearchForm.validateFields((error, values) => {
        if (!error) {
          console.log('Received values of form: ', values)
          var param = {
            entity: {
              name: values.name
            }
          }
          Object.assign(this.taskSearchQueryParam, param)
          console.log('Received values of form: ', this.taskSearchQueryParam)
          this.$refs.taskTable.refresh(true)
        } else {
          console.log('error', error)
        }
      })
    },
    // 查询按钮
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          console.log('Received values of form: ', values)
          var param = {
            entity: {
              taskId: values.taskId,
              status: values.status
              // activeTime: values.activeTime,
              // closeTime: values.closeTime
            },
            paramMapList: [
              {
                startDate: values.startDate,
                endDate: values.endDate
              }
            ]
          }
          Object.assign(this.queryParam, param)
          console.log('Received values of form: ', this.queryParam)
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
    // 新增按钮
    addDrawerShow () {
      this.title = '添加工单'
      this.visible = true
      this.fileList = []
    },
    // 修改按钮
    handleEdit (e) {
      this.fileList = []
      this.title = '修改工单'
      this.visible = true
      const param = { id: e.id }
      getWorkOrderInfo(param).then(res => {
        this.obj = res.result
        if (JSON.parse(res.result.attachments).length > 0) {
          JSON.parse(res.result.attachments).forEach((v, i) => {
            this.fileList.push({
              uid: i,
              name: i + '.png',
              status: 'done',
              url: v
            })
          })
        }
        this.form.setFieldsValue(pick(res.result, 'id', 'taskName', 'title', 'description', 'attachments'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 阻止默认事件
      this.saveDisabled = true // 保存按钮不可点击（false是可点击，true是不可点击）
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        console.log(values)
        values.taskId = this.selectedRowKeys[0]
        var picString = []
        // 把图片地址转换成一个数组json字符串并赋值回去
        if (values.attachments && typeof (values.attachments) !== 'string') {
          values.attachments.fileList.forEach(v => {
            if (v.url) {
              picString.push(v.url)
            } else {
              picString.push(v.response.url)
            }
          })
        }
        if (typeof (values.attachments) !== 'string') {
          values.attachments = JSON.stringify(picString)
        }
        if (!err) {
          console.log('提交信息: ', values)
          saveWorkOrder(values).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
              this.visible = false
              this.saveDisabled = false
            } else {
              this.$message.info('保存失败' + res.message)
              this.saveDisabled = false
            }
          })
          this.fileList = []
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
      this.form.resetFields()
      this.initialTaskValue = ''
    },
    // 关闭修改抽屉页面
    onEditClose (e) {
      this.editVisible = false
      this.form.resetFields()
    },
    // 查看按钮
    handleRead (e) {
      console.log('查看数据！', e)
      this.readTitle = '查看工单信息'
      this.visibleRead = true
      var param = { id: e.id }
      getWorkOrderInfo(param).then(res => {
        res.result.attachments = JSON.parse(res.result.attachments)
        this.obj = res.result
      })
      if (this.$refs.readTable !== undefined) {
          this.$refs.readTable.refresh(true)
      }
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 接收工单按钮
    acceptWorkOrder (e) {
      const param = { id: e.id }
      if (e.status === 0) {
        acceptWorkOrder(param).then(res => {
          if (res.code === 1) {
            this.obj = res.result
            this.$refs.table.refresh(true)
            this.$message.success('接收成功')
          }
        })
      } else {
        this.$message.error('接收工单失败，只有状态为待处理时才能接收工单')
        this.$refs.table.refresh(true)
      }
    },
    // 处理工单按钮
    handleWorkOrder (e) {
      const param = { id: e.id }
      if (e.status === 1) {
        handleWorkOrder(param).then(res => {
          if (res.code === 1) {
            this.obj = res.result
            this.$refs.table.refresh(true)
            this.$message.success('处理成功')
          }
        })
      } else {
        this.$message.error('处理工单失败，只有状态为处理中时才能处理工单')
        this.$refs.table.refresh(true)
      }
    },
    // 驳回工单按钮
    rejectWorkOrder (e) {
      const param = { id: e.id }
      if (e.status !== 0) {
        rejectWorkOrder(param).then(res => {
          if (res.code === 1) {
            this.obj = res.result
            this.$refs.table.refresh(true)
            this.$message.success('驳回成功')
          }
        })
      } else if (e.status === 3) {
        this.$message.error('驳回工单失败，不能驳回已关闭的工单')
        this.$refs.table.refresh(true)
      } else {
        this.$message.error('驳回工单失败，只能驳回除待处理和已关闭状态外的工单')
        this.$refs.table.refresh(true)
      }
    },
    // 关闭工单按钮
    closeWorkOrder (e) {
      const param = { id: e.id }
      if (e.status === 2) {
        closeWorkOrder(param).then(res => {
          if (res.code === 1) {
            this.obj = res.result
            this.$refs.table.refresh(true)
            this.$message.success('关闭成功')
          }
        })
      } else {
        this.$message.error('关闭工单失败，只有状态为已处理时才能关闭工单')
        this.$refs.table.refresh(true)
      }
    },

    // 删除工单按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      const param = {
        id: e.id
      }
      removeWorkOrder(param).then(res => {
        if (res.code === 1) {
          this.$success({
            title: '提示信息',
            content: '删除成功',
            onOk: () => this.$refs.table.refresh(true)
          })
        } else {
          this.$error({
            title: '提示信息',
            content: res.message
          })
        }
      })
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
    },
    // 任务搜索弹框
    handleChoiceTask () {
      this.choiceTaskVisible = true
    },
    // 任务搜索弹框 确认按钮
    handleChoiceOk () {
      console.log(this.taskSelectName)
      this.form.setFieldsValue({ 'taskName': this.taskSelectName })
      this.choiceTaskVisible = false
    },
    // 关闭任务搜索弹框 取消按钮
    handleChoiceCancel () {
      this.choiceTaskVisible = false
    },
    // 改变选中行
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys[0], selectedRows[0].name)
      this.taskSelectName = selectedRows[0].name
      this.selectedRowKeys = selectedRowKeys
    },
    fetchTaskData () {
      console.log('in method')
      // 这里是自定义的一个请求方法,请求项目下拉列表
      var param = {}
      getTaskList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.taskListDatas.push(r)
          })
           console.log(this.taskListDatas)
        }
      })
    },
    // 上传图片
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange (info) {
      console.log(info)
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
              this.$message.error('上传图片失败')
            } else {
              list.push(v)
            }
          }
        })
        this.fileList = list
        console.log('文件信息', this.fileList)
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
.taskTable{
  margin-top: 20px;
}
.imgBox{
  img{
    width: 102px;
    // height: 102px;
    margin-left: 20px;
  }
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

// .imageList img {
//   width: 100px;
//   height: 100px;
//   margin-right: 10px;
// }
</style>

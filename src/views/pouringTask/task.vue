<template>
  <a-card class="worksiteCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="所属项目">
                <a-select
                  v-decorator="['projectId']"
                  placeholder="请选择所属项目"
                  @change="handleProjectSelectChange"
                >
                  <a-select-option v-for="item in projectListDatas" :key="item.id" :value="item.id">{{ item.projectName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="所属监理标">
                <a-select
                  v-decorator="['supervisionSectionId']"
                  placeholder="请选择所属监理标"
                  @change="handleSupervisionBidSelectChange"
                >
                  <a-select-option v-for="item in supervisionBidDatas" :key="item.id" :value="item.id">{{ item.sectionName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="所属施工标">
                <a-select
                  v-decorator="['constructionSectionId']"
                  placeholder="请选择所属施工标"
                  @change="handleConstructionBidSelectChange"
                >
                  <a-select-option v-for="item in constructionBidDatas" :key="item.id" :value="item.id">{{ item.sectionName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="所属工点">
                <a-select
                  v-decorator="['constructionPoint']"
                  placeholder="请选择所属工点"
                >
                  <a-select-option v-for="item in worksiteDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="开始时间">
                <a-date-picker
                  v-decorator="['startDate']"
                  placeholder="请选择开始时间"
                  style="width: 100%"
                  @change="startTimeChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="结束时间">
                <a-date-picker
                  v-decorator="['endDate']"
                  placeholder="请选择结束时间"
                  style="width: 100%"
                  @change="endTimeChange"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="状态">
                <a-select
                  v-decorator="['status']"
                  placeholder="请选择状态"
                >
                  <a-select-option :value="0">
                    已准备
                  </a-select-option>
                  <a-select-option :value="1">
                    已自检
                  </a-select-option>
                  <a-select-option :value="2">
                    已审核
                  </a-select-option>
                  <a-select-option :value="3">
                    已审批
                  </a-select-option>
                  <a-select-option :value="4">
                    已开始
                  </a-select-option>
                  <a-select-option :value="5">
                    已完成
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="16" :style="{ textAlign: 'right' }">
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
      <!-- 按钮 -->
      <div class="addDiv">
        <!-- 添加按钮 -->
        <a-button type="primary" @click="addDrawerShow" style="margin-bottom: 20px;" v-if="actionList.add === 1">
          <a-icon type="plus" /> 增加 </a-button>
        <!-- 导出简报按钮 -->
        <a-button type="primary" @click="exportBriefing" style="margin-bottom: 20px; marginLeft: 20px;" v-if="actionList.exportBulletin === 1">
          导出简报 </a-button>
        <!-- 导出详细报告按钮 -->
        <a-button type="primary" @click="exportDetailedReport" style="margin-bottom: 20px; marginLeft: 20px;" v-if="this.actionList.exportDetailBulletin === 1">
          导出详细报告 </a-button>
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onChange }"
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
            <a-icon type="profile" />处理
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
        :width="640"
        @close="onClose"
        :title="title"
        :visible="visible"
        :confirmLoading="confirmLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="所属项目">
            <a-select
              :disabled="projectDisabled"
              v-decorator="['projectId', {
                rules: [{ required: true, message: '请选择所属项目' }]
              }]"
              placeholder="请选择所属项目"
              @change="handleProjectSelectChange"
            >
              <a-select-option v-for="item in projectListDatas" :key="item.id" :value="item.id">{{ item.projectName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="所属监理标">
            <a-select
              :disabled="supervisionDisabled"
              v-decorator="['supervisorSection', {
                rules: [{ required: true, message: '请选择所属监理标' }]
              }]"
              placeholder="请选择所属监理标"
              @change="handleSupervisionBidSelectChange"
            >
              <a-select-option v-for="item in supervisionBidDatas" :key="item.id" :value="item.id">{{ item.sectionName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="所属施工标">
            <a-select
              :disabled="constructionDisabled"
              v-decorator="['constructionSection', {
                rules: [{ required: true, message: '请选择所属施工标' }]
              }]"
              placeholder="请选择所属施工标"
              @change="handleConstructionBidSelectChange"
            >
              <a-select-option v-for="item in constructionBidDatas" :key="item.id" :value="item.id">{{ item.sectionName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="所属工点">
            <a-select
              v-decorator="['constructionPoint', {
                rules: [{ required: true, message: '请选择所属工点' }]
              }]"
              placeholder="请选择所属工点"
            >
              <a-select-option v-for="item in worksiteDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="衬砌名称">
            <a-input
              v-decorator="['name', {
                rules: [{ required: true, message: '衬砌名称不能为空' }]
              }]"
              placeholder="请输入衬砌名称"
            />
          </a-form-item>
          <a-form-item label="衬砌长度">
            <a-input
              v-decorator="['constructionLength', {
                rules: [{ required: true, message: '衬砌长度不能为空' }]
              }]"
              placeholder="请输入衬砌长度"
            />
          </a-form-item>
          <a-form-item label="监测等级">
            <!-- <a-input
              v-decorator="['level', {
                rules: [{ required: true, message: '监测等级不能为空' }]
              }]"
              placeholder="请输入监测等级"
            /> -->
            <a-select
              v-decorator="['level', {
                rules: [{ required: true, message: '监测等级不能为空' }]
              }]"
              placeholder="请输入监测等级"
            >
              <a-select-option :value="0">单一简化</a-select-option>
              <a-select-option :value="1">单一标准</a-select-option>
              <a-select-option :value="2">单一精细</a-select-option>
              <a-select-option :value="3">综合简化</a-select-option>
              <a-select-option :value="4">综合基体</a-select-option>
              <a-select-option :value="5">综合标准</a-select-option>
              <a-select-option :value="6">综合精细</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="设备">
            <a-select
              v-decorator="['defaultDevice', {
                rules: [{ required: true, message: '请选择设备名称' }]
              }]"
              placeholder="请选择设备名称"
            >
              <a-select-option v-for="item in icpListDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="指定施工员">
            <a-select
              v-decorator="['constructorId', {
                rules: [{ required: true, message: '请选择指定施工员' }]
              }]"
              placeholder="请选择指定施工员"
            >
              <a-select-option v-for="item in personSGDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="指定监理员">
            <a-select
              v-decorator="['supervisor', {
                rules: [{ required: true, message: '请选择指定监理员' }]
              }]"
              placeholder="请选择指定监理员"
            >
              <a-select-option v-for="item in personJLDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="指定质检员">
            <a-select
              v-decorator="['qualityInspector', {
                rules: [{ required: true, message: '请选择指定质检员' }]
              }]"
              placeholder="请选择指定质检员"
            >
              <a-select-option v-for="item in personZJDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
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
        :width="1350"
        @close="onReadClose"
        :title="readTitle"
        :visible="visibleRead"
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-tabs size="small" tabPosition="left">
          <a-tab-pane key="tab1" tab="自检中" v-if="taskInfo.status === 0">
            <in-preparation ref="inPreparation" :taskInfo="taskInfo" @visibleReadClose="visibleReadClose"></in-preparation>
          </a-tab-pane>
          <a-tab-pane key="tab2" tab="审核中" v-if="taskInfo.status === 1">
            <self-checking :taskInfo="taskInfo" @visibleReadClose="visibleReadClose"></self-checking>
          </a-tab-pane>
          <a-tab-pane key="tab3" tab="审批中" v-if="taskInfo.status === 2">
            <approval :taskInfo="taskInfo" @visibleReadClose="visibleReadClose"></approval>
          </a-tab-pane>
          <a-tab-pane key="tab4" tab="审批完成" v-if="taskInfo.status === 3">
            <approval-over :taskInfo="taskInfo" @visibleReadClose="visibleReadClose"></approval-over>
          </a-tab-pane>
          <a-tab-pane key="tab5" tab="已开始" v-if="taskInfo.status === 4">
            <approval-over :taskInfo="taskInfo" @visibleReadClose="visibleReadClose"></approval-over>
          </a-tab-pane>
          <a-tab-pane key="tab5" tab="已完成" v-if="taskInfo.status === 5">
            <approval-over :taskInfo="taskInfo" @visibleReadClose="visibleReadClose"></approval-over>
          </a-tab-pane>
        </a-tabs>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
//  saveTask,
import InPreparation from './inPreparation'
import SelfChecking from './selfChecking'
import Approval from './approval'
import ApprovalOver from './approvalOver'
import { STable } from '@/components'
import { getTaskPage, saveTask, getTaskInfo, removeTask, exportExcel } from '@/api/task'
import { getProjectList } from '@/api/project'
import { getSupervisionBidList } from '@/api/supervisionBid'
import { getConstructionBidList } from '@/api/constructionBid'
import { getWorksiteList } from '@/api/worksite'
import { getPersonList } from '@/api/person'
import { getIcpList } from '@/api/icp'
// import DetailList from '@/components/DescriptionList/DescriptionList'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
// import moment from 'moment'
// 引入权限数据
import { mapState } from 'vuex'

export default {
  name: 'TaskList',
  components: {
    InPreparation,
    SelfChecking,
    Approval,
    ApprovalOver,
    STable,
    AFormItem
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      saveDisabled: false,
      taskInfo: {}, // 任务信息
      // readModalVisible: false,
      // 选择下拉框设置只读状态
      projectDisabled: false,
      supervisionDisabled: false,
      constructionDisabled: false,
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      title: '',
      readTitle: '',
      visible: false,
      visibleRead: false,
      addLoading: false,
      readLoading: false,
      confirmLoading: false,
      queryParam: [],
      obj: {},
      projectListDatas: [],
      supervisionBidDatas: [],
      constructionBidDatas: [],
      worksiteDatas: [],
      personSGDatas: [],
      personJLDatas: [],
      personZJDatas: [],
      icpListDatas: [],
      actionList: {}, // 权限按钮
      fileName: '',
      // 表格分页栏设置
      pagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '任务ID',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          ellipsis: true
        },
        {
          title: '衬砌名称',
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
          title: '状态',
          dataIndex: 'statusName',
          key: 'statusName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '施工员',
          dataIndex: 'constructorName',
          key: 'constructorName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '监理员',
          dataIndex: 'supervisorName',
          key: 'supervisorName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '质检员',
          dataIndex: 'qualityInspectorName',
          key: 'qualityInspectorName',
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
        console.log(Object.assign(parameter, this.queryParam))
        return getTaskPage(parameter)
          .then(res => {
            console.log('getRoleList', res)
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    this.fetchProjectListData()
    this.fetchPersonSGListData()
    this.fetchPersonJLListData()
    this.fetchPersonZJListData()
    this.fetchIcpListData()
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
      } else if (v === 'exportBulletin') {
        this.actionList.exportBulletin = 1
      } else if (v === 'exportDetailBulletin') {
        this.actionList.exportDetailBulletin = 1
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
    startTimeChange (date, dateStr) {
      // console.log(dateStr)
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
      // console.log(dateStr)
      this.endTime = dateStr
      if (this.startTime) {
        if (new Date(dateStr).getTime() < new Date(this.startTime).getTime()) {
          this.$message.warning('结束时间不能小于开始时间')
          this.searchForm.resetFields('endTime', [])
        }
      }
    },
    // 子组件提交审核之后关闭抽屉
    visibleReadClose (bool) {
      this.visibleRead = bool
      this.$refs.table.refresh(true)
    },
    // 项目、监理标、施工标、工点级联
    // 项目
    handleProjectSelectChange (value) {
      // console.log(`项目 ${value}`)
      this.fetchSupervisionBidListData(value)
      this.searchForm.resetFields([
        'supervisionSectionId', 'constructionSectionId', 'constructionPoint', []
      ])
      this.form.resetFields([
        'supervisionSectionId', 'constructionSectionId', 'constructionPoint', []
      ])
      this.supervisionBidDatas = []
      this.constructionBidDatas = []
      this.worksiteDatas = []
    },
    // 监理标
    handleSupervisionBidSelectChange (value) {
      // console.log('监理标' + value)
      this.fetchConstructionBidListData(value)
      this.searchForm.resetFields([
        'constructionSectionId', 'constructionPoint', []
      ])
      this.form.resetFields([
        'constructionSectionId', 'constructionPoint', []
      ])
      this.constructionBidDatas = []
      this.worksiteDatas = []
    },
    // 施工标
    handleConstructionBidSelectChange (value) {
      // console.log('施工标' + value)
      this.fetchWorksiteListData(value)
      this.searchForm.resetFields(
        'constructionPoint', []
      )
      this.form.resetFields(
        'constructionPoint', []
      )
      this.worksiteDatas = []
    },

    // 导出简报按钮
    exportBriefing (e) {
      const id = []
      this.selectedRowKeys.forEach(element => {
        id.push(element)
      })
      const param = { ids: id }
      // console.log(param)
      this.$message.loading('下载中...', 1)
      exportExcel(param).then(res => {
        const blob = new Blob([res], {
          type: 'application/octet-stream'
        }) // 转化为blob对象
        const filename = this.fileName || '任务简报.xls' // 判断是否使用默认文件名
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blob, filename)
        } else {
          var blobURL = window.URL.createObjectURL(blob) // 将blob对象转为一个URL
          var tempLink = document.createElement('a') // 创建一个a标签
          tempLink.style.display = 'none'
          tempLink.href = blobURL
          tempLink.setAttribute('download', filename) // 给a标签添加下载属性
          if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank')
          }
          document.body.appendChild(tempLink) // 将a标签添加到body当中
          tempLink.click() // 启动下载
          document.body.removeChild(tempLink) // 下载完毕删除a标签
          window.URL.revokeObjectURL(blobURL)
        }
        this.$message.success('导出成功！', 1)
      }).catch(err => {
        // console.log('导出失败' + err)
          this.$message.error('导出失败' + err)
      })
    },
    // 导出详细报告按钮
    exportDetailedReport () {
    },

    // 新增按钮
    addDrawerShow () {
      this.title = '添加任务'
      this.visible = true
    },
    // 查询按钮
    handleSearch (e) {
      // console.log('查询列表！')
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          // console.log('Received values of form: ', values)
          var param = {
            entity: {
              projectId: values.projectId,
              supervisionSectionId: values.supervisionSectionId,
              constructionSectionId: values.constructionSectionId,
              constructionPoint: values.constructionPoint,
              status: values.status
            },
            paramMapList: [
              {
                startDate: values.startDate,
                endDate: values.endDate
              }
            ]
          }
          Object.assign(this.queryParam, param)
          this.$refs.table.refresh(true)
        } else {
          // console.log('error', error)
        }
      })
    },
    // 重置按钮
    handleReset (e) {
      // console.log('重置搜索框！')
      this.searchForm.resetFields()
      // 同时清空级联接收数据的数组
      this.supervisionBidDatas = []
      this.constructionBidDatas = []
      this.worksiteDatas = []
    },
    // 修改按钮
    handleEdit (e) {
      this.title = '修改任务信息'
      this.visible = true
      this.projectDisabled = true
      this.supervisionDisabled = true
      this.constructionDisabled = true
      const param = { id: e.id }
      getTaskInfo(param).then(res => {
        this.obj = res.result
        // , 'constructor'
        this.form.setFieldsValue(pick(res.result, 'id', 'projectId', 'supervisorSection', 'constructionSection', 'constructionPoint', 'name', 'constructionLength', 'level', 'defaultDevice', 'constructorId', 'supervisor', 'qualityInspector'))
      })
      this.fetchSupervisionBidListData()
      this.fetchConstructionBidListData()
      this.fetchWorksiteListData()
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 阻止默认事件
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log(values)
          saveTask(values).then(res => {
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
              this.$message.error(res.message)
              this.saveDisabled = false
            }
          })
        } else {
          // console.log('错误信息: ', err)
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
      // 同时清空级联接收数据的数组
      this.supervisionBidDatas = []
      this.constructionBidDatas = []
      this.worksiteDatas = []
      this.projectDisabled = false
      this.supervisionDisabled = false
      this.constructionDisabled = false
    },
    // 处理查看按钮
    handleRead (e) {
      var param = { id: e.id }
      getTaskInfo(param).then(res => {
        if (res.code === 1) {
          this.obj = res.result
          // this.taskInfo = res.result
          this.readTitle = '查看任务信息'
          this.visibleRead = true
          this.readLoading = true
          var imageList = {}
          for (var i in res.result.attachment) {
            // console.log(JSON.parse(JSON.stringify(res.result.attachment[i])))
            if (JSON.parse(JSON.stringify(res.result.attachment[i]))) {
              imageList[i] = []
              JSON.parse(JSON.stringify(res.result.attachment[i])).forEach((v, j) => {
                imageList[i].push({
                  uid: j,
                  name: j + 'image.png',
                  status: 'done',
                  url: v
                })
              })
            } else {
              imageList[i] = []
            }
          }
          this.taskInfo = res.result
          this.taskInfo.imageList = imageList
          // console.log(this.taskInfo)
        }
      })
      if (this.$refs.readTable !== undefined) {
          this.$refs.readTable.refresh(true)
      }
    },
    // 关闭处理查看抽屉页面
    onReadClose (e) {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      const param = {
        id: e.id
      }
      removeTask(param).then(res => {
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
          // console.log('删除失败' + res.message)
        }
      })
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
    },
    // 选中表格中的一行
    onChange (selectedRowKeys, selectedRows) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      // console.log('selectedRows changed: ', selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 这里是自定义的一个请求方法,请求项目下拉列表
    fetchProjectListData (e) {
      // console.log('in method')
      var param = {}
      getProjectList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.projectListDatas.push(r)
          })
          //  console.log(this.projectListDatas)
        }
      })
    },
    // 这里是自定义的一个请求方法,请求监理标下拉列表
    fetchSupervisionBidListData (e) {
      // console.log('in method')
      var param = {
        projectId: e
      }
      getSupervisionBidList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.supervisionBidDatas.push(r)
          })
          //  console.log(this.supervisionBidDatas)
        }
      })
    },
    // 这里是自定义的一个请求方法,请求施工标下拉列表
    fetchConstructionBidListData (e) {
      // console.log('in method')
      var param = {
        supervisionSection: e
      }
      getConstructionBidList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.constructionBidDatas.push(r)
          })
          //  console.log(this.constructionBidDatas)
        }
      })
    },
    // 这里是自定义的一个请求方法,请求工点下拉列表
    fetchWorksiteListData (e) {
      // console.log('in method')
      var param = {
        constructionSection: e
      }
      getWorksiteList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.worksiteDatas.push(r)
          })
          //  console.log(this.worksiteDatas)
        }
      })
    },
    // 这里是自定义的一个请求方法,请求人员下拉列表
    fetchPersonSGListData () {
      // console.log('in method')
      var param = {
        position: 1
      }
      getPersonList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          // console.log('personSGDatas', result)
          result.forEach((r) => {
            this.personSGDatas.push(r)
          })
          // console.log('this.personSGDatas', this.personSGDatas)
        }
      })
    },
    fetchPersonJLListData () {
      // console.log('in method')
      var param = {
        position: 3
      }
      getPersonList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          // console.log('personJLDatas', result)
          result.forEach((r) => {
            this.personJLDatas.push(r)
          })
          // console.log('this.personJLDatas', this.personJLDatas)
        }
      })
    },
    fetchPersonZJListData () {
      // console.log('in method')
      var param = {
        position: 2
      }
      getPersonList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          // console.log('personZJDatas', result)
          result.forEach((r) => {
            this.personZJDatas.push(r)
          })
          // console.log('this.personZJDatas', this.personZJDatas)
        }
      })
    },
    // 这里是自定义的一个请求方法,请求工控机设备下拉列表
    fetchIcpListData () {
      // console.log('in method')
      var param = {}
      getIcpList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.icpListDatas.push(r)
          })
          //  console.log(this.icpListDatas)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }
      .account-settings-info-right {
        padding: 20px 40px;
      }
    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 100px;
    }

    .account-settings-info-right {
      flex: 1 1;
    }
  }
</style>

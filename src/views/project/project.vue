<template>
  <a-card class="porjectCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="项目名称">
                <a-input
                  v-decorator="['projectName']"
                  placeholder="请输入项目名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="建设单位">
                <a-select
                  v-decorator="['enterpriseId']"
                  placeholder="请选择建设单位"
                >
                  <a-select-option v-for="item in templateDatas" :key="item.id" :value="item.id">{{ item.enterpriseName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="联系人">
                <a-input
                  v-decorator="['projectContractor']"
                  placeholder="请输入联系人"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24" :style="{ textAlign: 'right' }">
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
        </template>
      </s-table>
    </div>
    <!-- 添加、修改抽屉 -->
    <div>
      <a-drawer
        :width="700"
        @close="onClose"
        :title="title"
        :visible="visible"
        :confirmLoading="addLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="项目名称">
            <a-input
              v-decorator="['projectName', {
                rules: [{ required: true, message: '项目名称不能为空' }]
              }]"
              placeholder="请输入项目名称"
            />
          </a-form-item>
          <a-form-item label="项目地址">
            <a-input
              v-decorator="['address', {
                rules: [{ required: true, message: '项目地址不能为空' }]
              }]"
              placeholder="请输入项目地址"
            />
          </a-form-item>
          <a-form-item label="建设单位">
            <a-select
              v-decorator="['enterpriseId', {
                rules: [{ required: true, message: '建设单位不能为空' }]
              }]"
              placeholder="请选择建设单位"
            >
              <a-select-option v-for="item in templateDatas" :key="item.id" :value="item.id">{{ item.enterpriseName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="建设单位联系人">
            <a-input
              v-decorator="['projectContractor', {
                rules: [
                  { required: true, message: '建设单位联系人不能为空' }
                ]
              }]"
              placeholder="请输入建设单位联系人"
            />
          </a-form-item>
          <a-form-item label="建设单位联系电话">
            <a-input
              v-decorator="['phone', {
                rules: [
                  { required: true, message: '建设单位联系电话不能为空' }
                ]
              }]"
              @blur="MobileNumberValidator"
              placeholder="请输入建设单位联系电话"
            />
          </a-form-item>
          <a-form-item label="开工日期">
            <a-date-picker
              v-decorator="[
                'startDate', {
                  rules: [{ required: true, message: '请选择开工日期' }]
                }]"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="结束日期">
            <a-date-picker
              v-decorator="[
                'endDate', {
                  rules: [{ required: true, message: '请选择结束日期' }]
                }]"
              style="width: 100%"
            />
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
        <a-tabs>
          <a-tab-pane key="1" tab="基本信息">
            <detail-list :col="2">
              <detail-list-item term="项目名称">{{ obj.projectName }}</detail-list-item>
              <detail-list-item term="项目地址">{{ obj.address }}</detail-list-item>
            </detail-list>
            <detail-list :col="2">
              <detail-list-item term="建设单位">{{ obj.enterpriseName }}</detail-list-item>
              <detail-list-item term="建设单位联系人">{{ obj.projectContractor }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item term="建设单位联系电话">{{ obj.phone }}</detail-list-item>
            </detail-list>
            <detail-list :col="2">
              <detail-list-item term="开工日期">{{ obj.startDate }}</detail-list-item>
              <detail-list-item term="结束日期">{{ obj.endDate }}</detail-list-item>
            </detail-list>
          </a-tab-pane>
          <a-tab-pane key="2" tab="监理标">
            <s-table
              size="small"
              :columns="supervisionBidColumns"
              :data="loadSupervisionBidData"
              :pagination="readPagination"
              :rowKey="record => record.id"
              ref="readTable"
            >
            </s-table>
          </a-tab-pane>
        </a-tabs>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import DetailList from '@/components/DescriptionList/DescriptionList'
import { STable } from '@/components'
import { getProjectPage, saveProject, getProjectInfo, removeProject } from '@/api/project'
import { getSupervisionBidPage } from '@/api/supervisionBid'
import { getEnterpriseList } from '@/api/enterprise'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import moment from 'moment'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'ProjectList',
  components: {
    AFormItem,
    STable,
    DetailList,
    DetailListItem,
    moment
  },
  data () {
    return {
      saveDisabled: false,
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      title: '',
      readTitle: '',
      visible: false,
      visibleRead: false,
      addLoading: false,
      readLoading: false,
      queryParam: [],
      obj: {},
      templateDatas: [],
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      readPagination: {
        size: 'small',
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '建设单位',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true,
          width: '10%'
        },
        {
          title: '建设单位联系人',
          dataIndex: 'projectContractor',
          key: 'projectContractor',
          align: 'center',
          ellipsis: true,
          width: '15%'
        },
        {
          title: '建设单位联系电话',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true,
          width: '15%'
        },
        {
          title: '开工日期',
          dataIndex: 'startDate',
          key: 'startDate',
          align: 'center',
          ellipsis: true,
          width: '10%'
        },
        {
          title: '结束日期',
          dataIndex: 'endDate',
          key: 'endDate',
          align: 'center',
          ellipsis: true,
          width: '10%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          // fixed: 'right',
          align: 'center'
        }
      ],
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getProjectPage(parameter)
          .then(res => {
            // console.log('getRoleList', res)
            return res.result
          })
      },
      // 查看监理标
      supervisionBidParam: '',
      supervisionBidColumns: [
        {
          title: '序号',
          // 序号自增
          customRender: function (text, record, index) {
            return parseInt(index) + 1
          },
          align: 'center',
          ellipsis: true,
          width: '10%'
        },
        {
          title: '监理标段编号',
          dataIndex: 'sectionNo',
          key: 'sectionNo',
          align: 'center',
          ellipsis: true,
          width: '40%'
        },
        {
          title: '监理标段名称',
          dataIndex: 'sectionName',
          key: 'sectionName',
          align: 'center',
          ellipsis: true,
          width: '50%'
        }
      ],
      loadSupervisionBidData: parameter => {
        var param = {
          entity: {
            projectId: this.supervisionBidParam
          }
        }
        Object.assign(parameter, param)
        return getSupervisionBidPage(parameter)
          .then(res => {
            return res.result
          })
      }
    }
  },
  created () {
    this.fetchTemplateData()
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
    // 手机号验证
    MobileNumberValidator (e) {
      const idcardReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (e.target.value && !idcardReg.test(e.target.value)) {
        const arr = [{
          message: '请输入正确的手机号码格式',
          field: 'phone'
        }]
        this.form.setFields({ phone: { value: e.target.value, errors: arr } })
      }
    },
    // 新增按钮
    addDrawerShow () {
      this.title = '添加项目'
      this.visible = true
    },
    // 查询按钮
    handleSearch (e) {
      console.log('查询列表！')
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          console.log('Received values of form: ', values)
          var param = {
            entity: {
              projectName: values.projectName,
              enterpriseName: values.enterpriseId,
              projectContractor: values.projectContractor
            }
          }
          Object.assign(this.queryParam, param)
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
    // 修改按钮
    handleEdit (e) {
      this.title = '修改项目信息'
      this.visible = true
      const param = { id: e.id }
      getProjectInfo(param).then(res => {
        this.obj = res.result
        this.form.setFieldsValue({
          startDate: moment(res.result.startDate, 'YYYY-MM-DD')
        })
        this.form.setFieldsValue({
          endDate: moment(res.result.endDate, 'YYYY-MM-DD')
        })
        this.form.setFieldsValue(pick(res.result, 'id', 'projectName', 'address', 'enterpriseId', 'projectContractor', 'phone'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交信息: ', values)
          saveProject(values).then(res => {
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
              this.$message.error('保存失败：' + res.message)
              this.saveDisabled = false
            }
          })
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
    },
    // 查看按钮
    handleRead (e) {
      // console.log('查看数据！')
      this.readTitle = '查看项目信息'
      this.visibleRead = true
      this.supervisionBidParam = e.id
      var param = { id: e.id }
      getProjectInfo(param).then(res => {
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
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      const param = {
        id: e.id
      }
      removeProject(param).then(res => {
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
        }
      })
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
    },
    okHandle () {
      this.form.resetFields()
      this.$refs.table.refresh(true)
      this.visible = false
    },
    fetchTemplateData () {
      console.log('in method')
      // 这里是自定义的一个请求方法,请求单位下拉列表
      var param = {
        category: 0
      }
      getEnterpriseList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.templateDatas.push(r)
          })
          console.log(this.templateDatas)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>>

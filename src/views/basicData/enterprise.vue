<template>
  <a-card class="unitCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="单位名称">
                <a-input
                  v-decorator="['enterpriseName']"
                  placeholder="请输入单位名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="联系人">
                <a-input
                  v-decorator="['contractor']"
                  placeholder="请输入联系人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="联系人电话">
                <a-input
                  v-decorator="['phone']"
                  placeholder="请输入联系人电话"
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
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || (actionList.get !== 1 && actionList.delete === 1)" />
          <a @click="handleRead(record)" style="color:#696969;" v-if="actionList.get === 1">
            <a-icon type="profile" />查看
          </a>
          <a-divider type="vertical" v-if="(actionList.get === 1 && actionList.delete === 1) || (actionList.get !== 1 && actionList.update === 1)" />
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
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="单位名称">
            <a-input
              v-decorator="['enterpriseName', {rules: [{ required: true, message: '单位名称不能为空' }]}]"
              placeholder="请输入单位名称"
            />
          </a-form-item>
          <a-form-item label="单位类别">
            <a-radio-group
              v-decorator="['category', {rules: [{ required: true, message: '请选择单位类别' }]}]"
            >
              <a-radio :value="0">业主</a-radio>
              <a-radio :value="1">监理</a-radio>
              <a-radio :value="2">施工</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="资质等级编号">
            <a-input
              v-decorator="['levelNo', {rules: [{ required: true, message: '资质等级编号不能为空' }]}]"
              placeholder="请输入资质等级编号"
            />
          </a-form-item>
          <a-form-item label="项目负责人">
            <a-input
              v-decorator="['projectLeader', {rules: [
                { required: true, message: '项目负责人不能为空' }
              ]}]"
              placeholder="请输入项目负责人"
            />
          </a-form-item>
          <a-form-item label="项目负责人手机号码">
            <a-input
              v-decorator="['projectLeaderPhone', {rules: [
                { required: true, message: '项目负责人手机号码不能为空' }
              ]}]"
              @blur="MobileNumberValidator1"
              placeholder="请输入项目负责人手机号码"
            />
          </a-form-item>
          <a-form-item label="技术负责人">
            <a-input
              v-decorator="['techLeader', {rules: [
                { required: true, message: '技术负责人不能为空' }
              ]}]"
              placeholder="请输入技术负责人"
            />
          </a-form-item>
          <a-form-item label="技术负责人手机号码">
            <a-input
              v-decorator="['techLeaderPhone', {rules: [
                { required: true, message: '技术负责人手机号码不能为空' }
              ]}]"
              @blur="MobileNumberValidator2"
              placeholder="请输入技术负责人手机号码"
            />
          </a-form-item>
          <a-form-item label="联系人">
            <a-input
              v-decorator="['contractor', {rules: [
                { required: true, message: '联系人不能为空' }
              ]}]"
              placeholder="请输入联系人"
            />
          </a-form-item>
          <a-form-item label="联系人手机号码">
            <a-input
              v-decorator="['phone', {rules: [
                { required: true, message: '联系人手机号码不能为空' }
              ]}]"
              @blur="MobileNumberValidator3"
              placeholder="请输入联系人手机号码"
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
        :width="700"
        @close="onReadClose"
        :title="readTitle"
        :visible="visibleRead"
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-tabs>
          <a-tab-pane key="tab1" tab="基本信息">
            <detail-list :col="2">
              <detail-list-item term="单位名称">{{ obj.enterpriseName }}</detail-list-item>
              <detail-list-item term="资质等级编号">{{ obj.levelNo }}</detail-list-item>
            </detail-list>
            <detail-list :col="2">
              <detail-list-item term="单位类别">{{ obj.category === 0 ? "业主":obj.category === 1 ? "监理":"施工" }}</detail-list-item>
              <detail-list-item term="创建时间">{{ obj.createTime }}</detail-list-item>
            </detail-list>
          </a-tab-pane>
          <a-tab-pane key="tab2" tab="单位人员">
            <detail-list :col="2">
              <detail-list-item term="项目负责人">{{ obj.projectLeader }}</detail-list-item>
              <detail-list-item term="项目负责人联系方式">{{ obj.projectLeaderPhone }}</detail-list-item>
            </detail-list>
            <detail-list :col="2">
              <detail-list-item term="技术负责人">{{ obj.techLeader }}</detail-list-item>
              <detail-list-item term="联系人联系方式">{{ obj.techLeaderPhone }}</detail-list-item>
            </detail-list>
            <detail-list :col="2">
              <detail-list-item term="联系人">{{ obj.contractor }}</detail-list-item>
              <detail-list-item term="技术负责人联系方式">{{ obj.phone }}</detail-list-item>
            </detail-list>
          </a-tab-pane>
          <a-tab-pane key="tab3" tab="项目">
            <s-table
              size="small"
              :columns="projectColumns"
              :data="loadProjectData"
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
import { STable } from '@/components'
import { getEnterprisePage, saveEnterprise, getEnterpriseInfo, removeEnterprise } from '@/api/enterprise'
import { getProjectPage } from '@/api/project'
import DetailList from '@/components/DescriptionList/DescriptionList'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'UnitList',
  components: {
    AFormItem,
    DetailList,
    DetailListItem,
    STable
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
      obj: {},
      actionList: {}, // 权限按钮
      // 查询参数
      queryParam: {},
      // 表格分页栏设置
      pagination: {
        // showQuickJumper: true,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      readPagination: {
        size: 'small',
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '单位名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true,
          width: '40%'
        },
        {
          title: '联系人',
          dataIndex: 'contractor',
          key: 'contractor',
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '联系手机号码',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true,
          width: '20%'
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getEnterprisePage(parameter)
          .then(res => {
            return res.result
          })
      },
      // selectedRowKeys: [],
      // selectedRows: [],
      // 查看项目
      projectParam: '',
      projectColumns: [
        {
          title: '序号',
          align: 'center',
          ellipsis: true,
          // 序号自增
          customRender: function (text, record, index) {
            return parseInt(index) + 1
          },
          width: '10%'
        },
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
          align: 'center',
          ellipsis: true
        }
      ],
      loadProjectData: parameter => {
        var param = {
          entity: {
            enterpriseId: this.projectParam
          }
        }
        Object.assign(parameter, param)
        return getProjectPage(parameter)
          .then(res => {
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
    // 自定义表单验证
    // 手机号验证
    MobileNumberValidator1 (e) {
      const idcardReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (e.target.value && !idcardReg.test(e.target.value)) {
        const arr = [{
          message: '请输入正确的手机号码格式',
          field: 'projectLeaderPhone'
        }]
        this.form.setFields({ projectLeaderPhone: { value: e.target.value, errors: arr } })
      }
    },
    MobileNumberValidator2 (e) {
      const idcardReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (e.target.value && !idcardReg.test(e.target.value)) {
        const arr = [{
          message: '请输入正确的手机号码格式',
          field: 'techLeaderPhone'
        }]
        this.form.setFields({ techLeaderPhone: { value: e.target.value, errors: arr } })
      }
    },
    MobileNumberValidator3 (e) {
      const idcardReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (e.target.value && !idcardReg.test(e.target.value)) {
        const arr = [{
          message: '请输入正确的手机号码格式',
          field: 'phone'
        }]
        this.form.setFields({ phone: { value: e.target.value, errors: arr } })
      }
    },

    // 查询按钮
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          var param = {
            entity: {
              enterpriseName: values.enterpriseName,
              contractor: values.contractor,
              phone: values.phone
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
      this.searchForm.resetFields()
    },
    // 新增按钮
    addDrawerShow () {
      this.title = '添加单位'
      this.visible = true
    },
    // 修改按钮
    handleEdit (e) {
      this.title = '修改单位信息'
      this.visible = true
      const param = { id: e.id }
      getEnterpriseInfo(param).then(res => {
        this.obj = res.result
        this.form.setFieldsValue(pick(res.result, 'id', 'enterpriseName', 'category', 'levelNo', 'projectLeader', 'projectLeaderPhone', 'techLeader', 'techLeaderPhone', 'contractor', 'phone'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          saveEnterprise(values).then(res => {
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
      this.readTitle = '查看单位信息'
      this.visibleRead = true
      var param = { id: e.id }
      this.projectParam = e.id
      getEnterpriseInfo(param).then(res => {
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
      removeEnterprise(param).then(res => {
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
      // this.$info({
      //   title: '提示信息',
      //   content: '取消删除'
      // })
    },
    // onChange (selectedRowKeys, selectedRows) {
    //   this.selectedRowKeys = selectedRowKeys
    //   this.selectedRows = selectedRows
    // },
    okHandle () {
      this.form.resetFields()
      this.$refs.table.refresh(true)
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>

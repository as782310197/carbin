<template>
  <a-card class="personCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="职务">
                <a-select
                  v-decorator="['position']"
                  placeholder="请选择职务"
                >
                  <a-select-option v-for="item in positionList" :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="员工名称">
                <a-input
                  v-decorator="['name']"
                  placeholder="请输入员工名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="联系电话">
                <a-input
                  v-decorator="['phone']"
                  placeholder="请输入联系电话"
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
        <!-- <span slot="position" slot-scope="text">
          {{ text | positionFilter }}
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
        </template>
      </s-table>
    </div>
    <!-- 添加、修改抽屉 -->
    <div>
      <a-drawer
        :width="600"
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
          <a-form-item label="员工名称">
            <a-input
              v-decorator="['name', {rules: [
                { required: true, message: '员工名称不能为空' }
              ]}]"
              placeholder="请输入员工名称"
            />
          </a-form-item>
          <a-form-item label="单位">
            <a-select
              v-decorator="['enterpriseId', {rules: [
                { required: true, message: '请选择单位' },
                { max: 50, message: '输入单位名称最大长度为50'}
              ]}]"
              placeholder="请选择单位"
              @change="handleEnterpriseSelectChange"
            >
              <a-select-option v-for="item in templateDatas" :key="item.id" :value="item.id">{{ item.enterpriseName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="职务">
            <a-select
              v-decorator="['position', {rules: [{ required: true, message: '职务不能为空' }]}]"
              placeholder="请选择职务"
            >
              <a-select-option v-for="item in positionDatas" :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="性别">
            <a-radio-group
              v-decorator="['gender', {rules: [{ required: true, message: '请选择性别' }]}]"
            >
              <a-radio :value="1">男</a-radio>
              <a-radio :value="0">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="出生日期">
            <a-date-picker
              v-decorator="['birthday', {rules: [{ required: true, message: '请选择出生日期' }]}]"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="身份证号码">
            <a-input
              v-decorator="['idCard', { rules: [
                { required: true, message: '身份证号码不能为空' }
              ]}]"
              @blur="IDValidator"
              placeholder="请输入身份证号码"
            />
          </a-form-item>
          <a-form-item label="联系电话">
            <a-input
              v-decorator="['phone', { rules: [
                { required: true, message: '联系电话不能为空' }
              ]}]"
              @blur="MobileNumberValidator"
              placeholder="请输入联系电话"
            />
          </a-form-item>
          <a-form-item label="职称">
            <a-input
              v-decorator="['title', { rules: [{ required: true, message: '职称不能为空' }]}]"
              placeholder="请输入职称"
            />
          </a-form-item>
          <a-form-item label="资格证编号">
            <a-input
              v-decorator="['titleNo', { rules: [{ required: true, message: '资格证编号不能为空' }]}]"
              placeholder="请输入资格证编号"
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
        <a-card
          :bordered="true"
          title="基本信息"
          size="small"
        >
          <detail-list :col="2">
            <detail-list-item term="员工名称">{{ obj.name }}</detail-list-item>
            <detail-list-item term="联系方式">{{ obj.phone }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <!-- <detail-list-item term="职务">{{ this.mapPositionData(obj.position) }}</detail-list-item> -->
            <detail-list-item term="职务">{{ obj.positionName }}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="出生年月">{{ obj.birthday }}</detail-list-item>
            <detail-list-item term="性别">{{ obj.gender === 1 ? "男":"女" }}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="职称">{{ obj.title }}</detail-list-item>
            <detail-list-item term="资格证编号">{{ obj.titleNo }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="身份证号码">{{ obj.idCard }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="单位名称">{{ obj.enterpriseName }}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="创建时间">{{ obj.createTime }}</detail-list-item>
          </detail-list>
        </a-card>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getPersonPage, savePerson, getPresonInfo, removePreson } from '@/api/person'
import { getEnterpriseList } from '@/api/enterprise'
import { getPositionList } from '@/api/common'
import DetailList from '@/components/DescriptionList/DescriptionList'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import moment from 'moment'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'PersonList',
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
      loading: false,
      queryParam: [],
      obj: {},
      templateDatas: [],
      positionDatas: [],
      positionList: [],
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '员工名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true,
          width: '10%'
        },
        {
          title: '职务',
          dataIndex: 'positionName',
          key: 'positionName',
          align: 'center',
          // scopedSlots: { customRender: 'position' },
          ellipsis: true,
          width: '10%'
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true,
          width: '15%'
        },
        {
          title: '单位',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true,
          width: '30%'
        },
        {
          title: '职称',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          ellipsis: true,
          width: '15%'
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
        return getPersonPage(parameter)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  // filters: {
  //   positionFilter (position) {
  //     const positionMap = {
  //       1: '施工员',
  //       2: '质检员',
  //       3: '监理员',
  //       4: '项目管理员'
  //     }
  //     return positionMap[position]
  //   }
  // },
  created () {
    this.fetchTemplateData()
    this.fetchPosition()
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
    // 表单验证
    // 身份证验证
    IDValidator (e) {
      const idcardReg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
      if (e.target.value && !idcardReg.test(e.target.value)) {
        const arr = [{
          message: '请输入正确的身份证号码格式',
          field: 'idCard'
        }]
        this.form.setFields({ idCard: { value: e.target.value, errors: arr } })
      }
    },
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
    // 单位与职务级联
    // 单位
    handleEnterpriseSelectChange (value) {
      this.fetchPositionData(value)
      this.form.resetFields(
        'position', []
      )
      this.positionDatas = []
    },
    // 新增按钮
    addDrawerShow () {
      this.title = '添加人员'
      this.visible = true
    },
    // 查询按钮
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          var param = {
            entity: {
              position: values.position,
              name: values.name,
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
    // 修改按钮
    handleEdit (e) {
      this.title = '修改人员信息'
      this.visible = true
      const param = { id: e.id }
      getPresonInfo(param).then(res => {
        this.obj = res.result
        this.form.setFieldsValue({
          birthday: moment(res.result.birthday, 'YYYY-MM-DD')
        })
        this.form.setFieldsValue(pick(res.result, 'id', 'name', 'gender', 'idCard', 'position', 'phone', 'enterpriseId', 'title', 'titleNo'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          savePerson(values).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
              this.visible = false
              this.saveDisabled = false
            } else {
              this.$message.error('保存失败：' + res.message)
              this.saveDisabled = false
            }
          })
        } else {
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
      this.readTitle = '查看人员信息'
      this.visibleRead = true
      var param = { id: e.id }
      getPresonInfo(param).then(res => {
        this.obj = res.result
      })
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
      this.obj = {}
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      const param = {
        id: e.id
      }
      removePreson(param).then(res => {
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
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    fetchTemplateData () {
      // 这里是自定义的一个请求方法,请求职务下拉列表，用于级联
      var param = {}
      getEnterpriseList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.templateDatas.push(r)
          })
        }
      })
    },
    fetchPositionData () {
      // 这里是自定义的一个请求方法,请求职务下拉列表，用于查询
      var param = {}
      getPositionList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.positionDatas.push(r)
          })
        }
      })
    },
    fetchPosition () {
      // 这里是自定义的一个请求方法,请求角色下拉列表
      var param = {}
      getPositionList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.positionList.push(r)
          })
        }
      })
    }
    // mapPositionData (e) {
    //   const positionMap = {
    //     1: '施工员',
    //     2: '质检员',
    //     3: '监理员',
    //     4: '项目管理员'
    //   }
    //   return positionMap[e]
    // }
  }
}
</script>

<style scoped>

</style>

<template>
  <a-card class="worksiteCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="所属施工标段">
                <a-select
                  v-decorator="['constructionSection']"
                  placeholder="请选择所属施工标段"
                >
                  <a-select-option v-for="item in constructionBidDatas" :key="item.id" :value="item.id">{{ item.sectionName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="工点名称">
                <a-input
                  v-decorator="['name']"
                  placeholder="请输入工点名称"
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
        :width="640"
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
          <a-form-item label="所属施工标段">
            <a-select
              v-decorator="['constructionSection', {
                rules: [{ required: true, message: '请选择所属施工标段' }]
              }]"
              placeholder="请选择所属施工标段"
            >
              <a-select-option v-for="item in constructionBidDatas" :key="item.id" :value="item.id">{{ item.sectionName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="工点编号">
            <a-input
              v-decorator="['pointCode', {
                rules: [{ required: true, message: '工点编号不能为空' }]
              }]"
              placeholder="请输入工点编号"
            />
          </a-form-item>
          <a-form-item label="工点名称">
            <a-input
              v-decorator="['name', {
                rules: [{ required: true, message: '请输入工点名称' }]
              }]"
              placeholder="请输入工点名称"
            />
          </a-form-item>
          <a-form-item label="设备名称">
            <a-select
              v-decorator="['defaultDevice', {
                rules: [{ required: true, message: '请选择设备名称' }]
              }]"
              placeholder="请选择设备名称"
            >
              <a-select-option v-for="item in icpListDatas" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
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
              <detail-list-item term="所属施工标段">{{ obj.constructionSectionName }}</detail-list-item>
              <detail-list-item term="工点编号">{{ obj.pointCode }}</detail-list-item>
            </detail-list>
            <detail-list :col="2">
              <detail-list-item term="工点名称">{{ obj.name }}</detail-list-item>
              <detail-list-item term="默认工控机设备">{{ obj.deviceName }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item term="创建时间">{{ obj.createTime }}</detail-list-item>
            </detail-list>
          </a-tab-pane>
          <a-tab-pane key="2" tab="任务">
            <s-table
              size="small"
              :columns="taskColumns"
              :data="loadTaskData"
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
import { getWorksitePage, saveWorksite, getWorksiteInfo, removeWorksite } from '@/api/worksite'
import { getTaskPage } from '@/api/task'
import { getConstructionBidList } from '@/api/constructionBid'
import { getIcpList } from '@/api/icp'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'WorksiteList',
  components: {
    STable,
    AFormItem,
    DetailList,
    DetailListItem
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
      constructionBidDatas: [],
      icpListDatas: [],
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      // 查看表格分页栏设置
      readPagination: {
        size: 'small',
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '所属施工标段',
          dataIndex: 'constructionSectionName',
          key: 'constructionSectionName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '工点编号',
          dataIndex: 'pointCode',
          key: 'pointCode',
          align: 'center',
          ellipsis: true
        },
        {
          title: '工点名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '设备名称',
          dataIndex: 'deviceName',
          key: 'deviceName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          align: 'center'
        }
      ],
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getWorksitePage(parameter)
          .then(res => {
            // console.log('getRoleList', res)
            // return res.result
            if (res.code === 1) {
              return res.result
            } else {
              this.loadLoding = false
              this.$notification.open({
                message: '数据加载失败',
                description: '错误信息：' + res.message,
                type: 'error',
                duration: 4
              })
            }
          })
      },
      // 查看任务
      taskParam: '',
      taskColumns: [
        {
          title: '序号',
          // 序号自增
          customRender: function (text, record, index) {
            return parseInt(index) + 1
          },
          align: 'center',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '衬砌名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        }
      ],
      loadTaskData: parameter => {
        var param = {
          entity: {
            constructionPoint: this.taskParam
          }
        }
        Object.assign(parameter, param)
        return getTaskPage(parameter)
          .then(res => {
            return res.result
          })
      }
    }
  },
  created () {
    this.fetchIcpListData()
    this.fetchConstructionBidData()
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
    // 新增按钮
    addDrawerShow () {
      this.title = '添加工点'
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
              constructionSection: values.constructionSection,
              name: values.name
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
      this.title = '修改工点信息'
      this.visible = true
      const param = { id: e.id }
      getWorksiteInfo(param).then(res => {
        this.obj = res.result
        this.form.setFieldsValue(pick(res.result, 'id', 'constructionSection', 'pointCode', 'name', 'defaultDevice'))
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
          saveWorksite(values).then(res => {
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
      this.readTitle = '查看工点信息'
      this.visibleRead = true
      var param = { id: e.id }
      this.taskParam = e.id
      getWorksiteInfo(param).then(res => {
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
      removeWorksite(param).then(res => {
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
    fetchIcpListData () {
      console.log('in method')
      // 这里是自定义的一个请求方法,请求角色下拉列表
      var param = {}
      getIcpList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.icpListDatas.push(r)
          })
           console.log(this.icpListDatas)
        }
      })
    },
    fetchConstructionBidData () {
      console.log('in method')
      // 这里是自定义的一个请求方法,请求单位下拉列表
      var param = {}
      getConstructionBidList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.constructionBidDatas.push(r)
          })
           console.log(this.constructionBidDatas)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

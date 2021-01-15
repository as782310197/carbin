<template>
  <a-card class="moduleCard">
    <div>
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
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
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
            <a href="#">
              删除
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
          <a-form-item label="类别">
            <a-select
              v-decorator="['description', {
                rules: [{ required: true, message: '类别不能为空' }]
              }]"
              placeholder="请选择类别"
            >
              <a-select-option value="大后台">大后台</a-select-option>
              <a-select-option value="企业后台">企业后台</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="模块名称">
            <a-input
              v-decorator="['moduleName', {
                rules: [{ required: true, message: '模块名称不能为空' }]
              }]"
              placeholder="请输入模块名称"
            />
          </a-form-item>
          <a-form-item label="排序码">
            <a-input
              v-decorator="['sort', {
                rules: [{ required: true, message: '排序码不能为空' }]
              }]"
              placeholder="请输入排序码"
            />
          </a-form-item>
          <a-form-item label="路由地址">
            <a-input
              v-decorator="['url', {
                rules: [{ required: true, message: '路由地址不能为空' }]
              }]"
              placeholder="请输入路由地址"
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
        :width="500"
        @close="onReadClose"
        :title="readTitle"
        :visible="visibleRead"
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered>
          <a-descriptions-item label="类别" :span="3">
            {{ obj.description }}
          </a-descriptions-item>
          <a-descriptions-item label="模块名称" :span="3">
            {{ obj.moduleName }}
          </a-descriptions-item>
          <a-descriptions-item label="排序码" :span="3">
            {{ obj.sort }}
          </a-descriptions-item>
          <a-descriptions-item label="路由地址" :span="3">
            {{ obj.url }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// getModulePage, saveModule, getModuleInfo, removeModule
import DetailList from '@/components/DescriptionList/DescriptionList'
import { STable } from '@/components'
import { getModulePage, saveModule, removeModule } from '@/api/module'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'ModuleList',
  components: {
    DetailList,
    DetailListItem,
    STable,
    AFormItem
  },
  data () {
    return {
      saveDisabled: false,
      form: this.$form.createForm(this), // 添加表单
      title: '',
      readTitle: '',
      visible: false,
      visibleRead: false,
      addLoading: false,
      readLoading: false,
      loading: false,
      obj: {},
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        // showSizeChanger: true,
        // showQuickJumper: true,
        // pageSize: 10,
        // total: 50,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '类别',
          dataIndex: 'description',
          key: 'description',
          align: 'center',
          ellipsis: true
        },
        {
          title: '模块名称',
          dataIndex: 'moduleName',
          key: 'moduleName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '排序码',
          dataIndex: 'sort',
          key: 'sort',
          align: 'center',
          ellipsis: true
        },
        {
          title: '路由地址',
          dataIndex: 'url',
          key: 'url',
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
      queryParam: {
        // page: {
        //   ascs: ['sort']
        // },
        entity: {
          menu: false
        }
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getModulePage(parameter)
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
    // 新增按钮
    addDrawerShow () {
      this.title = '添加模块'
      this.visible = true
    },
    // 修改按钮
    handleEdit (e) {
      console.log(e)
      // var param = { id: e.id }
      // getModuleInfo(param).then(res => {
      //   console.log(res)
      //   this.obj = res.result
      //   this.form.setFieldsValue(pick(res.result, 'id', 'url', 'moduleName', 'sort'))
      // })
      this.visible = true
      this.title = '修改模块信息'
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(e, 'id', 'description', 'url', 'moduleName', 'sort'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      var saveParam = {
        menu: false,
        grade: 1,
        parentId: 0
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交信息: ', values)
          Object.assign(values, saveParam)
          saveModule(values).then(res => {
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
      // var param = { id: e.id }
      // getModuleInfo(param).then(res => {
      //   this.obj = res.result
      // })
      this.obj = e
      this.readTitle = '查看角色信息'
      this.visibleRead = true
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      console.log(e.id)
      const param = {
        id: e.id
      }
      removeModule(param).then(res => {
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
          console.log('删除失败' + res.message)
        }
      })
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
    }
  }
}
</script>

<style scoped>

</style>

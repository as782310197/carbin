<template>
  <a-card class="systemConfigurationCard">
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
        width="80%"
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
          <a-form-item label="配置项">
            <a-input
              v-decorator="['configKey', {
                rules: [{ required: true, message: '请输入信息' }]
              }]"
              placeholder="请输入"
            />
          </a-form-item>
          <!-- <a-form-item label="类型">
            <a-select
              v-decorator="['type', {
                rules: [{ required: false, message: '请选择' }]
              }]"
              placeholder="请选择"
            >
              <a-select-option value="0">456</a-select-option>
              <a-select-option value="1">123456</a-select-option>
              <a-select-option value="2">78956</a-select-option>
            </a-select>
          </a-form-item> -->
          <!-- <a-form-item label="值">
            <a-input
              v-decorator="['configValue', {
                rules: [{ required: true, message: '请输入信息' }]
              }]"
              placeholder="请输入"
            />
          </a-form-item> -->
          <a-form-item label="状态">
            <a-select
              v-decorator="['status', {
                rules: [{ required: true, message: '请选择' }]
              }]"
              placeholder="请选择"
            >
              <a-select-option :value="0">禁用</a-select-option>
              <a-select-option :value="1">启用</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="描述">
            <a-textarea
              v-decorator="['description', {
                rules: [{ required: true, message: '请输入信息' }]
              }]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="值">
            <!-- <editor-bar v-model="detail" :isClear="isClear" @change="editorChange"></editor-bar> -->
            <editor-bar
              v-decorator="['configValue', {
                initialValue: detail,
                rules: [ { required: true, message: '请输入' }]
              }]"
              :isClear="isClear"
              @change="editorChange"
            >
            </editor-bar>
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
        width="80%"
        @close="onReadClose"
        :title="readTitle"
        :visible="visibleRead"
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="配置项" :span="2">
            {{ obj.configKey }}
          </a-descriptions-item>
          <!-- <a-descriptions-item label="值" :span="2">
            {{ obj.configValue }}
          </a-descriptions-item> -->
          <a-descriptions-item label="状态" :span="2">
            {{ obj.statusName }}
          </a-descriptions-item>
          <a-descriptions-item label="备注" :span="4">
            {{ obj.description }}
          </a-descriptions-item>
          <a-descriptions-item label="值" :span="4">
            <editor-bar :value="obj.configValue" :isClear="isClear">
              <!-- {{ obj.configValue }} -->
            </editor-bar>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import DetailList from '@/components/DescriptionList/DescriptionList'
import pick from 'lodash.pick'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getSysConfigPage, saveSysConfig, getSysConfigInfo, removeSysConfig } from '@/api/systemConfiguration'
import EditorBar from '../../components/wangEnduit' // 引入富文本输入框
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'SystemConfiguration',
  components: {
    DetailList,
    DetailListItem,
    STable,
    AFormItem,
    EditorBar
  },
  data () {
    return {
      isClear: false,
      detail: '',
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
          title: '配置项',
          dataIndex: 'configKey',
          key: 'configKey',
          align: 'center',
          ellipsis: true
        },
        {
          title: '值',
          dataIndex: 'configValue',
          key: 'configValue',
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
          align: 'center'
        }
      ],
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        console.log(Object.assign(parameter, this.queryParam))
        return getSysConfigPage(parameter)
          .then(res => {
            console.log('getSysConfigList', res)
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
    // 富文本输入框
    editorChange (val) {
      console.log(val)
    },
    // 新增按钮
    addDrawerShow () {
      this.title = '添加系统配置'
      this.visible = true
    },
    // 修改按钮
    handleEdit (e) {
      this.title = '修改系统配置信息'
      this.visible = true
      const param = { id: e.id }
      getSysConfigInfo(param).then(res => {
        this.obj = res.result
        this.form.setFieldsValue(pick(res.result, 'id', 'configKey', 'configValue', 'status', 'description'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          // values.configValue = this.detail
          console.log('提交信息: ', values)
          saveSysConfig(values).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              // this.detail = ''
              this.$refs.table.refresh(true)
              this.visible = false
              this.saveDisabled = false
            } else {
              this.$message.error('保存失败：' + res.message)
              this.saveDisabled = false
            }
          })
        } else {
          console.log('错误信息: ', err)
          this.saveDisabled = false
          this.form.option.focus = true
          this.confirmLoading = false
        }
      })
    },
    // 关闭添加抽屉页面
    onClose (e) {
      this.visible = false
      // this.detail = ''
      this.form.resetFields()
    },
    // 查看按钮
    handleRead (e) {
      // console.log('查看数据！')
      this.readTitle = '查看系统配置信息'
      this.visibleRead = true
      var param = { id: e.id }
      getSysConfigInfo(param).then(res => {
        this.obj = res.result
      })
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
      removeSysConfig(param).then(res => {
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
    }
  }
}
</script>

<style scoped>

</style>

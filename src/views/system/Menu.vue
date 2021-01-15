<template>
  <a-card class="memuCard">
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
        :loading="loading"
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
          <a-form-item label="所属模块（父级菜单）">
            <a-select
              v-decorator="['parentId', {
                rules: [{ required: true, message: '请选择所属模块' }]
              }]"
              placeholder="请选择所属模块"
              @change="parentChange"
            >
              <a-select-option v-for="item in templateDatas" :key="item.id" :value="item.id">{{ item.moduleName + '/' + item.description }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="菜单名称">
            <a-input
              v-decorator="['moduleName', {
                rules: [{ required: true, message: '菜单名称不能为空' }]
              }]"
              placeholder="请输入菜单名称"
            />
          </a-form-item>
          <!-- <a-form-item label="图标">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              :fileList="fileList"
              @preview="imgHandlePreview"
              @change="imgHandleChange"
              v-decorator="['icon']"
            >
              <div v-if="fileList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传图标</div>
              </div>
            </a-upload>
            <a-modal :visible="imgPreviewVisible" :footer="null" @cancel="imgHandleCancel">
              <img alt="example" style="width: 100%" :src="previewImage"/>
            </a-modal>
          </a-form-item> -->
          <a-form-item label="URL地址">
            <a-input
              v-decorator="['url', {
                rules: [{ required: true, message: 'URL地址不能为空' }]
              }]"
              placeholder="请输入URL地址"
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
          <a-form-item label="是否启用">
            <a-radio-group
              v-decorator="[
                'status', {
                  rules: [{ required: true, message: '请选择' }]
                }]"
            >
              <a-radio :value="1">启用</a-radio>
              <a-radio :value="0">禁用</a-radio>
            </a-radio-group>
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
        :width="600"
        @close="onReadClose"
        :title="readTitle"
        :visible="visibleRead"
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered>
          <a-descriptions-item label="所属类别（父级类别）" :span="3">
            {{ obj.parentDescription }}
          </a-descriptions-item>
          <a-descriptions-item label="所属模块（父级菜单）" :span="3">
            {{ obj.parentName }}
          </a-descriptions-item>
          <a-descriptions-item label="菜单名称" :span="3">
            {{ obj.moduleName }}
          </a-descriptions-item>
          <!-- <a-descriptions-item label="图标" :span="3">
            <img :src="obj.icon" v-if="obj.icon">
          </a-descriptions-item> -->
          <a-descriptions-item label="URL地址" :span="3">
            {{ obj.url }}
          </a-descriptions-item>
          <a-descriptions-item label="排序码" :span="1">
            {{ obj.sort }}
          </a-descriptions-item>
          <a-descriptions-item label="是否启用" :span="2">
            {{ obj.status===1?"是":"否" }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import DetailList from '@/components/DescriptionList/DescriptionList'
import { STable } from '@/components'
import { getMenuPage, getModuleList, saveModule, removeModule } from '@/api/module'
import pick from 'lodash.pick'
// 引入权限数据
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'MemuList',
  components: {
    DetailList,
    DetailListItem,
    STable
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
      actionList: {}, // 权限按钮
      // 表格分页栏设置
      pagination: {
        // showSizeChanger: true,
        // showQuickJumper: true,
        // pageSize: 10,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      // 图标
      imgPreviewVisible: false,
      previewImage: '',
      fileList: [],
      queryParam: {},
      columns: [
        {
          title: '菜单名称',
          dataIndex: 'moduleName',
          key: 'moduleName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '所属类别',
          dataIndex: 'parentDescription',
          key: 'parentDescription',
          align: 'center',
          ellipsis: true
        },
        {
          title: '所属模块',
          dataIndex: 'parentName',
          key: 'parentName',
          align: 'center',
          ellipsis: true
        },
        {
          title: 'URL地址',
          dataIndex: 'url',
          key: 'url',
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
          title: '状态',
          dataIndex: 'statusName',
          key: 'statusName',
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getMenuPage(parameter)
          .then(res => {
            return res.result
          })
      },
      templateDatas: [], // 接收下拉框数据的对象
      partentDescription: '', // 所属类别
      obj: {}
    }
  },
  // created 初始加载
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
    // 新增按钮
    addDrawerShow () {
      this.title = '添加菜单'
      this.visible = true
    },
    // 修改按钮
    handleEdit (e) {
      this.title = '修改菜单信息'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(e, 'id', 'parentId', 'url', 'moduleName', 'sort', 'status'))
      })
    },
    // 切换选中的父级模块
    parentChange (e) {
      var id = e
      var item = this.templateDatas.find(item => item.id === id)
      this.partentDescription = item.description
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      var saveParam = {
        menu: true,
        grade: 2,
        description: this.partentDescription
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          Object.assign(values, saveParam)
          saveModule(values).then(res => {
              if (res.code === 1) {
                this.saveDisabled = false
                this.$message.success('保存成功')
                this.form.resetFields()
                this.$refs.table.refresh(true)
                this.visible = false
              } else {
                this.saveDisabled = false
                this.$message.error('保存失败：' + res.message)
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
      this.form.resetFields()
      this.fileList = []
    },
    // 查看按钮
    handleRead (e) {
      // console.log('查看数据！')
     /*  var param = { id: e.id }
      getMenuInfo(param).then(res => {
        this.obj = res.result
      }) */
      this.$nextTick(() => {
        this.obj = e
      })
      console.log(e)
      this.readTitle = '查看菜单信息'
      this.visibleRead = true
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      var param = { id: e.id }
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
        }
      })
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
    },
    // 上传图标
    imgHandleCancel () {
      this.imgPreviewVisible = false
    },
    async imgHandlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.imgPreviewVisible = true
    },
    imgHandleChange ({ fileList }) {
      this.fileList = fileList
    },
    fetchTemplateData () {
      console.log('in method')
      const param = {
        menu: false,
        status: 1
      }
      // 这里是自定义的一个请求方法
      getModuleList(param).then((res) => {
        if (res.code === 1) {
          const result = res.result
          result.forEach((r) => {
            this.templateDatas.push(r)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

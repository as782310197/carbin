<template>
  <a-card>
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
        <span slot="status" slot-scope="text">
          {{ text | statusFilter }}
        </span>
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
          <a-form-item label="选择图片">
            <a-upload
              :action="`${baseURL}/upload/singleFileUpload`"
              list-type="picture-card"
              :file-list="fileList"
              :before-upload="beforeUpload"
              @preview="handlePreview"
              @change="handleChange"
              v-decorator="['url']"
            >
              <div v-if="fileList.length < 1">
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
          <a-form-item label="轮播图标题">
            <a-input
              v-decorator="['title', {
                rules: [{ required: true, message: '轮播图标题不能为空' }]
              }]"
              placeholder="请输入轮播图标题"
            />
          </a-form-item>
          <a-form-item label="排序">
            <a-input
              v-decorator="['sort', {
                rules: [{ required: true, message: '排序不能为空' }]
              }]"
              placeholder="请输入排序"
            />
          </a-form-item>
          <a-form-item label="状态">
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
        <a-descriptions size="small" title="基本信息" bordered :column="4">
          <a-descriptions-item label="轮播图标题" :span="4">
            {{ obj.title }}
          </a-descriptions-item>
          <a-descriptions-item label="图片" :span="4">
            <viewer class="imgBox" :images="obj.url" v-if="obj.url">
              <img
                :src="obj.url"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="排序" :span="2">
            {{ obj.sort }}
          </a-descriptions-item>
          <a-descriptions-item label="状态" :span="2">
            {{ obj.status === 1 ? "启用" : "禁用" }}
          </a-descriptions-item>
          <a-descriptions-item label="创建时间" :span="4">
            {{ obj.createTime }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
// getSysBannerPage getSysBannerInfo removeSysBanner saveSysBanner
import { getSysBannerPage, saveSysBanner } from '@/api/sysBanner'
// import { getMenuPage } from '@/api/module'
import pick from 'lodash.pick'
import { baseUrl } from '@/utils/util.js'
// 引入权限数据
import { mapState } from 'vuex'

function getBase64 (file, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'Banner',
  components: {
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
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      // 轮播图
      fileList: [], // 上传图片
      previewVisible: false,
      previewImage: '',
      obj: {},
      queryParam: {},
      columns: [
        {
          title: '轮播图标题',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          ellipsis: true
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getSysBannerPage(parameter)
          .then(res => {
            return res.result
          })
      }
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: '启用',
        0: '禁用'
      }
      return statusMap[status]
    }
  },
  // created 初始加载
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
    // 新增按钮
    addDrawerShow () {
      this.title = '添加轮播图'
      this.fileList = []
      this.visible = true
    },
    // 修改按钮
    handleEdit (record) {
      this.title = '修改轮播图信息'
      this.visible = true
      this.fileList = []
      console.log(record)
      // 回显图片
      if (record.url) {
        this.fileList = [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: record.url
        }]
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'id', 'bannerImg', 'title', 'sort', 'status'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      // var saveParam = {
      //   menu: true,
      //   grade: 2
      // }
      this.form.validateFields((err, values) => {
        if (!err) {
          // Object.assign(values, saveParam)
          if (this.fileList.length > 0) {
            if (this.fileList[0].url) {
              values.url = this.fileList[0].url
            } else {
              values.url = this.fileList[0].response.url
            }
          } else {
            values.url = ''
          }
          saveSysBanner(values).then(res => {
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
    handleRead (record) {
      // this.$nextTick(() => {
      //   this.obj = e
      // })
      console.log(record)
      this.readTitle = '查看轮播图信息'
      this.obj = JSON.parse(JSON.stringify(record))
      this.obj.url = [record.url]
      this.visibleRead = true
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      // var param = { id: e.id }
      // removeModule(param).then(res => {
      //   if (res.code === 1) {
      //     this.$success({
      //       title: '提示信息',
      //       content: '删除成功',
      //       onOk: () => this.$refs.table.refresh(true)
      //     })
      //   } else {
      //     this.$error({
      //       title: '提示信息',
      //       content: '删除失败' + res.message
      //     })
      //   }
      // })
    },
    // 取消删除此条数据(点击取消回调)
    cancel (e) {
      this.$message.info('已取消删除')
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
  .imgBox {
    img {
      width: 200px;
      // height: 100px;
    }
  }
</style>

<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="代理机构名称">
              <a-input
                v-decorator="['name']"
                placeholder="请输入代理机构名称"
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
          <a-col :span="4" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '2px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 按钮部分 -->
    <div class="button_div">
      <a-button type="primary" @click="handleAdd" v-if="actionList.add === 1">添加</a-button>
    </div>
    <!-- 表格部分 -->
    <div class="table_div">
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
            @confirm="handleDelete(record)"
            @cancel="handleCancelDeletion"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="javaScript:void(0)">删除</a>
          </a-popconfirm>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改表单部分 -->
    <div class="add_div">
      <a-drawer
        :width="600"
        @close="onClose"
        :title="addDrawerTitle"
        :visible="addDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSaveSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="代理机构名称">
            <a-input
              v-decorator="['name', {rules: [
                { required: true, message: '代理机构名称不能为空' }
              ]}]"
              placeholder="请输入代理机构名称"
            />
          </a-form-item>
          <a-form-item :label="item.name" v-for="(item, index) of picList" :key="index">
            <upload-img-group :v-decorator="[item.typeName]" :ref="item.typeName" @ImageFun="getImageList" :imageInfo="item.fileLists"></upload-img-group>
          </a-form-item>
          <a-form-item label="分成比">
            <a-input
              v-decorator="['rate', {rules: [
                { required: true, message: '分成比' }
              ]}]"
              placeholder="请输入分成比"
            />
          </a-form-item>
          <a-form-item label="地址">
            <a-input
              v-decorator="['address', {rules: [
                { required: true, message: '地址不能为空' }
              ]}]"
              placeholder="请输入地址"
            />
          </a-form-item>
          <a-form-item label="联系人手机号码">
            <a-input
              v-decorator="['phone', {rules: [
                { required: true, message: '联系人手机号码不能为空' }
              ]}]"
              placeholder="请输入联系人手机号码"
            />
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              v-decorator="['status', {
                rules: [{ required: true, message: '请选择' }]
              }]"
              placeholder="请选择"
            >
              <a-select-option :value="1">启用</a-select-option>
              <a-select-option :value="0">禁用</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="类型">
            <a-select
              v-decorator="['type', {
                rules: [{ required: true, message: '请选择' }]
              }]"
              placeholder="请选择"
            >
              <a-select-option :value="0">个人</a-select-option>
              <a-select-option :value="1">企业</a-select-option>
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
          v-show="saveDivVisible"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" html-type="submit" @click="handleSaveSubmit" :disabled="saveDisabled">保存</a-button>
        </div>
      </a-drawer>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="650"
        @close="onReadDrawerClose"
        title="查看代理机构信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered>
          <a-descriptions-item label="代理机构名称" :span="3">
            {{ readListData.name }}
          </a-descriptions-item>
          <a-descriptions-item label="地址" :span="3">
            {{ readListData.address }}
          </a-descriptions-item>
          <a-descriptions-item label="联系手机号码" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="分成比" :span="1">
            {{ readListData.rate }}
          </a-descriptions-item>
          <a-descriptions-item label="状态" :span="2">
            {{ readListData.status === 1 ? '启用' : '禁用' }}
          </a-descriptions-item>
          <a-descriptions-item label="类型" :span="1">
            {{ readListData.type === 1 ? '企业' : '个人' }}
          </a-descriptions-item>
          <a-descriptions-item label="身份证正面照" :span="3">
            <!-- <img :src="readListData.businessLicenseImg"> -->
            <viewer class="imgBox" :images="readListData.idCardFront" v-if="readListData.idCardFront">
              <img
                :src="readListData.idCardFront"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="身份证反面照" :span="3">
            <!-- <img :src="readListData.businessLicenseImg"> -->
            <viewer class="imgBox" :images="readListData.idCardBack" v-if="readListData.idCardBack">
              <img
                :src="readListData.idCardBack"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="企业执照照片" :span="3">
            <!-- <img :src="readListData.businessLicenseImg"> -->
            <viewer class="imgBox" :images="readListData.licenseImage" v-if="readListData.licenseImage">
              <img
                :src="readListData.licenseImage"
              >
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// getfindBizAgentPage, getfindBizAgent, removeBizAgent, saveBizAgent
import UploadImgGroup from '@/components/UploadImgGroup'
import { STable } from '@/components'
import { getfindBizAgentPage, saveBizAgent, removeBizAgent } from '@/api/bizAgent.js'
import pick from 'lodash.pick'
// 引入权限数据
import { mapState } from 'vuex'

export default {
  components: {
      STable,
      UploadImgGroup
	},
  data () {
    return {
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      addDrawerTitle: '', // 添加、修改抽屉的标题
      addDrawerVisible: false, // 添加、修改抽屉的可见性
      saveDisabled: false, // 设置保存按钮是否可操作
      saveDivVisible: true, // 设置保存按钮所在操作栏的可见性
      readDrawerVisible: false, // 查看抽屉的可见性
      readListData: [], // 存放查看信息的数组
      actionList: {}, // 权限按钮
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      // 身份证正反面图片和企业执照图, 渲染
      picList: [
        { name: '身份证正面照', typeName: 'idCardFront', fileLists: [] },
        { name: '身份证反面照', typeName: 'idCardBack', fileLists: [] },
        { name: '企业执照照片', typeName: 'licenseImage', fileLists: [] }
      ],
      // 存放身份证正反面图片和企业执照图数据
      imageInfo: {
        idCardBack: [],
        idCardFront: [],
        licenseImage: []
      },
      queryParam: {},
      columns: [
        {
          title: '代理机构名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '分成比',
          dataIndex: 'rate',
          key: 'rate',
          align: 'center',
          ellipsis: true
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
          align: 'center',
          ellipsis: true
        },
        {
          title: '联系手机号码',
          dataIndex: 'phone',
          key: 'phone',
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
        return getfindBizAgentPage(parameter).then(res => {
          // console.log(res)
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
    // 获取图片地址
    getImageList (data) {
      console.log(data)
      // this.updateData = data
      // 子组件上传图片时响应回数据
      // console.log(this.$refs)
      // 获取三组图片对应的元素信息
      const imgList = {
        idCardBack: this.$refs.idCardBack,
        idCardFront: this.$refs.idCardFront,
        licenseImage: this.$refs.licenseImage
      }
      // 获取上传图片组件的fileList并存入
      var list = {}
      for (var i in imgList) {
        list[i] = imgList[i][0].fileList
      }
      // console.log(list)
      // 遍历每个fileList
      for (var j in list) {
        // 每组图片是否存在
        if (list[j].length > 0) {
          // 遍历每组图片路径
          list[j].forEach((v, k) => {
            if (v.url) {
              // 上传保存过后重做的路劲格式
              this.imageInfo[j][k] = v.url
            } else {
              this.imageInfo[j][k] = v.response.url
            }
          })
        } else {
          this.imageInfo[j] = []
        }
      }
      // console.log(this.imageInfo)
      // console.log(this.picList)
    },
    // 查询按钮
    handleSearchSubmit (e) {
      // 阻止默认事件
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        // console.log(values)
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              name: values.name,
              phone: values.phone
            }
          }
          // 把entity存入queryParam中
          Object.assign(this.queryParam, param)
          // 重新刷新表格
          this.$refs.table.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
    // 清空查询输入框按钮
    handleSearchReset () {
      this.searchForm.resetFields()
    },
    // 添加按钮
    handleAdd () {
      this.addDrawerTitle = '添加代理机构'
      // 打开抽屉
      this.addDrawerVisible = true
      // 重置图片，清空图片
      this.picList = [
        { name: '身份证正面', typeName: 'idCardFront', fileLists: [] },
        { name: '身份证反面', typeName: 'idCardBack', fileLists: [] },
        { name: '企业执照照片', typeName: 'licenseImage', fileLists: [] }
      ]
    },
    // 修改按钮
    handleEdit (record) {
      console.log(record)
      this.addDrawerTitle = '修改代理机构信息'
      // 打开抽屉
      this.addDrawerVisible = true
      /* 应用了子组件，表单的v-decorator属性获取不到值，手动获取然后回显
      * 判断图片路径是否存在，存在时重做回显格式的数据类型，不存在返回空数据
      */
      var idCardBack
      var idCardFront
      var licenseImage
      if (record.idCardBack) {
        idCardBack = [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: record.idCardBack
        }]
      } else {
        idCardBack = []
      }
      if (record.idCardFront) {
        idCardFront = [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: record.idCardFront
        }]
      } else {
        idCardFront = []
      }
      if (record.licenseImage) {
        licenseImage = [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: record.licenseImage
        }]
      } else {
        licenseImage = []
      }
      // 赋值回去，重新渲染上传图片的组件
      this.picList = [
        { name: '身份证正面', typeName: 'idCardFront', fileLists: idCardFront },
        { name: '身份证反面', typeName: 'idCardBack', fileLists: idCardBack },
        { name: '企业执照照片', typeName: 'licenseImage', fileLists: licenseImage }
      ]
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'id', 'name', 'rate', 'address', 'phone', 'status', 'type'))
      })
    },
    // 保存按钮
    handleSaveSubmit () {
      // 点击保存时，保存按钮禁用，防止网络不稳定时，多次点击后连续请求
      this.saveDisabled = true
      // 验证数据是否存在
      this.form.validateFields((err, values) => {
        if (!err) {
          // 将数据深拷贝
          const param = JSON.parse(JSON.stringify(values))
          // 解构三组图片所对应的数据，数组值对应着图片路径
          const { idCardBack, idCardFront, licenseImage } = this.imageInfo
          // 给请求参数赋值，图片路径存在时存路径，不存在时存空串
          param.idCardBack = idCardBack[0] || ''
          param.idCardFront = idCardFront[0] || ''
          param.licenseImage = licenseImage[0] || ''
          console.log(param)
          // 验证手机号码格式是否正确
          if (param.phone && !(/^1[3456789]\d{9}$/.test(param.phone))) {
            this.$message.error('手机号码有误，请重填')
            this.saveDisabled = false
            // return
          }
          saveBizAgent(param).then(res => {
            if (res.code === 1) {
              // 成功提示信息
              this.$message.success('保存成功')
              // 重置表单
              this.form.resetFields()
              // 刷新表格
              this.$refs.table.refresh(true)
            } else {
              this.$message.error(res.message)
            }
            // 请求成功后关闭抽屉
            this.addDrawerVisible = false
            // 保存按钮解禁
            this.saveDisabled = false
          })
        } else {
          this.$message.error('带*号的数据不能为空')
          this.saveDisabled = false
        }
      })
    },
    // 查看按钮
    handleRead (record) {
      // idCardBack
      // licenseImage
      this.readListData = JSON.parse(JSON.stringify(record))
      this.readListData.idCardFront = [this.readListData.idCardFront]
      this.readListData.idCardBack = [this.readListData.idCardBack]
      this.readListData.licenseImage = [this.readListData.licenseImage]
      this.readDrawerVisible = true
      console.log(this.readListData)
    },
    // 删除按钮
    handleDelete (key) {
      console.log(key)
      removeBizAgent({ id: key.id }).then(res => {
        // console.log(res)
        if (res.code === 1) {
          this.$message.success('删除成功')
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
    },
    // 关闭添加修改抽屉按钮
    onClose () {
      this.addDrawerVisible = false
      this.form.resetFields()
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .imgBox {
    img {
      width: 100px;
      // height: 100px;
    }
  }
</style>

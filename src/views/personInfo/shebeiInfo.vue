<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="昵称">
              <a-input
                v-decorator="['nick']"
                placeholder="请输入昵称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="电话号码">
              <a-input
                v-decorator="['phone']"
                placeholder="请输入电话号码"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 按钮部分 -->
    <!-- <div class="button_div">
      <a-button type="primary" @click="handleAdd">添加</a-button>
    </div> -->
    <!-- 表格部分 -->
    <div class="table_div">
      <s-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        ref="table"
      >
        <span slot="gender" slot-scope="text">
          {{ text | genderFilter }}
        </span>
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <a-divider type="vertical" v-if="record.status === 1" />
          <a-dropdown v-if="record.status === 1">
            <a class="ant-dropdown-link">
              审核 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleApproved(record.id)">认证通过</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleUnApproved(record.id)">认证不通过</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改表单部分 -->
    <div class="add_div">
      <a-drawer
        :width="900"
        @close="onClose"
        :title="addDrawerTitle"
        :visible="addDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleSaveSubmit">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item >
                <a-input v-decorator="['id']" hidden="hidden"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item >
                <a-input v-decorator="['openId']" hidden="hidden"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item >
                <a-input v-decorator="['password']" hidden="hidden"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="真实姓名">
                <a-input
                  v-decorator="['realName', {rules: [
                    { required: true, message: '真实姓名不能为空' }
                  ]}]"
                  placeholder="请输入真实姓名"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="身份证号码">
                <a-input
                  v-decorator="['idCard', {rules: [
                    { required: true, message: '身份证号码不能为空' }
                  ]}]"
                  placeholder="请输入身份证号码"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="昵称">
                <a-input
                  v-decorator="['nick', {rules: [
                    { required: true, message: '昵称不能为空' }
                  ]}]"
                  placeholder="请输入昵称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="手机号码">
                <a-input
                  v-decorator="['phone', {rules: [
                    { required: true, message: '手机号码不能为空' }
                  ]}]"
                  placeholder="请输入手机号码"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="性别">
                <a-select
                  v-decorator="['gender', {
                    rules: [{ required: true, message: '请选择' }]
                  }]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">女</a-select-option>
                  <a-select-option :value="0">男</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item :label="item.name" v-for="(item, index) of picList" :key="index">
                <upload-img-group :v-decorator="[item.typeName]" :ref="item.typeName" @ImageFun="getImageList" :imageInfo="item.fileLists"></upload-img-group>
              </a-form-item>
            </a-col>
          </a-row>
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
        :width="800"
        @close="onReadDrawerClose"
        title="查看用户信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="真实姓名" :span="2">
            {{ readListData.realName }}
          </a-descriptions-item>
          <a-descriptions-item label="身份证号码" :span="2">
            {{ readListData.idCard }}
          </a-descriptions-item>
          <a-descriptions-item label="昵称" :span="2">
            {{ readListData.nick }}
          </a-descriptions-item>
          <a-descriptions-item label="性别" :span="2">
            {{ readListData.gender !== null ? (readListData.gender === 1 ? '女' : '男') : '' }}
          </a-descriptions-item>
          <a-descriptions-item label="手机号码" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="头像" :span="2">
            <viewer class="imgBox" :images="readListData.portrait" v-if="readListData.portrait">
              <img
                :src="readListData.portrait"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="身份证正面照" :span="2">
            <viewer class="imgBox" :images="readListData.idCardFront" v-if="readListData.idCardFront">
              <img
                :src="readListData.idCardFront"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="身份证反面照" :span="2">
            <viewer class="imgBox" :images="readListData.idCardReverse" v-if="readListData.idCardReverse">
              <img
                :src="readListData.idCardReverse"
              >
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { STable } from '@/components'
import UploadImgGroup from '@/components/UploadImgGroup'
import { findMemberPage, updateBizMember, memberAuthPass, memberAuthFailed,findMemberPage2 } from '@/api/bizCarInfo.js'
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
      readListData: {}, // 存放查看信息的数组
      actionList: {}, // 权限按钮
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      picList: [
        { name: '身份证正面照', typeName: 'idCardFront', fileLists: [] },
        { name: '身份证反面照', typeName: 'idCardReverse', fileLists: [] },
        { name: '头像', typeName: 'portrait', fileLists: [] }
      ],
      queryParam: {},
      columns: [
        {
          title: '昵称',
          dataIndex: 'nick',
          key: 'nick',
          align: 'center',
          ellipsis: true
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender',
          scopedSlots: { customRender: 'gender' },
          align: 'center',
          ellipsis: true
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
          key: 'phone',
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
          // fixed: 'right',
          align: 'center'
          // width: '20%'
        }
      ],
      imageInfo: {
        idCardFront: [],
        idCardReverse: [],
        portrait: []
      },
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findMemberPage2(parameter).then(res => {
          return res.result
        })
      }
    }
  },
  filters: {
    genderFilter (gender) {
      const genderMap = {
        0: '男',
        1: '女'
      }
      return genderMap[gender]
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
      // 获取四组图片对应的元素信息
      const imgList = {
        portrait: this.$refs.portrait
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
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        // console.log(values)
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              nick: values.nick,
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
      this.addDrawerTitle = '添加车主'
      this.addDrawerVisible = true
    },
    // 修改按钮
    handleEdit (record) {
      this.addDrawerTitle = '修改用户信息'
      this.addDrawerVisible = true
      this.$nextTick(() => {
        var idCardFront, idCardReverse, portrait
        if (record.idCardFront) {
          this.imageInfo.idCardFront[0] = record.idCardFront
          idCardFront = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.idCardFront
          }]
        } else {
          idCardFront = []
        }
        if (record.idCardReverse) {
          this.imageInfo.idCardReverse[0] = record.idCardReverse
          idCardReverse = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.idCardReverse
          }]
        } else {
          idCardReverse = []
        }
        if (record.portrait) {
          this.imageInfo.portrait[0] = record.portrait
          portrait = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.portrait
          }]
        } else {
          portrait = []
        }
        this.picList = [
          { name: '身份证正面照', typeName: 'idCardFront', fileLists: idCardFront },
          { name: '身份证反面照', typeName: 'idCardReverse', fileLists: idCardReverse },
          { name: '头像', typeName: 'portrait', fileLists: portrait }
        ]
        this.form.setFieldsValue(pick(record, 'id', 'openId', 'realName', 'idCard', 'gender', 'phone', 'nick', 'password'))
      })
    },
    // 保存按钮
    handleSaveSubmit () {
      this.saveDisabled = true
      this.form.validateFields((err, val) => {
        // console.log(val)
        if (!err) {
          // 解构三组图片所对应的数据，数组值对应着图片路径
          // 解构各个图片对应的数组
          const { portrait } = this.imageInfo
          // 给请求参数赋值，图片路径存在时存路径，不存在时存空串
          // 把图片路径赋值给对应的请求字段
          val.portrait = portrait[0] || ''
          console.log(val)
          updateBizMember(val).then(res => {
            if (res.code === 1) {
              // 成功提示信息
              this.$message.success('保存成功')
              // 重置表单
              this.form.resetFields()
              // 刷新表格
              this.$refs.table.refresh(true)
              // 关闭抽屉
              this.addDrawerVisible = false
              // 保存后清除之前保存的路径，即重新初始化
              this.imageInfo = {
                portrait: []
              }
            } else {
              console.log(res.message)
              this.$message.error(res.message)
            }
            // 不管请求是否成功与失败都恢复保存按钮
            this.saveDisabled = false
          })
        } else {
          console.log(err)
          this.saveDisabled = false
        }
      })
    },
    // 关闭添加修改抽屉按钮
    onClose () {
      this.addDrawerVisible = false
      this.form.resetFields()
      this.picList = [
        { name: '身份证正面照', typeName: 'idCardFront', fileLists: [] },
        { name: '身份证反面照', typeName: 'idCardReverse', fileLists: [] },
        { name: '头像', typeName: 'portrait', fileLists: [] }
      ]
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
    },
    handleRead (record) {
      this.readDrawerVisible = true
      this.readListData = JSON.parse(JSON.stringify(record))
      // 如果存在则把图片路径做成数组形式
      this.readListData.idCardFront = [record.idCardFront]
      this.readListData.idCardReverse = [record.idCardReverse]
      this.readListData.portrait = [record.portrait]
      console.log(this.readListData)
    },
    // 审核通过按钮
    handleApproved (id) {
      var _this = this
      // this.$message.success('审核通过')
      this.$confirm({
        title: '确定通过认证',
        onOk () {
          memberAuthPass({
            id: id
          }).then(res => {
            if (res.code === 1) {
              _this.$message.success('认证通过')
              _this.$refs.table.refresh(true)
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 审核不通过按钮
    handleUnApproved (id) {
      var _this = this
      // this.$message.success('审核通过')
      this.$confirm({
        title: '确定驳回',
        onOk () {
          memberAuthFailed({
            id: id
          }).then(res => {
            if (res.code === 1) {
              _this.$message.success('认证失败')
              _this.$refs.table.refresh(true)
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.imgBox {
  img {
    width: 100px;
  }
}
</style>

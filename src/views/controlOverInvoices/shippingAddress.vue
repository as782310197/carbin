<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="10">
            <a-form-item label="企业名称">
              <a-input
                v-decorator="['enterpriseName']"
                placeholder="请输入企业名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="收件人">
              <a-input
                v-decorator="['legalPerson']"
                placeholder="请输入法人代表"
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
    <!-- <div class="button_div">
      <a-button type="primary" @click="handleAdd" v-if="actionList.add === 1">添加</a-button>
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
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <!-- <a-divider type="vertical" v-if="actionList.get === 1 || actionList.delete === 1" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="handleDelete(record)"
            @cancel="handleCancelDeletion"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="javaScript:void(0)">删除</a>
          </a-popconfirm> -->
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
        <a-form :form="form" :label-col="{ span:6 }" :wrapper-col="{ span: 15 }" @submit="handleSaveSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="企业名称">
            <a-input
              v-decorator="['enterpriseName', {rules: [
                { required: true, message: '企业名称不能为空' }
              ]}]"
              placeholder="请输入企业名称"
            />
          </a-form-item>
          <a-form-item label="收件人">
            <a-input
              v-decorator="['name', {rules: [
                { required: true, message: '收件人不能为空' }
              ]}]"
              placeholder="请输入收件人"
            />
          </a-form-item>
          <a-form-item label="收件人电话">
            <a-input
              v-decorator="['phone', {rules: [
                { required: true, message: '收件人电话不能为空' }
              ]}]"
              placeholder="请输入收件人电话"
            />
          </a-form-item>
          <a-form-item label="收货城市">
            <a-input
              v-decorator="['city', {rules: [
                { required: true, message: '收货城市不能为空' }
              ]}]"
              placeholder="请输入收货城市"
            />
          </a-form-item>
          <a-form-item label="详细地址">
            <a-input
              v-decorator="['address', {rules: [
                { required: true, message: '详细地址不能为空' }
              ]}]"
              placeholder="请输入详细地址"
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
        title="查看收货地址信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="企业名称" :span="4">
            {{ readListData.enterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="收件人" :span="2">
            {{ readListData.name }}
          </a-descriptions-item>
          <a-descriptions-item label="收件人电话" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="收货城市" :span="4">
            {{ readListData.city }}
          </a-descriptions-item>
          <a-descriptions-item label="详细地址" :span="4">
            {{ readListData.address }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { STable } from '@/components'
// { getfindBizEnterprisePage, getfindBizEnterprise, removeBizEnterprise, saveBizEnterprise, qualityPassBizEnterprise, qualityRejectBizEnterprise }
// import { saveBizEnterprise, removeBizEnterprise } from '@/api/bizEnterprise.js'
import { findBizEnterpriseAddressPage, saveBizEnterpriseAddress } from '@/api/bizEnterpriseAddress.js'

// 引入权限数据
import { mapState } from 'vuex'

export default {
  components: {
    STable
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
      stepsCurrent: 0, // 步骤条默认显示第一步的内容
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      queryParam: {},
      columns: [
        {
          title: '企业名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '收件人',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '收件人电话',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true
        },
        {
          title: '收件城市',
          dataIndex: 'city',
          key: 'city',
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
        return findBizEnterpriseAddressPage(parameter).then(res => {
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
    // 查询按钮
    handleSearchSubmit (e) {
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          const param = {
            entity: {
              enterpriseName: values.enterpriseName,
              legalPerson: values.legalPerson
            }
          }
          Object.assign(this.queryParam, param)
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
      this.addDrawerTitle = '添加收货地址'
      this.addDrawerVisible = true
      this.fileList = []
    },
    // 修改按钮
    handleEdit (record) {
      this.addDrawerTitle = '修改收货地址信息'
      this.addDrawerVisible = true
      this.fileList = []
      // this.stepsData = record
      // 回显图片
      // if (record.licenseImage) {
      //   this.fileList = [{
      //     uid: '-1',
      //     name: 'image.png',
      //     status: 'done',
      //     url: record.licenseImage
      //   }]
      // }
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'id', 'enterpriseName', 'name', 'phone', 'city', 'address'))
      })
    },
    // 保存按钮
    handleSaveSubmit () {
      // debugger
      this.form.validateFields((err, values) => {
        values.agentId = this.agentSelectedRowKeys[0]
        values.staffId = this.staffSelectedRowKeys[0]
        if (!err) {
          if (this.fileList.length > 0) {
            if (this.fileList[0].url) {
              values.licenseImage = this.fileList[0].url
            } else {
              values.licenseImage = this.fileList[0].response.url
            }
          } else {
            values.licenseImage = ''
          }
          if (values.phone && !(/^1[3456789]\d{9}$/.test(values.phone))) {
            this.$message.error('手机号码有误，请重填')
            this.saveDisabled = false
            return
          }
          saveBizEnterpriseAddress(values).then(res => {
            if (res.code === 1) {
              this.$message.success('保存成功')
              this.form.resetFields()
              this.$refs.table.refresh(true)
            } else {
              this.$message.error(res.message)
            }
            this.addDrawerVisible = false
            this.saveDisabled = false
          })
        } else {
          console.log(err)
        }
      })
    },
    // 查看按钮
    handleRead (record) {
      // const img = []
      // img.push(record.licenseImage)
      // record.licenseImage = img
      this.readListData = JSON.parse(JSON.stringify(record))
      this.readListData.licenseImage = [record.licenseImage]
      this.readDrawerVisible = true
    },
    // 删除按钮
    // handleDelete (key) {
    //   removeBizEnterprise({
    //     id: key.id
    //   }).then(res => {
    //     if (res.code === 1) {
    //       this.$message.success('删除成功')
    //       this.$refs.table.refresh(true)
    //     } else {
    //       this.$message.error(res.message)
    //     }
    //   })
    // },
    // 取消删除按钮
    // handleCancelDeletion () {
    //   this.$message.info('已取消删除')
    // },
    // 关闭添加修改抽屉按钮
    onClose () {
      this.addDrawerVisible = false
      this.form.resetFields()
      this.stepsCurrent = 0
      this.stepsData = {}
      // this.fileList = []
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .steps_box {
    margin-bottom: 20px;
  }
  .to_steps_btn {
    margin-bottom: 10px;
    text-align: right;
  }
  .distance_left {
    margin-left: 20px;
  }
  // img {
  //   width: 150px;
  // }
  .imgBox {
    img {
      width: 100px;
      // height: 100px;
    }
  }
</style>

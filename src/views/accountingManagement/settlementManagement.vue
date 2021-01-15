<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="结算单号">
              <a-input
                v-decorator="['statementNo']"
                placeholder="请输入结算单号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="结算人">
              <a-input
                v-decorator="['reckoner']"
                placeholder="请输入结算人"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="结算方式">
              <a-select
                v-decorator="['settlementMethod']"
                placeholder="请输入结算方式"
              >
                <a-select-option v-for="item of settlementMethodChooseList" :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" :style="{ textAlign: 'center' }">
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
    <!-- 表格部分 -->
    <div class="table_div">
      <a-table
        :columns="columns"
        :dataSource="loadData"
        :pagination="pagination"
        ref="table"
      >
        <template slot="operation" slot-scope="text,record">
          <a @click="handleUploadPaymentVoucher(record)" v-if="actionList.update === 1">
            上传支付凭证
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
      </a-table>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="600"
        @close="onReadDrawerClose"
        title="查看结算信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" title="基本信息" bordered :column="4">
          <a-descriptions-item label="结算单号" :span="4">
            {{ readListData.statementNo }}
          </a-descriptions-item>
          <a-descriptions-item label="结算金额" :span="2">
            {{ readListData.statementMoney }}元
          </a-descriptions-item>
          <a-descriptions-item label="结算方式" :span="2">
            {{ readListData.settlementMethod }}
          </a-descriptions-item>
          <a-descriptions-item label="结算人" :span="2">
            {{ readListData.reckoner }}
          </a-descriptions-item>
          <a-descriptions-item label="结算日期" :span="2">
            {{ readListData.date }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider v-show="upLoadVisible" />
        <!-- 上传支付凭证 -->
        <div v-show="upLoadVisible">
          <a-form :form="upLoadForm" @submit="handlefixPayment" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="上传支付凭证">
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleUploadChange"
              >
                <a-button><a-icon type="upload" />上传支付凭证</a-button>
              </a-upload>
            </a-form-item>
            <div class="fix_payment_btn_box">
              <a-button type="primary" class="fix_payment_btn" @click="handlefixPayment">确定已打款</a-button>
            </div>
          </a-form>
        </div>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// 引入权限数据
import { mapState } from 'vuex'

export default {
  data () {
    return {
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      upLoadForm: this.$form.createForm(this), // 上传支付凭证表单
      addDrawerTitle: '', // 添加、修改抽屉的标题
      addDrawerVisible: false, // 添加、修改抽屉的可见性
      saveDisabled: false, // 设置保存按钮是否可操作
      saveDivVisible: true, // 设置保存按钮所在操作栏的可见性
      readDrawerVisible: false, // 查看抽屉的可见性
      upLoadVisible: false, // 上传支付凭证块的显示与否
      readListData: [], // 存放查看信息的数组
      actionList: {}, // 权限按钮
      settlementMethodChooseList: [
        {
          key: '0',
          value: '一次性支付'
        },
        {
          key: '1',
          value: '分期支付'
        }
      ],
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '结算单号',
          dataIndex: 'statementNo',
          key: 'statementNo',
          align: 'center',
          ellipsis: true
        },
        {
          title: '结算金额',
          dataIndex: 'statementMoney',
          key: 'statementMoney',
          align: 'center',
          ellipsis: true
        },
        {
          title: '结算方式',
          dataIndex: 'settlementMethod',
          key: 'settlementMethod',
          align: 'center',
          ellipsis: true
        },
        {
          title: '结算人',
          dataIndex: 'reckoner',
          key: 'reckoner',
          align: 'center',
          ellipsis: true
        },
        {
          title: '结算日期',
          dataIndex: 'date',
          key: 'date',
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
      loadData: [
        {
          key: '1',
          statementNo: 'NO123456789',
          statementMoney: '2000',
          settlementMethod: '一次性支付',
          reckoner: '李白',
          date: '2020-07-17'
        },
        {
          key: '2',
          statementNo: 'NO123456789',
          statementMoney: '2000',
          settlementMethod: '一次性支付',
          reckoner: '白居易',
          date: '2020-07-17'
        }
      ]
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
    handleSearchSubmit () {},
    // 清空查询输入框按钮
    handleSearchReset () {
      this.searchForm.resetFields()
    },
    // 上传支付凭证按钮
    handleUploadPaymentVoucher (record) {
      this.readListData = record
      this.readDrawerVisible = true
      this.upLoadVisible = true
    },
    // 查看按钮
    handleRead (record) {
      this.readListData = record
      this.readDrawerVisible = true
      this.upLoadVisible = false
    },
    // 删除按钮
    handleDelete (key) {
      const index = this.loadData.key
      this.loadData.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.form.resetFields()
    },
    // 上传支付凭证
    handleUploadChange () {},
    // 确定已打款按钮
    handlefixPayment () {}
  }
}
</script>

<style lang="less" scoped>
  .fix_payment_btn_box{
    width: 100%;
    .fix_payment_btn{
      // margin-top: 100px;
      margin-left: 240px;
    }
  }
</style>

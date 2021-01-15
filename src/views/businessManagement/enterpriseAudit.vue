<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="企业名称">
              <a-input
                v-decorator="['enterpriseName']"
                placeholder="请输入企业名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="法人代表">
              <a-input
                v-decorator="['legalPerson']"
                placeholder="请输入法人代表"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="开始时间">
              <a-date-picker
                v-decorator="['startTime']"
                placeholder="请选择开始时间"
                style="width: 100%;"
                @change="startTimeChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="结束时间">
              <a-date-picker
                v-decorator="['endTime']"
                placeholder="请选择结束时间"
                style="width: 100%;"
                @change="endTimeChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '6px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
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
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a-dropdown v-if="record.status === 1 && actionList.update === 1">
            <a class="ant-dropdown-link">
              审核 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleApproved(record)">审核通过</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleUnApproved(record)">审核不通过</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </s-table>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="800"
        @close="onReadDrawerClose"
        title="查看企业信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions title="企业信息" size="small" bordered :column="4">
          <a-descriptions-item label="企业名称" :span="2">
            {{ readListData.enterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="统一社会信用代码" :span="2">
            {{ readListData.license }}
          </a-descriptions-item>
          <a-descriptions-item label="营业执照" :span="4">
            <!-- <img :src="readListData.businessLicenseImg"> -->
            <viewer class="imgBox" :images="readListData.licenseImage" v-if="readListData.licenseImage">
              <img
                :src="readListData.licenseImage"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="法人代表" :span="2">
            {{ readListData.legalPerson }}
          </a-descriptions-item>
          <a-descriptions-item label="增值税纳税人性质" :span="2">
            {{ readListData.legalType === '0' ? '个人所得税' : readListData.legalType === '1' ? '企业所得税' : '增值税' }}
          </a-descriptions-item>
          <a-descriptions-item label="企业注册地址" :span="4">
            {{ readListData.address }}
          </a-descriptions-item>
          <a-descriptions-item label="企业固定电话" :span="2">
            {{ readListData.telphone }}
          </a-descriptions-item>
          <a-descriptions-item label="审核状态" :span="2">
            {{ readListData.statusName }}
          </a-descriptions-item>
          <a-descriptions-item label="代理机构名称" :span="2">
            {{ readListData.agentId }}
          </a-descriptions-item>
          <a-descriptions-item label="业务员姓名" :span="2">
            {{ readListData.staffId }}
          </a-descriptions-item>
          <a-descriptions-item label="企业说明" :span="4">
            {{ readListData.description }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="企业银行信息" size="small" bordered :column="4">
          <a-descriptions-item label="开户行" :span="4">
            {{ readListData.bank }}
          </a-descriptions-item>
          <a-descriptions-item label="银行账号" :span="4">
            {{ readListData.bankAccount }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="企业联系人信息" size="small" bordered :column="4">
          <a-descriptions-item label="企业联系人" :span="2">
            {{ readListData.contractor }}
          </a-descriptions-item>
          <a-descriptions-item label="联系人电话" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="联系人邮箱地址" :span="2">
            {{ readListData.email }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="企业账号信息" size="small" bordered :column="4">
          <a-descriptions-item label="企业账号" :span="2">
            {{ readListData.account }}
          </a-descriptions-item>
          <a-descriptions-item label="企业密码" :span="2">
            {{ readListData.password }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
// { getfindBizEnterprisePage, getfindBizEnterprise, removeBizEnterprise, saveBizEnterprise, qualityPassBizEnterprise, qualityRejectBizEnterprise }
import { getfindBizEnterprisePage, qualityPassBizEnterprise, qualityRejectBizEnterprise } from '@/api/bizEnterprise.js'
// 引入权限数据
import { mapState } from 'vuex'
import moment from 'moment'

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
      fileList: [], // 上传图片
      actionList: {}, // 权限按钮
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      columns: [
        {
          title: '企业名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '法人代表',
          dataIndex: 'legalPerson',
          key: 'legalPerson',
          align: 'center',
          ellipsis: true
        },
        {
          title: '企业注册地址',
          dataIndex: 'address',
          key: 'address',
          align: 'center',
          ellipsis: true
        },
        {
          title: '审核状态',
          dataIndex: 'statusName',
          key: 'statusName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          customRender: (text, row, index) => {
            return moment(text).format('YYYY-MM-DD')
          },
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
      queryParam: {
        entity: {
          status: 1
        }
      }, // 查询参数
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getfindBizEnterprisePage(parameter).then(res => {
          // console.log(res)
          return res.result
        })
      },
      startTime: '', // 开始时间
      endTime: '' // 结束时间
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
    // 开始时间
    startTimeChange (data, dataString) {
      this.startTime = dataString
    },
    // 结束时间
    endTimeChange (data, dataString) {
      this.endTime = dataString
    },
    // 查询按钮
    handleSearchSubmit (e) {
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          const param = {
            entity: {
              status: 1,
              enterpriseName: values.enterpriseName,
              legalPerson: values.legalPerson,
              startTime: this.startTime,
              endTime: this.endTime
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
      this.startTime = ''
      this.endTime = ''
    },
    // 查看按钮
    handleRead (record) {
      this.readListData = JSON.parse(JSON.stringify(record))
      this.readListData.licenseImage = [record.licenseImage]
      this.readDrawerVisible = true
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.form.resetFields()
    },
    // 车主审核通过按钮
    handleApproved (data) {
      qualityPassBizEnterprise({
        id: data.id
      }).then(res => {
        if (res.code === 1) {
          this.$message.success('审核通过')
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 车主审核不通过按钮
    handleUnApproved (data) {
      qualityRejectBizEnterprise({
        id: data.id
      }).then(res => {
        if (res.code === 1) {
          this.$message.info('审核不通过')
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    width: 150px;
  }
</style>

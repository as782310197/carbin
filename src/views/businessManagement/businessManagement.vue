<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 5 }" :wrapper-col="{ span: 14 }">
        <a-row>
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
            <a-form-item label="状态">
              <a-select
                v-decorator="['status']"
                placeholder="请选择状态"
              >
                <a-select-option value="0">待信息上传</a-select-option>
                <a-select-option value="1">审核中</a-select-option>
                <a-select-option value="2">审核通过</a-select-option>
                <a-select-option value="3">审核不通过</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
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
        :width="900"
        @close="onClose"
        :title="addDrawerTitle"
        :visible="addDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <!-- <a-steps :current="stepsCurrent" size="small" class="steps_box">
          <a-step title="基本信息" />
          <a-step title="地址信息" />
          <a-step title="业务信息" />
        </a-steps> -->
        <a-form :form="form" :label-col="{ span:8 }" :wrapper-col="{ span: 15 }" @submit="handleSaveSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <h3>企业信息</h3>
          <a-row>
            <a-col :span="12">
              <a-form-item label="企业名称">
                <a-input
                  v-decorator="['enterpriseName', {rules: [
                    { required: true, message: '企业名称不能为空' }
                  ]}]"
                  placeholder="请输入企业名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="统一社会信用代码">
                <a-input
                  v-decorator="['license', {rules: [
                    { required: false, message: '纳税识别号不能为空' }
                  ]}]"
                  placeholder="请输入纳税识别号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="营业执照">
                <a-upload
                  :action="`${baseURL}/upload/singleFileUpload`"
                  list-type="picture-card"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  @preview="handlePreview"
                  @change="handleChange"
                  v-decorator="['licenseImage']"
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
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="法人代表">
                <a-input
                  v-decorator="['legalPerson', {rules: [
                    { required: false, message: '法人代表不能为空' }
                  ]}]"
                  placeholder="请输入法人代表"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="增值税纳税人性质">
                <a-select
                  v-decorator="['legalType', {
                    rules: [{ required: false, message: '请选择' }]
                  }]"
                  placeholder="请选择"
                >
                  <a-select-option value="0">一般纳税人</a-select-option>
                  <a-select-option value="1">小规模纳税人</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="22">
              <a-form-item label="企业注册地址" :label-col="{ span:4 }" :wrapper-col="{ span: 20 }">
                <a-input
                  v-decorator="['address', {rules: [
                    { required: false, message: '企业注册地址不能为空' }
                  ]}]"
                  placeholder="请输入企业注册地址"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="企业固定电话">
                <a-input
                  v-decorator="['telphone', {rules: [
                    { required: false, message: '企业固定电话不能为空' }
                  ]}]"
                  placeholder="请输入企业固定电话"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="审核状态">
                <a-input
                  v-decorator="['statusName', {rules: [
                    { required: false, message: '' }
                  ]}]"
                  placeholder="审核状态由服务端返回"
                  :disabled="true"
                />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
              <a-form-item label="状态">
                <a-select
                  v-decorator="['status', {
                    rules: [{ required: false, message: '请选择' }]
                  }]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">启用</a-select-option>
                  <a-select-option :value="0">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="代理机构名称">
                <a-input
                  v-decorator="['agentName', {rules: [
                    { required: false, message: '代理机构不能为空' }
                  ]}]"
                  placeholder="请选择代理机构"
                  @click="handleGetAgentId"
                />
                <!-- 代理机构搜索弹框 -->
                <a-modal
                  :visible="choiceAgentVisible"
                  title="代理机构搜索"
                  size="small"
                  @ok="handleAgentChoiceOk"
                  @cancel="handleAgentChoiceCancel"
                  class="agentModal"
                  width="50%"
                >
                  <div class="agentSearchForm">
                    <a-form :form="agentSearchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleAgentSearch">
                      <a-row>
                        <a-col :span="18" style="textAlign:center;">
                          <a-form-item>
                            <a-input
                              v-decorator="['name']"
                              placeholder="请输入代理机构名称"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="6" style="textAlign:center;">
                          <a-form-item>
                            <a-button type="primary" html-type="submit" @click="handleAgentSearch">搜索</a-button>
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </a-form>
                  </div>
                  <div class="agentTable">
                    <s-table
                      :columns="agentColumns"
                      :data="agentData"
                      :pagination="agentPagination"
                      :rowKey="record => record.id"
                      ref="agentTable"
                      :rowSelection="{ type:'radio', agentSelectedRowKeys, agentSelectedRows, onChange: onAgentSelectChange }"
                      size="small"
                      bordered
                    >
                    </s-table>
                  </div>
                </a-modal>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="业务员姓名">
                <a-input
                  v-decorator="['staffName', {rules: [
                    { required: false, message: '业务员不能为空' }
                  ]}]"
                  placeholder="请选择业务员"
                  @click="handleGetStaffId"
                />
                <!-- 业务员搜索弹框 -->
                <a-modal
                  :visible="choiceStaffVisible"
                  title="业务员搜索"
                  size="small"
                  @ok="handleStaffChoiceOk"
                  @cancel="handleStaffChoiceCancel"
                  class="staffModal"
                  width="50%"
                >
                  <div class="staffSearchForm">
                    <a-form :form="staffSearchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleStaffSearch">
                      <a-row>
                        <a-col :span="18" style="textAlign:center;">
                          <a-form-item>
                            <a-input
                              v-decorator="['name']"
                              placeholder="请输入业务员姓名"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="6" style="textAlign:center;">
                          <a-form-item>
                            <a-button type="primary" html-type="submit" @click="handleStaffSearch">搜索</a-button>
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </a-form>
                  </div>
                  <div class="staffTable">
                    <s-table
                      :columns="staffColumns"
                      :data="staffData"
                      :pagination="staffPagination"
                      :rowKey="record => record.id"
                      ref="staffTable"
                      :rowSelection="{ type:'radio', staffSelectedRowKeys, staffSelectedRows, onChange: onStaffSelectChange }"
                      size="small"
                      bordered
                    >
                    </s-table>
                  </div>
                </a-modal>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="22">
              <a-form-item label="企业说明" :label-col="{ span:4 }" :wrapper-col="{ span: 20 }">
                <a-textarea
                  v-decorator="['description', {rules: [
                    { required: false }
                  ]}]"
                  :auto-size="{ minRows: 4 }"
                  placeholder="请输入企业说明"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider />
          <h3>企业银行信息</h3>
          <a-row>
            <a-col :span="12">
              <a-form-item label="开户行">
                <a-input
                  v-decorator="['bank', {rules: [
                    { required: false, message: '开户行不能为空' }
                  ]}]"
                  placeholder="请输入开户行"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="银行账号">
                <a-input
                  v-decorator="['bankAccount', {rules: [
                    { required: false, message: '银行账号不能为空' }
                  ]}]"
                  placeholder="请输入银行账号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider />
          <h3>企业联系人信息</h3>
          <a-row>
            <a-col :span="12">
              <a-form-item label="企业联系人">
                <a-input
                  v-decorator="['contractor', {rules: [
                    { required: true, message: '企业联系人不能为空' }
                  ]}]"
                  placeholder="请输入企业联系人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系人电话">
                <a-input
                  v-decorator="['phone', {rules: [
                    { required: true, message: '联系人电话不能为空' }
                  ]}]"
                  placeholder="请输入联系人电话"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="联系人邮箱地址">
                <a-input
                  v-decorator="['email', {rules: [
                    { required: false, message: '联系人邮箱地址不能为空' }
                  ]}]"
                  placeholder="请输入联系人邮箱地址"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider />
          <h3>企业账号信息</h3>
          <a-row>
            <a-col :span="12">
              <a-form-item label="企业账号">
                <a-input
                  v-decorator="['account', {rules: [
                    { required: true, message: '企业账号不能为空' }
                  ]}]"
                  placeholder="请输入企业账号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="企业密码">
                <a-input
                  v-decorator="['password', {rules: [
                    { required: true, message: '企业密码不能为空' }
                  ]}]"
                  placeholder="请输入企业密码"
                />
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
            {{ readListData.legalType === '0' ? '一般纳税人' : '小规模纳税人' }}
          </a-descriptions-item>
          <a-descriptions-item label="企业注册地址" :span="4">
            {{ readListData.address }}
          </a-descriptions-item>
          <a-descriptions-item label="企业固定电话" :span="2">
            {{ readListData.telphone }}
          </a-descriptions-item>
          <a-descriptions-item label="审核状态" :span="2">
            {{ readListData.status }}
          </a-descriptions-item>
          <a-descriptions-item label="代理机构名称" :span="2">
            {{ readListData.agentName }}
          </a-descriptions-item>
          <a-descriptions-item label="业务员姓名" :span="2">
            {{ readListData.staffName }}
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
import pick from 'lodash.pick'
import { STable } from '@/components'
// { getfindBizEnterprisePage, getfindBizEnterprise, removeBizEnterprise, saveBizEnterprise, qualityPassBizEnterprise, qualityRejectBizEnterprise }
import { getfindBizEnterprisePage, saveBizEnterprise, removeBizEnterprise } from '@/api/bizEnterprise.js'
import { getfindBizAgentPage } from '@/api/bizAgent.js'
import { getfindBizStaffPage } from '@/api/bizStaff.js'
import { baseUrl } from '@/utils/util.js'
import moment from 'moment'
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
  components: {
    STable
  },
  data () {
    return {
      agentSelectedRowKeys: [],
      agentSelectedRows: [],
      agentSelectName: '',
      staffSelectedRowKeys: [],
      staffSelectedRows: [],
      staffSelectName: '',
      choiceAgentVisible: false, // 代理机构搜索弹框的可见性
      choiceStaffVisible: false, // 业务员搜索弹框的可见性
      agentSearchForm: this.$form.createForm(this), // 代理机构搜索表单
      staffSearchForm: this.$form.createForm(this), // 业务员搜索表单
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
      previewVisible: false,
      previewImage: '',
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
          title: '法人代表',
          dataIndex: 'legalPerson',
          key: 'legalPerson',
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
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getfindBizEnterprisePage(parameter).then(res => {
          return res.result
        })
      },
      // 代理机构搜索弹框————表
      agentSearchQueryParam: {},
      agentPagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      agentColumns: [
        {
          title: '代理机构名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '联系手机号码',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true
        }
      ],
      agentData: parameter => {
        Object.assign(parameter, this.agentSearchQueryParam)
        return getfindBizAgentPage(parameter).then(res => {
          return res.result
        })
      },
      // 业务员搜索弹框————表
      staffSearchQueryParam: {},
      staffPagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      staffColumns: [
        {
          title: '业务员姓名',
          dataIndex: 'name',
          key: 'name',
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
          title: '职位',
          dataIndex: 'position',
          key: 'position',
          align: 'center',
          ellipsis: true
        }
      ],
      staffData: parameter => {
        Object.assign(parameter, this.staffSearchQueryParam)
        return getfindBizStaffPage(parameter).then(res => {
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
    }),
    // 基础路径
    baseURL () {
      return baseUrl()
    }
  },
  methods: {
    // 代理机构搜索弹框
    handleGetAgentId () {
      this.choiceAgentVisible = true
    },
    handleAgentChoiceOk () {
      this.form.setFieldsValue({ 'agentName': this.agentSelectName })
      this.choiceAgentVisible = false
    },
    handleAgentChoiceCancel () {
      this.choiceAgentVisible = false
    },
    // 改变选中行
    onAgentSelectChange (agentSelectedRowKeys, agentSelectedRows) {
      this.agentSelectName = agentSelectedRows[0].name
      this.agentSelectedRowKeys = agentSelectedRowKeys
    },
    // 代理机构搜索按钮
    handleAgentSearch (e) {
      e.preventDefault()
      this.agentSearchForm.validateFields((err, values) => {
        if (!err) {
          const param = {
            entity: {
              name: values.name
            }
          }
          Object.assign(this.agentSearchQueryParam, param)
          this.$refs.agentTable.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
    // 业务员搜索弹框
    handleGetStaffId () {
      this.choiceStaffVisible = true
    },
    handleStaffChoiceOk () {
      this.form.setFieldsValue({ 'staffName': this.staffSelectName })
      this.choiceStaffVisible = false
    },
    handleStaffChoiceCancel () {
      this.choiceStaffVisible = false
    },
    // 改变选中行
    onStaffSelectChange (staffSelectedRowKeys, staffSelectedRows) {
      this.staffSelectName = staffSelectedRows[0].name
      this.staffSelectedRowKeys = staffSelectedRowKeys
    },
    // 业务员搜索按钮
    handleStaffSearch (e) {
      e.preventDefault()
      this.staffSearchForm.validateFields((err, values) => {
        if (!err) {
          const param = {
            entity: {
              name: values.name
            }
          }
          Object.assign(this.staffSearchQueryParam, param)
          this.$refs.staffTable.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
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
              enterpriseName: values.enterpriseName,
              legalPerson: values.legalPerson,
              status: values.status,
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
    // 添加按钮
    handleAdd () {
      this.addDrawerTitle = '添加企业'
      this.addDrawerVisible = true
      this.fileList = []
    },
    // 修改按钮
    handleEdit (record) {
      this.addDrawerTitle = '修改企业信息'
      this.addDrawerVisible = true
      this.fileList = []
      // this.stepsData = record
      // 回显图片
      if (record.licenseImage) {
        this.fileList = [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: record.licenseImage
        }]
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'id', 'enterpriseName', 'account', 'address', 'agentName', 'bank', 'bankAccount', 'contractor', 'email', 'legalPerson', 'legalType', 'license', 'phone', 'staffName', 'statusName', 'telphone', 'password', 'description'))
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
          saveBizEnterprise(values).then(res => {
            alert(res.code)
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
    handleDelete (key) {
      removeBizEnterprise({
        id: key.id
      }).then(res => {
        if (res.code === 1) {
          this.$message.success('删除成功')
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(res.message)
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
      this.stepsCurrent = 0
      this.stepsData = {}
      // this.fileList = []
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
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

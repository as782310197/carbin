<template>
  <a-card class="dataDictionaryCard">
    <div>
      <!-- 查询表单 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="字典名称">
                <a-input
                  v-decorator="['name']"
                  placeholder="请输入字典名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :style="{ textAlign: 'center' }">
              <a-button type="primary" html-type="submit">
                查询
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                清空
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 添加按钮 -->
      <div class="addDiv">
        <a-button type="primary" @click="addDrawerShow" style="margin-bottom: 20px;" v-if="actionList.add === 1"> 增加 </a-button>
        <!-- <a-button type="primary" @click="handleBatchEnable" style="margin-bottom: 20px; margin-left:20px;"> 批量启用 </a-button> -->
        <!-- <a-button type="primary" @click="handleBatchdeActivation" style="margin-bottom: 20px; margin-left:20px;"> 批量停用 </a-button> -->
        <!-- <router-link :to="{ name: 'SubItemList' }">
          <a-button type="primary" style="margin-bottom: 20px; margin-left:20px;"> 子项管理 </a-button>
        </router-link> -->
      </div>
    </div>
    <!-- 表格部分 -->
    <div class="tableDiv">
      <!-- 表格 -->
      <a-table
        @change="tableChange"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :rowKey="record => record.id"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="statusName" slot-scope="text">
          {{ text === 0 ? '停用' : '启用' }}
        </span>
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">修改</a>
          <a-divider type="vertical" v-if="actionList.update === 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">查看</a>
          <a-divider type="vertical" v-if="actionList.get === 1" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="confirm(record)"
            @cancel="cancel"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="#">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a @click="handldAddItem(record)">配置子项</a>
        </template>
      </a-table>
    </div>
    <!-- 添加、修改抽屉 -->
    <div>
      <a-drawer
        :width="600"
        @close="onClose"
        :title="title"
        :visible="visible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <a-form-item>
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item label="字典名称">
            <a-input
              v-decorator="['name', {
                rules: [{ required: true, message: '字典名称不能为空' }]
              }]"
              placeholder="请输入字典名称"
            />
          </a-form-item>
          <a-form-item label="编码">
            <a-input
              v-decorator="['code', {
                rules: [{ required: true, message: '编码不能为空' }]
              }]"
              placeholder="请输入编码"
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
          <a-form-item label="状态">
            <a-select
              v-decorator="['status', {
                rules: [{ required: true, message: '请选择状态' }],
                initialValue: 1
              }]"
              placeholder="请选择状态"
            >
              <a-select-option :value="0">停用</a-select-option>
              <a-select-option :value="1">启用</a-select-option>
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
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="字典名称" :span="4">
            {{ readListData.name }}
          </a-descriptions-item>
          <a-descriptions-item label="编码" :span="4">
            {{ readListData.code }}
          </a-descriptions-item>
          <a-descriptions-item label="排序码" :span="4">
            {{ readListData.sort }}
          </a-descriptions-item>
          <a-descriptions-item label="状态" :span="4">
            {{ readListData.status === 0 ? '停用' : '启用' }}
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
    <!-- 子项配置页面抽屉 -->
    <div>
      <a-drawer
        width="84%"
        @close="onItemClose"
        :title="itemTitle"
        :visible="visibleItem"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-card class="subItemCard">
          <!-- 添加按钮 -->
          <div class="addDiv">
            <a-button type="primary" @click="addItemModelShow" style="margin-bottom: 20px;">增加</a-button>
            <!-- <a-button type="primary" @click="handleItemBatchEnable" style="margin-bottom: 20px; margin-left:20px;"> 批量启用 </a-button>
            <a-button type="primary" @click="handleItemBatchdeActivation" style="margin-bottom: 20px; margin-left:20px;"> 批量停用 </a-button> -->
          </div>
          <div class="tableDiv">
            <!-- 表格 -->
            <a-table
              @change="itemTableChange"
              :columns="itemColumns"
              :dataSource="itemData"
              :pagination="itemPagination"
              :row-selection="{ selectedRowKeys: itemSelectedRowKeys, onChange: onItemSelectChange }"
            >
              <span slot="statusName" slot-scope="text">
                {{ text === 0 ? '停用' : '启用' }}
              </span>
              <template slot="operation" slot-scope="text,record">
                <a @click="handleItemModelEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a @click="handleItemModelRead(record)">查看</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="您确定要删除吗?"
                  @confirm="itemConfirm(record)"
                  @cancel="itemCancel"
                  okText="确定"
                  cancelText="取消"
                >
                  <a href="#">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
          <!-- 子项添加、修改抽屉 -->
          <div>
            <a-modal
              width="50%"
              :visible="itemAddModalVisible"
              :title="itemAddModalTitle"
              :closable="false"
              @ok="handleAddModalOk"
              @cancel="handleAddModalCancel"
            >
              <a-form :form="itemForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleAddModalOk">
                <!-- <a-form-item label="字典名称">
                  <a-input
                    v-decorator="['dictionaryName', {
                      initialValue: dictionaryName,
                      rules: [{ required: true, message: '字典名称不能为空' }]
                    }]"
                    placeholder="请输入字典名称"
                    :disabled="true"
                  />
                </a-form-item> -->
                <a-form-item class="hidden">
                  <a-input v-decorator="['id']" hidden="hidden"></a-input>
                </a-form-item>
                <a-form-item class="hidden">
                  <a-input v-decorator="['itemId']" hidden="hidden"></a-input>
                </a-form-item>
                <a-form-item label="子项名称">
                  <a-input
                    v-decorator="['itemName', {
                      rules: [{ required: true, message: '子项名称不能为空' }]
                    }]"
                    placeholder="请输入子项名称"
                  />
                </a-form-item>
                <a-form-item label="子项编码">
                  <a-input
                    v-decorator="['itemCode', {
                      rules: [{ required: true, message: '子项编码不能为空' }]
                    }]"
                    placeholder="请输入子项编码"
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
                <a-form-item label="状态">
                  <a-select
                    v-decorator="['status', {
                      rules: [{ required: true, message: '请选择状态' }],
                      initialValue: 1
                    }]"
                    placeholder="请选择状态"
                  >
                    <a-select-option :value="0">停用</a-select-option>
                    <a-select-option :value="1">启用</a-select-option>
                  </a-select>
                </a-form-item>
                <!-- <a-form-item label="描述">
                  <a-textarea
                    v-decorator="['subitemDescribe', {
                      rules: [{ required: false, message: '请输入描述' }]
                    }]"
                    placeholder="请输入描述..."
                  />
                </a-form-item> -->
              </a-form>
            </a-modal>
          </div>
          <!-- 子项查看页面抽屉 -->
          <div>
            <a-modal
              width="50%"
              :visible="itemReadModalVisible"
              :title="itemReadModalTitle"
              :footer="null"
              @cancel="handleReadModalCancel"
            >
              <a-descriptions size="small" bordered :column="4">
                <!-- <a-descriptions-item label="字典名称" :span="4">
                  {{ itemData.amount }}
                </a-descriptions-item> -->
                <a-descriptions-item label="子项名称" :span="4">
                  {{ readItemData.itemName }}
                </a-descriptions-item>
                <a-descriptions-item label="编码" :span="4">
                  {{ readItemData.itemCode }}
                </a-descriptions-item>
                <a-descriptions-item label="排序码" :span="4">
                  {{ readItemData.sort }}
                </a-descriptions-item>
                <a-descriptions-item label="状态" :span="4">
                  {{ readItemData.status === 0 ? '停用' : '启用' }}
                </a-descriptions-item>
                <!-- <a-descriptions-item label="描述" :span="4">
                </a-descriptions-item> -->
              </a-descriptions>
            </a-modal>
          </div>
        </a-card>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import DetailList from '@/components/DescriptionList/DescriptionList'
import { findSysItemPage, saveSysItem, removeSysItem, findSysItemDetailPage, getSysItemDetail, saveSysItemDetail, removeSysItemDetail } from '@/api/sysItem.js'
import pick from 'lodash.pick'
import { mapState } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'DataDictionary',
  components: {
    DetailList,
    DetailListItem
  },
  data () {
    return {
      saveDisabled: false,
      searchForm: this.$form.createForm(this), // 字典查询表单
      itemSearchForm: this.$form.createForm(this), // 子项查询表单
      form: this.$form.createForm(this), // 字典添加表单
      itemForm: this.$form.createForm(this), // 子项添加表单
      title: '',
      readTitle: '',
      visible: false,
      visibleRead: false,
      itemTitle: '配置子项',
      visibleItem: false,
      selectedRowKeys: [], // 字典表格选中的行数组
      itemSelectedRowKeys: [], // 子项表格选中的行数组
      currentId: '', // 当前父项的id
      readListData: {
        code: '',
        name: '',
        sort: '',
        status: ''
      }, // 存放查看数据的对象
      readItemData: {
        itemName: '',
        itemCode: '',
        sort: '',
        status: ''
      },
      dictionaryName: '字典1', // 字典名称
      itemAddModalVisible: false, // 子项添加修改弹窗的可见性
      itemAddModalTitle: '', // 子项添加修改弹窗的标题
      itemReadModalVisible: false, // 子项查看弹窗的可见性
      itemReadModalTitle: '查看子项信息', // 子项查看弹窗的标题
      // 数据字典查询参数
      queryParam: {
        entity: {},
        page: {
          current: 1,
          size: 10
        }
      },
      // 字典表格分页栏设置
      pagination: {
        current: 1,
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      data: [],
      columns: [
        {
          title: '字典名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'statusName' },
          key: 'status',
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
      // 子项分页栏设置
      itemPagination: {
        current: 1,
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      itemColumns: [
        {
          title: '子项名称',
          dataIndex: 'itemName',
          key: 'itemName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'statusName' },
          key: 'status',
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
      itemData: [],
      actionList: {} // 权限按钮
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
  mounted () {
    this.findSysItemPage()
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    })
  },
  methods: {
    // 字典查询按钮
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          this.queryParam.entity = {
            name: values.name
          }
          this.findSysItemPage()
        } else {
          console.log('error', error)
        }
      })
    },
    // 获取分页
    findSysItemPage () {
      findSysItemPage(this.queryParam).then(res => {
        if (res.code === 1) {
          this.data = res.result.records
          this.pagination.pageSize = res.result.size
          this.pagination.current = res.result.current
          this.pagination.total = res.result.total
        }
      })
    },
    // 切换分页
    tableChange (e) {
      this.queryParam.page = {
        current: e.current,
        size: e.pageSize
      }
      this.pagination.current = e.current
      this.pagination.pageSize = e.pageSize
      this.findSysItemPage()
    },
    // 获取字典子项分页
    findSysItemDetailPage () {
      var params = {
        current: this.itemPagination.current,
        size: this.itemPagination.pageSize,
        itemId: this.currentId
      }
      findSysItemDetailPage(params).then(res => {
        if (res.code === 1) {
          this.itemData = res.result.records
          this.itemPagination.pageSize = res.result.size
          this.itemPagination.current = res.result.current
          this.itemPagination.total = res.result.total
        }
      })
    },
    // 子项切换分页
    itemTableChange (e) {
      this.itemPagination.current = e.current
      this.itemPagination.pageSize = e.pageSize
      this.findSysItemDetailPage()
    },
    // 字典清空按钮
    handleReset () {
      this.searchForm.resetFields()
    },
    // 子项清空按钮
    handleItemReset () {
      this.itemSearchForm.resetFields()
    },
    // 配置子项按钮
    handldAddItem (record) {
      this.visibleItem = true
      // this.dictionaryName = record.dictionaryName
      this.currentId = record.id
      this.findSysItemDetailPage()
    },
    // 关闭配置子项页面
    onItemClose () {
      this.visibleItem = false
    },
    // 添加子项弹窗
    addItemModelShow () {
      this.itemAddModalVisible = true
      this.itemAddModalTitle = '添加子项'
    },
    // 添加修改弹窗的确定按钮
    handleAddModalOk (e) {
      e.preventDefault()
      this.itemForm.validateFields((err, values) => {
        if (!err) {
          var params = { ...values }
          if (!params.itemId) params.itemId = this.currentId
          saveSysItemDetail(params).then(res => {
            if (res.code === 1) {
              this.visible = false
              this.saveDisabled = false
              this.$message.success('保存成功!')
              this.itemAddModalVisible = false
              this.itemForm.resetFields()
              this.findSysItemDetailPage()
            } else {
              this.$message.info('保存失败！')
            }
          })
        } else {
          console.log('错误信息: ', err)
          this.itemForm.resetFields()
        }
      })
    },
    // 添加修改弹窗的取消按钮
    handleAddModalCancel () {
      this.itemAddModalVisible = false
      this.itemForm.resetFields()
    },
    // 修改子项弹窗
    handleItemModelEdit (record) {
      this.itemAddModalTitle = '修改子项信息'
      this.itemAddModalVisible = true
      var params = {
        id: record.id
      }
      getSysItemDetail(params).then(res => {
        if (res.code === 1) {
          this.itemForm.setFieldsValue(pick(res.result, 'id', 'itemId', 'itemCode', 'itemName', 'sort', 'status'))
        }
      })
    },
    // 查看子项弹窗
    handleItemModelRead (record) {
      this.itemReadModalVisible = true
      this.readItemData = record
    },
    // 关闭查看子项弹窗
    handleReadModalCancel () {
      this.itemReadModalVisible = false
    },
    // 子项的删除按钮
    itemConfirm (record) {
      removeSysItemDetail({
        id: record.id
      }).then(res => {
        if (res.code === 1) {
        this.$message.success('删除成功')
        this.findSysItemDetailPage()
        } else {
          this.$message.info(res.message)
        }
      })
    },
    // 子项的取消删除按钮
    itemCancel (e) {
      this.$message.info('已取消删除')
    },
    // 字典表格选中的行
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 子项表格选中的行
    onItemSelectChange (itemSelectedRowKeys) {
      console.log('itemSelectedRowKeys changed: ', itemSelectedRowKeys)
      this.itemSelectedRowKeys = itemSelectedRowKeys
    },
    // 字典批量启用按钮
    handleBatchEnable () {},
    // 字典批量停用按钮
    handleBatchdeActivation () {},
    // 子项批量启用按钮
    handleItemBatchEnable () {},
    // 子项批量停用按钮
    handleItemBatchdeActivation () {},
    // 新增按钮
    addDrawerShow () {
      this.title = '添加字典'
      this.visible = true
    },
    // 修改按钮
    handleEdit (record) {
      this.title = '修改字典信息'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'id', 'code', 'name', 'sort', 'status'))
      })
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          var params = { ...values }
          if (!params.id) delete params.id
          saveSysItem(params).then(res => {
            if (res.code === 1) {
              this.visible = false
              this.saveDisabled = false
              this.$message.success('保存成功！')
              this.confirmLoading = false
              this.form.resetFields()
              this.findSysItemPage()
            } else {
              this.$message.info('保存失败！')
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
    handleRead (record) {
      // console.log('查看数据！')
      this.readTitle = '查看字典信息'
      this.visibleRead = true
      this.readListData = record
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (id) {
      removeSysItem(id).then(res => {
        if (res.code === 1) {
          this.$message.success('删除成功')
          this.findSysItemPage()
        } else {
          this.$message.info('删除失败')
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
.hidden{
  display: none;
}
</style>

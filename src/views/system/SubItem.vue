<template>
  <a-card class="subItemCard">
    <div>
      <!-- 添加按钮 -->
      <div class="addDiv">
        <a-button type="primary" @click="addDrawerShow" style="margin-bottom: 20px;">
          <a-icon type="plus" /> 增加 </a-button>
      </div>
    </div>
    <div class="tableDiv">
      <!-- 表格 -->
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
      >
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record.key)" style="color:#556B2F;">
            <a-icon type="edit" /> 修改
          </a>
          <a-divider type="vertical" />
          <a @click="handleRead(record.key)" style="color:#696969;">
            <a-icon type="profile" />查看
          </a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="confirm(record.key)"
            @cancel="cancel"
            okText="确定"
            cancelText="取消"
          >
            <a href="#" style="color:#FF4500;">
              <a-icon type="close-circle" />删除
            </a>
          </a-popconfirm>
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
        :confirmLoading="addLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <a-form-item label="字典名称">
            <a-select
              v-decorator="['dictionaryName', {
                rules: [{ required: true, message: '请选择字典' }]
              }]"
              placeholder="请选择字典"
            >
              <a-select-option value="0">123</a-select-option>
              <a-select-option value="1">456</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="子项名称">
            <a-input
              v-decorator="['subitemName', {
                rules: [{ required: true, message: '子项名称不能为空' }]
              }]"
              placeholder="请输入子项名称"
            />
          </a-form-item>
          <a-form-item label="子项编码">
            <a-input
              v-decorator="['subitemCode', {
                rules: [{ required: true, message: '子项编码不能为空' }]
              }]"
              placeholder="请输入子项编码"
            />
          </a-form-item>
          <a-form-item label="排序码">
            <a-input
              v-decorator="['subitemSortCode', {
                rules: [{ required: true, message: '排序码不能为空' }]
              }]"
              placeholder="请输入排序码"
            />
          </a-form-item>
          <a-form-item label="描述">
            <a-textarea
              v-decorator="['subitemDescribe', {
                rules: [{ required: false, message: '请输入描述' }]
              }]"
              placeholder="请输入描述..."
            />
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              v-decorator="['subitemState', {
                rules: [{ required: true, message: '请选择状态' }]
              }]"
              placeholder="请选择状态"
            >
              <a-select-option value="0">启用</a-select-option>
              <a-select-option value="1">停用</a-select-option>
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
        :confirmLoading="readLoading"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-card
          :bordered="true"
          title="基本信息"
          size="small"
        >
          <detail-list :col="2">
            <detail-list-item term="字典名称">123</detail-list-item>
            <detail-list-item term="子项名称">123</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="子项编码">123456</detail-list-item>
            <detail-list-item term="排序码">1</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="描述">
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
              这是描述信息
            </detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="状态">启用</detail-list-item>
          </detail-list>
        </a-card>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import DetailList from '@/components/DescriptionList/DescriptionList'

const DetailListItem = DetailList.Item

export default {
  name: 'SubItemList',
  components: {
    DetailList,
    DetailListItem
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
      // 表格分页栏设置
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        total: 50,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      data: [
        {
          key: '1',
          subitemName: '123',
          subitemState: '启用'
        },
        {
          key: '2',
          subitemName: '456',
          subitemState: '启用'
        },
        {
          key: '3',
          subitemName: '789',
          subitemState: '停用'
        }
      ],
      columns: [
        {
          title: '子项名称',
          dataIndex: 'subitemName',
          key: 'subitemName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'subitemState',
          key: 'subitemState',
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    // 新增按钮
    addDrawerShow () {
      this.title = '添加子项'
      this.visible = true
    },
    // 修改按钮
    handleEdit (e) {
      this.title = '修改子项信息'
      this.visible = true
    },
    // 保存按钮
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      this.saveDisabled = true
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交信息: ', values)
          this.saveDisabled = false
          setTimeout(() => {
            this.visible = false
            this.saveDisabled = false
            this.$message.success('保存成功！')
            this.confirmLoading = false
            this.$emit('handleSubmit', values)
            this.form.resetFields()
          }, 1500)
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
    handleRead (e) {
      // console.log('查看数据！')
      this.readTitle = '查看子项信息'
      this.visibleRead = true
    },
    // 关闭查看抽屉页面
    onReadClose () {
      this.visibleRead = false
    },
    // 删除按钮
    // 确认删除此条数据(点击确认回调)
    confirm (e) {
      this.$success({
        title: '提示信息',
        content: '删除成功'
      })
      var index = this.data.findIndex(v => e === v.key)
      this.data.splice(index, 1)
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

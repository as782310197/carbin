<template>
  <div class="help_admin">
    <div class="btn_group">
      <!-- 添加按钮 -->
      <a-button type="primary" @click="addData" style="margin-bottom: 20px;" v-if="actionList.add === 1">
        <a-icon type="plus" />增加
      </a-button>
    </div>
    <!-- 添加 修改抽屉 -->
    <a-drawer
      :width="520"
      :title="title"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
        <a-form-item >
          <a-input v-decorator="['id']" hidden="hidden"></a-input>
        </a-form-item>
        <a-form-item label="问题">
          <a-input
            v-decorator="['question', {rules: [
              { required: true, message: '问题不能为空' }
            ]}]"
            placeholder="请输入问题"
          />
        </a-form-item>
        <a-form-item label="解答">
          <a-textarea
            :rows="3"
            v-decorator="['answer', {rules: [
              { required: true, message: '解答不能为空' }
            ]}]"
            placeholder="请解答"
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
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" html-type="submit" @click="handleSubmit" :disabled="saveDisabled">保存</a-button>
      </div>
    </a-drawer>
    <!-- 查看信息抽屉 -->
    <a-drawer
      :width="520"
      title="查看信息"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      placement="right"
      :closable="true"
      :visible="lookVisible"
      @close="onClose"
    >
      <a-descriptions size="small" bordered>
        <a-descriptions-item label="问题" :span="3">
          {{ question }}
        </a-descriptions-item>
        <a-descriptions-item label="解答" :span="3">
          {{ answer }}
        </a-descriptions-item>
      </a-descriptions>
      <!-- <a-card size="small" title="查看内容">
        <div class="question">问题：{{ question }}</div>
        <div>解答：{{ answer }}</div>
      </a-card> -->
    </a-drawer>
    <div class="tableDiv">
      <!-- 表格 -->
      <s-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
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
  </div>
</template>

<script>
import pick from 'lodash.pick'
import { STable } from '@/components'
import { helpAdminFindSysFaqPage, helpAdminSave, helpAdminRemove } from '@/api/sysFaq'
// 引入权限数据
import { mapState } from 'vuex'

export default {
	components: {
			STable
	},
  data () {
      return {
        question: '',
        answer: '',
        form: this.$form.createForm(this), // 添加表单
        saveDisabled: false, // 保存按钮初始状态
        title: '添加数据', // 抽屉标题
        questionId: 0, // 修改数据时提供的id
				columns: [
					{
						title: '问题',
						dataIndex: 'question',
						key: 'question',
						align: 'center',
						width: '25%'
					},
					{
						title: '解答',
						dataIndex: 'answer',
						key: 'answer',
						align: 'center',
						width: '25%'
					},
					{
						title: '创建时间',
						dataIndex: 'createDate',
						key: 'createDate',
						align: 'center',
						width: '25%'
					},
					{
						title: '操作',
						scopedSlots: { customRender: 'operation' },
						key: 'operation',
						align: 'center',
						width: '25%'
					}
        ],
        queryParam: {},
        actionList: {}, // 权限按钮
				loadData: parameter => {
					Object.assign(parameter, this.queryParam)
					console.log(Object.assign(parameter, this.queryParam))
					return helpAdminFindSysFaqPage(parameter)
						.then(res => {
							return res.result
						})
				},
				// 表格分页栏设置
				pagination: {
					showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
				},
        visible: false, // 添加 修改 抽屉的显隐
        lookVisible: false // 查看数据抽屉
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
		// 提交表单触发的函数, 保存数据
		handleSubmit () {
      this.saveDisabled = true
      this.form.validateFields((err, val) => {
        if (!err) {
          console.log(val)
          helpAdminSave(val).then(res => {
            if (res.code === 1) {
              this.$refs.table.refresh(true)
              this.form.resetFields()
              this.$message.success('保存成功')
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
            this.saveDisabled = false
          })
        } else {
          this.saveDisabled = false
        }
      })
		},
		// 添加数据
		addData () {
      this.question = ''
      this.answer = ''
      this.visible = true
      this.title = '添加数据'
		},
		// 添加 修改抽屉的关闭事件
		onClose () {
      this.visible = false
      this.lookVisible = false
		},
		// 修改表格数据
		handleEdit (record) {
      console.log(record)
      this.visible = true
      this.title = '修改数据'
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'id', 'answer', 'question'))
      })
		},
		// 查看表格数据
		handleRead (record) {
      console.log(record)
      this.question = record.question
      this.answer = record.answer
      this.lookVisible = true
		},
		// 确定删除表格数据
		confirm (record) {
      console.log(record)
      helpAdminRemove({
        id: record.id
      }).then(res => {
        if (res.code === 1) {
          this.$message.success('删除成功')
          this.$refs.table.refresh(true)
        }
      })
		},
		// 取消删除表格数据
		cancel () {
			this.$message.info('已取消删除')
		}
	}
}
</script>

<style scoped>
    .help_admin {
      background: #fff;
    }
		.btn_group {
			padding: 20px 0 0 20px;
		}
    .question {
      margin-bottom: 15px;
    }
</style>

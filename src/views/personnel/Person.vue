<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="人员ID">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="职务">
              <a-select placeholder="请选择">
                <a-select-option value="0">施工员</a-select-option>
                <a-select-option value="1">监理员</a-select-option>
                <a-select-option value="2">质检员</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="人员名称">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="联系电话">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-button class="editable-add-btn" @click="personnelAdd" type="primary">增加</a-button>

    <a-modal
      :title="title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <p class="userInfo">员工名称</p>
      <a-input placeholder="请输入" v-model="userInfo.personnelName" />
      <p class="userInfo">性别</p>
      <a-radio-group name="radioGroup" :defaultValue="userInfo.sex" v-model="userInfo.sex">
        <a-radio :value="1">男</a-radio>
        <a-radio :value="0">女</a-radio>
      </a-radio-group>
      <p class="userInfo">出生年月</p>
      <a-input placeholder="请输入" v-model="userInfo.birthdy" />
      <p class="userInfo">身份证号码</p>
      <a-input placeholder="请输入" v-model="userInfo.idCard" />
      <p class="userInfo">职务</p>
      <a-select placeholder="请选择" :defaultValue="userInfo.post" style="width: 120px" v-model="userInfo.post">
        <a-select-option value="0">项目管理员</a-select-option>
        <a-select-option value="1">施工员</a-select-option>
        <a-select-option value="2">监理员</a-select-option>
        <a-select-option value="3">质检员</a-select-option>
      </a-select>
      <p class="userInfo">单位</p>
      <a-select placeholder="请选择" :defaultValue="userInfo.company" style="width: 120px" v-model="userInfo.company">
        <a-select-option value="0">单位1</a-select-option>
        <a-select-option value="1">单位2</a-select-option>
        <a-select-option value="2">单位3</a-select-option>
        <a-select-option value="3">单位4</a-select-option>
      </a-select>
      <p class="userInfo">职称</p>
      <a-input placeholder="请输入" v-model="userInfo.positionalTitles" />
      <p class="userInfo">资格证编号</p>
      <a-input placeholder="请输入" v-model="userInfo.qualificationNo" />
    </a-modal>

    <a-table :columns="columns" :dataSource="data">
      <a slot="personnelName" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">
        员工名称
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="updatePersonnel(record.key)">修改</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="您确定要删除吗?"
          @confirm="confirm(record.key)"
          @cancel="cancel"
          okText="确定"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        key: '',
        personnelName: '',
        sex: '',
        birthdy: '',
        idCard: '',
        post: '请选择',
        company: '请选择',
        positionalTitles: '',
        qualificationNo: ''
      },
      visible: false, // 显示对话框  默认不显示
      title: '',
      confirmLoading: false, // 对话框中确认按钮的加载状态
      data: [
        {
          key: '1',
          personnelName: '王一',
          sex: '男',
          birthdy: '1997-2-4',
          idCard: '44532149586211554',
          post: '施工员',
          company: '外勤',
          positionalTitles: '工人',
          qualificationNo: '456789123'
        },
        {
          key: '2',
          personnelName: '王一',
          sex: '男',
          birthdy: '1997-2-4',
          idCard: '44532149586211554',
          post: '施工员',
          company: '外勤',
          positionalTitles: '工人',
          qualificationNo: '456789123'
        },
        {
          key: '3',
          personnelName: '王一',
          sex: '男',
          birthdy: '1997-2-4',
          idCard: '44532149586211554',
          post: '施工员',
          company: '外勤',
          positionalTitles: '工人',
          qualificationNo: '456789123'
        },
        {
          key: '4',
          personnelName: '王一',
          sex: '男',
          birthdy: '1997-2-4',
          idCard: '44532149586211554',
          post: '施工员',
          company: '外勤',
          positionalTitles: '工人',
          qualificationNo: '456789123'
        }
      ],
      columns: [
        {
          dataIndex: 'personnelName',
          key: 'personnelName',
          slots: { title: 'customTitle' },
          // 作用域插槽、自定义渲染
          scopedSlots: { customRender: 'personnelName' }
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex'
        },
        {
          title: '出生年月',
          dataIndex: 'birthdy',
          key: 'birthdy'
        },
        {
          title: '身份证号码',
          dataIndex: 'idCard',
          key: 'idCard',
          ellipsis: true
        },
        {
          title: '职务',
          dataIndex: 'post',
          key: 'post'
        },
        {
          title: '单位',
          dataIndex: 'company',
          key: 'company'
        },
        {
          title: '职称',
          dataIndex: 'positionalTitles',
          key: 'positionalTitles'
        },
        {
          title: '资格证编号',
          dataIndex: 'qualificationNo',
          key: 'qualificationNo',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
          key: 'action'
        }
      ]
    }
  },
  methods: {
    // 显示对话框填写新数据
		personnelAdd () {
			this.visible = true
			this.title = '添加新数据'
    },
    // 显示对话框更新数据
    updatePersonnel (index) {
      this.visible = true
      this.title = '更新数据'
      var n = this.data.findIndex(v => index === v.key)
			var data = this.data[n]
			this.userInfo = {
        n,
        personnelName: data.personnelName,
        sex: data.sex === '男' ? 1 : 0,
        birthdy: data.birthdy,
        idCard: data.idCard,
        post: data.post === '项目管理员' ? '0' : data.post === '施工员' ? '1' : data.post === '监理员' ? '2' : '3',
        company: data.company === '单位1' ? '0' : data.company === '单位2' ? '1' : data.company === '单位3' ? '2' : '3',
        positionalTitles: data.positionalTitles,
        qualificationNo: data.qualificationNo
			}
    },
    // 确认新增或修改对话框信息
		handleOk (e) {
			// console.log(e)
			this.confirmLoading = true
			if (this.title === '更新数据') {
				// var i = this.data.findIndex(v => index === v.key)
				if (this.userInfo.personnelName) {
					var i = parseInt(this.userInfo.n)
				}
			}
			setTimeout(() => {
				this.visible = false
				this.confirmLoading = false
				var key = this.data.length + 1
				var { personnelName, sex, birthdy, idCard, post, company, positionalTitles, qualificationNo } = this.userInfo
				sex = sex === 1 ? '男' : '女'
        post = post === '项目管理员' ? '0' : post === '施工员' ? '1' : post === '监理员' ? '2' : '3'
        company = company === '单位1' ? '0' : company === '单位2' ? '1' : company === '单位3' ? '2' : '3'
				var userInfo = {
          key,
          personnelName,
          sex,
          birthdy,
          idCard,
          post,
          company,
          positionalTitles,
          qualificationNo
				}
				// console.log(userInfo)
				this.title === '添加新数据' ? this.data.push(userInfo) : this.data[i] = userInfo
				this.userInfo = {
					key: '',
          personnelName: '',
          sex: '',
          birthdy: '',
          idCard: '',
          post: '请选择',
          company: '请选择',
          positionalTitles: '',
          qualificationNo: ''
				}
			}, 1000)
			// console.log(this.fileList)
		},
    // 取消对话框
		handleCancel (e) {
			// console.log('Clicked cancel button')
			this.visible = false
			this.userInfo = {
				key: '',
        personnelName: '',
        sex: '',
        birthdy: '',
        idCard: '',
        post: '请选择',
        company: '请选择',
        positionalTitles: '',
        qualificationNo: ''
			}
			this.checkedList = []
		},
    // 确认删除此条数据
    confirm (e) {
      this.$notification.open({
        message: '删除成功',
        style: {
          'background-color': 'rgb(54, 207, 201)'
        }
      })
      var index = this.data.findIndex(v => e === v.key)
			this.data.splice(index, 1)
    },
    // 取消删除此条数据
    cancel (e) {
      this.$notification.open({
        message: '取消删除',
        style: {
          'background-color': 'rgb(54, 207, 201)'
        }
      })
    }
  }
}
</script>

<style scoped>
  .ant-btn-primary {
		margin-bottom: 20px;
	}
</style>

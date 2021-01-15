<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="单位ID">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="单位名称">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="联系人">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="联系人电话">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-button class="editable-add-btn" @click="unitAdd" type="primary">增加</a-button>

    <a-modal
      :title="title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <p class="userInfo">单位ID
        <a-input placeholder="请输入" v-model="userInfo.unitID" />
      </p>
      <p class="userInfo">单位名称
        <a-input placeholder="请输入" v-model="userInfo.unitName" />
      </p>
      <p class="userInfo">单位类别
        <a-checkbox-group :options="plainOptions" v-model="unitCategory" />
      </p>
      <p class="userInfo">资质等级编号
        <a-input placeholder="请输入" v-model="userInfo.qualificationGradeNo" />
      </p>
      <p class="userInfo">项目负责人
        <a-input placeholder="请输入" v-model="userInfo.projectLeader" />
      </p>
      <p class="userInfo">项目负责人手机号码
        <a-input placeholder="请输入" v-model="userInfo.projectLeaderNumber" />
      </p>
      <p class="userInfo">技术负责人
        <a-input placeholder="请输入" v-model="userInfo.technicalDirector" />
      </p>
      <p class="userInfo">技术负责人手机号码
        <a-input placeholder="请输入" v-model="userInfo.technicalDirectorNumber" />
      </p>
      <p class="userInfo">联系人
        <a-input placeholder="请输入" v-model="userInfo.contacts" />
      </p>
      <p class="userInfo">联系手机号码
        <a-input placeholder="请输入" v-model="userInfo.contactsNumber" />
      </p>
    </a-modal>

    <a-table :columns="columns" :dataSource="data">
      <a slot="unitName" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">
        单位名称
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="updateUnit(record.key)">修改</a>
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
        unitID: '',
        unitName: '',
        unitCategory: '',
        qualificationGradeNo: '',
        projectLeader: '',
        projectLeaderNumber: '',
        technicalDirector: '',
        technicalDirectorNumber: '',
        contacts: '',
        contactsNumber: ''
      },
      unitCategory: [], // 对话框中复选框选中列表
			plainOptions: ['业主', '监理', '施工'],
      visible: false, // 显示对话框  默认不显示
      title: '',
      confirmLoading: false, // 对话框中确认按钮的加载状态
      data: [
        {
          key: '1',
          unitID: '123',
          unitName: '单位1',
          contacts: '李四',
          contactsNumber: '15574895623'
        },
        {
          key: '2',
          unitID: '123',
          unitName: '单位2',
          contacts: '李四',
          contactsNumber: '15574895623'
        },
        {
          key: '3',
          unitID: '123',
          unitName: '单位3',
          contacts: '李四',
          contactsNumber: '15574895623'
        },
        {
          key: '4',
          unitID: '123',
          unitName: '单位4',
          contacts: '李四',
          contactsNumber: '15574895623'
        },
        {
          key: '5',
          unitID: '123',
          unitName: '单位5',
          contacts: '李四',
          contactsNumber: '15574895623'
        }
      ],
      columns: [
        {
          title: '单位ID',
          dataIndex: 'unitID',
          key: 'unitID'
        },
        {
          dataIndex: 'unitName',
          key: 'unitName',
          slots: { title: 'customTitle' },
          // 作用域插槽、自定义渲染
          scopedSlots: { customRender: 'unitName' }
        },
        // {
        //   title: '单位类别',
        //   dataIndex: 'unitCategory',
        //   key: 'unitCategory',
        //   ellipsis: true
        // },
        // {
        //   title: '资质等级编号',
        //   dataIndex: 'qualificationGradeNo',
        //   key: 'qualificationGradeNo',
        //   ellipsis: true
        // },
        // {
        //   title: '项目负责人',
        //   dataIndex: 'projectLeader',
        //   key: 'projectLeader',
        //   ellipsis: true
        // },
        // {
        //   title: '项目负责人手机号码',
        //   dataIndex: 'projectLeaderNumber',
        //   key: 'projectLeaderNumber',
        //   ellipsis: true
        // },
        // {
        //   title: '技术负责人',
        //   dataIndex: 'technicalDirector',
        //   key: 'technicalDirector',
        //   ellipsis: true
        // },
        // {
        //   title: '技术负责人手机号码',
        //   dataIndex: 'technicalDirectorNumber',
        //   key: 'technicalDirectorNumber',
        //   ellipsis: true
        // },
        {
          title: '联系人',
          dataIndex: 'contacts',
          key: 'contacts',
          ellipsis: true
        },
        {
          title: '联系手机号码',
          dataIndex: 'contactsNumber',
          key: 'contactsNumber',
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
		unitAdd () {
			this.visible = true
			this.title = '添加新数据'
    },
    // 显示对话框更新数据
    updateUnit (index) {
      this.visible = true
      this.title = '更新数据'
      var n = this.data.findIndex(v => index === v.key)
      var data = this.data[n]
      this.unitCategory = data.unitCategory.split(' ')
			if (this.unitCategory.length > 0) {
				this.indeterminate = true
			}
			this.userInfo = {
        n,
        unitID: data.unitID,
        unitName: data.unitName,
        // unitCategory: data.unitCategory,
        qualificationGradeNo: data.qualificationGradeNo,
        projectLeader: data.projectLeader,
        projectLeaderNumber: data.projectLeaderNumber,
        technicalDirector: data.technicalDirector,
        technicalDirectorNumber: data.technicalDirectorNumber,
        contacts: data.contacts,
        contactsNumber: data.contactsNumber
			}
    },
    // 确认新增或修改对话框信息
		handleOk (e) {
			// console.log(e)
			this.confirmLoading = true
			if (this.title === '更新数据') {
				// var i = this.data.findIndex(v => index === v.key)
				if (this.userInfo.unitName) {
					var i = parseInt(this.userInfo.n)
				}
			}
			setTimeout(() => {
				this.visible = false
				this.confirmLoading = false
				var key = this.data.length + 1
				var { unitID, unitName, qualificationGradeNo, projectLeader, projectLeaderNumber, technicalDirector, technicalDirectorNumber, contacts, contactsNumber } = this.userInfo
				var unitCategory = this.unitCategory.join(' ')
				var userInfo = {
          key,
          unitID,
          unitName,
          unitCategory,
          qualificationGradeNo,
          projectLeader,
          projectLeaderNumber,
          technicalDirector,
          technicalDirectorNumber,
          contacts,
          contactsNumber
				}
				// console.log(userInfo)
        this.title === '添加新数据' ? this.data.push(userInfo) : this.data[i] = userInfo
        this.checkedList = []
				this.userInfo = {
					key: '',
          unitID: '',
          unitName: '',
          unitCategory: '',
          qualificationGradeNo: '',
          projectLeader: '',
          projectLeaderNumber: '',
          technicalDirector: '',
          technicalDirectorNumber: '',
          contacts: '',
          contactsNumber: ''
				}
			}, 1000)
			console.log(this.fileList)
		},
    // 取消对话框
		handleCancel (e) {
			console.log('Clicked cancel button')
			this.visible = false
			this.userInfo = {
				key: '',
        unitID: '',
        unitName: '',
        unitCategory: '',
        qualificationGradeNo: '',
        projectLeader: '',
        projectLeaderNumber: '',
        technicalDirector: '',
        technicalDirectorNumber: '',
        contacts: '',
        contactsNumber: ''
			}
			this.unitCategory = []
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
  /* .ant-btn-primary {
		margin-bottom: 20px;
	} */
</style>

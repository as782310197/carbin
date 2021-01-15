<template>
  <div>
    <a-button type="primary" @click="showModal">添加数据</a-button>
    <a-modal
      :title="title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <p class="userInfo">姓名</p>
      <a-input placeholder="请输入姓名" v-model="userInfo.name" />
      <p class="userInfo">性别</p>
      <a-radio-group name="radioGroup" :defaultValue="userInfo.sex" v-model="userInfo.sex">
        <a-radio :value="1">男</a-radio>
        <a-radio :value="0">女</a-radio>
      </a-radio-group>
      <p class="userInfo">职能</p>
      <a-select :defaultValue="userInfo.abc" style="width: 120px" @change="handleChange" v-model="userInfo.abc">
        <a-select-option value="0">职员</a-select-option>
        <a-select-option value="1">人事</a-select-option>
        <a-select-option value="2">经理</a-select-option>
      </a-select>
      <p class="userInfo">水果</p>
      <div :style="{ borderBottom: '1px solid #E9E9E9', marginBottom: '10px' }">
        <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">
          全选
        </a-checkbox>
      </div>
      <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
      <p class="userInfo">上传图片</p>
      <a-upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        :fileList="fileList"
        @preview="imgHandlePreview"
        @change="imgHandleChange"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">上传图片</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="imgHandleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-modal>
    <a-table :columns="columns" :dataSource="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">
        <a-icon type="smile-o" />姓名
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="updateShowModal(record.key)">修改</a>
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
function getBase64 (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
export default {
    data () {
        return {
				userInfo: {
					key: '',
					name: '',
					sex: 1,
					fruits: '',
					abc: '0'
				},
				checkedList: [], // 对话框中复选框选中列表
				plainOptions: ['苹果', '橘子', '菠萝', '百香果', '葡萄', '芒果'],
				indeterminate: false, // 对话框中复选框选中列表中有无选中
				checkAll: false, // 全选
				visible: false, // 显示对话框  默认不显示
				confirmLoading: false, // 对话框中确认按钮的加载状态
				previewVisible: false,
				previewImage: '',
				title: '', // 对话框的标题
				fileList: [],
            data: [
                {
                    key: '1',
                    name: 'John Brown',
                    sex: '男',
                    fruits: '葡萄 芒果',
										abc: '职员'
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    sex: '男',
                    fruits: '苹果 百香果',
                    abc: '经理'
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    sex: '男',
                    fruits: '橘子',
                    abc: '人事'
                },
                {
                    key: '4',
                    name: 'John Brown',
                    sex: '男',
                    fruits: '葡萄 芒果',
                    abc: '职员'
                },
                {
                    key: '5',
                    name: 'Jim Green',
                    sex: '男',
                    fruits: '苹果 百香果',
                    abc: '经理'
                },
                {
                    key: '6',
                    name: 'Joe Black',
                    sex: '男',
                    fruits: '橘子',
                    abc: '职员'
                },
                {
                    key: '7',
                    name: 'John Brown',
                    sex: '男',
                    fruits: '葡萄 芒果',
                    abc: '人事'
                }
            ],
            columns: [
                {
                    dataIndex: 'name',
                    key: 'name',
                    slots: { title: 'customTitle' },
                    scopedSlots: { customRender: 'name' }
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex'
                },
                {
                    title: '水果',
                    dataIndex: 'fruits',
                    key: 'fruits'
                },
                {
                    title: '职位',
                    key: 'abc',
                    dataIndex: 'abc'
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' }
								}
            ]
        }
    },
    methods: {
			// 显示对话框填写新数据
			showModal () {
				this.visible = true
				this.title = '添加新数据'
			},
			// 显示对话框更新数据
			updateShowModal (index) {
				this.visible = true
				this.title = '更新数据'
				// console.log(index)
				var n = this.data.findIndex(v => index === v.key)
				var data = this.data[n]
				this.checkedList = data.fruits.split(' ')
				if (this.checkedList.length > 0) {
					this.indeterminate = true
				}
				this.userInfo = {
					n,
					name: data.name,
					sex: data.sex === '男' ? 1 : 0,
					abc: data.abc === '职员' ? '0' : data.abc === '人事' ? '1' : '2'
				}
			},
			// 确认新增或修改对话框信息
			handleOk (e) {
				// console.log(e)
				this.confirmLoading = true
				if (this.title === '更新数据') {
					// var i = this.data.findIndex(v => index === v.key)
					if (this.userInfo.name) {
						var i = parseInt(this.userInfo.n)
					}
				}
				setTimeout(() => {
					this.visible = false
					this.confirmLoading = false
					var key = this.data.length + 1
					var { name, sex, abc } = this.userInfo
					var fruits = this.checkedList.join(' ')
					sex = sex === 1 ? '男' : '女'
					abc = abc === '0' ? '职员' : abc === '1' ? '人事' : '经理'
					var userInfo = {
						key,
						name,
						sex,
						fruits,
						abc
					}
					// console.log(userInfo)
					this.title === '添加新数据' ? this.data.push(userInfo) : this.data[i] = userInfo
					this.checkedList = []
					this.userInfo = {
						key: '',
						name: '',
						sex: 1,
						fruits: '',
						abc: '0'
					}
				}, 1000)
			},
			// 取消对话框
			handleCancel (e) {
				this.visible = false
				this.userInfo = {
					key: '',
					name: '',
					sex: 1,
					fruits: '',
					abc: '0'
				}
				this.checkedList = []
			},
			// 对话框下拉列表
			handleChange (value) {
			console.log(`selected ${value}`)
      },
			// 对话框里复选框的单独选择状态
			onChange () {
				this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.plainOptions.length
				this.checkAll = this.checkedList.length === this.plainOptions.length
			},
			// 对话框里复选框的全选
			onCheckAllChange (e) {
				Object.assign(this, {
					checkedList: e.target.checked ? this.plainOptions : [],
					indeterminate: false,
					checkAll: e.target.checked
				})
			},
			// 上传图片
			imgHandleCancel () {
        this.previewVisible = false
      },
      async imgHandlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
      },
      imgHandleChange ({ fileList }) {
        this.fileList = fileList
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
	.userInfo {
		padding: 10px 0;
		margin: 0;
		font-size: 16px;
		font-weight: 600;
	}
</style>

<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <p class="userInfo">姓名</p>
    <a-input placeholder="请输入姓名" />
    <p class="userInfo">性别</p>
    <a-radio-group name="radioGroup" :defaultValue="1">
      <a-radio :value="1">男</a-radio>
      <a-radio :value="2">女</a-radio>
    </a-radio-group>
    <p class="userInfo">职能</p>
    <a-select defaultValue="职员" style="width: 120px" @change="handleChange">
      <a-select-option value="经理">经理</a-select-option>
      <a-select-option value="人事">人事</a-select-option>
      <a-select-option value="职员">职员</a-select-option>
    </a-select>
    <p class="userInfo">水果</p>
    <div :style="{ borderBottom: '1px solid #E9E9E9' }">
      <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全选</a-checkbox>
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
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="imgHandleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-modal>
</template>
<script type="text/javascript">
function getBase64 (file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = error => reject(error)
	})
}
export default {
		name: 'Popover',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			}
		},
    data () {
        return {
            checkedList: [],
            plainOptions: ['苹果', '香蕉', '橘子', '菠萝', '百香果'],
            indeterminate: false,
            checkAll: false,
            confirmLoading: false,
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    },
    methods: {
        // 确认新增或修改对话框信息
        handleOk (e) {
            // console.log(e)
            this.confirmLoading = true
            setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
            }, 2000)
        },
        // 取消对话框
        handleCancel (e) {
            console.log('Clicked cancel button')
						this.visible = false
						this.$emit('visible1', this.visible)
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
        }
    }
}
</script>
<style scoped>
.userInfo {
	padding: 10px 0;
	margin: 0;
	font-size: 16px;
	font-weight: 600;
}
</style>

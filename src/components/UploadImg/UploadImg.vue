<template>
  <div class="upload-img">
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      :fileList="fileList"
      @preview="imgHandlePreview"
      @change="imgHandleChange"
    >
      <div v-if="fileList.length < 3">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="imgHandleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
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
  name: 'UploadImg',
  data () {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
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
.upload-img{
  float: left;
}
</style>

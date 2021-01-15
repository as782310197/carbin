<template>
  <div class="upload-img">
    <!-- action="http://192.168.50.251:8088/upload/singleFileUpload" -->
    <a-upload
      :action="`${ baseURL }/upload/singleFileUpload`"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :remove="handleRemove"
      @preview="imgHandlePreview"
      @change="imgHandleChange"
    >
      <div v-if="fileList.length < 1">
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
import { baseUrl } from '@/utils/util.js'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    console.log(file)
    const reader = new FileReader()
    console.log(reader)
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result) // 读取成功
    reader.onerror = error => reject(error) // 读取出错
  })
}
export default {
  name: 'UploadImgGroup',
  props: {
    imageInfo: {
      type: Array,
      default: Array
    }
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: this.imageInfo.length === 0 ? [] : this.imageInfo
    }
  },
  watch: {
    'imageInfo' (n) {
      this.fileList = n
    }
  },
  computed: {
    baseURL () {
      return baseUrl()
    }
  },
  methods: {
    // 删除一张图片的回调
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.$emit('ImageFun', this.fileList)
    },
    // 关闭图片预览
    imgHandleCancel () {
      this.previewVisible = false
    },
    // 预览图片
    async imgHandlePreview (file) {
      console.log(file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    // 增加一张图片的回调
    imgHandleChange (info) {
      // console.log(info)
      this.fileList = info.fileList
      if (info.file.status === 'done') {
        // console.log(`${info.file.name} file uploaded successfully.`)
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
        this.$emit('ImageFun', this.fileList)
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`)
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

<style scoped>
/* .upload-img{
  float: left;
} */
</style>

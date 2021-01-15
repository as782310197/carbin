<template>
  <a-card :bordered="false">
    <a-card title="基本信息" size="small">
      <a-form
        :form="form"
        @submit="handleSubmit"
        :label-col="{ span: 9 }"
        :wrapper-col="{ span: 15 }"
      >
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="任务ID">
              <span class="ant-form-text">
                {{ taskInfo.id }}
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="衬砌名称">
              <span class="ant-form-text">
                {{ taskInfo.constructionSectionName }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="衬砌长度">
              <span class="ant-form-text">
                {{ taskInfo.constructionLength }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="监测等级">
              <span class="ant-form-text">
                {{ taskInfo.levelName }}
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="所在工点">
              <span class="ant-form-text">
                {{ taskInfo.constructionPointName }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="所属项目">
              <span class="ant-form-text">
                {{ taskInfo.projectName }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="状态">
              <span class="ant-form-text">
                {{ taskInfo.statusName }}
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="所属施工标">
              <span class="ant-form-text">
                {{ taskInfo.constructionSectionName }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item label="施工单位">
              <span class="ant-form-text">
                {{ taskInfo.constructionSectionEnterprise }}
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="所属监理标">
              <span class="ant-form-text">
                {{ taskInfo.supervisionSectionName }}
              </span>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item label="监理单位">
              <span class="ant-form-text">
                {{ taskInfo.supervisionSectionEnterprise }}
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="指定施工员">
              <span class="ant-form-text">
                {{ taskInfo.constructorName }}
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 上传图片 -->
        <a-row v-for="(item, index) of picList" :key="index" :gutter="24">
          <a-col>
            <a-form-item
              :label="item.name"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
            >
              <upload-img-group :v-decorator="[item.typeName]" :ref="item.typeName" @ImageFun="getImageList" :imageInfo="item.fileLists"></upload-img-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="施工员备注"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-textarea
                v-decorator="['constructorsRemarks']"
                placeholder="请输入"
                :rows="4"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="创建任务时间">
              <label>{{ taskInfo.createTime }}</label>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item label="指定质检人员">
              <label>{{ taskInfo.qualityInspectorName }}</label>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="taskInfo.taskRemark.rejectRemark && taskInfo.taskRemark.rejectRemark.length > 0">
          <a-col :span="1"></a-col>
          <a-col :span="19">
            <a-table :columns="rejectColumn" :data-source="rejectData" bordered size="small">
              <!-- <template slot="name" slot-scope="text">
                <a>{{ text }}</a>
              </template> -->
            </a-table>
          </a-col>
          <a-col :span="4"></a-col>
        </a-row>
        <a-divider />
        <a-form-item :wrapper-col="{ span: 24 }" style="text-align: center;">
          <a-button type="primary" html-type="submit" @click="handleSubmit" :disabled="submitDisabled">
            提交审核</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-card>
</template>

<script>
import UploadImgGroup from '@/components/UploadImgGroup'
import { submitAuditTask } from '@/api/task'
export default {
  name: 'InPreparation',
  components: {
    UploadImgGroup
  },
  props: {
    taskInfo: {
      type: Object,
      default: Function
    }
  },
  data () {
    return {
      submitDisabled: false,
      rejectColumn: [
        {
          title: '驳回时间',
          dataIndex: 'createTime'
        },
        {
          title: '驳回信息',
          dataIndex: 'remark'
        }
      ],
      rejectData: this.taskInfo.taskRemark.rejectRemark ? this.taskInfo.taskRemark.rejectRemark.map((v, i) => {
        return {
          key: i,
          createTime: v.createTime,
          remark: v.remark
        }
      }) : [],
      // previewVisible: false,
      // previewImage: '',
      fileList: [],
      form: this.$form.createForm(this), // 基本信息
      picList: [
        { name: '防水层影像', typeName: 'waterproofLayers', fileLists: this.taskInfo.imageList.waterproofLayers.length > 0 ? this.taskInfo.imageList.waterproofLayers : [] },
        { name: '钢筋检查影像', typeName: 'rebars', fileLists: this.taskInfo.imageList.rebars.length > 0 ? this.taskInfo.imageList.rebars : [] },
        { name: '台车检查影像', typeName: 'trolleys', fileLists: this.taskInfo.imageList.trolleys.length > 0 ? this.taskInfo.imageList.trolleys : [] },
        { name: '传感器安装影像', typeName: 'sensors', fileLists: this.taskInfo.imageList.sensors.length > 0 ? this.taskInfo.imageList.sensors : [] },
        { name: '工控机状态影像', typeName: 'ipcs', fileLists: this.taskInfo.imageList.ipcs.length > 0 ? this.taskInfo.imageList.ipcs : [] },
        { name: '洞口路由状态影像', typeName: 'routes', fileLists: this.taskInfo.imageList.routes.length > 0 ? this.taskInfo.imageList.routes : [] },
        { name: '施工员就位情况影像', typeName: 'constructors', fileLists: this.taskInfo.imageList.constructors.length > 0 ? this.taskInfo.imageList.constructors : [] }
      ],
      updateData: [], // 监听子组件上传图片时响应
      // 存储全部影像图片
      imageInfo: {
        // this.taskInfo.attachment
        waterproofLayers: this.taskInfo.attachment.waterproofLayers ? this.taskInfo.attachment.waterproofLayers : [],
        rebars: this.taskInfo.attachment.rebars ? this.taskInfo.attachment.rebars : [],
        trolleys: this.taskInfo.attachment.trolleys ? this.taskInfo.attachment.trolleys : [],
        sensors: this.taskInfo.attachment.sensors ? this.taskInfo.attachment.sensors : [],
        ipcs: this.taskInfo.attachment.ipcs ? this.taskInfo.attachment.ipcs : [],
        routes: this.taskInfo.attachment.routes ? this.taskInfo.attachment.routes : [],
        constructors: this.taskInfo.attachment.constructors ? this.taskInfo.attachment.constructors : []
      }
    }
  },
  methods: {
    // 提交审核按钮
    handleSubmit (e) {
      console.log(this.imageInfo)
      e.preventDefault()
      this.submitDisabled = true
      for (var i in this.imageInfo) {
        if (this.imageInfo[i].length === 0) {
          if (i === 'waterproofLayers') {
            this.$message.warning('防水层影像至少需要上传一张图片')
            this.submitDisabled = false
          } else if (i === 'rebars') {
            this.$message.warning('钢筋检查影像至少需要上传一张图片')
            this.submitDisabled = false
          } else if (i === 'trolleys') {
            this.$message.warning('台车检查影像至少需要上传一张图片')
            this.submitDisabled = false
          } else if (i === 'sensors') {
            this.$message.warning('传感器安装影像至少需要上传一张图片')
            this.submitDisabled = false
          } else if (i === 'ipcs') {
            this.$message.warning('工控机状态影像至少需要上传一张图片')
            this.submitDisabled = false
          } else if (i === 'routes') {
            this.$message.warning('洞口路由状态影像至少需要上传一张图片')
            this.submitDisabled = false
          } else if (i === 'constructors') {
            this.$message.warning('施工员就位情况影像至少需要上传一张图片')
            this.submitDisabled = false
          }
          this.submitDisabled = false
          return
        }
      }
      var param = {
        id: this.taskInfo.id,
        attachment: this.imageInfo
      }
      console.log(param)
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.submitDisabled = false
          param.memo = values.constructorsRemarks
        }
      })
      if (!param.memo) {
        this.$message.warning('备注不能为空')
        this.submitDisabled = false
        return
      }
      submitAuditTask(param).then(res => {
        if (res.code === 1) {
          this.$message.success('任务提交成功')
          this.submitDisabled = false
        } else {
          this.$message.error(res.message)
          this.submitDisabled = false
        }
        // 传参给父组件，关闭当前抽屉
        this.$emit('visibleReadClose', false)
      })
    },
    // 获取图片地址
    getImageList (data) {
      console.log(data)
      this.updateData = data
      // 子组件上传图片时响应回数据
      console.log(this.$refs)
      var list = {}
      for (var i in this.$refs) {
        list[i] = this.$refs[i][0].fileList
      }
      console.log(list)
      for (var j in list) {
        if (list[j].length > 0) {
          list[j].forEach((v, k) => {
            if (v.url) {
              this.imageInfo[j][k] = v.url
            } else {
              this.imageInfo[j][k] = v.response.url
            }
          })
        } else {
          this.imageInfo[j] = []
        }
      }
      console.log(this.imageInfo)
      console.log(this.picList)
      // console.log(`列表图片:` + this.picList)
    }
  },
  watch: {
    // 监听taskInfo变化时页面数据刷新
    'taskInfo': {
      handler: function (newValue, oldValue) {
        this.picList = [
          { name: '防水层影像', typeName: 'waterproofLayers', fileLists: newValue.imageList.waterproofLayers.length > 0 ? newValue.imageList.waterproofLayers : [] },
          { name: '钢筋检查影像', typeName: 'rebars', fileLists: newValue.imageList.rebars.length > 0 ? newValue.imageList.rebars : [] },
          { name: '台车检查影像', typeName: 'trolleys', fileLists: newValue.imageList.trolleys.length > 0 ? newValue.imageList.trolleys : [] },
          { name: '传感器安装影像', typeName: 'sensors', fileLists: newValue.imageList.sensors.length > 0 ? newValue.imageList.sensors : [] },
          { name: '工控机状态影像', typeName: 'ipcs', fileLists: newValue.imageList.ipcs.length > 0 ? newValue.imageList.ipcs : [] },
          { name: '洞口路由状态影像', typeName: 'routes', fileLists: newValue.imageList.routes.length > 0 ? newValue.imageList.routes : [] },
          { name: '施工员就位情况影像', typeName: 'constructors', fileLists: newValue.imageList.constructors.length > 0 ? newValue.imageList.constructors : [] }
        ]
        this.rejectData = this.taskInfo.taskRemark.rejectRemark ? this.taskInfo.taskRemark.rejectRemark.map((v, i) => {
          return {
            key: i,
            createTime: v.createTime,
            remark: v.remark
          }
        }) : []
        this.form.resetFields()
        // console.log(this.picList)
        // console.log(this.$refs)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  .imgBox{
    img{
      width: 102px;
      height: 102px;
      margin-right: 20px;
    }
  }
</style>

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
        <!-- 图片展示区 -->
        <a-row v-for="(item, index) of picList" :key="index">
          <a-col>
            <a-form-item :label="item.name" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
              <!-- <div class="imgBox">
                <img :src="pic" v-for="(pic, i) of item.picUrl" :key="i">
              </div> -->
              <viewer class="imgBox" :images="item.picUrl">
                <img
                  v-for="(pic, i) of item.picUrl"
                  :src="pic"
                  :key="i"
                >
              </viewer>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 质检员影像 -->
        <a-row>
          <a-col>
            <a-form-item label="质检员就位情况影像" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
              <upload-img-group ref="qualityInspectors" @ImageFun="getImageList" :imageInfo="displayPic"></upload-img-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="施工员备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <label>{{ taskInfo.taskRemark.constructionRemark.length !== 0 ? taskInfo.taskRemark.constructionRemark[0].remark : '' }}</label>
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
      </a-form>
    </a-card>
    <a-card title="质检信息" size="small" style="margin-top:30px;">
      <a-form
        :form="testingForm"
        @submit="handlePass"
        :label-col="{ span: 9 }"
        :wrapper-col="{ span: 15 }"
      >
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="质检员" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <label>{{ taskInfo.qualityInspectorName }}</label>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="质检员备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <a-textarea
                v-decorator="['qualityInspectionRemarks']"
                placeholder="请输入"
                :rows="4"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- <a-form-item label="质检完成时间">
              <label>2020.04.01 15：23：23</label>
            </a-form-item> -->
          </a-col>
          <a-col :span="16">
            <a-form-item label="指定审核人员">
              <label>{{ taskInfo.supervisorName }}</label>
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
          <div>
            <a-button type="danger" :style="{ marginRight: '20px' }" @click="handleReject" :disabled="rejectDisable">
              驳回
            </a-button>
            <a-button type="primary" html-type="submit" @click="handlePass" :disabled="passDisable">通过</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </a-card>
</template>

<script>
import UploadImgGroup from '@/components/UploadImgGroup'
import { auditTask, rejectTask } from '@/api/task'
export default {
  name: 'SelfChecking',
  components: {
    UploadImgGroup
  },
  data () {
    return {
      rejectDisable: false,
      passDisable: false,
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
      qualityInspectors: this.taskInfo.attachment.qualityInspectors ? this.taskInfo.attachment.qualityInspectors : [],
      allPictureList: {},
      form: this.$form.createForm(this), // 基本信息
      testingForm: this.$form.createForm(this), // 质检信息
      picList: [
        { name: '防水层影像', typeName: 'waterproofLayers', picUrl: (this.taskInfo.attachment.waterproofLayers ? this.taskInfo.attachment.waterproofLayers : []) },
        { name: '钢筋检查影像', typeName: 'rebars', picUrl: (this.taskInfo.attachment.rebars ? this.taskInfo.attachment.rebars : []) },
        { name: '台车检查影像', typeName: 'trolleys', picUrl: (this.taskInfo.attachment.trolleys ? this.taskInfo.attachment.trolleys : []) },
        { name: '传感器安装影像', typeName: 'sensors', picUrl: (this.taskInfo.attachment.sensors ? this.taskInfo.attachment.sensors : []) },
        { name: '工控机状态影像', typeName: 'ipcs', picUrl: (this.taskInfo.attachment.ipcs ? this.taskInfo.attachment.ipcs : []) },
        { name: '洞口路由状态影像', typeName: 'routes', picUrl: (this.taskInfo.attachment.routes ? this.taskInfo.attachment.routes : []) },
        { name: '施工员就位情况影像', typeName: 'constructors', picUrl: (this.taskInfo.attachment.constructors ? this.taskInfo.attachment.constructors : []) }
      ],
      displayPic: this.taskInfo.imageList.qualityInspectors.length > 0 ? this.taskInfo.imageList.qualityInspectors : []
    }
  },
  props: {
    taskInfo: {
      type: Object,
      default: Object
    }
  },
  watch: {
    'taskInfo': {
      handler: function (newValue, oldValue) {
        this.picList = [
          { name: '防水层影像', typeName: 'waterproofLayers', picUrl: (this.taskInfo.attachment.waterproofLayers ? this.taskInfo.attachment.waterproofLayers : []) },
          { name: '钢筋检查影像', typeName: 'rebars', picUrl: (this.taskInfo.attachment.rebars ? this.taskInfo.attachment.rebars : []) },
          { name: '台车检查影像', typeName: 'trolleys', picUrl: (this.taskInfo.attachment.trolleys ? this.taskInfo.attachment.trolleys : []) },
          { name: '传感器安装影像', typeName: 'sensors', picUrl: (this.taskInfo.attachment.sensors ? this.taskInfo.attachment.sensors : []) },
          { name: '工控机状态影像', typeName: 'ipcs', picUrl: (this.taskInfo.attachment.ipcs ? this.taskInfo.attachment.ipcs : []) },
          { name: '洞口路由状态影像', typeName: 'routes', picUrl: (this.taskInfo.attachment.routes ? this.taskInfo.attachment.routes : []) },
          { name: '施工员就位情况影像', typeName: 'constructors', picUrl: (this.taskInfo.attachment.constructors ? this.taskInfo.attachment.constructors : []) }
        ]
        this.displayPic = this.taskInfo.imageList.qualityInspectors.length > 0 ? this.taskInfo.imageList.qualityInspectors : []
        this.rejectData = this.taskInfo.taskRemark.rejectRemark ? this.taskInfo.taskRemark.rejectRemark.map((v, i) => {
          return {
            key: i,
            createTime: v.createTime,
            remark: v.remark
          }
        }) : []
        this.form.resetFields()
        this.testingForm.resetFields()
      },
      deep: true
    }
  },
  methods: {
    handleSubmit () {},
    // 通过按钮
    handlePass (e) {
      e.preventDefault()
      this.passDisable = true
      console.log(this.taskInfo)
      if (this.qualityInspectors) {
        if (this.qualityInspectors.length === 0) {
          this.$message.warning('质检员影像至少需要上传一张图片')
          this.passDisable = false
          return
        }
      } else {
        this.$message.warning('质检员影像至少需要上传一张图片')
        this.passDisable = false
        return
      }
      this.allPictureList = JSON.parse(JSON.stringify(this.taskInfo.attachment))
      this.allPictureList.qualityInspectors = this.qualityInspectors
      var param = {
        id: this.taskInfo.id,
        attachment: this.allPictureList
      }
      this.testingForm.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.passDisable = false
          param.memo = values.qualityInspectionRemarks
        }
      })
      if (!param.memo) {
        this.$message.warning('备注不能为空')
        this.passDisable = false
        return
      }
      auditTask(param).then(res => {
        if (res.code === 1) {
          this.$message.success('审核成功')
          this.passDisable = false
          this.$emit('visibleReadClose', false)
        } else {
          this.$message.error('审核失败' + res.message)
          this.passDisable = false
        }
      })
    },
    // 驳回按钮
    handleReject (e) {
      e.preventDefault()
      this.rejectDisable = true
      var param = {
        id: this.taskInfo.id
      }
      this.testingForm.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.rejectDisable = false
          param.memo = values.qualityInspectionRemarks
        }
      })
      if (!param.memo) {
        this.$message.warning('备注不能为空')
        this.rejectDisable = false
        return
      }
      rejectTask(param).then(res => {
        if (res.code === 1) {
          this.$message.success('驳回成功')
          this.rejectDisable = false
          this.$emit('visibleReadClose', false)
        } else {
          this.$message.error('驳回失败' + res.message)
          this.rejectDisable = false
        }
        // this.$message.success('驳回成功')
        // this.rejectDisable = false
        // this.$emit('visibleReadClose', false)
      })
    },
    // 获取图片地址
    getImageList (data) {
      console.log(data)
      var list = []
      if (data) {
        data.forEach(v => {
          if (v.url) {
            list.push(v.url)
          } else {
            list.push(v.response.url)
          }
        })
      }
      this.qualityInspectors = list
      console.log(this.qualityInspectors)
      // this.taskInfo.attachment.qualityInspectors = this.qualityInspectors
    }
  }
}
</script>

<style lang="less" scoped>
.imgBox{
  img{
    width: 102px;
    // height: 102px;
    margin-right: 20px;
  }
}
</style>

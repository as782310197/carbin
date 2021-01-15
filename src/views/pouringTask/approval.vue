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
        <a-row v-for="(item, index) of picList" :key="index" :gutter="24">
          <a-col>
            <a-form-item :label="item.name" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
              <!-- <div class="imgBox">
                <img :src="pic" v-show="pic" v-for="(pic, i) of item.picUrl" :key="i">
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
        <!-- 监理员影像 -->
        <a-row :gutter="24">
          <a-col>
            <a-form-item label="监理员就位情况影像" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
              <upload-img-group ref="supervisors" @ImageFun="getImageList" :imageInfo="displayPic"></upload-img-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="施工员备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <label>这是施工员备注信息。</label>
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
              <label>{{ taskInfo.taskRemark.qualityInspectorRemark.length !== 0 ? taskInfo.taskRemark.qualityInspectorRemark[0].remark : '' }}</label>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="质检完成时间">
              <label>{{ taskInfo.approvalTime }}</label>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item label="指定审核人员">
              <label>{{ taskInfo.supervisorName }}</label>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card title="审批信息" size="small" style="margin-top:30px;">
      <a-form
        :form="approvalForm"
        @submit="handlePass"
        :label-col="{ span: 9 }"
        :wrapper-col="{ span: 15 }"
      >
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="监理员" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <label>{{ taskInfo.supervisorName }}</label>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="监理员备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <a-textarea
                v-decorator="['qualityInspectionRemarks']"
                placeholder="请输入"
                :rows="4"
              />
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
import { approveTask, rejectTask } from '@/api/task'
export default {
  name: 'Approval',
  components: {
    UploadImgGroup
  },
  data () {
    return {
      rejectDisable: false,
      passDisable: false,
      supervisors: this.taskInfo.attachment.supervisors ? this.taskInfo.attachment.supervisors : [], // 监理员图片
      form: this.$form.createForm(this), // 基本信息
      testingForm: this.$form.createForm(this), // 质检信息
      approvalForm: this.$form.createForm(this), // 质检信息
      allPictureList: {}, // 全部图片
      picList: [
        { name: '防水层影像', typeName: 'waterproofLayers', picUrl: (this.taskInfo.attachment.waterproofLayers ? this.taskInfo.attachment.waterproofLayers : []) },
        { name: '钢筋检查影像', typeName: 'rebars', picUrl: (this.taskInfo.attachment.rebars ? this.taskInfo.attachment.rebars : []) },
        { name: '台车检查影像', typeName: 'trolleys', picUrl: (this.taskInfo.attachment.trolleys ? this.taskInfo.attachment.trolleys : []) },
        { name: '传感器安装影像', typeName: 'sensors', picUrl: (this.taskInfo.attachment.sensors ? this.taskInfo.attachment.sensors : []) },
        { name: '工控机状态影像', typeName: 'ipcs', picUrl: (this.taskInfo.attachment.ipcs ? this.taskInfo.attachment.ipcs : []) },
        { name: '洞口路由状态影像', typeName: 'routes', picUrl: (this.taskInfo.attachment.routes ? this.taskInfo.attachment.routes : []) },
        { name: '施工员就位情况影像', typeName: 'constructors', picUrl: (this.taskInfo.attachment.constructors ? this.taskInfo.attachment.constructors : []) },
        { name: '质检员就位情况影像', typeName: 'qualityInspectors', picUrl: (this.taskInfo.attachment.qualityInspectors ? this.taskInfo.attachment.qualityInspectors : []) }
      ],
      displayPic: this.taskInfo.imageList.supervisors.length > 0 ? this.taskInfo.imageList.supervisors : [],
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
      }) : []
    }
  },
  props: {
    taskInfo: {
      type: Object,
      default: Function
    }
  },
  watch: {
    'taskInfo': {
      handler (n, o) {
        this.picList = [
          { name: '防水层影像', typeName: 'waterproofLayers', picUrl: (this.taskInfo.attachment.waterproofLayers ? this.taskInfo.attachment.waterproofLayers : []) },
          { name: '钢筋检查影像', typeName: 'rebars', picUrl: (this.taskInfo.attachment.rebars ? this.taskInfo.attachment.rebars : []) },
          { name: '台车检查影像', typeName: 'trolleys', picUrl: (this.taskInfo.attachment.trolleys ? this.taskInfo.attachment.trolleys : []) },
          { name: '传感器安装影像', typeName: 'sensors', picUrl: (this.taskInfo.attachment.sensors ? this.taskInfo.attachment.sensors : []) },
          { name: '工控机状态影像', typeName: 'ipcs', picUrl: (this.taskInfo.attachment.ipcs ? this.taskInfo.attachment.ipcs : []) },
          { name: '洞口路由状态影像', typeName: 'routes', picUrl: (this.taskInfo.attachment.routes ? this.taskInfo.attachment.routes : []) },
          { name: '施工员就位情况影像', typeName: 'constructors', picUrl: (this.taskInfo.attachment.constructors ? this.taskInfo.attachment.constructors : []) },
          { name: '质检员就位情况影像', typeName: 'qualityInspectors', picUrl: (this.taskInfo.attachment.qualityInspectors ? this.taskInfo.attachment.qualityInspectors : []) }
        ]
        this.displayPic = this.taskInfo.imageList.supervisors.length > 0 ? this.taskInfo.imageList.supervisors : []
        this.rejectData = this.taskInfo.taskRemark.rejectRemark ? this.taskInfo.taskRemark.rejectRemark.map((v, i) => {
          return {
            key: i,
            createTime: v.createTime,
            remark: v.remark
          }
        }) : []
        this.form.resetFields()
        this.testingForm.resetFields()
        this.approvalForm.resetFields()
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
      if (this.supervisors) {
        if (this.supervisors.length === 0) {
          this.$message.warning('监理员影像至少需要上传一张图片')
          this.passDisable = false
          return
        }
      } else {
        this.$message.warning('监理员影像至少需要上传一张图片')
        this.passDisable = false
        return
      }
      this.allPictureList = this.taskInfo.attachment
      this.allPictureList.supervisors = this.supervisors
      var param = {
        id: this.taskInfo.id,
        attachment: this.allPictureList
      }
      this.approvalForm.validateFields((err, values) => {
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
      approveTask(param).then(res => {
        if (res.code === 1) {
          this.$message.success('审批成功')
          this.passDisable = false
          this.$emit('visibleReadClose', false)
        } else {
          this.$message.success('审批失败')
          this.passDisable = true
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
      this.approvalForm.validateFields((err, values) => {
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
      this.supervisors = list
      // this.taskInfo.attachment.supervisors = this.supervisors
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

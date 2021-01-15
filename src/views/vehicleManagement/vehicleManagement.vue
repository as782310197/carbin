<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="车主姓名">
              <a-input
                v-decorator="['carOwner']"
                placeholder="请输入车主姓名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="车辆品牌">
              <a-input
                v-decorator="['brand']"
                placeholder="请输入车辆品牌"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="状态">
              <a-select
                v-decorator="['status']"
                placeholder="请选择状态"
              >
                <a-select-option value="0">车辆信息未上传</a-select-option>
                <a-select-option value="1">待审核</a-select-option>
                <a-select-option value="2">已审核</a-select-option>
                <a-select-option value="3">审核不通过</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="开始时间">
              <a-date-picker
                v-decorator="['startTime']"
                placeholder="请选择开始时间"
                style="width: 100%;"
                @change="startTimeChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="结束时间">
              <a-date-picker
                v-decorator="['endTime']"
                placeholder="请选择结束时间"
                style="width: 100%;"
                @change="endTimeChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 按钮部分 -->
    <!-- <div class="button_div">
      <a-button type="primary" @click="handleAdd">添加</a-button>
    </div> -->
    <!-- 表格部分 -->
    <div class="table_div">
      <s-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :rowKey="record => record.id"
        ref="table"
      >
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)">
            修改
          </a>
          <a-divider type="vertical" />
          <a @click="handleRead(record)">
            查看
          </a>
          <!-- <a-divider type="vertical" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="handleDelete(record)"
            @cancel="handleCancelDeletion"
            okText="确定"
            cancelText="取消"
          >
            <a href="javaScript:void(0)">删除</a>
          </a-popconfirm> -->
          <a-divider type="vertical" v-if="record.status === 1" />
          <a-dropdown v-if="record.status === 1" >
            <a class="ant-dropdown-link">
              审核 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleApproved(record.id)">审核通过</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleUnApproved(record.id)">审核不通过</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改表单部分 -->
    <div class="add_div">
      <a-drawer
        :width="800"
        @close="onClose"
        :title="addDrawerTitle"
        :visible="addDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSaveSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item >
            <a-input v-decorator="['status']" hidden="hidden"></a-input>
          </a-form-item>
          <a-row>
            <a-col :span="12">
              <a-form-item label="车主姓名">
                <a-input
                  v-decorator="['carOwner', {rules: [
                    { required: true, message: '车主姓名不能为空' }
                  ]}]"
                  placeholder="请输入车主真实姓名"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="车辆型号">
                <a-input
                  v-decorator="['vehicleModel', {rules: [
                    { required: true, message: '车辆型号不能为空' }
                  ]}]"
                  placeholder="请输入车辆型号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="车辆品牌">
                <a-input
                  v-decorator="['brand', {rules: [
                    { required: true, message: '车辆品牌不能为空' }
                  ]}]"
                  placeholder="请输入车辆所属品牌"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="发动机号">
                <a-input
                  v-decorator="['engineNumber', {rules: [
                    { required: true, message: '发动机号不能为空' }
                  ]}]"
                  placeholder="请输入发动机号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="车架号">
                <a-input
                  v-decorator="['identifyNumber', {rules: [
                    { required: true, message: '车架号不能为空' }
                  ]}]"
                  placeholder="请输入车辆所属车架号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="车辆使用油号">
                <a-input
                  v-decorator="['oilType', {rules: [
                    { required: true, message: '车辆使用油号不能为空' }
                  ]}]"
                  placeholder="请输入车辆使用油号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="年检日期">
                <a-date-picker
                  placeholder="请选择车辆年检日期"
                  v-decorator="['inspectionDate', {rules: [
                    { required: true, message: '年检日期不能为空' }
                  ]}]"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item :label="item.name" v-for="(item, index) of picList" :key="index">
                <upload-img-group :v-decorator="[item.typeName]" :ref="item.typeName" @ImageFun="getImageList" :imageInfo="item.fileLists"></upload-img-group>
              </a-form-item>
            </a-col>
          </a-row>
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
          v-show="saveDivVisible"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" html-type="submit" @click="handleSaveSubmit" :disabled="saveDisabled">保存</a-button>
        </div>
      </a-drawer>
    </div>
    <!-- 查看信息部分 -->
    <div class="check_div">
      <a-drawer
        :width="800"
        @close="onReadDrawerClose"
        title="查看车辆信息"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions size="small" bordered :column="4">
          <a-descriptions-item label="车辆品牌" :span="2">
            {{ readListData.brand }}
          </a-descriptions-item>
          <a-descriptions-item label="车主姓名" :span="2">
            {{ readListData.carOwner }}
          </a-descriptions-item>
          <a-descriptions-item label="发动机号" :span="2">
            {{ readListData.engineNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="车架号" :span="2">
            {{ readListData.identifyNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="年检日期" :span="2">
            {{ readListData.inspectionDate }}
          </a-descriptions-item>
          <a-descriptions-item label="车辆使用油号" :span="2">
            {{ readListData.oilType }}
          </a-descriptions-item>
          <a-descriptions-item label="车辆型号" :span="4">
            {{ readListData.vehicleModel }}
          </a-descriptions-item>
          <a-descriptions-item label="商业险保单" :span="2">
            <viewer class="imgBox" :images="readListData.commercialInsurance" v-if="readListData.commercialInsurance">
              <img
                :src="readListData.commercialInsurance"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="行驶证副本" :span="2">
            <viewer class="imgBox" :images="readListData.drivingPermitBack" v-if="readListData.drivingPermitBack">
              <img
                :src="readListData.drivingPermitBack"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="行驶证正本" :span="2">
            <viewer class="imgBox" :images="readListData.drivingPermitFront" v-if="readListData.drivingPermitFront">
              <img
                :src="readListData.drivingPermitFront"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="交强险保单" :span="2">
            <viewer class="imgBox" :images="readListData.insurance" v-if="readListData.insurance">
              <img
                :src="readListData.insurance"
              >
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// auditPassCarInfo, auditRejectCarInfo
import pick from 'lodash.pick'
import moment from 'moment'
import UploadImgGroup from '@/components/UploadImgGroup'
import { STable } from '@/components'
import { findCarInfoPage, updateCarInfo, auditPassCarInfo, auditRejectCarInfo } from '@/api/bizCarInfo.js'
// 格式化时间
function formatTime (dateStr) {
  var date = new Date(dateStr)
  var Month = date.getMonth() + 1
  var Day = date.getDate()
  var Y = date.getFullYear() + '-'
  var M = Month < 10 ? '0' + Month + '-' : Month + '-'
  var D = Day + 1 < 10 ? '0' + Day : Day
  return Y + M + D
}
export default {
  components: {
    STable,
    UploadImgGroup
  },
  data () {
    return {
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      addDrawerTitle: '', // 添加、修改抽屉的标题
      addDrawerVisible: false, // 添加、修改抽屉的可见性
      saveDisabled: false, // 设置保存按钮是否可操作
      saveDivVisible: true, // 设置保存按钮所在操作栏的可见性
      readDrawerVisible: false, // 查看抽屉的可见性
      readListData: {}, // 存放查看信息的对象
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      picList: [
        { name: '行驶证副本', typeName: 'drivingPermitBack', fileLists: [] },
        { name: '行驶证正本', typeName: 'drivingPermitFront', fileLists: [] },
        { name: '商业险保单', typeName: 'commercialInsurance', fileLists: [] },
        { name: '交强险保单', typeName: 'insurance', fileLists: [] }
      ],
      queryParam: {},
      columns: [
        {
          title: '车辆品牌',
          dataIndex: 'brand',
          key: 'brand',
          align: 'center',
          ellipsis: true
        },
        {
          title: '车主姓名',
          dataIndex: 'carOwner',
          key: 'carOwner',
          align: 'center',
          ellipsis: true
        },
        // {
        //   title: '发动机号',
        //   dataIndex: 'engineNumber',
        //   key: 'engineNumber',
        //   align: 'center',
        //   ellipsis: true
        // },
        // {
        //   title: '车架号',
        //   dataIndex: 'identifyNumber',
        //   key: 'identifyNumber',
        //   align: 'center',
        //   ellipsis: true
        // },
        {
          title: '车辆使用油号',
          dataIndex: 'oilType',
          key: 'oilType',
          align: 'center',
          ellipsis: true
        },
        {
          title: '车辆型号',
          dataIndex: 'vehicleModel',
          key: 'vehicleModel',
          align: 'center',
          ellipsis: true
        },
        {
          title: '年检日期',
          dataIndex: 'inspectionDate',
          key: 'inspectionDate',
          align: 'center',
          ellipsis: true
        },
        {
          title: '出租状态',
          dataIndex: 'statusName',
          key: 'statusName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          // fixed: 'right',
          align: 'center',
          width: '20%'
        }
      ],
      // 存放行驶证正副本照片、商业险、交强险保单照片路径
      imageInfo: {
        drivingPermitBack: [],
        drivingPermitFront: [],
        commercialInsurance: [],
        insurance: []
      },
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findCarInfoPage(parameter).then(res => {
          return res.result
        })
      },
      startTime: '', // 开始时间
      endTime: '' // 结束时间
    }
  },
  methods: {
    // 给日期组件赋值的初始方法
    moment,
    // 获取图片地址
    getImageList (data) {
      console.log(data)
      // 获取四组图片对应的元素信息
      const imgList = {
        drivingPermitBack: this.$refs.drivingPermitBack,
        drivingPermitFront: this.$refs.drivingPermitFront,
        commercialInsurance: this.$refs.commercialInsurance,
        insurance: this.$refs.insurance
      }
      // 获取上传图片组件的fileList并存入
      var list = {}
      for (var i in imgList) {
        list[i] = imgList[i][0].fileList
      }
      // console.log(list)
      // 遍历每个fileList
      for (var j in list) {
        // 每组图片是否存在
        if (list[j].length > 0) {
          // 遍历每组图片路径
          list[j].forEach((v, k) => {
            if (v.url) {
              // 上传保存过后重做的路劲格式
              this.imageInfo[j][k] = v.url
            } else {
              this.imageInfo[j][k] = v.response.url
            }
          })
        } else {
          this.imageInfo[j] = []
        }
      }
      // console.log(this.imageInfo)
      // console.log(this.picList)
    },
    // 开始时间
    startTimeChange (data, dataString) {
      this.startTime = dataString
    },
    // 结束时间
    endTimeChange (data, dataString) {
      this.endTime = dataString
    },
    // 查询按钮
    handleSearchSubmit (e) {
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        // console.log(values)
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              carOwner: values.carOwner,
              brand: values.brand,
              status: values.status,
              startTime: this.startTime,
              endTime: this.endTime
            }
          }
          // 把entity存入queryParam中
          Object.assign(this.queryParam, param)
          // 重新刷新表格
          this.$refs.table.refresh(true)
        } else {
          console.log('error', err)
        }
      })
    },
    // 清空查询输入框按钮
    handleSearchReset () {
      this.searchForm.resetFields()
      this.startTime = ''
      this.endTime = ''
    },
    // 添加按钮
    handleAdd () {
      this.addDrawerTitle = '添加车主'
      this.addDrawerVisible = true
    },
    // 修改按钮
    handleEdit (record) {
      console.log(record)
      this.addDrawerTitle = '修改车辆信息'
      this.addDrawerVisible = true
      this.$nextTick(() => {
        // 给日期组件赋值
        this.form.setFieldsValue({
          inspectionDate: moment(record.inspectionDate, 'YYYY-MM-DD')
        })
        // this.annualDate = moment(data.inspectionDate, 'YYYY-MM-DD')
        // this.comAnnualDate = data.inspectionDate
        // 判断图片路径是否存在，如果存在则设置基础回显路劲
        var drivingPermitBack, drivingPermitFront, commercialInsurance, insurance
        if (record.drivingPermitBack) {
          this.imageInfo.drivingPermitBack[0] = record.drivingPermitBack
          drivingPermitBack = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.drivingPermitBack
          }]
        } else {
          drivingPermitBack = []
        }
        if (record.drivingPermitFront) {
          this.imageInfo.drivingPermitFront[0] = record.drivingPermitFront
          drivingPermitFront = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.drivingPermitFront
          }]
        } else {
          drivingPermitFront = []
        }
        if (record.commercialInsurance) {
          this.imageInfo.commercialInsurance[0] = record.commercialInsurance
          commercialInsurance = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.commercialInsurance
          }]
        } else {
          commercialInsurance = []
        }
        if (record.insurance) {
          this.imageInfo.insurance[0] = record.insurance
          insurance = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: record.insurance
          }]
        } else {
          insurance = []
        }
        this.picList = [
          { name: '行驶证副本', typeName: 'drivingPermitBack', fileLists: drivingPermitBack },
          { name: '行驶证正本', typeName: 'drivingPermitFront', fileLists: drivingPermitFront },
          { name: '商业险保单', typeName: 'commercialInsurance', fileLists: commercialInsurance },
          { name: '交强险保单', typeName: 'insurance', fileLists: insurance }
        ]
        this.form.setFieldsValue(pick(record, 'id', 'brand', 'carOwner', 'engineNumber', 'identifyNumber', 'oilType', 'status', 'vehicleModel'))
      })
    },
    // 保存按钮
    handleSaveSubmit () {
      // this.addDrawerVisible = true
      this.saveDisabled = true
      this.form.validateFields((err, val) => {
        // console.log(val)
        if (!err) {
          // 解构三组图片所对应的数据，数组值对应着图片路径
          // 解构各个图片对应的数组
          const { drivingPermitBack, drivingPermitFront, commercialInsurance, insurance } = this.imageInfo
          // 给请求参数赋值，图片路径存在时存路径，不存在时存空串
          // 把图片路径赋值给对应的请求字段
          val.drivingPermitBack = drivingPermitBack[0] || ''
          val.drivingPermitFront = drivingPermitFront[0] || ''
          val.commercialInsurance = commercialInsurance[0] || ''
          val.insurance = insurance[0] || ''
          val.inspectionDate = formatTime(val.inspectionDate._d)
          console.log(val)
          updateCarInfo(val).then(res => {
            if (res.code === 1) {
              // 成功提示信息
              this.$message.success('保存成功')
              // 重置表单
              this.form.resetFields()
              // 刷新表格
              this.$refs.table.refresh(true)
              // 关闭抽屉
              this.addDrawerVisible = false
              // 保存后清除之前保存的路径，即重新初始化
              this.imageInfo = {
                drivingPermitBack: [],
                drivingPermitFront: [],
                commercialInsurance: [],
                insurance: []
              }
            } else {
              console.log(res.message)
              this.$message.error(res.message)
            }
            // 不管请求是否成功与失败都恢复保存按钮
            this.saveDisabled = false
          })
        } else {
          console.log(err)
          this.saveDisabled = false
        }
      })
    },
    // 查看按钮
    handleRead (record) {
      this.readDrawerVisible = true
      this.readListData = JSON.parse(JSON.stringify(record))
      // 如果存在则把图片路径做成数组形式
      this.readListData.commercialInsurance = [record.commercialInsurance]
      this.readListData.drivingPermitBack = [record.drivingPermitBack]
      this.readListData.drivingPermitFront = [record.drivingPermitFront]
      this.readListData.insurance = [record.insurance]
      console.log(this.readListData)
    },
    // 删除按钮
    handleDelete (key) {
      const index = this.loadData.key
      this.loadData.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
    },
    // 关闭添加修改抽屉按钮
    onClose () {
      this.addDrawerVisible = false
      this.form.resetFields()
      this.picList = [
        { name: '行驶证副本', typeName: 'drivingPermitBack', fileLists: [] },
        { name: '行驶证正本', typeName: 'drivingPermitFront', fileLists: [] },
        { name: '商业险保单', typeName: 'commercialInsurance', fileLists: [] },
        { name: '交强险保单', typeName: 'insurance', fileLists: [] }
      ]
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.form.resetFields()
    },
    // 审核通过按钮
    handleApproved (id) {
      var _this = this
      // this.$message.success('审核通过')
      this.$confirm({
        title: '确定通过审核',
        onOk () {
          auditPassCarInfo({
            id: id
          }).then(res => {
            if (res.code === 1) {
              _this.$refs.table.refresh(true)
              _this.$message.success('审核通过')
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 审核不通过按钮
    handleUnApproved (id) {
      var _this = this
      // this.$message.success('审核通过')
      this.$confirm({
        title: '确定驳回',
        onOk () {
          auditRejectCarInfo({
            id: id
          }).then(res => {
            if (res.code === 1) {
              _this.$refs.table.refresh(true)
              _this.$message.success('驳回成功')
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.imgBox {
  img {
    width: 100px;
  }
}
</style>

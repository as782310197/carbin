<template>
  <div>
    <div class="box">
      <div style="width: 75%;">
        <!-- 租赁需求/验收 -->
        <a-card title="租赁需求/验收" class="rent_demand">
          <ul class="rent_data">
            <li>
              <span>{{ carRequirement }}</span>
              <span>用车需求</span>
            </li>
            <li>
              <span>{{ carSupplier }}</span>
              <span>汽车验收</span>
            </li>
            <li>
              <span>{{ deviceRequirement }}</span>
              <span>设备需求</span>
            </li>
            <!-- <li>
              <span>18986</span>
              <span>设备验收</span>
            </li> -->
          </ul>
        </a-card>
        <!-- 统计 -->
        <div class="statistics">
          <a-card title="待支付统计" style="width: 50%;">
            <div class="statistics_item">
              <div>
                <span>汽车租赁待支付金额</span>
                <span>¥{{ waitingPayBill }}</span>
              </div>
              <div>
                <span>设备租赁待支付金额</span>
                <span>¥{{ waitingDevicePayBill }}</span>
              </div>
            </div>
          </a-card>
          <a-card title="在租情况统计" style="width: 50%">
            <div class="statistics_item">
              <div>
                <span>在租汽车数量</span>
                <span>{{ carRenting }}</span>
              </div>
              <div>
                <span>在租设备数量</span>
                <span>{{ deviceRenting }}</span>
              </div>
            </div>
          </a-card>
        </div>
        <!-- 支付月统计 -->
        <a-row :gutter="24">
          <a-col :span="12">
            <div id="charts" style="width:'100%'; background: #fff; height:'20rem'; padding: 10px 10px 10px 15px;">
              <div id="carMain" :style="{width:'100%',height:'20rem'}"></div>
            </div>
          </a-col>
          <a-col :span="12">
            <div id="charts" style="width:'100%'; background: #fff; height:'20rem'; padding: 10px 10px 10px 15px;">
              <div id="deviceMain" :style="{width:'100%',height:'20rem'}"></div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div style="width: 25%;">
        <a-card title="申请发票" style="width: 100%; margin-left: 20px;">
          <div>可申请发票金额</div>
          <div class="price" style="color: #fa541c; font-size: 1.5rem;">¥{{ applyableBill }}</div>
          <!-- <a-divider />
          <div style="margin-bottom: 5px;">默认寄送地址</div>
          <a-button @click="handleAddress">管理地址</a-button> -->
          <!-- 收货地址 -->
          <!-- <div class="address_div">
            <a-modal
              :visible="addressModalVisable"
              title="收货地址"
              width="50%"
              @ok="handleAddressSubmit"
              @cancel="handleAddressCancel"
            >
              <a-form :form="addressForm" @submit="handleAddressSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                <a-form-item label="姓名">
                  <a-input
                    v-decorator="['name', {rules: [
                      { required: true }
                    ]}]"
                    placeholder="请输入收方姓名"
                  />
                </a-form-item>
                <a-form-item label="手机号码">
                  <a-input
                    v-decorator="['phone', {rules: [
                      { required: true }
                    ]}]"
                    placeholder="请输入手机号码"
                  />
                </a-form-item>
                <a-form-item label="收货城市">
                  <a-input
                    v-decorator="['city', {rules: [
                      { required: true }
                    ]}]"
                    placeholder="请输入收货城市"
                  />
                </a-form-item>
                <a-form-item label="详细地址">
                  <a-input
                    v-decorator="['address', {rules: [
                      { required: true }
                    ]}]"
                    placeholder="请输入详细地址"
                  />
                </a-form-item>
              </a-form>
            </a-modal>
          </div> -->
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import pick from 'lodash.pick'
import { getBizEnterpriseAddress, saveBizEnterpriseAddress } from '@/api/bizEnterpriseAddress.js'
import { indexData } from '@/api/indexdata'
import { Bar, STable } from '@/components'
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
// const barData = []
// for (let i = 0; i < 12; i += 1) {
//   barData.push({
//     x: `${i + 1}月`,
//     y: Math.floor(Math.random() * 1000) + 200
//   })
// }
export default {
  components: {
    Bar,
    STable
  },
  data () {
    return {
      // option: {},
      carOption: {
        title: {
          text: '支付月统计图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['月支付', '年支付']
          data: []
        },
        grid: {
          left: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          // {
          //   type: 'line',
          //   stack: '总量',
          //   name: '月支付',
          //   data: [52, 15, 85, 45, 69, 5888, 221, 454, 365, 135, 49, 3561]
          // }
        ]
      },
      deviceOption: {
        title: {
          text: '支付月统计图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['月支付', '年支付']
          data: []
        },
        grid: {
          left: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          // {
          //   type: 'line',
          //   stack: '总量',
          //   name: '月支付',
          //   data: [52, 15, 85, 45, 69, 5888, 221, 454, 365, 135, 49, 3561]
          // }
        ]
      },
      addressForm: this.$form.createForm(this), // 收货地址表单
      addressModalVisable: false, // 收货地址弹框的可见性
      // barData,
      loading: true,
      carRequirement: 0, // 用车需求
      carSupplier: 0, // 汽车验收
      deviceRequirement: 0, // 设备需求
      waitingPayBill: 0, // 汽车租赁待支付金额
      waitingDevicePayBill: 0, // 设备租赁待支付金额
      carRenting: 0, // 在租汽车数量
      deviceRenting: 0, // 在租设备数量
      applyableBill: 0 // 可申请发票金额
    }
  },
  mounted () {
    const carEchartsWrap = document.getElementById('carMain')
    const deviceEchartsWrap = document.getElementById('deviceMain')
    indexData().then(res => {
      if (res.code === 1) {
        const data = res.result
        console.log(data)
        this.carRequirement = data.carRequirement ? data.carRequirement : 0
        this.carSupplier = data.carSupplier ? data.carSupplier : 0
        this.deviceRequirement = data.deviceRequirement ? data.deviceRequirement : 0
        this.waitingPayBill = data.waitingPayBill ? data.waitingPayBill : 0
        this.waitingDevicePayBill = data.waitingDevicePayBill ? data.waitingDevicePayBill : 0
        this.carRenting = data.carRenting ? data.carRenting : 0
        this.deviceRenting = data.deviceRenting ? data.deviceRenting : 0
        this.applyableBill = data.applyableBill ? data.applyableBill : 0
        this.carOption.xAxis.data = data.monthlyPayment && data.monthlyPayment.monthData
        this.carOption.legend.data = data.monthlyPayment.statisticsData && data.monthlyPayment.statisticsData.map(v => v.name)
        this.carOption.series = data.monthlyPayment.statisticsData && data.monthlyPayment.statisticsData.map(v => {
          return {
            type: 'line',
            stack: '总量',
            name: v.name,
            data: v.data
          }
        })
        this.deviceOption.xAxis.data = data.deviceMonthlyPayment && data.deviceMonthlyPayment.monthData
        this.deviceOption.legend.data = data.deviceMonthlyPayment.statisticsData && data.deviceMonthlyPayment.statisticsData.map(v => v.name)
        this.deviceOption.series = data.deviceMonthlyPayment.statisticsData && data.deviceMonthlyPayment.statisticsData.map(v => {
          return {
            type: 'line',
            stack: '总量',
            name: v.name,
            data: v.data
          }
        })
        // this.option = option
        var myCarChart = echarts.init(carEchartsWrap)
        myCarChart.setOption(this.carOption)

        var myDecviceChart = echarts.init(deviceEchartsWrap)
        myDecviceChart.setOption(this.deviceOption)
      }
    })
  },
  methods: {
    // 关闭地址模态框
    handleAddressCancel () {
      this.addressModalVisable = false
    },
    // 收货地址按钮
    handleAddress () {
      this.addressModalVisable = true
      getBizEnterpriseAddress().then(res => {
        if (res.code === 1) {
          this.$nextTick(() => {
            this.addressForm.setFieldsValue(pick(res.result, 'name', 'city', 'address', 'phone'))
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 地址表单提交按钮
    handleAddressSubmit (e) {
      this.addressForm.validateFields((err, val) => {
        if (!err) {
          saveBizEnterpriseAddress(val).then(res => {
            if (res.code === 1) {
              this.$message.success('地址保存成功')
              this.addressModalVisable = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log(err)
        }
      })
    }
  },
  created () {
    /* indexData().then(res => {
      console.log(res)
      if (res.code === 1) {
        const data = res.result
        var option = {
          title: {
            text: '支付月统计图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            // data: ['月支付', '年支付']
            data: []
          },
          grid: {
            left: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            // {
            //   type: 'line',
            //   stack: '总量',
            //   name: '月支付',
            //   data: [52, 15, 85, 45, 69, 5888, 221, 454, 365, 135, 49, 3561]
            // }
          ]
        }
        console.log(data)
        option.xAxis = data.monthlyPayment && data.monthlyPayment.monthData
        option.legend.data = data.monthlyPayment.statisticsData && data.monthlyPayment.statisticsData.map(v => v.name)
        option.series = data.monthlyPayment.statisticsData && data.monthlyPayment.statisticsData.map(v => {
          return {
            type: 'line',
            stack: '总量',
            name: v.name,
            data: [52, 15, 85, 45, 69, 5888, 221, 454, 365, 135, 49, 3561]
          }
        })
        this.option = option
        console.log(this.option)
      }
    }) */
    // setTimeout(() => {
    //   this.loading = !this.loading
    // }, 1000)
  }
}
</script>

<style lang="less" scoped>
  .statistics_box {
    margin-bottom: 20px;
    .statistics_item {
      width: 90%;
      height: 100px;
      padding-top: 20px;
      text-align: center;
      background-color: #fff;
    }
  }
  .box {
    display: flex;
    /* justify-content: space-between; */
  }
  .rent_demand {
    width: 100%;
    margin-bottom: 20px;
  }
  .rent_data {
    padding-left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .rent_demand li {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .rent_demand li + li {
    border-left: 1px solid #ddd;
  }
  .rent_demand li span:first-child {
    font-size: 1.5rem;
  }
  .rent_demand li span:last-child {
    font-size: 1rem;
  }
  .statistics {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .statistics_item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .statistics_item div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .statistics_item div span:first-child {
    font-size: 1rem;
  }
  .statistics_item div span:last-child {
    font-size: 1.5rem;
    color: #fa541c;
  }
  #main > div,
  #main > div > canvas {
    width: 100% !important;
  }
</style>

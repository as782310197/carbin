<template>
  <a-card :bordered="false">
    <!-- 快捷方式栏 -->
    <!-- <a-card title="快捷方式">
      <div class="shortcutBar">
        <router-link :to="{ name: 'ProjectList' }" class="link">
          <div>
            <div class="icon">
              <img src="@/assets/img/xiangmu.png" alt="项目管理">
            </div>
            <span>项目管理</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'PersonList' }" class="link">
          <div>
            <div class="icon">
              <img src="@/assets/img/renyuan.png" alt="项目管理">
            </div>
            <span>人员管理</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'TaskList' }" class="link">
          <div>
            <div class="icon">
              <img src="@/assets/img/renwu.png" alt="项目管理">
            </div>
            <span>任务管理</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'WorkOrderList' }" class="link">
          <div>
            <div class="icon">
              <img src="@/assets/img/gongdan.png" alt="项目管理">
            </div>
            <span>工单列表</span>
          </div>
        </router-link>
      </div>
    </a-card>
    <a-divider /> -->
    <!-- 一览 -->
    <a-card title="统计一览">
      <div class="listCard">
        <a-row>
          <a-col :span="6">
            <a-statistic title="项目数量" :value="projectNum" />
          </a-col>
          <a-col :span="6">
            <a-statistic title="工点数量" :value="constructionPointNum"/>
          </a-col>
          <a-col :span="6">
            <a-statistic title="工单数量" :value="faultOrderNum"/>
          </a-col>
          <a-col :span="6">
            <a-statistic title="任务数量" :value="taskNum"/>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-divider />
    <!-- 可视化统计图 -->
    <a-card class="viewCard" :bordered="false">
      <a-row>
        <a-col :span="11">
          <a-card
            class="antd-pro-pages-dashboard-analysis-salesCard"
            :loading="loading"
            :bordered="false"
            title="工单状态统计"
            :style="{ height: '100%' }"
          >
            <div>
              <div>
                <v-chart :force-fit="true" :height="405" :data="statusStatistics" :scale="pieScale">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="11" style="margin-left:50px;">
          <a-card
            title="项目任务统计"
            :loading="loading"
            :bordered="false"
          >
            <bar :data="taskStatisticsByProject"/>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-card
            title="任务按月统计"
            :loading="loading"
            :bordered="false"
          >
            <bar :data="taskStatisticsByMonth"/>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </a-card>
</template>

<script>
import DetailList from '@/components/DescriptionList/DescriptionList'
import { indexData } from '@/api/indexdata'
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea } from '@/components'
// 环形饼图 工单状态统计
const DetailListItem = DetailList.Item
const DataSet = require('@antv/data-set')
// const dv = new DataSet.View().source(sourceData)
// dv.transform({
//   type: 'percent',
//   field: 'count',
//   dimension: 'item',
//   as: 'percent'
// })
// const pieData = dv.rows

// const sourceData = [
//   { item: '待处理', count: 99 },
//   { item: '处理中', count: 55 },
//   { item: '已完成', count: 10 }
// ]

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

// // 柱状图 项目任务统计
// const barData = []
// for (let i = 0; i < 10; i += 1) {
//   barData.push({
//     x: `项目${i + 1}`,
//     y: Math.floor(Math.random() * 100) + 10
//   })
// }
// // 项目任务统计
// const barData2 = []
// for (let i = 0; i < 12; i += 1) {
//   barData2.push({
//     x: `项目${i + 1}月`,
//     y: Math.floor(Math.random() * 1000) + 100
//   })
// }

export default {
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      loading: true,
      // 环形饼图
      pieScale,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      // 柱状图
      projectNum: 0, // 项目数量
      constructionPointNum: 0, // 工点数量
      faultOrderNum: 0, // 工单数量
      taskNum: 0, // 任务数量
      statusStatistics: [], // 工单状态统计
      taskStatisticsByProject: [], // 项目任务统计
      taskStatisticsByMonth: [] // 任务按月统计
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
    indexData().then(res => {
      if (res.code === 1) {
        const data = res.result
        this.projectNum = data.projectNum
        this.constructionPointNum = data.constructionPointNum
        this.faultOrderNum = data.faultOrderNum
        this.taskNum = data.taskNum
        // 工单状态统计
        let sourceData = []
        sourceData = data.statusStatistics.map(v => {
          return {
            item: v.statusName,
            count: v.num
          }
        })
        const dv = new DataSet.View().source(sourceData)
        dv.transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        })
        this.statusStatistics = dv.rows
        // 项目任务统计
        let list = []
        list = data.taskStatisticsByPorject.map(v => {
          return {
            x: v.projectName,
            y: v.sum
          }
        })
        this.taskStatisticsByProject = list
        // 任务按月统计
        let list2 = []
        list2 = data.taskStatisticsByMonth.map(v => {
          return {
            x: v.mon,
            y: v.sum
          }
        })
        this.taskStatisticsByMonth = list2
      }
    })
  }
}
</script>

<style lang="less" scoped>
.shortcutBar{
  display: flex;
  align-items: center;
}
.link{
  text-align: center;
  color: #000;
  width: 90px;
  height: 100px;
  margin-right: 50px;
  border: 1px solid #E0E0E0;
  background-color: #FCFCFC;
}
.link:hover{
  box-shadow: 2px 2px 2px 5px #F0F0F0;
  transform: 0.5s;
  position: relative;
  top: 2px;
  left: 2px;
}
.icon{
  width: 50px;
  height: 50px;
  color: #46A3FF;
  // margin-bottom: 10px;
  margin: 10px auto 10px;
}
.icon>img{
  width: 50px;
  height: 50px;
}
.listCard {
  text-align: center;
}
.viewCard{
  margin-top: 20px;
}
</style>

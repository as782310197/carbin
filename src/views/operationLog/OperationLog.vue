<template>
  <a-card class="personCard">
    <div>
      <!-- 搜索部分 -->
      <div class="searchDiv">
        <a-form class="ant-advanced-search-form" :form="searchForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="日志内容">
                <a-input
                  v-decorator="['detail']"
                  placeholder="请输入日志内容"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="操作者">
                <a-input
                  v-decorator="['operator']"
                  placeholder="操作者"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="开始时间">
                <a-date-picker
                  v-decorator="['startTime']"
                  style="width: 100%"
                  @change="startTimeChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="结束时间">
                <a-date-picker
                  v-decorator="['endTime']"
                  style="width: 100%"
                  @change="endTimeChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ textAlign: 'right' }">
              <a-button type="primary" html-type="submit">
                查询
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                清空
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="tableDiv">
      <!-- 表格 -->
      <S-table
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
        :loading="loading"
        :rowKey="record => record.id"
        ref="table"
        bordered
      >
      </S-table>
    </div>
  </a-card>
</template>

<script>
import { getOperationLogPage } from '@/api/operationLog'
import { STable } from '@/components'
export default {
  components: {
    STable
  },
  data () {
    return {
      searchForm: this.$form.createForm(this), // 搜索表单
      loading: false,
      startTime: '',
      endTime: '',
      columns: [
        {
          title: '日志内容',
          dataIndex: 'detail',
          key: 'detail',
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作者',
          dataIndex: 'operator',
          key: 'operator',
          align: 'center',
          ellipsis: true
        },
        {
          title: '时间',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          ellipsis: true
        }
      ],
      queryParam: [],
      // 表格分页栏设置
      pagination: {
        // showSizeChanger: true,
        // showQuickJumper: true,
        // pageSize: 10,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getOperationLogPage(parameter)
          .then(res => {
            if (res.code === 1) {
              return res.result
            }
          })
      }
    }
  },
  methods: {
    // 查询按钮
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          const paramArray = []
          paramArray.push({ startDate: this.startTime })
          paramArray.push({ endDate: this.endTime })
          paramArray.push({ detail: values.detail })
          paramArray.push({ operator: values.operator })
          const param = {
            paramMapList: paramArray
          }
          Object.assign(this.queryParam, param)
          this.$refs.table.refresh(true)
        } else {
          console.log('error', error)
        }
      })
    },
    // 重置按钮
    handleReset (e) {
      this.searchForm.resetFields()
    },
    // 开始时间
    startTimeChange (date, dateStr) {
      this.startTime = dateStr
      if (this.endTime) {
        if (new Date(dateStr).getTime() > new Date(this.endTime).getTime()) {
          this.$message.warning('开始时间不能大于结束时间')
           this.searchForm.resetFields('startTime', [])
        }
      }
    },
    // 结束时间
    endTimeChange (date, dateStr) {
      this.endTime = dateStr
      if (this.startTime) {
        if (new Date(dateStr).getTime() < new Date(this.startTime).getTime()) {
          this.$message.warning('结束时间不能小于开始时间')
          this.searchForm.resetFields('endTime', [])
        }
      }
    }
  }
}
</script>

<style scoped>
.tableDiv{
  margin-top: 20px;
}
</style>

<template>
  <div>
    <!-- 搜索部分 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="名称">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="2">停用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 添加按钮 -->
    <a-button type="primary" @click="addDrawer" style="margin-bottom: 20px;">
      <a-icon type="plus" /> 增加 </a-button>
    <!-- 抽屉 -->
    <a-drawer
      :width="500"
      @close="onClose"
      :title="title"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :bodyStyle="{
        paddingBottom: '80px'
      }"
    >
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
        <a-form-item label="所属项目">
          <a-select
            v-decorator="['entryName', {
              rules: [{ required: true, message: '请选择' }]
            }]"
            placeholder="请选择"
            @change="handleentryNameChange"
          >
            <a-select-option v-for="entryName in entryNameData" :key="entryName">{{ entryName }}</a-select-option>

          </a-select>
        </a-form-item>
        <a-form-item label="所属监理标">
          <a-select
            v-decorator="['supervisionLotNo', {
              rules: [{ required: true, message: '请选择' }]
            }]"
            placeholder="请选择"
            v-model="secondItem"
          >
            <a-select-option v-for="supervisionLotNo in supervisionLotNo" :key="supervisionLotNo">{{ supervisionLotNo }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所属施工标">
          <a-select
            v-decorator="['constructionLotName', {
              rules: [{ required: true, message: '请选择' }]
            }]"
            placeholder="请选择"
          >
            <a-select-option v-for="constructionLotName in constructionLotName" :key="constructionLotName">{{ constructionLotName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所属工点">
          <a-select
            v-decorator="['workPointName', {
              rules: [{ required: true, message: '请选择' }]
            }]"
            placeholder="请选择"
          >
            <a-select-option v-for="workPointName in workPointName" :key="workPointName">{{ workPointName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 12, offset: 10 }"
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            paddingTop: '20px',
            background: '#fff',
            textAlign: 'right',
          }"
        >
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
          <a-button :style="{marginLeft: '20px'}" @click="onClose">
            取消
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <!-- 表格 -->
    <a-table
      :columns="columns"
      :dataSource="loadData"
      rowKey="id"
      :pagination="false"
    >
      <span slot="nameID" slot-scope="text">
        {{ text }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">修改</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="您确定要删除吗?"
          @confirm="confirm(record.key)"
          okText="确定"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </a-popconfirm><!-- @cancel="cancel" -->
      </span>
    </a-table>
  </div>
</template>

<script>
// import { values } from 'mockjs2'
const entryNameData = [
  '项目1',
  '项目2'
]
const supervisionLotNoData = {
  项目1: ['监理标1'],
  项目2: ['监理标2']
}
const constructionLotNameData = {
  监理标1: ['施工标1'],
  监理标2: ['施工标2']
}
const workPointNameData = {
  施工标1: ['工点1'],
  施工标2: ['工点2']
}

export default {
  data () {
    return {
      title: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      // 表头
      columns: [
        {
          title: '名称',
          dataIndex: 'nameID'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          scopedSlots: { customRender: 'actions' }
        },
        {
          title: '电话号码',
          dataIndex: 'phone'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
          key: 'action'
        }
      ],
      loadData: [
        {
          key: '1',
          nameID: '王一',
          sex: '男',
          phone: '12345678910'
        }
      ],
      // selectedRowKeys: [],
      // selectedRows: []
      entryNameData,
      supervisionLotNoData,
      constructionLotNameData,
      workPointNameData,
      supervisionLotNo: supervisionLotNoData[entryNameData[0]],
      secondItem: supervisionLotNoData[entryNameData[0]][0]
    }
  },
  methods: {
    handleentryNameChange (value) {
      this.supervisionLotNo = supervisionLotNoData[entryNameData[value]]
      this.secondItem = supervisionLotNoData[entryNameData[value][0]]
    },
    // 添加添加
    addDrawer () {
      this.visible = true
      this.title = '添加信息'
    },
    // 修改信息
    handleEdit (index) {
      this.visible = true
      this.title = '修改信息'
    },
    // 保存信息
    handleSubmit (e) {
      e.preventDefault() // 默认预览值
      // this.confirmLoading = true
      this.form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        } else {
          console.log(errors)
        }
      })
    },
    // 关闭抽屉表单页面
    onClose () {
      this.visible = false
    }
  }
}
</script>

<style>

</style>

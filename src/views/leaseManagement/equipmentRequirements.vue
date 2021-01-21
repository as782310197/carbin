<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="设备主姓名">
              <a-input
                v-decorator="['searchDeviceOwner']"
                placeholder="请输入设备主姓名"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="8">
            <a-form-item label="联系电话">
              <a-input
                v-decorator="['searchPhone']"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col> -->
          <a-col :span="8">
            <a-form-item label="出租状态">
              <a-select
                v-decorator="['rentStatus']"
                placeholder="请选择"
              >
                <a-select-option :value="0">待设备主提交设备证照</a-select-option>
                <a-select-option :value="1">设备信息待平台审核</a-select-option>
                <a-select-option :value="2">设备信息被驳回</a-select-option>
                <a-select-option :value="3">待企业验设备</a-select-option>
                <a-select-option :value="4">企业验设备被驳回</a-select-option>
                <a-select-option :value="5">设备主待签约</a-select-option>
                <a-select-option :value="6">出租中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="设备类型">
              <a-select
                v-decorator="['deviceType']"
                placeholder="请选择"
              >
                <a-select-option value="挖掘机械">挖掘机械</a-select-option>
                <a-select-option value="起重机械">起重机械</a-select-option>
                <a-select-option value="装载机械">装载机械</a-select-option>
                <a-select-option value="隧道机械">隧道机械</a-select-option>
                <a-select-option value="打桩机械">打桩机械</a-select-option>
                <a-select-option value="自卸车">自卸车</a-select-option>
                <a-select-option value="叉车">叉车</a-select-option>
                <a-select-option value="运输车">运输车</a-select-option>
                <a-select-option value="混泥土机械">混泥土机械</a-select-option>
                <a-select-option value="路面机械">路面机械</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
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
            <a-button :style="{ marginLeft: '2px' }" @click="handleSearchReset">
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 按钮部分 -->
    <div class="button_div">
      <a-button type="primary" @click="handleAdd" v-if="actionList.add === 1">添加</a-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a-button type="primary" @click="handleImport" v-if="actionList.add === 1">批量倒入</a-button>
    </div>
    <!-- 表格部分 -->
    <div class="table_div">
      <s-table
        :columns="columns"
        :data="loadData"
        :rowKey="record => record.id"
        :pagination="pagination"
        ref="table"
      >
        <span slot="totalDuration" slot-scope="text,record">
          {{ record.startDate + '-' + record.endDate }}
        </span>
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <a-divider type="vertical" v-if="((actionList.update === 1 && actionList.get === 1) || actionList.get !== 1) && record.status === 6" />
          <a @click="handleRecord(record)" v-if="actionList.get === 1 && record.status === 6">设备巡查</a>
          <a-divider type="vertical" v-if="actionList.get === 1 || actionList.delete === 1" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="handleDelete(record)"
            @cancel="handleCancelDeletion"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="javaScript:void(0)">终止</a>
          </a-popconfirm>
          <a-divider type="vertical" v-if="record.status === 1 || record.status === 3" />
          <a-dropdown v-if="record.status === 1">
            <a class="ant-dropdown-link">
              审核 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handlePlatformApproved(record.id)">平台审核通过</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handlePlatformUnApproved(record.id)">平台审核不通过</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown v-if="record.status === 3">
            <a class="ant-dropdown-link">
              审核 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleEnterpriseApproved(record.id)">企业审核通过</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleEnterpriseUnApproved(record.id)">企业审核不通过</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </s-table>
    </div>
    <!-- 添加、修改表单部分 -->
    <div class="add_div">
      <a-drawer
        :width="1000"
        @close="onClose"
        :title="addDrawerTitle"
        :visible="addDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <!-- 基本信息 -->
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSaveSubmit">
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <h3>基本信息</h3>
          <a-row>
            <a-col :span="12">
              <a-form-item label="真实姓名">
                <a-input
                  v-decorator="['deviceOwner', {rules: [
                    { required: true, message: '真实姓名不能为空' }
                  ]}]"
                  placeholder="请输入真实姓名"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话">
                <a-input
                  v-decorator="['phone', {rules: [
                    { required: true, message: '联系电话不能为空' }
                  ]}]"
                  placeholder="请输入联系电话"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="项目名称">
                <a-input
                  v-decorator="['projectName', {rules: [
                    { required: true, message: '项目名称不能为空' }
                  ]}]"
                  placeholder="请输入项目名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="工程所在地">
                <a-input
                  v-decorator="['location', {rules: [
                    { required: true, message: '工程所在地不能为空' }
                  ]}]"
                  placeholder="请输入工程所在地"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="关联合同">
                <a-input
                  v-decorator="['contract', {rules: [
                    { required: true, message: '关联合同不能为空' }
                  ]}]"
                  placeholder="请输入关联合同"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" class="chiose_contract_btn">
              <a-button type="primary" @click="handleChioseContract">+ 选择合同</a-button>
            </a-col>
            <!-- 选择合同modal弹框 -->
            <div class="chiose_contract_box">
              <a-modal
                :visible="chioseContractVisible"
                :footer="null"
                @cancel="closeChioseContractModal"
                title="选择合同"
                width="50%"
              >
                <s-table
                  :columns="chioseContractColumns"
                  :data="chioseContractData"
                  :pagination="chioseContractPagination"
                  :rowKey="record => record.id"
                  ref="contractTable"
                >
                  <template slot="operation" slot-scope="text, record">
                    <a @click="handleChiose(record)">
                      选择
                    </a>
                  </template>
                </s-table>
              </a-modal>
            </div>
          </a-row>
          <a-divider />
          <h3>租用信息</h3>
          <a-row>
            <a-col :span="12">
              <a-form-item label="设备日单价">
                <a-input
                  v-decorator="['rent', {rules: [
                    { required: true, message: '设备日单价不能为空' }
                  ]}]"
                  placeholder="请输入设备日单价"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6" style="margin-left: 20px;">
              <a-form-item>
                <a-select
                  v-decorator="['unit', {initialValue: '台班', rules: [
                    { required: true, message: '请选择' }
                  ]}]"
                  placeholder="请选择"
                >
                  <a-select-option value="台班">台班</a-select-option>
                  <a-select-option value="土石方">土石方</a-select-option>
                  <a-select-option value="立方米">立方米</a-select-option>
                  <a-select-option value="米">米</a-select-option>
                  <a-select-option value="月">月</a-select-option>
                  <a-select-option value="车">车</a-select-option>
                  <a-select-option value="平方米">平方米</a-select-option>
                  <a-select-option value="个">个</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="结算方式">
                <a-select
                  v-decorator="['payType', {initialValue: '日结' , rules: [
                    { required: true, message: '请选择' }
                  ]}]"
                  placeholder="请选择"
                >
                  <a-select-option value="日结">日结</a-select-option>
                  <a-select-option value="周结">周结</a-select-option>
                  <a-select-option value="月结">月结</a-select-option>
                  <a-select-option value="完工结">完工结</a-select-option>
                  <a-select-option value="其他">其他</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="租赁周期">
                <a-range-picker
                  v-decorator="['totalDuration', {rules: [
                    { required: true, message: '租赁周期不能为空' }
                  ]}]"
                  :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                  show-time
                  format="YYYY-MM-DD"
                />
              </a-form-item>
              <a-form-item label="长期项目">
                <a-switch
                  v-decorator="['isLongTerm', {rules: [
                    { required: false, message: '' }
                  ]}]"
                  checked-children="是"
                  un-checked-children="否"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-divider />
        <!-- 银行信息 选填 -->
        <div :class="bankInfoFrame ? 'info' : 'bankInfo'" style="display: flex; align-items: center;">
          <h3 style="margin-right: 10px;">银行信息</h3>
          <a-switch checked-children="开" un-checked-children="关" @change="selectedBackinfo" :checked="bankInfoFrame" />
        </div>
        <a-form :form="bankInfo" v-show="bankInfoFrame" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSaveSubmit">
          <a-form-item class="hidden">
            <a-input v-decorator="['requirementId']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['type']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['createTime']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['status']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['status']" hidden="hidden"></a-input>
          </a-form-item>
          <a-row>
            <a-col :span="12">
              <a-form-item label="银行账号">
                <a-input
                  v-decorator="['account', {rules: [
                    { required: true, message: '银行账号不能为空' }
                  ]}]"
                  placeholder="请输入真实银行账号"
                />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12" class="chiose_contract_btn">
              <a-button type="primary">+ 获取银行信息</a-button>
            </a-col> -->
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="开户银行">
                <a-input
                  v-decorator="['bank', {rules: [
                    { required: true, message: '开户银行不能为空' }
                  ]}]"
                  placeholder="点击获取银行信息获取"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="银行卡所属省份">
                <a-input
                  v-decorator="['province', {rules: [
                    { required: true, message: '银行卡所属省份不能为空' }
                  ]}]"
                  placeholder="点击获取银行信息获取"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="银行卡所属城市">
                <a-input
                  v-decorator="['city', {rules: [
                    { required: true, message: '银行卡所属城市不能为空' }
                  ]}]"
                  placeholder="点击获取银行信息获取"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="银行卡所属支行">
                <a-input
                  v-decorator="['accountHolder', {rules: [
                    { required: true, message: '银行卡所属支行不能为空' }
                  ]}]"
                  placeholder="请输入银行开户行所属支行"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-divider />
        <!-- 设备信息 选填 -->
        <div :class="carInfoFrame ? 'info' : 'carInfo'" style="display: flex; align-items: center;">
          <h3 style="margin-right: 10px;">设备信息</h3>
          <a-switch checked-children="开" un-checked-children="关" @change="selectedCarinfo" :checked="carInfoFrame" />
        </div>
        <a-form :form="carInfo" v-show="carInfoFrame" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSaveSubmit">
          <a-form-item class="hidden">
            <a-input v-decorator="['Id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['createTime']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['requirementId']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item class="hidden">
            <a-input v-decorator="['status']" hidden="hidden"></a-input>
          </a-form-item>
          <a-row>
            <a-col :span="12">
              <a-form-item label="设备主姓名">
                <a-input
                  v-decorator="['deviceOwner', {rules: [
                    { required: true, message: '设备主姓名不能为空' }
                  ]}]"
                  placeholder="请输入设备主姓名"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="设备类型">
                <a-select
                  v-decorator="['deviceType', {rules: [
                    { required: true, message: '设备类型不能为空' }
                  ]}]"
                  placeholder="请选择设备类型"
                >
                  <a-select-option value="挖掘机械">挖掘机械</a-select-option>
                  <a-select-option value="起重机械">起重机械</a-select-option>
                  <a-select-option value="装载机械">装载机械</a-select-option>
                  <a-select-option value="隧道机械">隧道机械</a-select-option>
                  <a-select-option value="打桩机械">打桩机械</a-select-option>
                  <a-select-option value="自卸车">自卸车</a-select-option>
                  <a-select-option value="叉车">叉车</a-select-option>
                  <a-select-option value="运输车">运输车</a-select-option>
                  <a-select-option value="混凝土机械">混凝土机械</a-select-option>
                  <a-select-option value="路面机械">路面机械</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="设备型号">
                <a-select
                  v-decorator="['model', {rules: [
                    { required: true, message: '设备型号不能为空' }
                  ]}]"
                  placeholder="请选择设备型号"
                >
                  <a-select-option value="正铲挖掘机">正铲挖掘机</a-select-option>
                  <a-select-option value="轮式挖掘机">轮式挖掘机</a-select-option>
                  <a-select-option value="船式挖掘机">船式挖掘机</a-select-option>
                  <a-select-option value="反铲挖掘机">反铲挖掘机</a-select-option>
                  <a-select-option value="履带挖掘机">履带挖掘机</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="机械品牌">
                <a-input
                  v-decorator="['brand', {rules: [
                    { required: true, message: '机械品牌不能为空' }
                  ]}]"
                  placeholder="请输入机械所属品牌"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="机械型号">
                <a-input
                  v-decorator="['mechanical', {rules: [
                    { required: true, message: '机械型号不能为空' }
                  ]}]"
                  placeholder="请输入机械型号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="设备初始位置">
                <a-input
                  disabled
                  v-decorator="['locate', {rules: [
                    { required: false, message: '' }
                  ]}]"
                  placeholder="请输入设备地理位置"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="出厂日期">
                <a-date-picker
                  disabled
                  placeholder="请选择出厂日期"
                  v-decorator="['productionDate ', {rules: [
                    { required: false, message: '' }
                  ]}]"
                  format="YYYY-MM-DD"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="其他说明" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                <a-textarea
                  placeholder="请输入"
                  v-decorator="['instruction', {rules: [
                    { required: false, message: '请输入' }
                  ]}]"
                  :autoSize="{ minRows: 3 }"
                >
                </a-textarea>
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
        title="查看设备需求"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions title="基本信息" size="small" bordered :column="4">
          <a-descriptions-item label="真实姓名" :span="2">
            {{ readListData.requirement.deviceOwner }}
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="2">
            {{ readListData.requirement.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="项目名称" :span="4">
            {{ readListData.requirement.projectName }}
          </a-descriptions-item>
          <a-descriptions-item label="工程所在地" :span="4">
            {{ readListData.requirement.location }}
          </a-descriptions-item>
          <a-descriptions-item label="关联合同" :span="4">
            {{ readListData.requirement.contract }}
          </a-descriptions-item>
          <a-descriptions-item label="流水号" :span="4">
            {{ readListData.requirement.id }}
            <a-icon type="copy" @click="copyId(readListData.requirement.id)" />
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="租用信息" size="small" bordered :column="4">
          <a-descriptions-item label="设备日单价" :span="2">
            {{ readListData.requirement.rent }}（{{ readListData.requirement.unit }}）
          </a-descriptions-item>
          <a-descriptions-item label="结算方式" :span="2">
            {{ readListData.requirement.payType }}
          </a-descriptions-item>
          <a-descriptions-item label="租赁周期" :span="4">
            {{ readListData.requirement.startDate + '-' + readListData.requirement.endDate }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions
          v-if="readListData.account"
          style="margin-top: 20px;"
          title="银行信息"
          size="small"
          bordered
          :column="4"
        >
          <a-descriptions-item label="银行账号" :span="2">
            {{ readListData.account.account }}
          </a-descriptions-item>
          <a-descriptions-item label="开户银行" :span="2">
            {{ readListData.account.bank }}
          </a-descriptions-item>
          <a-descriptions-item label="银行卡所属省份" :span="2">
            {{ readListData.account.province }}
          </a-descriptions-item>
          <a-descriptions-item label="银行卡所属城市" :span="2">
            {{ readListData.account.city }}
          </a-descriptions-item>
          <a-descriptions-item label="银行卡所属支行" :span="2">
            {{ readListData.account.accountHolder }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions
          v-if="readListData.deviceInfo"
          style="margin-top: 20px;"
          title="设备信息"
          size="small"
          bordered
          :column="4"
        >
          <a-descriptions-item label="设备主姓名" :span="2">
            {{ readListData.deviceInfo.deviceOwner }}
          </a-descriptions-item>
          <a-descriptions-item label="设备类型" :span="2">
            {{ readListData.deviceInfo.deviceType }}
          </a-descriptions-item>
          <a-descriptions-item label="设备型号" :span="2">
            {{ readListData.deviceInfo.model }}
          </a-descriptions-item>
          <a-descriptions-item label="机械品牌" :span="2">
            {{ readListData.deviceInfo.brand }}
          </a-descriptions-item>
          <a-descriptions-item label="机械型号" :span="2">
            {{ readListData.deviceInfo.mechanical }}
          </a-descriptions-item>
          <a-descriptions-item label="出厂日期" :span="2">
            {{ readListData.deviceInfo.productionDate }}
          </a-descriptions-item>
          <a-descriptions-item label="设备初始位置" :span="4">
            {{ readListData.deviceInfo.locate }}
          </a-descriptions-item>
          <a-descriptions-item label="其他说明" :span="4">
            {{ readListData.deviceInfo.instruction }}
          </a-descriptions-item>
          <a-descriptions-item label="机械整机照片" :span="2">
            <viewer class="imgBox" :images="[readListData.deviceInfo.devicePhoto1]" v-if="readListData.deviceInfo.devicePhoto1">
              <img
                :src="readListData.deviceInfo.devicePhoto1"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="机械产品铭牌" :span="2">
            <viewer class="imgBox" :images="[readListData.deviceInfo.nameplate]" v-if="readListData.deviceInfo.nameplate">
              <img
                :src="readListData.deviceInfo.nameplate"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="机械合格证照片" :span="2">
            <viewer class="imgBox" :images="[readListData.deviceInfo.certificate]" v-if="readListData.deviceInfo.certificate">
              <img
                :src="readListData.deviceInfo.certificate"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="机械正面照" :span="2">
            <viewer class="imgBox" :images="[readListData.deviceInfo.devicePhoto2]" v-if="readListData.deviceInfo.devicePhoto2">
              <img
                :src="readListData.deviceInfo.devicePhoto2"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="机械背面照" :span="2">
            <viewer class="imgBox" :images="[readListData.deviceInfo.devicePhoto3]" v-if="readListData.deviceInfo.devicePhoto3">
              <img
                :src="readListData.deviceInfo.devicePhoto3"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="机械侧面照" :span="2">
            <viewer class="imgBox" :images="[readListData.deviceInfo.devicePhoto4]" v-if="readListData.deviceInfo.devicePhoto4">
              <img
                :src="readListData.deviceInfo.devicePhoto4"
              >
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
    <!-- 设备巡查部分 -->
    <div class="check_div">
      <a-drawer
        width="80%"
        @close="onRecordDrawerClose"
        title="设备巡查"
        :visible="recordDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions title="设备信息">
          <a-descriptions-item label="设备主姓名">
            {{ recordDeviceInfo.deviceOwner }}
          </a-descriptions-item>
          <a-descriptions-item label="设备类型">
            {{ recordDeviceInfo.deviceType }}
          </a-descriptions-item>
          <a-descriptions-item label="设备型号">
            {{ recordDeviceInfo.model }}
          </a-descriptions-item>
          <a-descriptions-item label="机械品牌">
            {{ recordDeviceInfo.brand }}
          </a-descriptions-item>
          <a-descriptions-item label="机械型号">
            {{ recordDeviceInfo.mechanical }}
          </a-descriptions-item>
          <a-descriptions-item label="机械初始位置">
            {{ recordDeviceInfo.locate }}
          </a-descriptions-item>
          <a-descriptions-item label="出厂日期">
            {{ recordDeviceInfo.productionDate }}
          </a-descriptions-item>
          <a-descriptions-item label="其他说明">
            {{ recordDeviceInfo.instruction }}
          </a-descriptions-item>
          <a-descriptions-item>
            &nbsp;
          </a-descriptions-item>
          <a-descriptions-item label="机械扫描件 预览图（点击查看大图）">
            <viewer class="imgBox" :images="[recordDeviceInfo.nameplate,recordDeviceInfo.certificate]">
              <img class="img" :src="recordDeviceInfo.nameplate" />
              <img class="img" :src="recordDeviceInfo.certificate" />
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="设备整机信息">
          <a-descriptions-item label="机械扫描件">
            <viewer class="imgBox" :images="[recordDeviceInfo.devicePhoto1,recordDeviceInfo.devicePhoto2,recordDeviceInfo.devicePhoto3,recordDeviceInfo.devicePhoto4,]">
              <img class="img" :src="recordDeviceInfo.devicePhoto1" />
              <img class="img" :src="recordDeviceInfo.devicePhoto2" />
              <img class="img" :src="recordDeviceInfo.devicePhoto3" />
              <img class="img" :src="recordDeviceInfo.devicePhoto4" />
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <h3><strong>巡查记录</strong></h3>
        <a-table :columns="recordColumns" :data-source="recordData" :pagination="false">
          <viewer class="imgBox" slot-scope="text, record" slot="photo1" :images="[record.photo1]">
            <img :src="record.photo1" />
          </viewer>
          <viewer class="imgBox" slot-scope="text, record" slot="photo2" :images="[record.photo2]">
            <img :src="record.photo2" />
          </viewer>
          <viewer class="imgBox" slot-scope="text, record" slot="photo3" :images="[record.photo3]">
            <img :src="record.photo3" />
          </viewer>
          <viewer class="imgBox" slot-scope="text, record" slot="photo4" :images="[record.photo4]">
            <img :src="record.photo4" />
          </viewer>
        </a-table>
      </a-drawer>
    </div>
    <!-- 批量倒入部分 -->
    <div class="add_div">
      <a-drawer
        :width="800"
        @close="onClose2"
        title="批量倒入设备"
        :visible="importDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px',
          width: '600px',
          margin: '0 auto'
        }"
      >
      <div>
      操作说明：
      <br />
      1、点击下面的模板进行模板文件下载。
      <br />
      2、打开所下载的模板excel文件,保持文件的格式不变,往文件添加需求。
      <br />
      3、将添加好的excel文件点击下面上传excel按钮进行文件上传。
      <br />
      </div>
      <div style="margin-top:50px">
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSaveSubmit">
          <a-row>
            <a-col :span="12">
              <a-form-item label="关联合同">
                <a-input
                  v-decorator="['contract', {rules: [
                    { required: true, message: '关联合同不能为空' }
                  ]}]"
                  placeholder="请输入关联合同"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" class="chiose_contract_btn">
              <a-button type="primary" @click="handleChioseContract">+ 选择合同</a-button>
            </a-col>
            <!-- 选择合同modal弹框 -->
            <div class="chiose_contract_box">
              <a-modal
                :visible="chioseContractVisible"
                :footer="null"
                @cancel="closeChioseContractModal"
                title="选择合同"
                width="50%"
              >
                <s-table
                  :columns="chioseContractColumns"
                  :data="chioseContractData"
                  :pagination="chioseContractPagination"
                  :rowKey="record => record.key"
                  ref="table"
                >
                  <template slot="operation" slot-scope="text, record">
                    <a @click="handleChiose(record)">
                      选择
                    </a>
                  </template>
                </s-table>
              </a-modal>
            </div>
          </a-row>
        <a-row>
          <a-form-item label="导入文件">
            <a-upload
              name="file"
              :multiple="true"
              :headers="headers"
              :fileList="downloadFiles"
              :customRequest="downloadFilesCustomRequest"
            >
              <a-button type="primary" size="small"> <a-icon type="upload" /> 上传excel </a-button>
            </a-upload>
          </a-form-item>
        </a-row>
      </a-form>
      </div>
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
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose2">
            取消
          </a-button>
          <a-button type="primary" html-type="submit" @click="handleSaveSubmit2" :disabled="saveDisabled">保存</a-button>
        </div>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import moment from 'moment'
import UploadImgGroup from '@/components/UploadImgGroup'
import { STable } from '@/components'
import { findBizEnterpriseDeviceRequirementPage, getBizEnterpriseDeviceRequirement, getDeviceRecord, saveBizEnterpriseDeviceRequirement, removeBizEnterpriseDeviceRequirement, platformAuditPass, platformAuditReject, enterpriseAuditPass, enterpriseAuditReject } from '@/api/bizEnterpriseDeviceRequirement.js'
import { getfindBizContractPage, uploadDeviceOrderExcel } from '@/api/bizContract'
import { formatTime } from '@/utils/util'
import { baseUrl } from '@/utils/util.js'
// 引入权限数据
import { mapState } from 'vuex'

export default {
  components: {
    STable,
    UploadImgGroup
	},
  data () {
    return {
      fileList: [],
      downloadFiles: [],
      importDrawerVisible: false, // 导入抽屉的可见性
      searchForm: this.$form.createForm(this), // 搜索表单
      form: this.$form.createForm(this), // 添加表单
      bankInfo: this.$form.createForm(this), // 银行信息添加表单
      carInfo: this.$form.createForm(this), // 车辆信息添加表单
      addDrawerTitle: '', // 添加、修改抽屉的标题
      addDrawerVisible: false, // 添加、修改抽屉的可见性
      saveDisabled: false, // 设置保存按钮是否可操作
      saveDivVisible: true, // 设置保存按钮所在操作栏的可见性
      readDrawerVisible: false, // 查看抽屉的可见性
      recordDrawerVisible: false, // 设备巡查的可见性
      chioseContractVisible: false, // 选择合同modal弹框的可见性
      contractId: '',
      readListData: {
        requirement: {},
        deviceInfo: {},
        account: {}
      }, // 存放查看信息的数组
      predictRent: '100',
      param: {},
      actionList: {}, // 权限按钮
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
       // 上传时的头部信息
      headers: {
        authorization: 'authorization-text'
      },
      startDate: '',
      endDate: '',
      priceRange: [
        { id: '0', price: '0-10万', rent: '100' },
        { id: '1', price: '12-20万', rent: '150' },
        { id: '2', price: '20-40万', rent: '300' },
        { id: '3', price: '40-60万', rent: '450' },
        { id: '4', price: '60-80万', rent: '600' },
        { id: '5', price: '80-100万', rent: '750' },
        { id: '6', price: '100-120万', rent: '900' },
        { id: '7', price: '120万以上', rent: '1200' }
      ],
      bankInfoFrame: false, // 默认选填银行信息为关闭状态
      carInfoFrame: false, // 默认选填车辆信息为关闭状态
      // 行驶证正副本照片、商业险、交强险保单照片, 渲染
      picList: [
        { name: '机械整机照片', typeName: 'devicePhoto1', fileLists: [] },
        { name: '机械产品铭牌', typeName: 'nameplate', fileLists: [] },
        { name: '机械合格证照片', typeName: 'certificate', fileLists: [] },
        { name: '机械正面照', typeName: 'devicePhoto2', fileLists: [] },
        { name: '机械背面照', typeName: 'devicePhoto3', fileLists: [] },
        { name: '机械侧面照', typeName: 'devicePhoto4', fileLists: [] }
      ],
      // 存放行驶证正副本照片、商业险、交强险保单照片路径
      imageInfo: {
        devicePhoto1: [],
        devicePhoto2: [],
        devicePhoto3: [],
        devicePhoto4: [],
        nameplate: [],
        certificate: []
      },
      queryParam: {},
      columns: [
        {
          title: '设备类型',
          dataIndex: 'deviceType',
          key: 'type',
          align: 'center',
          ellipsis: true
        },
        {
          title: '设备型号',
          dataIndex: 'model',
          key: 'model',
          align: 'center',
          ellipsis: true
        },
        {
          title: '设备主姓名',
          dataIndex: 'deviceOwner',
          key: 'deviceOwner',
          align: 'center',
          ellipsis: true
        },
        // {
        //   title: '联系电话',
        //   dataIndex: 'phone',
        //   key: 'phone',
        //   align: 'center',
        //   ellipsis: true
        // },
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '设备日单价',
          dataIndex: 'rent',
          key: 'rent',
          align: 'center',
          ellipsis: true
        },
        {
          title: '结算方式',
          dataIndex: 'payType',
          key: 'payType',
          align: 'center',
          ellipsis: true
        },
        {
          title: '周期',
          dataIndex: 'totalDuration',
          key: 'totalDuration',
          align: 'center',
          ellipsis: true,
          scopedSlots: { customRender: 'totalDuration' }
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
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findBizEnterpriseDeviceRequirementPage(parameter).then(res => {
          return res.result
        })
      },
      // 选择合同弹框————表
      chioseContractPagination: {
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
      chioseContractColumns: [
        {
          title: '合同编号',
          dataIndex: 'contractCode',
          key: 'contractCode',
          align: 'center'
          // ellipsis: true
        },
        {
          title: '租赁公司名称',
          dataIndex: 'serviceEnterpriseName',
          key: 'serviceEnterpriseName',
          align: 'center'
          // ellipsis: true
        },
        {
          title: '企业名称',
          dataIndex: 'enterpriseName',
          key: 'enterpriseName',
          align: 'center'
          // ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          key: 'operation',
          // fixed: 'right',
          align: 'center'
        }
      ],
      chioseContractData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getfindBizContractPage(parameter).then(res => {
          return res.result
        })
      },
      // 巡查记录表头
      recordColumns: [
        {
          title: '记录时间',
          dataIndex: 'recordDate',
          key: 'recordDate'
        },
        {
          title: '定位',
          dataIndex: 'recordLocate',
          key: 'recordLocate'
        },
        {
          title: '机械照片1',
          dataIndex: 'photo1',
          key: 'photo1',
          scopedSlots: { customRender: 'photo1' }
        },
        {
          title: '机械照片2',
          dataIndex: 'photo2',
          key: 'photo2',
          scopedSlots: { customRender: 'photo2' }
        },
        {
          title: '工地照片1',
          dataIndex: 'photo3',
          key: 'photo3',
          scopedSlots: { customRender: 'photo3' }
        },
        {
          title: '工地照片2',
          dataIndex: 'photo4',
          key: 'photo4',
          scopedSlots: { customRender: 'photo4' }
        }
      ],
      // 巡查记录表体
      recordData: [],
      // 巡查记录基本信息
      recordDeviceInfo: {},
      startTime: '', // 开始时间
      endTime: '' // 结束时间
    }
  },
  created () {
    // 权限按钮显示
    const pathPermissionId = this.$route.path.split('/').pop()
    let btnPermission = this.roles.permissions.filter(v => v.permissionId === pathPermissionId)
    btnPermission = btnPermission[0].actionList
    btnPermission.forEach(v => {
      if (v === 'add') {
        this.actionList.add = 1
      } else if (v === 'get') {
        this.actionList.get = 1
      } else if (v === 'update') {
        this.actionList.update = 1
      } else if (v === 'delete') {
        this.actionList.delete = 1
      }
    })
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    }),
     // 基础路径
    baseURL () {
      return baseUrl()
    }
  },
  watch: {
    // predictRent () {
    //   this.countTatolPrice()
    // }
  },
  methods: {
    // 平台审核通过
    handlePlatformApproved (id) {
      var _this = this
      this.$confirm({
        title: '确定通过平台审核',
        onOk () {
          platformAuditPass({
            id: id
          }).then(res => {
            if (res.code === 1) {
              _this.$refs.table.refresh(true)
              _this.$message.success('平台审核成功')
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 平台审核不通过
    handlePlatformUnApproved (id) {
      var _this = this
      this.$confirm({
        title: '平台确定驳回',
        onOk () {
          platformAuditReject({
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
    },
     downloadFilesCustomRequest (data) {
      var fd = new FormData()
      fd.append('file', data.file)
      
       this.form.validateFields((err, values) => {
        if (!err) {
          alert(values.contract)
          fd.append('id',values.contract)
         uploadDeviceOrderExcel(fd).then(res => {      
          alert(res.message)      
        })
        }
       })
    },
    // 上传附件
    handleChange (info) {
      this.fileList = info.fileList
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
    beforeUpload (file) {
      return new Promise((resolve, reject) => {
        const isPDF = file.type === 'application/pdf'
        if (!isPDF) {
          this.$message.error('您只能上传PDF文件!')
          return reject(new Error('您只能上传PDF文件'))
        }
        // const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isLt2M) {
        //   this.$message.error('文件大小不能超过2MB!')
        //   return reject(new Error('文件大小不能超过2MB'))
        // }
        return resolve(true)
      })
    },
    // 企业审核通过
    handleEnterpriseApproved (id) {
      var _this = this
      this.$confirm({
        title: '确定通过企业审核',
        onOk () {
          enterpriseAuditPass({
            id: id
          }).then(res => {
            if (res.code === 1) {
              _this.$refs.table.refresh(true)
              _this.$message.success('企业审核成功')
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 企业审核不通过
    handleEnterpriseUnApproved (id) {
      var _this = this
      this.$confirm({
        title: '企业确定驳回',
        onOk () {
          enterpriseAuditReject({
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
    },
    /* // 审核通过
    handleApproved (id) {
      // var _this = this
      // this.$message.success('审核通过')
      this.$confirm({
        title: '确定通过审核',
        onOk () {
          // auditPassRequirement({
          //   id: id
          // }).then(res => {
          //   console.log(res)
          //   if (res.code === 1) {
          //     _this.$refs.table.refresh(true)
          //     _this.$message.success('审核成功')
          //   } else {
          //     _this.$message.error(res.message)
          //   }
          // })
        }
      })
    },
    // 审核不通过
    handleUnApproved (id) {
      // var _this = this
      // this.$message.success('审核通过')
      // this.$confirm({
      //   title: '确定驳回',
      //   onOk () {
      //     rejectRequirement({
      //       id: id
      //     }).then(res => {
      //       console.log(res)
      //       if (res.code === 1) {
      //         _this.$refs.table.refresh(true)
      //         _this.$message.success('驳回成功')
      //       } else {
      //         _this.$message.error(res.message)
      //       }
      //     })
      //   }
      // })
    }, */
    // 价格区间选中事件
    /* handleCarPriceSelected (val) {
      const index = this.priceRange.findIndex(v => v.id === val)
      this.predictRent = this.priceRange[index].rent
    },
    计算租用总金额和总周期
    countTatolPrice () {
      var data = this.form.getFieldsValue(['period', 'duration', 'rent'])
      // 判断租用总月数和结算周期是否不为空
      if (data.period && data.duration) {
        // 计算总周期
        const totalPeriod = data.duration / data.period
        // 初始化租用总金额为0
        var totalRent = 0
        // 判断总周期是否为整数
        if (totalPeriod % 1 !== 0) {
          this.$message.error('合同总月数除以结算周期必须是个整数')
          return
        }
        // 是整数的话赋值回val对象中
        data.totalPeriod = totalPeriod
        // 判断租金是否为空
        if (data.rent) {
          // 计算总租金
          totalRent = data.rent * totalPeriod
          data.totalRent = totalRent
          data.totalDuration = Math.ceil(data.rent / this.predictRent)
        }
        // 给总周期和总租金赋值
        this.form.setFieldsValue(pick(data, 'totalPeriod', 'totalRent', 'totalDuration'))
      } else {
        this.form.setFieldsValue({ totalPeriod: 0 })
      }
    }, */
    // 给日期组件赋值的初始方法
    moment,
    // 获取图片地址
    getImageList (data) {
      // 获取图片对应的元素信息
      const imgList = {
        devicePhoto1: this.$refs.devicePhoto1,
        devicePhoto2: this.$refs.devicePhoto2,
        devicePhoto3: this.$refs.devicePhoto3,
        devicePhoto4: this.$refs.devicePhoto4,
        nameplate: this.$refs.nameplate,
        certificate: this.$refs.certificate
      }
      // 获取上传图片组件的fileList并存入
      var list = {}

      for (var i in imgList) {
        list[i] = imgList[i][0].fileList
      }

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
    },
    // 打开或关闭银行信息选填栏
    selectedBackinfo (val) {
      this.bankInfoFrame = val
    },
    // 打开或关闭车辆信息选填栏
    selectedCarinfo (val) {
      this.carInfoFrame = val
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
      // 阻止默认事件
      e.preventDefault()
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              deviceOwner: values.searchDeviceOwner,
              // phone: values.searchPhone,
              status: values.rentStatus,
              deviceType: values.deviceType,
              startTime: this.startTime,
              endTime: this.endTime
            }
          }
          // 把entity存入queryParam中
          Object.assign(this.queryParam, param)
          // 重新刷新表格
          this.$refs.table.refresh(true)
        } else {
          console.err('error', err)
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
      this.addDrawerTitle = '添加设备需求'
      this.addDrawerVisible = true
    },
    handleImport () {
      this.importDrawerVisible = true
    },
    // 修改按钮
    handleEdit (record) {
      getBizEnterpriseDeviceRequirement({ id: record.id }).then(res => {
        if (res.code === 1) {
          this.addDrawerVisible = true
          this.addDrawerTitle = '修改设备需求'
          const { account, deviceInfo, requirement } = res.result
          this.$nextTick(() => {
              // 给日期组件赋值
            this.form.setFieldsValue({
              totalDuration: [ moment(requirement.startDate, 'YYYY-MM'), moment(requirement.endDate, 'YYYY-MM') ]
            })
            // 给其他字段赋值
            requirement.isLongTerm = requirement.isLongTerm === 0
            this.form.setFieldsValue(pick(requirement, 'id', 'projectName', 'contract', 'deviceOwner', 'location', 'phone', 'rent', 'totalDuration', 'payType', 'isLongTerm', 'unit'))
          })
          // 判断银行信息是否存在
          if (account) {
            // 如果存在则打开开关显示
            this.bankInfoFrame = true
            this.$nextTick(() => {
              this.bankInfo.setFieldsValue(pick(account, 'id', 'account', 'accountHolder', 'bank', 'city', 'province', 'requirementId', 'type', 'createTime', 'status'))
            })
          }
          // 判断设备信息是否存在
          if (deviceInfo) {
            // 如果存在则打开开关
            this.carInfoFrame = true
            this.$nextTick(() => {
              this.carInfo.setFieldsValue(pick(deviceInfo, 'Id', 'id', 'brand', 'createTime', 'deviceOwner', 'deviceType', 'locate', 'mechanical', 'model', 'productionDate', 'requirementId', 'status', 'instruction'))
              var devicePhoto1, devicePhoto2, devicePhoto3, devicePhoto4, nameplate, certificate
              if (deviceInfo.devicePhoto1) {
                this.imageInfo.devicePhoto1 = [deviceInfo.devicePhoto1]
                devicePhoto1 = [{
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: deviceInfo.devicePhoto1
                }]
              } else {
                devicePhoto1 = []
              }
              if (deviceInfo.devicePhoto2) {
                this.imageInfo.devicePhoto2 = [deviceInfo.devicePhoto2]
                devicePhoto2 = [{
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: deviceInfo.devicePhoto2
                }]
              } else {
                devicePhoto2 = []
              }
              if (deviceInfo.devicePhoto3) {
                this.imageInfo.devicePhoto3 = [deviceInfo.devicePhoto3]
                devicePhoto3 = [{
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: deviceInfo.devicePhoto3
                }]
              } else {
                devicePhoto3 = []
              }
              if (deviceInfo.devicePhoto4) {
                this.imageInfo.devicePhoto4 = [deviceInfo.devicePhoto4]
                devicePhoto4 = [{
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: deviceInfo.devicePhoto4
                }]
              } else {
                devicePhoto4 = []
              }
              if (deviceInfo.nameplate) {
                this.imageInfo.nameplate = [deviceInfo.nameplate]
                nameplate = [{
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: deviceInfo.nameplate
                }]
              } else {
                nameplate = []
              }
              if (deviceInfo.certificate) {
                this.imageInfo.certificate = [deviceInfo.certificate]
                certificate = [{
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: deviceInfo.certificate
                }]
              } else {
                devicePhoto4 = []
              }
              this.picList = [
                { name: '机械整机照片', typeName: 'devicePhoto1', fileLists: devicePhoto1 },
                { name: '机械产品铭牌', typeName: 'nameplate', fileLists: nameplate },
                { name: '机械合格证照片', typeName: 'certificate', fileLists: certificate },
                { name: '机械正面照', typeName: 'devicePhoto2', fileLists: devicePhoto2 },
                { name: '机械背面照', typeName: 'devicePhoto3', fileLists: devicePhoto3 },
                { name: '机械侧面照', typeName: 'devicePhoto4', fileLists: devicePhoto4 }
              ]
            })
          }
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 保存按钮
    handleSaveSubmit2 () {
     var fd = new FormData()
      this.form.validateFields((err, values) => {
        if (!err) {
           fd.append('file', data.file)
           alert(data.file.contract)
          uploadDeviceOrderExcel(fd,values).then(res => {
          alert(res.message)
         })
        }
      })
    },
    handleSaveSubmit () {
      this.saveDisabled = true
      this.form.validateFields((err, val) => {
        if (!err) {
          // 判断联系电话格式是否正确
          if (val.phone && !(/^1[3456789]\d{9}$/.test(val.phone))) {
            this.$message.error('联系电话有误，请重填')
            this.saveDisabled = false
            return
          }
          // 初始化一个变量为true, 以便后续需要return结束函数
          var check = true
          const param = {}
          // 基本信息
          param.requirement = { ...val }
          param.requirement.startDate = formatTime(param.requirement.totalDuration[0])
          param.requirement.endDate = formatTime(param.requirement.totalDuration[1])
          param.requirement.isLongTerm = param.requirement.isLongTerm ? 0 : 1
          delete param.requirement.totalDuration
          if (!param.requirement.id) delete param.requirement.id
          // 判断银行信息块是否有打开填写
          if (this.bankInfoFrame) {
            // 如果有则校验时候有填写必填字段
            this.bankInfo.validateFields((err2, val2) => {
              if (!err2) {
                // 必填字段都有填写则添加到请求参数里
                param.requirementAccount = { ...val2 }
                param.requirementAccount.status = 1
                if (!param.requirementAccount.id) delete param.requirementAccount.id
              } else {
                // 如果必填字段没有全部填写则给check赋值为false，在请求前return函数
                console.err(err2)
                check = false
              }
            })
          }
          // 判断设备信息块是否打开
          if (this.carInfoFrame) {
            // 如果打开则验证必填字段
            this.carInfo.validateFields((err3, val3) => {
              if (!err3) {
                // 解构三组图片所对应的数据，数组值对应着图片路径
                // 解构各个图片对应的数组
                const { devicePhoto1, devicePhoto2, devicePhoto3, devicePhoto4, nameplate, certificate } = this.imageInfo
                param.deviceInfo = { ...val3 }
                // 给请求参数赋值，图片路径存在时存路径，不存在时存空串
                // 把图片路径赋值给对应的请求字段
                param.deviceInfo.devicePhoto1 = devicePhoto1[0] || ''
                param.deviceInfo.devicePhoto2 = devicePhoto2[0] || ''
                param.deviceInfo.devicePhoto3 = devicePhoto3[0] || ''
                param.deviceInfo.devicePhoto4 = devicePhoto4[0] || ''
                param.deviceInfo.nameplate = nameplate[0] || ''
                param.deviceInfo.certificate = certificate[0] || ''
                param.deviceInfo.status = 1
                if (!param.deviceInfo.id) delete param.deviceInfo.id
                // param.requirement.inspectionDate = formatTime(val.inspectionDate._d)
              } else {
                // 如果必填字段没有全部填写则给check赋值为false，在请求前return函数
                console.err(err3)
                check = false
              }
            })
          }
          // 如果为false则有必填字段没填写完全，打断函数
          if (!check) {
            this.saveDisabled = false
            return
          }
          // 保存数据
          saveBizEnterpriseDeviceRequirement(param).then(res => {
            if (res.code === 1) {
              // 成功提示信息
              this.$message.success('保存成功')
              // 刷新表格
              this.$refs.table.refresh(true)
              // 保存后清除之前保存的路径，即重新初始化
              this.imageInfo = {
                devicePhoto1: [],
                devicePhoto2: [],
                devicePhoto3: [],
                devicePhoto4: [],
                deviceOwner: [],
                certificate: []
              }
              // 关闭页面
              this.onClose()
            } else {
              this.$message.error(res.message)
            }
            // 不管请求是否成功与失败都恢复保存按钮
            this.saveDisabled = false
          })
        } else {
          console.err(err)
          this.saveDisabled = false
        }
      })
    },
    // 设备巡查按钮
    handleRecord (record) {
      getDeviceRecord({ id: record.id }).then(res => {
        if (res.code === 1 && res.result.deviceInfo) {
          this.recordDrawerVisible = true
          this.recordDeviceInfo = res.result.deviceInfo
          this.recordData = res.result.records
        } else {
          this.$message.info('未获取到该设备需求信息')
        }
      })
    },
    // 查看按钮
    handleRead (record) {
      getBizEnterpriseDeviceRequirement({ id: record.id }).then(res => {
        if (res.code === 1) {
          this.readListData = JSON.parse(JSON.stringify(res.result))
        } else {
          this.$message.error(res.result)
        }
      })
      this.readDrawerVisible = true
    },
    // 删除按钮
    handleDelete (key) {
      removeBizEnterpriseDeviceRequirement({ id: key.id }).then(res => {
        if (res.code === 1) {
          this.$message.success('删除成功')
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 取消删除按钮
    handleCancelDeletion () {
      this.$message.info('已取消删除')
    },
    onClose2 () {
      this.importDrawerVisible = false
    },
    // 关闭添加修改抽屉按钮
    onClose () {
      // 重置图片
      this.picList = [
        { name: '机械整机照片', typeName: 'devicePhoto1', fileLists: [] },
        { name: '机械产品铭牌', typeName: 'nameplate', fileLists: [] },
        { name: '机械合格证照片', typeName: 'certificate', fileLists: [] },
        { name: '机械正面照', typeName: 'devicePhoto2', fileLists: [] },
        { name: '机械背面照', typeName: 'devicePhoto3', fileLists: [] },
        { name: '机械侧面照', typeName: 'devicePhoto4', fileLists: [] }
      ]
      // 关闭抽屉
      this.addDrawerVisible = false
      // 重置三个表单的信息
      this.form.resetFields()
      this.bankInfo.resetFields()
      this.carInfo.resetFields()
      // 关闭两个信息块
      this.bankInfoFrame = false
      this.carInfoFrame = false
      this.predictRent = '100'
    },
    // 关闭查看抽屉按钮
    onReadDrawerClose () {
      this.readDrawerVisible = false
      this.form.resetFields()
    },
    // 关闭设备巡查按钮
    onRecordDrawerClose () {
      this.recordDrawerVisible = false
      this.form.resetFields()
    },
    // 点击选择合同按钮——打开选择合同弹框
    handleChioseContract () {
      this.chioseContractVisible = true
    },
    // 点击选择按钮
    handleChiose (record) {
      const contractCode = record.contractCode
      this.form.setFieldsValue({ 'contract': contractCode })
      this.chioseContractVisible = false
    },
    // 关闭选择合同弹框
    closeChioseContractModal () {
      this.chioseContractVisible = false
    },
    // 复制流水号到粘贴板
    copyId (id) {
      this.$copyText(id).then(message => {
        this.$message.success('复制成功')
      }).catch(err => {
        console.log(err)
        this.$message.error('复制失败，请手动复制')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .bankInfo {
    margin-bottom: 15px;
  }
  .carInfo {
    margin-bottom: 0;
  }
  .bankInfo span,
  .carInfo span,
  .info span {
    vertical-align: middle;
    margin-right: 10px;
  }
  .imgBox {
    img {
      width: 100px;
    }
    .img + .img {
      margin-left: 20px;
    }
  }
  .rent_box {
    padding-top: 10px;
    padding-left: 10px;
    .rent {
      color: #FF5722;
      font-weight: bold;
    }
  }
  .chiose_contract_btn {
    padding-top: 3px;
    padding-left: 15px;
  }
  .hidden{
    display: none;
  }
  .table_div{
    .ant-divider{
      margin: 0 2px;
    }
  }
</style>

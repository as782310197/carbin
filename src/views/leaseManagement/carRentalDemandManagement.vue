<template>
  <a-card>
    <!-- 搜索部分 -->
    <div class="search_div">
      <a-form :form="searchForm" @submit="handleSearchSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="车主姓名">
              <a-input
                v-decorator="['carOwner']"
                placeholder="请输入车主姓名"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item label="联系电话">
              <a-input
                v-decorator="['phone']"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col> -->
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
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="车牌号">
              <a-input
                v-decorator="['carNumber']"
                placeholder="请输入车牌号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="状态">
              <a-select
                v-decorator="['status']"
                placeholder="请选择状态"
              >
                <a-select-option value="-2">平台审核不通过</a-select-option>
                <a-select-option value="0">待平台审核</a-select-option>
                <a-select-option value="1">待车主上传信息</a-select-option>
                <a-select-option value="2">待企业审核</a-select-option>
                <a-select-option value="3">待车主确认租约</a-select-option>
                <a-select-option value="4">审核不通过</a-select-option>
                <a-select-option value="5">出租中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8" :style="{ textAlign: 'center' }">
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
        <template slot="operation" slot-scope="text,record">
          <a @click="handleEdit(record)" v-if="actionList.update === 1">
            修改
          </a>
          <a-divider type="vertical" v-if="(actionList.update === 1 && actionList.get === 1) || actionList.get !== 1" />
          <a @click="handleRead(record)" v-if="actionList.get === 1">
            查看
          </a>
          <a-divider type="vertical" v-if="actionList.get === 1 || actionList.delete === 1" />
          <a-popconfirm
            title="您确定要删除吗?"
            @confirm="handleDelete(record)"
            @cancel="handleCancelDeletion"
            okText="确定"
            cancelText="取消"
            v-if="actionList.delete === 1"
          >
            <a href="javaScript:void(0)">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" v-if="record.status === 0" />
          <a-dropdown v-if="record.status === 0">
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
              <a-form-item label="真实姓名(车主)">
                <a-input
                  v-decorator="['carOwner', {rules: [
                    { required: true, message: '真实姓名(车主)不能为空' }
                  ]}]"
                  placeholder="请输入真实姓名(车主)"
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
              <a-form-item label="车牌号">
                <a-input
                  v-decorator="['carNumber', {rules: [
                    { required: true, message: '车牌号不能为空' }
                  ]}]"
                  placeholder="请输入车牌号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="状态">
                <a-select
                  v-decorator="['status', {
                    rules: [{ required: true, message: '请选择' }]
                  }]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">启用</a-select-option>
                  <a-select-option :value="0">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="价格区间">
                <a-select
                  v-decorator="['carPrice', {
                    initialValue: '0',
                    rules: [{ required: true, message: '请选择' }]
                  }]"
                  @select="handleCarPriceSelected"
                  placeholder="请选择"
                >
                  <a-select-option :value="item.id" v-for="item of priceRange" :key="item.id">{{ item.price }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4" class="rent_box">预计日租金:<span class="rent">{{ predictRent }}</span>元</a-col>
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
          <a-divider />
          <h3>租用信息</h3>
          <a-row>
            <a-col :span="12">
              <a-form-item label="结算周期">
                <a-input
                  v-decorator="['period', {rules: [
                    { required: true, message: '结算周期不能为空' }
                  ]}]"
                  placeholder="请输入结算周期"
                  @input="countTatolPrice"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="租用总金额">
                <a-input
                  v-decorator="['totalRent', {rules: [
                    { required: true, message: '租用总金额不能为空' }
                  ]}]"
                  placeholder="系统自动计算,租用总金额"
                  read-only
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="周期租金">
                <a-input
                  v-decorator="['rent', {rules: [
                    { required: true, message: '周期租金不能为空' }
                  ]}]"
                  placeholder="请输入周期租金"
                  @input="countTatolPrice"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="总周期">
                <a-input
                  v-decorator="['totalPeriod', {rules: [
                    { required: true, message: '总周期不能为空' }
                  ]}]"
                  placeholder="系统自动生成,合同总周期"
                  read-only
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="合同总月数">
                <a-input
                  v-decorator="['duration', {rules: [
                    { required: true, message: '合同总月数不能为空' }
                  ]}]"
                  placeholder="请输入合同总月数"
                  @input="countTatolPrice"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="租用天数">
                <a-input
                  v-decorator="['totalDuration', {rules: [
                    { required: true, message: '租用天数不能为空' }
                  ]}]"
                  placeholder="系统自动生成,一个租用周期租用天数"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="租赁开始月份">
                <a-month-picker
                  v-decorator="['start', {rules: [
                    { required: true, message: '租赁开始月份不能为空' }
                  ]}]"
                  placeholder="请选择月份"
                  style="width: 100%;"
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
          <a-form-item >
            <a-input v-decorator="['id']" hidden="hidden"></a-input>
          </a-form-item>
          <a-form-item >
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
            <a-col :span="12">
              <a-form-item label="开户银行">
                <a-input
                  v-decorator="['bank', {rules: [
                    { required: true, message: '开户银行不能为空' }
                  ]}]"
                  placeholder="请输入银行信息"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="银行卡所属省份">
                <a-input
                  v-decorator="['province', {rules: [
                    { required: true, message: '银行卡所属省份不能为空' }
                  ]}]"
                  placeholder="请输入银行信息"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="银行卡所属城市">
                <a-input
                  v-decorator="['city', {rules: [
                    { required: true, message: '银行卡所属城市不能为空' }
                  ]}]"
                  placeholder="请输入银行信息"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
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
        <!-- 车辆信息 选填 -->
        <div :class="carInfoFrame ? 'info' : 'carInfo'" style="display: flex; align-items: center;">
          <h3 style="margin-right: 10px;">车辆信息</h3>
          <a-switch checked-children="开" un-checked-children="关" @change="selectedCarinfo" :checked="carInfoFrame" />
        </div>
        <a-form :form="carInfo" v-show="carInfoFrame" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSaveSubmit">
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
        title="查看租车需求"
        :visible="readDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px'
        }"
      >
        <a-descriptions title="基本信息" size="small" bordered :column="4">
          <a-descriptions-item label="真实姓名(车主)" :span="2">
            {{ readListData.carOwner }}
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="2">
            {{ readListData.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="车牌号" :span="2">
            {{ readListData.carNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="状态" :span="2">
            {{ readListData.status === 1 ? '启用' : '禁用' }}
          </a-descriptions-item>
          <a-descriptions-item label="价格区间" :span="2">
            {{ readListData.carPrice }}
          </a-descriptions-item>
          <a-descriptions-item label="关联合同" :span="2">
            {{ readListData.contract }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="租用信息" size="small" bordered :column="4">
          <a-descriptions-item label="结算周期" :span="2">
            {{ readListData.period }}
          </a-descriptions-item>
          <a-descriptions-item label="租用总金额" :span="2">
            {{ readListData.totalRent }}
          </a-descriptions-item>
          <a-descriptions-item label="周期租金" :span="2">
            {{ readListData.rent }}
          </a-descriptions-item>
          <a-descriptions-item label="总周期" :span="2">
            {{ readListData.totalPeriod }}
          </a-descriptions-item>
          <a-descriptions-item label="合同总月数" :span="2">
            {{ readListData.duration }}
          </a-descriptions-item>
          <a-descriptions-item label="租用天数" :span="2">
            {{ readListData.totalDuration }}
          </a-descriptions-item>
          <a-descriptions-item label="租赁开始月份" :span="2">
            {{ readListData.start }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions
          v-if="readListData.requirementAccount"
          style="margin-top: 20px;"
          title="银行信息"
          size="small"
          bordered
          :column="4"
        >
          <a-descriptions-item label="银行账号" :span="2">
            {{ readListData.requirementAccount.account }}
          </a-descriptions-item>
          <a-descriptions-item label="开户银行" :span="2">
            {{ readListData.requirementAccount.bank }}
          </a-descriptions-item>
          <a-descriptions-item label="银行卡所属省份" :span="2">
            {{ readListData.requirementAccount.province }}
          </a-descriptions-item>
          <a-descriptions-item label="银行卡所属城市" :span="2">
            {{ readListData.requirementAccount.city }}
          </a-descriptions-item>
          <a-descriptions-item label="银行卡所属支行" :span="2">
            {{ readListData.requirementAccount.accountHolder }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions
          v-if="readListData.requirementCarInfo"
          style="margin-top: 20px;"
          title="车辆信息"
          size="small"
          bordered
          :column="4"
        >
          <a-descriptions-item label="车主姓名" :span="2">
            {{ readListData.requirementCarInfo.carOwner }}
          </a-descriptions-item>
          <a-descriptions-item label="车辆型号" :span="2">
            {{ readListData.requirementCarInfo.vehicleModel }}
          </a-descriptions-item>
          <a-descriptions-item label="车辆品牌" :span="2">
            {{ readListData.requirementCarInfo.brand }}
          </a-descriptions-item>
          <a-descriptions-item label="发动机号" :span="2">
            {{ readListData.requirementCarInfo.engineNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="车架号" :span="2">
            {{ readListData.requirementCarInfo.identifyNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="车辆使用油号" :span="2">
            {{ readListData.requirementCarInfo.oilType }}
          </a-descriptions-item>
          <a-descriptions-item label="年检日期" :span="2">
            {{ readListData.requirementCarInfo.inspectionDate }}
          </a-descriptions-item>
          <a-descriptions-item label="出租状态" :span="2">
            {{ readListData.requirementCarInfo.statusName }}
          </a-descriptions-item>
          <a-descriptions-item label="商业险保单" :span="2">
            <viewer class="imgBox" :images="readListData.requirementCarInfo.commercialInsurance" v-if="readListData.requirementCarInfo.commercialInsurance[0]">
              <img
                :src="readListData.requirementCarInfo.commercialInsurance"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="行驶证副本" :span="2">
            <viewer class="imgBox" :images="readListData.requirementCarInfo.drivingPermitBack" v-if="readListData.requirementCarInfo.drivingPermitBack[0]">
              <img
                :src="readListData.requirementCarInfo.drivingPermitBack"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="行驶证正本" :span="2">
            <viewer class="imgBox" :images="readListData.requirementCarInfo.drivingPermitFront" v-if="readListData.requirementCarInfo.drivingPermitFront[0]">
              <img
                :src="readListData.requirementCarInfo.drivingPermitFront"
              >
            </viewer>
          </a-descriptions-item>
          <a-descriptions-item label="交强险保单" :span="2">
            <viewer class="imgBox" :images="readListData.requirementCarInfo.insurance" v-if="readListData.requirementCarInfo.insurance[0]">
              <img
                :src="readListData.requirementCarInfo.insurance"
              >
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </div>
     <!-- 批量倒入部分 -->
    <div class="add_div">
      <a-drawer
        :width="800"
        @close="onClose2"
        title="批量倒入"
        :visible="importDrawerVisible"
        :bodyStyle="{
          paddingBottom: '80px',
          width: '600px',
          margin: '0 auto'
        }"
      >
        <a-descriptions title="批量导入车辆">
          <a-descriptions-item label="操作说明" span="3">
            1、上传文件需要与下载模板文件模板列一致。
            <br />
            2、若系统检查到异常情况,将会直接回滚本次所有操作,需要下载检查所在行,再进行上传。
            <br />
          </a-descriptions-item>
          <a-descriptions-item label="车辆表" span="3">
            <a href="http://boss.wangshuibao.com/api/uploadFiles/img_2020_11_20102118803.xlsx">
              <a-button icon="download" size="small">模板下载</a-button>
            </a>
          </a-descriptions-item>
          <a-descriptions-item label="上传文件" span="3">
            <a-upload
              name="file"
              :multiple="true"
              :headers="headers"
              :fileList="downloadFiles"
              :customRequest="downloadFilesCustomRequest"
            >
              <a-button type="primary" size="small"> <a-icon type="upload" /> 上传excel </a-button>
            </a-upload>
          </a-descriptions-item>

        </a-descriptions>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
// { findBizEnterpriseRequirementPage, findBizEnterpriseRequirement, removeBizEnterpriseRequirement, saveBizEnterpriseRequirement, rejectRequirement, auditPassRequirement }
import pick from 'lodash.pick'
import moment from 'moment'
import UploadImgGroup from '@/components/UploadImgGroup'
import { STable } from '@/components'
import { findBizEnterpriseRequirementPage, saveBizEnterpriseRequirement, removeBizEnterpriseRequirement, auditPassRequirement, rejectRequirement } from '@/api/bizEnterpriseRequirement.js'
import { getfindBizContractPage } from '@/api/bizContract'
// 引入权限数据
import { mapState } from 'vuex'

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
      chioseContractVisible: false, // 选择合同modal弹框的可见性
      readListData: {}, // 存放查看信息的数组
      predictRent: '100',
      actionList: {}, // 权限按钮
      pagination: { // 表格的分页设置
        showTotal: (total, range) => `第${range[0]}-${range[1]}条` + ` ` + `共 ${total} 条记录`
      },
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
        { name: '行驶证副本', typeName: 'drivingPermitBack', fileLists: [] },
        { name: '行驶证正本', typeName: 'drivingPermitFront', fileLists: [] },
        { name: '商业险保单', typeName: 'commercialInsurance', fileLists: [] },
        { name: '交强险保单', typeName: 'insurance', fileLists: [] }
      ],
      // 存放行驶证正副本照片、商业险、交强险保单照片路径
      imageInfo: {
        drivingPermitBack: [],
        drivingPermitFront: [],
        commercialInsurance: [],
        insurance: []
      },
      queryParam: {},
      columns: [
        {
          title: '车主姓名',
          dataIndex: 'carOwner',
          key: 'carOwner',
          align: 'center',
          ellipsis: true
        },
        {
          title: '车牌号',
          dataIndex: 'carNumber',
          key: 'carNumber',
          align: 'center',
          ellipsis: true
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
          ellipsis: true
        },
        {
          title: '合同总月数',
          dataIndex: 'duration',
          key: 'duration',
          align: 'center',
          ellipsis: true
        },
        {
          title: '周期租金',
          dataIndex: 'period',
          key: 'period',
          align: 'center',
          ellipsis: true
        },
        {
          title: '租用天数',
          dataIndex: 'totalDuration',
          key: 'totalDuration',
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
      loadData: parameter => {
        Object.assign(parameter, this.queryParam)
        return findBizEnterpriseRequirementPage(parameter).then(res => {
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
          // width: '20%'
        }
      ],
      chioseContractData: parameter => {
        Object.assign(parameter, this.queryParam)
        return getfindBizContractPage(parameter).then(res => {
          return res.result
        })
      },
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
    })
  },
  watch: {
    predictRent () {
      this.countTatolPrice()
    }
  },
  methods: {
    // 审核通过
    handleApproved (id) {
      var _this = this
      // this.$message.success('审核通过')
      this.$confirm({
        title: '确定通过审核',
        onOk () {
          auditPassRequirement({
            id: id
          }).then(res => {
            if (res.code === 1) {
              _this.$refs.table.refresh(true)
              _this.$message.success('审核成功')
            } else {
              _this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 审核不通过
    handleUnApproved (id) {
      var _this = this
      // this.$message.success('审核通过')
      this.$confirm({
        title: '确定驳回',
        onOk () {
          rejectRequirement({
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
    // 价格区间选中事件
    handleCarPriceSelected (val) {
      const index = this.priceRange.findIndex(v => v.id === val)
      this.predictRent = this.priceRange[index].rent
    },
    // 计算租用总金额和总周期
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
    },
    // 给日期组件赋值的初始方法
    moment,
    // 获取图片地址
    getImageList (data) {
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
    // 打开或关闭银行信息选填栏
    selectedBackinfo (val) {
      // console.log(val)
      this.bankInfoFrame = val
    },
    // 打开或关闭车辆信息选填栏
    selectedCarinfo (val) {
      // console.log(val)
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
        // console.log(values)
        if (!err) {
          // 查询条件entity对象里放查询各个查询字段
          const param = {
            entity: {
              carOwner: values.carOwner,
              // phone: values.phone,
              carNumber: values.carNumber,
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
      this.addDrawerTitle = '添加租车需求'
      this.addDrawerVisible = true
    },
    handleImport () {
      this.importDrawerVisible = true
    },
    // 修改按钮
    /* handleEdit (record) {
      this.addDrawerTitle = '修改车辆信息'
      this.addDrawerVisible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, 'id', 'name', 'carNumber', 'phone', 'identityType', 'vehicleBrand', 'vehicleModel'))
      })
    }, */
    // 修改按钮
    handleEdit (record) {
      // debugger
      this.addDrawerVisible = true
      this.addDrawerTitle = '修改租车需求'
      // dom树加载完成都再赋值
      this.$nextTick(() => {
        // 给日期组件赋值
        this.form.setFieldsValue({
          start: moment(record.start, 'YYYY-MM')
        })
        // 给其他字段赋值
        this.form.setFieldsValue(pick(record, 'id', 'carNumber', 'contract', 'carOwner', 'carPrice', 'duration', 'period', 'phone', 'rent', 'status', 'totalDuration', 'totalPeriod', 'totalRent'))
      })
      // 判断银行信息是否存在
      if (record.requirementAccount) {
        // 如果存在则打开开关显示
        this.bankInfoFrame = true
        this.$nextTick(() => {
          this.bankInfo.setFieldsValue(pick(record.requirementAccount, 'id', 'account', 'accountHolder', 'bank', 'city', 'province', 'status'))
        })
      }
      // 判断车辆信息是否存在
      if (record.requirementCarInfo) {
        // 如果存在则打开开关
        this.carInfoFrame = true
        this.$nextTick(() => {
          const data = record.requirementCarInfo
          // 给日期组件赋值
          this.carInfo.setFieldsValue({
            inspectionDate: moment(data.inspectionDate, 'YYYY-MM-DD')
          })
          // this.annualDate = moment(data.inspectionDate, 'YYYY-MM-DD')
          // this.comAnnualDate = data.inspectionDate
          // 判断图片路径是否存在，如果存在则设置基础回显路劲
          var drivingPermitBack, drivingPermitFront, commercialInsurance, insurance
          if (data.drivingPermitBack) {
            this.imageInfo.drivingPermitBack[0] = data.drivingPermitBack
            drivingPermitBack = [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: data.drivingPermitBack
            }]
          } else {
            drivingPermitBack = []
          }
          if (data.drivingPermitFront) {
            this.imageInfo.drivingPermitFront[0] = data.drivingPermitFront
            drivingPermitFront = [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: data.drivingPermitFront
            }]
          } else {
            drivingPermitFront = []
          }
          if (data.commercialInsurance) {
            this.imageInfo.commercialInsurance[0] = data.commercialInsurance
            commercialInsurance = [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: data.commercialInsurance
            }]
          } else {
            commercialInsurance = []
          }
          if (data.insurance) {
            this.imageInfo.insurance[0] = data.insurance
            insurance = [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: data.insurance
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
          this.carInfo.setFieldsValue(pick(data, 'id', 'brand', 'carOwner', 'engineNumber', 'identifyNumber', 'oilType', 'status', 'vehicleModel'))
        })
      }
    },
    // 保存按钮
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
          param.requirement = val
          param.requirement.start = formatTime(val.start._d).substring(0, 7)

          // 判断银行信息块是否有打开填写
          if (this.bankInfoFrame) {
            // 如果有则校验时候有填写必填字段
            this.bankInfo.validateFields((err2, val2) => {
              if (!err2) {
                // 必填字段都有填写则添加到请求参数里
                param.requirementAccount = val2
                param.requirementAccount.status = 1
              } else {
                // 如果必填字段没有全部填写则给check赋值为false，在请求前return函数
                console.log(err2)
                check = false
              }
            })
          }
          // 判断车辆信息块是否打开
          if (this.carInfoFrame) {
            // 如果打开则验证必填字段
            this.carInfo.validateFields((err3, val3) => {
              if (!err3) {
                // 解构三组图片所对应的数据，数组值对应着图片路径
                // 解构各个图片对应的数组
                const { drivingPermitBack, drivingPermitFront, commercialInsurance, insurance } = this.imageInfo
                param.requirementCarInfo = val3
                // 给请求参数赋值，图片路径存在时存路径，不存在时存空串
                // 把图片路径赋值给对应的请求字段
                param.requirementCarInfo.drivingPermitBack = drivingPermitBack[0] || ''
                param.requirementCarInfo.drivingPermitFront = drivingPermitFront[0] || ''
                param.requirementCarInfo.commercialInsurance = commercialInsurance[0] || ''
                param.requirementCarInfo.insurance = insurance[0] || ''
                param.requirementCarInfo.status = 1
                param.requirement.inspectionDate = formatTime(val.inspectionDate._d)
              } else {
                // 如果必填字段没有全部填写则给check赋值为false，在请求前return函数
                console.log(err3)
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
          saveBizEnterpriseRequirement(param).then(res => {
            if (res.code === 1) {
              // 成功提示信息
              this.$message.success('保存成功')
              // 刷新表格
              this.$refs.table.refresh(true)
              // 保存后清除之前保存的路径，即重新初始化
              this.imageInfo = {
                drivingPermitBack: [],
                drivingPermitFront: [],
                commercialInsurance: [],
                insurance: []
              }
              // 关闭抽屉
              this.addDrawerVisible = false
              // 重置表单信息
              this.form.resetFields()
              this.bankInfo.resetFields()
              this.carInfo.resetFields()
              // 关闭车辆信息和银行信息块
              this.bankInfoFrame = false
              this.carInfoFrame = false
            } else {
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
      this.readListData = JSON.parse(JSON.stringify(record))
      // 判断车辆信息是否存在
      if (this.readListData.requirementCarInfo) {
        // 如果存在则把图片路径做成数组形式
        this.readListData.requirementCarInfo.commercialInsurance = [record.requirementCarInfo.commercialInsurance]
        this.readListData.requirementCarInfo.drivingPermitBack = [record.requirementCarInfo.drivingPermitBack]
        this.readListData.requirementCarInfo.drivingPermitFront = [record.requirementCarInfo.drivingPermitFront]
        this.readListData.requirementCarInfo.insurance = [record.requirementCarInfo.insurance]
      }
      this.readDrawerVisible = true
    },
    // 删除按钮
    handleDelete (key) {
      // const index = this.loadData.key
      // this.loadData.splice(index, 1)
      // this.$message.success('删除成功')
      removeBizEnterpriseRequirement({ id: key.id }).then(res => {
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
        { name: '行驶证副本', typeName: 'drivingPermitBack', fileLists: [] },
        { name: '行驶证正本', typeName: 'drivingPermitFront', fileLists: [] },
        { name: '商业险保单', typeName: 'commercialInsurance', fileLists: [] },
        { name: '交强险保单', typeName: 'insurance', fileLists: [] }
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
  .info {
    margin-bottom: -35px;
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
</style>

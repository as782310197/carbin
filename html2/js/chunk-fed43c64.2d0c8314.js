(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fed43c64"],{"1da1":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("d3b7"),a("e6cf");function i(e,t,a,i,n,r,s){try{var l=e[r](s),o=l.value}catch(c){return void a(c)}l.done?t(o):Promise.resolve(o).then(i,n)}function n(e){return function(){var t=this,a=arguments;return new Promise((function(n,r){var s=e.apply(t,a);function l(e){i(s,n,r,l,o,"next",e)}function o(e){i(s,n,r,l,o,"throw",e)}l(void 0)}))}}},6714:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return l})),a.d(t,"d",(function(){return o}));var i=a("b775"),n={findBizOrderPage:"/biz/bizOrder/findBizOrderPage",saveBizOrder:"/biz/bizOrder/save",terminatesBizOrder:"/biz/bizOrder/terminates",findDeviceOrderPage:"/biz/bizOrder/findDeviceOrderPage",uploadDeviceOrderExcel:"/biz/bizOrder/uploadDeviceOrderExcel"};function r(e){return Object(i["b"])({url:n.findBizOrderPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function s(e){return Object(i["b"])({url:n.terminatesBizOrder,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function l(e){return Object(i["b"])({url:n.findDeviceOrderPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function o(e){return Object(i["b"])({url:n.uploadDeviceOrderExcel,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}},"8eda":function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return s})),a.d(t,"j",(function(){return l})),a.d(t,"k",(function(){return o})),a.d(t,"l",(function(){return c})),a.d(t,"a",(function(){return d})),a.d(t,"e",(function(){return u})),a.d(t,"c",(function(){return h})),a.d(t,"i",(function(){return p})),a.d(t,"f",(function(){return m})),a.d(t,"m",(function(){return f})),a.d(t,"g",(function(){return b})),a.d(t,"h",(function(){return v}));var i=a("b775"),n={createBizBillManully:"/biz/bizBill/createBizBillManully",importBizBillvoucherImage:"/biz/bizBill/importBizBillvoucherImage",findBizBillPage:"/biz/bizBill/findBizBillPage",findBillPage:"/biz/bizBill/findBillPage",getBizOrder:"/biz/bizBill/get",removebizBill:"/biz/bizBill/remove",savebizBill:"/biz/bizBill/save",applyBizBillInvoice:"/biz/bizBillInvoice/applyBizBillInvoice",cancleBizBillInvoice:"/biz/bizBillInvoice/cancleBizBillInvoice",findBizBillInvoicePage:"/biz/bizBillInvoice/findBizBillInvoicePage",findBizBillInvoice:"/biz/bizBillInvoice/get",madeOutBizBillInovice:"/biz/bizBillInvoice/madeOutBizBillInovice",passBizBillInovice:"/biz/bizBillInvoice/passBizBillInovice",rejectBizBillInovice:"/biz/bizBillInvoice/rejectBizBillInovice",findDeviceBillPage:"/biz/bizBill/findDeviceBillPage",getTaxCategoryTree:"/system/taxCategory/getTaxCategoryTree"};function r(e){return Object(i["b"])({url:n.cancleBizBillInvoice,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function s(e){return Object(i["b"])({url:n.findBillPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function l(e){return Object(i["b"])({url:n.madeOutBizBillInovice,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function o(e){return Object(i["b"])({url:n.passBizBillInovice,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function c(e){return Object(i["b"])({url:n.rejectBizBillInovice,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function d(e){return Object(i["b"])({url:n.applyBizBillInvoice,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function u(e){return Object(i["b"])({url:n.findBizBillInvoicePage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function h(e){return Object(i["b"])({url:n.createBizBillManully,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function p(e){return Object(i["b"])({url:n.importBizBillvoucherImage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function m(e){return Object(i["b"])({url:n.findBizBillPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function f(e){return Object(i["b"])({url:n.removebizBill,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function b(e){return Object(i["b"])({url:n.findDeviceBillPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function v(e){return Object(i["b"])({url:n.getTaxCategoryTree,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}},ad71:function(e,t,a){"use strict";var i=a("cf58"),n=a.n(i);n.a},b592:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",[a("div",{staticClass:"search_div"},[a("a-form",{attrs:{form:e.searchForm,"label-col":{span:8},"wrapper-col":{span:16}},on:{submit:e.handleSearchSubmit}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"开始时间"}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["startDate"],expression:"['startDate']"}],staticStyle:{width:"100%"},attrs:{placeholder:"请选择开始时间"},on:{change:e.startDateChange}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"结束时间"}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["endDate"],expression:"['endDate']"}],staticStyle:{width:"100%"},attrs:{placeholder:"请选择结束时间"},on:{change:e.endDateChange}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"状态"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["status"],expression:"['status']"}],attrs:{placeholder:"请选择状态"}},[a("a-select-option",{attrs:{value:"0"}},[e._v("未上传凭证")]),a("a-select-option",{attrs:{value:"1"}},[e._v("已上传凭证")]),a("a-select-option",{attrs:{value:"2"}},[e._v("已申请发票")])],1)],1)],1)],1),a("a-row",{attrs:{gutter:24}},[a("a-col",{style:{textAlign:"right"},attrs:{span:24}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v(" 查询 ")]),a("a-button",{style:{marginLeft:"8px"},on:{click:e.handleSearchReset}},[e._v(" 清空 ")])],1)],1)],1)],1),a("div",{staticClass:"button_div"},[a("a-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("手动生成账单")])],1),e.handBillToggle?a("div",{staticClass:"hand_bill"},[a("a-drawer",{attrs:{width:"80%",title:"手动生成账单",visible:e.handBillToggle},on:{close:e.handBillClose}},[a("div",{staticClass:"search_div"},[a("a-form",{attrs:{form:e.handSearchForm,"label-col":{span:8},"wrapper-col":{span:16}},on:{submit:e.handSearchSubmit}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:6}},[a("a-form-item",{attrs:{label:"设备主姓名"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["carOwner"],expression:"['carOwner']"}],attrs:{placeholder:"请输入设备主姓名"}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"开始时间"}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["startTime"],expression:"['startTime']"}],staticStyle:{width:"100%"},attrs:{placeholder:"请选择开始时间"},on:{change:e.startTimeChange}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"结束时间"}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["endTime"],expression:"['endTime']"}],staticStyle:{width:"100%"},attrs:{placeholder:"请选择结束时间"},on:{change:e.endTimeChange}})],1)],1)],1),a("a-row",{attrs:{gutter:24}},[a("a-col",{style:{textAlign:"right"},attrs:{span:24}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v(" 查询 ")]),a("a-button",{style:{marginLeft:"8px"},on:{click:e.handSearchReset}},[e._v(" 清空 ")])],1)],1)],1)],1),a("div",{staticClass:"button_div"},[1===e.actionList.add?a("a-button",{attrs:{type:"primary",disabled:e.billDisabled},on:{click:e.handBill}},[e._v("生成账单")]):e._e()],1),a("s-table",{ref:"handTable",attrs:{columns:e.handColumns,data:e.handLoadData,rowKey:function(e){return e.id},pagination:e.handPagination,"row-selection":e.rowSelection}})],1)],1):e._e(),a("div",{staticClass:"table_div"},[a("s-table",{ref:"table",attrs:{columns:e.columns,data:e.loadData,pagination:e.pagination,rowKey:function(e){return e.id}},scopedSlots:e._u([{key:"operation",fn:function(t,i){return[1===e.actionList.update&&0===i.status?a("a",{on:{click:function(t){return e.handleUploadPaymentVoucher(i)}}},[e._v(" 上传支付凭证 ")]):e._e(),(1===e.actionList.update&&1===e.actionList.get||1!==e.actionList.get)&&0===i.status?a("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.get?a("a",{on:{click:function(t){return e.handleRead(i)}}},[e._v(" 查看 ")]):e._e(),1===e.actionList.get||1===e.actionList.delete?a("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.delete?a("a-popconfirm",{attrs:{title:"您确定要删除吗?",okText:"确定",cancelText:"取消"},on:{confirm:function(t){return e.handleDelete(i)},cancel:e.handleCancelDeletion}},[a("a",{attrs:{href:"javaScript:void(0)"}},[e._v("删除")])]):e._e()]}}])})],1),a("div",{staticClass:"check_div"},[a("a-drawer",{attrs:{width:600,title:"查看结算信息",visible:e.readDrawerVisible,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onReadDrawerClose}},[a("a-descriptions",{attrs:{size:"small",title:"基本信息",bordered:"",column:4}},[a("a-descriptions-item",{attrs:{label:"账单名称",span:4}},[e._v(" "+e._s(e.readListData.billName)+" ")]),a("a-descriptions-item",{attrs:{label:"租车公司名称",span:4}},[e._v(" "+e._s(e.readListData.billName)+" ")]),a("a-descriptions-item",{attrs:{label:"账单周期",span:4}},[e._v(" "+e._s(e.readListData.billCycle)+" ")]),a("a-descriptions-item",{attrs:{label:"需支付金额",span:4}},[e._v(" "+e._s(e.readListData.amount)+"元 ")]),a("a-descriptions-item",{attrs:{label:"数量",span:4}},[e._v(" "+e._s(e.readListData.count)+" ")]),a("a-descriptions-item",{attrs:{label:"账单金额",span:4}},[e._v(" "+e._s(e.readListData.rent)+"元 ")]),a("a-descriptions-item",{attrs:{label:"支付状态",span:4}},[e._v(" "+e._s(e.readListData.statusName)+" ")]),e.upLoadVisible&&e.showUpload?e._e():a("a-descriptions-item",{attrs:{label:"支付凭证",span:4}},[e.readListData.voucherImage?a("viewer",{staticClass:"imgBox",attrs:{images:e.readListData.voucherImage}},[a("img",{staticClass:"img",attrs:{src:e.readListData.voucherImage}})]):e._e()],1)],1),e.upLoadVisible?a("a-divider"):e._e(),e.upLoadVisible&&e.showUpload?a("div",[a("a-form",{attrs:{form:e.upLoadForm,"label-col":{span:6},"wrapper-col":{span:18}},on:{submit:e.handlefixPayment}},[a("a-form-item",{attrs:{label:"上传支付凭证"}},[a("a-upload",{attrs:{action:e.baseURL+"/upload/singleFileUpload","list-type":"picture-card","file-list":e.fileListImg,"before-upload":e.beforeUpload},on:{preview:e.handlePreview,change:e.handleChange}},[e.fileListImg.length<1?a("div",[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[e._v(" 上传图片 ")])],1):e._e()]),a("a-modal",{attrs:{visible:e.previewVisibleImg,footer:null},on:{cancel:e.handleCancelImg}},[a("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:e.previewImage}})])],1),a("div",{staticClass:"fix_payment_btn_box"},[a("a-button",{staticClass:"fix_payment_btn",attrs:{type:"primary"},on:{click:e.handlefixPayment}},[e._v("确定已打款")])],1)],1)],1):e.showUpload?e._e():a("div",{staticClass:"confirmed-box"},[a("span",[e._v("已上传支付凭证")])])],1)],1)])},n=[],r=(a("99af"),a("4de4"),a("4160"),a("d81d"),a("d3b7"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),s=a("5530"),l=a("2af9"),o=a("8eda"),c=a("6714"),d=a("ca00"),u=a("5880");function h(e,t){return new Promise((function(t,a){var i=new FileReader;i.readAsDataURL(e),i.onload=function(){return t(i.result)},i.onerror=function(e){return a(e)}}))}var p={components:{STable:l["g"]},data:function(){var e=this;return{rowSelection:{onChange:function(t,a){e.handBillIds=a.map((function(e){return e.id}))}},fileListImg:[],previewImage:"",previewVisibleImg:!1,billDisabled:!1,handBillIds:[],handSearchForm:this.$form.createForm(this),searchForm:this.$form.createForm(this),form:this.$form.createForm(this),upLoadForm:this.$form.createForm(this),addDrawerTitle:"",addDrawerVisible:!1,saveDisabled:!1,saveDivVisible:!0,readDrawerVisible:!1,upLoadVisible:!1,showUpload:!0,readListData:[],handBillToggle:!1,actionList:{},settlementMethodChooseList:[{key:"0",value:"一次性支付"},{key:"1",value:"分期支付"}],lease:[{id:"0",company:"海信电视城"},{id:"1",company:"海底捞"}],pagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},handPagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},queryParam:{},queryParam1:{entity:{applyBillStatus:0}},handColumns:[{title:"租赁公司名称",dataIndex:"enterpriseName",key:"enterpriseName",align:"center",width:100,ellipsis:!0},{title:"账单周期",dataIndex:"billCycle",key:"billCycle",align:"center",width:100,ellipsis:!0},{title:"账单租金",dataIndex:"rent",key:"rent",align:"center",width:100,ellipsis:!0},{title:"企业手续费",dataIndex:"charge",key:"charge",align:"center",width:100,ellipsis:!0},{title:"企业金额",dataIndex:"amount",key:"amount",align:"center",width:150,ellipsis:!0},{title:"设备主姓名",dataIndex:"carOwner",key:"carOwner",align:"center",width:100,ellipsis:!0},{title:"设备类型",dataIndex:"identifyNumber",key:"identifyNumber",align:"center",width:100,ellipsis:!0},{title:"联系电话",dataIndex:"phone",key:"phone",align:"center",width:100,ellipsis:!0}],columns:[{title:"账单名称",dataIndex:"billName",key:"billName",align:"center",ellipsis:!0},{title:"租车公司名称",dataIndex:"name",key:"name",align:"center",ellipsis:!0},{title:"账单周期",dataIndex:"billCycle",key:"billCycle",align:"center",ellipsis:!0},{title:"账单金额",dataIndex:"rent",key:"rent",align:"center",ellipsis:!0},{title:"需支付金额",dataIndex:"amount",key:"amount",align:"center",ellipsis:!0},{title:"数量",dataIndex:"count",key:"count",align:"center",ellipsis:!0},{title:"支付状态",dataIndex:"statusName",key:"statusName",align:"center",ellipsis:!0},{title:"创建时间",dataIndex:"createTime",key:"createTime",align:"center",ellipsis:!0},{title:"操作",scopedSlots:{customRender:"operation"},key:"operation",align:"center",width:"20%"}],loadData:function(t){return Object.assign(t,e.queryParam),Object(o["g"])(t).then((function(e){return e.result}))},handLoadData:function(t){return Object.assign(t,e.queryParam1),Object(c["b"])(t).then((function(e){return e.result}))},startDate:"",endDate:"",startTime:"",endTime:""}},created:function(){var e=this,t=this.$route.path.split("/").pop(),a=this.roles.permissions.filter((function(e){return e.permissionId===t}));a=a[0].actionList,a.forEach((function(t){"add"===t?e.actionList.add=1:"get"===t?e.actionList.get=1:"update"===t?e.actionList.update=1:"delete"===t&&(e.actionList.delete=1)}))},computed:Object(s["a"])({baseURL:function(){return Object(d["a"])()}},Object(u["mapState"])({roles:function(e){return e.user.roles}})),methods:{handSearchReset:function(){this.handSearchForm.resetFields(),this.startTime="",this.endTime=""},handBill:function(){this.$createElement;if(this.handBillIds.length>0){this.billDisabled=!0;var e=this;this.$confirm({title:"信息",content:function(e){return e("div",["确定生成订单"])},onOk:function(){Object(o["c"])({orderIds:JSON.parse(JSON.stringify(e.handBillIds)),type:1}).then((function(t){1===t.code?(e.handBillToggle=!1,e.$refs.table.refresh(!0),e.$message.success("手动生成账单成功"),e.handBillIds=[]):e.$message.error(t.message),e.billDisabled=!1}))},onCancel:function(){e.billDisabled=!1}})}else this.$message.error("请选择数据")},handSearchSubmit:function(e){var t=this;e.preventDefault(),this.handSearchForm.validateFields((function(e,a){if(!e){var i={entity:{carOwner:a.carOwner,startTime:t.startTime,endTime:t.endTime}};Object.assign(t.queryParam1,i),t.$refs.handTable.refresh(!0)}}))},handBillClose:function(){this.handBillToggle=!1,this.handBillIds=[],this.handSearchForm.resetFields(),this.startTime="",this.endTime=""},handleAdd:function(){this.handBillToggle=!0},startDateChange:function(e,t){this.startDate=t},startTimeChange:function(e,t){this.startTime=t},endDateChange:function(e,t){this.endDate=t},endTimeChange:function(e,t){this.endTime=t},handleSearchSubmit:function(e){var t=this;e.preventDefault(),this.searchForm.validateFields((function(e,a){if(!e){var i={entity:{status:a.status,startDate:t.startDate,endDate:t.endDate}};Object.assign(t.queryParam,i),t.$refs.table.refresh(!0)}}))},handleSearchReset:function(){this.searchForm.resetFields(),this.startDate="",this.endDate=""},handleUploadPaymentVoucher:function(e){this.readListData=JSON.parse(JSON.stringify(e)),this.readListData.voucherImage=[],e.voucherImage&&(this.readListData.voucherImage[0]=e.voucherImage),null===e.voucherImage?(this.showUpload=!0,this.upLoadVisible=!0):(this.showUpload=!1,this.upLoadVisible=!1),this.readDrawerVisible=!0},handleRead:function(e){this.readListData=JSON.parse(JSON.stringify(e)),this.readListData.voucherImage=[],e.voucherImage&&(this.readListData.voucherImage[0]=e.voucherImage),this.readDrawerVisible=!0,this.upLoadVisible=!1,this.showUpload=!0},handleDelete:function(e){var t=this;Object(o["m"])({id:e.id}).then((function(e){1===e.code?(t.$message.success("删除成功"),t.$refs.table.refresh(!0)):t.$message.error(e.message)}))},handleCancelDeletion:function(){this.$message.info("已取消删除")},onReadDrawerClose:function(){this.readDrawerVisible=!1,this.fileListImg=[],this.form.resetFields()},handlefixPayment:function(){var e=this,t=this.readListData.id;if(this.fileListImg.length>0){var a=this.fileListImg[0].response.url;Object(o["i"])({billId:t,voucherImage:a}).then((function(t){1===t.code?(e.$message.success("上传成功"),e.readDrawerVisible=!1,e.$refs.table.refresh(!0),e.form.resetFields(),e.fileListImg=[]):e.$message.error(t.message)}))}else this.$message.error("上传凭证图片不能为空")},handleCancelImg:function(){this.previewVisibleImg=!1},handlePreview:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.url||e.preview){a.next=4;break}return a.next=3,h(e.originFileObj);case 3:e.preview=a.sent;case 4:t.previewImage=e.url||e.preview,t.previewVisibleImg=!0;case 6:case"end":return a.stop()}}),a)})))()},handleChange:function(e){var t=this;if(this.fileListImg=e.fileList,"uploading"!==e.file.status){if("done"===e.file.status){this.addLoading=!1;var a=[];e.fileList.forEach((function(e){e.url?a.push(e):"error"===e.response.status?t.$message.error("上传图片失败"):a.push(e)})),this.fileListImg=a}}else this.addLoading=!0},beforeUpload:function(e){var t=this;return new Promise((function(a,i){var n="image/jpeg"===e.type||"image/png"===e.type;if(!n)return t.$message.error("You can only upload JPG file!"),i(new Error("您只能输入图片"));var r=e.size/1024/1024<2;return r?a(!0):(t.$message.error("Image must smaller than 2MB!"),i(new Error("图片大小不能超过2MB")))}))}}},m=p,f=(a("ad71"),a("2877")),b=Object(f["a"])(m,i,n,!1,null,"24de92a9",null);t["default"]=b.exports},cf58:function(e,t,a){}}]);
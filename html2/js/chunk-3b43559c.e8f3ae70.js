(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b43559c"],{"16c3":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"d",(function(){return n})),a.d(t,"e",(function(){return o})),a.d(t,"b",(function(){return l})),a.d(t,"c",(function(){return c}));var r=a("b775"),s={findBizEnterprisePage:"/biz/bizEnterprise/findBizEnterprisePage",findBizEnterprise:"/biz/bizEnterprise/get",removeBizEnterprise:"/biz/bizEnterprise/remove",saveBizEnterprise:"/biz/bizEnterprise/save",qualityPassBizEnterprise:"/biz/bizEnterprise/qualityPass",qualityRejectBizEnterprise:"/biz/bizEnterprise/qualityReject"};function i(e){return Object(r["b"])({url:s.findBizEnterprisePage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function n(e){return Object(r["b"])({url:s.removeBizEnterprise,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function o(e){return Object(r["b"])({url:s.saveBizEnterprise,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function l(e){return Object(r["b"])({url:s.qualityPassBizEnterprise,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function c(e){return Object(r["b"])({url:s.qualityRejectBizEnterprise,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}},"1da1":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));a("d3b7"),a("e6cf");function r(e,t,a,r,s,i,n){try{var o=e[i](n),l=o.value}catch(c){return void a(c)}o.done?t(l):Promise.resolve(l).then(r,s)}function s(e){return function(){var t=this,a=arguments;return new Promise((function(s,i){var n=e.apply(t,a);function o(e){r(n,s,i,o,l,"next",e)}function l(e){r(n,s,i,o,l,"throw",e)}o(void 0)}))}}},3979:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o}));var r=a("b775"),s={findBizAgentPage:"/biz/bizAgent/findBizAgentPage",findBizAgent:"/biz/bizAgent/get",removeBizAgent:"/biz/bizAgent/remove",saveBizAgent:"/biz/bizAgent/save"};function i(e){return Object(r["b"])({url:s.findBizAgentPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function n(e){return Object(r["b"])({url:s.removeBizAgent,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function o(e){return Object(r["b"])({url:s.saveBizAgent,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}},5825:function(e,t,a){},"88bc":function(e,t,a){(function(t){var a=1/0,r=9007199254740991,s="[object Arguments]",i="[object Function]",n="[object GeneratorFunction]",o="[object Symbol]",l="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,d=l||c||Function("return this")();function u(e,t,a){switch(a.length){case 0:return e.call(t);case 1:return e.call(t,a[0]);case 2:return e.call(t,a[0],a[1]);case 3:return e.call(t,a[0],a[1],a[2])}return e.apply(t,a)}function m(e,t){var a=-1,r=e?e.length:0,s=Array(r);while(++a<r)s[a]=t(e[a],a,e);return s}function p(e,t){var a=-1,r=t.length,s=e.length;while(++a<r)e[s+a]=t[a];return e}var f=Object.prototype,h=f.hasOwnProperty,v=f.toString,b=d.Symbol,g=f.propertyIsEnumerable,w=b?b.isConcatSpreadable:void 0,y=Math.max;function S(e,t,a,r,s){var i=-1,n=e.length;a||(a=C),s||(s=[]);while(++i<n){var o=e[i];t>0&&a(o)?t>1?S(o,t-1,a,r,s):p(s,o):r||(s[s.length]=o)}return s}function _(e,t){return e=Object(e),z(e,t,(function(t,a){return a in e}))}function z(e,t,a){var r=-1,s=t.length,i={};while(++r<s){var n=t[r],o=e[n];a(o,n)&&(i[n]=o)}return i}function x(e,t){return t=y(void 0===t?e.length-1:t,0),function(){var a=arguments,r=-1,s=y(a.length-t,0),i=Array(s);while(++r<s)i[r]=a[t+r];r=-1;var n=Array(t+1);while(++r<t)n[r]=a[r];return n[t]=i,u(e,this,n)}}function C(e){return N(e)||D(e)||!!(w&&e&&e[w])}function T(e){if("string"==typeof e||P(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}function D(e){return L(e)&&h.call(e,"callee")&&(!g.call(e,"callee")||v.call(e)==s)}var N=Array.isArray;function j(e){return null!=e&&A(e.length)&&!k(e)}function L(e){return F(e)&&j(e)}function k(e){var t=q(e)?v.call(e):"";return t==i||t==n}function A(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=r}function q(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function F(e){return!!e&&"object"==typeof e}function P(e){return"symbol"==typeof e||F(e)&&v.call(e)==o}var O=x((function(e,t){return null==e?{}:_(e,m(S(t,1),T))}));e.exports=O}).call(this,a("c8ba"))},"998d":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",[a("div",{staticClass:"search_div"},[a("a-form",{attrs:{form:e.searchForm,"label-col":{span:5},"wrapper-col":{span:14}},on:{submit:e.handleSearchSubmit}},[a("a-row",[a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"企业名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["enterpriseName"],expression:"['enterpriseName']"}],attrs:{placeholder:"请输入企业名称"}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"法人代表"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["legalPerson"],expression:"['legalPerson']"}],attrs:{placeholder:"请输入法人代表"}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"状态"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["status"],expression:"['status']"}],attrs:{placeholder:"请选择状态"}},[a("a-select-option",{attrs:{value:"0"}},[e._v("待信息上传")]),a("a-select-option",{attrs:{value:"1"}},[e._v("审核中")]),a("a-select-option",{attrs:{value:"2"}},[e._v("审核通过")]),a("a-select-option",{attrs:{value:"3"}},[e._v("审核不通过")])],1)],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"开始时间"}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["startTime"],expression:"['startTime']"}],staticStyle:{width:"100%"},attrs:{placeholder:"请选择开始时间"},on:{change:e.startTimeChange}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"结束时间"}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["endTime"],expression:"['endTime']"}],staticStyle:{width:"100%"},attrs:{placeholder:"请选择结束时间"},on:{change:e.endTimeChange}})],1)],1),a("a-col",{style:{textAlign:"center"},attrs:{span:4}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v(" 查询 ")]),a("a-button",{style:{marginLeft:"8px"},on:{click:e.handleSearchReset}},[e._v(" 清空 ")])],1)],1)],1)],1),a("div",{staticClass:"button_div"},[1===e.actionList.add?a("a-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("添加")]):e._e()],1),a("div",{staticClass:"table_div"},[a("s-table",{ref:"table",attrs:{columns:e.columns,data:e.loadData,pagination:e.pagination,rowKey:function(e){return e.id}},scopedSlots:e._u([{key:"operation",fn:function(t,r){return[1===e.actionList.update?a("a",{on:{click:function(t){return e.handleEdit(r)}}},[e._v(" 修改 ")]):e._e(),1===e.actionList.update&&1===e.actionList.get||1!==e.actionList.get?a("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.get?a("a",{on:{click:function(t){return e.handleRead(r)}}},[e._v(" 查看 ")]):e._e(),1===e.actionList.get||1===e.actionList.delete?a("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.delete?a("a-popconfirm",{attrs:{title:"您确定要删除吗?",okText:"确定",cancelText:"取消"},on:{confirm:function(t){return e.handleDelete(r)},cancel:e.handleCancelDeletion}},[a("a",{attrs:{href:"javaScript:void(0)"}},[e._v("删除")])]):e._e()]}}])})],1),a("div",{staticClass:"add_div"},[a("a-drawer",{attrs:{width:900,title:e.addDrawerTitle,visible:e.addDrawerVisible,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form,"label-col":{span:8},"wrapper-col":{span:15}},on:{submit:e.handleSaveSubmit}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id"],expression:"['id']"}],attrs:{hidden:"hidden"}})],1),a("h3",[e._v("企业信息")]),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"企业名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["enterpriseName",{rules:[{required:!0,message:"企业名称不能为空"}]}],expression:"['enterpriseName', {rules: [\n                  { required: true, message: '企业名称不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入企业名称"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"统一社会信用代码"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["license",{rules:[{required:!1,message:"纳税识别号不能为空"}]}],expression:"['license', {rules: [\n                  { required: false, message: '纳税识别号不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入纳税识别号"}})],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"营业执照"}},[a("a-upload",{directives:[{name:"decorator",rawName:"v-decorator",value:["licenseImage"],expression:"['licenseImage']"}],attrs:{action:e.baseURL+"/upload/singleFileUpload","list-type":"picture-card","file-list":e.fileList,"before-upload":e.beforeUpload},on:{preview:e.handlePreview,change:e.handleChange}},[e.fileList.length<1?a("div",[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[e._v(" 上传图片 ")])],1):e._e()]),a("a-modal",{attrs:{visible:e.previewVisible,footer:null},on:{cancel:e.handleCancel}},[a("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:e.previewImage}})])],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"法人代表"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["legalPerson",{rules:[{required:!1,message:"法人代表不能为空"}]}],expression:"['legalPerson', {rules: [\n                  { required: false, message: '法人代表不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入法人代表"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"增值税纳税人性质"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["legalType",{rules:[{required:!1,message:"请选择"}]}],expression:"['legalType', {\n                  rules: [{ required: false, message: '请选择' }]\n                }]"}],attrs:{placeholder:"请选择"}},[a("a-select-option",{attrs:{value:"0"}},[e._v("一般纳税人")]),a("a-select-option",{attrs:{value:"1"}},[e._v("小规模纳税人")])],1)],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:22}},[a("a-form-item",{attrs:{label:"企业注册地址","label-col":{span:4},"wrapper-col":{span:20}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["address",{rules:[{required:!1,message:"企业注册地址不能为空"}]}],expression:"['address', {rules: [\n                  { required: false, message: '企业注册地址不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入企业注册地址"}})],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"企业固定电话"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["telphone",{rules:[{required:!1,message:"企业固定电话不能为空"}]}],expression:"['telphone', {rules: [\n                  { required: false, message: '企业固定电话不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入企业固定电话"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"审核状态"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["statusName",{rules:[{required:!1,message:""}]}],expression:"['statusName', {rules: [\n                  { required: false, message: '' }\n                ]}]"}],attrs:{placeholder:"审核状态由服务端返回",disabled:!0}})],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"代理机构名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["agentName",{rules:[{required:!1,message:"代理机构不能为空"}]}],expression:"['agentName', {rules: [\n                  { required: false, message: '代理机构不能为空' }\n                ]}]"}],attrs:{placeholder:"请选择代理机构"},on:{click:e.handleGetAgentId}}),a("a-modal",{staticClass:"agentModal",attrs:{visible:e.choiceAgentVisible,title:"代理机构搜索",size:"small",width:"50%"},on:{ok:e.handleAgentChoiceOk,cancel:e.handleAgentChoiceCancel}},[a("div",{staticClass:"agentSearchForm"},[a("a-form",{attrs:{form:e.agentSearchForm,"label-col":{span:8},"wrapper-col":{span:14}},on:{submit:e.handleAgentSearch}},[a("a-row",[a("a-col",{staticStyle:{textAlign:"center"},attrs:{span:18}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name"],expression:"['name']"}],attrs:{placeholder:"请输入代理机构名称"}})],1)],1),a("a-col",{staticStyle:{textAlign:"center"},attrs:{span:6}},[a("a-form-item",[a("a-button",{attrs:{type:"primary","html-type":"submit"},on:{click:e.handleAgentSearch}},[e._v("搜索")])],1)],1)],1)],1)],1),a("div",{staticClass:"agentTable"},[a("s-table",{ref:"agentTable",attrs:{columns:e.agentColumns,data:e.agentData,pagination:e.agentPagination,rowKey:function(e){return e.id},rowSelection:{type:"radio",agentSelectedRowKeys:e.agentSelectedRowKeys,agentSelectedRows:e.agentSelectedRows,onChange:e.onAgentSelectChange},size:"small",bordered:""}})],1)])],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"业务员姓名"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["staffName",{rules:[{required:!1,message:"业务员不能为空"}]}],expression:"['staffName', {rules: [\n                  { required: false, message: '业务员不能为空' }\n                ]}]"}],attrs:{placeholder:"请选择业务员"},on:{click:e.handleGetStaffId}}),a("a-modal",{staticClass:"staffModal",attrs:{visible:e.choiceStaffVisible,title:"业务员搜索",size:"small",width:"50%"},on:{ok:e.handleStaffChoiceOk,cancel:e.handleStaffChoiceCancel}},[a("div",{staticClass:"staffSearchForm"},[a("a-form",{attrs:{form:e.staffSearchForm,"label-col":{span:8},"wrapper-col":{span:14}},on:{submit:e.handleStaffSearch}},[a("a-row",[a("a-col",{staticStyle:{textAlign:"center"},attrs:{span:18}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name"],expression:"['name']"}],attrs:{placeholder:"请输入业务员姓名"}})],1)],1),a("a-col",{staticStyle:{textAlign:"center"},attrs:{span:6}},[a("a-form-item",[a("a-button",{attrs:{type:"primary","html-type":"submit"},on:{click:e.handleStaffSearch}},[e._v("搜索")])],1)],1)],1)],1)],1),a("div",{staticClass:"staffTable"},[a("s-table",{ref:"staffTable",attrs:{columns:e.staffColumns,data:e.staffData,pagination:e.staffPagination,rowKey:function(e){return e.id},rowSelection:{type:"radio",staffSelectedRowKeys:e.staffSelectedRowKeys,staffSelectedRows:e.staffSelectedRows,onChange:e.onStaffSelectChange},size:"small",bordered:""}})],1)])],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:22}},[a("a-form-item",{attrs:{label:"企业说明","label-col":{span:4},"wrapper-col":{span:20}}},[a("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["description",{rules:[{required:!1}]}],expression:"['description', {rules: [\n                  { required: false }\n                ]}]"}],attrs:{"auto-size":{minRows:4},placeholder:"请输入企业说明"}})],1)],1)],1),a("a-divider"),a("h3",[e._v("企业银行信息")]),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"开户行"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["bank",{rules:[{required:!1,message:"开户行不能为空"}]}],expression:"['bank', {rules: [\n                  { required: false, message: '开户行不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入开户行"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"银行账号"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["bankAccount",{rules:[{required:!1,message:"银行账号不能为空"}]}],expression:"['bankAccount', {rules: [\n                  { required: false, message: '银行账号不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入银行账号"}})],1)],1)],1),a("a-divider"),a("h3",[e._v("企业联系人信息")]),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"企业联系人"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["contractor",{rules:[{required:!0,message:"企业联系人不能为空"}]}],expression:"['contractor', {rules: [\n                  { required: true, message: '企业联系人不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入企业联系人"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"联系人电话"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone",{rules:[{required:!0,message:"联系人电话不能为空"}]}],expression:"['phone', {rules: [\n                  { required: true, message: '联系人电话不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入联系人电话"}})],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"联系人邮箱地址"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{required:!1,message:"联系人邮箱地址不能为空"}]}],expression:"['email', {rules: [\n                  { required: false, message: '联系人邮箱地址不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入联系人邮箱地址"}})],1)],1)],1),a("a-divider"),a("h3",[e._v("企业账号信息")]),a("a-row",[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"企业账号"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["account",{rules:[{required:!0,message:"企业账号不能为空"}]}],expression:"['account', {rules: [\n                  { required: true, message: '企业账号不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入企业账号"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"企业密码"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"企业密码不能为空"}]}],expression:"['password', {rules: [\n                  { required: true, message: '企业密码不能为空' }\n                ]}]"}],attrs:{placeholder:"请输入企业密码"}})],1)],1)],1)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.saveDivVisible,expression:"saveDivVisible"}],style:{position:"absolute",right:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right",zIndex:1}},[a("a-button",{style:{marginRight:"8px"},on:{click:e.onClose}},[e._v(" 取消 ")]),a("a-button",{attrs:{type:"primary","html-type":"submit",disabled:e.saveDisabled},on:{click:e.handleSaveSubmit}},[e._v("保存")])],1)],1)],1),a("div",{staticClass:"check_div"},[a("a-drawer",{attrs:{width:800,title:"查看企业信息",visible:e.readDrawerVisible,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onReadDrawerClose}},[a("a-descriptions",{attrs:{title:"企业信息",size:"small",bordered:"",column:4}},[a("a-descriptions-item",{attrs:{label:"企业名称",span:2}},[e._v(" "+e._s(e.readListData.enterpriseName)+" ")]),a("a-descriptions-item",{attrs:{label:"统一社会信用代码",span:2}},[e._v(" "+e._s(e.readListData.license)+" ")]),a("a-descriptions-item",{attrs:{label:"营业执照",span:4}},[e.readListData.licenseImage?a("viewer",{staticClass:"imgBox",attrs:{images:e.readListData.licenseImage}},[a("img",{attrs:{src:e.readListData.licenseImage}})]):e._e()],1),a("a-descriptions-item",{attrs:{label:"法人代表",span:2}},[e._v(" "+e._s(e.readListData.legalPerson)+" ")]),a("a-descriptions-item",{attrs:{label:"增值税纳税人性质",span:2}},[e._v(" "+e._s("0"===e.readListData.legalType?"一般纳税人":"小规模纳税人")+" ")]),a("a-descriptions-item",{attrs:{label:"企业注册地址",span:4}},[e._v(" "+e._s(e.readListData.address)+" ")]),a("a-descriptions-item",{attrs:{label:"企业固定电话",span:2}},[e._v(" "+e._s(e.readListData.telphone)+" ")]),a("a-descriptions-item",{attrs:{label:"审核状态",span:2}},[e._v(" "+e._s(e.readListData.status)+" ")]),a("a-descriptions-item",{attrs:{label:"代理机构名称",span:2}},[e._v(" "+e._s(e.readListData.agentName)+" ")]),a("a-descriptions-item",{attrs:{label:"业务员姓名",span:2}},[e._v(" "+e._s(e.readListData.staffName)+" ")]),a("a-descriptions-item",{attrs:{label:"企业说明",span:4}},[e._v(" "+e._s(e.readListData.description)+" ")])],1),a("a-divider"),a("a-descriptions",{attrs:{title:"企业银行信息",size:"small",bordered:"",column:4}},[a("a-descriptions-item",{attrs:{label:"开户行",span:4}},[e._v(" "+e._s(e.readListData.bank)+" ")]),a("a-descriptions-item",{attrs:{label:"银行账号",span:4}},[e._v(" "+e._s(e.readListData.bankAccount)+" ")])],1),a("a-divider"),a("a-descriptions",{attrs:{title:"企业联系人信息",size:"small",bordered:"",column:4}},[a("a-descriptions-item",{attrs:{label:"企业联系人",span:2}},[e._v(" "+e._s(e.readListData.contractor)+" ")]),a("a-descriptions-item",{attrs:{label:"联系人电话",span:2}},[e._v(" "+e._s(e.readListData.phone)+" ")]),a("a-descriptions-item",{attrs:{label:"联系人邮箱地址",span:2}},[e._v(" "+e._s(e.readListData.email)+" ")])],1),a("a-divider"),a("a-descriptions",{attrs:{title:"企业账号信息",size:"small",bordered:"",column:4}},[a("a-descriptions-item",{attrs:{label:"企业账号",span:2}},[e._v(" "+e._s(e.readListData.account)+" ")]),a("a-descriptions-item",{attrs:{label:"企业密码",span:2}},[e._v(" "+e._s(e.readListData.password)+" ")])],1)],1)],1)])},s=[],i=(a("99af"),a("4de4"),a("4160"),a("b0c0"),a("d3b7"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),n=a("5530"),o=a("88bc"),l=a.n(o),c=a("2af9"),d=a("16c3"),u=a("3979"),m=a("d83a"),p=a("ca00"),f=a("c1df"),h=a.n(f),v=a("5880");function b(e,t){return new Promise((function(t,a){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){return t(r.result)},r.onerror=function(e){return a(e)}}))}var g={components:{STable:c["g"]},data:function(){var e=this;return{agentSelectedRowKeys:[],agentSelectedRows:[],agentSelectName:"",staffSelectedRowKeys:[],staffSelectedRows:[],staffSelectName:"",choiceAgentVisible:!1,choiceStaffVisible:!1,agentSearchForm:this.$form.createForm(this),staffSearchForm:this.$form.createForm(this),searchForm:this.$form.createForm(this),form:this.$form.createForm(this),addDrawerTitle:"",addDrawerVisible:!1,saveDisabled:!1,saveDivVisible:!0,readDrawerVisible:!1,readListData:[],fileList:[],actionList:{},previewVisible:!1,previewImage:"",stepsCurrent:0,pagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},queryParam:{},columns:[{title:"企业名称",dataIndex:"enterpriseName",key:"enterpriseName",align:"center",ellipsis:!0},{title:"法人代表",dataIndex:"legalPerson",key:"legalPerson",align:"center",ellipsis:!0},{title:"地址",dataIndex:"address",key:"address",align:"center",ellipsis:!0},{title:"审核状态",dataIndex:"statusName",key:"statusName",align:"center",ellipsis:!0},{title:"创建时间",dataIndex:"createTime",key:"createTime",customRender:function(e,t,a){return h()(e).format("YYYY-MM-DD")},align:"center",ellipsis:!0},{title:"操作",scopedSlots:{customRender:"operation"},key:"operation",align:"center",width:"20%"}],loadData:function(t){return Object.assign(t,e.queryParam),Object(d["a"])(t).then((function(e){return e.result}))},agentSearchQueryParam:{},agentPagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},agentColumns:[{title:"代理机构名称",dataIndex:"name",key:"name",align:"center",ellipsis:!0},{title:"联系手机号码",dataIndex:"phone",key:"phone",align:"center",ellipsis:!0}],agentData:function(t){return Object.assign(t,e.agentSearchQueryParam),Object(u["a"])(t).then((function(e){return e.result}))},staffSearchQueryParam:{},staffPagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},staffColumns:[{title:"业务员姓名",dataIndex:"name",key:"name",align:"center",ellipsis:!0},{title:"手机号码",dataIndex:"phone",key:"phone",align:"center",ellipsis:!0},{title:"职位",dataIndex:"position",key:"position",align:"center",ellipsis:!0}],staffData:function(t){return Object.assign(t,e.staffSearchQueryParam),Object(m["a"])(t).then((function(e){return e.result}))},startTime:"",endTime:""}},created:function(){var e=this,t=this.$route.path.split("/").pop(),a=this.roles.permissions.filter((function(e){return e.permissionId===t}));a=a[0].actionList,a.forEach((function(t){"add"===t?e.actionList.add=1:"get"===t?e.actionList.get=1:"update"===t?e.actionList.update=1:"delete"===t&&(e.actionList.delete=1)}))},computed:Object(n["a"])({},Object(v["mapState"])({roles:function(e){return e.user.roles}}),{baseURL:function(){return Object(p["a"])()}}),methods:{handleGetAgentId:function(){this.choiceAgentVisible=!0},handleAgentChoiceOk:function(){this.form.setFieldsValue({agentName:this.agentSelectName}),this.choiceAgentVisible=!1},handleAgentChoiceCancel:function(){this.choiceAgentVisible=!1},onAgentSelectChange:function(e,t){this.agentSelectName=t[0].name,this.agentSelectedRowKeys=e},handleAgentSearch:function(e){var t=this;e.preventDefault(),this.agentSearchForm.validateFields((function(e,a){if(!e){var r={entity:{name:a.name}};Object.assign(t.agentSearchQueryParam,r),t.$refs.agentTable.refresh(!0)}}))},handleGetStaffId:function(){this.choiceStaffVisible=!0},handleStaffChoiceOk:function(){this.form.setFieldsValue({staffName:this.staffSelectName}),this.choiceStaffVisible=!1},handleStaffChoiceCancel:function(){this.choiceStaffVisible=!1},onStaffSelectChange:function(e,t){this.staffSelectName=t[0].name,this.staffSelectedRowKeys=e},handleStaffSearch:function(e){var t=this;e.preventDefault(),this.staffSearchForm.validateFields((function(e,a){if(!e){var r={entity:{name:a.name}};Object.assign(t.staffSearchQueryParam,r),t.$refs.staffTable.refresh(!0)}}))},startTimeChange:function(e,t){this.startTime=t},endTimeChange:function(e,t){this.endTime=t},handleSearchSubmit:function(e){var t=this;e.preventDefault(),this.searchForm.validateFields((function(e,a){if(!e){var r={entity:{enterpriseName:a.enterpriseName,legalPerson:a.legalPerson,status:a.status,startTime:t.startTime,endTime:t.endTime}};Object.assign(t.queryParam,r),t.$refs.table.refresh(!0)}}))},handleSearchReset:function(){this.searchForm.resetFields(),this.startTime="",this.endTime=""},handleAdd:function(){this.addDrawerTitle="添加企业",this.addDrawerVisible=!0,this.fileList=[]},handleEdit:function(e){var t=this;this.addDrawerTitle="修改企业信息",this.addDrawerVisible=!0,this.fileList=[],e.licenseImage&&(this.fileList=[{uid:"-1",name:"image.png",status:"done",url:e.licenseImage}]),this.$nextTick((function(){t.form.setFieldsValue(l()(e,"id","enterpriseName","account","address","agentName","bank","bankAccount","contractor","email","legalPerson","legalType","license","phone","staffName","statusName","telphone","password","description"))}))},handleSaveSubmit:function(){var e=this;this.form.validateFields((function(t,a){if(a.agentId=e.agentSelectedRowKeys[0],a.staffId=e.staffSelectedRowKeys[0],!t){if(e.fileList.length>0?e.fileList[0].url?a.licenseImage=e.fileList[0].url:a.licenseImage=e.fileList[0].response.url:a.licenseImage="",a.phone&&!/^1[3456789]\d{9}$/.test(a.phone))return e.$message.error("手机号码有误，请重填"),void(e.saveDisabled=!1);Object(d["e"])(a).then((function(t){alert(t.code),1===t.code?(e.$message.success("保存成功"),e.form.resetFields(),e.$refs.table.refresh(!0)):e.$message.error(t.message),e.addDrawerVisible=!1,e.saveDisabled=!1}))}}))},handleRead:function(e){this.readListData=JSON.parse(JSON.stringify(e)),this.readListData.licenseImage=[e.licenseImage],this.readDrawerVisible=!0},handleDelete:function(e){var t=this;Object(d["d"])({id:e.id}).then((function(e){1===e.code?(t.$message.success("删除成功"),t.$refs.table.refresh(!0)):t.$message.error(e.message)}))},handleCancelDeletion:function(){this.$message.info("已取消删除")},onClose:function(){this.addDrawerVisible=!1,this.form.resetFields(),this.stepsCurrent=0,this.stepsData={}},onReadDrawerClose:function(){this.readDrawerVisible=!1},handleCancel:function(){this.previewVisible=!1},handlePreview:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.url||e.preview){a.next=4;break}return a.next=3,b(e.originFileObj);case 3:e.preview=a.sent;case 4:t.previewImage=e.url||e.preview,t.previewVisible=!0;case 6:case"end":return a.stop()}}),a)})))()},handleChange:function(e){var t=this;if(this.fileList=e.fileList,"uploading"!==e.file.status){if("done"===e.file.status){this.addLoading=!1;var a=[];e.fileList.forEach((function(e){e.url?a.push(e):"error"===e.response.status?t.$message.error("上传图片失败"):a.push(e)})),this.fileList=a}}else this.addLoading=!0},beforeUpload:function(e){var t=this;return new Promise((function(a,r){var s="image/jpeg"===e.type||"image/png"===e.type;if(!s)return t.$message.error("You can only upload JPG file!"),r(new Error("您只能输入图片"));var i=e.size/1024/1024<2;return i?a(!0):(t.$message.error("Image must smaller than 2MB!"),r(new Error("图片大小不能超过2MB")))}))}}},w=g,y=(a("cab7"),a("2877")),S=Object(y["a"])(w,r,s,!1,null,"52827e98",null);t["default"]=S.exports},cab7:function(e,t,a){"use strict";var r=a("5825"),s=a.n(r);s.a},d83a:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o}));var r=a("b775"),s={findBizStaffPage:"/biz/bizStaff/findBizStaffPage",findBizStaff:"/biz/bizStaff/get",removeBizStaff:"/biz/bizStaff/remove",saveBizStaff:"/biz/bizStaff/save"};function i(e){return Object(r["b"])({url:s.findBizStaffPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function n(e){return Object(r["b"])({url:s.removeBizStaff,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function o(e){return Object(r["b"])({url:s.saveBizStaff,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}}}]);
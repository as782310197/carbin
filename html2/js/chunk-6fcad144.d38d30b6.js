(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fcad144"],{"1da1":function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i("d3b7"),i("e6cf");function r(e,t,i,r,n,a,s){try{var o=e[a](s),l=o.value}catch(c){return void i(c)}o.done?t(l):Promise.resolve(l).then(r,n)}function n(e){return function(){var t=this,i=arguments;return new Promise((function(n,a){var s=e.apply(t,i);function o(e){r(s,n,a,o,l,"next",e)}function l(e){r(s,n,a,o,l,"throw",e)}o(void 0)}))}}},"3c0d":function(e,t,i){},"56f7":function(e,t,i){"use strict";var r=i("3c0d"),n=i.n(r);n.a},"79fc":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("a-card",[i("div",[i("div",{staticClass:"addDiv"},[1===e.actionList.add?i("a-button",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"primary"},on:{click:e.addDrawerShow}},[i("a-icon",{attrs:{type:"plus"}}),e._v(" 增加 ")],1):e._e()],1)]),i("div",{staticClass:"tableDiv"},[i("s-table",{ref:"table",attrs:{columns:e.columns,data:e.loadData,pagination:e.pagination,loading:e.loading,rowKey:function(e){return e.id}},scopedSlots:e._u([{key:"status",fn:function(t){return i("span",{},[e._v(" "+e._s(e._f("statusFilter")(t))+" ")])}},{key:"operation",fn:function(t,r){return[1===e.actionList.update?i("a",{on:{click:function(t){return e.handleEdit(r)}}},[e._v(" 修改 ")]):e._e(),1===e.actionList.update&&1===e.actionList.get||1!==e.actionList.get?i("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.get?i("a",{on:{click:function(t){return e.handleRead(r)}}},[e._v(" 查看 ")]):e._e(),1===e.actionList.get||1===e.actionList.delete?i("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.delete?i("a-popconfirm",{attrs:{title:"您确定要删除吗?",okText:"确定",cancelText:"取消"},on:{confirm:function(t){return e.confirm(r)},cancel:e.cancel}},[i("a",{attrs:{href:"#"}},[e._v(" 删除 ")])]):e._e()]}}])})],1),i("div",[i("a-drawer",{attrs:{width:700,title:e.title,visible:e.visible,confirmLoading:e.addLoading,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onClose}},[i("a-form",{attrs:{form:e.form,"label-col":{span:8},"wrapper-col":{span:12}},on:{submit:e.handleSubmit}},[i("a-form-item",[i("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id"],expression:"['id']"}],attrs:{hidden:"hidden"}})],1),i("a-form-item",{attrs:{label:"选择图片"}},[i("a-upload",{directives:[{name:"decorator",rawName:"v-decorator",value:["url"],expression:"['url']"}],attrs:{action:e.baseURL+"/upload/singleFileUpload","list-type":"picture-card","file-list":e.fileList,"before-upload":e.beforeUpload},on:{preview:e.handlePreview,change:e.handleChange}},[e.fileList.length<1?i("div",[i("a-icon",{attrs:{type:"plus"}}),i("div",{staticClass:"ant-upload-text"},[e._v(" 上传图片 ")])],1):e._e()]),i("a-modal",{attrs:{visible:e.previewVisible,footer:null},on:{cancel:e.handleCancel}},[i("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:e.previewImage}})])],1),i("a-form-item",{attrs:{label:"轮播图标题"}},[i("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["title",{rules:[{required:!0,message:"轮播图标题不能为空"}]}],expression:"['title', {\n              rules: [{ required: true, message: '轮播图标题不能为空' }]\n            }]"}],attrs:{placeholder:"请输入轮播图标题"}})],1),i("a-form-item",{attrs:{label:"排序"}},[i("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["sort",{rules:[{required:!0,message:"排序不能为空"}]}],expression:"['sort', {\n              rules: [{ required: true, message: '排序不能为空' }]\n            }]"}],attrs:{placeholder:"请输入排序"}})],1),i("a-form-item",{attrs:{label:"状态"}},[i("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["status",{rules:[{required:!0,message:"请选择"}]}],expression:"[\n              'status', {\n                rules: [{ required: true, message: '请选择' }]\n              }]"}]},[i("a-radio",{attrs:{value:1}},[e._v("启用")]),i("a-radio",{attrs:{value:0}},[e._v("禁用")])],1)],1)],1),i("div",{style:{position:"absolute",right:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right",zIndex:1}},[i("a-button",{style:{marginRight:"8px"},on:{click:e.onClose}},[e._v(" 取消 ")]),i("a-button",{attrs:{type:"primary","html-type":"submit",disabled:e.saveDisabled},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1)],1),i("div",[i("a-drawer",{attrs:{width:600,title:e.readTitle,visible:e.visibleRead,confirmLoading:e.readLoading,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onReadClose}},[i("a-descriptions",{attrs:{size:"small",title:"基本信息",bordered:"",column:4}},[i("a-descriptions-item",{attrs:{label:"轮播图标题",span:4}},[e._v(" "+e._s(e.obj.title)+" ")]),i("a-descriptions-item",{attrs:{label:"图片",span:4}},[e.obj.url?i("viewer",{staticClass:"imgBox",attrs:{images:e.obj.url}},[i("img",{attrs:{src:e.obj.url}})]):e._e()],1),i("a-descriptions-item",{attrs:{label:"排序",span:2}},[e._v(" "+e._s(e.obj.sort)+" ")]),i("a-descriptions-item",{attrs:{label:"状态",span:2}},[e._v(" "+e._s(1===e.obj.status?"启用":"禁用")+" ")]),i("a-descriptions-item",{attrs:{label:"创建时间",span:4}},[e._v(" "+e._s(e.obj.createTime)+" ")])],1)],1)],1)])},n=[],a=(i("99af"),i("4de4"),i("4160"),i("d3b7"),i("ac1f"),i("1276"),i("159b"),i("96cf"),i("1da1")),s=i("5530"),o=i("2af9"),l=i("b775"),c={findSysBannerPage:"/system/sysBanner/findSysBannerPage",getSysBanner:"/system/sysBanner/get",removeSysBanner:"/system/sysBanner/remove",saveSysBanner:"/system/sysBanner/save"};function u(e){return Object(l["b"])({url:c.findSysBannerPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function d(e){return Object(l["b"])({url:c.saveSysBanner,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}var f=i("88bc"),p=i.n(f),m=i("ca00"),v=i("5880");function h(e,t){return new Promise((function(t,i){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){return t(r.result)},r.onerror=function(e){return i(e)}}))}var b={name:"Banner",components:{STable:o["g"]},data:function(){var e=this;return{saveDisabled:!1,form:this.$form.createForm(this),title:"",readTitle:"",visible:!1,visibleRead:!1,addLoading:!1,readLoading:!1,loading:!1,actionList:{},pagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},fileList:[],previewVisible:!1,previewImage:"",obj:{},queryParam:{},columns:[{title:"轮播图标题",dataIndex:"title",key:"title",align:"center",ellipsis:!0},{title:"排序",dataIndex:"sort",key:"sort",align:"center",ellipsis:!0},{title:"状态",dataIndex:"status",key:"status",scopedSlots:{customRender:"status"},align:"center",ellipsis:!0},{title:"创建时间",dataIndex:"createTime",key:"createTime",align:"center",ellipsis:!0},{title:"操作",scopedSlots:{customRender:"operation"},key:"operation",align:"center"}],loadData:function(t){return Object.assign(t,e.queryParam),u(t).then((function(e){return e.result}))}}},filters:{statusFilter:function(e){var t={1:"启用",0:"禁用"};return t[e]}},created:function(){var e=this,t=this.$route.path.split("/").pop(),i=this.roles.permissions.filter((function(e){return e.permissionId===t}));i=i[0].actionList,i.forEach((function(t){"add"===t?e.actionList.add=1:"get"===t?e.actionList.get=1:"update"===t?e.actionList.update=1:"delete"===t&&(e.actionList.delete=1)}))},computed:Object(s["a"])({},Object(v["mapState"])({roles:function(e){return e.user.roles}}),{baseURL:function(){return Object(m["a"])()}}),methods:{addDrawerShow:function(){this.title="添加轮播图",this.fileList=[],this.visible=!0},handleEdit:function(e){var t=this;this.title="修改轮播图信息",this.visible=!0,this.fileList=[],e.url&&(this.fileList=[{uid:"-1",name:"image.png",status:"done",url:e.url}]),this.$nextTick((function(){t.form.setFieldsValue(p()(e,"id","bannerImg","title","sort","status"))}))},handleSubmit:function(e){var t=this;e.preventDefault(),this.saveDisabled=!0,this.confirmLoading=!0,this.form.validateFields((function(e,i){e?(t.saveDisabled=!1,t.form.option.focus=!0,t.confirmLoading=!1):(t.fileList.length>0?t.fileList[0].url?i.url=t.fileList[0].url:i.url=t.fileList[0].response.url:i.url="",d(i).then((function(e){1===e.code?(t.saveDisabled=!1,t.$message.success("保存成功"),t.form.resetFields(),t.$refs.table.refresh(!0),t.visible=!1):(t.saveDisabled=!1,t.$message.error("保存失败："+e.message))})))}))},onClose:function(e){this.visible=!1,this.form.resetFields(),this.fileList=[]},handleRead:function(e){this.readTitle="查看轮播图信息",this.obj=JSON.parse(JSON.stringify(e)),this.obj.url=[e.url],this.visibleRead=!0},onReadClose:function(){this.visibleRead=!1},confirm:function(e){},cancel:function(e){this.$message.info("已取消删除")},handleCancel:function(){this.previewVisible=!1},handlePreview:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(e.url||e.preview){i.next=4;break}return i.next=3,h(e.originFileObj);case 3:e.preview=i.sent;case 4:t.previewImage=e.url||e.preview,t.previewVisible=!0;case 6:case"end":return i.stop()}}),i)})))()},handleChange:function(e){var t=this;if(this.fileList=e.fileList,"uploading"!==e.file.status){if("done"===e.file.status){this.addLoading=!1;var i=[];e.fileList.forEach((function(e){e.url?i.push(e):"error"===e.response.status?t.$message.error("上传图片失败"):i.push(e)})),this.fileList=i}}else this.addLoading=!0},beforeUpload:function(e){var t=this;return new Promise((function(i,r){var n="image/jpeg"===e.type||"image/png"===e.type;if(!n)return t.$message.error("You can only upload JPG file!"),r(new Error("您只能输入图片"));var a=e.size/1024/1024<2;return a?i(!0):(t.$message.error("Image must smaller than 2MB!"),r(new Error("图片大小不能超过2MB")))}))}}},g=b,y=(i("56f7"),i("2877")),w=Object(y["a"])(g,r,n,!1,null,"84ccf43c",null);t["default"]=w.exports},"88bc":function(e,t,i){(function(t){var i=1/0,r=9007199254740991,n="[object Arguments]",a="[object Function]",s="[object GeneratorFunction]",o="[object Symbol]",l="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,u=l||c||Function("return this")();function d(e,t,i){switch(i.length){case 0:return e.call(t);case 1:return e.call(t,i[0]);case 2:return e.call(t,i[0],i[1]);case 3:return e.call(t,i[0],i[1],i[2])}return e.apply(t,i)}function f(e,t){var i=-1,r=e?e.length:0,n=Array(r);while(++i<r)n[i]=t(e[i],i,e);return n}function p(e,t){var i=-1,r=t.length,n=e.length;while(++i<r)e[n+i]=t[i];return e}var m=Object.prototype,v=m.hasOwnProperty,h=m.toString,b=u.Symbol,g=m.propertyIsEnumerable,y=b?b.isConcatSpreadable:void 0,w=Math.max;function L(e,t,i,r,n){var a=-1,s=e.length;i||(i=S),n||(n=[]);while(++a<s){var o=e[a];t>0&&i(o)?t>1?L(o,t-1,i,r,n):p(n,o):r||(n[n.length]=o)}return n}function j(e,t){return e=Object(e),x(e,t,(function(t,i){return i in e}))}function x(e,t,i){var r=-1,n=t.length,a={};while(++r<n){var s=t[r],o=e[s];i(o,s)&&(a[s]=o)}return a}function _(e,t){return t=w(void 0===t?e.length-1:t,0),function(){var i=arguments,r=-1,n=w(i.length-t,0),a=Array(n);while(++r<n)a[r]=i[t+r];r=-1;var s=Array(t+1);while(++r<t)s[r]=i[r];return s[t]=a,d(e,this,s)}}function S(e){return B(e)||O(e)||!!(y&&e&&e[y])}function k(e){if("string"==typeof e||I(e))return e;var t=e+"";return"0"==t&&1/e==-i?"-0":t}function O(e){return C(e)&&v.call(e,"callee")&&(!g.call(e,"callee")||h.call(e)==n)}var B=Array.isArray;function R(e){return null!=e&&F(e.length)&&!T(e)}function C(e){return P(e)&&R(e)}function T(e){var t=D(e)?h.call(e):"";return t==a||t==s}function F(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=r}function D(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function P(e){return!!e&&"object"==typeof e}function I(e){return"symbol"==typeof e||P(e)&&h.call(e)==o}var $=_((function(e,t){return null==e?{}:j(e,f(L(t,1),k))}));e.exports=$}).call(this,i("c8ba"))}}]);
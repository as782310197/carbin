(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-539ef727"],{1671:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload-img"},[a("a-upload",{attrs:{action:e.baseURL+"/upload/singleFileUpload","list-type":"picture-card","file-list":e.fileList,"before-upload":e.beforeUpload,remove:e.handleRemove},on:{preview:e.imgHandlePreview,change:e.imgHandleChange}},[e.fileList.length<1?a("div",[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[e._v("上传图片")])],1):e._e()]),a("a-modal",{attrs:{visible:e.previewVisible,footer:null},on:{cancel:e.imgHandleCancel}},[a("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:e.previewImage}})])],1)},i=[],n=(a("4160"),a("c975"),a("fb6a"),a("a434"),a("d3b7"),a("159b"),a("96cf"),a("1da1")),s=a("ca00");function o(e){return new Promise((function(t,a){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){return t(r.result)},r.onerror=function(e){return a(e)}}))}var l={name:"UploadImgGroup",props:{imageInfo:{type:Array,default:Array}},data:function(){return{previewVisible:!1,previewImage:"",fileList:0===this.imageInfo.length?[]:this.imageInfo}},watch:{imageInfo:function(e){this.fileList=e}},computed:{baseURL:function(){return Object(s["a"])()}},methods:{handleRemove:function(e){var t=this.fileList.indexOf(e),a=this.fileList.slice();a.splice(t,1),this.fileList=a,this.$emit("ImageFun",this.fileList)},imgHandleCancel:function(){this.previewVisible=!1},imgHandlePreview:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.url||e.preview){a.next=4;break}return a.next=3,o(e.originFileObj);case 3:e.preview=a.sent;case 4:t.previewImage=e.url||e.preview,t.previewVisible=!0;case 6:case"end":return a.stop()}}),a)})))()},imgHandleChange:function(e){var t=this;if(this.fileList=e.fileList,"done"===e.file.status){var a=[];e.fileList.forEach((function(e){e.url?a.push(e):"error"===e.response.status?t.$message.error("上传图片失败"):a.push(e)})),this.fileList=a,this.$emit("ImageFun",this.fileList)}else e.file.status},beforeUpload:function(e){var t=this;return new Promise((function(a,r){var i="image/jpeg"===e.type||"image/png"===e.type;if(!i)return t.$message.error("You can only upload JPG file!"),r(new Error("您只能输入图片"));var n=e.size/1024/1024<2;return n?a(!0):(t.$message.error("Image must smaller than 2MB!"),r(new Error("图片大小不能超过2MB")))}))}}},c=l,d=(a("b51b"),a("2877")),u=Object(d["a"])(c,r,i,!1,null,"2d9bc34d",null),m=u.exports;t["a"]=m},"1da1":function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a("d3b7"),a("e6cf");function r(e,t,a,r,i,n,s){try{var o=e[n](s),l=o.value}catch(c){return void a(c)}o.done?t(l):Promise.resolve(l).then(r,i)}function i(e){return function(){var t=this,a=arguments;return new Promise((function(i,n){var s=e.apply(t,a);function o(e){r(s,i,n,o,l,"next",e)}function l(e){r(s,i,n,o,l,"throw",e)}o(void 0)}))}}},3979:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return o}));var r=a("b775"),i={findBizAgentPage:"/biz/bizAgent/findBizAgentPage",findBizAgent:"/biz/bizAgent/get",removeBizAgent:"/biz/bizAgent/remove",saveBizAgent:"/biz/bizAgent/save"};function n(e){return Object(r["b"])({url:i.findBizAgentPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function s(e){return Object(r["b"])({url:i.removeBizAgent,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function o(e){return Object(r["b"])({url:i.saveBizAgent,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}},"5db9":function(e,t,a){},"705c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",[a("div",{staticClass:"search_div"},[a("a-form",{attrs:{form:e.searchForm,"label-col":{span:8},"wrapper-col":{span:16}},on:{submit:e.handleSearchSubmit}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"代理机构名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name"],expression:"['name']"}],attrs:{placeholder:"请输入代理机构名称"}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",{attrs:{label:"联系人电话"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone"],expression:"['phone']"}],attrs:{placeholder:"请输入联系人电话"}})],1)],1),a("a-col",{style:{textAlign:"center"},attrs:{span:4}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v(" 查询 ")]),a("a-button",{style:{marginLeft:"2px"},on:{click:e.handleSearchReset}},[e._v(" 清空 ")])],1)],1)],1)],1),a("div",{staticClass:"button_div"},[1===e.actionList.add?a("a-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("添加")]):e._e()],1),a("div",{staticClass:"table_div"},[a("s-table",{ref:"table",attrs:{columns:e.columns,data:e.loadData,pagination:e.pagination,rowKey:function(e){return e.id}},scopedSlots:e._u([{key:"operation",fn:function(t,r){return[1===e.actionList.update?a("a",{on:{click:function(t){return e.handleEdit(r)}}},[e._v(" 修改 ")]):e._e(),1===e.actionList.update&&1===e.actionList.get||1!==e.actionList.get?a("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.get?a("a",{on:{click:function(t){return e.handleRead(r)}}},[e._v(" 查看 ")]):e._e(),1===e.actionList.get||1===e.actionList.delete?a("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.delete?a("a-popconfirm",{attrs:{title:"您确定要删除吗?",okText:"确定",cancelText:"取消"},on:{confirm:function(t){return e.handleDelete(r)},cancel:e.handleCancelDeletion}},[a("a",{attrs:{href:"javaScript:void(0)"}},[e._v("删除")])]):e._e()]}}])})],1),a("div",{staticClass:"add_div"},[a("a-drawer",{attrs:{width:600,title:e.addDrawerTitle,visible:e.addDrawerVisible,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form,"label-col":{span:8},"wrapper-col":{span:12}},on:{submit:e.handleSaveSubmit}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id"],expression:"['id']"}],attrs:{hidden:"hidden"}})],1),a("a-form-item",{attrs:{label:"代理机构名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"代理机构名称不能为空"}]}],expression:"['name', {rules: [\n              { required: true, message: '代理机构名称不能为空' }\n            ]}]"}],attrs:{placeholder:"请输入代理机构名称"}})],1),e._l(e.picList,(function(t,r){return a("a-form-item",{key:r,attrs:{label:t.name}},[a("upload-img-group",{ref:t.typeName,refInFor:!0,attrs:{"v-decorator":[t.typeName],imageInfo:t.fileLists},on:{ImageFun:e.getImageList}})],1)})),a("a-form-item",{attrs:{label:"分成比"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["rate",{rules:[{required:!0,message:"分成比"}]}],expression:"['rate', {rules: [\n              { required: true, message: '分成比' }\n            ]}]"}],attrs:{placeholder:"请输入分成比"}})],1),a("a-form-item",{attrs:{label:"地址"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["address",{rules:[{required:!0,message:"地址不能为空"}]}],expression:"['address', {rules: [\n              { required: true, message: '地址不能为空' }\n            ]}]"}],attrs:{placeholder:"请输入地址"}})],1),a("a-form-item",{attrs:{label:"联系人手机号码"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone",{rules:[{required:!0,message:"联系人手机号码不能为空"}]}],expression:"['phone', {rules: [\n              { required: true, message: '联系人手机号码不能为空' }\n            ]}]"}],attrs:{placeholder:"请输入联系人手机号码"}})],1),a("a-form-item",{attrs:{label:"状态"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["status",{rules:[{required:!0,message:"请选择"}]}],expression:"['status', {\n              rules: [{ required: true, message: '请选择' }]\n            }]"}],attrs:{placeholder:"请选择"}},[a("a-select-option",{attrs:{value:1}},[e._v("启用")]),a("a-select-option",{attrs:{value:0}},[e._v("禁用")])],1)],1),a("a-form-item",{attrs:{label:"类型"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["type",{rules:[{required:!0,message:"请选择"}]}],expression:"['type', {\n              rules: [{ required: true, message: '请选择' }]\n            }]"}],attrs:{placeholder:"请选择"}},[a("a-select-option",{attrs:{value:0}},[e._v("个人")]),a("a-select-option",{attrs:{value:1}},[e._v("企业")])],1)],1)],2),a("div",{directives:[{name:"show",rawName:"v-show",value:e.saveDivVisible,expression:"saveDivVisible"}],style:{position:"absolute",right:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right",zIndex:1}},[a("a-button",{style:{marginRight:"8px"},on:{click:e.onClose}},[e._v(" 取消 ")]),a("a-button",{attrs:{type:"primary","html-type":"submit",disabled:e.saveDisabled},on:{click:e.handleSaveSubmit}},[e._v("保存")])],1)],1)],1),a("div",{staticClass:"check_div"},[a("a-drawer",{attrs:{width:650,title:"查看代理机构信息",visible:e.readDrawerVisible,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onReadDrawerClose}},[a("a-descriptions",{attrs:{size:"small",bordered:""}},[a("a-descriptions-item",{attrs:{label:"代理机构名称",span:3}},[e._v(" "+e._s(e.readListData.name)+" ")]),a("a-descriptions-item",{attrs:{label:"地址",span:3}},[e._v(" "+e._s(e.readListData.address)+" ")]),a("a-descriptions-item",{attrs:{label:"联系手机号码",span:2}},[e._v(" "+e._s(e.readListData.phone)+" ")]),a("a-descriptions-item",{attrs:{label:"分成比",span:1}},[e._v(" "+e._s(e.readListData.rate)+" ")]),a("a-descriptions-item",{attrs:{label:"状态",span:2}},[e._v(" "+e._s(1===e.readListData.status?"启用":"禁用")+" ")]),a("a-descriptions-item",{attrs:{label:"类型",span:1}},[e._v(" "+e._s(1===e.readListData.type?"企业":"个人")+" ")]),a("a-descriptions-item",{attrs:{label:"身份证正面照",span:3}},[e.readListData.idCardFront?a("viewer",{staticClass:"imgBox",attrs:{images:e.readListData.idCardFront}},[a("img",{attrs:{src:e.readListData.idCardFront}})]):e._e()],1),a("a-descriptions-item",{attrs:{label:"身份证反面照",span:3}},[e.readListData.idCardBack?a("viewer",{staticClass:"imgBox",attrs:{images:e.readListData.idCardBack}},[a("img",{attrs:{src:e.readListData.idCardBack}})]):e._e()],1),a("a-descriptions-item",{attrs:{label:"企业执照照片",span:3}},[e.readListData.licenseImage?a("viewer",{staticClass:"imgBox",attrs:{images:e.readListData.licenseImage}},[a("img",{attrs:{src:e.readListData.licenseImage}})]):e._e()],1)],1)],1)],1)])},i=[],n=(a("99af"),a("4de4"),a("4160"),a("b0c0"),a("ac1f"),a("1276"),a("159b"),a("5530")),s=a("1671"),o=a("2af9"),l=a("3979"),c=a("88bc"),d=a.n(c),u=a("5880"),m={components:{STable:o["g"],UploadImgGroup:s["a"]},data:function(){var e=this;return{searchForm:this.$form.createForm(this),form:this.$form.createForm(this),addDrawerTitle:"",addDrawerVisible:!1,saveDisabled:!1,saveDivVisible:!0,readDrawerVisible:!1,readListData:[],actionList:{},pagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},picList:[{name:"身份证正面照",typeName:"idCardFront",fileLists:[]},{name:"身份证反面照",typeName:"idCardBack",fileLists:[]},{name:"企业执照照片",typeName:"licenseImage",fileLists:[]}],imageInfo:{idCardBack:[],idCardFront:[],licenseImage:[]},queryParam:{},columns:[{title:"代理机构名称",dataIndex:"name",key:"name",align:"center",ellipsis:!0},{title:"分成比",dataIndex:"rate",key:"rate",align:"center",ellipsis:!0},{title:"地址",dataIndex:"address",key:"address",align:"center",ellipsis:!0},{title:"联系手机号码",dataIndex:"phone",key:"phone",align:"center",ellipsis:!0},{title:"操作",scopedSlots:{customRender:"operation"},key:"operation",align:"center",width:"20%"}],loadData:function(t){return Object.assign(t,e.queryParam),Object(l["a"])(t).then((function(e){return e.result}))}}},created:function(){var e=this,t=this.$route.path.split("/").pop(),a=this.roles.permissions.filter((function(e){return e.permissionId===t}));a=a[0].actionList,a.forEach((function(t){"add"===t?e.actionList.add=1:"get"===t?e.actionList.get=1:"update"===t?e.actionList.update=1:"delete"===t&&(e.actionList.delete=1)}))},computed:Object(n["a"])({},Object(u["mapState"])({roles:function(e){return e.user.roles}})),methods:{getImageList:function(e){var t=this,a={idCardBack:this.$refs.idCardBack,idCardFront:this.$refs.idCardFront,licenseImage:this.$refs.licenseImage},r={};for(var i in a)r[i]=a[i][0].fileList;for(var n in r)r[n].length>0?r[n].forEach((function(e,a){e.url?t.imageInfo[n][a]=e.url:t.imageInfo[n][a]=e.response.url})):this.imageInfo[n]=[]},handleSearchSubmit:function(e){var t=this;e.preventDefault(),this.searchForm.validateFields((function(e,a){if(!e){var r={entity:{name:a.name,phone:a.phone}};Object.assign(t.queryParam,r),t.$refs.table.refresh(!0)}}))},handleSearchReset:function(){this.searchForm.resetFields()},handleAdd:function(){this.addDrawerTitle="添加代理机构",this.addDrawerVisible=!0,this.picList=[{name:"身份证正面",typeName:"idCardFront",fileLists:[]},{name:"身份证反面",typeName:"idCardBack",fileLists:[]},{name:"企业执照照片",typeName:"licenseImage",fileLists:[]}]},handleEdit:function(e){var t,a,r,i=this;this.addDrawerTitle="修改代理机构信息",this.addDrawerVisible=!0,t=e.idCardBack?[{uid:"-1",name:"image.png",status:"done",url:e.idCardBack}]:[],a=e.idCardFront?[{uid:"-1",name:"image.png",status:"done",url:e.idCardFront}]:[],r=e.licenseImage?[{uid:"-1",name:"image.png",status:"done",url:e.licenseImage}]:[],this.picList=[{name:"身份证正面",typeName:"idCardFront",fileLists:a},{name:"身份证反面",typeName:"idCardBack",fileLists:t},{name:"企业执照照片",typeName:"licenseImage",fileLists:r}],this.$nextTick((function(){i.form.setFieldsValue(d()(e,"id","name","rate","address","phone","status","type"))}))},handleSaveSubmit:function(){var e=this;this.saveDisabled=!0,this.form.validateFields((function(t,a){if(t)e.$message.error("带*号的数据不能为空"),e.saveDisabled=!1;else{var r=JSON.parse(JSON.stringify(a)),i=e.imageInfo,n=i.idCardBack,s=i.idCardFront,o=i.licenseImage;r.idCardBack=n[0]||"",r.idCardFront=s[0]||"",r.licenseImage=o[0]||"",r.phone&&!/^1[3456789]\d{9}$/.test(r.phone)&&(e.$message.error("手机号码有误，请重填"),e.saveDisabled=!1),Object(l["c"])(r).then((function(t){1===t.code?(e.$message.success("保存成功"),e.form.resetFields(),e.$refs.table.refresh(!0)):e.$message.error(t.message),e.addDrawerVisible=!1,e.saveDisabled=!1}))}}))},handleRead:function(e){this.readListData=JSON.parse(JSON.stringify(e)),this.readListData.idCardFront=[this.readListData.idCardFront],this.readListData.idCardBack=[this.readListData.idCardBack],this.readListData.licenseImage=[this.readListData.licenseImage],this.readDrawerVisible=!0},handleDelete:function(e){var t=this;Object(l["b"])({id:e.id}).then((function(e){1===e.code?(t.$message.success("删除成功"),t.$refs.table.refresh(!0)):t.$message.error(e.result)}))},handleCancelDeletion:function(){this.$message.info("已取消删除")},onClose:function(){this.addDrawerVisible=!1,this.form.resetFields()},onReadDrawerClose:function(){this.readDrawerVisible=!1,this.form.resetFields()}}},p=m,f=(a("c47c"),a("2877")),h=Object(f["a"])(p,r,i,!1,null,"50332e7b",null);t["default"]=h.exports},"88bc":function(e,t,a){(function(t){var a=1/0,r=9007199254740991,i="[object Arguments]",n="[object Function]",s="[object GeneratorFunction]",o="[object Symbol]",l="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,d=l||c||Function("return this")();function u(e,t,a){switch(a.length){case 0:return e.call(t);case 1:return e.call(t,a[0]);case 2:return e.call(t,a[0],a[1]);case 3:return e.call(t,a[0],a[1],a[2])}return e.apply(t,a)}function m(e,t){var a=-1,r=e?e.length:0,i=Array(r);while(++a<r)i[a]=t(e[a],a,e);return i}function p(e,t){var a=-1,r=t.length,i=e.length;while(++a<r)e[i+a]=t[a];return e}var f=Object.prototype,h=f.hasOwnProperty,v=f.toString,g=d.Symbol,b=f.propertyIsEnumerable,w=g?g.isConcatSpreadable:void 0,y=Math.max;function L(e,t,a,r,i){var n=-1,s=e.length;a||(a=I),i||(i=[]);while(++n<s){var o=e[n];t>0&&a(o)?t>1?L(o,t-1,a,r,i):p(i,o):r||(i[i.length]=o)}return i}function D(e,t){return e=Object(e),C(e,t,(function(t,a){return a in e}))}function C(e,t,a){var r=-1,i=t.length,n={};while(++r<i){var s=t[r],o=e[s];a(o,s)&&(n[s]=o)}return n}function _(e,t){return t=y(void 0===t?e.length-1:t,0),function(){var a=arguments,r=-1,i=y(a.length-t,0),n=Array(i);while(++r<i)n[r]=a[t+r];r=-1;var s=Array(t+1);while(++r<t)s[r]=a[r];return s[t]=n,u(e,this,s)}}function I(e){return k(e)||F(e)||!!(w&&e&&e[w])}function x(e){if("string"==typeof e||$(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}function F(e){return B(e)&&h.call(e,"callee")&&(!b.call(e,"callee")||v.call(e)==i)}var k=Array.isArray;function j(e){return null!=e&&O(e.length)&&!S(e)}function B(e){return N(e)&&j(e)}function S(e){var t=A(e)?v.call(e):"";return t==n||t==s}function O(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=r}function A(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function N(e){return!!e&&"object"==typeof e}function $(e){return"symbol"==typeof e||N(e)&&v.call(e)==o}var z=_((function(e,t){return null==e?{}:D(e,m(L(t,1),x))}));e.exports=z}).call(this,a("c8ba"))},a13e:function(e,t,a){},b51b:function(e,t,a){"use strict";var r=a("a13e"),i=a.n(r);i.a},c47c:function(e,t,a){"use strict";var r=a("5db9"),i=a.n(r);i.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51e9b962"],{"88bc":function(e,t,a){(function(t){var a=1/0,i=9007199254740991,n="[object Arguments]",s="[object Function]",r="[object GeneratorFunction]",o="[object Symbol]",l="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,d=l||c||Function("return this")();function u(e,t,a){switch(a.length){case 0:return e.call(t);case 1:return e.call(t,a[0]);case 2:return e.call(t,a[0],a[1]);case 3:return e.call(t,a[0],a[1],a[2])}return e.apply(t,a)}function p(e,t){var a=-1,i=e?e.length:0,n=Array(i);while(++a<i)n[a]=t(e[a],a,e);return n}function m(e,t){var a=-1,i=t.length,n=e.length;while(++a<i)e[n+a]=t[a];return e}var f=Object.prototype,v=f.hasOwnProperty,h=f.toString,b=d.Symbol,g=f.propertyIsEnumerable,y=b?b.isConcatSpreadable:void 0,w=Math.max;function _(e,t,a,i,n){var s=-1,r=e.length;a||(a=j),n||(n=[]);while(++s<r){var o=e[s];t>0&&a(o)?t>1?_(o,t-1,a,i,n):m(n,o):i||(n[n.length]=o)}return n}function L(e,t){return e=Object(e),x(e,t,(function(t,a){return a in e}))}function x(e,t,a){var i=-1,n=t.length,s={};while(++i<n){var r=t[i],o=e[r];a(o,r)&&(s[r]=o)}return s}function S(e,t){return t=w(void 0===t?e.length-1:t,0),function(){var a=arguments,i=-1,n=w(a.length-t,0),s=Array(n);while(++i<n)s[i]=a[t+i];i=-1;var r=Array(t+1);while(++i<t)r[i]=a[i];return r[t]=s,u(e,this,r)}}function j(e){return D(e)||C(e)||!!(y&&e&&e[y])}function k(e){if("string"==typeof e||T(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}function C(e){return F(e)&&v.call(e,"callee")&&(!g.call(e,"callee")||h.call(e)==n)}var D=Array.isArray;function R(e){return null!=e&&I(e.length)&&!O(e)}function F(e){return A(e)&&R(e)}function O(e){var t=N(e)?h.call(e):"";return t==s||t==r}function I(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=i}function N(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function A(e){return!!e&&"object"==typeof e}function T(e){return"symbol"==typeof e||A(e)&&h.call(e)==o}var $=S((function(e,t){return null==e?{}:L(e,p(_(t,1),k))}));e.exports=$}).call(this,a("c8ba"))},a81b:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",{staticClass:"permisionCard"},[a("div",[a("div",{staticClass:"searchDiv"},[a("a-form",{staticClass:"ant-advanced-search-form",attrs:{form:e.searchForm,"label-col":{span:5},"wrapper-col":{span:16}},on:{submit:e.handleSearch}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:"8"}},[a("a-form-item",{attrs:{label:"权限名称"}},[a("a-input",{attrs:{placeholder:"请输入权限名称"}})],1)],1),a("a-col",{attrs:{span:"8"}},[a("a-form-item",{attrs:{label:"状态"}},[a("a-select",{attrs:{placeholder:"请选择状态","default-value":"0"}},[a("a-select-option",{attrs:{value:"0"}},[e._v("全部")]),a("a-select-option",{attrs:{value:"1"}},[e._v("正常")]),a("a-select-option",{attrs:{value:"2"}},[e._v("禁用")])],1)],1)],1),a("a-col",{style:{textAlign:"right"},attrs:{span:8}},[a("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v(" 查询 ")]),a("a-button",{style:{marginLeft:"8px"},on:{click:e.handleReset}},[e._v(" 清空 ")])],1)],1)],1)],1)]),a("div",{staticClass:"tableDiv"},[a("s-table",{ref:"table",attrs:{size:"default",columns:e.columns,data:e.loadData,pagination:e.pagination,rowKey:function(e){return e.id},loading:e.loading},scopedSlots:e._u([{key:"actions",fn:function(t,i){return a("span",{},e._l(i.actionDtos,(function(t,i){return a("a-tag",{key:i},[e._v(e._s(t.description))])})),1)}},{key:"status",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("statusFilter")(t))+" ")])}},{key:"operation",fn:function(t,i){return[1===e.actionList.update?a("a",{on:{click:function(t){return e.handleEdit(i)}}},[e._v(" 修改 ")]):e._e(),1===e.actionList.update&&1===e.actionList.get||1!==e.actionList.get?a("a-divider",{attrs:{type:"vertical"}}):e._e(),1===e.actionList.get?a("a",{on:{click:function(t){return e.handleRead(i)}}},[e._v(" 查看 ")]):e._e()]}}])})],1),a("div",[a("a-drawer",{attrs:{width:600,title:"修改权限信息",visible:e.visible,confirmLoading:e.addLoading,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form,"label-col":{span:5},"wrapper-col":{span:16}},on:{submit:e.handleSubmit}},[a("a-form-item",{attrs:{label:"唯一识别码"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["url"],expression:"['url']"}],attrs:{placeholder:"请输入URL地址",disabled:"disabled"}})],1),a("a-form-item",{attrs:{label:"类别"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["description"],expression:"['description']"}],attrs:{placeholder:"请输入类别",disabled:"disabled"}})],1),a("a-form-item",{attrs:{label:"权限名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["moduleName"],expression:"['moduleName']"}],attrs:{placeholder:"请输入权限名称",disabled:"disabled"}})],1),a("a-form-item",{attrs:{label:"状态"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["status"],expression:"['status']"}],attrs:{placeholder:"请选择状态"}},[a("a-select-option",{attrs:{value:1}},[e._v("正常")]),a("a-select-option",{attrs:{value:0}},[e._v("禁用")])],1)],1),a("a-divider"),a("a-form-item",{attrs:{label:"赋予权限"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["actions"],expression:"['actions']"}],staticStyle:{width:"100%"},attrs:{mode:"multiple",allowClear:!0,placeholder:"请选择权限"}},e._l(e.permissionList,(function(t,i){return a("a-select-option",{key:i,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1),a("div",{style:{position:"absolute",right:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right",zIndex:1}},[a("a-button",{style:{marginRight:"8px"},on:{click:e.onClose}},[e._v(" 取消 ")]),a("a-button",{attrs:{type:"primary","html-type":"submit",disabled:e.saveDisabled},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1)],1),a("div",[a("a-drawer",{attrs:{width:800,title:e.readTitle,visible:e.visibleRead,confirmLoading:e.readLoading,bodyStyle:{paddingBottom:"80px"}},on:{close:e.onReadClose}},[a("a-descriptions",{attrs:{size:"small",bordered:"",column:4}},[a("a-descriptions-item",{attrs:{label:"唯一识别码",span:2}},[e._v(" "+e._s(e.viewDetails.url)+" ")]),a("a-descriptions-item",{attrs:{label:"类别",span:2}},[e._v(" "+e._s(e.viewDetails.description)+" ")]),a("a-descriptions-item",{attrs:{label:"权限名称",span:2}},[e._v(" "+e._s(e.viewDetails.moduleName)+" ")]),a("a-descriptions-item",{attrs:{label:"状态",span:2}},[e._v(" "+e._s(1===e.viewDetails.status?"正常":"禁用")+" ")]),a("a-descriptions-item",{attrs:{label:"描述",span:4}},[e._v(" "+e._s(e.viewDetails.description)+" ")]),a("a-descriptions-item",{attrs:{label:"赋予权限",span:4}},[e._v(" "+e._s(e.viewDetails.decStr)+" ")])],1)],1)],1)])},n=[],s=(a("a4d3"),a("e01a"),a("99af"),a("4de4"),a("4160"),a("a15b"),a("d81d"),a("d3b7"),a("ac1f"),a("1276"),a("159b"),a("5530")),r=a("de15"),o=a("2af9"),l=a("b775"),c={permissionPage:"/system/moduleAction/findPage",permissionSave:"/system/moduleAction/save"};function d(e){return Object(l["b"])({url:c.permissionPage,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function u(e){return Object(l["b"])({url:c.permissionSave,method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}var p=a("88bc"),m=a.n(p),f=a("5880"),v=r["a"].Item,h={name:"ModuleList",components:{STable:o["g"],DetailList:r["a"],DetailListItem:v},data:function(){var e=this;return{viewDetails:{},saveDisabled:!1,searchForm:this.$form.createForm(this),form:this.$form.createForm(this),readTitle:"",visible:!1,visibleRead:!1,addLoading:!1,readLoading:!1,loading:!1,actionList:{},pagination:{showTotal:function(e,t){return"第".concat(t[0],"-").concat(t[1],"条")+" "+"共 ".concat(e," 条记录")}},mdl:{},queryParam:{},columns:[{title:"唯一识别码",dataIndex:"url",align:"center",ellipsis:!0},{title:"类别",dataIndex:"description",align:"center",ellipsis:!0},{title:"权限名称",dataIndex:"moduleName",align:"center",ellipsis:!0},{title:"可操作权限",dataIndex:"actions",scopedSlots:{customRender:"actions"},align:"left"},{title:"状态",dataIndex:"status",scopedSlots:{customRender:"status"},align:"center",ellipsis:!0},{title:"操作",scopedSlots:{customRender:"operation"},key:"operation",align:"center"}],permissionList:[],loadData:function(t){return Object.assign(t,e.queryParam),d(t).then((function(t){if(1===t.code)return t.result;e.$message.error(t.message)}))},selectedRowKeys:[],selectedRows:[],permissionId:""}},filters:{statusFilter:function(e){var t={1:"正常",0:"禁用"};return t[e]}},created:function(){var e=this;this.loadPermissionList();var t=this.$route.path.split("/").pop(),a=this.roles.permissions.filter((function(e){return e.permissionId===t}));a=a[0].actionList,a.forEach((function(t){"add"===t?e.actionList.add=1:"get"===t?e.actionList.get=1:"update"===t?e.actionList.update=1:"delete"===t&&(e.actionList.delete=1)}))},computed:Object(s["a"])({},Object(f["mapState"])({roles:function(e){return e.user.roles}})),methods:{loadPermissionList:function(){var e=this;new Promise((function(e){var t=[{label:"新增",value:"add",defaultChecked:!1},{label:"修改",value:"update",defaultChecked:!1},{label:"删除",value:"delete",defaultChecked:!1},{label:"查看",value:"get",defaultChecked:!1},{label:"导入",value:"import",defaultChecked:!1},{label:"导出",value:"export",defaultChecked:!1}];e(t)})).then((function(t){e.permissionList=t}))},handleSearch:function(){},handleReset:function(){this.searchForm.resetFields()},handleEdit:function(e){var t=this;this.visible=!0,this.$nextTick((function(){t.form.setFieldsValue(m()(e,"url","description","moduleName","actions","status"))})),this.permissionId=e.id},handleSubmit:function(e){var t=this;e.preventDefault(),this.saveDisabled=!0,this.confirmLoading=!0,this.form.validateFields((function(e,a){if(e)t.saveDisabled=!1,t.confirmLoading=!1,t.form.resetFields();else{var i={moduleId:t.permissionId,actions:JSON.parse(JSON.stringify(a.actions))};u(i).then((function(e){1===e.code&&(t.visible=!1,t.saveDisabled=!1,t.$message.success("保存成功"),t.confirmLoading=!1,t.form.resetFields(),t.$refs.table.refresh(!0))}))}}))},onClose:function(e){this.visible=!1,this.form.resetFields()},handleRead:function(e){var t=e.actionList&&e.actionList.map((function(e){return e.description}));e.decStr=t&&t.length>0?t.join("、"):"",this.viewDetails=e,this.readTitle="查看权限信息",this.visibleRead=!0},onReadClose:function(){this.visibleRead=!1},confirm:function(e){this.$success({title:"提示信息",content:"删除成功"})},cancel:function(e){this.$message.info("已取消删除")},onChange:function(e,t){this.selectedRowKeys=e,this.selectedRows=t},toggleAdvanced:function(){this.advanced=!this.advanced}}},b=h,g=a("2877"),y=Object(g["a"])(b,i,n,!1,null,"afd4eb9a",null);t["default"]=y.exports}}]);
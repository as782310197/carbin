(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-906c7e30"],{1348:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main user-layout-register"},[e._m(0),a("a-form",{ref:"formRegister",attrs:{form:e.form,id:"formRegister"}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:"请输入用户名"}],validateTrigger:["change","blur"]}],expression:"['username', {rules: [{ required: true, message: '请输入用户名' }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",type:"text",placeholder:"用户名"}})],1),a("a-popover",{attrs:{placement:"rightTop",trigger:["focus"],getPopupContainer:function(e){return e.parentElement}},model:{value:e.state.passwordLevelChecked,callback:function(t){e.$set(e.state,"passwordLevelChecked",t)},expression:"state.passwordLevelChecked"}},[a("template",{slot:"content"},[a("div",{style:{width:"240px"}},[a("div",{class:["user-register",e.passwordLevelClass]},[e._v("强度："),a("span",[e._v(e._s(e.passwordLevelName))])]),a("a-progress",{attrs:{percent:e.state.percent,showInfo:!1,strokeColor:e.passwordLevelColor}}),a("div",{staticStyle:{"margin-top":"10px"}},[a("span",[e._v("请至少输入 6 个字符。请不要使用容易被猜到的密码。")])])],1)]),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"至少6位密码，区分大小写"},{validator:this.handlePasswordLevel}],validateTrigger:["change","blur"]}],expression:"['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",type:"password",autocomplete:"false",placeholder:"至少6位密码，区分大小写"},on:{click:e.handlePasswordInputClick}})],1)],2),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password2",{rules:[{required:!0,message:"至少6位密码，区分大小写"},{validator:this.handlePasswordCheck}],validateTrigger:["change","blur"]}],expression:"['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",type:"password",autocomplete:"false",placeholder:"确认密码"}})],1),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{required:!0,message:"请输入正确的手机号",pattern:/^1[3456789]\d{9}$/},{validator:this.handlePhoneCheck}],validateTrigger:["change","blur"]}],expression:"['mobile', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"}],attrs:{size:"large",placeholder:"11 位手机号"}},[a("a-select",{attrs:{slot:"addonBefore",size:"large",defaultValue:"+86"},slot:"addonBefore"},[a("a-select-option",{attrs:{value:"+86"}},[e._v("+86")]),a("a-select-option",{attrs:{value:"+87"}},[e._v("+87")])],1)],1)],1),a("a-row",{attrs:{gutter:16}},[a("a-col",{staticClass:"gutter-row",attrs:{span:16}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["captcha",{rules:[{required:!0,message:"请输入验证码"}],validateTrigger:"blur"}],expression:"['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"}],attrs:{size:"large",type:"text",placeholder:"验证码"}},[a("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"mail"},slot:"prefix"})],1)],1)],1),a("a-col",{staticClass:"gutter-row",attrs:{span:8}},[a("a-button",{staticClass:"getCaptcha",attrs:{size:"large",disabled:e.state.smsSendBtn},domProps:{textContent:e._s(e.state.smsSendBtn?e.state.time+" s":"获取验证码")},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getCaptcha(t)}}})],1)],1),a("a-form-item",[a("a-button",{staticClass:"register-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.registerBtn,disabled:e.registerBtn},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[e._v("注册 ")]),a("router-link",{staticClass:"login",attrs:{to:{name:"login"}}},[e._v("使用已有账户登录")])],1)],1)],1)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("h3",{staticStyle:{"text-align":"center"}},[a("span",[e._v("注册")])])}],i=(a("498a"),a("5530")),o=a("ac0d"),n=a("7ded"),l={0:"低",1:"低",2:"中",3:"强"},d={0:"error",1:"error",2:"warning",3:"success"},c={0:"#ff0000",1:"#ff0000",2:"#ff7e05",3:"#52c41a"},u={name:"Register",components:{},mixins:[o["c"]],data:function(){return{form:this.$form.createForm(this),state:{time:60,smsSendBtn:!1,passwordLevel:0,passwordLevelChecked:!1,percent:10,progressColor:"#FF0000"},registerBtn:!1}},computed:{passwordLevelClass:function(){return d[this.state.passwordLevel]},passwordLevelName:function(){return l[this.state.passwordLevel]},passwordLevelColor:function(){return c[this.state.passwordLevel]}},methods:{handlePasswordLevel:function(e,t,a){var r=0;/[0-9]/.test(t)&&r++,/[a-zA-Z]/.test(t)&&r++,/[^0-9a-zA-Z_]/.test(t)&&r++,this.state.passwordLevel=r,this.state.percent=30*r,r>=2?(r>=3&&(this.state.percent=100),a()):(0===r&&(this.state.percent=10),a(new Error("密码强度不够")))},handlePasswordCheck:function(e,t,a){var r=this.form.getFieldValue("password");void 0===t&&a(new Error("请输入密码")),t&&r&&t.trim()!==r.trim()&&a(new Error("两次密码不一致")),a()},handlePhoneCheck:function(e,t,a){a()},handlePasswordInputClick:function(){this.isMobile()?this.state.passwordLevelChecked=!1:this.state.passwordLevelChecked=!0},handleSubmit:function(){var e=this.form.validateFields,t=this.state,a=this.$router;e({force:!0},(function(e,r){e||(t.passwordLevelChecked=!1,a.push({name:"registerResult",params:Object(i["a"])({},r)}))}))},getCaptcha:function(e){var t=this;e.preventDefault();var a=this.form.validateFields,r=this.state,s=this.$message,i=this.$notification;a(["mobile"],{force:!0},(function(e,a){if(!e){r.smsSendBtn=!0;var o=window.setInterval((function(){r.time--<=0&&(r.time=60,r.smsSendBtn=!1,window.clearInterval(o))}),1e3),l=s.loading("验证码发送中..",0);Object(n["a"])({phone:a.mobile,operationType:0}).then((function(e){setTimeout(l,2500),i["success"]({message:"提示",description:"验证码获取成功，您的验证码为："+e.message,duration:8})})).catch((function(e){setTimeout(l,1),clearInterval(o),r.time=60,r.smsSendBtn=!1,t.requestFailed(e)}))}}))},requestFailed:function(e){this.$notification["error"]({message:"错误",description:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",duration:4}),this.registerBtn=!1}},watch:{"state.passwordLevel":function(e){}}},p=u,m=(a("5d18"),a("68eb"),a("2877")),h=Object(m["a"])(p,r,s,!1,null,"52ecb23a",null);t["default"]=h.exports},"5d18":function(e,t,a){"use strict";var r=a("eeab"),s=a.n(r);s.a},"68eb":function(e,t,a){"use strict";var r=a("a42c"),s=a.n(r);s.a},a42c:function(e,t,a){},eeab:function(e,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f496db8"],{"50f3":function(e,t,r){"use strict";var a=r("c027"),s=r.n(a);s.a},6540:function(e,t,r){"use strict";var a=r("87ba"),s=r.n(a);s.a},"87ba":function(e,t,r){},accd:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main user-layout-register"},[e._m(0),r("a-form",{ref:"formRegister",attrs:{form:e.form,id:"formRegister"}},[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{required:!0,message:"请输入正确的手机号",pattern:/^1[3456789]\d{9}$/},{validator:this.handlePhoneCheck}],validateTrigger:["change","blur"]}],expression:"['mobile', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"}],attrs:{size:"large",placeholder:"11 位手机号"}},[r("a-select",{attrs:{slot:"addonBefore",size:"large",defaultValue:"+86"},slot:"addonBefore"},[r("a-select-option",{attrs:{value:"+86"}},[e._v("+86")]),r("a-select-option",{attrs:{value:"+87"}},[e._v("+87")])],1)],1)],1),r("a-row",{attrs:{gutter:16}},[r("a-col",{staticClass:"gutter-row",attrs:{span:16}},[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["captcha",{rules:[{required:!0,message:"请输入验证码"}],validateTrigger:"blur"}],expression:"['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"}],attrs:{size:"large",type:"text",placeholder:"验证码"}},[r("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"mail"},slot:"prefix"})],1)],1)],1),r("a-col",{staticClass:"gutter-row",attrs:{span:8}},[r("a-button",{staticClass:"getCaptcha",attrs:{size:"large",disabled:e.state.smsSendBtn},domProps:{textContent:e._s(e.state.smsSendBtn?e.state.time+" s":"获取验证码")},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getCaptcha(t)}}})],1)],1),r("a-popover",{attrs:{placement:"rightTop",trigger:["focus"],getPopupContainer:function(e){return e.parentElement}},model:{value:e.state.passwordLevelChecked,callback:function(t){e.$set(e.state,"passwordLevelChecked",t)},expression:"state.passwordLevelChecked"}},[r("template",{slot:"content"},[r("div",{style:{width:"240px"}},[r("div",{class:["user-register",e.passwordLevelClass]},[e._v("强度："),r("span",[e._v(e._s(e.passwordLevelName))])]),r("a-progress",{attrs:{percent:e.state.percent,showInfo:!1,strokeColor:e.passwordLevelColor}}),r("div",{staticStyle:{"margin-top":"10px"}},[r("span",[e._v("请至少输入 6 个字符。请不要使用容易被猜到的密码。")])])],1)]),r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"至少6位密码，区分大小写"},{validator:this.handlePasswordLevel}],validateTrigger:["change","blur"]}],expression:"['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",type:"password",autocomplete:"false",placeholder:"新密码(至少6位密码，区分大小写)"},on:{click:e.handlePasswordInputClick}})],1)],2),r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password2",{rules:[{required:!0,message:"至少6位密码，区分大小写"},{validator:this.handlePasswordCheck}],validateTrigger:["change","blur"]}],expression:"['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",type:"password",autocomplete:"false",placeholder:"确认新密码"}})],1),r("a-form-item",[r("a-button",{staticClass:"register-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.registerBtn,disabled:e.registerBtn},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[e._v("确定 ")]),r("router-link",{staticClass:"login",attrs:{to:{name:"login"}}},[e._v("返回")])],1)],1)],1)},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h3",{staticStyle:{"text-align":"center"}},[r("span",[e._v("忘记密码")])])}],o=(r("498a"),r("ac0d")),i={0:"低",1:"低",2:"中",3:"强"},n={0:"error",1:"error",2:"warning",3:"success"},l={0:"#ff0000",1:"#ff0000",2:"#ff7e05",3:"#52c41a"},d={name:"Register",components:{},mixins:[o["c"]],data:function(){return{form:this.$form.createForm(this),state:{time:60,smsSendBtn:!1,passwordLevel:0,passwordLevelChecked:!1,percent:10,progressColor:"#FF0000"},registerBtn:!1}},computed:{passwordLevelClass:function(){return n[this.state.passwordLevel]},passwordLevelName:function(){return i[this.state.passwordLevel]},passwordLevelColor:function(){return l[this.state.passwordLevel]}},methods:{handlePasswordLevel:function(e,t,r){var a=0;/[0-9]/.test(t)&&a++,/[a-zA-Z]/.test(t)&&a++,/[^0-9a-zA-Z_]/.test(t)&&a++,this.state.passwordLevel=a,this.state.percent=30*a,a>=2?(a>=3&&(this.state.percent=100),r()):(0===a&&(this.state.percent=10),r(new Error("密码强度不够")))},handlePasswordCheck:function(e,t,r){var a=this.form.getFieldValue("password");void 0===t&&r(new Error("请输入密码")),t&&a&&t.trim()!==a.trim()&&r(new Error("两次密码不一致")),r()},handlePhoneCheck:function(e,t,r){r()},handlePasswordInputClick:function(){this.isMobile()?this.state.passwordLevelChecked=!1:this.state.passwordLevelChecked=!0},handleSubmit:function(){var e=this.form.validateFields,t=this.state;e({force:!0},(function(e,r){e||(t.passwordLevelChecked=!1)}))},requestFailed:function(e){this.$notification["error"]({message:"错误",description:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",duration:4}),this.registerBtn=!1}},watch:{"state.passwordLevel":function(e){}}},c=d,u=(r("50f3"),r("6540"),r("2877")),p=Object(u["a"])(c,a,s,!1,null,"5637e1e8",null);t["default"]=p.exports},c027:function(e,t,r){}}]);
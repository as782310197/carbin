(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6724255f"],{"97cf":function(e,t,a){"use strict";var r=a("e5e0"),i=a.n(r);i.a},a4a2:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("a-form",{ref:"formLogin",staticClass:"user-layout-login",attrs:{id:"formLogin",form:e.form},on:{submit:e.handleSubmit}},[e.isLoginError?a("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{type:"error",showIcon:"",message:"账户或密码错误"}}):e._e(),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:"请输入用户名"},{validator:e.handleUsernameOrEmail}],validateTrigger:"change"}],expression:"[\n          'username',\n          {rules: [{ required: true, message: '请输入用户名' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}\n        ]"}],attrs:{size:"large",type:"text",placeholder:"请输入用户名"}},[a("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"请输入密码"}],validateTrigger:"blur"}],expression:"[\n          'password',\n          {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}\n        ]"}],attrs:{size:"large",type:"password",autocomplete:"false",placeholder:"请输入密码"}},[a("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1),a("a-form-item",[a("a-checkbox",{directives:[{name:"decorator",rawName:"v-decorator",value:["rememberMe",{valuePropName:"checked"}],expression:"['rememberMe', { valuePropName: 'checked' }]"}]},[e._v("自动登录")])],1),a("a-form-item",{staticStyle:{"margin-top":"24px"}},[a("a-button",{staticClass:"login-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.state.loginBtn,disabled:e.state.loginBtn}},[e._v("确定")])],1)],1)],1)},i=[],s=(a("d3b7"),a("5530")),o=a("5880"),n=a("ca00"),c={data:function(){return{customActiveKey:"tab1",loginBtn:!1,loginType:0,isLoginError:!1,requiredTwoStepCaptcha:!1,form:this.$form.createForm(this),state:{time:60,loginBtn:!1,loginType:0,smsSendBtn:!1}}},methods:Object(s["a"])({},Object(o["mapActions"])(["Login","Logout"]),{handleUsernameOrEmail:function(e,t,a){var r=this.state,i=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;i.test(t)?r.loginType=0:r.loginType=1,a()},handleTabClick:function(e){this.customActiveKey=e},handleSubmit:function(e){var t=this;e.preventDefault();var a=this.form.validateFields,r=this.state,i=this.customActiveKey,o=this.Login;r.loginBtn=!0;var c="tab1"===i?["username","password"]:["mobile","captcha"];a(c,{force:!0},(function(e,a){if(e)setTimeout((function(){r.loginBtn=!1}),600);else{var i=Object(s["a"])({},a);delete i.username,i[r.loginType?"username":"email"]=a.username,o(i).then((function(e){1===e.code&&(t.$router.push({path:"/"}),setTimeout((function(){t.$notification.success({message:"欢迎",description:"".concat(Object(n["c"])(),"，欢迎回来")})}),1e3),t.isLoginError=!1)})).catch((function(e){t.requestFailed(e)})).finally((function(){r.loginBtn=!1}))}}))},loginSuccess:function(e){var t=this;this.$router.push({path:"/"}),setTimeout((function(){t.$notification.success({message:"欢迎",description:"".concat(Object(n["c"])(),"，欢迎回来")})}),1e3),this.isLoginError=!1},requestFailed:function(e){this.isLoginError=!0,this.$notification["error"]({message:"错误",description:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",duration:4})}})},l=c,u=(a("97cf"),a("2877")),m=Object(u["a"])(l,r,i,!1,null,"11194b81",null);t["default"]=m.exports},e5e0:function(e,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa1b9"],{1037:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("result",{attrs:{isSuccess:!0,content:!1,title:t.email}},[n("template",{slot:"action"},[n("a-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"large"},on:{click:t.goHomeHandle}},[t._v("返回首页")])],1)],2)},a=[],s=n("2af9"),r={name:"RegisterResult",components:{Result:s["f"]},data:function(){return{form:{}}},computed:{email:function(){var t=this.form&&this.form.mobile||"xxx",e="你的账户：".concat(t," 注册成功");return e}},created:function(){this.form=this.$route.params},methods:{goHomeHandle:function(){this.$router.push({name:"login"})}}},i=r,c=n("2877"),u=Object(c["a"])(i,o,a,!1,null,"768ab48f",null);e["default"]=u.exports}}]);
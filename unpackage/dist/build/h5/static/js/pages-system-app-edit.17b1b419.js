(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-app-edit"],{"01c6":function(t,e,n){"use strict";n.r(e);var i=n("1f18"),a=n("8332");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("5dad");var o,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"0214fcd7",null,!1,i["a"],o);e["default"]=l.exports},"0baa":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-easyinput[data-v-0214fcd7]{width:100%;flex:1;position:relative;text-align:left;color:#333;font-size:14px}.uni-easyinput__content[data-v-0214fcd7]{flex:1;width:100%;display:flex;box-sizing:border-box;min-height:36px;flex-direction:row;align-items:center}.uni-easyinput__content-input[data-v-0214fcd7]{width:auto;position:relative;overflow:hidden;flex:1;line-height:1;font-size:14px}.is-textarea[data-v-0214fcd7]{align-items:flex-start}.is-textarea-icon[data-v-0214fcd7]{margin-top:5px}.uni-easyinput__content-textarea[data-v-0214fcd7]{position:relative;overflow:hidden;flex:1;line-height:1.5;font-size:14px;padding-top:6px;padding-bottom:10px;height:80px;min-height:80px;width:auto}.input-padding[data-v-0214fcd7]{padding-left:10px}.content-clear-icon[data-v-0214fcd7]{padding:0 5px}.label-icon[data-v-0214fcd7]{margin-right:5px;margin-top:-1px}.is-input-border[data-v-0214fcd7]{display:flex;box-sizing:border-box;flex-direction:row;align-items:center;border:1px solid #c8c7cc;border-radius:4px}.is-required[data-v-0214fcd7]{color:#dd524d}.uni-error-message[data-v-0214fcd7]{position:absolute;bottom:-17px;left:0;line-height:12px;color:#dd524d;font-size:12px;text-align:left}.uni-error-msg--boeder[data-v-0214fcd7]{position:relative;bottom:0;line-height:22px}.is-input-error-border[data-v-0214fcd7]{border-color:#dd524d}.uni-easyinput--border[data-v-0214fcd7]{margin-bottom:0;padding:10px 15px;border-top:1px #eee solid}.uni-easyinput-error[data-v-0214fcd7]{padding-bottom:0}.is-first-border[data-v-0214fcd7]{border:none}.is-disabled[data-v-0214fcd7]{background-color:#eee}',""]),t.exports=e},"1e25":function(t,e,n){"use strict";var i=n("23e7"),a=n("58a8").end,r=n("c8d2"),o=r("trimEnd"),s=o?function(){return a(this)}:"".trimEnd;i({target:"String",proto:!0,forced:o},{trimEnd:s,trimRight:s})},"1f18":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uniIcons:n("48a2").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-easyinput",class:{"uni-easyinput-error":t.msg},style:{color:t.inputBorder&&t.msg?"#dd524d":t.styles.color}},[n("v-uni-view",{staticClass:"uni-easyinput__content",class:{"is-input-border":t.inputBorder,"is-input-error-border":t.inputBorder&&t.msg,"is-textarea":"textarea"===t.type,"is-disabled":t.disabled},style:{"border-color":t.inputBorder&&t.msg?"#dd524d":t.styles.borderColor,"background-color":t.disabled?t.styles.disableColor:""}},[t.prefixIcon?n("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.prefixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("prefix")}}}):t._e(),"textarea"===t.type?n("v-uni-textarea",{staticClass:"uni-easyinput__content-textarea",class:{"input-padding":t.inputBorder},attrs:{name:t.name,value:t.val,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focused,autoHeight:t.autoHeight},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):n("v-uni-input",{staticClass:"uni-easyinput__content-input",style:{"padding-right":"password"===t.type||t.clearable||t.prefixIcon?"":"10px","padding-left":t.prefixIcon?"":"10px"},attrs:{type:"password"===t.type?"text":t.type,name:t.name,value:t.val,password:!t.showPassword&&"password"===t.type,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focused,confirmType:t.confirmType},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),"password"===t.type&&t.passwordIcon?[""!=t.val?n("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:t.showPassword?"eye-slash-filled":"eye-filled",size:18,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onEyes.apply(void 0,arguments)}}}):t._e()]:t.suffixIcon?[t.suffixIcon?n("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.suffixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("suffix")}}}):t._e()]:[t.clearable&&t.val&&!t.disabled?n("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:"clear",size:t.clearSize,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}}):t._e()],t._t("right")],2)],1)},r=[]},"5dad":function(t,e,n){"use strict";var i=n("b372"),a=n.n(i);a.a},"6be6":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uniForms:n("52c4").default,uniFormsItem:n("1c7f").default,uniEasyinput:n("01c6").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-container"},[n("uni-forms",{ref:"form",attrs:{value:t.formData,validateTrigger:"bind"}},[n("uni-forms-item",{attrs:{name:"appid",label:"AppID",required:!0}},[n("uni-easyinput",{attrs:{disabled:!0,placeholder:"应用AppID"},model:{value:t.formData.appid,callback:function(e){t.$set(t.formData,"appid",e)},expression:"formData.appid"}})],1),n("uni-forms-item",{attrs:{name:"name",label:"应用名称",required:!0}},[n("uni-easyinput",{attrs:{disabled:!0,placeholder:"应用名称"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),n("uni-forms-item",{attrs:{name:"description",label:"应用描述",required:!0}},[n("v-uni-textarea",{staticClass:"uni-textarea-border",attrs:{placeholder:"应用描述"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.binddata("description",e.detail.value)}},model:{value:t.formData.description,callback:function(e){t.$set(t.formData,"description",e)},expression:"formData.description"}})],1),n("v-uni-view",{staticClass:"uni-button-group"},[n("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v(t._s(t.$t("common.button.submit")))]),n("v-uni-navigator",{staticStyle:{"margin-left":"15px"},attrs:{"open-type":"navigateBack"}},[n("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"}},[t._v(t._s(t.$t("common.button.back")))])],1)],1)],1)],1)},r=[]},7922:function(t,e,n){"use strict";n.r(e);var i=n("882d"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},8332:function(t,e,n){"use strict";n.r(e);var i=n("ae64"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"882d":function(t,e,n){"use strict";(function(t){var i=n("4ea4");n("caad"),n("b64b"),n("d3b7"),n("2532"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("5530")),r=n("b7ef"),o=t.database(),s=(o.command,"opendb-app-list");function l(t){var e={};for(var n in r.validator)t.includes(n)&&(e[n]=r.validator[n]);return e}var u={data:function(){var t={appid:"",name:"",description:"",create_date:null};return{formData:t,formOptions:{},rules:(0,a.default)({},l(Object.keys(t)))}},onLoad:function(t){if(t.id){var e=t.id;this.formDataId=e,this.getDetail(e)}},onReady:function(){this.$refs.form.setRules(this.rules)},methods:{submit:function(){var t=this;uni.showLoading({mask:!0}),this.$refs.form.validate().then((function(e){t.submitForm(e)})).catch((function(){uni.hideLoading()}))},submitForm:function(t){var e=this;o.collection(s).doc(this.formDataId).update(t).then((function(t){uni.showToast({title:"修改成功"}),e.getOpenerEventChannel().emit("refreshData"),setTimeout((function(){return uni.navigateBack()}),500)})).catch((function(t){uni.showModal({content:t.message||"请求服务失败",showCancel:!1})})).finally((function(){uni.hideLoading()}))},getDetail:function(t){var e=this;uni.showLoading({mask:!0}),o.collection(s).doc(t).field("appid,name,description,create_date").get().then((function(t){var n=t.result.data[0];n&&(e.formData=n)})).catch((function(t){uni.showModal({content:t.message||"请求服务失败",showCancel:!1})})).finally((function(){uni.hideLoading()}))}}};e.default=u}).call(this,n("a9ff")["default"])},"897d":function(t,e,n){"use strict";n.r(e);var i=n("6be6"),a=n("7922");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var o,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=l.exports},ae64:function(t,e,n){"use strict";n("a9e3"),n("ac1f"),n("5319"),n("498a"),n("1e25"),n("eee7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm"],model:{prop:"modelValue",event:"update:modelValue"},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:String,placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:15},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},styles:{type:Object,default:function(){return{color:"#333",disableColor:"#eee",borderColor:"#e5e5e5"}}},errorMessage:{type:[String,Boolean],default:""}},data:function(){return{focused:!1,errMsg:"",val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1}},computed:{msg:function(){return this.errorMessage||this.errMsg},inputMaxlength:function(){return Number(this.maxlength)}},watch:{value:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},modelValue:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},focus:function(t){var e=this;this.$nextTick((function(){e.focused=e.focus}))}},created:function(){this.value||(this.val=this.modelValue),this.modelValue||(this.val=this.value),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.is_reset||(this.is_reset=!1,this.formItem.setValue(this.val)),this.rename=this.formItem.name,this.form.inputChildrens.push(this))},mounted:function(){var t=this;this.$nextTick((function(){t.focused=t.focus}))},methods:{init:function(){},onClickIcon:function(t){this.$emit("iconClick",t)},getForm:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniForms",e=this.$parent,n=e.$options.name;while(n!==t){if(e=e.$parent,!e)return!1;n=e.$options.name}return e},onEyes:function(){this.showPassword=!this.showPassword},onInput:function(t){var e=t.detail.value;this.trim&&("boolean"===typeof this.trim&&this.trim&&(e=this.trimStr(e)),"string"===typeof this.trim&&(e=this.trimStr(e,this.trim))),this.errMsg&&(this.errMsg=""),this.val=e,this.$emit("input",e),this.$emit("update:modelValue",e)},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){t.detail.value;this.$emit("blur",t)},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.val="",this.$emit("input",""),this.$emit("update:modelValue","")},fieldClick:function(){this.$emit("click")},trimStr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"both";return"both"===e?t.trim():"left"===e?t.trimLeft():"right"===e?t.trimRight():"start"===e?t.trimStart():"end"===e?t.trimEnd():"all"===e?t.replace(/\s+/g,""):t}}};e.default=i},b372:function(t,e,n){var i=n("0baa");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("134177bc",i,!0,{sourceMap:!1,shadowMode:!1})},b7ef:function(t,e,n){"use strict";var i=n("4ea4");n("4d63"),n("ac1f"),n("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.filterToWhere=l,e.enumConverter=e.validator=void 0;var a=i(n("3835")),r=i(n("b85c")),o={appid:{rules:[{required:!0},{format:"string"}],label:"AppID"},name:{rules:[{required:!0},{format:"string"}],label:"应用名称"},description:{rules:[{required:!0},{format:"string"}],label:"应用描述"},create_date:{rules:[{format:"timestamp"}],label:"创建时间"}};e.validator=o;var s={};function l(t,e){var n={};for(var i in t){var o=t[i],s=o.type,l=o.value;switch(s){case"search":"string"===typeof l&&l.length&&(n[i]=new RegExp(l));break;case"select":if(l.length){var u,c=[],d=(0,r.default)(l);try{for(d.s();!(u=d.n()).done;){var f=u.value;c.push(e.eq(f))}}catch($){d.e($)}finally{d.f()}n[i]=e.or(c)}break;case"range":if(l.length){var p=l[0],m=l[1];n[i]=e.and([e.gte(p),e.lte(m)])}break;case"date":if(l.length){var h=(0,a.default)(l,2),v=h[0],g=h[1],b=new Date(v),y=new Date(g);n[i]=e.and([e.gte(b),e.lte(y)])}break;case"timestamp":if(l.length){var x=(0,a.default)(l,2),w=x[0],_=x[1];n[i]=e.and([e.gte(w),e.lte(_)])}break}}return n}e.enumConverter=s},eee7:function(t,e,n){"use strict";var i=n("23e7"),a=n("58a8").start,r=n("c8d2"),o=r("trimStart"),s=o?function(){return a(this)}:"".trimStart;i({target:"String",proto:!0,forced:o},{trimStart:s,trimLeft:s})}}]);
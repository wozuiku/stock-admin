(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-strategy-execute-edit"],{"01c6":function(t,e,a){"use strict";a.r(e);var n=a("1f18"),i=a("8332");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("5dad");var r,s=a("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"0214fcd7",null,!1,n["a"],r);e["default"]=c.exports},"1e25":function(t,e,a){"use strict";var n=a("23e7"),i=a("58a8").end,o=a("c8d2"),r=o("trimEnd"),s=r?function(){return i(this)}:"".trimEnd;n({target:"String",proto:!0,forced:r},{trimEnd:s,trimRight:s})},"1f18":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uniIcons:a("48a2").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-easyinput",class:{"uni-easyinput-error":t.msg},style:{color:t.inputBorder&&t.msg?"#dd524d":t.styles.color}},[a("v-uni-view",{staticClass:"uni-easyinput__content",class:{"is-input-border":t.inputBorder,"is-input-error-border":t.inputBorder&&t.msg,"is-textarea":"textarea"===t.type,"is-disabled":t.disabled},style:{"border-color":t.inputBorder&&t.msg?"#dd524d":t.styles.borderColor,"background-color":t.disabled?t.styles.disableColor:""}},[t.prefixIcon?a("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.prefixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("prefix")}}}):t._e(),"textarea"===t.type?a("v-uni-textarea",{staticClass:"uni-easyinput__content-textarea",class:{"input-padding":t.inputBorder},attrs:{name:t.name,value:t.val,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focused,autoHeight:t.autoHeight},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):a("v-uni-input",{staticClass:"uni-easyinput__content-input",style:{"padding-right":"password"===t.type||t.clearable||t.prefixIcon?"":"10px","padding-left":t.prefixIcon?"":"10px"},attrs:{type:"password"===t.type?"text":t.type,name:t.name,value:t.val,password:!t.showPassword&&"password"===t.type,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focused,confirmType:t.confirmType},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),"password"===t.type&&t.passwordIcon?[""!=t.val?a("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:t.showPassword?"eye-slash-filled":"eye-filled",size:18,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onEyes.apply(void 0,arguments)}}}):t._e()]:t.suffixIcon?[t.suffixIcon?a("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.suffixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("suffix")}}}):t._e()]:[t.clearable&&t.val&&!t.disabled?a("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:"clear",size:t.clearSize,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}}):t._e()],t._t("right")],2)],1)},o=[]},"279c":function(t,e,a){"use strict";a.r(e);var n=a("4ab7"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"35f0":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uniForms:a("52c4").default,uniFormsItem:a("1c7f").default,uniEasyinput:a("01c6").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-container"},[a("uni-forms",{ref:"form",on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}},model:{value:t.formData,callback:function(e){t.formData=e},expression:"formData"}},[a("uni-forms-item",{attrs:{name:"batch",label:"批次",required:!0}},[a("uni-easyinput",{attrs:{clearable:!0,placeholder:"请输入批次"},model:{value:t.formData.batch,callback:function(e){t.$set(t.formData,"batch",e)},expression:"formData.batch"}})],1),a("uni-forms-item",{attrs:{name:"strategy_code",label:"策略代码",required:!0}},[a("uni-easyinput",{attrs:{clearable:!0,placeholder:"请输入策略代码"},model:{value:t.formData.strategy_code,callback:function(e){t.$set(t.formData,"strategy_code",e)},expression:"formData.strategy_code"}})],1),a("uni-forms-item",{attrs:{name:"strategy_name",label:"策略名称",required:!0}},[a("uni-easyinput",{attrs:{clearable:!0,placeholder:"请输入策略名称"},model:{value:t.formData.strategy_name,callback:function(e){t.$set(t.formData,"strategy_name",e)},expression:"formData.strategy_name"}})],1),a("uni-forms-item",{attrs:{name:"execute_status",label:"执行状态"}},[a("uni-easyinput",{attrs:{clearable:!0,placeholder:"请输入执行状态"},model:{value:t.formData.execute_status,callback:function(e){t.$set(t.formData,"execute_status",e)},expression:"formData.execute_status"}})],1),a("uni-forms-item",{attrs:{name:"execute_message",label:"执行消息"}},[a("uni-easyinput",{attrs:{clearable:!0,placeholder:"请输入执行消息"},model:{value:t.formData.execute_message,callback:function(e){t.$set(t.formData,"execute_message",e)},expression:"formData.execute_message"}})],1),a("uni-forms-item",{attrs:{name:"execute_time",label:"执行时间"}},[a("uni-easyinput",{attrs:{clearable:!0,placeholder:"请输入执行时间"},model:{value:t.formData.execute_time,callback:function(e){t.$set(t.formData,"execute_time",e)},expression:"formData.execute_time"}})],1),a("v-uni-view",{staticClass:"uni-button-group"},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submitForm.apply(void 0,arguments)}}},[t._v(t._s(t.$t("common.button.submit")))]),a("v-uni-navigator",{staticStyle:{"margin-left":"15px"},attrs:{"open-type":"navigateBack"}},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"}},[t._v(t._s(t.$t("common.button.back")))])],1)],1)],1)],1)},o=[]},"3a40":function(t,e,a){var n=a("d1ed");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("5009d51e",n,!0,{sourceMap:!1,shadowMode:!1})},"3f94":function(t,e,a){"use strict";a.r(e);var n=a("35f0"),i=a("279c");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);var r,s=a("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"2747d932",null,!1,n["a"],r);e["default"]=c.exports},"4ab7":function(t,e,a){"use strict";(function(t){a("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t.database(),i=(n.command,"stock-strategy-execute"),o={data:function(){return{formData:{batch:"",strategy_code:"",strategy_name:"",execute_status:"",execute_message:"",execute_time:""}}},onLoad:function(t){var e=t.id;this.formDataId=e,this.getDetail(e)},methods:{getDetail:function(t){var e=this;uni.showLoading({mask:!0}),n.collection(i).doc(t).field("batch,strategy_code,strategy_name,execute_status,execute_message, execute_time").get().then((function(t){var a=t.result.data[0];a&&(void 0===a.status&&(a.status=!0),0===a.status&&(a.status=!0),1===a.status&&(a.status=!1),e.formData=Object.assign(e.formData,a))})).catch((function(t){uni.showModal({content:t.message||"请求服务失败",showCancel:!1})})).finally((function(){uni.hideLoading()}))},submitForm:function(){this.$refs.form.submit()},submit:function(t){var e=this,a=t.detail,o=a.value;a.errors;console.log("submit value:",o),console.log("submit this.formDataId:",this.formDataId),n.collection(i).doc(this.formDataId).update({batch:o.batch,strategy_code:o.strategy_code,strategy_name:o.strategy_name,execute_status:o.execute_status,execute_message:o.execute_message,execute_time:o.execute_time}).then((function(t){console.log("res:",t),0==t.result.code&&(uni.showToast({title:"修改成功",duration:2e3}),e.navigateTo("./list"))}))},navigateTo:function(t,e){var a=this;console.log("navigateTo url:",t),uni.navigateTo({url:t,events:{refreshData:function(){a.loadData(e)}}})}}};e.default=o}).call(this,a("a9ff")["default"])},"5dad":function(t,e,a){"use strict";var n=a("3a40"),i=a.n(n);i.a},8332:function(t,e,a){"use strict";a.r(e);var n=a("ae64"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},ae64:function(t,e,a){"use strict";a("a9e3"),a("ac1f"),a("5319"),a("498a"),a("1e25"),a("eee7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm"],model:{prop:"modelValue",event:"update:modelValue"},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:String,placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:15},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},styles:{type:Object,default:function(){return{color:"#333",disableColor:"#eee",borderColor:"#e5e5e5"}}},errorMessage:{type:[String,Boolean],default:""}},data:function(){return{focused:!1,errMsg:"",val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1}},computed:{msg:function(){return this.errorMessage||this.errMsg},inputMaxlength:function(){return Number(this.maxlength)}},watch:{value:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},modelValue:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},focus:function(t){var e=this;this.$nextTick((function(){e.focused=e.focus}))}},created:function(){this.value||(this.val=this.modelValue),this.modelValue||(this.val=this.value),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.is_reset||(this.is_reset=!1,this.formItem.setValue(this.val)),this.rename=this.formItem.name,this.form.inputChildrens.push(this))},mounted:function(){var t=this;this.$nextTick((function(){t.focused=t.focus}))},methods:{init:function(){},onClickIcon:function(t){this.$emit("iconClick",t)},getForm:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniForms",e=this.$parent,a=e.$options.name;while(a!==t){if(e=e.$parent,!e)return!1;a=e.$options.name}return e},onEyes:function(){this.showPassword=!this.showPassword},onInput:function(t){var e=t.detail.value;this.trim&&("boolean"===typeof this.trim&&this.trim&&(e=this.trimStr(e)),"string"===typeof this.trim&&(e=this.trimStr(e,this.trim))),this.errMsg&&(this.errMsg=""),this.val=e,this.$emit("input",e),this.$emit("update:modelValue",e)},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){t.detail.value;this.$emit("blur",t)},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.val="",this.$emit("input",""),this.$emit("update:modelValue","")},fieldClick:function(){this.$emit("click")},trimStr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"both";return"both"===e?t.trim():"left"===e?t.trimLeft():"right"===e?t.trimRight():"start"===e?t.trimStart():"end"===e?t.trimEnd():"all"===e?t.replace(/\s+/g,""):t}}};e.default=n},d1ed:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-easyinput[data-v-0214fcd7]{width:100%;flex:1;position:relative;text-align:left;color:#333;font-size:14px}.uni-easyinput__content[data-v-0214fcd7]{flex:1;width:100%;display:flex;box-sizing:border-box;min-height:36px;flex-direction:row;align-items:center}.uni-easyinput__content-input[data-v-0214fcd7]{width:auto;position:relative;overflow:hidden;flex:1;line-height:1;font-size:14px}.is-textarea[data-v-0214fcd7]{align-items:flex-start}.is-textarea-icon[data-v-0214fcd7]{margin-top:5px}.uni-easyinput__content-textarea[data-v-0214fcd7]{position:relative;overflow:hidden;flex:1;line-height:1.5;font-size:14px;padding-top:6px;padding-bottom:10px;height:80px;min-height:80px;width:auto}.input-padding[data-v-0214fcd7]{padding-left:10px}.content-clear-icon[data-v-0214fcd7]{padding:0 5px}.label-icon[data-v-0214fcd7]{margin-right:5px;margin-top:-1px}.is-input-border[data-v-0214fcd7]{display:flex;box-sizing:border-box;flex-direction:row;align-items:center;border:1px solid #c8c7cc;border-radius:4px}.is-required[data-v-0214fcd7]{color:#dd524d}.uni-error-message[data-v-0214fcd7]{position:absolute;bottom:-17px;left:0;line-height:12px;color:#dd524d;font-size:12px;text-align:left}.uni-error-msg--boeder[data-v-0214fcd7]{position:relative;bottom:0;line-height:22px}.is-input-error-border[data-v-0214fcd7]{border-color:#dd524d}.uni-easyinput--border[data-v-0214fcd7]{margin-bottom:0;padding:10px 15px;border-top:1px #eee solid}.uni-easyinput-error[data-v-0214fcd7]{padding-bottom:0}.is-first-border[data-v-0214fcd7]{border:none}.is-disabled[data-v-0214fcd7]{background-color:#eee}',""]),t.exports=e},eee7:function(t,e,a){"use strict";var n=a("23e7"),i=a("58a8").start,o=a("c8d2"),r=o("trimStart"),s=r?function(){return i(this)}:"".trimStart;n({target:"String",proto:!0,forced:r},{trimStart:s,trimLeft:s})}}]);
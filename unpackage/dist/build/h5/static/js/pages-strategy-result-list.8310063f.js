(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-strategy-result-list"],{"01b1":function(t,e,n){"use strict";n.r(e);var i=n("3e62"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"01c6":function(t,e,n){"use strict";n.r(e);var i=n("1f18"),a=n("8332");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("5dad");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"0214fcd7",null,!1,i["a"],r);e["default"]=c.exports},"023e":function(t,e,n){var i=n("6eb4");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("5efd40cc",i,!0,{sourceMap:!1,shadowMode:!1})},"0baa":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-easyinput[data-v-0214fcd7]{width:100%;flex:1;position:relative;text-align:left;color:#333;font-size:14px}.uni-easyinput__content[data-v-0214fcd7]{flex:1;width:100%;display:flex;box-sizing:border-box;min-height:36px;flex-direction:row;align-items:center}.uni-easyinput__content-input[data-v-0214fcd7]{width:auto;position:relative;overflow:hidden;flex:1;line-height:1;font-size:14px}.is-textarea[data-v-0214fcd7]{align-items:flex-start}.is-textarea-icon[data-v-0214fcd7]{margin-top:5px}.uni-easyinput__content-textarea[data-v-0214fcd7]{position:relative;overflow:hidden;flex:1;line-height:1.5;font-size:14px;padding-top:6px;padding-bottom:10px;height:80px;min-height:80px;width:auto}.input-padding[data-v-0214fcd7]{padding-left:10px}.content-clear-icon[data-v-0214fcd7]{padding:0 5px}.label-icon[data-v-0214fcd7]{margin-right:5px;margin-top:-1px}.is-input-border[data-v-0214fcd7]{display:flex;box-sizing:border-box;flex-direction:row;align-items:center;border:1px solid #c8c7cc;border-radius:4px}.is-required[data-v-0214fcd7]{color:#dd524d}.uni-error-message[data-v-0214fcd7]{position:absolute;bottom:-17px;left:0;line-height:12px;color:#dd524d;font-size:12px;text-align:left}.uni-error-msg--boeder[data-v-0214fcd7]{position:relative;bottom:0;line-height:22px}.is-input-error-border[data-v-0214fcd7]{border-color:#dd524d}.uni-easyinput--border[data-v-0214fcd7]{margin-bottom:0;padding:10px 15px;border-top:1px #eee solid}.uni-easyinput-error[data-v-0214fcd7]{padding-bottom:0}.is-first-border[data-v-0214fcd7]{border:none}.is-disabled[data-v-0214fcd7]{background-color:#eee}',""]),t.exports=e},"11d2":function(t,e,n){"use strict";n.r(e);var i=n("9b17"),a=n("9a4a"),o=n("52fd"),r=n("e0e4"),s=n("68f3");e["default"]={en:i,es:a,fr:o,"zh-Hans":r,"zh-Hant":s}},"1e25":function(t,e,n){"use strict";var i=n("23e7"),a=n("58a8").end,o=n("c8d2"),r=o("trimEnd"),s=r?function(){return a(this)}:"".trimEnd;i({target:"String",proto:!0,forced:r},{trimEnd:s,trimRight:s})},"1f18":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uniIcons:n("48a2").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-easyinput",class:{"uni-easyinput-error":t.msg},style:{color:t.inputBorder&&t.msg?"#dd524d":t.styles.color}},[n("v-uni-view",{staticClass:"uni-easyinput__content",class:{"is-input-border":t.inputBorder,"is-input-error-border":t.inputBorder&&t.msg,"is-textarea":"textarea"===t.type,"is-disabled":t.disabled},style:{"border-color":t.inputBorder&&t.msg?"#dd524d":t.styles.borderColor,"background-color":t.disabled?t.styles.disableColor:""}},[t.prefixIcon?n("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.prefixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("prefix")}}}):t._e(),"textarea"===t.type?n("v-uni-textarea",{staticClass:"uni-easyinput__content-textarea",class:{"input-padding":t.inputBorder},attrs:{name:t.name,value:t.val,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focused,autoHeight:t.autoHeight},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):n("v-uni-input",{staticClass:"uni-easyinput__content-input",style:{"padding-right":"password"===t.type||t.clearable||t.prefixIcon?"":"10px","padding-left":t.prefixIcon?"":"10px"},attrs:{type:"password"===t.type?"text":t.type,name:t.name,value:t.val,password:!t.showPassword&&"password"===t.type,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focused,confirmType:t.confirmType},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),"password"===t.type&&t.passwordIcon?[""!=t.val?n("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:t.showPassword?"eye-slash-filled":"eye-filled",size:18,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onEyes.apply(void 0,arguments)}}}):t._e()]:t.suffixIcon?[t.suffixIcon?n("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.suffixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("suffix")}}}):t._e()]:[t.clearable&&t.val&&!t.disabled?n("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:"clear",size:t.clearSize,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}}):t._e()],t._t("right")],2)],1)},o=[]},"211c":function(t,e,n){"use strict";var i=n("023e"),a=n.n(i);a.a},2356:function(t){t.exports=JSON.parse('{"uni-pagination.prevText":"anterior","uni-pagination.nextText":"próxima"}')},"258f":function(t){t.exports=JSON.parse('{"uni-pagination.prevText":"上一页","uni-pagination.nextText":"下一页"}')},3256:function(t,e,n){"use strict";n.r(e);var i=n("b1e8"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"348c":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t._t("default",null,{options:t.options,data:t.dataList,pagination:t.paginationInternal,loading:t.loading,hasMore:t.hasMore,error:t.errorMessage})],2)},o=[]},"3e62":function(t,e,n){"use strict";(function(t){var i=n("4ea4");n("99af"),n("4160"),n("d81d"),n("4d63"),n("ac1f"),n("25f0"),n("841c"),n("498a"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a=i(n("1da1")),o=["execute_batch","data_batch","strategy_code","strategy_name","stock_code","stock_name","execute_time"],r="execute_batch desc",s=10,c=1,u=t.database(),l=u.command,d={data:function(){return{query:"",where:"",orderby:r,selectedIndexs:[],pageSizeIndex:0,pageSizeOption:[10,20,50,100,500],options:{pageSize:s,pageCurrent:c},showDelModal:!1,execBatch:""}},watch:{pageSizeIndex:{immediate:!0,handler:function(t,e){var n=this;this.options.pageSize=this.pageSizeOption[t],this.options.pageCurrent=1,this.$nextTick((function(){n.loadData()}))}}},methods:{search:function(){var t=this,e=this.getWhere();this.where=e,console.log("search:",this.where),this.$nextTick((function(){t.loadData()}))},getWhere:function(){var t=this.query.trim();if(!t)return"";var e=new RegExp(t,"i");return o.map((function(t){return e+".test("+t+")"})).join(" || ")},batchAddSelect:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n,i,a,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={},i=[],a=[],o=t.getDate(),a=t.$refs.udb.dataList,a.forEach((function(t,e){n={},n.type=t.strategy_code,n.code=t.stock_code,n.name=t.stock_name,n.date=o,i.push(n)})),console.log("batchAddSelect selectList:",i),e.next=6,u.collection("stock-select").add(i);case 6:r=e.sent,console.log("res:",r),0==r.result.code&&uni.showToast({title:"批量添加成功",icon:"none"});case 9:case"end":return e.stop()}}),e)})))()},navigateTo:function(t,e){var n=this;console.log("navigateTo url:",t),uni.navigateTo({url:t,events:{refreshData:function(){n.loadData(e)}}})},getDate:function(){var t=new Date,e=t.getFullYear(),n=t.getMonth()+1,i=t.getDate();return n=n>9?n:"0"+n,i=i>9?i:"0"+i,"".concat(e,"-").concat(n,"-").concat(i)},loadData:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:t})},addSelect:function(t){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("addSelect"),i={},i.type=t.strategy_code,i.code=t.stock_code,i.name=t.stock_name,i.date=e.getDate(),n.next=8,u.collection("stock-select").add(i);case 8:a=n.sent,console.log("res:",a),0==a.result.code&&uni.showToast({title:"添加成功",icon:"none"});case 11:case"end":return n.stop()}}),n)})))()},confirmDelete:function(t){var e=this;this.$refs.udb.remove(t,{success:function(t){e.$refs.table.clearSelection()}})},selectedItems:function(){var t=this.$refs.udb.dataList;return this.selectedIndexs.map((function(e){return t[e]._id}))},delDataAll:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.collection("stock-strategy-result").where({_id:l.exists(!0)}).remove();case 2:e.sent,t.search();case 4:case"end":return e.stop()}}),e)})))()},delDataBatch:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.collection("stock-strategy-result").where({execute_batch:t.execBatch}).remove();case 2:e.sent,t.search();case 4:case"end":return e.stop()}}),e)})))()},delBatch:function(){this.showDelModal=!0},hideModal:function(){this.showDelModal=!1},selectionChange:function(t){this.selectedIndexs=t.detail.index},changeSize:function(t){this.pageSizeIndex=t.detail.value},onPageChanged:function(t){this.selectedIndexs.length=0,this.$refs.table.clearSelection(),this.$refs.udb.loadData({current:t.current})}}};e.default=d}).call(this,n("a9ff")["default"])},"4af1":function(t,e,n){"use strict";(function(t){var i=n("4ea4");n("4160"),n("c975"),n("fb6a"),n("a434"),n("a9e3"),n("b64b"),n("d3b7"),n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("2909")),o=n("37dc"),r=i(n("11d2")),s=(0,o.initVueI18n)(r.default),c=s.t,u={load:"load",error:"error"},l={add:"add",replace:"replace"},d={auto:"auto",onready:"onready",manual:"manual"},p=["pageCurrent","pageSize","spaceInfo","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"],f={name:"UniClouddb",props:{options:{type:[Object,Array],default:function(){return{}}},spaceInfo:{type:Object,default:function(){return{}}},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String,Object],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},pageIndistinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1}},data:function(){return{loading:!1,hasMore:!1,dataList:this.getone?void 0:[],paginationInternal:{},errorMessage:""}},computed:{collectionArgs:function(){return Array.isArray(this.collection)?this.collection:[this.collection]},isLookup:function(){return Array.isArray(this.collection)&&this.collection.length>1||"string"===typeof this.collection&&this.collection.indexOf(",")>-1},mainCollection:function(){if("string"===typeof this.collection)return this.collection.split(",")[0];var t=JSON.parse(JSON.stringify(this.collection[0]));return t.$db[0].$param[0]}},created:function(){var t=this;this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((function(){var e=[];return p.forEach((function(n){e.push(t[n])})),e}),(function(e,n){if(t.paginationInternal.size=t.pageSize,e[0]!==n[0]&&(t.paginationInternal.current=t.pageCurrent),t.loadtime!==d.manual){for(var i=!1,a=2;a<e.length;a++)if(e[a]!==n[a]){i=!0;break}i&&(t.clear(),t.reset()),t._execLoadData()}})),this.manual||this.loadtime!==d.auto||this.loadData()},beforeDestroy:function(){},methods:{loadData:function(t,e){var n=null,i=!1;"object"===typeof t?(t.clear&&(this.pageData===l.replace?this.clear():i=t.clear,this.reset()),void 0!==t.current&&(this.paginationInternal.current=t.current),"function"===typeof e&&(n=e)):"function"===typeof t&&(n=t),this._execLoadData(n,i)},loadMore:function(){this._isEnded||this.loading||(this.pageData===l.add&&this.paginationInternal.current++,this._execLoadData())},refresh:function(){this.clear(),this._execLoadData()},clear:function(){this._isEnded=!1,this.dataList=[]},reset:function(){this.paginationInternal.current=1},add:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,a=n.showToast,o=void 0===a||a,r=n.toastTitle,s=n.success,u=n.fail,l=n.complete,d=n.needConfirm,p=void 0===d||d,f=n.needLoading,h=void 0===f||f,g=n.loadingTitle,v=void 0===g?"":g;h&&uni.showLoading({title:v});var m=t.database(this.spaceInfo);i&&(m=m.action(i)),m.collection(this.mainCollection).add(e).then((function(t){s&&s(t),o&&uni.showToast({title:r||c("uniCloud.component.add.success")})})).catch((function(t){u&&u(t),p&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){h&&uni.hideLoading(),l&&l()}))},remove:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,a=n.success,o=n.fail,r=n.complete,s=n.confirmTitle,u=n.confirmContent,l=n.needConfirm,d=void 0===l||l,p=n.needLoading,f=void 0===p||p,h=n.loadingTitle,g=void 0===h?"":h;t&&t.length&&(d?uni.showModal({title:s||c("uniCloud.component.remove.showModal.title"),content:u||c("uniCloud.component.remove.showModal.content"),showCancel:!0,success:function(n){n.confirm&&e._execRemove(t,i,a,o,r,d,f,g)}}):this._execRemove(t,i,a,o,r,d,f,g))},update:function(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=i.action,o=i.showToast,r=void 0===o||o,s=i.toastTitle,u=i.success,l=i.fail,d=i.complete,p=i.needConfirm,f=void 0===p||p,h=i.needLoading,g=void 0===h||h,v=i.loadingTitle,m=void 0===v?"":v;g&&uni.showLoading({title:m});var x=t.database(this.spaceInfo);return a&&(x=x.action(a)),x.collection(this.mainCollection).doc(e).update(n).then((function(t){u&&u(t),r&&uni.showToast({title:s||c("uniCloud.component.update.success")})})).catch((function(t){l&&l(t),f&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){g&&uni.hideLoading(),d&&d()}))},getTemp:function(){var e,n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],i=t.database(this.spaceInfo);this.action&&(i=i.action(this.action)),i=(e=i).collection.apply(e,(0,a.default)(this.collectionArgs)),this.where&&Object.keys(this.where).length&&(i=i.where(this.where)),this.field&&(i=i.field(this.field)),this.foreignKey&&(i=i.foreignKey(this.foreignKey)),this.groupby&&(i=i.groupBy(this.groupby)),this.groupField&&(i=i.groupField(this.groupField)),!0===this.distinct&&(i=i.distinct()),this.orderby&&(i=i.orderBy(this.orderby));var o=this.paginationInternal,r=o.current,s=o.size,c={};this.getcount&&(c.getCount=this.getcount);var u={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(c.getTree=u),this.gettreepath&&(c.getTreePath=u),i=i.skip(s*(r-1)).limit(s),n?(i=i.getTemp(c),i.udb=this):i=i.get(c),i},setResult:function(t){0===t.code?this._execLoadDataSuccess(t):this._execLoadDataFail(new Error(t.message))},_execLoadData:function(t,e){var n=this;this.loading||(this.loading=!0,this.errorMessage="",this._getExec().then((function(i){n.loading=!1,n._execLoadDataSuccess(i.result,t,e)})).catch((function(e){n.loading=!1,n._execLoadDataFail(e,t)})))},_execLoadDataSuccess:function(t,e,n){var i=t.data,o=t.count;this._isEnded=void 0!==o?this.paginationInternal.current*this.paginationInternal.size>=o:i.length<this.pageSize,this.hasMore=!this._isEnded;var r,s=this.getone?i.length?i[0]:void 0:i;(this.getcount&&(this.paginationInternal.count=o),e&&e(s,this._isEnded,this.paginationInternal),this._dispatchEvent(u.load,s),this.getone||this.pageData===l.replace)?this.dataList=s:n?this.dataList=s:(r=this.dataList).push.apply(r,(0,a.default)(s))},_execLoadDataFail:function(t,e){this.errorMessage=t,e&&e(),this.$emit(u.error,t)},_getExec:function(){return this.getTemp(!1)},_execRemove:function(e,n,i,a,o,r,s,c){var u=this;if(this.collection&&e){var d=Array.isArray(e)?e:[e];if(d.length){s&&uni.showLoading({mask:!0,title:c});var p=t.database(this.spaceInfo),f=p.command,h=p;n&&(h=h.action(n)),h.collection(this.mainCollection).where({_id:f.in(d)}).remove().then((function(t){i&&i(t.result),u.pageData===l.replace?u.refresh():u.removeData(d)})).catch((function(t){a&&a(t),r&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){s&&uni.hideLoading(),o&&o()}))}}},removeData:function(t){for(var e=t.slice(0),n=this.dataList,i=n.length-1;i>=0;i--){var a=e.indexOf(n[i]._id);a>=0&&(n.splice(i,1),e.splice(a,1))}},_dispatchEvent:function(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded,this.paginationInternal):this.$emit(t,e,this._isEnded,this.paginationInternal)}}};e.default=f}).call(this,n("a9ff")["default"])},"52fd":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"57bb":function(t,e,n){var i=n("f62b");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("20e24984",i,!0,{sourceMap:!1,shadowMode:!1})},"5dad":function(t,e,n){"use strict";var i=n("b372"),a=n.n(i);a.a},"68f3":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否刪除數據"}')},"6eb4":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.del-modal-action[data-v-8f41ee02]{display:flex;justify-content:space-between;width:100%}.del-modal-action .left[data-v-8f41ee02]{flex:40%}.del-modal-action .right[data-v-8f41ee02]{flex:60%;display:flex;justify-content:flex-end}',""]),t.exports=e},"810f":function(t,e,n){"use strict";var i=n("57bb"),a=n.n(i);a.a},8332:function(t,e,n){"use strict";n.r(e);var i=n("ae64"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},8343:function(t,e,n){"use strict";n.r(e);var i=n("fe5f"),a=n("01b1");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("211c");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"8f41ee02",null,!1,i["a"],r);e["default"]=c.exports},"848e":function(t,e,n){"use strict";n.r(e);var i=n("4af1"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"87a0":function(t){t.exports=JSON.parse('{"uni-pagination.prevText":"上一頁","uni-pagination.nextText":"下一頁"}')},"940e":function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("e957")),o=i(n("2356")),r=i(n("d296")),s=i(n("258f")),c=i(n("87a0")),u={en:a.default,es:o.default,fr:r.default,"zh-Hans":s.default,"zh-Hant":c.default};e.default=u},"960d":function(t,e,n){"use strict";n.r(e);var i=n("348c"),a=n("848e");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var r,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=c.exports},"9a4a":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"9b17":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"Success","uniCloud.component.update.success":"Success","uniCloud.component.remove.showModal.title":"Tips","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},a7e6:function(t,e,n){"use strict";n.r(e);var i=n("ea6e"),a=n("3256");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("810f");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"5cf4be84",null,!1,i["a"],r);e["default"]=c.exports},ae64:function(t,e,n){"use strict";n("a9e3"),n("ac1f"),n("5319"),n("498a"),n("1e25"),n("eee7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm"],model:{prop:"modelValue",event:"update:modelValue"},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:String,placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:15},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},styles:{type:Object,default:function(){return{color:"#333",disableColor:"#eee",borderColor:"#e5e5e5"}}},errorMessage:{type:[String,Boolean],default:""}},data:function(){return{focused:!1,errMsg:"",val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1}},computed:{msg:function(){return this.errorMessage||this.errMsg},inputMaxlength:function(){return Number(this.maxlength)}},watch:{value:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},modelValue:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},focus:function(t){var e=this;this.$nextTick((function(){e.focused=e.focus}))}},created:function(){this.value||(this.val=this.modelValue),this.modelValue||(this.val=this.value),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.is_reset||(this.is_reset=!1,this.formItem.setValue(this.val)),this.rename=this.formItem.name,this.form.inputChildrens.push(this))},mounted:function(){var t=this;this.$nextTick((function(){t.focused=t.focus}))},methods:{init:function(){},onClickIcon:function(t){this.$emit("iconClick",t)},getForm:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniForms",e=this.$parent,n=e.$options.name;while(n!==t){if(e=e.$parent,!e)return!1;n=e.$options.name}return e},onEyes:function(){this.showPassword=!this.showPassword},onInput:function(t){var e=t.detail.value;this.trim&&("boolean"===typeof this.trim&&this.trim&&(e=this.trimStr(e)),"string"===typeof this.trim&&(e=this.trimStr(e,this.trim))),this.errMsg&&(this.errMsg=""),this.val=e,this.$emit("input",e),this.$emit("update:modelValue",e)},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){t.detail.value;this.$emit("blur",t)},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.val="",this.$emit("input",""),this.$emit("update:modelValue","")},fieldClick:function(){this.$emit("click")},trimStr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"both";return"both"===e?t.trim():"left"===e?t.trimLeft():"right"===e?t.trimRight():"start"===e?t.trimStart():"end"===e?t.trimEnd():"all"===e?t.replace(/\s+/g,""):t}}};e.default=i},b1e8:function(t,e,n){"use strict";var i=n("4ea4");n("4160"),n("a9e3"),n("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("37dc"),o=i(n("940e")),r=(0,a.initVueI18n)(o.default),s=r.t,c={name:"UniPagination",emits:["update:modelValue","input","change"],props:{value:{type:[Number,String],default:1},modelValue:{type:[Number,String],default:1},prevText:{type:String},nextText:{type:String},current:{type:[Number,String],default:1},total:{type:[Number,String],default:0},pageSize:{type:[Number,String],default:10},showIcon:{type:[Boolean,String],default:!1},pagerCount:{type:Number,default:7}},data:function(){return{currentIndex:1,paperData:[]}},computed:{prevPageText:function(){return this.prevText||s("uni-pagination.prevText")},nextPageText:function(){return this.nextText||s("uni-pagination.nextText")},maxPage:function(){var t=1,e=Number(this.total),n=Number(this.pageSize);return e&&n&&(t=Math.ceil(e/n)),t},paper:function(){for(var t=this.currentIndex,e=this.pagerCount,n=this.total,i=this.pageSize,a=[],o=[],r=Math.ceil(n/i),s=0;s<r;s++)a.push(s+1);o.push(1);var c=a[a.length-(e+1)/2];return a.forEach((function(n,i){(e+1)/2>=t?n<e+1&&n>1&&o.push(n):t+2<=c?n>t-(e+1)/2&&n<t+(e+1)/2&&o.push(n):(n>t-(e+1)/2||r-e<n)&&n<a[a.length-1]&&o.push(n)})),r>e?((e+1)/2>=t?o[o.length-1]="...":t+2<=c?(o[1]="...",o[o.length-1]="..."):o[1]="...",o.push(a[a.length-1])):(e+1)/2>=t||t+2<=c||(o.shift(),o.push(a[a.length-1])),o}},watch:{current:{immediate:!0,handler:function(t,e){this.currentIndex=t<1?1:t}},value:{immediate:!0,handler:function(t){1===Number(this.current)&&(this.currentIndex=t<1?1:t)}}},methods:{selectPage:function(t,e){if(parseInt(t))this.currentIndex=t,this.change("current");else{var n=Math.ceil(this.total/this.pageSize);if(e<=1)return void(this.currentIndex-5>1?this.currentIndex-=5:this.currentIndex=1);if(e>=6)return void(this.currentIndex+5>n?this.currentIndex=n:this.currentIndex+=5)}},clickLeft:function(){1!==Number(this.currentIndex)&&(this.currentIndex-=1,this.change("prev"))},clickRight:function(){Number(this.currentIndex)>=this.maxPage||(this.currentIndex+=1,this.change("next"))},change:function(t){this.$emit("input",this.currentIndex),this.$emit("update:modelValue",this.currentIndex),this.$emit("change",{type:t,current:this.currentIndex})}}};e.default=c},b372:function(t,e,n){var i=n("0baa");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("134177bc",i,!0,{sourceMap:!1,shadowMode:!1})},d296:function(t){t.exports=JSON.parse('{"uni-pagination.prevText":"précédente","uni-pagination.nextText":"suivante"}')},e0e4:function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},e957:function(t){t.exports=JSON.parse('{"uni-pagination.prevText":"prev","uni-pagination.nextText":"next"}')},ea6e:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uniIcons:n("48a2").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-pagination"},[n("v-uni-view",{staticClass:"uni-pagination__total is-phone-hide"},[t._v("共 "+t._s(t.total)+" 条")]),n("v-uni-view",{staticClass:"uni-pagination__btn",class:1===t.currentIndex?"uni-pagination--disabled":"uni-pagination--enabled",attrs:{"hover-class":1===t.currentIndex?"":"uni-pagination--hover","hover-start-time":20,"hover-stay-time":70},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickLeft.apply(void 0,arguments)}}},[!0===t.showIcon||"true"===t.showIcon?[n("uni-icons",{attrs:{color:"#666",size:"16",type:"left"}})]:[n("v-uni-text",{staticClass:"uni-pagination__child-btn"},[t._v(t._s(t.prevPageText))])]],2),n("v-uni-view",{staticClass:"uni-pagination__num uni-pagination__num-flex-none"},[n("v-uni-view",{staticClass:"uni-pagination__num-current"},[n("v-uni-text",{staticClass:"uni-pagination__num-current-text is-pc-hide",staticStyle:{color:"#409EFF"}},[t._v(t._s(t.currentIndex))]),n("v-uni-text",{staticClass:"uni-pagination__num-current-text is-pc-hide"},[t._v("/"+t._s(t.maxPage||0))]),t._l(t.paper,(function(e,i){return n("v-uni-view",{key:i,staticClass:"uni-pagination__num-tag tag--active is-phone-hide",class:{"page--active":e===t.currentIndex},on:{click:function(n){if(!n.type.indexOf("key")&&t._k(n.keyCode,"top",void 0,n.key,void 0))return null;arguments[0]=n=t.$handleEvent(n),t.selectPage(e,i)}}},[n("v-uni-text",[t._v(t._s(e))])],1)}))],2)],1),n("v-uni-view",{staticClass:"uni-pagination__btn",class:t.currentIndex>=t.maxPage?"uni-pagination--disabled":"uni-pagination--enabled",attrs:{"hover-class":t.currentIndex===t.maxPage?"":"uni-pagination--hover","hover-start-time":20,"hover-stay-time":70},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickRight.apply(void 0,arguments)}}},[!0===t.showIcon||"true"===t.showIcon?[n("uni-icons",{attrs:{color:"#666",size:"16",type:"right"}})]:[n("v-uni-text",{staticClass:"uni-pagination__child-btn"},[t._v(t._s(t.nextPageText))])]],2)],1)},o=[]},eee7:function(t,e,n){"use strict";var i=n("23e7"),a=n("58a8").start,o=n("c8d2"),r=o("trimStart"),s=r?function(){return a(this)}:"".trimStart;i({target:"String",proto:!0,forced:r},{trimStart:s,trimLeft:s})},f62b:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-pagination[data-v-5cf4be84]{display:flex;position:relative;overflow:hidden;flex-direction:row;justify-content:center;align-items:center}.uni-pagination__total[data-v-5cf4be84]{font-size:14px;color:#999;margin-right:15px}.uni-pagination__btn[data-v-5cf4be84]{display:flex;cursor:pointer;padding:0 8px;line-height:30px;font-size:12px;position:relative;background-color:#f0f0f0;flex-direction:row;justify-content:center;align-items:center;text-align:center;border-radius:5px}.uni-pagination__child-btn[data-v-5cf4be84]{display:flex;font-size:12px;position:relative;flex-direction:row;justify-content:center;align-items:center;text-align:center;color:#666;font-size:12px}.uni-pagination__num[data-v-5cf4be84]{display:flex;flex:1;flex-direction:row;justify-content:center;align-items:center;height:30px;line-height:30px;font-size:12px;color:#666;margin:0 5px}.uni-pagination__num-tag[data-v-5cf4be84]{cursor:pointer;min-width:30px;margin:0 5px;height:30px;text-align:center;line-height:30px;color:#999;border-radius:4px}.uni-pagination__num-current[data-v-5cf4be84]{display:flex;flex-direction:row}.uni-pagination__num-current-text[data-v-5cf4be84]{font-size:15px}.uni-pagination--enabled[data-v-5cf4be84]{color:#333;opacity:1}.uni-pagination--disabled[data-v-5cf4be84]{opacity:.5;cursor:default}.uni-pagination--hover[data-v-5cf4be84]{color:rgba(0,0,0,.6);background-color:#eee}.tag--active[data-v-5cf4be84]:hover{color:#2979ff}.page--active[data-v-5cf4be84]{color:#fff;background-color:#2979ff}.page--active[data-v-5cf4be84]:hover{color:#fff}.is-pc-hide[data-v-5cf4be84]{display:block}.is-phone-hide[data-v-5cf4be84]{display:none}@media screen and (min-width:450px){.is-pc-hide[data-v-5cf4be84]{display:none}.is-phone-hide[data-v-5cf4be84]{display:block}.uni-pagination__num-flex-none[data-v-5cf4be84]{flex:none}}',""]),t.exports=e},fe5f:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={unicloudDb:n("960d").default,uniTable:n("64fd").default,uniTr:n("1808").default,uniTh:n("26dc").default,uniTd:n("7b5b").default,uniIcons:n("48a2").default,uniPagination:n("a7e6").default,uniEasyinput:n("01c6").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"uni-header"},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-input",{staticClass:"uni-search",attrs:{type:"text",placeholder:t.$t("common.placeholder.query")},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.search.apply(void 0,arguments)}},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}}),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search.apply(void 0,arguments)}}},[t._v(t._s(t.$t("common.button.search")))]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"primary",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.batchAddSelect.apply(void 0,arguments)}}},[t._v(t._s(t.$t("common.button.batchAddSelect")))]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"warn",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.delBatch.apply(void 0,arguments)}}},[t._v("批量删除")])],1)],1),n("v-uni-view",{staticClass:"uni-container"},[n("unicloud-db",{ref:"udb",attrs:{collection:"stock-strategy-result",field:"strategy_code, execute_batch,execute_params,strategy_name,stock_code,stock_name,stock_date,execute_time",where:t.where,orderby:t.orderby,getcount:!0,"page-size":t.options.pageSize,"page-current":t.options.pageCurrent},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.data,a=e.pagination,o=e.loading,r=e.error;e.options;return[n("uni-table",{ref:"table",attrs:{loading:o,emptyText:r.message||t.$t("common.empty"),border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(e){arguments[0]=e=t.$handleEvent(e),t.selectionChange.apply(void 0,arguments)}}},[n("uni-tr",[n("uni-th",{attrs:{align:"center"}},[t._v("策略代码")]),n("uni-th",{attrs:{align:"center"}},[t._v("执行批次")]),n("uni-th",{attrs:{align:"center"}},[t._v("执行参数")]),n("uni-th",{attrs:{align:"center"}},[t._v("股票代码")]),n("uni-th",{attrs:{align:"center"}},[t._v("股票名称")]),n("uni-th",{attrs:{align:"center"}},[t._v("股票日期")]),n("uni-th",{attrs:{align:"center"}},[t._v("执行时间")]),n("uni-th",{attrs:{align:"center"}},[t._v("操作")])],1),t._l(i,(function(e,i){return n("uni-tr",{key:i},[n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.strategy_code))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.execute_batch))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.execute_params))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.stock_code))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.stock_name))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.stock_date))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.execute_time))]),n("uni-td",{attrs:{align:"center"}},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"primary"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.addSelect(e)}}},[t._v(t._s(t.$t("common.button.addSelect")))]),n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.confirmDelete(e._id)}}},[t._v(t._s(t.$t("common.button.delete")))])],1)],1)],1)}))],2),n("v-uni-view",{staticClass:"uni-pagination-box"},[n("v-uni-picker",{staticClass:"select-picker",attrs:{mode:"selector",value:t.pageSizeIndex,range:t.pageSizeOption},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeSize.apply(void 0,arguments)}}},[n("v-uni-button",{attrs:{type:"default",size:"mini",plain:!0}},[n("v-uni-text",[t._v(t._s(t.pageSizeOption[t.pageSizeIndex])+" "+t._s(t.$t("common.piecePerPage")))]),n("uni-icons",{staticClass:"select-picker-icon",attrs:{type:"arrowdown",size:"12",color:"#999"}})],1)],1),n("uni-pagination",{attrs:{"show-icon":!0,"page-size":a.size,total:a.count},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onPageChanged.apply(void 0,arguments)}},model:{value:a.current,callback:function(e){t.$set(a,"current",e)},expression:"pagination.current"}})],1)]}}])}),n("v-uni-view",{staticClass:"cu-modal",class:t.showDelModal?"show":""},[n("v-uni-view",{staticClass:"cu-dialog"},[n("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[n("v-uni-view",{staticClass:"content"},[t._v("批量删除")]),n("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hideModal.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cuIcon-close text-red"})],1)],1),n("v-uni-view",{staticClass:"padding-xl"},[n("v-uni-form",[n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-view",{staticClass:"title"},[t._v("执行批次")]),n("uni-easyinput",{model:{value:t.execBatch,callback:function(e){t.execBatch=e},expression:"execBatch"}})],1)],1)],1),n("v-uni-view",{staticClass:"cu-bar bg-white"},[n("v-uni-view",{staticClass:"del-modal-action"},[n("v-uni-view",{staticClass:"left"},[n("v-uni-view",{staticClass:"action"},[n("v-uni-button",{staticClass:"cu-btn line-red",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.delDataAll.apply(void 0,arguments)}}},[t._v("全部删除")])],1)],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-view",{staticClass:"action"},[n("v-uni-button",{staticClass:"cu-btn bg-blue",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.delDataBatch.apply(void 0,arguments)}}},[t._v("批量删除")])],1)],1)],1)],1)],1)],1)],1)],1)},o=[]}}]);
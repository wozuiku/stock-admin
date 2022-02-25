(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-permission-list"],{"09e7":function(e,t,n){"use strict";var i=n("4ea4");n("4d63"),n("ac1f"),n("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.filterToWhere=l,t.enumConverter=t.validator=void 0;var a=i(n("3835")),r=i(n("b85c")),s={permission_id:{rules:[{required:!0},{format:"string"}],label:"权限标识"},permission_name:{rules:[{required:!0},{format:"string"}],label:"权限名称"},comment:{rules:[{format:"string"}],label:"备注"}};t.validator=s;var o={};function l(e,t){var n={};for(var i in e){var s=e[i],o=s.type,l=s.value;switch(o){case"search":"string"===typeof l&&l.length&&(n[i]=new RegExp(l));break;case"select":if(l.length){var c,u=[],d=(0,r.default)(l);try{for(d.s();!(c=d.n()).done;){var f=c.value;u.push(t.eq(f))}}catch(C){d.e(C)}finally{d.f()}n[i]=t.or(u)}break;case"range":if(l.length){var h=l[0],p=l[1];n[i]=t.and([t.gte(h),t.lte(p)])}break;case"date":if(l.length){var v=(0,a.default)(l,2),m=v[0],g=v[1],b=new Date(m),_=new Date(g);n[i]=t.and([t.gte(b),t.lte(_)])}break;case"timestamp":if(l.length){var y=(0,a.default)(l,2),x=y[0],$=y[1];n[i]=t.and([t.gte(x),t.lte($)])}break}}return n}t.enumConverter=o},"4d29":function(e,t,n){"use strict";(function(e){var i=n("4ea4");n("4de4"),n("d81d"),n("b64b"),n("4d63"),n("ac1f"),n("25f0"),n("498a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("5530")),r=n("09e7"),s=e.database(),o="create_date desc",l=["permission_id","permission_name"],c=20,u=1,d={ascending:"asc",descending:"desc"},f={data:function(){return{query:"",where:"",orderby:o,orderByFieldName:"",selectedIndexs:[],pageSizeIndex:0,pageSizeOption:[20,50,100,500],options:(0,a.default)({pageSize:c,pageCurrent:u,filterData:{}},r.enumConverter),imageStyles:{width:64,height:64},exportExcel:{filename:"uni-id-permissions.xls",type:"xls",fields:{"权限ID":"permission_id","权限名称":"permission_name","备注":"comment"}},exportExcelData:[]}},onLoad:function(){this._filter={}},onReady:function(){this.$refs.udb.loadData()},watch:{pageSizeIndex:{immediate:!0,handler:function(e,t){this.options.pageSize=this.pageSizeOption[e],this.options.pageCurrent=1}}},methods:{onqueryload:function(e){this.exportExcelData=e},changeSize:function(e){var t=this;this.pageSizeIndex=e.detail.value,this.$nextTick((function(){t.loadData()}))},getWhere:function(){var e=this.query.trim();if(!e)return"";var t=new RegExp(e,"i");return l.map((function(e){return t+".test("+e+")"})).join(" || ")},search:function(){var e=this,t=this.getWhere();this.where=t,this.$nextTick((function(){e.loadData()}))},loadData:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:e})},onPageChanged:function(e){this.selectedIndexs.length=0,this.$refs.table.clearSelection(),this.$refs.udb.loadData({current:e.current})},navigateTo:function(e,t){var n=this;uni.navigateTo({url:e,events:{refreshData:function(){n.loadData(t)}}})},selectedItems:function(){var e=this.$refs.udb.dataList;return this.selectedIndexs.map((function(t){return e[t]._id}))},delTable:function(){var e=this;this.$refs.udb.remove(this.selectedItems(),{success:function(t){e.$refs.table.clearSelection()}})},selectionChange:function(e){this.selectedIndexs=e.detail.index},confirmDelete:function(e){var t=this;this.$refs.udb.remove(e,{success:function(e){t.$refs.table.clearSelection()}})},sortChange:function(e,t){var n=this;this.orderByFieldName=t,e.order?this.orderby=t+" "+d[e.order]:this.orderby="",this.$refs.table.clearSelection(),this.$nextTick((function(){n.$refs.udb.loadData()}))},filterChange:function(e,t){var n=this;this._filter[t]={type:e.filterType,value:e.filter};var i=(0,r.filterToWhere)(this._filter,s.command);Object.keys(i).length?this.where=i:this.where="",this.$nextTick((function(){n.$refs.udb.loadData()}))}}};t.default=f}).call(this,n("a9ff")["default"])},"6c35":function(e,t,n){"use strict";n.r(t);var i=n("a505"),a=n("a63f");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);var s,o=n("f0c5"),l=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"2ecfdd2f",null,!1,i["a"],s);t["default"]=l.exports},a505:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var i={downloadExcel:n("75be").default,unicloudDb:n("960d").default,uniTable:n("64fd").default,uniTr:n("1808").default,uniTh:n("26dc").default,uniTd:n("7b5b").default,uniDateformat:n("5ee2").default,uniIcons:n("48a2").default,uniPagination:n("a7e6").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"fix-top-window"},[n("v-uni-view",{staticClass:"uni-header"},[n("v-uni-view",{staticClass:"uni-group hide-on-phone"},[n("v-uni-view",{staticClass:"uni-title"},[e._v(e._s(e.$t("permission.text.permissionManager")))]),n("v-uni-view",{staticClass:"uni-sub-title"})],1),n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-input",{staticClass:"uni-search",attrs:{type:"text",placeholder:e.$t("common.placeholder.query")},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.search.apply(void 0,arguments)}},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.search.apply(void 0,arguments)}}},[e._v(e._s(e.$t("common.button.search")))]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"primary",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.navigateTo("./add")}}},[e._v(e._s(e.$t("common.button.add")))]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"warn",size:"mini",disabled:!e.selectedIndexs.length},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.delTable.apply(void 0,arguments)}}},[e._v(e._s(e.$t("common.button.batchDelete")))]),n("download-excel",{staticClass:"hide-on-phone",attrs:{fields:e.exportExcel.fields,data:e.exportExcelData,type:e.exportExcel.type,name:e.exportExcel.filename}},[n("v-uni-button",{staticClass:"uni-button",attrs:{type:"primary",size:"mini"}},[e._v(e._s(e.$t("common.button.exportExcel")))])],1)],1)],1),n("v-uni-view",{staticClass:"uni-container"},[n("unicloud-db",{ref:"udb",attrs:{collection:"uni-id-permissions",field:"permission_id,permission_name,comment,create_date",where:e.where,"page-data":"replace",orderby:e.orderby,getcount:!0,"page-size":e.options.pageSize,"page-current":e.options.pageCurrent,options:e.options,loadtime:"manual"},on:{load:function(t){arguments[0]=t=e.$handleEvent(t),e.onqueryload.apply(void 0,arguments)}},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.data,a=t.pagination,r=t.loading,s=t.error;t.options;return[n("uni-table",{ref:"table",attrs:{loading:r,emptyText:s.message||e.$t("common.empty"),border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(t){arguments[0]=t=e.$handleEvent(t),e.selectionChange.apply(void 0,arguments)}}},[n("uni-tr",[n("uni-th",{attrs:{align:"center","filter-type":"search",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"permission_id")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"permission_id")}}},[e._v("权限标识")]),n("uni-th",{attrs:{align:"center","filter-type":"search",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"permission_name")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"permission_name")}}},[e._v("权限名称")]),n("uni-th",{attrs:{align:"center","filter-type":"search",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"comment")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"comment")}}},[e._v("备注")]),n("uni-th",{attrs:{align:"center","filter-type":"timestamp",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"create_date")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"create_date")}}},[e._v("创建时间")]),n("uni-th",{attrs:{align:"center"}},[e._v("操作")])],1),e._l(i,(function(t,i){return n("uni-tr",{key:i},[n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.permission_id))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.permission_name))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.comment))]),n("uni-td",{attrs:{align:"center"}},[n("uni-dateformat",{attrs:{threshold:[0,0],date:t.create_date}})],1),n("uni-td",{attrs:{align:"center"}},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"primary"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.navigateTo("./edit?id="+t._id,!1)}}},[e._v(e._s(e.$t("common.button.edit")))]),n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.confirmDelete(t._id)}}},[e._v(e._s(e.$t("common.button.delete")))])],1)],1)],1)}))],2),n("v-uni-view",{staticClass:"uni-pagination-box"},[n("v-uni-picker",{staticClass:"select-picker",attrs:{mode:"selector",value:e.pageSizeIndex,range:e.pageSizeOption},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.changeSize.apply(void 0,arguments)}}},[n("v-uni-button",{attrs:{type:"default",size:"mini",plain:!0}},[n("v-uni-text",[e._v(e._s(e.pageSizeOption[e.pageSizeIndex])+" "+e._s(e.$t("common.piecePerPage")))]),n("uni-icons",{staticClass:"select-picker-icon",attrs:{type:"arrowdown",size:"12",color:"#999"}})],1)],1),n("uni-pagination",{attrs:{"show-icon":!0,"page-size":a.size,total:a.count},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onPageChanged.apply(void 0,arguments)}},model:{value:a.current,callback:function(t){e.$set(a,"current",t)},expression:"pagination.current"}})],1)]}}])})],1)],1)},r=[]},a63f:function(e,t,n){"use strict";n.r(t);var i=n("4d29"),a=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a}}]);
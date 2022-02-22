<template>
	<view class="fix-top-window">
		<view class="uni-header">
			<view class="uni-group hide-on-phone">
				<view class="uni-title">{{$t('stock.text.stockCode')}}</view>
				<view class="uni-sub-title"></view>
			</view>
			
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search"
					:placeholder="$t('common.placeholder.query')" />
				<button class="uni-button" type="default" size="mini"
					@click="search">{{$t('common.button.search')}}</button>
				<button class="uni-button" type="primary" size="mini"
					@click="navigateTo('./add')">{{$t('common.button.add')}}</button>
				<!-- <button class="uni-button" type="warn" size="mini" :disabled="!selectedIndexs.length"
					@click="delTable">{{$t('common.button.batchDelete')}}</button>
				<button class="uni-button" type="primary" size="mini" :disabled="!selectedIndexs.length"
					@click="openTagsPopup">标签管理</button> -->
				<!-- #ifdef H5 -->
				<!-- <download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData"
					:type="exportExcel.type" :name="exportExcel.filename">
					<button class="uni-button" type="primary" size="mini">{{$t('common.button.exportExcel')}}</button>
				</download-excel> -->
				<!-- #endif -->
			</view>
		</view>
		
		<view class="uni-container">
			<!-- <unicloud-db ref="udb" collection="stock" field="code,name" :where="where" 
			page-data="replace" :orderby="orderby" :getcount="true" :page-size="options.pageSize"
			:page-current="options.pageCurrent" v-slot:default="{data, loading, error, options}" 
			:options="options" loadtime="manual" @load="onqueryload">
				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
					type="selection" @selection-change="selectionChange">
					<uni-tr>
						<uni-th align="center">代码</uni-th>
						<uni-th align="center">名称</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.code}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
					</uni-tr>
				</uni-table>
			</unicloud-db> -->
			
			<unicloud-db ref="udb" collection="stock" field="code,name" v-slot:default="{data, loading, error, options}" >
				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
					>
					<uni-tr>
						<uni-th align="center">代码</uni-th>
						<uni-th align="center">名称</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.code}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
					</uni-tr>
				</uni-table>
			</unicloud-db>
		</view>	
		
	</view>
</template>

<script>
	// 表查询配置
	const dbOrderBy = 'code desc' // 排序字段
	const dbSearchFields = ['username', 'role.role_name', 'mobile', 'email'] // 支持模糊搜索的字段列表
	
	export default {
		data(){
			return {
				query: '',
				where: '',
				selectedIndexs: [],
				
				orderby: dbOrderBy,
				
				options: {
					pageSize,
					pageCurrent,
				},
				
				exportExcel: {
					"filename": "uni-id-users.xls",
					"type": "xls",
					"fields": {
						"用户名": "username",
						"手机号码": "mobile",
						"用户状态": "status",
						"邮箱": "email",
						"角色": "role",
						"register_date": "register_date"
					}
				},
				exportExcelData: [],
			}
		},
		
		methods:{
			
			onqueryload(){
				
			},
			
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			
			search() {
				const newWhere = this.getWhere()
				this.where = newWhere
				// 下一帧拿到查询条件
				this.$nextTick(() => {
					this.loadData()
				})
			},
			
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
			},
			
			navigateTo(url, clear) {
				// clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							this.loadTags()
							this.loadData(clear)
						}
					}
				})
			},
			
			// 批量删除
			delTable() {
				this.$refs.udb.remove(this.selectedItems(), {
					success: (res) => {
						this.$refs.table.clearSelection()
					}
				})
			},
			
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
		}
	}
	
</script>

<style>
</style>

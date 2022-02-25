<template>
	<view class="fix-top-window">
		<view class="uni-header">
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search"
					:placeholder="$t('common.placeholder.query')" />
				<button class="uni-button" type="default" size="mini"
					@click="search">{{$t('common.button.search')}}</button>
				<button class="uni-button" type="primary" size="mini"
					@click="navigateTo('./add')">{{$t('common.button.add')}}</button>
			</view>
		</view>
		
		<view class="uni-container">
			<unicloud-db ref="udb" collection="stock-code" field="code,name, exchange, source_code" :where="where" 
			page-data="replace" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
			v-slot:default="{data, pagination, loading, error, options}" 
		    :options="options" @load="onqueryload">
				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
				type="selection">
					<uni-tr>
						<uni-th align="center">代码</uni-th>
						<uni-th align="center">名称</uni-th>
						<uni-th align="center">交易所</uni-th>
						<uni-th align="center">原始码</uni-th>
						<uni-th align="center">操作</uni-th>
						
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.code}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
						<uni-td align="center">{{item.exchange}}</uni-td>
						<uni-td align="center">{{item.source_code}}</uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini"
									type="primary">{{$t('common.button.edit')}}</button>
								<button @click="confirmDelete(item._id)" class="uni-button" size="mini"
									type="warn">{{$t('common.button.delete')}}</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<!-- #ifndef MP -->
					<picker class="select-picker" mode="selector" :value="pageSizeIndex" :range="pageSizeOption"
						@change="changeSize">
						<button type="default" size="mini" :plain="true">
							<text>{{pageSizeOption[pageSizeIndex]}} {{$t('common.piecePerPage')}}</text>
							<uni-icons class="select-picker-icon" type="arrowdown" size="12" color="#999"></uni-icons>
						</button>
					</picker>
					<!-- #endif -->
					<uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current"
						:total="pagination.count" @change="onPageChanged" />
				</view>
			</unicloud-db>
		</view>	
		
	</view>
</template>

<script>
	// 表查询配置
	const dbOrderBy = 'code asc' // 排序字段
	const dbSearchFields = ['code', 'name' , 'exchange', 'source_code'] // 支持模糊搜索的字段列表
	
	// 分页配置
	const pageSize = 10
	const pageCurrent = 1
	
	export default {
		data(){
			return {
				query: '',
				where: '',
				selectedIndexs: [],
				pageSizeIndex: 0,
				pageSizeOption: [10, 20, 50, 100, 500],
				
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
			
			onqueryload(data){
				console.log('onqueryload:', data);
			},
			
			changeSize(e) {
				this.pageSizeIndex = e.detail.value
			},
			
			getWhere() {
				//const query = this.query.trim()
				//const query = this.query
				if (!this.query) {
					return ''
				}
				const queryRe = new RegExp(this.query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			
			search() {
				const newWhere = this.getWhere()
				console.log('search:', newWhere);
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
			
			onPageChanged(e) {
				this.selectedIndexs.length = 0
				this.$refs.table.clearSelection()
				this.$refs.udb.loadData({
					current: e.current
				})
			},
			
			navigateTo(url, clear) {
				// clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
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

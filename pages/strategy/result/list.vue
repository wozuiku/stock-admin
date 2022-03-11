<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search"
					:placeholder="$t('common.placeholder.query')" />
				<button class="uni-button" type="default" size="mini"
					@click="search">{{$t('common.button.search')}}</button>
				<button class="uni-button" type="primary" size="mini"
					@click="batchAddSelect">{{$t('common.button.batchAddSelect')}}</button>
				<button class="uni-button" type="warn" size="mini"
					@click="delTable">{{$t('common.button.batchDelete')}}</button>
				<button class="uni-button" type="warn" size="mini"
					@click="delAll">{{$t('common.button.allDelete')}}</button>
			</view>
		</view>

		<view class="uni-container">
			<unicloud-db ref="udb" collection="stock-strategy-result"
				field="execute_batch,data_batch,strategy_code,strategy_name,stock_code,stock_name,stock_date,execute_time" :where="where"
				:orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
				v-slot:default="{data,pagination, loading, error, options}">
				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
					type="selection" @selection-change="selectionChange">

					<uni-tr>
						<uni-th align="center">执行批次</uni-th>
						<uni-th align="center">数据批次</uni-th>
						<uni-th align="center">策略代码</uni-th>
						<uni-th align="center">策略名称</uni-th>
						<uni-th align="center">股票代码</uni-th>
						<uni-th align="center">股票名称</uni-th>
						<uni-th align="center">股票日期</uni-th>
						<uni-th align="center">执行时间</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.execute_batch}}</uni-td>
						<uni-td align="center">{{item.data_batch}}</uni-td>
						<uni-td align="center">{{item.strategy_code}}</uni-td>
						<uni-td align="center">{{item.strategy_name}}</uni-td>
						<uni-td align="center">{{item.stock_code}}</uni-td>
						<uni-td align="center">{{item.stock_name}}</uni-td>
						<uni-td align="center">{{item.stock_date}}</uni-td>
						<uni-td align="center">{{item.execute_time}}</uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button @click="addSelect(item)" class="uni-button" size="mini"
									type="primary">{{$t('common.button.addSelect')}}</button>
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
	const dbSearchFields = ['execute_batch', 'data_batch', 'strategy_code', 'strategy_name', 'stock_code', 'stock_name', 'execute_time'] // 支持模糊搜索的字段列表
	const dbOrderBy = 'execute_batch desc' // 排序字段
	
	const pageSize = 10
	const pageCurrent = 1
	
	const db = uniCloud.database();
	const dbCmd = db.command;

	export default {
		data() {
			return {
				query: '',
				where: '',
				orderby: dbOrderBy,
				selectedIndexs: [],
				pageSizeIndex: 0,
				pageSizeOption: [10, 20, 50, 100, 500],

				options: {
					pageSize,
					pageCurrent,
				},
			}
		},

		watch: {
			pageSizeIndex: {
				immediate: true,
				handler(val, old) {
					this.options.pageSize = this.pageSizeOption[val]
					this.options.pageCurrent = 1
					this.$nextTick(() => {
						this.loadData()
					})
				}
			}
		},

		methods: {

			search() {
				const newWhere = this.getWhere()
				this.where = newWhere
				console.log('search:', this.where);
				// 下一帧拿到查询条件
				this.$nextTick(() => {
					this.loadData()
				})
			},
			
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			
			async batchAddSelect(){
				let selectItem = {}, selectList = [], dataList = [], today = this.getDate()
				dataList = this.$refs.udb.dataList
				
				dataList.forEach((item, index) => {
					selectItem = {}
					selectItem.type = item.strategy_code
					selectItem.code = item.stock_code
					selectItem.name = item.stock_name
					selectItem.date = today
					
					selectList.push(selectItem)
				})
				
				console.log('batchAddSelect selectList:', selectList);
				
				let res = await db.collection('stock-select').add(selectList)
				console.log('res:', res);
				if(res.result.code == 0){
					uni.showToast({
						'title': '批量添加成功',
						'icon': 'none'
					})
				}
			},

			navigateTo(url, clear) {
				console.log('navigateTo url:', url);
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
			
			getDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
			},
			
			async addSelect(item){
				console.log('addSelect');
				let selectItem = {}
				selectItem.type = item.strategy_code
				selectItem.code = item.stock_code
				selectItem.name = item.stock_name
				selectItem.date = this.getDate()
				
				let res = await db.collection('stock-select').add(selectItem)
				console.log('res:', res);
				if(res.result.code == 0){
					uni.showToast({
						'title': '添加成功',
						'icon': 'none'
					})
				}
				
			},
			
			confirmDelete(id) {
				this.$refs.udb.remove(id, {
					success: (res) => {
						this.$refs.table.clearSelection()
					}
				})
			},
			
			// 多选处理
			selectedItems() {
				var dataList = this.$refs.udb.dataList
				return this.selectedIndexs.map(i => dataList[i]._id)
			},
			
			// 批量删除
			delTable() {
				this.$refs.udb.remove(this.selectedItems(), {
					success: (res) => {
						this.$refs.table.clearSelection()
					}
				})
			},
			
			async delAll(){
				let res = await db.collection('stock-strategy-result').where({
					_id: dbCmd.exists(true)
				}).remove()
				
				this.search()
			},
			
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},

			changeSize(e) {
				this.pageSizeIndex = e.detail.value
			},

			onPageChanged(e) {
				this.selectedIndexs.length = 0
				this.$refs.table.clearSelection()
				this.$refs.udb.loadData({
					current: e.current
				})
			},

			
					
					
		}
	}
</script>

<style lang="scss" scoped>
	.del-modal-action {
		display: flex;
		justify-content: space-between;
		width: 100%;

		.left {
			flex: 40%;
		}

		.right {
			flex: 60%;
			display: flex;
			justify-content: flex-end;
		}

	}
</style>

<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search"
					:placeholder="$t('common.placeholder.query')" />
				<button class="uni-button" type="default" size="mini"
					@click="search">{{$t('common.button.search')}}</button>
				<button class="uni-button" type="primary" size="mini"
					@click="navigateTo('./add')">同步数据</button>
				<button class="uni-button" type="primary" size="mini"
					@click="navigateTo('./validate')">数据校验</button>
				<!-- <button class="uni-button" type="warn" size="mini"
					@click="delTable">{{$t('common.button.batchDelete')}}</button>
				<button class="uni-button" type="warn" size="mini"
					@click="delAll">{{$t('common.button.allDelete')}}</button> -->
				<button class="uni-button" type="warn" size="mini"
					@click="delBatch">批量删除</button>
			</view>
		</view>

		<view class="uni-container">
			<unicloud-db ref="udb" collection="stock-data-history"
				field="batch,code,name,date,close,high,low,open,pre_close,up_down_amount,up_down_range,turn_over_rate,bargain_volume,bargain_amount,total_market_value,flow_market_value,bargain_ticket_count,time" :where="where"
				:getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
				v-slot:default="{data,pagination, loading, error, options}">
				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
					type="selection" @selection-change="selectionChange">

					<uni-tr>
						<uni-th align="center">批次</uni-th>
						<uni-th align="center">股票代码</uni-th>
						<uni-th align="center">股票名称</uni-th>
						<uni-th align="center">股票日期</uni-th>
						<uni-th align="center">收盘价</uni-th>
						<uni-th align="center">最高价</uni-th>
						<uni-th align="center">最低价</uni-th>
						<uni-th align="center">开盘价</uni-th>
						<uni-th align="center">前收盘</uni-th>
						<uni-th align="center">涨跌额</uni-th>
						<uni-th align="center">涨跌幅</uni-th>
						<uni-th align="center">换手率</uni-th>
						<uni-th align="center">成交量</uni-th>
						<uni-th align="center">成交金额</uni-th>
						<uni-th align="center">总市值</uni-th>
						<uni-th align="center">流通市值</uni-th>
						<uni-th align="center">成交笔数</uni-th>
						<uni-th align="center">同步时间</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.batch}}</uni-td>
						<uni-td align="center">{{item.code}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
						<uni-td align="center">{{item.date}}</uni-td>
						<uni-td align="center">{{item.close}}</uni-td>
						<uni-td align="center">{{item.high}}</uni-td>
						<uni-td align="center">{{item.low}}</uni-td>
						<uni-td align="center">{{item.open}}</uni-td>
						<uni-td align="center">{{item.pre_close}}</uni-td>
						<uni-td align="center">{{item.up_down_amount}}</uni-td>
						<uni-td align="center">{{item.up_down_range}}</uni-td>
						<uni-td align="center">{{item.turn_over_rate}}</uni-td>
						<uni-td align="center">{{item.bargain_volume}}</uni-td>
						<uni-td align="center">{{item.bargain_amount}}</uni-td>
						<uni-td align="center">{{item.total_market_value}}</uni-td>
						<uni-td align="center">{{item.flow_market_value}}</uni-td>
						<uni-td align="center">{{item.bargain_ticket_count}}</uni-td>
						<uni-td align="center">{{item.time}}</uni-td>
						<uni-td align="center">
							<view class="uni-group">
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
			
			<view class="cu-modal" :class="showDelModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">批量删除</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<form>
							<view class="cu-form-group">
								<view class="title">同步批次</view>
								<uni-easyinput v-model="syncBatch"></uni-easyinput>
							</view>
							<view class="cu-form-group">
								<view class="title">股票日期</view>
								<picker mode="date" :value="stockDate" @change="stockDateChange">
									<view class="picker">
										{{stockDate}}
									</view>
								</picker>
							</view>
							<view class="cu-form-group">
								<view class="title">股票代码</view>
								<uni-easyinput v-model="stockCode"></uni-easyinput>
							</view>
						</form>
					</view>
					<view class="cu-bar bg-white">
			
						<view class="del-modal-action">
							<view class="left">
								<view class="action">
									<button class="cu-btn line-red"
										@click="delDataAll">全部删除</button>
								</view>
							</view>
							<view class="right">
								<view class="action">
									
									<button class="cu-btn bg-blue" 
										@click="delDataBatch">批量删除</button>
									
								</view>
							</view>
						</view>
			
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	const dbSearchFields = ['batch', 'code', 'name', 'date', 'close', 'high', 'low', 'open', 'pre_close','up_down_amount','up_down_range','turn_over_rate','bargain_volume','bargain_amount','total_market_value','flow_market_value','bargain_ticket_count','time'] // 支持模糊搜索的字段列表
	
	const pageSize = 10
	const pageCurrent = 1

	export default {
		data() {
			return {
				query: '',
				where: '',
				selectedIndexs: [],
				pageSizeIndex: 0,
				pageSizeOption: [10, 20, 50, 100, 500],

				options: {
					pageSize,
					pageCurrent,
				},
				
				showDelModal: false,
				syncBatch: '',
				stockDate: '选择日期',
				stockCode: '',
				
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
			
			
			delBatch() {
				this.showDelModal = true
			},
			
			hideModal() {
				this.showDelModal = false
			},
			
			
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
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
			
			
			stockDateChange: function(e) {
				this.stockDate = e.target.value
			},
			
			async delDataAll(){
				let res = await db.collection('stock-data-history').where({
					_id: dbCmd.exists(true)
				}).remove()
				
				this.search()
			},
			
			async delDataBatch(){
				console.log('syncBatch:', this.syncBatch);
				console.log('stockDate:', this.stockDate);
				console.log('stockCode:', this.stockCode);
				if(this.syncBatch != '' && this.stockDate == '选择日期' && this.stockCode == ''){
					console.log('按批次删除');
					let res = await db.collection('stock-data-history').where({
						batch: dbCmd.eq(this.syncBatch)
					}).remove()
				}else if(this.syncBatch == '' && this.stockDate != '选择日期' && this.stockCode == ''){
					console.log('按日期删除');
					let res = await db.collection('stock-data-history').where({
						date: dbCmd.eq(this.stockDate)
					}).remove()
				}else if(this.syncBatch == '' && this.stockDate == '选择日期' && this.stockCode != ''){
					console.log('按代码删除');
					let res = await db.collection('stock-data-history').where({
						code: dbCmd.eq(this.stockCode)
					}).remove()
				}
				
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

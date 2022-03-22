<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search"
					:placeholder="$t('common.placeholder.query')" />
				<button class="uni-button" type="default" size="mini"
					@click="search">{{$t('common.button.search')}}</button>
				<!-- <button class="uni-button" type="primary" size="mini" :loading="syncLoading"
					@click="sync">{{syncBtnText}}</button> -->
				<button class="uni-button" type="primary" size="mini"
						@click="navigateTo('./add')">同步数据</button>
				<button class="uni-button" type="primary" size="mini"
					@click="navigateTo('./validate')">数据校验</button>
				<button class="uni-button" type="warn" size="mini"
					@click="delBatch">批量删除</button>
				<!-- #ifdef H5 -->
				<download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData"
					:type="exportExcel.type" :name="exportExcel.filename">
					<button class="uni-button" type="primary" size="mini">{{$t('common.button.exportExcel')}}</button>
				</download-excel>
				<!-- #endif -->
			</view>
		</view>

		<view class="uni-container">
			<unicloud-db ref="udb" collection="stock-data-now"
				field="batch,time,date,code,name,price,high,low,open,pre_close,bargain_volume,bargain_amount" :where="where"
				:orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
				v-slot:default="{data,pagination, loading, error, options}">
				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
					type="selection" @selection-change="selectionChange">

					<uni-tr>
						<uni-th align="center">批次</uni-th>
						<uni-th align="center">时间</uni-th>
						<!-- <uni-th align="center">日期</uni-th> -->
						<uni-th align="center">代码</uni-th>
						<uni-th align="center">名称</uni-th>
						<uni-th align="center">价格</uni-th>
						<uni-th align="center">最高价</uni-th>
						<uni-th align="center">最低价</uni-th>
						<uni-th align="center">开盘价</uni-th>
						<uni-th align="center">昨收价</uni-th>
						<uni-th align="center">成交量</uni-th>
						<uni-th align="center">成交额</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.batch}}</uni-td>
						<uni-td align="center">{{item.time}}</uni-td>
						<!-- <uni-td align="center">{{item.date}}</uni-td> -->
						<uni-td align="center">{{item.code}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
						<uni-td align="center">{{item.price}}</uni-td>
						<uni-td align="center">{{item.high}}</uni-td>
						<uni-td align="center">{{item.low}}</uni-td>
						<uni-td align="center">{{item.open}}</uni-td>
						<uni-td align="center">{{item.pre_close}}</uni-td>
						<uni-td align="center">{{item.bargain_volume}}</uni-td>
						<uni-td align="center">{{item.bargain_amount}}</uni-td>
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
								<view class="title">选择批次</view>
								<uni-easyinput v-model="batchNo"></uni-easyinput>
							</view>
							<view class="cu-form-group">
								<view class="title">选择日期</view>
								<picker mode="date" :value="delDate" @change="delDateChange">
									<view class="picker">
										{{delDate}}
									</view>
								</picker>
							</view>
						</form>
					</view>
					<view class="cu-bar bg-white">

						<view class="del-modal-action">
							<view class="left">
								<view class="action">
									<button class="cu-btn line-red" :loading="delAllLoading"
										@click="delDataAll">{{delAllBtnText}}</button>



								</view>
							</view>
							<view class="right">
								<view class="action">
									<button class="cu-btn bg-blue" :loading="delBatchLoading"
										@click="delDataBatch">{{delBatchBtnText}}</button>
									<button class="cu-btn bg-blue margin-left" :loading="delDateLoading"
										@click="delDataDate">{{delDateBtnText}}</button>
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
	
	const dbSearchFields = ['batch', 'time', 'date', 'code', 'name', 'price', 'high', 'low', 'open', 'pre_close',
		'item.bargain_volume', 'bargain_amount'
	] // 支持模糊搜索的字段列表
	const dbOrderBy = 'batch desc' // 排序字段


	const pageSize = 10
	const pageCurrent = 1

	export default {
		data() {
			return {
				query: '',
				where: '',
				orderby: dbOrderBy,
				selectedIndexs: [],
				pageSizeIndex: 0,
				pageSizeOption: [10, 20, 50, 100, 500],

				syncLoading: false,
				syncBtnText: '同步',

				showDelModal: false,
				batchNo: '',
				syncBatchNo: '',
				delDate: this.getDate(),
				delBatchLoading: false,
				delBatchBtnText: '按批次',
				delDateLoading: false,
				delDateBtnText: '按日期',
				delAllLoading: false,
				delAllBtnText: '全部删除',

				options: {
					pageSize,
					pageCurrent,
					filterData: {
						"status_localdata": [{
								"text": "正常",
								"value": 0,
								"checked": true
							},
							{
								"text": "禁用",
								"value": 1
							},
							{
								"text": "审核中",
								"value": 2
							},
							{
								"text": "审核拒绝",
								"value": 3
							}
						]
					},
				},

				exportExcel: {
					"filename": "stock-now-data.xls",
					"type": "xls",
					"fields": {
						"时间": "time",
						"代码": "code",
						"名称": "name",
						"价格": "price",
						"最高价": "high",
						"最低价": "low",
						"开盘价": "open",
						"昨天价格": "pre_close",
						"成交量": "bargain_volume",
						"成交额": "bargain_amount"
					}
				},
				exportExcelData: [],
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

			async sync() {
				
				this.syncBatchNo = await this.$batch.getBatchNo('NOW')
				console.log('sync this.syncBatchNo:', this.syncBatchNo);
				
				this.syncLoading = true
				this.syncBtnText = '同步中...'
				uniCloud.callFunction({
						name: 'data-cf',
						data: {
							type: 'sync',
							batch: this.syncBatchNo
						}
					})
					.then(res => {
						console.log('sync res:', res);
						this.syncLoading = false
						this.syncBtnText = '同步'
						this.search()
					});
			},

			delBatch() {
				this.showDelModal = true
			},

			hideModal() {
				this.showDelModal = false
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

			delDateChange: function(e) {
				this.delDate = e.target.value
			},

			delDataAll() {
				this.delAllLoading = true
				this.delAllBtnText = '删除'
				uniCloud.callFunction({
						name: 'data-cf',
						data: {
							type: 'delAll'
						}
					})
					.then(res => {
						console.log('delDataAll res:', res);

						setTimeout(() => {
							this.delAllLoading = false
							this.delAllBtnText = '全部删除'
							this.search()
						}, 1000)

						//this.showDelModal = false
						//
					});
			},
			
			delDataBatch() {
				console.log('this.batchNo:', this.batchNo);
				this.delBatchLoading = true
				this.delBatchBtnText = '删除'
				uniCloud.callFunction({
						name: 'data-cf',
						data: {
							type: 'delBatch',
							batch: this.batchNo
						}
					})
					.then(res => {
						console.log('delDate res:', res);
						setTimeout(() => {
							this.delBatchLoading = false
							this.delBatchBtnText = '按批次'
							this.search()
						}, 200)
					});
			},

			delDataDate() {
				console.log('this.delDate:', this.delDate);
				this.delDateLoading = true
				this.delDateBtnText = '删除中'
				uniCloud.callFunction({
						name: 'data-cf',
						data: {
							type: 'delDate',
							date: this.delDate
						}
					})
					.then(res => {
						console.log('delDate res:', res);
						setTimeout(() => {
							this.delDateLoading = false
							this.delDateBtnText = '按日期'
							this.search()
						}, 200)
					});
			},


			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},

			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
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
			
			navigateTo(url, clear) {
				
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							this.loadData(clear)
						}
					}
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

<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search"
					:placeholder="$t('common.placeholder.query')" />
				<button class="uni-button" type="default" size="mini"
					@click="search">{{$t('common.button.search')}}</button>
				<button class="uni-button" type="primary" size="mini"
					@click="sync">{{$t('common.button.sync')}}</button>
				<button class="uni-button" type="warn" size="mini"
					@click="delBatch">{{$t('common.button.batchDelete')}}</button>
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
			field="time,code,name,price,high,low,open,pre_close,bargain_volume,bargain_amount"
			:where="where" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
			v-slot:default="{data,pagination, loading, error, options}" >
				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
					type="selection" @selection-change="selectionChange">
					
					<uni-tr>
						<uni-th align="center" >时间</uni-th>
						<uni-th align="center" >代码</uni-th>
						<uni-th align="center" >名称</uni-th>
						<uni-th align="center" >价格</uni-th>
						<uni-th align="center" >最高价</uni-th>
						<uni-th align="center" >最低价</uni-th>
						<uni-th align="center" >开盘价</uni-th>
						<uni-th align="center" >昨收价</uni-th>
						<uni-th align="center" >成交量</uni-th>
						<uni-th align="center" >成交额</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.time}}</uni-td>
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
		</view>
	</view>
</template>

<script>
	
	// 分页配置
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
			
			sync() {
				uniCloud.callFunction({
					name: 'data_cf'
				}).then(res => {
					//console.log(res);
				});
			},
			
			delBatch(){
				uni.showModal({
				    title: '提示',
				    content: '这是一个模态弹窗',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
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
		}
	}
</script>

<style>
</style>

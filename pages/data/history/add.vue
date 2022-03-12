<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="type" label="同步类型">
				<view class="picker-box">
					<picker @change="typePickerChange" :value="typeIndex" :range="typePicker">
						<view class="picker">
							{{typeIndex>-1?typePicker[typeIndex]:'点击选择'}}
						</view>
					</picker>
				</view>
			</uni-forms-item>
			<uni-forms-item name="code" label="股票代码">
				<uni-easyinput v-model="formData.code" :clearable="true" :disabled="codeDisabled" />
			</uni-forms-item>
			<uni-forms-item name="startDate" label="开始时间">
				<view class="picker-box">
					<picker mode="date" :value="formData.startDate" @change="startDateChange">
						<view class="picker">
							{{formData.startDate}}
						</view>
					</picker>
				</view>
			</uni-forms-item>
			<uni-forms-item name="endDate" label="截止时间">

				<view class="picker-box">
					<picker mode="date" :value="formData.endDate" @change="endDateChange">
						<view class="picker">
							{{formData.endDate}}
						</view>
					</picker>
				</view>
			</uni-forms-item>
			<uni-forms-item name="batch" label="同步批次">
				<uni-easyinput v-model="formData.batch" :clearable="true" :disabled="true" />
			</uni-forms-item>
			<uni-forms-item name="process" label="同步进度">
				<slider :value="process" show-value></slider>
			</uni-forms-item>
			<view class="uni-button-group">
				<button style="width: 100px;" type="primary" class="uni-button"
					@click="submitForm">{{$t('common.button.submit')}}</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;"><button style="width: 100px;"
						class="uni-button">{{$t('common.button.back')}}</button></navigator>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'stock-strategy-set';

	export default {
		data() {
			return {
				formData: {
					type: '', //同步类型
					code: '',
					startDate: '',
					endDate: '',
					batch: '',
					time: ''
				},

				typeIndex: -1,
				typePicker: [],

				codeDisabled: false,

				process: 0
			}
		},

		onLoad() {
			this.init()
		},

		watch: {
			'formData.type': function(val) {
				console.log('type:', val);
				if (val == 'all') {
					this.codeDisabled = true
				} else {
					this.codeDisabled = false
				}
			}
		},

		methods: {

			init() {
				this.typePicker = ['all', 'one']
				this.formData.startDate = this.getDate()
				this.formData.endDate = this.getDate()
			},

			submitForm() {
				this.$refs.form.submit();
			},

			async submit(event) {
				const {
					value,
					errors
				} = event.detail
				console.log('submit value:', value);

				this.formData.batch = await this.$batch.getBatchNo('HIS')

				//获取执行时间
				this.formData.time = new Date().format("yyyy-MM-dd hh:mm:ss");
				
				await this.syncHistoryData()


				// uniCloud.callFunction({
				// 		name: 'data-history-cf',
				// 		data: {
				// 			type: 'sync',
				// 			code: this.formData.code,
				// 			startDate: this.formData.startDate,
				// 			endDate: this.formData.endDate,
				// 			batch: this.formData.batch,
				// 			time: this.formData.time
				// 		}
				// 	})
				// 	.then(res => {
				// 		console.log('data-history-cf res:', res);

				// 	});
			},
			
			
			async syncHistoryData() {
				let res = {},
					totalCount = 0, //表stock-code总记录数
					pageSize = 500, //分页查询每页大小
					totalPage = 0, //表stock-code总页数即分页查询总共需要查询次数
					pageObj = {}, //分页查询每次返回数据pageObj包含stockList和lastId
					lastId = '', //分页查询每次查询起始位置
					dataList = [], //数据列表
					strategyItemList = []
					
				res = await db.collection('stock-code').where({
					_id: dbCmd.neq(null)
				}).count()
				totalCount = res.result.total
				totalPage = Math.ceil(totalCount / pageSize)
				
				//初始lastId默认为第一条记录_id
				res = await db.collection('stock-data-now').limit(1).orderBy("_id", "asc").get()
				//console.log('strategyShadow res:', res);
				lastId = res.result.data[0]._id
				console.log('totalCount:', totalCount, 'totalPage:', totalPage, 'lastId:', lastId);
				
				//分页获取股票列表并同步实时数据
				for (let i = 0; i < totalPage; i++) {
					console.log('当前分页:', i);
					//分页获取实时数据
					pageObj = await this.getDataByPage(i, lastId, pageSize)
					//dataList = pageObj.dataList
					//lastId = pageObj.lastId
					//console.log('dataList:', dataList);
					//获取符合策略股票列表
					//strategyItemList = await this.getStrategyItems(dataList)
					//将符合策略的股票列表插入到策略结果表
					//if(strategyItemList.length > 0){
						//await this.insertStrategyResult(strategyItemList)
					//}
					
					this.process = ((1 + i) / totalPage) * 100
				}
				
				
			},
			
			
			//分页获取股票数据
			async getDataByPage(currentPageNo, lastId, pageSize) {
				let res = {}
				let pageObj = {}
			
				if (currentPageNo == 0) {
					res = await db.collection('stock-code').where({
						_id: dbCmd.gte(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				} else {
					res = await db.collection('stock-code').where({
						_id: dbCmd.gt(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				}
				
				console.log('getDataByPage res:', res);
				
			
				let listCount = res.result.data.length
				if(listCount > 0){
					pageObj.lastId = res.result.data[listCount - 1]._id
					pageObj.dataList = res.result.data
								
					return pageObj
				}
				
			},
			

			typePickerChange(e) {
				this.typeIndex = e.detail.value
				this.formData.type = this.typePicker[this.typeIndex]
			},

			startDateChange(e) {
				this.formData.startDate = e.target.value
			},

			endDateChange(e) {
				this.formData.endDate = e.target.value
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

			//获取当前日期
			getDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},

		},
	}
</script>

<style lang="scss" scoped>
	.picker-box {
		width: 440px;
		display: flex;
		align-items: center;
		height: 36px;
	}
</style>

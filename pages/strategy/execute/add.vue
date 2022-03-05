<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="strategy_code" label="选择策略">
				<view class="strategy-picker">
					<picker @change="strategyPickerChange" :value="strategyIndex" :range="strategyPicker">
						<view class="picker">
							{{strategyIndex>-1?strategyPicker[strategyIndex]:'点击选择'}}
						</view>
					</picker>
				</view>

			</uni-forms-item>
			<uni-forms-item name="data_batch" label="数据批次">
				<!-- <uni-easyinput v-model="formData.data_batch" :clearable="true" placeholder="请输入批次" /> -->
				<view class="strategy-picker">
					<picker @change="batchPickerChange" :value="batchIndex" :range="batchPicker">
						<view class="picker">
							{{batchIndex>-1?batchPicker[batchIndex]:'点击选择'}}
						</view>
					</picker>
				</view>
			</uni-forms-item>
			<uni-forms-item name="execute_batch" label="执行批次">
				<uni-easyinput v-model="formData.execute_batch" :clearable="true" placeholder="请输入批次" />
			</uni-forms-item>
			<uni-forms-item name="" label="执行进度">
				<slider :value="executeProcess"  show-value></slider>
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
	const dbCollectionName = 'stock-strategy-execute';

	export default {
		data() {
			return {
				formData: {
					data_batch: '',
					strategy_code: '',
					strategy_name: '',
					execute_batch: '',
					execute_status: '',
					execute_message: '',
					execute_time: ''
				},
				multiArray: [
					['亚洲', '欧洲'],
					['中国', '日本']
				],
				multiIndex: [0, 0],

				strategyIndex: -1,
				strategyPicker: [],
				batchIndex: -1,
				batchPicker: [],
				executeProcess: 0
			}
		},

		onLoad() {
			this.init()

		},

		methods: {

			async init() {
				let res = {}, setList = [], batchList = []
				res = await db.collection('stock-strategy-set').get()
				setList = res.result.data

				setList.forEach((item, index) => {
					if (!this.strategyPicker.includes(item.code)) {
						this.strategyPicker.push(item.code)
					}
				})

				console.log('setList:', setList);
				console.log('this.strategyPicker:', this.strategyPicker);

				res = await db.collection('stock-data-now').groupBy('batch').get()

				batchList = res.result.data
				batchList.forEach((item, index) => {
					this.batchPicker.push(item.batch)
				})
				

				console.log('batchList:', batchList);

			},

			strategyPickerChange(e) {
				console.log('pickerChange:', e);
				this.strategyIndex = e.detail.value
				this.formData.strategy_code = this.strategyPicker[this.strategyIndex]
				console.log('this.formData.strategy_code:', this.formData.strategy_code);
			},
			
			batchPickerChange(e){
				this.batchIndex = e.detail.value
				this.formData.data_batch = this.batchPicker[this.batchIndex]
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

				this.formData.execute_batch = await this.$batch.getBatchNo('EXEC')
				this.formData.execute_time = new Date().format("yyyy-MM-dd hh:mm:ss");

				if (this.formData.strategy_code == 'shadow') {
					this.strategyShadow()
				}

				//新增一条执行记录
				await this.insertStrategyExecute()
			},

			async strategyShadow() {
				let res = {},
					totalCount = 0, //表stock-code总记录数
					pageSize = 500, //分页查询每页大小
					totalPage = 0, //表stock-code总页数即分页查询总共需要查询次数
					pageObj = {}, //分页查询每次返回数据pageObj包含stockList和lastId
					lastId = '', //分页查询每次查询起始位置
					dataList = [], //数据列表
					strategyItemList = []

				res = await db.collection('stock-data-now').where({
					_id: dbCmd.neq(null),
					batch: this.formData.data_batch
				}).count()
				totalCount = res.result.total
				totalPage = Math.ceil(totalCount / pageSize)
				//初始lastId默认为第一条记录_id
				res = await db.collection('stock-data-now').where({
					batch: this.formData.data_batch
				}).limit(1).orderBy("_id", "asc").get()
				//console.log('strategyShadow res:', res);
				lastId = res.result.data[0]._id
				console.log('totalCount:', totalCount, 'totalPage:', totalPage, 'lastId:', lastId);

				//分页获取股票列表并同步实时数据
				for (let i = 0; i < totalPage; i++) {
					console.log('当前分页:', i);
					//分页获取实时数据
					pageObj = await this.getDataByPage(i, lastId, pageSize)
					dataList = pageObj.dataList
					lastId = pageObj.lastId
					console.log('dataList:', dataList);
					//获取符合策略股票列表
					strategyItemList = await this.getStrategyItems(dataList)
					//将符合策略的股票列表插入到策略结果表
					await this.insertStrategyResult(strategyItemList)
					
					this.executeProcess = (1 + 1) * 10
				}
			},

			//分页获取实时数据
			async getDataByPage(currentPageNo, lastId, pageSize) {
				let res = {}
				let pageObj = {}

				if (currentPageNo == 0) {
					res = await db.collection('stock-data-now').where({
						_id: dbCmd.gte(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				} else {
					res = await db.collection('stock-data-now').where({
						_id: dbCmd.gt(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				}

				let listCount = res.result.data.length
				pageObj.lastId = res.result.data[listCount - 1]._id
				pageObj.dataList = res.result.data

				return pageObj
			},

			//获取符合策略股票列表
			async getStrategyItems(dataList) {
				let code, name, high, low, open, price, itemUpper, itemBody, itemLower, itemLength, itemUpperPercent,
					itemBodyPercent, itemLowerPercent
				let strategy = {},
					strategyUpper, strategyBody, strategyLower, strategyLength = 100,
					strategyUpperPercent, strategyBodyPercent, strategyLowerPercent
				let strategyItemList = []

				strategy = await this.getStrategy()
				console.log('getStrategyItems strategy:', strategy)
				strategyUpper = parseInt(strategy.upper)
				strategyBody = parseInt(strategy.body)
				strategyLower = parseInt(strategy.lower)

				dataList.forEach((item, index) => {
					code = item.code
					name = item.name
					high = item.high
					low = item.low
					open = item.open
					price = item.price


					if (parseInt(price) >= parseInt(open)) {
						itemUpper = parseInt(high) - parseInt(price)
						itemBody = parseInt(price) - parseInt(open)
						itemLower = parseInt(open) - parseInt(low)
						itemLength = parseInt(high) - parseInt(low)
					} else {
						itemUpper = parseInt(high) - parseInt(open)
						itemBody = parseInt(open) - parseInt(price)
						itemLower = parseInt(price) - parseInt(low)
						itemLength = parseInt(high) - parseInt(low)
					}

					itemLowerPercent = itemLower / itemLength
					strategyLowerPercent = strategyLower / strategyLength

					if (itemLowerPercent >= strategyLowerPercent) {
						strategyItemList.push(item)
					}
				})

				return strategyItemList
			},


			async insertStrategyExecute() {
				let strategyExecute = {}

				strategyExecute.batch = this.formData.execute_batch
				strategyExecute.strategy_code = this.formData.strategy_code
				strategyExecute.execute_time = this.formData.execute_time

				await db.collection('stock-strategy-execute').add(strategyExecute)
			},


			async insertStrategyResult(strategyItemList) {
				let strategyResultItem = {},
					strategyResultList = []

				strategyItemList.forEach((item, index) => {
					strategyResultItem = {}
					strategyResultItem.execute_batch = this.formData.execute_batch
					strategyResultItem.data_batch = this.formData.data_batch
					strategyResultItem.strategy_code = this.formData.strategy_code
					strategyResultItem.stock_code = item.code.substr(1, item.code.length)
					strategyResultItem.stock_name = item.name
					strategyResultItem.stock_date = item.date
					strategyResultItem.execute_time = this.formData.execute_time
					strategyResultList.push(strategyResultItem)
				})

				await db.collection('stock-strategy-result').add(strategyResultList)
			},

			async getStrategy() {
				let res = {},
					strategySetList = [],
					upper, body, lower,
					strategy = {}

				res = await db.collection('stock-strategy-set').where({
					code: this.formData.strategy_code
				}).orderBy('no', 'asc').get()

				strategySetList = res.result.data

				strategySetList.forEach((item, index) => {
					if (item.field == 'upper') {
						upper = item.value
					} else if (item.field == 'body') {
						body = item.value
					} else if (item.field == 'lower') {
						lower = item.value
					}
				})

				strategy.upper = upper
				strategy.body = body
				strategy.lower = lower

				return strategy
			},

			//获取当前日期
			getDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}${month}${day}`;
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

		},
	}
</script>

<style lang="scss" scoped>
	.strategy-picker {
		width: 680px;
		display: flex;
		align-items: center;
		height: 36px;

	}
</style>

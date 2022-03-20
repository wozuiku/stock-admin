<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="strategy_code" label="选择策略">
				<view class="strategy-picker-box">
					<picker @change="strategyPickerChange" :value="strategyIndex" :range="strategyPicker">
						<view class="picker">
							{{strategyIndex>-1?strategyPicker[strategyIndex]:'点击选择'}}
						</view>
					</picker>
				</view>
			</uni-forms-item>
			<view v-if="formData.strategy_code == 'shadow'">
				<uni-forms-item name="data_batch" label="数据批次">
					<view class="strategy-picker-box">
						<picker class="strategy-picker" @change="batchPickerChange" :value="batchIndex"
							:range="batchPicker">
							<view class="picker">
								{{batchIndex>-1?batchPicker[batchIndex]:'点击选择'}}
							</view>
						</picker>
					</view>
				</uni-forms-item>
			</view>

			<view v-if="formData.strategy_code == 'drop'">
				<uni-forms-item name="date_from" label="开始时间">
					<view class="strategy-picker-box">
						<picker mode="date" :value="formData.date_from" @change="dateFromChange">
							<view class="picker">
								{{formData.date_from}}
							</view>
						</picker>
					</view>
				</uni-forms-item>

				<uni-forms-item name="date_end" label="截止时间">
					<view class="strategy-picker-box">
						<picker mode="date" :value="formData.date_end" @change="dateEndChange">
							<view class="picker">
								{{formData.date_end}}
							</view>
						</picker>
					</view>
				</uni-forms-item>
			</view>

			<uni-forms-item name="execute_batch" label="执行批次">
				<uni-easyinput v-model="formData.execute_batch" :clearable="true" placeholder="请输入批次" />
			</uni-forms-item>
			<uni-forms-item name="" label="执行进度">
				<slider :value="executeProcess" show-value></slider>
			</uni-forms-item>
			<view class="uni-button-group">
				<button style="width: 100px;" type="primary" class="uni-button"
					@click="submitForm">{{$t('common.button.submit')}}</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;"><button style="width: 100px;"
						class="uni-button">{{$t('common.button.back')}}</button></navigator>
			</view>
		</uni-forms>

		<StrategyShadow ref="shadow" @postProcess="changeProcess"></StrategyShadow>
		<StrategyDrop ref="drop" @postProcess="changeProcess"></StrategyDrop>

	</view>
</template>

<script>
	import StrategyShadow from "./strategys/shadow.vue";
	import StrategyDrop from "./strategys/drop.vue";

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'stock-strategy-execute';

	export default {
		components: {
			StrategyShadow,
			StrategyDrop,
		},

		data() {
			return {
				formData: {
					data_batch: '',
					strategy_code: '',
					strategy_name: '',
					execute_batch: '',
					execute_status: '',
					execute_message: '',
					execute_time: '',
					date_from: '选择日期',
					date_end: '选择日期',
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
				executeProcess: ''
			}
		},

		onLoad() {
			this.init()
		},

		methods: {

			async init() {
				//初始化策略选择列表
				let res = {},
					setList = [],
					batchList = []
				res = await db.collection('stock-strategy-set').get()
				setList = res.result.data
				setList.forEach((item, index) => {
					if (!this.strategyPicker.includes(item.code)) {
						this.strategyPicker.push(item.code)
					}
				})

				console.log('setList:', setList);
				console.log('this.strategyPicker:', this.strategyPicker);

				//初始化批次选择列表
				res = await db.collection('stock-data-now').groupBy('batch').orderBy('batch', 'desc').get()
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

			batchPickerChange(e) {
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

				//获取执行批次
				this.formData.execute_batch = await this.$batch.getBatchNo('EXEC')
				//获取执行时间
				this.formData.execute_time = new Date().format("yyyy-MM-dd hh:mm:ss");

				if (this.formData.strategy_code == 'shadow') {
					//this.strategyShadow()
					this.$refs.shadow.strategyShadow(this.formData.strategy_code, this.formData.data_batch, this
						.formData.execute_batch, this.formData.execute_time);
				} else if (this.formData.strategy_code == 'drop') {
					//strategyDropFunc.strategyDrop2(this.formData.execute_batch, this.formData.execute_time)
					this.$refs.drop.strategyDrop(this.formData.execute_batch, this.formData.execute_time, this.formData
						.date_from, this.formData.date_end);

				}

				//新增一条执行记录
				await this.insertStrategyExecute()
			},

			

			async insertStrategyExecute() {

				//console.log('insertStrategyExecute 1');
				let strategyExecute = {}

				strategyExecute.batch = this.formData.execute_batch
				strategyExecute.strategy_code = this.formData.strategy_code

				strategyExecute.execute_params = this.formData.date_from + ', ' + this.formData.date_end
				strategyExecute.execute_time = this.formData.execute_time

				//console.log('insertStrategyExecute 2');

				await db.collection('stock-strategy-execute').add(strategyExecute)

				//console.log('insertStrategyExecute 3');
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
			
			changeProcess(processValue) {
				this.executeProcess = processValue.toFixed()
			},
			
			dateFromChange: function(e) {
				this.formData.date_from = e.target.value
			},
			
			dateEndChange: function(e) {
				this.formData.date_end = e.target.value
			},
			
		},
	}
</script>

<style lang="scss" scoped>
	.strategy-picker-box {
		width: 440px;
		display: flex;
		align-items: center;
		height: 36px;


	}
</style>

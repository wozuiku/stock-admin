<template>
	<view class="uni-container">
		
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="batch" label="批次">
				<uni-easyinput v-model="formData.batch" :clearable="true" placeholder="请输入批次" />
			</uni-forms-item>
			<uni-forms-item name="strategy_code" label="策略">
				<picker @change="pickerChange" :value="index" :range="strategyPicker">
					<view class="picker">
						{{index>-1?strategyPicker[index]:'请选择'}}
					</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item name="strategy_code" label="进度">
				<slider value="20" name="age" show-value></slider>
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
					batch: '',
					strategy_code: '',
					strategy_name: '',
					execute_status: '',
					execute_message: '',
					execute_time: ''
				},
				multiArray: [
					['亚洲', '欧洲'],
					['中国', '日本']
				],
				multiIndex: [0, 0],
				
				index: -1,
				strategyPicker: [],
			}
		},
		
		onLoad(){
			this.init()
		},

		methods: {
			
			async init(){
				this.formData.batch = await this.$batch.getBatchNo('EXEC')
				
				let res = await db.collection('stock-strategy-set').get()
				let setList = res.result.data
				
				setList.forEach((item, index) => {
					if (!this.strategyPicker.includes(item.code)) {
					    this.strategyPicker.push(item.code)
					  }
				})
				
				console.log('setList:', setList);
				console.log('this.strategyPicker:', this.strategyPicker);
				
			},
			
			pickerChange(e) {
				console.log('pickerChange:', e);
				this.index = e.detail.value
				this.formData.strategy_code = this.strategyPicker[this.index]
				console.log('this.formData.strategy_code:', this.formData.strategy_code);
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
				
				
				let res = await db.collection('stock-strategy-set').where({
					code: this.formData.strategy_code
				}).orderBy('no', 'asc').get()
				
				let setList = res.result.data
				let upper, body, lower
				
				
				setList.forEach((item, index) => {
					if(item.field == 'upper'){
						upper = item.value
					}else if(item.field == 'body'){
						body = item.value
					}else if(item.field == 'lower'){
						lower = item.value
					}
				})
				
				console.log('submit setList:', setList);
				console.log('submit upper:', upper, 'body:', body, 'lower:', lower);
				
				

				// db.collection('stock-strategy-execute').add(value).then((res) => {
				// 		console.log('submit add res.result.code:', res.result.code);
				// 		if (res.result.code == 0) {
				// 			uni.showToast({
				// 				title: '新增成功',
				// 				duration: 2000
				// 			});

				// 			this.navigateTo('./list')
				// 		}
				// 	})
				// 	.catch((err) => {

				// 	})
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
		
	}
</style>

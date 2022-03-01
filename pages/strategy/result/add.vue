<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="batch" label="批次">
				<uni-easyinput v-model="formData.batch" :clearable="true" placeholder="请输入批次" />
			</uni-forms-item>
			<uni-forms-item name="strategy_code" label="策略代码">
				<uni-easyinput v-model="formData.strategy_code" :clearable="true" placeholder="请输入策略代码" />
			</uni-forms-item>
			<uni-forms-item name="strategy_name" label="策略名称">
				<uni-easyinput v-model="formData.strategy_name" :clearable="true" placeholder="请输入策略名称" />
			</uni-forms-item>
			<uni-forms-item name="stock_code" label="股票代码">
				<uni-easyinput v-model="formData.stock_code" :clearable="true" placeholder="请输入股票代码" />
			</uni-forms-item>
			<uni-forms-item name="stock_name" label="股票名称">
				<uni-easyinput v-model="formData.stock_name" :clearable="true" placeholder="请输入股票名称" />
			</uni-forms-item>
			<uni-forms-item name="execute_time" label="执行时间">
				<uni-easyinput v-model="formData.execute_time" :clearable="true" placeholder="请输入执行时间" />
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
	const dbCollectionName = 'stock-strategy-result';

	export default {
		data() {
			return {
				formData: {
					batch: '',
					strategy_code: '',
					strategy_name: '',
					stock_code: '',
					stock_name: '',
					execute_time: ''
				}
			}
		},

		methods: {

			submitForm() {
				this.$refs.form.submit();
			},

			submit(event) {
				const {
					value,
					errors
				} = event.detail
				console.log('submit value:', value);


				db.collection('stock-strategy-result').add(value).then((res) => {
						console.log('submit add res.result.code:', res.result.code);
						if(res.result.code == 0){
							uni.showToast({
							    title: '新增成功',
							    duration: 2000
							});
							
							this.navigateTo('./list')
						}
					})
					.catch((err) => {

					})
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

<style>
</style>

<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="code" label="策略代码">
				<uni-easyinput v-model="formData.code" :clearable="true" placeholder="请输入策略代码" />
			</uni-forms-item>
			<uni-forms-item name="name" label="策略名称">
				<uni-easyinput v-model="formData.name" :clearable="true" placeholder="请输入策略名称" />
			</uni-forms-item>
			<uni-forms-item name="no" label="编号">
				<uni-easyinput v-model="formData.no" :clearable="true" placeholder="请输入编号" />
			</uni-forms-item>
			<uni-forms-item name="field" label="字段">
				<uni-easyinput v-model="formData.field" :clearable="true" placeholder="请输入字段" />
			</uni-forms-item>
			<uni-forms-item name="value" label="值">
				<uni-easyinput v-model="formData.value" :clearable="true" placeholder="请输入值" />
			</uni-forms-item>
			<uni-forms-item name="operator" label="操作符">
				<uni-easyinput v-model="formData.operator" :clearable="true" placeholder="请输入操作符" />
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
					code: '',
					name: '',
					no: '',
					field: '',
					value: '',
					operator: ''
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


				db.collection('stock-strategy-set').add(value).then((res) => {
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

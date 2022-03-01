<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="batch" label="批次" required>
				<uni-easyinput v-model="formData.batch" :clearable="true" placeholder="请输入批次" />
			</uni-forms-item>
			<uni-forms-item name="strategy_code" label="策略代码" required>
				<uni-easyinput v-model="formData.strategy_code" :clearable="true" placeholder="请输入策略代码" />
			</uni-forms-item>
			<uni-forms-item name="strategy_name" label="策略名称" required>
				<uni-easyinput v-model="formData.strategy_name" :clearable="true" placeholder="请输入策略名称" />
			</uni-forms-item>
			<uni-forms-item name="execute_status" label="执行状态">
				<uni-easyinput v-model="formData.execute_status" :clearable="true" placeholder="请输入执行状态" />
			</uni-forms-item>
			<uni-forms-item name="execute_message" label="执行消息">
				<uni-easyinput v-model="formData.execute_message" :clearable="true" placeholder="请输入执行消息" />
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
			}
		},

		onLoad(e) {
			const id = e.id
			this.formDataId = id
			this.getDetail(id)
		},


		methods: {

			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName)
					.doc(id)
					.field('batch,strategy_code,strategy_name,execute_status,execute_message, execute_time')
					.get()
					.then((res) => {
						const data = res.result.data[0]
						if (data) {
							if (data.status === undefined) {
								data.status = true
							}
							if (data.status === 0) {
								data.status = true
							}
							if (data.status === 1) {
								data.status = false
							}
							this.formData = Object.assign(this.formData, data)
						}
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					}).finally(() => {
						uni.hideLoading()
					})
			},

			submitForm() {
				this.$refs.form.submit();
			},

			submit(event) {
				const {
					value,
					errors
				} = event.detail
				console.log('submit value:', value);

				console.log('submit this.formDataId:', this.formDataId);

				db.collection(dbCollectionName).doc(this.formDataId).update({
					batch: value.batch,
					strategy_code: value.strategy_code,
					strategy_name: value.strategy_name,
					execute_status: value.execute_status,
					execute_message: value.execute_message,
					execute_time: value.execute_time
				}).then((res) => {
					console.log('res:', res);
					if (res.result.code == 0) {
						uni.showToast({
							title: '修改成功',
							duration: 2000
						});

						this.navigateTo('./list')
					}
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
		}
	}
</script>

<style>
</style>

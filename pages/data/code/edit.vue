<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="code" label="代码" required>
				<uni-easyinput v-model="formData.code" :clearable="true" placeholder="请输入代码" />
			</uni-forms-item>
			<uni-forms-item name="name" label="名称" required>
				<uni-easyinput v-model="formData.name" :clearable="true" placeholder="请输入名称" />
			</uni-forms-item>
			<uni-forms-item name="exchange" label="交易所">
				<uni-easyinput v-model="formData.exchange" :clearable="true" placeholder="请输入交易所" />
			</uni-forms-item>
			<uni-forms-item name="source_code" label="原始码">
				<uni-easyinput v-model="formData.source_code" :clearable="true" placeholder="请输入原始码" />
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
	const dbCollectionName = 'stock-code';

	export default {
		data() {
			return {
				formData: {
					code: '',
					name: '',
					exchange: '',
					source_code: ''
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
					.field('code,name,exchange,source_code')
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

				db.collection('stock-code').doc(this.formDataId).update({
					code: value.code,
					name: value.name,
					exchange: value.exchange,
					source_code: value.source_code
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

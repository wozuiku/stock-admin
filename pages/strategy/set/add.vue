<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData"  @submit="submit">
			<uni-forms-item name="code" label="策略代码" required>
				<uni-easyinput v-model="formData.code" :clearable="false" placeholder="请输入策略代码" />
			</uni-forms-item>
			<uni-forms-item name="name" label="策略名称" required>
				<uni-easyinput v-model="formData.name" :clearable="false" placeholder="请输入策略名称" />
			</uni-forms-item>
			<uni-forms-item name="field" label="字段">
				<uni-easyinput v-model="formData.field" :clearable="false" placeholder="请输入字段" />
			</uni-forms-item>
			<uni-forms-item name="value" label="值">
				<uni-easyinput v-model="formData.value" :clearable="false" placeholder="请输入值" />
			</uni-forms-item>
			<uni-forms-item name="operator" label="操作符">
				<uni-easyinput v-model="formData.operator" :clearable="false" placeholder="请输入操作符" />
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
		data(){
			return {
				formData: {
					code: '',
					name: '',
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
			
			submit(event){
				const {
					value,
					errors
				} = event.detail
			},
			
		},
	}
</script>

<style>
</style>

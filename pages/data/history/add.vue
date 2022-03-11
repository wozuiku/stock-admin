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
				<uni-easyinput v-model="formData.code" :clearable="true" :disabled="codeDisabled"/>
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
				<slider :value="process"  show-value></slider>
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
		
		watch:{
			'formData.type': function(val){
				console.log('type:', val);
				if(val == 'all'){
					this.codeDisabled = true
				}else {
					this.codeDisabled = false
				}
			}
		},

		methods: {
			
			init(){
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
				
			
			uniCloud.callFunction({
					name: 'data-history-cf',
					data: {
						type: this.formData.type,
						code: this.formData.code,
						startDate: this.formData.startDate,
						endDate: this.formData.endDate,
						batch: this.formData.batch,
						time: this.formData.time
					}
				})
				.then(res => {
					console.log('data-history-cf res:', res);
					
				});
			},
			
			typePickerChange(e){
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

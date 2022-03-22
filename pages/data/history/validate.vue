<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" @submit="submit">
			<uni-forms-item name="code" label="股票代码">
				<uni-easyinput v-model="formData.code" :clearable="true"/>
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
			<uni-forms-item name="process" label="校验进度">
				<slider :value="process" show-value></slider>
			</uni-forms-item>
			<uni-forms-item name="validateMsg" label="校验信息">
				<view class="validate-message">{{validateMsg}}</view>
			</uni-forms-item>

			<view class="uni-button-group">
				<button style="width: 100px;" type="primary" class="uni-button" @click="submitForm">开始校验</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;"><button style="width: 100px;"
						class="uni-button">{{$t('common.button.back')}}</button></navigator>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'stock-data-history';

	export default {

		data() {
			return {
				formData: {
					code: '',
					startDate: '',
					endDate: '',
				},
				process: 0,
				validateMsg: '',
			}

		},

		onLoad() {
			this.init()
		},

		methods: {

			init() {
				this.formData.code = '601318'
				this.formData.startDate = this.getDate()
				this.formData.endDate = this.getDate()
			},

			submitForm() {
				if (typeof this.formData.code == "undefined") {
					uni.showToast({
						title: '股票代码不能为空',
						icon: 'none'
					})

				}
				this.$refs.form.submit();
			},

			async submit(event) {
				const {
					value,
					errors
				} = event.detail
				console.log('submit value:', value);

				let historyDataList = await this.getHistoryData(this.formData.code, this.formData.startDate, this.formData.endDate)
				let validateMessageList = this.validateHistoryData(historyDataList, this.formData.startDate, this.formData.endDate)
				console.log('validateMessageList:', validateMessageList);
				this.validateMsg = ''
				if(validateMessageList.length == 0){
					this.validateMsg = '校验通过'
				}else {
					validateMessageList.forEach((item, index) => {
						this.validateMsg += 'date:' + item.date + ' count:' + item.count
					})
				}
				
				
			},

			//获取历史数据
			async getHistoryData(code, startDate, endDate) {
				let res = {},
					sqlWhere = '',
					historyDataList = []

				sqlWhere = 'code == "' + code + '" && date >= "' + startDate + '" && date <= "' + endDate + '"'
				res = await db.collection('stock-data-history').where(sqlWhere).limit(500).orderBy("date", "asc").get()
				historyDataList = res.result.data
				
				console.log(historyDataList);

				return historyDataList
			},
			
			validateHistoryData(historyDataList, startDate, endDate){
				let dayCount = this.getDateCount(startDate, endDate), dataCount = 0, messageList = [], messageItem = {}
				
				
				for(let i = 0; i <= dayCount; i++){
					let date = this.getDateFrom(startDate, i)
					dataCount = 0
					if(this.isWeekenDay(date)){
						console.log('date:', date);
						dataCount = this.getDataCount(historyDataList, date)
						if(dataCount != 1){
							messageItem.date = date
							messageItem.count = dataCount
							messageList.push(messageItem)
						}
					}
					
					if(i < dayCount){
						this.process = (((1 + i) / dayCount) * 100).toFixed()
					}
					
				}
				
				return messageList
			},
			
			getDataCount(historyDataList, date){
				let count = 0
				historyDataList.forEach((item, index) => {
					
					if(date == item.date){
						count += 1
					}
				})
				return count
			},

			startDateChange(e) {
				this.formData.startDate = e.target.value
			},

			endDateChange(e) {
				this.formData.endDate = e.target.value
			},
			
			getDateCount(startDate, endDate){
				startDate += " 00:00:00"
				endDate += " 00:00:00"
				
				startDate = Date.parse(new Date(startDate))
				endDate = Date.parse(new Date(endDate))
				
				return (endDate - startDate) / 86400 / 1000
				
			},
			
			
			getDateFrom(startDate, num){
				startDate += " 00:00:00";//设置为当天凌晨12点
				startDate = Date.parse(new Date(startDate))/1000;//转换为时间戳
				startDate += (86400) * num;//修改后的时间戳
				let newDate = new Date(parseInt(startDate) * 1000);//转换为时间
				let newYear = newDate.getFullYear();
				let newMonth = newDate.getMonth() + 1;
				let newDay = newDate.getDate();
				newMonth = newMonth > 9 ? newMonth : '0' + newMonth;
				newDay = newDay > 9 ? newDay : '0' + newDay;
				
				newDate = newYear + '-' + newMonth + '-' + newDay;
				
				return newDate;
			},
			
			isWeekenDay(date){
				date += " 00:00:00"; //设置为当天凌晨12点
				date = Date.parse(new Date(date)) / 1000; //转换为时间戳
				let newDate = new Date(parseInt(date) * 1000); //转换为时间
				let newDateStr =  newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
				let weekDayNum = newDate.getDay()
				
				if (weekDayNum > 0 && weekDayNum < 6) {
					return true
				}else{
					return false
				}
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

		}

	}
</script>

<style lang="scss" scoped>
	.picker-box {
		width: 440px;
		display: flex;
		align-items: center;
		height: 36px;
	}

	.validate-message {
		width: 100%;
		height: 120px;
		background-color: #FFF;
		border: 1px solid #c8c7cc;
		color: red

	}
</style>

<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<text>起始日期：</text>
				<picker mode="date" :value="startDate" @change="bindStartDateChange">
					<view class="uni-input">{{startDate}}</view>
				</picker>
				<text>截止日期：</text>
				<picker mode="date" :value="endDate" @change="bindEndDateChange">
					<view class="uni-input">{{endDate}}</view>
				</picker>
				<button class="uni-button" type="primary" size="mini"
					@click="syncHistoryData">{{$t('common.button.sync')}}</button>

			</view>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				startDate: this.getDate({
					format: true
				}),
				endDate: this.getDate({
					format: true
				}),

				stockList: [],
			}
		},



		methods: {

			syncHistoryData() {
				console.log('startDate:', this.startDate, 'endDate:', this.endDate);
				let downloadUrl = 'https://quotes.money.163.com/service/chddata.html?code=0' + '601318' + '&start=' + this
					.startDate + '&end=' + this.endDate;

				// uni.downloadFile({
				//     url: downloadUrl, //仅为示例，并非真实的资源
				//     success: (res) => {
				//         if (res.statusCode === 200) {
				//             console.log('下载成功');
				//         }
				//     }
				// });

				const downloadTask = uni.downloadFile({
					url: downloadUrl, //仅为示例，并非真实的资源
					filePath: './123',
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
						console.log(res.tempFilePath);
						

					}
				});

				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

					// 满足测试条件，取消下载任务。
					// if (res.progress > 50) {
					//     downloadTask.abort();
					// }
				});



			},


			getPageData(lastId, pageSize) {

				const db = uniCloud.database()
				db.collection('stock')
					//.where('_id > "' + lastId + '"')
					.limit(pageSize)
					.get({
						getCount: true
					})
					.then((res) => {
						this.stockList = res.result.data
						console.log('this.stockList:', this.stockList);

						this.stockList.forEach((item, index) => {
							console.log('forEach item:', item);
							console.log('forEach code:', item.code);
							console.log('forEach name:', item.name);

						})

					}).catch((err) => {
						console.log(err.code); // 打印错误码
						console.log(err.message); // 打印错误内容
					})

			},

			bindStartDateChange: function(e) {
				this.startDate = e.target.value
			},

			bindEndDateChange: function(e) {
				this.endDate = e.target.value
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}

	}
</script>

<style>
</style>

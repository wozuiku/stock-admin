<template>
	<view>
		now<view class="uni-header">
			<view class="uni-group">
				
				<button class="uni-button" type="primary" size="mini"
					@click="syncNowData">{{$t('common.button.sync')}}</button>

			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return {
				
			}
		},
		
		methods: {
			syncNowData(){
				// this.$http(
				// 	'data.now', {},'','','','0601318,'
					
				// ).then(res => {
				// 	console.log(res)
				// });
				
				uniCloud.callFunction({
				    name: 'data_cf'
				  }).then(res => {
					  //console.log(res);
					  this.insertDataNow(res.result)
				  });
				
			},
			
			insertDataNow(dataNowDict) {
				console.log('dataNowDict:', dataNowDict);
				
				let dictItem = {},
					dataNowItem = {},
				    dataNowList = []
			    
				for (let key in dataNowDict) {
					
					dictItem = dataNowDict[key]
					dataNowItem.code = dictItem.code
					dataNowItem.name = dictItem.name
					dataNowItem.price = dictItem.price
					dataNowItem.high = dictItem.high
					dataNowItem.low = dictItem.low
					dataNowItem.open = dictItem.open
					dataNowItem.pre_close = dictItem.yestclose
					dataNowItem.bargain_volume = dictItem.volume
					dataNowItem.bargain_amount = dictItem.turnover
					dataNowItem.time = dictItem.time
					console.log('dataNowItem:', dataNowItem);
					dataNowList.push(dataNowItem)
				}
				console.log('dataNowList:', dataNowList);
			}
		}
	}
</script>

<style>
</style>

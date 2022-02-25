<template>
	<view></view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'stock';
	
	export default {
		data(){
			return {
				
			}
		},
		
		onShow(){
			
		},
		
		onLoad(e){
			const id = e.id
			this.getDetail(id)
		},
		
		methods:{
			getDetail(id){
				uni.showLoading({
					mask: true
				})
			},
		}
	}
</script>

<style>
</style>

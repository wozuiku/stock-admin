<template>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	export default {
		data(){
			return {
				executeProcess: 0
			}
		},
		
		methods:{
			//执行长下影线策略
			async strategyShadow(strategyCode, dataBatch, executeBatch, executeTime) {
				let res = {},
					totalCount = 0, //表stock-code总记录数
					pageSize = 500, //分页查询每页大小
					totalPage = 0, //表stock-code总页数即分页查询总共需要查询次数
					pageObj = {}, //分页查询每次返回数据pageObj包含stockList和lastId
					lastId = '', //分页查询每次查询起始位置
					dataList = [], //数据列表
					strategyItemList = []
			
				res = await db.collection('stock-data-now').where({
					_id: dbCmd.neq(null),
					batch: dataBatch
				}).count()
				totalCount = res.result.total
				totalPage = Math.ceil(totalCount / pageSize)
				//初始lastId默认为第一条记录_id
				res = await db.collection('stock-data-now').where({
					batch: dataBatch
				}).limit(1).orderBy("_id", "asc").get()
				//console.log('strategyShadow res:', res);
				lastId = res.result.data[0]._id
				console.log('totalCount:', totalCount, 'totalPage:', totalPage, 'lastId:', lastId);
			
				//分页获取股票列表并同步实时数据
				for (let i = 0; i < totalPage; i++) {
					console.log('当前分页:', i);
					//分页获取实时数据
					pageObj = await this.getDataByPage(i, lastId, pageSize)
					dataList = pageObj.dataList
					lastId = pageObj.lastId
					console.log('dataList:', dataList);
					//获取符合策略股票列表
					strategyItemList = await this.getStrategyItems(strategyCode, dataList)
					//将符合策略的股票列表插入到策略结果表
					if (strategyItemList.length > 0) {
						await this.insertStrategyResult(strategyCode, dataBatch, executeBatch, executeTime, strategyItemList)
						
					}
					
					this.executeProcess = ((1 + i) / totalPage) * 100
					this.$emit('postProcess', this.executeProcess)
			
					
				}
				if(this.executeProcess == 100){
					this.$emit('postStatus', 'S')
				}else{
					this.$emit('postStatus', 'E')
				}
			},
			
			//分页获取实时数据
			async getDataByPage(currentPageNo, lastId, pageSize) {
				let res = {}
				let pageObj = {}
			
				if (currentPageNo == 0) {
					res = await db.collection('stock-data-now').where({
						_id: dbCmd.gte(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				} else {
					res = await db.collection('stock-data-now').where({
						_id: dbCmd.gt(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				}
			
				let listCount = res.result.data.length
				pageObj.lastId = res.result.data[listCount - 1]._id
				pageObj.dataList = res.result.data
			
				return pageObj
			},
			
			//获取符合策略股票列表
			async getStrategyItems(strategyCode, dataList) {
				let code, name, high, low, open, price, itemUpper, itemBody, itemLower, itemLength, itemUpperPercent,
					itemBodyPercent, itemLowerPercent
				let strategy = {},
					strategyUpper, strategyBody, strategyLower, strategyLength = 100,
					strategyUpperPercent, strategyBodyPercent, strategyLowerPercent
				let strategyItemList = []
			
				strategy = await this.getStrategy(strategyCode)
				console.log('getStrategyItems strategy:', strategy)
				//Math.round(num*100)/100 实现的功能为将浮点数四舍五入保留两位小数
				strategyUpper = this.getDecimal(parseFloat(strategy.upper))
				strategyBody = this.getDecimal(parseFloat(strategy.body))
				strategyLower = this.getDecimal(parseFloat(strategy.lower))
			
				//console.log('getStrategyItems 1');
			
				dataList.forEach((item, index) => {
					code = item.code
					name = item.name
			
					high = this.getDecimal(parseFloat(item.high))
					low = this.getDecimal(parseFloat(item.low))
					open = this.getDecimal(parseFloat(item.open))
					price = this.getDecimal(parseFloat(item.price))
			
			
			
					if (price >= open) {
						//console.log('if');
						itemUpper = this.getDecimal(high - price)
						itemBody = this.getDecimal(price - open)
						itemLower = this.getDecimal(open - low)
						itemLength = this.getDecimal(high - low)
					} else {
						//console.log('else');
						itemUpper = this.getDecimal(high - open)
						itemBody = this.getDecimal(open - price)
						itemLower = this.getDecimal(price - low)
						itemLength = this.getDecimal(high - low)
					}
			
					itemLowerPercent = this.getDecimal(itemLower / itemLength)
					strategyLowerPercent = this.getDecimal(strategyLower / strategyLength)
			
					if (itemLowerPercent >= strategyLowerPercent) {
			
						strategyItemList.push(item)
					}
				})
			
				return strategyItemList
			},
			
			//将浮点数四舍五入保留两位小数
			getDecimal(floatNum) {
				return Math.round(floatNum * 100) / 100
			},
			
			async insertStrategyResult(strategyCode, dataBatch, executeBatch, executeTime, strategyItemList) {
			
				//console.log('insertStrategyResult 1');
				let strategyResultItem = {},
					strategyResultList = [],
					res = {}
			
				strategyItemList.forEach((item, index) => {
					strategyResultItem = {}
					strategyResultItem.execute_batch = executeBatch
					strategyResultItem.data_batch = dataBatch
					strategyResultItem.strategy_code = strategyCode
					strategyResultItem.stock_code = item.code.substr(1, item.code.length)
					strategyResultItem.stock_name = item.name
					strategyResultItem.stock_date = item.date
					strategyResultItem.execute_time = executeTime
					strategyResultList.push(strategyResultItem)
				})
			
				//console.log('insertStrategyResult 2');
				//console.log('insertStrategyResult strategyResultList:', strategyResultList);
			
				res = await db.collection('stock-strategy-result').add(strategyResultList)
			
				//console.log('insertStrategyResult 3');
				//console.log('insertStrategyResult res:', res);
			},
			
			async getStrategy(strategyCode) {
				let res = {},
					strategySetList = [],
					upper, body, lower,
					strategy = {}
			
				res = await db.collection('stock-strategy-set').where({
					code: strategyCode
				}).orderBy('no', 'asc').get()
			
				strategySetList = res.result.data
			
				strategySetList.forEach((item, index) => {
					if (item.field == 'upper') {
						upper = item.value
					} else if (item.field == 'body') {
						body = item.value
					} else if (item.field == 'lower') {
						lower = item.value
					}
				})
			
				strategy.upper = upper
				strategy.body = body
				strategy.lower = lower
			
				return strategy
			},
			
			
			
		},
	}
</script>

<style>
</style>

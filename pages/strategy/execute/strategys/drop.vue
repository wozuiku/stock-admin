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
			
			async strategyDrop(executeBatch, executeTime, dropDateFrom, dropDateEnd) {
				let strategy = {},
					dropDayCount//, dropDateFrom = ''
				strategy = await this.getStrategy()
				dropDayCount = parseInt(strategy.dropDayCount)
				//dropDateFrom = this.getDropDateFrom(dropDateEnd, dropDayCount)
				console.log('strategy:', strategy, 'dropDayCount:', dropDayCount, 'dropDateFrom:', dropDateFrom, 'dropDateEnd:', dropDateEnd)
			
				let res = {},
					totalCount = 0, //表stock-code总记录数
					pageSize = 50, //分页查询每页大小
					totalPage = 0, //表stock-code总页数即分页查询总共需要查询次数
					pageObj = {}, //分页查询每次返回数据pageObj包含stockList和lastId
					lastId = '', //分页查询每次查询起始位置
					dataList = [], //数据列表
					historyDataList = [],
					strategyItemList = []
			
				res = await db.collection('stock-code').where({
					_id: dbCmd.neq(null)
				}).count()
				totalCount = res.result.total
				totalPage = Math.ceil(totalCount / pageSize)
				//初始lastId默认为第一条记录_id
				res = await db.collection('stock-code').limit(1).orderBy("_id", "asc").get()
				lastId = res.result.data[0]._id
				console.log('totalCount:', totalCount, 'totalPage:', totalPage, 'lastId:', lastId);
			
				//分页获取股票列表并同步实时数据
				for (let i = 0; i < totalPage; i++) {
				//for (let i = 0; i < 1; i++) {
					console.log('当前分页:', i);
					//分页获取实时数据
					pageObj = await this.getStockCodeByPage(i, lastId, pageSize)
					dataList = pageObj.dataList
					lastId = pageObj.lastId
					//console.log('dataList:', dataList);
					//获取股票历史数据
					historyDataList = await this.getHistoryData(dataList, dropDateFrom, dropDateEnd)
					//console.log('historyDataList:', historyDataList);
					//获取符合策略股票
					strategyItemList = this.getStrategyItems(historyDataList, dropDayCount)
					console.log('strategyItemList:', strategyItemList);
					
					//将符合策略的股票列表插入到策略结果表
					if(strategyItemList.length > 0){
						await this.insertStrategyResult(strategyItemList, executeBatch, executeTime)
					}
					
					this.executeProcess = ((1 + i) / totalPage) * 100
					this.$emit('postProcess', this.executeProcess)
				}
			},
			
			async getStrategy() {
				let res = {},
					strategy = {}
			
				res = await db.collection('stock-strategy-set').where({
					code: 'drop'
				}).orderBy('no', 'asc').get()
			
				strategy.dropDayCount = res.result.data[0].value
			
				return strategy
			},
			
			
			//分页获取股票代码
			async getStockCodeByPage(currentPageNo, lastId, pageSize) {
				//console.log('drop getStockCodeByPage currentPageNo:', currentPageNo);
				let res = {}
				let pageObj = {}
			
				if (currentPageNo == 0) {
					res = await db.collection('stock-code').where({
						_id: dbCmd.gte(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				} else {
					res = await db.collection('stock-code').where({
						_id: dbCmd.gt(lastId)
					}).limit(pageSize).orderBy("_id", "asc").get()
				}
			
				let listCount = res.result.data.length
				pageObj.lastId = res.result.data[listCount - 1]._id
				pageObj.dataList = res.result.data
			
				return pageObj
			},
			
			//获取符合策略股票列表
			async getHistoryData(dataList, dropDateFrom, dropDateEnd) {
			
				let codeListStr = '',
					sqlWhere = '',
					res = {},
					historyData = [],
					count = 0
			
				for (let i = 0; i < dataList.length; i++) {
					codeListStr = codeListStr + '"' + dataList[i].code + '",'
				}
				codeListStr = 'code in [' + codeListStr.substr(0, codeListStr.length - 1) + ']'
				//console.log('codeListStr:', codeListStr);
			
				sqlWhere = codeListStr + ' && date >= "' + dropDateFrom + '"' + ' && date <= "' + dropDateEnd + '"'
			
				//console.log('sqlWhere:', sqlWhere);
			
				res = await db.collection('stock-data-history').where(sqlWhere).limit(500).orderBy("code", "asc").get()
			
				historyData = res.result.data
			
				
				return historyData
			},
			
			
			getStrategyItems(historyDataList, dropDayCount) {
			
				let tempItem = historyDataList[0],
					count = 0,
					strategyItemList = []
					
				//console.log('getStrategyItems2 tempItem0:', tempItem);
			
				historyDataList.forEach((item, index) => {
					if(tempItem.code != item.code){
						tempItem = item
						count = 0
					}
					if (parseFloat(item.close) < parseFloat(item.open)) {
						count = count + 1
					}
					
					if(count >= dropDayCount){
						strategyItemList.push(item)
					}
					
				})
				
				return strategyItemList
			},
			
			
			async insertStrategyResult(strategyItemList, executeBatch, executeTime) {
			
				let strategyResultItem = {},
					strategyResultList = [],
					res = {}
			
				strategyItemList.forEach((item, index) => {
					strategyResultItem = {}
					strategyResultItem.execute_batch = executeBatch
					strategyResultItem.strategy_code = 'drop'
					strategyResultItem.stock_code = item.code
					strategyResultItem.stock_name = item.name
					strategyResultItem.stock_date = item.date
					strategyResultItem.execute_time = executeTime
					strategyResultList.push(strategyResultItem)
				})
			
			
				res = await db.collection('stock-strategy-result').add(strategyResultList)
			
			},
			
			
			getDropDateFrom(dropDateEnd, dropDayCount) {
				let date = new Date(dropDateEnd),
					newDate, weekendDayCount = 0,
					year, month, day, newYear, newMonth, newDay
			
				year = date.getFullYear();
				month = date.getMonth() + 1;
				day = date.getDate();
			
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
			
				date = year + '-' + month + '-' + day;
				date += " 00:00:00"; //设置为当天凌晨12点
				date = Date.parse(new Date(date)) / 1000; //转换为时间戳
			
				weekendDayCount = this.getWeekenDayCount(dropDateEnd, dropDayCount)
				dropDayCount = dropDayCount + weekendDayCount
			
				date -= (86400) * dropDayCount; //修改后的时间戳
				newDate = new Date(parseInt(date) * 1000); //转换为时间
				newYear = newDate.getFullYear();
				newMonth = newDate.getMonth() + 1;
				newDay = newDate.getDate();
				newMonth = newMonth > 9 ? newMonth : '0' + newMonth;
				newDay = newDay > 9 ? newDay : '0' + newDay;
			
				newDate = newYear + '-' + newMonth + '-' + newDay;
			
				//console.log('newDate:', newDate);
			
				return newDate
			},
			
			getWeekenDayCount(dropDateEnd, dropDayCount) {
				let weekendDayCount = 0
			
				for (let i = 0; i < dropDayCount; i++) {
					let date = new Date(dropDateEnd),
						newDate
					date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
					date += " 00:00:00"; //设置为当天凌晨12点
					date = Date.parse(new Date(date)) / 1000; //转换为时间戳
					date -= (86400) * (i + 1); //修改后的时间戳
					newDate = new Date(parseInt(date) * 1000); //转换为时间
					//console.log('newDate.getDay():', newDate.getDay());
					if (newDate.getDay() in [0, 6]) {
						weekendDayCount += 1
					}
				}
			
				return weekendDayCount
			}
			
			
		}
	}
</script>

<style>
</style>

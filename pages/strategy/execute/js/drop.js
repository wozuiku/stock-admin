
const db = uniCloud.database();
const dbCmd = db.command;

	
export default {
	
	
	async strategyDrop(executeBatch, executeTime){
		console.log('drop strategyDrop');
		let strategy = {}, dropDay
			
		strategy = await this.getStrategy()
		console.log('strategy:', strategy)
		dropDay = parseInt(strategy.dropDay)
		console.log('dropDay:', dropDay)
		
		
		let res = {},
			totalCount = 0, //表stock-code总记录数
			pageSize = 500, //分页查询每页大小
			totalPage = 0, //表stock-code总页数即分页查询总共需要查询次数
			pageObj = {}, //分页查询每次返回数据pageObj包含stockList和lastId
			lastId = '', //分页查询每次查询起始位置
			dataList = [], //数据列表
			strategyItemList = []
		
		res = await db.collection('stock-code').where({
			_id: dbCmd.neq(null)
		}).count()
		totalCount = res.result.total
		totalPage = Math.ceil(totalCount / pageSize)
		//初始lastId默认为第一条记录_id
		res = await db.collection('stock-code').limit(1).orderBy("_id", "asc").get()
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
			strategyItemList = await this.getStrategyItems(dataList, dropDay)
			
			//将符合策略的股票列表插入到策略结果表
			await this.insertStrategyResult(strategyItemList, executeBatch, executeTime)
			
			
			//this.executeProcess = ((1 + i) / totalPage) * 100
		}
	},
	
	//分页获取实时数据
	async getDataByPage(currentPageNo, lastId, pageSize) {
		console.log('drop getDataByPage currentPageNo:', currentPageNo);
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
	async getStrategyItems(dataList, dropDay) {
		
		let code, name, historyData = [], strategyItemList = [],  count = 0
		
		
		for(let i = 0; i < dataList.length; i++){
			historyData = await this.getHistoryData(dataList[i].code, dropDay)
			console.log('getStrategyItems historyData:', historyData);
			
			count = 0
			
			historyData.forEach((item, index) => {
				if(parseFloat(item.close) < parseFloat(item.open)){
					count = count + 1
				}
			})
			
			if(count == dropDay){
				strategyItemList.push(dataList[i])
			}
		}
		
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
	
	async getStrategy() {
		let res = {},
			strategy = {}
	
		res = await db.collection('stock-strategy-set').where({
			code: 'drop'
		}).orderBy('no', 'asc').get()
	
		//console.log('res:', res.result.data[0].value);
		strategy.dropDay = res.result.data[0].value
		
		return strategy
	},
	
	//获取历史数据
	async getHistoryData(code, dropDay) {
		let historyData = [], res = {}
		
		res = await db.collection('stock-data-history').where({
			code: code
		}).limit(dropDay).orderBy("date", "desc").get()
		
		historyData = res.result.data
		
		console.log('getHistoryData historyData:', historyData);
		
		return historyData
	},
	
	
	
}
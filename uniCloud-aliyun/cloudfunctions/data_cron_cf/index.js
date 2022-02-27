'use strict';

const db = uniCloud.database();
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	let res = {},
		totalCount = 0, //表stock-code总记录数
		pageSize = 500, //分页查询每页大小
		totalPage = 0, //表stock-code总页数即分页查询总共需要查询次数
		pageObj = {}, //分页查询每次返回数据pageObj包含stockList和lastId
		lastId = '', //分页查询每次查询起始位置
		stockList = [], //股票代码列表
		stockCodes, //拼接接口所需股票代码列表
		dataNowDict = [] //从接口同步实时数据并解析为数据字典格式

	//获取totalCount、totalPage、lastId
	res = await db.collection('stock-code').where({
		_id: dbCmd.neq(null)
	}).count()
	totalCount = res.total
	totalPage = Math.ceil(totalCount / pageSize)
	//初始lastId默认为第一条记录_id
	res = await db.collection('stock-code').limit(1).orderBy("_id", "asc").get()
	lastId = res.data[0]._id
	console.log('totalCount:', totalCount, 'totalPage:', totalPage, 'lastId:', lastId);

	//分页获取股票列表并同步实时数据
	for (let i = 0; i < totalPage; i++) {
		console.log('当前分页:', i);
		//分页获取股票列表
		pageObj = await getStockByPage(i, lastId, pageSize)
		stockList = pageObj.stockList
		lastId = pageObj.lastId

		//拼接接口所需股票代码列表
		stockCodes = getCodes(stockList)

		//从接口同步实时数据并解析为数据字典格式
		dataNowDict = await syncDataNow(stockCodes)
		//将实时数据添加到云数据库
		await insertDataNow(dataNowDict)
	}




	async function getStockByPage(currentPageNo, lastId, pageSize) {

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

		let listCount = res.data.length
		pageObj.lastId = res.data[listCount - 1]._id
		pageObj.stockList = res.data

		console.log('pageObj:', pageObj);


		return pageObj
	}

	function getCodes(stockList) {
		let prefix = ''
		let code = ''
		let stockCodes = ""
		stockList.forEach((item, index) => {
			//console.log('item:', item);
			prefix = item.code.substr(0, 1)
			code = item.code
			if (prefix == '0') {
				code = '1' + code;
			} else if (prefix == '3') {
				code = '1' + code;
			} else if (prefix == '6') {
				code = '0' + code;
			}
			stockCodes = stockCodes + code + ',';
		})

		return stockCodes
	}


	async function syncDataNow(stockCodes) {
		let url = 'http://api.money.126.net/data/feed/' + stockCodes +
			'money.api'

		const requestOptions = {
			method: 'GET',
			dataType: 'text'
		}
		const res = await uniCloud.httpclient.request(url, requestOptions)

		let start_len = ('_ntes_quote_callback(').length
		let total_len = res.data.length
		let dataNow = res.data.substr(start_len, total_len - start_len - 2)

		//console.log('dataNow:', JSON.parse(dataNow));

		return JSON.parse(dataNow)
	}

	async function insertDataNow(dataNowDict) {
		let dictItem = {},
			dataNowItem = {},
			dataNowList = []

		for (let key in dataNowDict) {
			dataNowItem = {}
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
			dataNowList.push(dataNowItem)
		}
		
		await db.collection('stock-data-now').add(dataNowList)
	}
	
	return event
};

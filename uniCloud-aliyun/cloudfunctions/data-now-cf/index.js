'use strict';

const db = uniCloud.database();
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	const type = event.type
	const batch = event.batch
	const stockList = event.stockList
	const time = event.time
	
	console.log('data-now-cf type:', type);
	console.log('data-now-cf batch:', batch);
	console.log('data-now-cf stockList:', stockList);
	console.log('data-now-cf time:', time);
	
	if (type == 'sync') {
		let stockCodes, //拼接接口所需股票代码列表
			dataNowDict = [] //从接口同步实时数据并解析为数据字典格式
			
			//拼接接口所需股票代码列表
			stockCodes = getCodes(stockList)
			console.log('data-now-cf stockCodes:', stockCodes);
			
			//从接口同步实时数据并解析为数据字典格式
			dataNowDict = await syncDataNow(stockCodes)
			console.log('data-now-cf dataNowDict:', dataNowDict);
			//将实时数据添加到云数据库
			await insertDataNow(dataNowDict, batch)
		
	}
	
	function getCodes(stockList) {
		
		let prefix = ''
		let code = ''
		let stockCodes = ""
		stockList.forEach((item, index) => {
			console.log('item:', item);
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
	
		return JSON.parse(dataNow)
	}
	
	async function insertDataNow(dataNowDict, batchNo) {
		//console.log('insertDataNow batchNo:', batchNo);
		let dictItem = {},
			dataNowItem = {},
			dataNowList = [],
			timeStr
	
		for (let key in dataNowDict) {
			dataNowItem = {}
			timeStr = ''
			dictItem = dataNowDict[key]
			dataNowItem.batch = batchNo
			dataNowItem.code = dictItem.code
			dataNowItem.name = dictItem.name
			dataNowItem.price = dictItem.price
			dataNowItem.high = dictItem.high
			dataNowItem.low = dictItem.low
			dataNowItem.open = dictItem.open
			dataNowItem.pre_close = dictItem.yestclose
			dataNowItem.bargain_volume = dictItem.volume
			dataNowItem.bargain_amount = dictItem.turnover
			timeStr = dictItem.time.replace(/\//g, '-')
			dataNowItem.time = timeStr
			dataNowItem.date = timeStr.substr(0, 10)
			dataNowList.push(dataNowItem)
		}
	
		await db.collection('stock-data-now').add(dataNowList)
	}
	
	//返回数据给客户端
	return event
};

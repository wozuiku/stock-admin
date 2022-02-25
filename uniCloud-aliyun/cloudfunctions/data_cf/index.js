'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res = {},
		stockList = [],
		stockCodes,
		dataNowDict = []
	res = await db.collection('stock-code').limit(5).get()
	//获取股票列表
	stockList = res.data
	//拼接接口所需股票代码列表
	stockCodes = getCodes(stockList)
	//从接口同步实时数据并解析为数据字典格式
	dataNowDict = await syncDataNow(stockCodes)
	//将实时数据添加到云数据库
	await insertDataNow(dataNowDict)

	function getCodes(stockList) {
		let prefix = ''
		let code = ''
		let stockCodes = ""
		stockList.forEach((item, index) => {
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
			//console.log('dataNowItem:', dataNowItem);
			dataNowList.push(dataNowItem)
		}
		
		//console.log('dataNowList:', dataNowList);
		
		await db.collection('stock-data-now').add(dataNowList)
	}


	return dataNowDict
	//return event
};

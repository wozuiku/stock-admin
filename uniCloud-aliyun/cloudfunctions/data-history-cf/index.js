'use strict';

const db = uniCloud.database();
const dbCmd = db.command

const fs = require('fs')
const iconv = require('iconv-lite');
const baseUrl = 'http://quotes.money.163.com/service/chddata.html'

exports.main = async (event, context) => {
	//event为客户端上传的参数
	//console.log('event : ', event)
	
	const busiType = event.busiType //业务类型
	const syncType = event.syncType //同步类型：分页
	const dataList = event.dataList
	const startDate = event.startDate.replace(/-/g, '')
	const endDate = event.endDate.replace(/-/g, '')
	const batch = event.batch
	const time = event.time
	console.log('参数: ')
	console.log('busiType: ', busiType)
	console.log('syncType: ', syncType)
	console.log('dataList: ', dataList)
	console.log('startDate: ', startDate)
	console.log('endDate: ', endDate)
	console.log('batch: ', batch)
	console.log('time: ', time)
	
	if(busiType == 'sync'){
		if(syncType == 'page'){
			dataList.forEach((item, index) => {
				syncHistoryData(item.code, startDate, endDate, batch, time)
			})
		}
		
	}
	
	
	
	async function syncHistoryData(code, startDate, endDate, batch, time){
		let csvData = await downloadData(code, startDate, endDate)
		let historyList = parseCsvData(batch, csvData, time)
		let result = await insertDataHistory(historyList)
	}
	
	async function downloadData(stockCode, startDate, endDate){
		
		let fileUrl = ''
		
		if(stockCode > '600000'){
			fileUrl = baseUrl + "?code=0" + stockCode + "&start=" + startDate + "&end=" + endDate;
		}else{
			fileUrl = baseUrl + "?code=1" + stockCode + "&start=" + startDate + "&end=" + endDate;
		}
		//获取数据buffer
		let csvFileBuffer = await uniCloud.httpclient.request(fileUrl)
		//将buffer指定根本312编码，并转为字符串
		let csvData = iconv.decode(csvFileBuffer.data, 'gb2312').toString()
		
		console.log('csvData:', csvData);
		
		return csvData
	}
	
	function parseCsvData(batch, csvData, time){
		let rows = csvData.split('\r\n')
		let item = {}, historyItem = {}, historyList = [], codeStr =''
		rows.forEach((row, index) => {
			//console.log('row:', row);
			item = row.split(',')
			//console.log('item:', item);
			
			historyItem = {}
			//codeStr = ''
			
			historyItem.batch = batch //批次
			historyItem.date = item[0]//日期
			
			try{
				historyItem.code = item[1].substr(1, item[1].length)//股票代码
				console.log('code:', historyItem.code);
			}catch(err){
				console.log('err:', err);
			}
			
			historyItem.name = item[2]//名称
			historyItem.close = item[3]//收盘价
			historyItem.high = item[4]//最高价
			historyItem.low = item[5]//最低价
			historyItem.open = item[6]//开盘价
			historyItem.pre_close = item[7]//前收盘
			historyItem.up_down_amount = item[8]//涨跌额
			historyItem.up_down_range = item[9]//涨跌幅
			historyItem.turn_over_rate = item[10]//换手率
			historyItem.bargain_volume = item[11]//成交量
			historyItem.bargain_amount = item[12]//成交金额
			historyItem.total_market_value = item[13]//总市值
			historyItem.flow_market_value = item[14]//流通市值
			historyItem.bargain_ticket_count = item[15]//成交笔数
			historyItem.time = time//同步时间
			
			//console.log('historyItem:', historyItem);
			
			historyList.push(historyItem)
		})
		
		historyList = historyList.slice(1, historyList.length - 1)
		
		console.log('historyList:', historyList);
		
		return historyList
	}
	
	async function insertDataHistory(historyList) {
		await db.collection('stock-data-history').add(historyList)
	}
	

	//返回数据给客户端
	return event
};

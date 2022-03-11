'use strict';
const db = uniCloud.database();
const dbCmd = db.command

const fs = require('fs')
const download = require('download')

// let url='https://pic3.zhimg.com/v2-c34d75f9479479c59055d16b1940e86b_xll.jpg'
// ;(async()=>{
//     let data = await download(url)
//     await fs.promises.writeFile('./ツキ.jpg',data)
// })()


exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	
	
	
	
	
	downloadCsv('301119', '20201124', '20211124')
	
	//parseCsv('301119')
	
	async function downloadCsv(stockCode, startDate, endDate){
		let fileUrl = 'http://quotes.money.163.com/service/chddata.html'
		let saveName = './data/history/' + stockCode +'.csv'
		
		if(stockCode > '600000'){
			fileUrl = fileUrl + "?code=0" + stockCode + "&start=" + startDate + "&end=" + endDate;
		}else{
			fileUrl = fileUrl + "?code=1" + stockCode + "&start=" + startDate + "&end=" + endDate;
		}
		
		let data = await download(fileUrl)
		await fs.promises.writeFile(saveName, data, {encoding: 'utf8'})
	}
	
	
	
	function parseCsv(stockCode){
		let csvName = './data/history/' + stockCode +'.csv'
		
		fs.readFile(csvName, 'utf8', function (err, data) {
			let table = new Array();
		    if (err) return console.error(err);
			
			console.log('data:', data);
			
			// let rows = data.split("\r\n");
			
			// rows.forEach((item, index) => {
			// 	console.log('item:', item);
			// })
		
		    ConvertToTable(data, function (table) {
		        console.log(table);
		    })
		});
		
	}
	
	function ConvertToTable(data, callBack) {
	    data = data.toString();
	    var table = new Array();
	    var rows = new Array();
	    rows = data.split("\r\n");
	    for (var i = 0; i < rows.length; i++) {
			console.log('rows[i]:', rows[i]);
	        table.push(rows[i].split(","));
	    }
	    callBack(table);
	}

	//返回数据给客户端
	return event
};

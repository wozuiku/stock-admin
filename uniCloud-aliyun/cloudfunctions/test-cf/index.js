'use strict';
const db = uniCloud.database();
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)


	// let res = await db.collection('stock-code').where({
	// 	code: dbCmd.exists(false)
	// }).limit(500).get()

	// let stockList = res.data

	// console.log('res:', res);
	// console.log('stockList:', stockList);

	// updateStockAll(stockList)


	// async function updateStockAll(stockList) {
	// 	await stockList.forEach((item, index) => {
	// 		let exchange = item.source_code.substring(0, 2)
	// 		let code = item.source_code.substring(2, item.source_code.length)
	// 		console.log('item:', item, 'id:', item._id, 'exchange:', exchange, 'code:', code);

	// 		await updateStock(item._id, exchange, code)
			
	// 	})
	// }




	// //updateStock('621594d3f78f3f3a4d8a7107', 'SZ', '000860')
	// async function updateStock(id, exchange, code) {
	// 	await db.collection("stock-code").where({
	// 			_id: id
	// 		})
	// 		.update({
	// 			exchange: exchange,
	// 			code: code
	// 		});
	// }
	
	
	let res = await db.collection('stock-data-now').where({
	  _id: dbCmd.exists(true)
	}).remove()


	//返回数据给客户端
	return event
};

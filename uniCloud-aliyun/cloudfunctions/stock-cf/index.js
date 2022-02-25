'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	stockInit()

	function stockInit() {
		console.log('stockInit begin');
		let stockList = []
		const db = uniCloud.database()
		db.collection('stock')
			//.where('1 == 1')
			.get()
			.then((res) => {
				console.log('res:', res);
				//stockList = res.result.data
			}).catch((err) => {
				console.log(err.code); // 打印错误码
				console.log(err.message); // 打印错误内容
			})

		stockList.forEach((item, index) => {
			console.log('item:', item);
		})

		console.log('stockInit end');
	}


	//获取cookie
	let header = {
		'Cookie': 'v=A-q7aWMifKOK5fBa7lpIvKIyPVuJW25HYN7i_3Sil0fJY4TFXOu-xTBvMtVH'
	}

	//获取总页数

	//循环抓取上证(hs)、深证(ss)、创业版(cyb)、科创板(kcb)
	// let sectors = ['hs', 'ss', 'cyb', 'kcb']
	// sectors.forEach((item, index) => {
	// 	console.log('sectors.forEach item:', item);

	// })

	//getPageNum('hs')

	//获取板块总的页数
	async function getPageNum(sector) {
		let url = 'https://q.10jqka.com.cn/index/index/board/' + sector +
			'/field/zdf/order/desc/page/1/ajax/1/'
		console.log('getPageNum url:', url);
		const requestOptions = {
			headers: header,
			method: 'GET',
			dataType: 'text'
		}
		const res = await uniCloud.httpclient.request(url, requestOptions)
		console.log('getPageNum http res:', res);

	}

	//获取某一页面数据
	async function getOnePage(sector, index) {
		let url = 'https://q.10jqka.com.cn/index/index/board/' + sector + '/field/zdf/order/desc/page/' +
			index + '/ajax/1/'
		console.log('getOnePage url:', url);
		const requestOptions = {
			headers: header,
			method: 'GET',
			dataType: 'text'
		}
		const res = await uniCloud.httpclient.request(url, requestOptions)
		console.log('http res:', res);
	}




	let stock = {
		"code": "601318",
		"name": "中国平安",
	}

	//addStock(stock)

	//updateStock("601318", "中国平安6")

	async function addStock(stock) {
		console.log('addStock begin');
		const db = uniCloud.database()
		db.collection('stock')
			.add(stock)
			.then(e => {
				console.log('addStock e:', e);
			})
		console.log('addStock end');
	}

	async function updateStock(stockCode, stockName) {
		const db = uniCloud.database();
		db.collection("stock").where({
				code: stockCode
			})
			.update({
				name: stockName,
				status: "N"
			});
	}

	//返回数据给客户端
	return event
};

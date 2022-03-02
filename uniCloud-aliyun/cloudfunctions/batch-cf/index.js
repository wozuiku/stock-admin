'use strict';

const db = uniCloud.database();
const dbCmd = db.command
const dbCollectionName = 'stock-batch';

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const type = event.type
	console.log('type : ', type)
	const date = getDate()
	
	let batchNo = await getBatchNo(type, date)
	console.log('batchNo:', batchNo);



	//获取批次号
	async function getBatchNo(type, date) {
		let res = {},
			count = 0,
			initSequence = '001',
			maxSequence = '',
			nowSequence = '',
			batchObj = {},
			batchNo = ''

		res = await db.collection(dbCollectionName).where({
			type: type,
			date: date
		}).orderBy('sequence', 'desc').get()
		
		count = res.data.length
		
		if (count == 0) {
			batchObj = {
				"type": type,
				"date": date,
				"sequence": initSequence
			}
			batchNo = type + date + initSequence
			await db.collection(dbCollectionName).add(batchObj)
		} else {
			//获取type、date维度最大sequence
			maxSequence = res.data[0].sequence
			//maxSequence+1，并且padStart函数补足0；例子：maxSequence = 2 —> +1 = 3 —> 补足0 = 003
			nowSequence = ('' + (parseInt(maxSequence) + 1)).padStart(3, '0')
			
			batchNo = type + date + nowSequence
			await db.collection(dbCollectionName).where({
				type: type,
				date: date
			}).update({
				sequence: nowSequence
			})
		}
		
		return batchNo
	}

	//获取当前日期
	function getDate() {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}${month}${day}`;
	}

	//返回数据给客户端
	return batchNo
};

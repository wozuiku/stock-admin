const db = uniCloud.database();
const dbCmd = db.command
const dbCollectionName = 'stock-batch';

export default {
	
	//获取批次号
	async getBatchNo(type) {
		let res = {},
		    batchList = [],
			count = 0,
			date = '',
			initSequence = '001',
			maxSequence = '',
			nowSequence = '',
			batchObj = {},
			batchNo = ''
		
		date = this.getDate()
	
		res = await db.collection(dbCollectionName).where({
			type: type,
			date: date
		}).orderBy('sequence', 'desc').get()
		
		
		batchList = res.result.data
		count = batchList.length
		
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
			maxSequence = batchList[0].sequence
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
	},

	//获取当前日期
	getDate() {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}${month}${day}`;
	}
}

'use strict';
const db = uniCloud.database();
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	deleteDataAll()
	
	async function deleteDataAll(){
		let res = await db.collection('stock-data-now').where({
		  _id: dbCmd.exists(true)
		}).remove()
	}
	
	//返回数据给客户端
	return event
};

/*
 * 接口列表
 * @url 接口地址
 * @auth 接口是否需要登录才能访问
 * @method 请求类型
 */

export default {
	/** 数据 ↓ **/
	data: {
		now: {
			url: "/data/feed",
			method: "GET",
		},
		
	},

	/** 用户 ↓ **/
	user: {
		tenant: {
			url: "/api/equipment/accountroom/GetMyTenantList",
			auth: true,
			method: "GET",
		},
		//注册
		register: {
			url: "/api/base/personalaccount/RegisterAppUser",
			auth: false,
			method: "POST",
			// desc: '注册',
		},

		//用户登录
		accountLogin: {
			url: "/api/base/personalaccount/AppLogin",
			auth: false,
			method: "POST",
			// desc: '账号密码登录',
		},

		//用户信息
		info: {
			url: "/api/base/personalaccount/GetUserInfo",
			auth: true,
			method: "GET",
			// desc: '用户信息',end
		},

		smsLogin: {
			url: "/api/user/smsLogin",
			auth: false,
			method: "POST",
			// desc: '短信登录',
		},


		//重置密码
		forgotPwd: {
			url: "/api/base/personalaccount/ForgetPassword",
			auth: false,
			method: "PUT",
			// desc: '重置密码',
		},



		changePwd: {
			url: "/api/base/personalaccount/UpdatePassword",
			auth: true,
			method: "PUT",
			// desc: '修改密码',
		},


		profile: {
			url: "/api/user/profile",
			auth: true,
			method: "POST",
			// desc: '修改用户信息',end
		},

		logout: {
			url: "/api/user/logout",
			auth: true,
			method: "POST",
			// desc: '退出登录',end
		},

		

	},

	
	
};

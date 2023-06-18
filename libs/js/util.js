import appConfig from '@/config/appConfig.js';
// #ifdef H5
import * as jweixin from './jweixin.js';
// #endif


// 定时器
let timeout = null;
// 节流标志
let flag = null;

export default {
	/**
	 * @description 检查路径是否为 tabbar 地址
	 * @param {Object} path
	 */
	checkTabbar(path) {
		let tabbar_pages = [
			'pages/index/index',
			'pages/course/index',
			'pages/circle/index',
			'pages/edu/index',
			'pages/my/index'
		];
		// 检测是否为tabbar地址
		let tabbar_path = null;
		tabbar_pages.forEach((item) => {
			if (path.indexOf(item) > -1) {
				tabbar_path = item;
			}
		});
		return tabbar_path;
	},
	/**
	 * @description 重新登陆
	 */
	reLogin() {
		// 获取当前url
		let current_url = window.location.origin + '/' + window.location.hash;
		uni.showModal({
			title: '登陆已过期',
			content: '登陆已过期，请重新进入页面',
			confirmText: '重新进入',
			success: (res) => {
				if (res.confirm) {
					window.location.href = current_url;
				}
			}
		});
	},
	/**
	 * @description    返回授权登陆前的页面
	 * @param {Object} path
	 * @param {Object} query
	 */
	reLaunch(path, query) {
		let url_query = '';
		let i = 0;
		for (let key in query) {
			switch (key) {
				case 'wechat_code':
				case 's_id':
					break;
				default:
					if (i === 0) {
						url_query = '?' + key + '=' + query[key];
					} else {
						url_query += '&' + key + '=' + query[key];
					}
					i++;
					break;
			}
		}
		// 跳回 登录前页面
		let url = '/' + path + url_query;
		uni.reLaunch({
			url: url
		});
	},
	/**
	 * 获取分享参数
	 * 自动携带推荐人r_id和园所s_id
	 */
	getShareQuery(params){
		params.r_id = 0;
		let userInfo = uni.getStorageSync(appConfig.userInfoKey);
		if(userInfo && userInfo.id){
			params.r_id = userInfo.id;
		}
		params.s_id = 0;
		let schoolInfo = uni.getStorageSync(appConfig.schoolInfoKey)
		if(schoolInfo && schoolInfo.school_id){
			params.s_id = schoolInfo.school_id;
		}
		return this.queryParams(params,false);
	},
	// 隐藏所有非基础按钮接口
	async hideAllNonBaseMenuItem(){
		// 权限验证配置
		await this.setJsApiConfig();
		this.wechatJsSdk('hideAllNonBaseMenuItem');
	},
	/**
	 * 设置微信分享信息
	 */
	async setShare(shareData, show=true) {
		// 权限验证配置
		await this.setJsApiConfig();

		// 显示微信分享功能
		if(show){
			this.wechatJsSdk('showAllNonBaseMenuItem');
		}
		
		let share_data = {
			title: shareData.title,
			desc: shareData.desc,
			link: shareData.link,
			imgUrl: shareData.imgUrl,
			success: res => {},
			trigger: (res) => {}
		};
			
		jweixin.ready(() => {
			//分享给朋友接口  
			jweixin.updateAppMessageShareData(share_data);
			//jweixin.onMenuShareAppMessage(share_data);
			//分享到朋友圈接口  
			jweixin.updateTimelineShareData(share_data);
		});

		// 错误信息
		jweixin.error((res) => {
			console.log('error:' + JSON.stringify(res))
			this.getJsApiTicket();
		});

	},
	/**
	 * 分享数据
	 * @param {Object} shareData
	 * @param {Object} options
	 */
	getShare(shareData,options){
		// 分享标题
		if(!shareData.title){
			shareData.title = ' ';
		}
		// 分享描述
		if(!shareData.desc){
			shareData.desc = shareData.title;
		}
		// 分享内容
		if(!shareData.content){
			shareData.content = shareData.desc;
		}
		// 分享图标
		if(!shareData.imageUrl){
			shareData.imageUrl = appConfig.shareImg;
		}
		if(!shareData.imgUrl){
			shareData.imgUrl = shareData.imageUrl;
		}
		// 分享参数
		shareData.query = this.getShareQuery(options);
		shareData.path = '/' + getCurrentPages()[0].route;
		if(shareData.query){
			shareData.path += '?' + shareData.query;
		}
		if(!shareData.mpPath){
			shareData.mpPath = shareData.path;
		}
		
		// #ifdef H5
		shareData.link = window.location.origin + '/?'+Date.now()+'#' + shareData.path;
		if(!shareData.url){
			shareData.url = shareData.link;
		}
		// #endif
	
		console.log('shareData:'+JSON.stringify(shareData))
		return shareData;
	},
	// 获取微信code
	getWxCode() {
		return new Promise((resolve, reject) => {
			wx.login({
				success: (res) => {
					resolve(res)
				},
				fail: res => {
					reject(res);
				}
			});
		});
	},
	// 跳转到微信支付链接
	goWechatPay(sec_type, id, appid, pid = -1) {
		let new_uri = 'https://app.wufu-app.com/pages/course/buy?sec_type=' + sec_type + '&id=' + id + '&token=' + uni
			.getStorageSync(appConfig.tokenName) + '&appid=' + uni.getStorageSync(appConfig.appIdName) + '&s_id=' + uni
			.getStorageSync(appConfig.schoolIdName);
		// 拼团订单
		if (pid >= 0) {
			new_uri = new_uri + '&pid=' + pid;
		}
		// 检测是否为测试环境
		if (window.location.host === 'm.wufu-app.com' || window.location.host === 'localhost:8080') {
			new_uri = new_uri + '&from=test';
		}
		// 跳转微信购买链接
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
			encodeURIComponent(new_uri) + '&response_type=code&scope=snsapi_base#wechat_redirect';
	},
	// 获取微信jssdk 签名 Signature
	async setJsApiConfig(jsApiList=null,openTagList=null) {
		// 默认配置
		if(!jsApiList){
			jsApiList = appConfig.jsApiList;
		}
		if(!openTagList){
			openTagList = appConfig.openTagList;
		}

		// 获取 ticket
		let ticket = uni.getStorageSync(appConfig.jsApiTicketKey);
		if(!ticket){
			let get_ticket = await this.getJsApiTicket();
			ticket = get_ticket.data;
		}
		// 生成签名参数
		let shareUrl = window.location.href.replace(/#(.*)/g, '');
		let timestamp = parseInt(Date.parse(new Date()) * 0.001);
		let nonceStr = this.getNonceStr(16);
		let str = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + shareUrl;
		let signature = this.sha1(str);
		
		// 权限验证配置
		let config = {
			debug: appConfig.jsSdkDebug,
			appId: appConfig.shareAppid,
			timestamp: timestamp,
			nonceStr: nonceStr,
			signature: signature,
			jsApiList: jsApiList,
			openTagList: openTagList
		};
		jweixin.config(config);
	},
	// 获取微信js api ticket
	async getJsApiTicket() {
		let ticket = uni.getStorageSync(appConfig.jsApiTicketKey);
		if(ticket){
			return ticket;
		}
		let res = await this.http({
			path: '/jsapi_ticket',
			method: 'get',
			header: {
				['is-domain']: 0,
				action: 'getJsApiTicket'
			}
		});
		if (res.code !== 0) {
			return false;
		}
		// 保存api ticket
		uni.setStorageSync(appConfig.jsApiTicketKey, res.data);
		return res.data;
	},
	// 微信 Jssdk
	wechatJsSdk(name,data={}) {
		// 返回结果
		return new Promise((resolve, reject) => {
			jweixin.ready(() => {
				switch (name) {
					// 判断当前客户端版本是否支持指定 JS 接口
					case "checkJsApi":
					    if(data.jsApiList===undefined){
					    	data.jsApiList = appConfig.jsApiList;
					    }
					    jweixin.checkJsApi({
					      jsApiList: data.jsApiList, // 需要检测的 JS 接口列表
					      success: (res)=> { 
					    	  // 以键值对的形式返回，可用的 api 值true，不可用为false
					    	  console.log(JSON.stringify(res));
							  resolve(res)
					      }
					    });
						break;
					//分享给好有接口
					case "updateAppMessageShareData":
					    jweixin.updateAppMessageShareData({
							title: data.title, // 分享标题
							desc: data.desc, // 分享描述
							link: data.link, // 分享链接
							imgUrl: data.imgUrl, // 分享图标
							success: function () {
								uni.showToast({
									title: '分享好友成功',
									duration: 3000
								})
								console.log('分享好友成功')
							},
							complete: function(){
								uni.showToast({
									title: '分享完成',
									duration: 3000
								})
								console.log('分享完成')
							},
							fail: function(){
								uni.showToast({
									title: '分享好友失败',
									duration: 3000
								})
								console.log('分享好友失败')
							},
							cancel: function () {
								uni.showToast({
									title: '分享好友已取消',
									duration: 3000
								})
								console.log('分享好友已取消')
							},
							trigger:function(){
								uni.showToast({
									title: '分享按钮点击时触发',
									duration: 3000
								})
								console.log('分享按钮点击时触发')
							}
						});
					    break;
					case "onMenuShareAppMessage":
					    jweixin.onMenuShareAppMessage({
							title: data.title, // 分享标题
							desc: data.desc, // 分享描述
							link: data.link, // 分享链接
							imgUrl: data.imgUrl, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							},
						});
					    break;
					//分享到朋友圈接口 
					case "updateTimelineShareData":
					    jweixin.updateTimelineShareData({
							title: data.title, // 分享标题
							desc: data.desc, // 分享描述
							link: data.link, // 分享链接
							imgUrl: data.imgUrl, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							},
						});
					    break;
					case "onMenuShareTimeline":
					    jweixin.onMenuShareTimeline({
							title: data.title, // 分享标题
							desc: data.desc, // 分享描述
							link: data.link, // 分享链接
							imgUrl: data.imgUrl, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							},
						});
					    break;
					// 分享到腾讯微博
					case "onMenuShareWeibo":
					    jweixin.onMenuShareWeibo({
							title: data.title, // 分享标题
							desc: data.desc, // 分享描述
							link: data.link, // 分享链接
							imgUrl: data.imgUrl, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							},
						});
					    break;
					// 分享到 QQ 空间
					case "onMenuShareQZone":
					    jweixin.onMenuShareQZone({
							title: data.title, // 分享标题
							desc: data.desc, // 分享描述
							link: data.link, // 分享链接
							imgUrl: data.imgUrl, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							},
						});
					    break;
					// 拍照或从手机相册中选图接口
					case "chooseImage":
					    if(data.count===undefined || data.count>9){
							data.count = 9;
						}
						if(data.sizeType===undefined){
							data.sizeType = ['original', 'compressed'];
						}
						if(data.sourceType===undefined){
							data.sourceType = ['album', 'camera'];
						}
					    jweixin.chooseImage({
					    	count: data.count, // 默认9
					    	sizeType: data.sizeType,
					    	sourceType: data.sourceType,
					    	success: (res)=> {
					    		resolve(res.localIds)
					    	}
					    });
						break;
					// 预览图片
					case "previewImage":
					    jweixin.previewImage({
					      current: data.current, // 当前显示图片的 http 链接
					      urls: data.urls // 需要预览的图片 http 链接列表
					    });
					    break;
					// 上传图片
					case "uploadImage":
					    if(data.isShowProgressTips===undefined){
					    	data.isShowProgressTips = 1;
					    }
					    jweixin.uploadImage({
					      localId: data.localId, // 需要上传的图片的本地ID，由 chooseImage 接口获得
					      isShowProgressTips: data.isShowProgressTips, // 默认为1，显示进度提示
					      success: function (res) {
							resolve(res)
					      }
					    });
					    break;
					// 下载图片
					case "downloadImage":
					    if(data.isShowProgressTips===undefined){
							data.isShowProgressTips = 1;
						}
					    jweixin.downloadImage({
					      serverId: data.serverId, // 需要下载的图片的服务器端ID，由 uploadImage 接口获得
					      isShowProgressTips: data.isShowProgressTips, // 默认为1，显示进度提示
					      success: function (res) {
					        resolve(res)
					      }
					    });
					    break;
					// 获取本地图片
					case "getLocalImgData":
					    jweixin.getLocalImgData({
					      localId: data.localId, // 图片的localID
					      success: function (res) {
					        resolve(res)
					      }
					    });
					    break;
					// 开始录音
					case "startRecord":
						jweixin.startRecord({
							success: function(res) {
								// 成功返回:{"errMsg":"startRecord:ok"}
								resolve(res)
							}
						});
						break;
					// 停止录音
					case "stopRecord":
						jweixin.stopRecord({
							success: function(res) {
								//成功返回：{"localId":"weixin://resourceid/0d19910ac0df488ac78dac209edbbaeb","errMsg":"stopRecord:ok"}
								resolve(res)
							},
							fail: function(res){
								uni.showToast({
									title: '停止录音失败'+JSON.stringify(res),
									duration: 3000
								})
								reject(res)
							}
						});
						break;
					// 监听录音自动停止
					case "onVoiceRecordEnd":
						jweixin.onVoiceRecordEnd({
							// 录音时间超过一分钟没有停止的时候会执行 complete 回调
							complete: function(res) {
								resolve(res)
							}
						});
						break;
					// 播放语音
					case "playVoice":
						// 播放录音
						jweixin.playVoice({
							localId: data.localId, // 需要播放的音频的本地ID，由stopRecord接口获得
						});
						break;
					// 暂停播放语音
					case "pauseVoice":
						jweixin.pauseVoice({
							localId: data.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
						});
						break;
					// 停止播放语音
					case "stopVoice":
						jweixin.stopVoice({
							localId: data.localId // 需要停止的音频的本地ID，由stopRecord接口获得
						});
						break;
					// 监听语音播放完毕
					case "onVoicePlayEnd":
						jweixin.onVoicePlayEnd({
							success: function(res) {
								// 成功返回：{"localId":"weixin://resourceid/58d21319115bc0c91be6736c366e5e88","errMsg":"onVoicePlayEnd:ok"}
								resolve(res)
							}
						});
						break;
					// 上传语音 
					case "uploadVoice":
					    if(data.isShowProgressTips===undefined){
					    	data.isShowProgressTips = 1;
					    }
						jweixin.uploadVoice({
							localId: data.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
							isShowProgressTips: data.isShowProgressTips, // 默认为1，显示进度提示
							success: function(res) {
								// （上传到微信服务器有效期3天）成功返回：{"serverId":"w2emIfcwiWNudahpIK1YDp7t-nkwzHLVtMilfmjHDqKhIwhLijLNwNJad73jSa55","errMsg":"uploadVoice:ok"}
								var serverId = res.serverId; // 返回音频的服务器端ID
								resolve(res)
							}
						});
						break;
					// 下载语音 
					case "downloadVoice":
					    if(data.isShowProgressTips===undefined){
					    	data.isShowProgressTips = 1;
					    }
						jweixin.downloadVoice({
							serverId: data.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
							isShowProgressTips: data.isShowProgressTips, // 默认为1，显示进度提示
							success: function(res) {
								//  (下载到微信本地文件) 成功返回：{"localId":"weixin://resourceid/8a9404ec18e42d9d22cc66998af533f2","errMsg":"downloadVoice:ok"}
						// 可用微信多媒体接口下载语音到自己的服务器，此处获得的 serverId 即 media_id，多媒体文件下载接口的频率限制为10000次/天
								var localId = res.localId; // 返回音频的本地ID
								resolve(res)
							}
						});
						break;
					// 多媒体文件下载链接
					case "mediaDownloadUrl":
					    let audio_url ='https://api.weixin.qq.com/cgi-bin/media';
					    if(data.type==='speex'){
					    	audio_url += '/get/jssdk?access_token=' + data.access_token + '&media_id=' + data.media_id;
					    } else {
					    	audio_url += '/get?access_token=' + data.access_token + '&media_id=' + data.media_id;
					    }
						resolve(audio_url)
						break;
					// 识别音频并返回识别结果
					case "translateVoice":
					    if(data.isShowProgressTips===undefined){
					    	data.isShowProgressTips = 1;
					    }
						jweixin.translateVoice({
							localId: data.localId, // 需要识别的音频的本地Id，由录音相关接口获得
							isShowProgressTips: data.isShowProgressTips, // 默认为1，显示进度提示
							success: function(res) {
								// 成功返回：{"translateResult":"识别语音。","errMsg":"translateVoice:ok"}
								resolve(res)
							}
						});
						break;
					// 获取网络状态
					case "getNetworkType":
					    jweixin.getNetworkType({
					      success: function (res) {
					        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
					    	resolve(res)
					      }
					    });
					    break;
					// 使用微信内置地图查看位置
					case "openLocation":
					    jweixin.openLocation({
					      latitude: data.latitude, // 纬度，浮点数，范围为90 ~ -90
					      longitude: data.longitude, // 经度，浮点数，范围为180 ~ -180。
					      name: data.name, // 位置名
					      address: data.address, // 地址详情说明
					      scale: data.scale, // 地图缩放级别,整型值,范围从1~28。默认为最大
					      infoUrl: data.infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
					    });
					    break;
					case "getLocation":
					    jweixin.getLocation({
					      type: 'wgs84', // 默认为wgs84的 gps 坐标，如果要返回直接给 openLocation 用的火星坐标，可传入'gcj02'
					      success: function (res) {
					        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					        var speed = res.speed; // 速度，以米/每秒计
					        var accuracy = res.accuracy; // 位置精度
							resolve(res)
					      }
					    });
					    break;
					// 开启查找周边 ibeacon 设备
					case "startSearchBeacons":
					    jweixin.startSearchBeacons({
					      ticket:"",  //摇周边的业务 ticket , 系统自动添加在摇出来的页面链接后面
					      complete:function(argv){
					        //开启查找完成后的回调函数
					    	resolve(res)
					      }
					    });
					    break;
					case "stopSearchBeacons":
					    jweixin.stopSearchBeacons({
					      complete:function(res){
					        //关闭查找完成后的回调函数
					    	resolve(res)
					      }
					    });
					    break;
					// 监听周边 ibeacon 设备
					case "onSearchBeacons":
					    jweixin.onSearchBeacons({
					      complete:function(argv){
					        //回调函数，可以数组形式取得该商家注册的在周边的相关设备列表
					    	resolve(res)
					      }
					    });
					    break;
					// 关闭当前网页窗口
					case "closeWindow":
					    jweixin.closeWindow();
					    break;
					// 批量隐藏功能按钮
					case "hideMenuItems":
					    jweixin.hideMenuItems({
					      menuList: data.menuList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有 menu 项见附录3
					    });
					    break;
					// 批量显示功能按钮
					case "showMenuItems":
					    jweixin.showMenuItems({
					      menuList: data.menuList // 要显示的菜单项，所有 menu 项见附录3
					    });
					    break;
					// 隐藏所有非基础按钮
					case "hideAllNonBaseMenuItem":
					    jweixin.hideAllNonBaseMenuItem();
					    break;
					// 显示所有功能按钮
					case "showAllNonBaseMenuItem":
					    jweixin.showAllNonBaseMenuItem();
					    break;
					// 调起微信扫一扫
					case "scanQRCode":
					    jweixin.scanQRCode({
					      needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					      success: function (res) {
					        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					    	resolve(res)
					      }
					    });
					    break;
					// 跳转微信商品页
					case "openProductSpecificView":
					    jweixin.openProductSpecificView({
					      productId: data.productId, // 商品id
					      viewType: data.viewType // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
					    });
					    break;
					// 拉取适用卡券列表并获取用户选择信息
					case "chooseCard":
					    // https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=wx_card
					    jweixin.chooseCard({
					      shopId: '', // 门店Id
					      cardType: '', // 卡券类型
					      cardId: '', // 卡券Id
					      timestamp: 0, // 卡券签名时间戳
					      nonceStr: '', // 卡券签名随机串
					      signType: '', // 签名方式，默认'SHA1'
					      cardSign: '', // 卡券签名
					      success: function (res) {
					        var cardList= res.cardList; // 用户选中的卡券列表信息
							resolve(res)
					      }
					    });
					    break;
					// 批量添加卡券
					case "addCard":
					    jweixin.addCard({
					      cardList: [{
					        cardId: '',
					        cardExt: ''
					      }], // 需要添加的卡券列表
					      success: function (res) {
					        var cardList = res.cardList; // 添加的卡券列表信息
					    	resolve(res)
					      }
					    });
					    break;
					case "openCard":
					    jweixin.openCard({
					      cardList: [{
					        cardId: '',
					        code: ''
					      }]// 需要打开的卡券列表
					    });
					    break;
					// 发起一个微信支付
					case "chooseWXPay":
					    jweixin.chooseWXPay({
					      timestamp: data.timestamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
					      nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
					      package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					      signType: data.signType, // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
					      paySign: data.paySign, // 支付签名
					      success: function (res) {
					        // 支付成功后的回调函数
							resolve(res)
					      }
					    });
					    break;
					// 共享收货地址
					case "openAddress":
					    jweixin.openAddress({
					      success: function (res) {
					        var userName = res.userName; // 收货人姓名
					        var postalCode = res.postalCode; // 邮编
					        var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
					        var cityName = res.cityName; // 国标收货地址第二级地址（市）
					        var countryName = res.countryName; // 国标收货地址第三级地址（国家）
					        var detailInfo = res.detailInfo; // 详细收货地址信息
					        var nationalCode = res.nationalCode; // 收货地址国家码
					        var telNumber = res.telNumber; // 收货人手机号码
							resolve(res)
					      }
					    });
					    break;
				}
			});
		});
	},
	/**
	 * @description          http请求
	 * @param config.path    接口路径
	 * @param config.data    提交的数据
	 * @param config.method  请求方法 默认get
	 * @param config.header  请求头
	 * @returns {object}     接口返回Json对象
	 */
	http(config) {
		if (!config.path) {
			uni.showToast({
				title: 'api接口路径不能为空',
				duration: 5000,
				icon: 'error'
			});
			return;
		}
		if (!config.data) {
			config.data = {};
		}
		if (!config.method) {
			config.method = 'get';
		}

		// 请求头信息
		let header = this.deepMerge(this.deepClone(appConfig.header), config.header);
		// 用户token
		let token = uni.getStorageSync(appConfig.tokenKey);
		if (token) {
			header[appConfig.tokenKey] = token;
		}
		// 园所id
		let schoolInfo = uni.getStorageSync(appConfig.schoolInfoKey);
		if (!header['s-id'] && schoolInfo) {
			header['s-id'] = schoolInfo.school_id;
		}
		// 推荐人r_id
		let r_id = uni.getStorageSync(appConfig.referrerIdKey);
		if (r_id) {
			header['r-id'] = r_id;
		}

		return new Promise((resolve, reject) => {
			// 获取接口数据
			uni.request({
				url: appConfig.apiUrl + config.path,
				data: config.data,
				header: header,
				method: config.method.toUpperCase(),
				dataType: 'json',
				withCredentials: true,
				success: (res) => {
					// 登陆已过期的弹窗提示
					if (res.data !== undefined && res.data.code === 1000) {
						this.reLogin();
					}
					resolve(res.data);
				},
				fail: (res) => {
					uni.showToast({
						title: 'api接口请求出错'
					});
					reject(res);
				}
			});
		});
	},
	/**
	 * @description 更新底部导航
	 * @param {Object} list
	 */
	updateTabList(list) {
		let tab_list = this.deepClone(appConfig.tabList);
		list.forEach((item, index) => {
			tab_list.forEach((tab, tab_index) => {
				if (tab.module === item.module) {
					tab.text = item.name;
					if (item.noclick_image) {
						tab.iconPath = item.noclick_image;
					}
					if (item.click_image) {
						tab.selectedIconPath = item.click_image;
					}
					// #ifdef H5
					tab.visible = true;
					if (!item.status) {
						tab.visible = false;
					}
					// #endif

				}
			});
		});
		return tab_list;
	},
	// 对象转url参数
	queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
		const prefix = isPrefix ? '?' : ''
		const _result = []
		if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets'
		for (const key in data) {
			const value = data[key]
			// 去掉为空的参数
			if (['', undefined, null].indexOf(value) >= 0) {
				continue
			}
			// 如果值为数组，另行处理
			if (value.constructor === Array) {
				// e.g. {ids: [1, 2, 3]}
				switch (arrayFormat) {
					case 'indices':
						// 结果: ids[0]=1&ids[1]=2&ids[2]=3
						for (let i = 0; i < value.length; i++) {
							_result.push(`${key}[${i}]=${value[i]}`)
						}
						break
					case 'brackets':
						// 结果: ids[]=1&ids[]=2&ids[]=3
						value.forEach((_value) => {
							_result.push(`${key}[]=${_value}`)
						})
						break
					case 'repeat':
						// 结果: ids=1&ids=2&ids=3
						value.forEach((_value) => {
							_result.push(`${key}=${_value}`)
						})
						break
					case 'comma':
						// 结果: ids=1,2,3
						let commaStr = ''
						value.forEach((_value) => {
							commaStr += (commaStr ? ',' : '') + _value
						})
						_result.push(`${key}=${commaStr}`)
						break
					default:
						value.forEach((_value) => {
							_result.push(`${key}[]=${_value}`)
						})
				}
			} else {
				_result.push(`${key}=${value}`)
			}
		}
		return _result.length ? prefix + _result.join('&') : ''
	},
	/**
	 * @description  获取url指定参数值
	 * @param {Object} name
	 */
	getQueryString(name) {
		const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		const search = window.location.search.split('?')[1] || '';
		const r = search.match(reg) || [];
		return r[2];
	},
	/**
	 * @description 追加url参数
	 * @param {Object} url
	 * @param {Object} key
	 * @param {Object} value
	 */
	appendQuery(url, key, value) {
		if (url.includes('?')) {
			url += '&' + key + '=' + value;
		} else {
			url += '?' + key + '=' + value;
		}
		return url;
	},
	/**
	 * @description 生成随机字符串
	 * @param {Object} len
	 */
	getNonceStr(len) {
		len = len || 32;
		let $chars =
			'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		let maxPos = $chars.length;
		let nonceStr = '';
		for (let i = 0; i < len; i++) {
			nonceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return nonceStr;
	},
	random(min, max) {
	  return Math.floor(Math.random() * (max - min) ) + min;
	},
	/**
	 * @description utf8 加密
	 * @param {Object} str
	 */
	encodeUTF8(str) {
		let i, r = [],
			c, x;
		for (i = 0; i < str.length; i++)
			if ((c = str.charCodeAt(i)) < 0x80) r.push(c);
			else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
		else {
			if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
				c = (x << 10) + (str.charCodeAt(++i) ^ 0xDC00) + 0x10000,
				r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
			else r.push(0xE0 + (c >> 12 & 0xF));
			r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
		};
		return r;
	},
	/**
	 * @description sha1 字符串加密成 hex 字符串
	 * @param {Object} str
	 */
	sha1(str) {
		let data = new Uint8Array(this.encodeUTF8(str))
		let i, j, t;
		let l = ((data.length + 8) >>> 6 << 4) + 16,
			s = new Uint8Array(l << 2);
		s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
		for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
		s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
		s[l - 1] = data.length << 3;
		let w = [],
			f = [
				function() {
					return m[1] & m[2] | ~m[1] & m[3];
				},
				function() {
					return m[1] ^ m[2] ^ m[3];
				},
				function() {
					return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
				},
				function() {
					return m[1] ^ m[2] ^ m[3];
				}
			],
			rol = function(n, c) {
				return n << c | n >>> (32 - c);
			},
			k = [1518500249, 1859775393, -1894007588, -899497514],
			m = [1732584193, -271733879, null, null, -1009589776];
		m[2] = ~m[0], m[3] = ~m[1];
		for (i = 0; i < s.length; i += 16) {
			let o = m.slice(0);
			for (j = 0; j < 80; j++)
				w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
				t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
				m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
			for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
		};
		t = new DataView(new Uint32Array(m).buffer);
		for (let i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

		let hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function(e) {
			return (e < 16 ? "0" : "") + e.toString(16);
		}).join("");

		return hex;
	},
	/**
	 * @description 深度克隆
	 * @param {object} obj 需要深度克隆的对象
	 * @param cache 缓存
	 * @returns {*} 克隆后的对象或者原值（不是对象）
	 */
	deepClone(obj, cache = new WeakMap()) {
		if (obj === null || typeof obj !== 'object') return obj;
		if (cache.has(obj)) return cache.get(obj);
		let clone;
		if (obj instanceof Date) {
			clone = new Date(obj.getTime());
		} else if (obj instanceof RegExp) {
			clone = new RegExp(obj);
		} else if (obj instanceof Map) {
			clone = new Map(Array.from(obj, ([key, value]) => [key, this.deepClone(value, cache)]));
		} else if (obj instanceof Set) {
			clone = new Set(Array.from(obj, value => this.deepClone(value, cache)));
		} else if (Array.isArray(obj)) {
			clone = obj.map(value => this.deepClone(value, cache));
		} else if (Object.prototype.toString.call(obj) === '[object Object]') {
			clone = Object.create(Object.getPrototypeOf(obj));
			cache.set(obj, clone);
			for (const [key, value] of Object.entries(obj)) {
				clone[key] = this.deepClone(value, cache);
			}
		} else {
			clone = Object.assign({}, obj);
		}
		cache.set(obj, clone);
		return clone;
	},
	/**
	 * @description JS对象深度合并
	 * @param {object} target 需要拷贝的对象
	 * @param {object} source 拷贝的来源对象
	 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
	 */
	deepMerge(target = {}, source = {}) {
		target = this.deepClone(target)
		if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null)
			return target;
		const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
		for (const prop in source) {
			if (!source.hasOwnProperty(prop)) continue;
			const sourceValue = source[prop];
			const targetValue = merged[prop];
			if (sourceValue instanceof Date) {
				merged[prop] = new Date(sourceValue);
			} else if (sourceValue instanceof RegExp) {
				merged[prop] = new RegExp(sourceValue);
			} else if (sourceValue instanceof Map) {
				merged[prop] = new Map(sourceValue);
			} else if (sourceValue instanceof Set) {
				merged[prop] = new Set(sourceValue);
			} else if (typeof sourceValue === 'object' && sourceValue !== null) {
				merged[prop] = this.deepMerge(targetValue, sourceValue);
			} else {
				merged[prop] = sourceValue;
			}
		}
		return merged;
	},
	/**
	 * @description 休眠
	 * @param {number} time 休眠时长（单位:毫秒）
	 */
	sleep(time = 500) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, time)
		})
	},
	// 转换时间格式
	videoTimeFormat(s) {
		s = Math.floor(s);
		if (s < 60) {
			if (s < 10) {
				return '00:0' + s;
			}
			return '00:' + s;
		} else {
			var second = s % 60;
			s = s - second;
			var minute = s / 60;
			if (minute < 10) {
				minute = '0' + minute;
			}
			if (second < 10) {
				second = '0' + second;
			}

			return minute + ':' + second;
		}
	},
	// 格式化价格
	priceFormat(price) {
		let price_str = '免费'
		if (price > 0) {
			price_str = '¥ ' + (price * 0.01).toFixed(2);
		}
		return price_str;
	},
	/**
	 * @description 格式化时间
	 * @param {String|Number} dateTime 需要格式化的时间戳
	 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
	 * @returns {string} 返回格式化后的字符串
	 */
	timeFormat(dateTime = null, formatStr = 'yyyy-mm-dd') {
		let date
		// 若传入时间为假值，则取当前时间
		if (!dateTime) {
			date = new Date()
		}
		// 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
		else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
			date = new Date(dateTime * 1000)
		}
		// 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
		else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
			date = new Date(Number(dateTime))
		}
		// 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
		// 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
		else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
			date = new Date(dateTime.replace(/-/g, '/'))
		}
		// 其他都认为符合 RFC 2822 规范
		else {
			date = new Date(dateTime)
		}

		const timeSource = {
			'y': date.getFullYear().toString(), // 年
			'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
			'd': date.getDate().toString().padStart(2, '0'), // 日
			'h': date.getHours().toString().padStart(2, '0'), // 时
			'M': date.getMinutes().toString().padStart(2, '0'), // 分
			's': date.getSeconds().toString().padStart(2, '0') // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		}

		for (const key in timeSource) {
			const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
			if (ret) {
				// 年可能只需展示两位
				const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
				formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
			}
		}

		return formatStr
	},
	// 显示、隐藏配置格式化
	formatConfig(data) {
		let obj = {};
		data.forEach(item => {
			for (let key in item) {
				if (key !== 'title') {
					obj[key] = {
						title: item.title,
						show: item[key]
					};
				}
			}
		});
		return obj;
	},
	/**
	 * @description 时间戳转为多久之前
	 * @param {String|Number} timestamp 时间戳
	 * @param {String|Boolean} format
	 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
	 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
	 * @returns {string} 转化后的内容
	 */
	timeFrom(timestamp = null, format = 'yyyy-mm-dd') {
		if (timestamp == null) timestamp = Number(new Date())
		timestamp = parseInt(timestamp)
		// 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
		if (timestamp.toString().length == 10) timestamp *= 1000
		let timer = (new Date()).getTime() - timestamp
		timer = parseInt(timer / 1000)
		// 如果小于5分钟,则返回"刚刚",其他以此类推
		let tips = ''
		switch (true) {
			case timer < 300:
				tips = '刚刚'
				break
			case timer >= 300 && timer < 3600:
				tips = `${parseInt(timer / 60)}分钟前`
				break
			case timer >= 3600 && timer < 86400:
				tips = `${parseInt(timer / 3600)}小时前`
				break
			case timer >= 86400 && timer < 2592000:
				tips = `${parseInt(timer / 86400)}天前`
				break
			default:
				// 如果format为false，则无论什么时间戳，都显示xx之前
				if (format === false) {
					if (timer >= 2592000 && timer < 365 * 86400) {
						tips = `${parseInt(timer / (86400 * 30))}个月前`
					} else {
						tips = `${parseInt(timer / (86400 * 365))}年前`
					}
				} else {
					tips = timeFormat(timestamp, format)
				}
		}
		return tips
	},

	/**
	 * @description 去除空格
	 * @param String str 需要去除空格的字符串
	 * @param String pos both(左右)|left|right|all 默认both
	 */
	trim(str, pos = 'both') {
		str = String(str)
		if (pos == 'both') {
			return str.replace(/^\s+|\s+$/g, '')
		}
		if (pos == 'left') {
			return str.replace(/^\s*/, '')
		}
		if (pos == 'right') {
			return str.replace(/(\s*$)/g, '')
		}
		if (pos == 'all') {
			return str.replace(/\s+/g, '')
		}
		return str
	},
	// 获取滚动的坐标
	scrollPosition(el) {
		return {
			x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
			y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
		}
	},
	// 滚动到顶部
	scrollToTop() {
		const c = document.documentElement.scrollTop || document.body.scrollTop;
		if (c > 0) {
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, c - c / 8);
		}
	},
	// 洗牌算法
	shuffle(arr) {
		var result = [],
			random;
		while (arr.length > 0) {
			random = Math.floor(Math.random() * arr.length);
			result.push(arr[random])
			arr.splice(random, 1)
		}
		return result;
	},
	// 拦截粘贴板
	copyTextToClipboard(value) {
		var textArea = document.createElement("textarea");
		textArea.style.background = 'transparent';
		textArea.value = value;
		document.body.appendChild(textArea);
		textArea.select();
		try {
			var successful = document.execCommand('copy');
		} catch (err) {
			console.log('哦，无法复制');
		}
		document.body.removeChild(textArea);
	},
	// 最大值
	max(arr) {
		return Math.max.apply(null, arr);
	},
	// 最小值
	min(arr) {
		return Math.min.apply(null, arr);
	},
	// 求和
	sum(arr) {
		return arr.reduce((pre, cur) => {
			return pre + cur;
		});
	},
	// 平均值
	average(arr) {
		return this.sum(arr) / arr.length;
	},
	// 节流(在一定时间内，只能触发一次)
	throttle(func, wait = 500, immediate = true) {
		if (immediate) {
			if (!flag) {
				flag = true
				// 如果是立即执行，则在wait毫秒内开始时执行
				typeof func === 'function' && func()
				timer = setTimeout(() => {
					flag = false
				}, wait)
			}
		} else if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func()
			}, wait)
		}
	},
	// 防抖(一定时间内，只有最后一次操作，再过wait毫秒后才执行函数)
	debounce(func, wait = 500, immediate = false) {
		// 清除定时器
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		// 立即执行，此类情况一般用不到
		if (immediate) {
			const callNow = !timeout
			timeout = setTimeout(() => {
				timeout = null
			}, wait)
			if (callNow) typeof func === 'function' && func()
		} else {
			// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
			timeout = setTimeout(() => {
				typeof func === 'function' && func()
			}, wait)
		}
	},
	// 页面跳转
	navigate(url, type, success, fail, complete) {
		if (!type) {
			type = 'navigateTo';
		}
		if (!success) {
			success = function() {

			};
		}
		if (!fail) {
			fail = function() {

			};
		}
		if (!complete) {
			complete = function() {

			};
		}
		switch (type) {
			case 'navigateTo':
				uni.navigateTo({
					url: url,
					success: success,
					fail: fail,
					complete: complete
				});
				break;
			case 'redirectTo':
				uni.redirectTo({
					url: url,
					success: success,
					fail: fail,
					complete: complete
				});
				break;
			case 'switchTab':
				uni.switchTab({
					url: url,
					success: success,
					fail: fail,
					complete: complete
				});
				break;
			case 'reLaunch':
				uni.reLaunch({
					url: url,
					success: success,
					fail: fail,
					complete: complete
				});
				break;
		}
	},
	// 返回
	back(path=1) {
		if (typeof path === 'number') {
			uni.navigateBack({
				delta: path
			});
		} else {
			uni.navigateTo({
				url: path
			});
		}
	},
	// 平台信息(运行期判断)
	os() {
		return uni.getSystemInfoSync().platform.toLowerCase()
	},
	// 获取系统信息
	sys() {
		return uni.getSystemInfoSync()
	},
	// 获取矩形信息
	getRect(selector, all) {
		return new Promise((resolve) => {
			const query = uni.createSelectorQuery().in(this);
			query.select(selector).boundingClientRect(data => {
				resolve(data)
				console.log("得到布局位置信息" + JSON.stringify(data));
				console.log("节点离页面顶部的距离为" + data.top);
			}).exec();
		});
	},
	// 解析网址
	parseURL(url) {
		var a = document.createElement('a');
		a.href = url;
		return {
			source: url,
			protocol: a.protocol.replace(':', ''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: (function() {
				var ret = {},
					seg = a.search.replace(/^\?/, '').split('&'),
					len = seg.length,
					i = 0,
					s;
				for (; i < len; i++) {
					if (!seg[i]) {
						continue;
					}
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
			hash: a.hash.replace('#', ''),
			path: a.pathname.replace(/^([^\/])/, '/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
			segments: a.pathname.replace(/^\//, '').split('/')
		};
	},

	/**
	 * @description 解析url参数
	 * @param {Object} url
	 */
	getUrlParams(url) {
		let pattern = /(\w+)=(\w+)/ig; //定义正则表达式
		let parames = {}; // 定义参数对象
		url.replace(pattern, ($, $1, $2) => {
			parames[$1] = $2;
		});
		return parames;
	}
}
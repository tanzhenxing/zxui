import appConfig from '@/config/appConfig.js';

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
	// 设置微信分享信息
	async setShare(shareData = null, param = null, article_info = null, share_type = 1) {
		// url中的推荐人id
		let url_r_id = 0;
		if (param.r_id !== undefined && parseInt(param.r_id) > 0) {
			url_r_id = parseInt(param.r_id);
		}

		// 权限验证配置
		await this.setJsApiConfig();

		// 显示微信分享功能
		this.wechatJsSdk('showAllNonBaseMenuItem');

		let user_info = uni.getStorageSync(appConfig.userInfoName);
		if (user_info !== '') {
			param.r_id = user_info.id;
		}

		// 设置默认分享信息
		if (shareData.title === undefined) {
			shareData.title = '未知标题';
		}
		if (shareData.desc === undefined) {
			shareData.desc = '未知简介';
		}
		if (shareData.imgUrl == undefined) {
			shareData.imgUrl = appConfig.appUrl + '/static/img/nopic.jpg';
		}

		// 获取当前url
		let share_url = window.location.origin + window.location.pathname;
		if (shareData.link === undefined) {
			share_url += '?' + Date.now() + window.location.hash.replace(/\?(.*)/g, '');
		} else {
			share_url += '?' + Date.now() + '#' + shareData.link;
		}
		// 重新拼接参数
		let option_str = this.objectToQuery(param);
		if (option_str !== '') {
			share_url += option_str
		}
		shareData.link = share_url;

		jweixin.ready(() => {
			let share_data = {
				title: shareData.title,
				desc: shareData.desc,
				link: shareData.link,
				imgUrl: shareData.imgUrl,
				success: res => {
					if (url_r_id > 0) {
						this.postShareData(share_type, article_info, url_r_id);
					}
				},
				trigger: (res) => {
					//this.postShareData(share_type,article_info);
				}
			};

			//分享给朋友接口  
			jweixin.updateAppMessageShareData(share_data);
			//jweixin.onMenuShareAppMessage(share_data);
			//分享到朋友圈接口  
			jweixin.updateTimelineShareData({
				title: shareData.title,
				desc: shareData.desc,
				link: shareData.link,
				imgUrl: shareData.imgUrl
			});
			//jweixin.onMenuShareTimeline(share_data);
			//jweixin.onMenuShareWeibo(share_data);
			//jweixin.onMenuShareQZone(share_data);
		});

		// 错误信息
		jweixin.error((res) => {
			console.log('error:' + JSON.stringify(res))
			this.getJsApiTicket();
		});

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
	async setJsApiConfig(config = {}) {
		// 默认配置
		if (!config.appid) {
			config.appid = appConfig.shareAppid;
		}
		if (!config.jsApiList) {
			config.jsApiList = appConfig.jsApiList;
		}
		if (!config.openTagList) {
			config.openTagList = appConfig.openTagList;
		}
		if (!config.jsSdkDebug) {
			config.jsSdkDebug = appConfig.jsSdkDebug;
		}

		// 获取 ticket
		let get_ticket = await this.getJsApiTicket();
		let ticket = get_ticket.data;

		// 生成签名参数
		let shareUrl = window.location.href.replace(/#(.*)/g, '');
		let timestamp = parseInt(Date.parse(new Date()) * 0.001);
		let nonceStr = this.getNonceStr(16);
		let str = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' +
			shareUrl;
		let signature = this.sha1(str);
		// 权限验证配置
		jweixin.config({
			debug: config.jsSdkDebug,
			appId: config.appid,
			timestamp: timestamp,
			nonceStr: nonceStr,
			signature: signature,
			jsApiList: config.jsApiList,
			openTagList: config.openTagList
		});
	},
	// 获取微信js api ticket
	async getJsApiTicket() {
		let config = {
			path: '/jsapi_ticket',
			method: 'get',
			header: {
				['is-domain']: 0,
				action: 'getJsApiTicket'
			}
		}
		let result = await this.http(config);
		// 保存api ticket
		uni.setStorageSync(appConfig.jsApiTicketKey, result.data);
		return result.data;
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
		let schoolInfo = uni.getStorageSync(appConfig.SchoolInfoKey);
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
	back(path) {
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
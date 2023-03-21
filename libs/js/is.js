export default {
	// 各种类型的数据判断
	email(str){
		//return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);
		return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
	},
	mobile(str){
	    return /^1[0-9]{10}$/.test(str);
		//return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
	},
	phone(str){
	    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str)
	},
	phoneFull(str){
		return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
	},
	idCard(str){
		return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
	},
	idCardFull(sId){
		if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
		    console.log('你输入的身份证长度或格式错误')
		    return false
		}
		//身份证城市
		var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
		if (!aCity[parseInt(sId.substr(0, 2))]) {
		    console.log('你的身份证地区非法')
		    return false
		}
		// 出生日期验证
		var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
		    d = new Date(sBirthday)
		if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
		    console.log('身份证上的出生日期非法')
		    return false
		}
		// 身份证号码校验
		var sum = 0,
		    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
		    codes = "10X98765432"
		for (var i = 0; i < sId.length - 1; i++) {
		    sum += sId[i] * weights[i];
		}
		var last = codes[sum % 11]; //计算出来的最后一位身份证号码
		if (sId[sId.length - 1] != last) {
		    console.log('你输入的身份证号非法')
		    return false
		}
		return true
	},
	url(str){
	    //return /^http[s]?:\/\/.*/.test(s);
		return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
	},
	ip(str){
		return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
	},
	money(str){
		return /^\d*(?:\.\d{0,2})?$/.test(str);
	},
	// 密码是否合法
	password(str){
		return /^[a-zA-Z]\w{5,17}$/.test(str)
	},
	// 邮政编码
	postal(str){
		return /[1-9]\d{5}(?!\d)/.test(str);
	},
	qqNumber(str){
		return /^[1-9][0-9]{4,9}$/.test(str);
	},
	english(str){
		return /^[a-zA-Z]+$/.test(str);
	},
	chinese(){
		return /^[\\u4E00-\\u9FA5]+$/.test(str);
	},
	lower(){
		return /^[a-z]+$/.test(str);
	},
	upper(){
		return /^[A-Z]+$/.test(str);
	},
	html(){
		return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
	},
	string(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
	},
	number(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
		//return /^[0-9]$/.test(str);
	},
	boolean(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
	},
	function(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
	},
	null(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
	},
	undefined(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
	},
	// 对象
	obj(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
	},
	// 数组
	array(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
	},
	// 是否时间
	date(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
		//return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
	},
	// 是否正则
	regExp(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
	},
	// 是否错误对象
	error(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
	},
	// 是否Symbol函数
	symbol(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
	},
	// 是否Promise对象
	promise(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
	},
	// 是否Set对象
	set(o){
	    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
	},
	// 是否是移动端
	deviceMobile(){
	    return /android|webos|iphone|ipod|balckberry/i.test(ua)
	},
	// 是否是爬虫
	spider(){
	    return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
	},
	// 是否ios
	ios(){
	    var u = navigator.userAgent;
	    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {  //安卓手机
	        return false
	    } else if (u.indexOf('iPhone') > -1) {//苹果手机
	        return true
	    } else if (u.indexOf('iPad') > -1) {//iPad
	        return false
	    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
	        return false
	    } else {
	        return false
	    }
	},
	// 是否为PC端
	pc(){
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	        "SymbianOS", "Windows Phone",
	        "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	},
	// 是否为QQ浏览器
	qqBrowser(){
	    return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
	},
	// 是否为微信浏览器
	wechat() {
		let result = false;
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			result = true;
		}
		return result;
	}
}
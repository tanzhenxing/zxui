export default {
	// 转换时间格式
	timeFormat(s) {
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
	// 时间字符串 转 标准时间格式
	fomatTime(time_str) {
		var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
		var res = time_str.match(reg);
		if (res == null) {
			return false;
		}
		var year = parseInt(res[1]);
		if (year < 1000) {
			return false;
		}
		var month = parseInt(res[2]);
		var day = parseInt(res[3]);
		var h = parseInt(res[4]);
		if (h < 0 || h > 24) {
			return false;
		}
		var i = parseInt(res[5]);
		if (i < 0 || i > 60) {
			return false;
		}
		var s = parseInt(res[6]);
		if (s < 0 || s > 60) {
			return false;
		}
		var leftTime = new Date(year, month - 1, day, h, i, s);
		return leftTime;
	},
	// 多少天、时、分、秒 之后
	timeLater(time) {
		var leftTime = time - new Date();
		var day = parseInt(leftTime / (1000 * 60 * 60 * 24));
		var hours = parseInt((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((leftTime % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = parseInt((leftTime % (1000 * 60)) / 1000);
		/* if (hours   < 10) { hours   = '0' + hours;}
		if (minutes < 10) { minutes = '0' + minutes; }
		if (seconds < 10) { seconds = '0' + seconds; } */
		return {
			day: day,
			hour: hours,
			minute: minutes,
			second: seconds
		};
	},
	// --- 日期时间 ---
	now(type, addTime) {
		var dateObj = new Date();
		var cTime = dateObj.getTime();
		if (addTime) {
			cTime += addTime;
		}
		if (!type) {
			type = 'number';
		}
		if (type == 'number') {
			return cTime;
		} else if (type == 'str') {
			return this.toDate(cTime / 1000, 'str');
		} else if (type == 'array') {
			return this.toDate(cTime / 1000, 'array');
		}
	},
	// 时间戳转 YY-mm-dd HH:ii:ss
	toDate(timeStamp, returnType) {
		timeStamp = parseInt(timeStamp);
		var date = new Date();
		if (timeStamp < 90000000000) {
			date.setTime(timeStamp * 1000);
		} else {
			date.setTime(timeStamp);
		}
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		if (returnType == 'str') {
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		}
		return [y, m, d, h, minute, second];
	},
	// 字符串转时间戳
	toTimeStamp(timeStamp) {
		var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
		var res = timeStamp.match(reg);
		if (res == null) {
			var reg2 = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
			var res2 = timeStamp.match(reg2);
			if (res2 == null) {
				console.log('时间格式错误 E001');
				return false;
			}
			var year = parseInt(res2[3]);
			var month = parseInt(res2[1]);
			var day = parseInt(res2[2]);
			var h = parseInt(res2[4]);
			var i = parseInt(res2[5]);
			var s = parseInt(res2[6]);
		} else {
			var year = parseInt(res[1]);
			var month = parseInt(res[2]);
			var day = parseInt(res[3]);
			var h = parseInt(res[4]);
			var i = parseInt(res[5]);
			var s = parseInt(res[6]);
		}
		if (year < 1000) {
			console.log('时间格式错误');
			return false;
		}
		if (h < 0 || h > 24) {
			console.log('时间格式错误');
			return false;
		}
		if (i < 0 || i > 60) {
			console.log('时间格式错误');
			return false;
		}
		if (s < 0 || s > 60) {
			console.log('时间格式错误');
			return false;
		}
		return Date.parse(new Date(year, month - 1, day, h, i, s));
	},
	// 根据时间戳计算多少分钟/小时/天之前
	fromTime(time) {
		if (time < 90000000000) {
			time *= 1000;
		}
		var timer = new Date().getTime() - time;
		timer = parseInt(timer / 1000);
		if (timer < 180) {
			return '刚刚';
		} else if (timer >= 180 && timer < 3600) {
			return parseInt(timer / 60) + '分钟前';
		} else if (timer >= 3600 && timer < 86400) {
			return parseInt(timer / 3600) + '小时前';
		} else if (timer >= 86400 && timer < 2592000) {
			return parseInt(timer / 86400) + '天前';
		} else {
			return this.toDate(time, 'str');
		}
	},
	/**
	 * @desc 日期格式化
	 * @param formatStr 格式化字符串(y-m-d h:i:s)
	 * @param fdate 需要格式化日期
	 * @param type  fdate的格式：1-日期字符串(2017/12/04 12:12:12) 2-时间戳(1603676514690) 3-日期字符串，无连接符(20171204121212) 
	 * 4-new Date()时间格式(Thu Oct 01 2020 00:00:00 GMT+0800 (中国标准时间))
	 * @param isMs  时间戳精度是否为毫秒（精度是秒时传false），type=2时有效
	 **/
	date: function(formatStr, fdate, type = 1, isMs = true) {
		let date = ""
		if (type === 3) {
			date = _timeStr(fdate, formatStr)
		} else {
			date = _date(formatStr, fdate, type, isMs)
		}
		return date;
	},
	_date(formatStr, fdate, type = 1, isMs) {
		if (!fdate) return;
		let fTime, fStr = 'ymdhis';
		if (type === 4) {
			fTime = fdate;
		} else {
			fdate = fdate.toString()
			if (~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.replace('T', ' ').replace(/\-/g, '/');
			if (!formatStr)
				formatStr = "y-m-d h:i:s";
			if (fdate) {
				if (type === 2) {
					fdate = isMs ? Number(fdate) : Number(fdate) * 1000
				}
				fTime = new Date(fdate);
			} else {
				fTime = new Date();
			}
		}
		var month = fTime.getMonth() + 1;
		var day = fTime.getDate();
		var hours = fTime.getHours();
		var minu = fTime.getMinutes();
		var second = fTime.getSeconds();
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;
		hours = hours < 10 ? ('0' + hours) : hours;
		minu = minu < 10 ? '0' + minu : minu;
		second = second < 10 ? '0' + second : second;
		var formatArr = [
			fTime.getFullYear().toString(),
			month.toString(),
			day.toString(),
			hours.toString(),
			minu.toString(),
			second.toString()
		]
		for (var i = 0; i < formatArr.length; i++) {
			formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
		}
		return formatStr;
	},
	/**
	 * @desc 格式化时间
	 * @param timeStr 时间字符串 20191212162001
	 * @param formatStr 需要的格式 如 y-m-d h:i:s | y/m/d h:i:s | y/m/d | y年m月d日 等
	 **/
	_timeStr: function(timeStr, formatStr) {
		if (!timeStr) return;
		timeStr = timeStr.toString()
		if (timeStr.length === 14) {
			let timeArr = timeStr.split('')
			let fStr = 'ymdhis'
			if (!formatStr) {
				formatStr = 'y-m-d h:i:s'
			}
			let formatArr = [
				[...timeArr].splice(0, 4).join(''),
				[...timeArr].splice(4, 2).join(''),
				[...timeArr].splice(6, 2).join(''),
				[...timeArr].splice(8, 2).join(''),
				[...timeArr].splice(10, 2).join(''),
				[...timeArr].splice(12, 2).join('')
			]
			for (let i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i])
			}
			return formatStr
		}
		return timeStr
	}
}

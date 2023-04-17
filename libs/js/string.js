export default {
	// 字符串长度计算
	count(str, countSpace = true) {
		if (countSpace) {
			return str.length;
		}
		return this.removeAllSpace(str).length;
	},
	// 去除全部空格
	removeAllSpace(str) {
		return str.replace(/\s+/g, "");
	},
	// 去除首尾空格
	trim(str) {
		return str.trim();
	},
	// 去除左侧空格
	trimL(str) {
		return str.replace(/^\s+/g, "");
	},
	// 去除右侧空格
	trimR(str) {
		return str.replace(/\s+$/g, "");
	},
	// 字符串搜索
	search(str, kwd, caseSensitive = true) {
		if (!caseSensitive) {
			kwd = kwd.toLowerCase();
			str = str.toLowerCase();
		}
		return str.indexOf(kwd);
	},
	// 生成随机字符串
	nonceStr(len) {
		len = len || 32;
		let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		let maxPos = $chars.length;
		let nonceStr = '';
		for (let i = 0; i < len; i++) {
			nonceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return nonceStr;
	},
	// 生成 uuid
	uuid() {
		var d = new Date().getTime();
		if (window.performance && typeof window.performance.now === "function") {
			d += performance.now(); //use high-precision timer if available
		}
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	},
	// 唯一标识，随机数
	unique(n) {
		n = n || 6;
		let rnd = '';
		for (let i = 0; i < n; i++) {
			rnd += Math.floor(Math.random() * 10);
		}
		return 'zx_' + new Date().getTime() + rnd;
	},
	// 在字符串中插入新字符串
	insertStr(source, index, newStr) {
		return source.slice(0, index) + newStr + soure.slice(index);
	},
	// 阿拉伯数字翻译成中文的大写数字
	numberToChinese(num) {
		var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
		var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
		var a = ("" + num).replace(/(^0*)/g, "").split("."),
			k = 0,
			re = "";
		for (var i = a[0].length - 1; i >= 0; i--) {
			switch (k) {
				case 0:
					re = BB[7] + re;
					break;
				case 4:
					if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
						.test(a[0]))
						re = BB[4] + re;
					break;
				case 8:
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
			}
			if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
				re = AA[0] + re;
			if (a[0].charAt(i) != 0)
				re = AA[a[0].charAt(i)] + BB[k % 4] + re;
			k++;
		}

		if (a.length > 1) // 加上小数部分(如果有小数部分)
		{
			re += BB[6];
			for (var i = 0; i < a[1].length; i++)
				re += AA[a[1].charAt(i)];
		}
		if (re == '一十')
			re = "十";
		if (re.match(/^一/) && re.length == 3)
			re = re.replace("一", "");
		return re;
	},
	// 数字金额转换为大写金额
	changeToChinese(Num) {
		//判断如果传递进来的不是字符的话转换为字符
		if (typeof Num == "number") {
			Num = new String(Num);
		};
		Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
		Num = Num.replace(/ /g, "") //替换tomoney()中的空格
		Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
		if (isNaN(Num)) { //验证输入的字符是否为数字
			//alert("请检查小写金额是否正确");
			return "";
		};
		//字符处理完毕后开始转换，采用前后两部分分别转换
		var part = String(Num).split(".");
		var newchar = "";
		//小数点前进行转化
		for (var i = part[0].length - 1; i >= 0; i--) {
			if (part[0].length > 10) {
				return "";
				//若数量超过拾亿单位，提示
			}
			var tmpnewchar = ""
			var perchar = part[0].charAt(i);
			switch (perchar) {
				case "0":
					tmpnewchar = "零" + tmpnewchar;
					break;
				case "1":
					tmpnewchar = "壹" + tmpnewchar;
					break;
				case "2":
					tmpnewchar = "贰" + tmpnewchar;
					break;
				case "3":
					tmpnewchar = "叁" + tmpnewchar;
					break;
				case "4":
					tmpnewchar = "肆" + tmpnewchar;
					break;
				case "5":
					tmpnewchar = "伍" + tmpnewchar;
					break;
				case "6":
					tmpnewchar = "陆" + tmpnewchar;
					break;
				case "7":
					tmpnewchar = "柒" + tmpnewchar;
					break;
				case "8":
					tmpnewchar = "捌" + tmpnewchar;
					break;
				case "9":
					tmpnewchar = "玖" + tmpnewchar;
					break;
			}
			switch (part[0].length - i - 1) {
				case 0:
					tmpnewchar = tmpnewchar + "元";
					break;
				case 1:
					if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
					break;
				case 2:
					if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
					break;
				case 3:
					if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
					break;
				case 4:
					tmpnewchar = tmpnewchar + "万";
					break;
				case 5:
					if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
					break;
				case 6:
					if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
					break;
				case 7:
					if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
					break;
				case 8:
					tmpnewchar = tmpnewchar + "亿";
					break;
				case 9:
					tmpnewchar = tmpnewchar + "拾";
					break;
			}
			var newchar = tmpnewchar + newchar;
		}
		//小数点之后进行转化
		if (Num.indexOf(".") != -1) {
			if (part[1].length > 2) {
				// alert("小数点之后只能保留两位,系统将自动截断");
				part[1] = part[1].substr(0, 2)
			}
			for (i = 0; i < part[1].length; i++) {
				tmpnewchar = ""
				perchar = part[1].charAt(i)
				switch (perchar) {
					case "0":
						tmpnewchar = "零" + tmpnewchar;
						break;
					case "1":
						tmpnewchar = "壹" + tmpnewchar;
						break;
					case "2":
						tmpnewchar = "贰" + tmpnewchar;
						break;
					case "3":
						tmpnewchar = "叁" + tmpnewchar;
						break;
					case "4":
						tmpnewchar = "肆" + tmpnewchar;
						break;
					case "5":
						tmpnewchar = "伍" + tmpnewchar;
						break;
					case "6":
						tmpnewchar = "陆" + tmpnewchar;
						break;
					case "7":
						tmpnewchar = "柒" + tmpnewchar;
						break;
					case "8":
						tmpnewchar = "捌" + tmpnewchar;
						break;
					case "9":
						tmpnewchar = "玖" + tmpnewchar;
						break;
				}
				if (i == 0) tmpnewchar = tmpnewchar + "角";
				if (i == 1) tmpnewchar = tmpnewchar + "分";
				newchar = newchar + tmpnewchar;
			}
		}
		//替换所有无用汉字
		while (newchar.search("零零") != -1)
			newchar = newchar.replace("零零", "零");
		newchar = newchar.replace("零亿", "亿");
		newchar = newchar.replace("亿万", "亿");
		newchar = newchar.replace("零万", "万");
		newchar = newchar.replace("零元", "元");
		newchar = newchar.replace("零角", "");
		newchar = newchar.replace("零分", "");
		if (newchar.charAt(newchar.length - 1) == "元") {
			newchar = newchar + "整"
		}
		return newchar;
	},
	// 字符转换，type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
	changeCase(str, type) {
		type = type || 4
		switch (type) {
			case 1:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
				});
			case 2:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
				});
			case 3:
				return str.split('').map(function(word) {
					if (/[a-z]/.test(word)) {
						return word.toUpperCase();
					} else {
						return word.toLowerCase()
					}
				}).join('')
			case 4:
				return str.toUpperCase();
			case 5:
				return str.toLowerCase();
			default:
				return str;
		}
	},
	// 手机号码脱敏(隐藏中间四位)
	mobile(num) {
		return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
	},
	// 金额格式化，只保留两位小数
	money(money) {
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
			/\,$/, '').split('').reverse().join('');
	}
}
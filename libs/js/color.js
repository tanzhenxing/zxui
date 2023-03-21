export default {
	color: {
	    primary: '#3c9cff',
	    info: '#909399',
	    default: '#909399',
	    warning: '#f9ae3d',
	    error: '#f56c6c',
	    success: '#5ac725',
	    mainColor: '#303133',
	    contentColor: '#606266',
	    tipsColor: '#909399',
	    lightColor: '#c0c4cc',
	    borderColor: '#e4e7ed'
	},
	// 16进制颜色转RGBRGBA字符串
	colorToRGB(val, opa){
		let pattern = /^(#?)[a-fA-F0-9]{6}$/; //16进制颜色值校验规则
		let isOpa = typeof opa == 'number'; //判断是否有设置不透明度
		if (!pattern.test(val)) { //如果值不符合规则返回空字符
		    return '';
		}
		let v = val.replace(/#/, ''); //如果有#号先去除#号
		let rgbArr = [];
		let rgbStr = '';
		for (let i = 0; i < 3; i++) {
		    let item = v.substring(i * 2, i * 2 + 2);
		    let num = parseInt(item, 16);
		    rgbArr.push(num);
		}
		rgbStr = rgbArr.join();
		rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
		return rgbStr;
	},
	/**
	 * @desc RGB颜色转十六进制颜色
	 * @param r
	 * @param g
	 * @param b
	 **/
	rgbToHex: function(r, g, b) {
		return "#" + utils._toHex(r) + utils._toHex(g) + utils._toHex(b)
	},
	_toHex: function(n) {
		n = parseInt(n, 10);
		if (isNaN(n)) return "00";
		n = Math.max(0, Math.min(n, 255));
		return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
			"0123456789ABCDEF".charAt(n % 16);
	},
	/**
	 * @desc 十六进制颜色转RGB颜色
	 * @param hex 颜色值 #333 或 #333333
	 **/
	hexToRGB(hex) {
		if (hex.length === 4) {
			let text = hex.substring(1, 4);
			hex = '#' + text + text;
		}
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},
}
export default {
	// 解析网址
	parse(url) {
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
	// 获取网址参数
	getParam(url) {
		let pattern = /(\w+)=(\w+)/ig; //定义正则表达式
		let parames = {}; // 定义参数对象
		url.replace(pattern, ($, $1, $2) => {
			parames[$1] = $2;
		});
		return parames;
	},
	// 追加url参数
	appendParam(url, key, value) {
		if (url.includes('?')) {
			url += '&' + key + '=' + value;
		} else {
			url += '?' + key + '=' + value;
		}
		return url;
	},
	// 对象转url参数
	objectToParam(obj) {
		let url_query = '';
		let i = 0;
		for (let key in obj) {
			if (i === 0) {
				url_query = '?' + key + '=' + obj[key];
			} else {
				url_query += '&' + key + '=' + obj[key];
			}
			i++;
		}
		return url_query;
	},
}

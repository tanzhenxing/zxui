// 定时器
let timeout = null;
// 节流标志
let flag = null;

export default {
	// 获取滚动的坐标
	scrollPosition(el){
		return {
			x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
			y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
		}
	},
	// 滚动到顶部
	scrollToTop(){
	    const c = document.documentElement.scrollTop || document.body.scrollTop;
	    if (c > 0) {
	        window.requestAnimationFrame(scrollToTop);
	        window.scrollTo(0, c - c / 8);
	    }
	},
	// 洗牌算法
	shuffle(arr){
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
	copyTextToClipboard(value){
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
	max(arr){
		return Math.max.apply(null, arr);
	},
	// 最小值
	min(arr){
		return Math.min.apply(null, arr);
	},
	// 求和
	sum(arr){
		return arr.reduce((pre, cur) => {
			return pre + cur;
		});
	},
	// 平均值
	average(arr){
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
	    if (timeout !== null){
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
		if(typeof path === 'number'){
			uni.navigateBack({
				delta: path
			});
		} else {
			uni.navigateTo({
				url: path
			});
		}
	},
	sleep(value = 30) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, value)
		})
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
	        uni.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect((rect) => {
	                if (all && Array.isArray(rect) && rect.length) {
	                    resolve(rect);
	                }
	                if (!all && rect) {
	                    resolve(rect);
	                }
	            }).exec();
	    });
	}
}
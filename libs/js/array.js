export default {
	// 判断一个元素是否在数组中
	contains(arr, val){
	    return arr.indexOf(val) != -1 ? true : false;
	},
	// 数组排序
	sort(arr, type = 1){
	    return arr.sort((a, b) => {
	        switch (type) {
	            case 1:
	                return a - b;
	            case 2:
	                return b - a;
	            case 3:
	                return Math.random() - 0.5;
	            default:
	                return arr;
	        }
	    })
	},
	// 数组去重
	hasOwnProperty(arr){
	    if (Array.hasOwnProperty('from')) {
	        return Array.from(new Set(arr));
	    } else {
	        var n = {}, r = [];
	        for (var i = 0; i < arr.length; i++) {
	            if (!n[arr[i]]) {
	                n[arr[i]] = true;
	                r.push(arr[i]);
	            }
	        }
	        return r;
	    }
	},
	// 两个集合的并集
	concat(a, b){
	    var newArr = a.concat(b);
	    return this.unique(newArr);
	},
	// 两个集合的交集
	intersect(a, b){
	    a = this.unique(a);
	    return this.map(a, (o) =>{
	        return this.contains(b, o) ? o : null;
	    });
	},
	// 删除其中一个元素
	remove(arr, ele){
	    var index = arr.indexOf(ele);
	    if (index > -1) {
	        arr.splice(index, 1);
	    }
	    return arr;
	},
	// 类数组转换为数组
	form(ary) {
		var arr = [];
		if (Array.isArray(ary)) {
			arr = ary;
		} else {
			arr = Array.prototype.slice.call(ary);
		};
		return arr;
	},
}
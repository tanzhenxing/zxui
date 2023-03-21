export default {
	// 判断两个对象是否键值相同
	isObjectEqual(a, b){
		let aProps = Object.getOwnPropertyNames(a);
		let bProps = Object.getOwnPropertyNames(b);
		if (aProps.length !== bProps.length) {
		    return false;
		}
		for (let i = 0; i < aProps.length; i++) {
		    let propName = aProps[i];
		    if (a[propName] !== b[propName]) {
		        return false;
		    }
		}
		return true;
	},
}
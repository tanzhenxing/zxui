export default {
	// 获取文件扩展名
	getExtension(str) {
		str = str.split('.');
		return str.pop();
	},
	blobToDataURL(blob, callback) {
	    let a = new FileReader();
	    a.onload = function (e) { callback(e.target.result); }
	    a.readAsDataURL(blob);
	},
	objectURLToBlob(url,callback) {
		const http = new XMLHttpRequest();  
		http.open("GET", url, true);  
		http.responseType = "blob";  
		http.onload = function (e) {
			if (this.status == 200 || this.status === 0) {
			    callback(this.response);
			}
		};
		http.send();
	},
	// dataURL 转 file对象
	dataURLtoFile(base64Data, filename) {
		let arr = base64Data.split(',');
		let mime = arr[0].match(/:(.*?);/)[1];
		let suffix = mime.split('/')[1];
		let bstr = atob(arr[1]);
		let n = bstr.length;
		let u8arr = new Uint8Array(n);
		while (n--) {
		    u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], `${filename}.${suffix}`, {
		        type: mime
		});
	},
	// url地址下载
	download(url){
	    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	    var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	    if (isChrome || isSafari) {
	        var link = document.createElement('a');
	        link.href = url;
	        if (link.download !== undefined) {
	            var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
	            link.download = fileName;
	        }
	        if (document.createEvent) {
	            var e = document.createEvent('MouseEvents');
	            e.initEvent('click', true, true);
	            link.dispatchEvent(e);
	            return true;
	        }
	    }
	    if (url.indexOf('?') === -1) {
	        url += '?download';
	    }
	    window.open(url, '_self');
	    return true;
	}
}
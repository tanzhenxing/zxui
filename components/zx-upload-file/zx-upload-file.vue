<template>
	<view v-show="show">
		<!-- 加载数据 -->
		<view v-if="fileList" class="flex-row">
			<view v-if="fileList.length < maxCount" class="flex-column flex-center"
				:style="{ borderRadius: borderRadius, backgroundColor: bgColor, width: width, height: height }" @tap="chooseFile">
				<view><zx-icon :name="uploadIcon" :color="uploadIconColor" :bold="true" size="50rpx"></zx-icon></view>
				<view><zx-text :text="uploadText" :color="uploadIconColor" size="26rpx" lineHeight="40rpx"></zx-text></view>
			</view>
			<view v-if="fileList.length > 0" class="zx-add-list-items" :style="{ borderRadius: borderRadius, backgroundColor: bgColor, width: width }">
				<template v-for="(item, index) in fileList" :key="index">
					<view>
						<view v-if="accept === 'image'">
							<image
								:src="item.url"
								:data-imgurl="item.url"
								:style="{ borderRadius: borderRadius, width: width, height: height }"
								@tap="showImgs"
								class="zx-add-list-img"
								:mode="imageMode"
							></image>
						</view>
						<view v-else-if="accept === 'video' && item.key !== undefined">
							<image
								:src="item.url + '?vframe/jpg/offset/2/w/300/h/300'"
								:data-imgurl="item.url + '?vframe/jpg/offset/2/w/300/h/300'"
								:style="{ borderRadius: borderRadius, width: width, height: height }"
								@tap="openVideo"
								class="zx-add-list-img"
								:mode="imageMode"
							></image>
							<!-- 视频弹窗 -->
							<zx-popup :show="videoShow" mode="right" :overlayOpacity="1" :closeOnClickOverlay="false">
								<view style="background-color: #000000;width: 750rpx;height: 100%;">
									<view style="width: 750rpx;">
										<view :style="'height: ' + topHeight + 'px;color:#ffffff;'"><text class="zx-icons app-arrow-left" @click="closeVideo">&#xe600;</text></view>
										<video
											id="myVideo"
											:style="'width: 750rpx;height: ' + videoHeight + 'px'"
											:src="item.path"
											:poster="item.url + '?vframe/jpg/offset/2/w/300/h/300'"
											:autoplay="true"
											controls
										></video>
									</view>
									<view :style="'height:' + footerHeight + ' px;'"></view>
								</view>
							</zx-popup>
						</view>
					</view>
					<!-- 进度条 -->
					<view class="zx-upload-progress" v-if="showProgress">
						<progress
							v-if="item.progress !== undefined"
							:percent="item.progress"
							:stroke-width="progressSize"
							:activeColor="progressColor"
							:backgroundColor="progressBGColor"
						/>
						<view style="background-color: #101010;opacity: 0.4;">
							<zx-text :text="'已上传:' + item.progress + '%'" color="#ffffff" size="24rpx" align="center"></zx-text>
						</view>
					</view>
					<!-- 上传失败 -->
					<view class="zx-add-list-reup zx-flex zx-columns zx-justify-content-center zx-align-items-center" @tap.stop="retry" :data-index="index" v-if="item.error">
						<text class="zx-add-list-reup-icon zx-icons icon-retry zx-color-white">&#xe635;</text>
						<text class="zx-add-list-reup-text zx-color-white">失败重试</text>
					</view>
					<!-- 删除 -->
					<view style="position: absolute;z-index: 5;right: 0;top: 0;background-color: #101010;padding: 4rpx;" @tap="remove(item, index)">
						<zx-icon v-if="showDelete" name="close" :color="removeBtnColor" size="26rpx" ></zx-icon>
					</view>
				</template>
			</view>
		</view>

		<!-- 裁剪图片 -->
		<zx-popup :show="showCropper" mode="right" :overlay="true" :overlayOpacity="1" :closeOnClickOverlay="true" bgColor="transparent" :closeable="true">
			<view class="zx-img-crop" style="background-color: #999999;">
				<view class="zx-cropper-wrapper" :style="{ height: getCropperHeight + 'rpx', width: getCropperWidth + 'rpx' }">
					<canvas
						canvas-id="bgCropper"
						id="bgCropper"
						class="zx-cropper-bg"
						:disable-scroll="true"
						@touchstart="touchStart"
						@touchmove="touchMove"
						@touchend="touchEnd"
						:style="{ width: getCropperWidth + 'rpx', height: getCropperHeight + 'rpx' }"
					></canvas>
					<canvas canvas-id="prevCropper" id="prevCropper" class="zx-cropper-prev" :disable-scroll="true"></canvas>
				</view>
				<view style="display: flex;flex-direction: row;flex-wrap: nowrap;">
					<view class="zx-cropper-btn" @tap="closeCropper">取消</view>
					<view class="zx-cropper-btn" @tap="selectImg">+ 选择图片</view>
					<view class="zx-cropper-btn" @tap="getCropperImg">保存</view>
				</view>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
import * as cropper from '@tanzhenxing/zxui/libs/js/we-cropper.js';

// #ifdef H5
//import jweixin from '@tanzhenxing/zxui/libs/js/jweixin.js';
// #endif

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	showDelete: {
		type: Boolean,
		default: false
	},
	showSelect: {
		type: Boolean,
		default: true
	},
	isWechat: {
		type: Boolean,
		default: false
	},
	isCropper: {
		type: Boolean,
		default: false
	},
	borderRadius: {
		type: String,
		default: '10rpx'
	},
	bgColor: {
		type: String,
		default: '#f4f5f7'
	},
	showProgress: {
		type: Boolean,
		default: true
	},
	progressSize: { type: Number, default: 4 },
	progressColor: { type: String, default: '#0ba308' },
	progressBGColor: { type: String, default: '#F8F8F8' },
	removeBtnColor: { type: String, default: '#ffffff' },
	// 接受的文件类型, 可选值为all media image file video
	accept: {
		type: String,
		default: 'image'
	},
	// 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
	sourceType: {
		type: [String, Array],
		default: function() {
			return ['album', 'camera'];
		}
	},
	// 当accept为video时生效，是否压缩视频，默认为true
	compressed: {
		type: Boolean,
		default: true
	},
	// 当accept为video时生效，可选值为back或front
	camera: {
		type: String,
		default: 'back'
	},
	// 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
	maxDuration: {
		type: Number,
		default: 300
	},
	// 上传区域的图标，只能内置图标
	uploadIcon: {
		type: String,
		default: 'plus'
	},
	// 上传区域的图标的颜色，默认
	uploadIconColor: {
		type: String,
		default: '#666666'
	},
	// 上传区域的提示文字
	uploadText: {
		type: String,
		default: '选择图片'
	},
	// 是否开启文件读取前事件
	useBeforeRead: {
		type: Boolean,
		default: false
	},
	// 读取后的处理函数
	afterRead: {
		type: Function,
		default: null
	},
	// 读取前的处理函数
	beforeRead: {
		type: Function,
		default: null
	},
	afterUpload: {
		type: Function,
		default: null
	},
	// 是否显示组件自带的图片预览功能
	previewFullImage: {
		type: Boolean,
		default: true
	},
	selectCount: {
		type: Number,
		default: 9
	},
	// 最大上传数量
	maxCount: {
		type: [String, Number],
		default: 1
	},
	// 是否启用
	disabled: {
		type: Boolean,
		default: false
	},
	// 预览上传的图片时的裁剪模式，和image组件mode属性一致
	imageMode: {
		type: String,
		default: 'aspectFill'
	},
	// 标识符，可以在回调函数的第二项参数中获取
	name: {
		type: String,
		default: 'file'
	},
	// 所选的图片的尺寸, 可选值为original compressed
	sizeType: {
		type: Array,
		default: function() {
			return ['original', 'compressed'];
		}
	},
	// 是否开启图片多选，部分安卓机型不支持
	multiple: {
		type: Boolean,
		default: false
	},
	// 是否展示删除按钮
	deletable: {
		type: Boolean,
		default: true
	},
	// 文件大小限制，单位为byte
	maxSize: {
		type: [String, Number],
		default: 102400000000
	},
	// 显示已上传的文件列表
	fileList: {
		type: Array,
		default: function() {
			return [];
		}
	},
	sort: {
		type: String,
		default: 'desc'
	},
	showUploadButton: {
		type: Boolean,
		default: true
	},
	// 内部预览图片区域和选择图片按钮的区域宽度
	width: {
		type: [String, Number],
		default: '156rpx'
	},
	// 内部预览图片区域和选择图片按钮的区域高度
	height: {
		type: [String, Number],
		default: '156rpx'
	},
	cropperWidth: {
		type: [String, Number],
		default: 500
	},
	cropperHeight: {
		type: [String, Number],
		default: 500
	},
	// 是否在上传完成后展示预览图
	previewImage: {
		type: Boolean,
		default: true
	}
});

const videoShow = ref(false);

const topHeight = ref(40);
const footerHeight = ref(30);
// 获取屏幕高度
const videoHeight = ref(0);
videoHeight.value = uni.getSystemInfoSync.windowHeight - topHeight.value - footerHeight.value;

const showCropper = ref(false);
const WeCropper = ref(null);
const temImg = ref(null);
const imgLists = ref(null);

// 选择文件数量
const getSelectCount = () => {
	let count = props.selectCount;
	if (props.multiple) {
		count = 9;
	}
	if (props.maxCount < 9) {
		count = props.maxCount;
	}
	if (props.isCropper) {
		count = 1;
	}
	return count;
};
const getCropperWidth = () => {
	return 750;
};
const getCropperHeight = () => {
	// 获取屏幕信息规划剪裁组件宽度和高度
	let sysinfo = uni.getSystemInfoSync();
	let windowHeight = sysinfo.windowHeight;
	let windowWidth = sysinfo.windowWidth;
	let rpx = 750 / windowWidth;
	return windowHeight * rpx - 100;
};
// 剪裁设置
const getCropperSets = () => {
	let cropperSets = {
		width: getCropperWidth(),
		height: getCropperHeight(),
		id: 'bgCropper',
		targetId: 'prevCropper',
		scale: 4, // 最大缩放倍数
		zoom: 8, // 缩放系数
		cut: {
			x: 0, // 裁剪框x轴起点
			y: 0, // 裁剪框y轴期起点
			width: 300, // 裁剪框宽度
			height: 300 // 裁剪框高度
		}
	};
	let sysinfo = uni.getSystemInfoSync();
	cropperSets.pixelRatio = sysinfo.pixelRatio;
	cropperSets.cut.width = props.cropperWidth * (sysinfo.windowWidth / 750);
	cropperSets.cut.height = props.cropperHeight * (sysinfo.windowWidth / 750);
	cropperSets.cut.x = (getCropperWidth() * (sysinfo.windowWidth / 750) - cropperSets.cut.width) / 2;
	cropperSets.cut.y = (getCropperHeight() * (sysinfo.windowWidth / 750) - cropperSets.cut.height) / 2;
	return cropperSets;
};

const openVideo = e => {
	videoShow.value = true;
};
const closeVideo = e => {
	videoShow.value = false;
};
const showImgs = e => {
	var currentImg = e.currentTarget.dataset.imgurl;
	var imgs = [];
	for (let i = 0; i < props.fileList.length; i++) {
		imgs.push(props.fileList[i].url);
	}
	uni.previewImage({ urls: imgs, current: currentImg });
};
const retry = () => {};
const remove = (item, index) => {
	proxy.$emit('delete', index);
	props.fileList.splice(index, 1);
};
// 选择文件
const chooseFile = async () => {
	// 裁剪图片
	if (props.isCropper) {
		let select_img = await chooseImage();
		console.log(JSON.stringify(select_img));
		return;
	}

	let device = uni.getDeviceInfo().deviceType;
	let file_arr = [];
	switch (props.accept) {
		case 'image':
			if (props.isWechat && device === 'phone') {
				file_arr = await wxChooseImage();
				// 获取文件base64
				let count = file_arr.length;
				let number = 0;
				let status = false;
				let intervalID = setInterval(() => {
					if (number === 0) {
						uni.showLoading({
							title: '文件压缩中'
						});
					}
					if (number < count && status === false) {
						status = true;
						wxBlob2File(file_arr[number].path).then(imgData => {
							file_arr[number].file = imgData.file;
							file_arr[number].url = imgData.base64;
							status = false;
							number++;
						});
					}
					// 文件压缩完成
					if (number >= count) {
						clearTimeout(intervalID);
						uploadFile(file_arr);
						uni.hideLoading();
						uni.showToast({
							title: '文件压缩成功'
						});
					}
				}, 500);
			} else {
				file_arr = await chooseImage(props.selectCount);
				uploadFile(file_arr);
			}
			break;
		case 'video':
			file_arr = await chooseVideo();
			let duration = file_arr[0].duration;
			if (duration > props.maxDuration) {
				uni.showToast({
					title: '视频时长:' + props.maxDuration + '秒，无法上传',
					icon: 'none',
					duration: 5000
				});
				return;
			}
			uploadFile(file_arr);
			break;
	}
	proxy.$emit('afterRead', props.fileList);
};
// 选择图片
const chooseImage = async (count = 1) => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			sizeType: props.sizeType,
			sourceType: props.sourceType,
			success: res => {
				let selectImgArr = [];
				res.tempFilePaths.forEach((item, index) => {
					selectImgArr.push({ path: item, thumb: '', progress: 0, progressShow: true, finished: false, file: res.tempFiles[index], url: item });
				});
				resolve(selectImgArr);
			},
			fail: res => {
				uni.showToast({
					title: '选择文件出错'
				});
				reject(res);
			}
		});
	});
};
// 微信选择图片
const wxChooseImage = () => {
	uni.showLoading({
		title: '微信加载中'
	});
	setTimeout(() => {
		uni.hideLoading();
	}, 3000);
	return new Promise((resolve, reject) => {
		// 初始化jssdk配置
		proxy.$util.setJsApiConfig().then(signData => {
			// 选择图片
			jweixin.ready(() => {
				jweixin.chooseImage({
					count: getSelectCount,
					sizeType: props.sizeType,
					sourceType: props.sourceType,
					success: res => {
						uni.hideLoading();

						let selectImgArr = [];
						res.localIds.forEach((item, index) => {
							selectImgArr.push({ path: item, progress: 0, progressShow: true, finished: false, url: '' });
						});
						resolve(selectImgArr);
					},
					fail: res => {
						uni.hideLoading();

						uni.showToast({
							title: '微信暂不支持'
						});
					},
					complete: res => {
						//uni.hideLoading();
					}
				});
			});
		});
	});
};
// 选择视频
const chooseVideo = async () => {
	return new Promise((resolve, reject) => {
		uni.chooseVideo({
			sourceType: props.sourceType,
			success: res => {
				let selectImgArr = [];
				selectImgArr.push({
					path: res.tempFilePath,
					duration: res.duration,
					width: res.width,
					height: res.height,
					size: res.size,
					name: res.name,
					progress: 0,
					progressShow: true,
					finished: false,
					file: res.tempFile,
					url: res.tempFilePath
				});
				resolve(selectImgArr);
			}
		});
	});
};
// 微信图片blob url 转 文件对象
const wxBlob2File = async blob_url => {
	return new Promise((resolve, reject) => {
		jweixin.ready(() => {
			jweixin.getLocalImgData({
				localId: blob_url, // 图片的本地网址
				success: res => {
					let localData = res.localData;
					//手机端getlocalImgData方法获得的是base64格式不是正常的base64格式，安卓/ios都要进行相应转换
					if (localData.indexOf('data:image') !== 0) {
						// 判断是否有这样的头部
						localData = 'data:image/jpeg;base64,' + localData;
					}
					localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg');
					let time_arr = Date.now();
					let day_str = time_arr[0] + '-' + time_arr[1] + '-' + time_arr[2];
					let fileKey = props.accept + '/' + getFileKey();
					let new_file = proxy.$util.dataURLtoFile(localData, fileKey);
					resolve({ file: new_file, base64: localData });
				},
				fail: res => {
					uni.showToast({
						title: '读取文件base64失败' + JSON.stringify(res),
						icon: 'none',
						duration: 10000
					});
					reject(res);
				}
			});
		});
	});
};
// 获取七牛token
const getQiNiuToken = async (is_temp = 1) => {
	let res = await proxy.$util.http({
		path: '/qiniutemp', 
		method: 'get', 
		data: { is_temp: is_temp}
	});
	if (res.code !== 0) {
		return false;
	}
	return res.data.token;
};
// 批量上传文件
const uploadFile = async file_arr => {
	file_arr.forEach((item, index) => {
		props.fileList.push(item);
	});
	uni.showLoading({
		title: '文件上传中'
	});
	setTimeout(() => {
		uni.hideLoading();
	}, 3000);
	// 批量上传文件
	let count = props.fileList.length;
	let number = 0;
	let upload_status = false;
	let intervalID = setInterval(() => {
		// 正在上传文件中
		if (number < count && upload_status === false) {
			upload_status = true;
			if (props.fileList[number].finished) {
				number++;
				upload_status = false;
			} else {
				uploadFileToQiniu(number, props.fileList[number].file, props.accept + '/').then(res => {
					props.fileList[number].finished = true;
					props.fileList[number].key = res.key;
					props.fileList[number].progress = 100;
					if (props.accept === 'video') {
						props.fileList[number].url = 'https://wufutest.wufzx-app.com/' + res.key;
					}
					number++;
					upload_status = false;
				});
			}
		}
		// 文件全部上传完毕 unshift
		proxy.$emit('afterUpload', props.fileList);
		if (number >= count) {
			uni.hideLoading();
			clearTimeout(intervalID);
		}
	}, 500);
};
const getFileKey = () => {
	return proxy.$util.timeFormat(Date.now()) + '__' + proxy.$util.getNonceStr();
};
// 上传文件到七牛云
const uploadFileToQiniu = async (index, file, file_path = 'img/') => {
	
	let token = await getQiNiuToken();
	let file_ext = 'jpg'
	if(file.path){
		let file_ext_arr = file.path.split('.');
		file_ext = file_ext_arr[file_ext_arr.length - 1];
	}
	
	let fileKey = file_path + getFileKey() + '.' + file_ext;
	
	// #ifdef MP
	console.log('uploadFileToQiniu:' ,fileKey, JSON.stringify(file));
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: 'https://upload-z2.qiniup.com',
			filePath: file.path,
			name: 'file',
			formData: {
				key: fileKey,
				token: token
			},
			success: (res) => {
				resolve(res.data);
			},
			fail: (res)=>{
				console.log('fail:' + JSON.stringify(res));
				uni.showToast({
					title: '文件上传失败',
					duration: 2000,
					icon:'none'
				});
				resolve(res);
			}
		});
	});
	// #endif
	
	// #ifdef H5
	return new Promise((resolve, reject) => {
		const config = {
			useCdnDomain: true,
			region: qiniu.region.z2
		};
		const putExtra = {};
		const observer = {
			next: res => {
				console.log('next:' + JSON.stringify(res));
				/* if (res.total.percent !== undefined) {
					props.fileList[index].progress = res.total.percent.toFixed(0);
				} */
			},
			error:(err)=> {
				uni.showToast({
					title: '上传失败，请重试',
					icon: 'none'
				});
				console.log('error:' + JSON.stringify(err));
			},
			complete: res => {
				console.log('complete:' + JSON.stringify(res));
				resolve(res);
			}
		};
		const observable = qiniu.upload(file, fileKey, token, putExtra, config);
		const subscription = observable.subscribe(observer); // 上传开始
	});
	// #endif
	
};
// 打开裁剪界面
const openCropper = temFile => {
	uni.showLoading({
		title: '加载中'
	});
	WeCropper.value = new cropper(getCropperSets());

	setTimeout(() => {
		showCropper.value = true;
		WeCropper.value.pushOrign(temFile);
		uni.hideLoading();
	}, 500);
};
// 关闭裁剪界面
const closeCropper = () => {
	showCropper.value = false;
};

const touchStart = e => {
	WeCropper.value.touchStart(e);
};
const touchMove = e => {
	WeCropper.value.touchMove(e);
};
const touchEnd = e => {
	WeCropper.value.touchEnd(e);
};
// 获取裁剪图片
const getCropperImg = () => {
	if (temImg.value === '') {
		uni.showToast({
			title: '请选择图片',
			icon: 'none'
		});
		return;
	}
	uni.showLoading({ mask: true, title: '正在保存' });
	setTimeout(() => {
		uni.hideLoading();
	}, 2000);

	WeCropper.value.getCropperImage(tempFilePath => {
		if (tempFilePath) {
			let fileKey = props.accept + '/' + getFileKey() + '.jpg';
			let new_file = proxy.$util.dataURLtoFile(tempFilePath, fileKey);
			let file_arr = [{ path: temImg.value, progress: 0, progressShow: true, finished: false, url: tempFilePath, file: new_file }];
			// 上传文件
			uploadFile(file_arr);
			closeCropper();
		} else {
			uni.showToast({
				title: '保存图片失败',
				icon: 'none'
			});
		}
	});
	proxy.$emit('afterRead', props.fileList);
};
</script>

<style scoped>
.flex-row {
	display: flex;
	flex-direction: row;
}
.flex-column {
	display: flex;
	flex-direction: column;
}
.flex-center {
	align-items: center;
	justify-content: center;
}
.hoverClass {
	background-color: #949494;
}
.zx-add-list-btn-text {
	font-size: 26rpx;
	line-height: 50rpx;
	text-align: center;
}
.zx-add-list-btn-icon {
	font-size: 80rpx;
	height: 80rpx;
	line-height: 80rpx;
}
.zx-add-list-items {
	overflow: hidden;
	margin: 9rpx;
	background-color: #ffffff;
	font-size: 0;
	position: relative;
}
.zx-add-list-remove {
	width: 60rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 44rpx;
	position: absolute;
	z-index: 5;
	right: 0;
	top: 0;
}
.zx-add-list-img {
	background-color: #ffffff;
}
.zx-upload-progress {
	position: absolute;
	z-index: 2;
	left: 0;
	bottom: 0rpx;
	width: 100%;
	padding: 0 0rpx;
}
.zx-add-list-reup {
	position: absolute;
	z-index: 3;
	left: 0;
	top: 0rpx;
	background-color: rgba(0, 0, 0, 0.3);
}
.zx-add-list-reup-icon {
	text-align: center;
	font-size: 68rpx;
	line-height: 100rpx;
}
.zx-add-list-reup-text {
	text-align: center;
	font-size: 20rpx;
	line-height: 30rpx;
}
.zx-img-crop {
	width: 750rpx;
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDkvMjIvMjBpulvaAAAAQ0lEQVRIie3VsQ0AIAwDQZth2H8eljET0JgGiXf/OilNLGmqXJLVtqMNbwcMDAwMDHyck/SxXb/U/04NDAwMDPw+vAGUagde2qkMXgAAAABJRU5ErkJggg==');
	height: 100%;
	position: fixed;
	z-index: 90;
	left: 0;
	top: 0;
}
/* #ifdef H5 */
.zx-img-crop {
	top: 0rpx;
}
/* #endif */
.zx-cropper-wrapper {
	overflow: hidden;
}
.zx-cropper-bg {
}
.zx-cropper-prev {
}
.zx-cropper-btn {
	width: 50%;
	text-align: center;
	line-height: 50px;
	font-size: 28rpx;
	color: #ffffff;
}
</style>

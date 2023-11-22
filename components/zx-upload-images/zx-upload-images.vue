<template>
	<view class="zx-upload-images">
		<block v-for="(item, index) in imgLists" :key="'upload-images-' + index">
			<view class="zx-add-list-items" :style="{ borderRadius: borderRadius }">
				<image :src="item.url" :data-imgurl="item.url" :style="{ borderRadius: borderRadius }" class="zx-add-list-img" :mode="imgMode" @tap="showImgs"></image>
				<!-- 进度条 -->
				<view class="zx-upload-progress">
					<progress :percent="item.progress" :stroke-width="progressSize" :activeColor="progressColor" :backgroundColor="progressBGColor" />
				</view>
				<!-- 上传失败 -->
				<view v-if="item.error" class="zx-add-list-reup flex-column-center" :data-index="index" @tap.stop="retry">
					<text class="zx-add-list-reup-icon zx-icons icon-retry zx-color-white">&#xe635;</text>
					<text class="zx-add-list-reup-text zx-color-white">失败重试</text>
				</view>
				<!-- 删除 -->
				<view class="zx-add-list-remove" :style="{ color: removeBtnColor }" :id="'zx-items-img-' + index" @tap="removeImg">
					<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							d="M512 0c282.510222 0 512 229.489778 512 512s-229.489778 512-512 512-512-229.489778-512-512 229.489778-512 512-512zM334.392889 754.232889l177.493333-177.493333 177.834667 177.834666a45.852444 45.852444 0 0 0 65.080889-64.739555l-178.005334-177.948445 177.891556-177.834666c17.180444-19.797333 16.156444-47.104-0.910222-64.113778a45.966222 45.966222 0 0 0-62.577778-2.161778l-179.313778 179.2-177.550222-177.493333a45.852444 45.852444 0 0 0-64.910222 64.853333l177.607111 177.493333-177.550222 177.550223a45.852444 45.852444 0 1 0 64.853333 64.853333z"
						></path>
					</svg>
				</view>
			</view>
		</block>
		<view v-if="imgLists.length < maxFileNumber" class="zx-add-list-items flex-column-center zx-bg-gray zx-dark-bg-level-6" :style="{ borderRadius: borderRadius }" @tap="addImg">
			<text class="zx-add-list-btn-icon zx-block-text zx-color-gray">+</text>
			<text class="zx-add-list-btn-text zx-block-text zx-primary-text">{{ btnName }}</text>
		</view>
	</view>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, watch } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	maxFileNumber: {
		type: Number,
		default: 9
	},
	btnName: {
		type: String,
		default: '添加照片'
	},
	items: {
		type: Array,
		default: () => {
			return [];
		}
	},
	removeBtnColor: {
		type: String,
		default: 'rgba(0, 0, 0, 0.8)'
	},
	sourceType: {
		type: Array,
		default: () => {
			return ['album', 'camera'];
		}
	},
	borderRadius: {
		type: String,
		default: '10rpx'
	},
	uploadServerUrl: {
		type: String,
		default: ''
	},
	progressSize: {
		type: Number,
		default: 2
	},
	progressColor: {
		type: String,
		default: '#27BD81'
	},
	progressBGColor: {
		type: String,
		default: '#F8F8F8'
	},
	fileName: {
		type: String,
		default: 'img'
	},
	formData: {
		type: Object,
		default: () => {
			return {};
		}
	},
	imgMode: {
		type: String,
		default: 'aspectFill'
	},
	header: {
		type: Object,
		default: () => {
			return {};
		}
	},
	save2uniCloud: {
		type: Boolean,
		default: false
	},
	maxFileSize: {
		type: Number,
		default: 5
	}
});

const imgLists = ref([]);
const updatting = ref(false);

onMounted(() => {
	initImgs();
});

watch(
	() => props.items,
	() => {
		initImgs();
	}
);
// 初始化图片列表
const initImgs = () => {
	let imgs = [];
	for (let i = 0; i < props.items.length; i++) {
		imgs.push({ url: props.items[i], progress: 100 });
	}
	imgLists.value = imgs;
};
// 添加图片
const addImg = () => {
	let num = props.maxFileNumber - imgLists.value.length;
	if (num < 1) {
		return false;
	}

	// #ifdef MP-WEIXIN
	uni.chooseMedia({
		count: num,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		mediaType: ['image'],
		success: (res) => {
			if (imgLists.value.length >= props.maxFileNumber) {
				return;
			}
			for (let i = 0; i < res.tempFiles.length; i++) {
				if (res.tempFiles[i].size > props.maxFileSize * (1024 * 1024)) {
					uni.showToast({
						title: '图片尺寸过大，已忽略',
						icon: 'none'
					});
				} else {
					if (imgLists.value.length >= props.maxFileNumber) {
						break;
					}
					imgLists.value.push({ url: res.tempFiles[i].tempFilePath, progress: 0 });
				}
			}
			proxy.$emit('change', imgLists.value);
		},
		complete: () => {},
		fail: (e) => {
			console.log(e);
		}
	});
	// #endif

	// #ifndef MP-WEIXIN
	uni.chooseImage({
		count: num,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			if (imgLists.value.length >= props.maxFileNumber) {
				return;
			}
			for (let i = 0; i < res.tempFilePaths.length; i++) {
				if (res.tempFiles[i].size > props.maxFileSize * (1024 * 1024)) {
					uni.showToast({
						title: '图片尺寸过大，已忽略',
						icon: 'none'
					});
				} else {
					if (imgLists.value.length >= props.maxFileNumber) {
						break;
					}
					imgLists.value.push({ url: res.tempFilePaths[i], progress: 0 });
				}
			}
			proxy.$emit('change', imgLists.value);
		},
		complete: () => {},
		fail: (e) => {
			console.log(e);
		}
	});
	// #endif
};
// 删除图片
const removeImg = (e:any) => {
	let index = e.currentTarget.id.replace('zx-items-img-', '');
	let removeImg = imgLists.value.splice(index, 1);
	proxy.$emit('removeImg', removeImg[0]);
	proxy.$emit('change', imgLists.value);
};
// 显示图片列表
const showImgs = (e:any) => {
	let currentImg = e.currentTarget.dataset.imgurl;
	let imgs = [];
	for (let i = 0; i < imgLists.value.length; i++) {
		imgs.push(imgLists.value[i].url);
	}
	uni.previewImage({ urls: imgs, current: currentImg });
};
const setItems = (items:any) => {
	imgLists.value = [];
	for (let i = 0; i < items.length; i++) {
		imgLists.value.push({ url: items[i], progress: 100 });
	}
	proxy.$emit('change', imgLists.value);
};
// 清空图片
const clearAllImgs = () => {
	imgLists.value = [];
};
// 重新上传
const retry = (e:any) => {
	let index = e.currentTarget.dataset.index;
	upload(index);
};
// 图片上传
const upload = (index:number) => {
	if (updatting.value) {
		return;
	}
	updatting.value = true;
	if (!index) {
		index = 0;
	}
	uni.showLoading({ title: '图片上传中', mask: true });
	if (props.save2uniCloud) {
		upload2cloud(index);
	} else {
		uploadBase(index);
	}
};
// 普通上传
const uploadBase = (index:number) => {
	// 全部上传完成
	if (index > imgLists.value.length - 1) {
		uni.hideLoading();
		updatting.value = false;
		proxy.$emit('uploaded', imgLists.value);
		return;
	}
	// 验证后端
	if (props.uploadServerUrl == '') {
		uni.showToast({ title: '请设置上传服务器地址', icon: 'none' });
		return;
	}
	// 检查是否是默认值
	if (imgLists.value[index].progress >= 1) {
		uploadBase(index + 1);
		return;
	}
	imgLists.value[index].error = false;
	// 创建上传对象
	const task = uni.uploadFile({
		url: props.uploadServerUrl,
		filePath: imgLists.value[index].url,
		name: props.fileName,
		formData: props.formData,
		header: props.header,
		success: (uploadRes:any) => {
			try {
				uploadRes = JSON.parse(uploadRes.data);
				if (uploadRes.status != 'ok') {
					uni.showToast({ title: '上传失败 : ' + uploadRes.data, icon: 'none' });
					error(index);
				} else {
					//上传图片成功
					imgLists.value[index].progress = 100;
					imgLists.value[index].url = uploadRes.data;
					imgLists.value[index].result = uploadRes;
					uploadBase(index + 1);
				}
			} catch (e) {
				error(index);
			}
		},
		fail: () => {
			uni.showToast({ title: '上传失败，请点击图片重试', icon: 'none' });
			error(index);
		}
	});
	task.onProgressUpdate((res) => {
		if (res.progress > 0) {
			imgLists.value[index].progress = res.progress;
			imgLists.value.splice(index, 1, imgLists.value[index]);
		}
	});
};
// 上传错误
const error = (index:number) => {
	uni.hideLoading();
	updatting.value = false;
	setTimeout(() => {
		imgLists.value[index].progress = 0;
		imgLists.value[index].error = true;
		imgLists.value.splice(index, 1, imgLists.value[index]);
		proxy.$emit('uploaderror');
	}, 500);
};
// 上传到 uniCloud
const upload2cloud = (index:number) => {
	// 全部上传完成
	if (index > imgLists.value.length - 1) {
		uni.hideLoading();
		updatting.value = false;
		proxy.$emit('uploaded', imgLists.value);
		return;
	}
	// 检查是否是默认值
	if (imgLists.value[index].progress >= 1) {
		upload2cloud(index + 1);
		return;
	}
	imgLists.value[index].error = false;
	// #ifndef MP
	// 创建上传对象
	uniCloud.uploadFile({
		filePath: imgLists.value[index].url,
		cloudPath: uuid(16) + '.png',
		onUploadProgress: (progressEvent) => {
			var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			imgLists.value[index].progress = percentCompleted;
			imgLists.value.splice(index, 1, imgLists.value[index]);
		},
		success: (uploadRes) => {
			//上传图片成功
			imgLists.value[index].progress = 100;
			imgLists.value[index].url = uploadRes.fileID;
			imgLists.value[index].result = uploadRes;
			imgLists.value.splice(index, 1, imgLists.value[index]);
			upload2cloud(index + 1);
		},
		fail: () => {
			uni.showToast({ title: '上传失败', icon: 'none' });
			error(index);
		}
	});
	// #endif
};
// 生成uuid
const uuid = (len:number) => {
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	let uuid = [];
	let i:number;
	if (len) {
		for (i = 0; i < len; i++) {
			uuid[i] = chars[0 | (Math.random() * chars.length)];
		}
	} else {
		let r:number;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16);
				uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('');
};

defineExpose({setItems,clearAllImgs})
</script>

<style scoped>
.zx-upload-images {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.flex-column-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.zx-primary-text {
	color: rgba(55, 55, 55, 1);
}
.zx-dark-bg-level-6 {
	background: rgba(116, 116, 116, 1) !important;
}
.zx-color-gray {
	color: rgba(69, 90, 100, 0.6) !important;
}
.zx-bg-gray {
	background-color: #f8f8f8 !important;
}
.zx-block-text,
.zx-block {
	display: block;
}
.zx-add-list-btn-text {
	font-size: 26rpx;
	line-height: 36rpx;
	text-align: center;
}
.zx-add-list-btn-icon {
	font-size: 80rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin-bottom: 20rpx;
}
.zx-add-list-items {
	width: 210rpx;
	height: 210rpx;
	overflow: hidden;
	margin: 10rpx;
	font-size: 0;
	position: relative;
}
.zx-add-list-remove {
	width: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 40rpx;
	position: absolute;
	z-index: 5;
	right: 0;
	top: 0;
}
.zx-add-list-img {
	width: 210rpx;
	height: 210rpx;
}
.zx-upload-progress {
	position: absolute;
	z-index: 2;
	left: 0;
	bottom: 10rpx;
	width: 180rpx;
	padding: 0 16rpx;
}
.zx-add-list-reup {
	position: absolute;
	z-index: 3;
	left: 0;
	top: 0rpx;
	width: 210rpx;
	height: 210rpx;
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
</style>

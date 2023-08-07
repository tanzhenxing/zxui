<template>
	<view class="zx-qrcode">
		<canvas :canvas-id="canvasId" :id="canvasId" :style="{width:size+'rpx', height:size+'rpx'}" @longpress="saveQrcode"></canvas>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue';
import QRCode from './qrcode.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
	canvasId: {
		type: String,
		default: 'qrcodeId'
	},
	size: {
		type: Number,
		default: 150
	},
	text: {
		type: String,
		default: 'https://zxui.org/'
	},
	bgColor: {
		type: String,
		default: '#FFFFFF'
	},
	color: {
		type: String,
		default: '#000000'
	}
});

const canvasObj = ref(null);


onMounted(() => {
	canvasObj.value = new QRCode(props.canvasId, {
		text: props.text,
		width: props.size,
		height: props.size,
		colorDark: props.color,
		colorLight: props.bgColor
	});

	uni.canvasToTempFilePath({
		x: 0,
		y: 0,
		width: props.size,
		height: props.size,
		destWidth: props.size,
		destHeight: props.size,
		canvasId: props.canvasId,
		success: (res) => {
			proxy.$emit('getImg', res.tempFilePath);
		}
	});
});

const saveQrcode = () => {
	uni.canvasToTempFilePath({
		x: 0,
		y: 0,
		width: uni.upx2px(props.size),
		height: uni.upx2px(props.size),
		destWidth: uni.upx2px(props.size),
		destHeight: uni.upx2px(props.size),
		canvasId: props.canvasId,
		success: (res) => {
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				fail: (e) => {
					console.log(e);
				},
				success: () => {
					uni.showToast({
						title: '图片已经保存到您的相册~'
					});
				}
			});
		}
	});
};

defineExpose({ saveQrcode });
</script>

<style>
.zx-qrcode {
	position: absolute;
	left: 2000rpx;
}
</style>

<template>
	<view class="zx-barcode">
		<canvas :canvas-id="canvasId" :id="canvasId" :style="{ width: width + 'rpx', height: height + 'rpx' }" @longpress="saveQrcode"></canvas>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue';
import barcode from './barcode.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
	canvasId: {
		type: String,
		default: 'barcodeId'
	},
	width: {
		type: Number,
		default: 690
	},
	height: {
		type: Number,
		default: 180
	},
	text: {
		type: String,
		default: '1221339122586765388'
	}
});

onMounted(() => {
	barcode.code128(uni.createCanvasContext(props.canvasId), props.text, uni.upx2px(props.width), uni.upx2px(props.height));

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
.zx-barcode {
	position: absolute;
	left: 2000rpx;
}
</style>

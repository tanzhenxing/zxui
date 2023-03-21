<template>
	<view style="position: absolute;left: 2000rpx;">
		<canvas :canvas-id="canvasId" :id="canvasId" :style="{width:width+'rpx', height:height+'rpx'}" @longpress="saveQrcode"></canvas>
	</view>
</template>

<script>
import barcode from './barcode.js';

export default {
	name: 'zx-barcode',
	data() {
		return {
			// 条形码绘制对象
			barcode: null	
		};
	},
	created() {
		uni.showLoading({
			mask: true,
			title: 'loading ...'
		});
		setTimeout(() => {
			barcode.code128(uni.createCanvasContext(this.canvasId), this.content, uni.upx2px(this.width), uni.upx2px(this.height));
			uni.hideLoading();
			
			uni.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: uni.upx2px(this.width),
				height: uni.upx2px(this.height),
				destWidth: this.width,
				destHeight: this.height,
				canvasId: this.canvasId,
				success: res => {
					this.$emit('getImg',res.tempFilePath)
				}
			});
		}, 1000);
	},
	props: {
		canvasId: {
			type: String,
			default: 'canvasId'
		},
		width: {
			type: Number,
			default: 690
		},
		height: {
			type: Number,
			default: 180
		},
		content: {
			type: String,
			default: '1221339122586765388'
		}
	},
	methods: {
		saveQrcode: function() {
			uni.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: uni.upx2px(this.width),
				height: uni.upx2px(this.height),
				destWidth: this.width,
				destHeight: this.height,
				canvasId: this.canvasId,
				success: res => {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						fail: function(e) {
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
		}
	}
};
</script>

<style></style>

<template>
	<view style="position: absolute;left: 2000rpx;">
		<canvas :canvas-id="qrcodeId" :id="qrcodeId" @longpress="saveQrcode"></canvas>
	</view>
</template>

<script>
import QRCode from './qrcode.js';
	
export default {
	name: 'zx-qrcode',
	data() {
		return {
			// 二维码绘制对象
			qrcode: null
		};
	},
	created() {
		uni.showLoading({
			mask: true,
			title: 'loading ...'
		});
		setTimeout(() => {
			this.qrcode = new QRCode(this.qrcodeId, {
				text: this.url,
				width: this.size,
				height: this.size,
				colorDark: this.color,
				colorLight: this.bgColor
			});
			uni.hideLoading();
			
			uni.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: this.size,
				height: this.size,
				destWidth: this.size,
				destHeight: this.size,
				canvasId: this.qrcodeId,
				success: res => {
					this.$emit('getImg', res.tempFilePath);
				}
			});
			
		}, 1000);
	},
	props: {
		qrcodeId: {
			type: String,
			default: 'qrcodeId'
		},
		size: {
			type: Number,
			default: 150
		},
		url: {
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
	},
	methods: {
		saveQrcode() {
			uni.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: uni.upx2px(this.size),
				height: uni.upx2px(this.size),
				destWidth: uni.upx2px(this.size),
				destHeight: uni.upx2px(this.size),
				canvasId: this.qrcodeId,
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

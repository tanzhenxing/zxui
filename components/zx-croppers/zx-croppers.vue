<template>
	<view class="gui-img-crop">
		<view
			class="gui-cropper-wrapper"
			:style="{
				height: height + 'px',
				width: width + 'px'
			}"
		>
			<canvas
				canvas-id="bgCropper"
				id="bgCropper"
				class="gui-cropper-bg"
				:disable-scroll="true"
				@touchstart="touchStart"
				@touchmove="touchMove"
				@touchend="touchEnd"
				:style="{
					width: width + 'px',
					height: height + 'px'
				}"
			></canvas>
			<canvas canvas-id="prevCropper" id="prevCropper" class="gui-cropper-prev" :disable-scroll="true"></canvas>
		</view>
		<!-- #ifndef APP -->
		<cover-view style="width:750rpx; z-index:99;" class="gui-flex gui-row gui-nowrap gui-space-between gui-bg-black gui-fixed-lb">
			<cover-view class="gui-cropper-btn" @tap="selectImg">+ 选择图片</cover-view>
			<cover-view class="gui-cropper-btn" @tap="saveImg">保存头像</cover-view>
		</cover-view>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<!-- <view style="width:750rpx; z-index:99;" class="gui-flex gui-row gui-nowrap gui-space-between gui-bg-black gui-fixed-lb">
			<view class="gui-cropper-btn" @tap="selectImg">+ 选择图片</view>
			<view class="gui-cropper-btn" @tap="saveImg">保存头像</view>
		</view> -->
		<!-- #endif -->
	</view>
</template>

<script>
import WeCropper from '@tanzhenxing/zxui/libs/js/we-cropper.js';

export default {
	name: 'zx-croppers',
	data() {
		return {
			// WeCropper 对象
			WeCropper: null,
			// 核心宽度系统会重新计算
			width: 300,
			// 核心高度系统会重新计算
			height: 500,
			// 剪裁设置对象
			cropperSets: {
				height: 500,
				width: 300,
				id: 'bgCropper',
				targetId: 'prevCropper',
				scale: 2.5, // 最大缩放倍数
				zoom: 8, // 缩放系数
				cut: {
					x: 0, // 裁剪框x轴起点
					y: 0, // 裁剪框y轴期起点
					width: 200, // 裁剪框宽度
					height: 200 // 裁剪框高度
				}
			},
			tmpFace: null // 用于判断用户是否选择过图片
		};
	},
	created() {
		// 获取屏幕信息规划剪裁组件宽度和高度
		const sysinfo = uni.getSystemInfoSync();
		this.width = sysinfo.safeArea.width;
		this.height = sysinfo.safeArea.height - 50;
		// #ifdef H5
		this.height = this.height - 44;
		// #endif
		this.cropperSets.width = this.width;
		this.cropperSets.height = this.height;
		this.cropperSets.pixelRatio = sysinfo.pixelRatio;
		this.cropperSets.cut.x = (this.width - this.cropperSets.cut.width) / 2;
		this.cropperSets.cut.y = (this.height - this.cropperSets.cut.height) / 2;
		this.WeCropper = new WeCropper(this.cropperSets);
	},
	methods: {
		selectImg: function() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: res => {
					this.WeCropper.pushOrign(res.tempFilePaths[0]);
					this.tmpFace = res.tempFilePaths[0];
				}
			});
		},
		touchStart(e) {
			this.WeCropper.touchStart(e);
		},
		touchMove(e) {
			this.WeCropper.touchMove(e);
		},
		touchEnd(e) {
			this.WeCropper.touchEnd(e);
		},
		saveImg: function() {
			if (this.tmpFace == null) {
				uni.showToast({
					title: '请选择图片',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({ mask: true, title: '' });
			this.WeCropper.getCropperImage(tempFilePath => {
				if (tempFilePath) {
					console.log(tempFilePath);
					// 01. 此处 h5 端生成 base64 形式的图片数据, 其他端生成一个临时文件地址
					// 02. 可以连接 api 完成图片的上传工作
					// 03. 上传完成后关闭当页面，返回账户中心更新最新的头像地址即可
					// 此处演示了 图片预览
					uni.previewImage({ urls: [tempFilePath] });
				} else {
					console.log('获取图片地址失败，请稍后重试');
				}
				uni.hideLoading();
			});
		}
	}
};
</script>

<style></style>

<template>
	<view class="zx-modal__container" :class="[show ? 'zx-modal-show' : '']" :style="{zIndex:zIndex}" @touchmove.stop.prevent>
		<view
			class="zx-modal-box"
			:style="{ width: width, padding: padding, borderRadius: radius, backgroundColor: backgroundColor,zIndex:zIndex+1 }"
			:class="[fadeIn || show ? 'zx-modal-normal' : 'zx-modal-scale', show ? 'zx-modal-show' : '']"
		>
			<view v-if="!custom">
				<view class="zx-modal-title" v-if="title">{{ title }}</view>
				<view class="zx-modal-content" :class="[title ? '' : 'zx-mtop']" :style="{ color: color, fontSize: size + 'rpx' }">{{ content }}</view>
				<view class="zx-modalBtn-box" :class="[button.length != 2 ? 'zx-flex-column' : '']">
					<block v-for="(item, index) in button" :key="index">
						<button
							class="zx-modal-btn"
							:class="[
								'zx-' + (item.type || 'primary') + (item.plain ? '-outline' : ''),
								button.length != 2 ? 'zx-btn-width' : '',
								button.length > 2 ? 'zx-mbtm' : '',
								shape == 'circle' ? 'zx-circle-btn' : ''
							]"
							:hover-class="'zx-' + (item.plain ? 'outline' : item.type || 'primary') + '-hover'"
							:data-index="index"
							@tap="handleClick"
						>
							{{ item.text || '确定' }}
						</button>
					</block>
				</view>
			</view>
			<view v-else><slot></slot></view>
		</view>
		<view class="zx-modal-mask" :class="[show ? 'zx-mask-show' : '']" :style="{zIndex:maskZIndex}" @tap="handleClickCancel"></view>
	</view>
</template>

<script>
export default {
	name: 'zx-modal2',
	emits: ['click','cancel'],
	props: {
		//是否显示
		show: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '84%'
		},
		backgroundColor: {
			type: String,
			default: '#fff'
		},
		padding: {
			type: String,
			default: '40rpx 64rpx'
		},
		radius: {
			type: String,
			default: '24rpx'
		},
		//标题
		title: {
			type: String,
			default: ''
		},
		//内容
		content: {
			type: String,
			default: ''
		},
		//内容字体颜色
		color: {
			type: String,
			default: '#999'
		},
		//内容字体大小 rpx
		size: {
			type: Number,
			default: 28
		},
		//形状 circle, square
		shape: {
			type: String,
			default: 'square'
		},
		button: {
			type: Array,
			default: function() {
				return [
					{
						text: '取消',
						type: 'red',
						plain: true //是否空心
					},
					{
						text: '确定',
						type: 'red',
						plain: false
					}
				];
			}
		},
		//点击遮罩 是否可关闭
		maskClosable: {
			type: Boolean,
			default: true
		},
		//淡入效果，自定义弹框插入input输入框时传true
		fadeIn: {
			type: Boolean,
			default: false
		},
		//自定义弹窗内容
		custom: {
			type: Boolean,
			default: false
		},
		//容器z-index
		zIndex:{
			type: Number,
			default: 9997
		},
		//mask z-index
		maskZIndex:{
			type: Number,
			default: 9990
		}
	},
	data() {
		return {};
	},
	methods: {
		handleClick(e) {
			if (!this.show) return;
			const dataset = e.currentTarget.dataset;
			this.$emit('click', {
				index: Number(dataset.index)
			});
		},
		handleClickCancel() {
			if (!this.maskClosable) return;
			this.$emit('cancel');
		}
	}
};
</script>

<style scoped>
.zx-modal__container {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	visibility: hidden;
}
.zx-modal-box {
	position: relative;
	opacity: 0;
	visibility: hidden;
	box-sizing: border-box;
	transition: all 0.3s ease-in-out;
}

.zx-modal-scale {
	transform: scale(0);
}

.zx-modal-normal {
	transform: scale(1);
}

.zx-modal-show {
	opacity: 1;
	visibility: visible;
}

.zx-modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out;
	opacity: 0;
	visibility: hidden;
}

.zx-mask-show {
	visibility: visible;
	opacity: 1;
}

.zx-modal-title {
	text-align: center;
	font-size: 34rpx;
	color: #333;
	padding-top: 20rpx;
	font-weight: bold;
}

.zx-modal-content {
	text-align: center;
	color: #999;
	font-size: 28rpx;
	padding-top: 20rpx;
	padding-bottom: 60rpx;
}

.zx-mtop {
	margin-top: 30rpx;
}

.zx-mbtm {
	margin-bottom: 30rpx;
}

.zx-modalBtn-box {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.zx-flex-column {
	flex-direction: column;
}

.zx-modal-btn {
	width: 46%;
	height: 68rpx;
	line-height: 68rpx;
	position: relative;
	border-radius: 10rpx;
	font-size: 26rpx;
	overflow: visible;
	margin-left: 0;
	margin-right: 0;
	box-sizing: border-box;
}

/* #ifndef MP-QQ */
.zx-modal-btn::after {
	content: ' ';
	position: absolute;
	width: 200%;
	height: 200%;
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	transform: scale(0.5, 0.5) translateZ(0);
	left: 0;
	top: 0;
	border-radius: 20rpx;
	z-index: 2;
}
/* #endif */

.zx-btn-width {
	width: 80% !important;
}

.zx-primary {
	background: #5677fc;
	color: #fff;
}

.zx-primary-hover {
	background: #4a67d6;
	color: #e5e5e5;
}

.zx-primary-outline {
	color: #5677fc;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #5677fc;
	/* #endif */
}

/* #ifndef MP-QQ */
.zx-primary-outline::after {
	border: 1px solid #5677fc;
}

/* #endif */
.zx-danger {
	background: #ed3f14;
	color: #fff;
}

.zx-danger-hover {
	background: #d53912;
	color: #e5e5e5;
}

.zx-danger-outline {
	color: #ed3f14;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #ed3f14;
	/* #endif */
}

/* #ifndef MP-QQ */
.zx-danger-outline::after {
	border: 1px solid #ed3f14;
}
/* #endif */

.zx-red {
	background: #e41f19;
	color: #fff;
}

.zx-red-hover {
	background: #c51a15;
	color: #e5e5e5;
}

.zx-red-outline {
	color: #e41f19;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #e41f19;
	/* #endif */
}

/* #ifndef MP-QQ */
.zx-red-outline::after {
	border: 1px solid #e41f19;
}
/* #endif */

.zx-warning {
	background: #ff7900;
	color: #fff;
}

.zx-warning-hover {
	background: #e56d00;
	color: #e5e5e5;
}

.zx-warning-outline {
	color: #ff7900;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #ff7900;
	/* #endif */
}

/* #ifndef MP-QQ */
.zx-warning-outline::after {
	border: 1px solid #ff7900;
}

/* #endif */
.zx-green {
	background: #19be6b;
	color: #fff;
}

.zx-green-hover {
	background: #16ab60;
	color: #e5e5e5;
}

.zx-green-outline {
	color: #19be6b;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #19be6b;
	/* #endif */
}

/* #ifndef MP-QQ */
.zx-green-outline::after {
	border: 1px solid #19be6b;
}
/* #endif */

.zx-white {
	background: #fff;
	color: #333;
}

.zx-white-hover {
	background: #f7f7f9;
	color: #666;
}

.zx-white-outline {
	color: #333;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #333;
	/* #endif */
}

/* #ifndef MP-QQ */
.zx-white-outline::after {
	border: 1px solid #333;
}
/* #endif */

.zx-gray {
	background: #ededed;
	color: #999;
}

.zx-gray-hover {
	background: #d5d5d5;
	color: #898989;
}

.zx-gray-outline {
	color: #999;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #999;
	/* #endif */
}

/* #ifndef MP-QQ */
.zx-gray-outline::after {
	border: 1px solid #999;
}
/* #endif */

.zx-outline-hover {
	opacity: 0.6;
}

.zx-circle-btn {
	border-radius: 40rpx !important;
}

.zx-circle-btn::after {
	border-radius: 80rpx !important;
}
</style>

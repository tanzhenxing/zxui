<template>
	<view @touchmove.stop.prevent>
		<view class="zx-actionsheet" :class="{ 'zx-actionsheet-show': show, 'zx-actionsheet-radius': radius }">
			<view v-if="tips" class="zx-actionsheet-tips" :style="{ fontSize: size + 'rpx', color: color }">{{ tips }}</view>
			<view :class="[isCancel ? 'zx-operate-box' : '']">
				<block v-for="(item, index) in items" :key="index">
					<view
						class="zx-actionsheet-btn zx-actionsheet-divider"
						:class="{ 'zx-btn-last': !isCancel && index == items.length - 1 }"
						hover-class="zx-actionsheet-hover"
						:hover-stay-time="150"
						:data-index="index"
						:style="{ color: item.color || '#2B2B2B' }"
						@tap.stop="handleClickItem"
					>
						{{ item.text }}
					</view>
				</block>
			</view>
			<view v-if="isCancel" class="zx-actionsheet-btn zx-actionsheet-cancel" hover-class="zx-actionsheet-hover" :hover-stay-time="150" @tap="handleClickCancel">取消</view>
		</view>
		<view class="zx-actionsheet-mask" :class="{ 'zx-mask-show': show }" @tap="handleClickMask"></view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	//显示操作菜单
	show: {
		type: Boolean,
		default: false
	},
	//点击遮罩 是否可关闭
	maskClosable: {
		type: Boolean,
		default: true
	},
	//菜单按钮数组
	items: {
		type: Array,
		default: () => {
			return [
				{
					text: '确定',
					color: '#2B2B2B'
				}
			];
		}
	},
	//提示文字
	tips: {
		type: String,
		default: ''
	},
	//提示文字颜色
	color: {
		type: String,
		default: '#808080'
	},
	//提示文字大小 rpx
	size: {
		type: Number,
		default: 26
	},
	//是否需要圆角
	radius: {
		type: Boolean,
		default: true
	},
	//是否需要取消按钮
	isCancel: {
		type: Boolean,
		default: true
	}
});

const handleClickMask = () => {
	if (!props.maskClosable) return;
	handleClickCancel();
};
const handleClickItem = (e) => {
	if (!props.show) return;
	const index = Number(e.currentTarget.dataset.index);
	proxy.$emit('onClick', {
		index: index,
		...props.items[index]
	});
};
const handleClickCancel = () => {
	proxy.$emit('onCancel');
};
</script>

<style lang="scss" scoped>
.zx-actionsheet {
	width: 100%;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	visibility: hidden;
	transform: translate3d(0, 100%, 0);
	transform-origin: center;
	transition: all 0.25s ease-in-out;
	background-color: #f7f7f7;
	min-height: 100rpx;
}

.zx-actionsheet-radius {
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	overflow: hidden;
}

.zx-actionsheet-show {
	transform: translate3d(0, 0, 0);
	visibility: visible;
}

.zx-actionsheet-tips {
	width: 100%;
	padding: 40rpx 60rpx;
	box-sizing: border-box;
	text-align: center;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.zx-operate-box {
	padding-bottom: 12rpx;
}

.zx-actionsheet-btn {
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 34rpx;
	position: relative;
}

.zx-btn-last {
	padding-bottom: env(safe-area-inset-bottom);
}

.zx-actionsheet-divider::before {
	content: '';
	width: 100%;
	border-top: 1rpx solid #e7e7e7;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}

.zx-actionsheet-cancel {
	color: #1a1a1a;
	padding-bottom: env(safe-area-inset-bottom);
}

.zx-actionsheet-hover {
	background-color: #f7f7f9;
}

.zx-actionsheet-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 9996;
	transition: all 0.3s ease-in-out;
	opacity: 0;
	visibility: hidden;
}

.zx-mask-show {
	opacity: 1;
	visibility: visible;
}
</style>

<template>
	<zx-transition :show="show" mode="fade" :customStyle="backTopStyle">
		<view class="zx-back-top flex-center" :style="[contentStyle]" @click="backToTop">
			<slot>
				<view>
					<zx-icon :name="icon" :customStyle="iconStyle" :color="iconColor" :size="iconSize"></zx-icon>
				</view>
				<view v-if="text" style="margin-top: -8rpx">
					<zx-text :text="text" :color="textColor" size="26rpx" lineHeight="30rpx"></zx-text>
				</view>
			</slot>
		</view>
	</zx-transition>
</template>

<script setup>
/**
 * backTop 返回顶部
 * @description 返回顶部按钮，方便快速返回顶部的场景。
 * @tutorial https://zxui.org/components/backTop
 * @property {String}			mode  		返回顶部的形状，circle-圆形，square-方形
 * @property {String} 			icon 		自定义图标
 * @property {String} 			text 		提示文字
 * @property {String | Number}  duration	返回顶部滚动时间 （默认 100）
 * @property {String | Number}  scrollTop	滚动距离 （默认 0 ）
 * @property {String | Number}  top  		距离顶部多少距离显示，单位px （默认 400 ）
 * @property {String | Number}  bottom  	返回顶部按钮到底部的距离，单位px （默认 100 ）
 * @property {String | Number}  right  		返回顶部按钮到右边的距离，单位px （默认 20 ）
 * @property {String | Number}  zIndex 		层级   （默认 9 ）
 * @property {Object<Object>}  	iconStyle 	图标的样式，对象形式
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @example <zx-back-top :scrollTop="scrollTop"></zx-back-top>
 */

// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif

import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 返回顶部的形状，circle-圆形，square-方形
	mode: {
		type: String,
		default: 'circle'
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	size: {
		type: Number,
		default: 90
	},
	// 自定义图标
	icon: {
		type: String,
		default: 'arrow-up'
	},
	iconColor: {
		type: String,
		default: '#666666'
	},
	iconSize: {
		type: String,
		default: '40rpx'
	},
	// 图标的样式，对象形式
	iconStyle: {
		type: Object,
		default: () => {
			return {};
		}
	},
	// 提示文字
	text: {
		type: String,
		default: 'TOP'
	},
	textColor: {
		type: String,
		default: '#666666'
	},
	// 返回顶部滚动时间
	duration: {
		type: [String, Number],
		default: 300
	},
	// 滚动距离
	scrollTop: {
		type: [String, Number],
		default: 0
	},
	// 距离顶部多少距离显示
	top: {
		type: [String, Number],
		default: 300
	},
	// 返回顶部按钮到底部的距离
	bottom: {
		type: [String, Number],
		default: '100rpx'
	},
	// 返回顶部按钮到右边的距离
	right: {
		type: [String, Number],
		default: '50rpx'
	},
	// 层级
	zIndex: {
		type: [String, Number],
		default: 9
	},
	customStyle: {
		type: Object,
		default: function () {
			return {};
		}
	}
});

const backTopStyle = computed(() => {
	// 动画组件样式
	const style = {
		bottom: props.bottom,
		right: props.right,
		width: props.size + 'rpx',
		height: props.size + 'rpx',
		position: 'fixed',
		zIndex: 10000
	};
	return style;
});
const show = computed(() => {
	return props.scrollTop > props.top;
});
const contentStyle = computed(() => {
	const style = {};
	let radius = 0;
	// 是否圆形
	if (props.mode === 'circle') {
		radius = '50%';
	} else {
		radius = '10rpx';
	}
	// 为了兼容安卓nvue，只能这么分开写
	style.borderTopLeftRadius = radius;
	style.borderTopRightRadius = radius;
	style.borderBottomLeftRadius = radius;
	style.borderBottomRightRadius = radius;
	style.backgroundColor = props.bgColor;
	return style;
});

const backToTop = () => {
	// #ifdef APP-NVUE
	dom.scrollToElement(proxy.$parent.$refs['zx-back-top'], {
		offset: 0
	});
	// #endif

	// #ifndef APP-NVUE
	uni.pageScrollTo({
		scrollTop: 0,
		duration: props.duration
	});
	// #endif
	proxy.$emit('click');
};
</script>

<style lang="scss" scoped>
.zx-back-top {
	flex: 1;
	height: 100%;
	box-shadow: 0px 0px 10px #bfbfbf;
}
.flex-center {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>

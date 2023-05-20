<template>
	<view v-if="show" class="zx-empty" :style="[emptyStyle]">
		<image v-if="isImage" :src="icon" mode="widthFix" :style="{ width: width, height: height }"></image>
		<zx-icon v-else :name="icon" :size="iconSize" :color="iconColor" :margin-top="marginTop"></zx-icon>
		<text class="text" :style="[textStyle]">{{ text ? text : '数据为空' }}</text>
		<view class="wrap" v-if="$slots.default || $slots.$default"><slot /></view>
	</view>
</template>

<script setup>
/**
 * empty 内容为空
 * @description 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景
 * @tutorial https://zxui.org/components/empty
 * @property {String}			icon		内置图标名称，或图片路径
 * @property {String}			text		提示文字
 * @property {String}			textColor	文字颜色
 * @property {String | Number}	textSize	文字大小
 * @property {String}			iconColor	图标的颜色
 * @property {String | Number}	iconSize	图标的大小
 * @property {String | Number}	width		图标宽度
 * @property {String | Number}	height		图标高度
 * @property {Boolean}			show		是否显示组件
 * @property {String | Number}	marginTop	组件距离上一个元素之间的距离
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @event {Function} click 点击组件时触发
 * @event {Function} close 点击关闭按钮时触发
 * @example <zx-empty text="无数据" icon="data"></zx-empty>
 */

import { ref, computed } from 'vue';

const props = defineProps({
	// 内置图标名称，或图片路径，建议绝对路径
	icon: {
		type: String,
		default: 'https://files.wufu-app.com/images/empty/data.png'
	},
	// 提示文字
	text: {
		type: String,
		default: ''
	},
	// 文字颜色
	textColor: {
		type: String,
		default: '#c0c4cc'
	},
	// 文字大小
	textSize: {
		type: String,
		default: '32rpx'
	},
	// 图标的颜色
	iconColor: {
		type: String,
		default: '#c0c4cc'
	},
	// 图标的大小
	iconSize: {
		type: String,
		default: '180rpx'
	},
	//  图标宽度，单位px
	width: {
		type: [String, Number],
		default: '320rpx'
	},
	// 图标高度，单位px
	height: {
		type: [String, Number],
		default: '320rpx'
	},
	// 是否显示组件
	show: {
		type: Boolean,
		default: true
	},
	// 组件距离上一个元素之间的距离，默认rpx单位
	marginTop: {
		type: String,
		default: '10rpx'
	}
});

// 组件样式
const emptyStyle = computed(() => {
	const style = {};
	style.marginTop = props.marginTop;
	return style;
});
// 文本样式
const textStyle = computed(() => {
	const style = {};
	style.color = props.textColor;
	style.fontSize = props.textSize;
	return style;
});
// 判断icon是否图片路径
const isImage = computed(() => {
	return props.icon.indexOf('/') >= 0;
});
</script>

<style lang="scss" scoped>
.zx-empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.text {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}
}
.zx-slot-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
}
</style>

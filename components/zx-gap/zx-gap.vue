<template>
	<view class="zx-gap" :style="[gapStyle, customStyle]"></view>
</template>

<script setup>
/**
 * gap 间隔槽
 * @description 用于内容块之间的用一个灰色块隔开的场景
 * @tutorial https://zxui.org/components/gap
 * @property {String}			bgColor			背景颜色
 * @property {String | Number}	height			分割槽高度
 * @property {String | Number}	marginTop		与前一个组件的距离
 * @property {String | Number}	marginBottom	与后一个组件的距离
 * @property {Object}			customStyle		定义需要用到的外部样式
 *
 * @example <zx-gap height="80" bg-color="#bbb"></zx-gap>
 */
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	// 背景颜色
	bgColor: {
		type: String,
		default: 'transparent'
	},
	// 分割槽高度
	height: {
		type: [String, Number],
		default: '30rpx'
	},
	// 与上一个组件的距离
	marginTop: {
		type: [String, Number],
		default: 0
	},
	// 与下一个组件的距离
	marginBottom: {
		type: [String, Number],
		default: 0
	},
	customStyle: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const gapStyle = computed(() => {
	return {
		backgroundColor: props.bgColor,
		height: props.height,
		marginTop: props.marginTop,
		marginBottom: props.marginBottom
	};
});
</script>

<style lang="scss" scoped></style>

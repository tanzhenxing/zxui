<template>
	<view class="zx-status-bar" :style="[getStyle]"><slot /></view>
</template>

<script setup>
/**
 * StatbusBar 状态栏占位
 * @description 本组件主要用于状态填充，比如在自定导航栏的时候，它会自动适配一个恰当的状态栏高度。
 * @tutorial https://zxui.org/components/statusBar
 * @property {String}			bgColor			背景色 (默认 'transparent' )
 * @property {Object}          	customStyle		自定义样式
 * @example <zx-status-bar></zx-status-bar>
 */
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	bgColor: {
		type: String,
		default: 'transparent'
	},
	customStyle: {
		type: Object,
		default: function() {
			return {};
		}
	}
});

const getStyle = computed(() => {
	const style = {};
	style.height = uni.getSystemInfoSync().statusBarHeight + 'px';
	style.backgroundColor = props.bgColor;
	return style;
});
</script>

<style lang="scss" scoped>
.zx-status-bar {
	/* #ifndef APP-NVUE */
	width: 100%;
	/* #endif */
}
</style>

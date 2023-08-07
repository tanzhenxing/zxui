<template>
	<view class="zx-status-bar" :class="{'zx-status-bar-fixed':isFixed}" :style="[getStyle,customStyle]">
		<slot></slot>
	</view>
</template>

<script setup>
/**
 * StatbusBar 状态栏占位
 * @description 本组件主要用于状态填充，比如在自定导航栏的时候，它会自动适配一个恰当的状态栏高度。
 * @tutorial https://zxui.org/components/statusBar
 * @property {String}			backgroundColor			背景色 (默认 'transparent' )
 * @property {Object}          	customStyle		自定义样式
 * @example <zx-status-bar></zx-status-bar>
 */
import { ref, getCurrentInstance, computed, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	//背景色
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	//是否固定在顶部
	isFixed: {
		type: Boolean,
		default: false
	},
	//z-index值，isFixed为true时生效
	zIndex: {
		type: Number,
		default: 998
	},
	customStyle: {
		type: Object,
		default: function () {
			return {};
		}
	}
});

const statusBarHeight = ref('0px');

onMounted(() => {
	statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight + 'px';
	proxy.$emit('init', {statusBarHeight: statusBarHeight.value});
});

const getStyle = computed(() => {
	const style = {};
	style.height = statusBarHeight.value;
	style.backgroundColor = props.backgroundColor;
	style.zIndex?props.zIndex:1
	return style;
});
</script>

<style lang="scss" scoped>
.zx-status-bar {
	flex: 1;
	/* #ifndef APP-NVUE */
	width: 100%;
	/* #endif */
	overflow: hidden;
}

.zx-status-bar-fixed {
	position: fixed;
	left: 0;
	top: 0;
}
</style>

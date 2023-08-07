<template>
	<zx-transition :show="show" custom-class="zx-overlay" :duration="duration" :custom-style="overlayStyle" @click="clickHandler">
		<slot />
	</zx-transition>
</template>

<script setup>
/**
 * overlay 遮罩
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @tutorial https://zxui.org/components/overlay
 * @property {Boolean}			show		是否显示遮罩（默认 false ）
 * @property {String | Number}	zIndex		zIndex 层级（默认 10070 ）
 * @property {String | Number}	duration	动画时长，单位毫秒（默认 300 ）
 * @property {String | Number}	opacity		不透明度值，当做rgba的第四个参数 （默认 0.5 ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event {Function} click 点击遮罩发送事件
 * @example <zx-overlay :show="show" @click="show = false"></zx-overlay>
 */
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 是否显示遮罩
	show: {
		type: Boolean,
		default: false
	},
	// 层级z-index
	zIndex: {
		type: [String, Number],
		default: 10070
	},
	// 遮罩的过渡时间，单位为ms
	duration: {
		type: [String, Number],
		default: 500
	},
	// 不透明度值，当做rgba的第四个参数
	opacity: {
		type: [String, Number],
		default: 0.5
	},
	customStyle: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const overlayStyle = computed(() => {
	const style = {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		zIndex: props.zIndex,
		bottom: 0,
		backgroundColor: `rgba(0, 0, 0, ${props.opacity})`
	};
	return style;
});
const clickHandler = () => {
	proxy.$emit('click');
};
</script>

<style lang="scss" scoped>
.zx-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}
</style>

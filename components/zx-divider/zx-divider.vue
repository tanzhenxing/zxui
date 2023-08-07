<template>
	<view class="zx-divider" :style="customStyle" @tap="click">
		<zx-line :color="lineColor" :customStyle="leftLineStyle" :hairline="hairline" :dashed="dashed"></zx-line>
		<text v-if="dot" class="zx-divider__dot">●</text>
		<text v-else-if="text" class="zx-divider__text" :style="[textStyle]">{{ text }}</text>
		<zx-line :color="lineColor" :customStyle="rightLineStyle" :hairline="hairline" :dashed="dashed"></zx-line>
	</view>
</template>

<script setup>
/**
 * divider 分割线
 * @description 区隔内容的分割线，一般用于页面底部"没有更多"的提示。
 * @tutorial https://zxui.org/components/divider.html
 * @property {Boolean}			dashed			是否虚线 （默认 false ）
 * @property {Boolean}			hairline		是否细线 （默认  true ）
 * @property {Boolean}			dot				是否以点替代文字，优先于text字段起作用 （默认 false ）
 * @property {String}			textPosition	内容文本的位置，left-左边，center-中间，right-右边 （默认 'center' ）
 * @property {String | Number}	text			文本内容
 * @property {String | Number}	textSize		文本大小 （默认 14）
 * @property {String}			textColor		文本颜色 （默认 '#909399' ）
 * @property {String}			lineColor		线条颜色 （默认 '#dcdfe6' ）
 * @property {Object}			customStyle		定义需要用到的外部样式
 *
 * @event {Function}	click	divider组件被点击时触发
 * @example <zx-divider :color="color">这里是分割线</zx-divider>
 */
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// 是否虚线
	dashed: {
		type: Boolean,
		default: false
	},
	// 是否细线
	hairline: {
		type: Boolean,
		default: true
	},
	// 是否以点替代文字，优先于text字段起作用
	dot: {
		type: Boolean,
		default: false
	},
	// 内容文本的位置，left-左边，center-中间，right-右边
	textPosition: {
		type: String,
		default: 'center'
	},
	// 文本内容
	text: {
		type: String,
		default: ''
	},
	// 文本大小
	textSize: {
		type: String,
		default: '28rpx'
	},
	// 文本颜色
	textColor: {
		type: String,
		default: '#909399'
	},
	// 线条颜色
	lineColor: {
		type: String,
		default: '#dcdfe6'
	},
	customStyle: {
		type: Object,
		default: ()=>{
			return {}
		}
	}
});

const textStyle = computed(() => {
	const style = {};
	style.fontSize = props.textSize;
	style.color = props.textColor;
	return style;
});
// 左边线条的的样式
const leftLineStyle = computed(() => {
	const style = {};
	// 如果是在左边，设置左边的宽度为固定值
	if (props.textPosition === 'left') {
		style.width = '80rpx';
	} else {
		style.flex = 1;
	}
	return style;
});
// 右边线条的的样式
const rightLineStyle = computed(() => {
	const style = {};
	// 如果是在右边，设置右边的宽度为固定值
	if (props.textPosition === 'right') {
		style.width = '80rpx';
	} else {
		style.flex = 1;
	}
	return style;
});

// divider组件被点击时触发
const click = () => {
	proxy.$emit('click');
};
</script>

<style lang="scss" scoped>
$zx-divider-margin: 15px 0 !default;
$zx-divider-text-margin: 0 15px !default;
$zx-divider-dot-font-size: 12px !default;
$zx-divider-dot-margin: 0 12px !default;
$zx-divider-dot-color: #c0c4cc !default;

.zx-divider {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: $zx-divider-margin;

	&__text {
		margin: $zx-divider-text-margin;
	}

	&__dot {
		font-size: $zx-divider-dot-font-size;
		margin: $zx-divider-dot-margin;
		color: $zx-divider-dot-color;
	}
}
</style>

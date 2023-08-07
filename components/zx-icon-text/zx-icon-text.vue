<template>
	<view :style="getStyle">
		<!-- 图标在左侧或者上方 -->
		<zx-icon
			v-if="position === 'left' || position === 'top'"
			:name="icon"
			:size="iconSize"
			:color="iconColor"
			:top="iconTop"
			:customStyle="[getIconStyle, iconStyle]"
		></zx-icon>
		<!-- 文字内容 -->
		<zx-text :text="text" :lines="lines" :size="textSize" :color="textColor" :lineHeight="lineHeight" :fontFamily="fontFamily"></zx-text>
		<!-- 图标在右侧 或 下方 -->
		<zx-icon v-if="position === 'right' || position === 'bottom'" :name="icon" :size="iconSize" :color="iconColor" :customStyle="[getIconStyle, iconStyle]"></zx-icon>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	icon: {
		type: String,
		default: ''
	},
	iconSize: {
		type: String,
		default: '32rpx'
	},
	iconColor: {
		type: String,
		default: '#3c9cff'
	},
	iconTop: {
		type: String,
		default: ''
	},
	iconStyle: {
		type: Object,
		default: () => {
			return {};
		}
	},
	// 图标位置 left、right、 top、 bottom
	position: {
		type: String,
		default: 'left'
	},
	text: {
		type: String,
		default: ''
	},
	textSize: {
		type: String,
		default: '30rpx'
	},
	textColor: {
		type: String,
		default: '#606266'
	},
	fontFamily: {
		type: String,
		default: ''
	},
	lineHeight: {
		type: String,
		default: '50rpx'
	},
	lines: {
		type: [String, Number],
		default: 1
	},
	space: {
		type: String,
		default: '5rpx'
	},
	center: {
		type: Boolean,
		default: false
	},
	bgColor: {
		type: String,
		default: ''
	}
});

const getIconStyle = computed(() => {
	let style = {};
	switch (props.position) {
		case 'left':
			style.height = props.iconSize;
			if (props.space !== '') {
				style.paddingRight = props.space;
			}
			break;
		case 'right':
			style.width = props.iconSize;
			if (props.space !== '') {
				style.paddingLeft = props.space;
			}
			break;
		case 'top':
			style.width = props.iconSize;
			if (props.space !== '') {
				style.paddingBottom = props.space;
			}
			break;
		case 'bottom':
			style.height = props.iconSize;
			if (props.space !== '') {
				style.paddingTop = props.space;
			}
			break;
	}
	return style;
});
const getStyle = () => {
	let style = { display: 'flex', alignItems: 'center' };
	if (props.center) {
		style.justifyContent = 'center';
	}
	if (props.bgColor !== '') {
		style.backgroundColor = props.bgColor;
	}
	switch (props.position) {
		case 'left':
		case 'right':
			style.flexDirection = 'row';
			break;
		case 'top':
		case 'bottom':
			style.flexDirection = 'column';
			break;
	}
	return style;
};
</script>

<style lang="scss" scoped>
.flex-row {
	display: flex;
	flex-direction: row;
}
.flex-column {
	display: flex;
	flex-direction: column;
}
</style>

<template>
	<view class="float-bar">
		<view class="bar-box" :style="{ backgroundColor: bgColor, zIndex: zIndex, opacity: opacity }">
			<view :style="{ paddingLeft: padding, paddingRight: padding }">
				<zx-text :text="text" :size="size" :color="color" :lineHeight="lineHeight" :lines="lines"></zx-text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	text: {
		type: String,
		default: ''
	},
	lineHeight: {
		type: String,
		default: '80rpx'
	},
	lines: {
		type: [String, Number],
		default: 1
	},
	size: {
		type: String,
		default: '30rpx'
	},
	bgColor: {
		type: String,
		default: '#000000'
	},
	color: {
		type: String,
		default: '#ffffff'
	},
	zIndex: {
		type: Number,
		default: 99
	},
	height: {
		type: String,
		default: '80rpx'
	},
	padding: {
		type: String,
		default: '30rpx'
	},
	opacity: {
		type: Number,
		default: 0.5
	}
});
</script>

<style lang="scss" scoped>
.float-bar {
	position: relative;
	width: 750rpx;
}
.bar-box {
	position: absolute;
	width: 100%;
}
</style>

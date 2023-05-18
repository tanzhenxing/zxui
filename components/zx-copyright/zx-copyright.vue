<template>
	<view :style="{ backgroundColor: bgColor, padding: padding }"><zx-text :text="text" :align="align" :color="color" :size="size" :lineHeight="lineHeight"></zx-text></view>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	text: {
		type: String,
		default: ''
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	lineHeight: {
		type: String,
		default: '50rpx'
	},
	size: {
		type: String,
		default: '28rpx'
	},
	color: {
		type: String,
		default: '#7D7D7D'
	},
	padding: {
		type: String,
		default: '30rpx'
	},
	align: {
		type: String,
		default: 'center'
	}
});
</script>

<style scoped></style>

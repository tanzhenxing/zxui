<template>
	<view v-if="show" class="zx-footer" :style="{ height: height, backgroundColor: backgroundColor }">
		<zx-line v-if="line" :color="lineColor"></zx-line>
		<view class="flex-center" :style="{ height: height }">
			<slot></slot>
		</view>
	</view>
	<view :style="{ height: height }"></view>
	<zx-safe-bottom></zx-safe-bottom>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	height: {
		type: String,
		default: '100rpx'
	},
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	line: {
		type: Boolean,
		default: true
	},
	lineColor: {
		type: String,
		default: '#ececec'
	}
});
</script>

<style lang="scss" scoped>
.zx-footer {
	position: fixed;
	z-index: 99;
	left: 0;
	bottom: 0;
	width: 750rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
.flex-center {
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 1;
}
</style>

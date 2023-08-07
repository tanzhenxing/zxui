<template>
	<view class="zx-timeaxis-item">
		<slot name="content"></slot>
		<view class="zx-timeaxis-node" :style="{ backgroundColor: backgroundColor }">
			<slot name="node"></slot>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	//节点背景色
	backgroundColor: {
		type: String,
		default: '#fafafa'
	}
});
</script>

<style lang="scss" scoped>
.zx-timeaxis-item {
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 25px;
}

.zx-timeaxis-node {
	position: absolute;
	top: 0;
	left: -20px;
	transform-origin: 0;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 99;
	background-color: #fafafa;
	font-size: 24rpx;
}
</style>

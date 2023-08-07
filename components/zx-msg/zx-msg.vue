<template>
	<view class="zx-msg__box">
		<view class="zx-msg__icon">
			<zx-icon :color="color" :name="type" :size="size"></zx-icon>
			<image class="thorui-msg__img" :style="{ width: width, height: height }" :src="src" mode="aspectFit" v-if="src" />
		</view>
		<view class="zx-msg__title" v-if="title">{{ title }}</view>
		<view class="zx-msg__desc" v-if="desc">{{ desc }}</view>
		<slot></slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: '#07c160'
	},
	//icon size
	size: {
		type: Number,
		default: 64
	},
	name: {
		//设置src 之后，type失效
		type: String,
		default: ''
	},
	width: {
		type: String,
		default: '180rpx'
	},
	height: {
		type: String,
		default: '180rpx'
	},
	desc: {
		type: String,
		default: ''
	}
});
</script>

<style lang="scss" scoped>
.zx-msg__box {
	width: 100%;
	padding-top: 100rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.zx-msg__icon {
	padding-bottom: 44rpx;
}
.zx-msg__title {
	font-weight: 700;
	font-size: 44rpx;
}

.zx-msg__desc,
.zx-msg__title {
	margin-bottom: 32rpx;
	color: #333;
	word-wrap: break-word;
	word-break: break-all;
}

.zx-msg__desc {
	font-size: 32rpx;
	text-align: center;
}
</style>

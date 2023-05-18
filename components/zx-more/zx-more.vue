<template>
	<view class="flex-center" @click="onClick">
		<zx-text :text="text" :color="color" :size="size"></zx-text>
		<zx-icon :name="iconName" :color="color" size="32rpx"></zx-icon>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	color: {
		type: String,
		default: '#555555'
	},
	text: {
		type: String,
		default: '更多'
	},
	size: {
		type: String,
		default: '28rpx'
	},
	link: {
		type: String,
		default: ''
	},
	iconName: {
		type: String,
		default: 'arrow-right-double'
	}
});

const onClick = () => {
	uni.navigateTo({
		url:props.link
	});
};
</script>

<style lang="scss" scoped>
.flex-center {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
</style>

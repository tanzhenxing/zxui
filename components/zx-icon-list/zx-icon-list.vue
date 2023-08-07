<template>
	<view class="zx-icon-list" :style="{ paddingTop: padding, paddingBottom: padding, backgroundColor: bgColor }">
		<template v-for="(item, index) in items" :key="index">
			<view :style="{ width: getWidth, paddingTop: padding, paddingBottom: padding }" @click="clickItem(item)">
				<zx-icon-text
					v-if="item.show"
					:icon="item.icon"
					:iconSize="iconSize"
					:text="item.title"
					position="top"
					line-height="45rpx"
					:center="false"
					space="0rpx"
					shape="circle"
				></zx-icon-text>
			</view>
		</template>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	items: {
		type: Array,
		default() {
			return [];
		}
	},
	column: {
		type: Number,
		default: 4
	},
	iconSize: {
		type: String,
		default: '80rpx'
	},
	padding: {
		type: String,
		default: '15rpx'
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	}
});

const getWidth = computed(() => {
	return 750 / this.column + 'rpx';
});

const clickItem = (item) => {
	uni.navigateTo({
		url: item.url
	});
};
</script>

<style lang="scss">
.zx-icon-list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: space-between;
}
.nav-box {
	flex-direction: row;
	background-color: #ffffff;
}

.nav-text {
	color: #333333;
	font-size: 28rpx;
	line-height: 50rpx;
}
</style>

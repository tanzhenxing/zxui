<template>
	<view>
		<zx-status-bar></zx-status-bar>
		<slot name="top"></slot>
		<view class="zx-header flex-row" :style="{height:height,padding:padding,backgroundColor:backgroundColor}">
			<view style="flex: 1;">
				<slot name="left">
					<view class="flex-row">
						<view v-if="showBack" @click="navigateBack()">
							<zx-icon :name="iconName" :color="iconColor" :size="iconSize"></zx-icon>
						</view>
						<view style="padding-left: 10rpx;">
							<zx-text :text="title" :lineHeight="titleHeight" :size="titleSize" :color="titleColor" lines="1"></zx-text>
						</view>
					</view>
				</slot>
			</view>
			<view class="flex-row" style="justify-content: flex-end;" :style="{width:rightWidth}">
				<slot name="right"></slot>
				<view v-if="showHomeLink" class="flex-row flex-center" @click="$util.navigate('/pages/index/index','switchTab')">
					<zx-icon name="home" :color="homeLinkColor" size="38rpx" align="center" lineHeight="40rpx"></zx-icon>
					<zx-text text="首页" :color="homeLinkColor" size="28rpx" lineHeight="40rpx"></zx-text>
				</view>
			</view>
			<!-- 小程序胶囊按钮占位 -->
			<view :style="{ width: spacingWidth + 'px',height:height }"></view>
		</view>
		<zx-line v-if="line" :color="lineColor"></zx-line>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	titleSize: {
		type: String,
		default: '32rpx'
	},
	titleColor: {
		type: String,
		default: '#333333'
	},
	titleHeight: {
		type: String,
		default: '40rpx'
	},
	height: {
		type: String,
		default: '60rpx'
	},
	padding: {
		type: String,
		default: '20rpx'
	},
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	iconName: {
		type: String,
		default: 'arrow-left'
	},
	iconColor: {
		type: String,
		default: '#333333'
	},
	iconSize: {
		type: String,
		default: '38rpx'
	},
	line: {
		type: Boolean,
		default: true
	},
	lineColor: {
		type: String,
		default: '#ececec'
	},
	rightWidth: {
		type: String,
		default: '120rpx'
	},
	homeLinkColor: {
		type: String,
		default: '#333333'
	},
	showHomeLink: {
		type: Boolean,
		default: true
	},
	showBack: {
		type: Boolean,
		default: true
	}
});

const spacingWidth = ref(0);
// #ifdef MP
let system = uni.getSystemInfoSync();
let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
spacingWidth.value = menuButtonInfo.width + (system.windowWidth - menuButtonInfo.right);
// #endif

const navigateBack = ()=>{
	uni.navigateBack({
		delta: 1
	});
}

</script>

<style lang="scss" scoped>
.zx-header {
	align-items: center;justify-content: space-between;
}
.flex-row {
	display: flex;flex-direction: row;
}
.flex-center {
	justify-content: center;align-items: center;
}
</style>

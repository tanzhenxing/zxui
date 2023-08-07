<template>
	<view>
		<zx-status-bar></zx-status-bar>
		<slot name="top"></slot>
		<view class="zx-header flex-row" :style="{height:height,padding:padding,backgroundColor:backgroundColor}">
			<view style="flex: 1;">
				<slot name="left">
					<view class="flex-row">
						<view v-if="showBack">
							<zx-icon :name="iconName" :color="iconColor" :size="iconSize" @onClick="goBack"></zx-icon>
						</view>
						<view style="padding-left: 10rpx;">
							<zx-text :text="title" :lineHeight="titleHeight" :size="titleSize" :color="titleColor" lines="1"></zx-text>
						</view>
					</view>
				</slot>
			</view>
			<view class="flex-row" style="justify-content: flex-end;" :style="{width:rightWidth}">
				<slot name="right"></slot>
				<view v-if="showHomeLink" class="flex-row flex-center" style="padding-right: 10rpx;" @click="goHome">
					<zx-icon name="home" :color="homeLinkColor" size="38rpx" align="center" lineHeight="40rpx"></zx-icon>
					<zx-text text="首页" :color="homeLinkColor" size="28rpx" lineHeight="40rpx"></zx-text>
				</view>
			</view>
			<!-- 小程序胶囊按钮占位 -->
			<view :style="{ width: spacingWidth + 'px',height:'30px' }"></view>
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
		default: '30px'
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
	},
	isBack: {
		type: Boolean,
		default: false
	},
	isHome: {
		type: Boolean,
		default: false
	}
});

const spacingWidth = ref(0);
// #ifdef MP
let system = uni.getSystemInfoSync();
let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
spacingWidth.value = menuButtonInfo.width + (system.windowWidth - menuButtonInfo.right);
// #endif

const goBack = ()=>{
	console.log(props.isBack)
	if(props.isBack){
		proxy.$emit('goBack');
		return;
	}
	
	console.log('goBack')
	uni.navigateBack({
		delta: 1
	});
}

const goHome = () => {
	if(props.isHome){
		proxy.$emit('goHome');
		return;
	}
	
	uni.switchTab({
		url: '/pages/index/index'
	})
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

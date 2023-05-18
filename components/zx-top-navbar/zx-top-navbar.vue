<template>
	<view v-if="show">
		<view class="flex-row flex-center" :style="{backgroundColor:bgColor,height: '50rpx',padding:'20rpx'}">
			<!-- #ifdef MP -->
			<view :style="{ width: space + 'rpx' }"></view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="flex-row">
				<view class="flex-row flex-center" @click="goBack">
					<zx-icon name="arrow-left" color="#333333" size="38rpx" align="center"></zx-icon>
					<zx-text :text="title" size="32rpx" :lines="lines"></zx-text>
				</view>
			</view>
			<!-- #endif -->
			<view style="flex: 1;"></view>
			<slot name="right">
			<view :style="{ width: rightWidth }">
				<view class="flex-row">
					<view class="flex-row flex-center" @click="goHome">
						<zx-icon name="home" color="#333333" size="40rpx" align="center"></zx-icon>
						<zx-text text="首页" size="28rpx" lineHeight="40rpx"></zx-text>
					</view>
				</view>
			</view>
			</slot>
		</view>
		<zx-line v-if="showLine" :color="lineColor"></zx-line>
	</view>
</template>

<script>
export default {
	name: 'zx-top-navbar',
	data() {
		return {};
	},
	props: {
		show: {
			type: Boolean,
			default: true
		},
		rightWidth: {
			type: String,
			default: '100rpx'
		},
		autoBack: {
			type: Boolean,
			default: true
		},
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		showLine: {
			type: Boolean,
			default: true
		},
		lineColor: {
			type: String,
			default: '#ececec'
		},
		title: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: '#333333'
		},
		size: {
			type: String,
			default: '34rpx'
		},
		bold: {
			type: Boolean,
			default: true
		},
		lines: {
			type: [Number, String],
			default: 1
		},
		align: {
			type: String,
			default: 'center'
		},
		space: {
			type: Number,
			default: 30
		}
	},
	methods: {
		goHome(){
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		goBack(){
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
	.flex-row {
		display: flex;flex-direction: row;
	}
	.flex-center {
		justify-content: center;align-items: center;
	}
</style>

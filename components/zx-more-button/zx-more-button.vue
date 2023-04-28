<template>
	<view class="button-box">
		<view class="more" @click="onClick">
			<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
				<view style="width: 70rpx;"></view>
				<view style="flex: 1;">
					<zx-text :text="text" size="28rpx" lines="1" color="#5B5B5B" lineHeight="80rpx" align="center"></zx-text>
				</view>
				<view style="width: 70rpx;">
					<zx-icon name="plus" size="40rpx" color="#9B9B9B"></zx-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'zx-more-button',
	data() {
		return {};
	},
	props: {
		text: {
			type: String,
			default: '查看更多...'
		},
		url: {
			type: String,
			default: ''
		}
	},
	methods: {
		onClick(){
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss">
.button-box {
	margin: 20rpx 10rpx;
	padding-top: 10rpx;
}
.more {
	border: 2rpx solid rgba(219, 219, 219, 100);
	border-radius: 60rpx;
	background-color: rgba(255, 255, 255, 100);
	color: rgba(91, 91, 91, 100);
	height: 80rpx;
}
</style>

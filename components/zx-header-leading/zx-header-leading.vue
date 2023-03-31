<template>
	<view>
		<view class="header">
			<view v-if="home" :style="{opacity: show ? 1 : 0}" style="width: 70rpx;">
				<zx-icon name="home" :size="size" :color="color" :bold="true" @tap="goHome"></zx-icon>
			</view>
			<view v-if="back" :style="{opacity: show ? 1 : 0}" style="width: 70rpx;">
				<zx-icon name="arrow-left" :size="size" :color="color" :bold="true" @tap="goBack"></zx-icon>
			</view>
			<view style="flex: 1;" @tap.stop.prevnet="gotoTop">
				<zx-text :text="title" :align="titleAlign" :color="titleColor" :size="titleSize" lines="1"></zx-text>
			</view>
			<view>
				<slot name="right"></slot>
			</view>
		</view>
		<zx-line v-if="isLine"></zx-line>
	</view>
</template>
<script>
export default {
	name: 'zx-header-leading',
	props: {
		back: {
			type: Boolean, 
			default: true 
		},
		home: {
			type: Boolean, 
			default: true
		},
		color: {
			type: String,
			default: '#333333'
		},
		size: {
			type: String,
			default: '45rpx'
		},
		isLine: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		titleAlign: {
			type: String,
			default: 'center'
		},
		titleColor: {
			type: String,
			default: '#333333'
		},
		titleSize: {
			type: String,
			default: '32rpx'
		}
	},
	data() {
		return {
			show: true,
			headerTapNumber: 0
		};
	},
	mounted: function() {
		// #ifdef MP-ALIPAY
		this.show = false;
		// #endif
		// #ifdef MP-BAIDU
		this.show = false;
		// #endif
		// #ifdef MP-JD
		this.show = false;
		// #endif
	},
	methods: {
		goBack: function() {
			uni.navigateBack({ delta: 1 });
			this.$emit('goBack');
		},
		goHome: function() {
			this.$emit('goHome');
		},
		gotoTop: function() {
			this.headerTapNumber++;
			if (this.headerTapNumber >= 2) {
				this.headerTapNumber = 0;
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			} else {
				setTimeout(() => {
					this.headerTapNumber = 0;
				}, 1000);
			}
		},
	},
	emits: ['goBack', 'goHome']
};
</script>
<style scoped>
.header {
	display: flex;flex-direction: row;padding: 20rpx;
}
</style>

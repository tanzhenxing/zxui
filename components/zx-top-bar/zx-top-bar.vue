<template>
	<view v-if="show">
		<zx-notice-bar :scrollable="true" :height="90" :speed="60" bgColor="#ececec" color="#333333" :content="content" :is-left="true" :isRight="true">
			<template v-slot:left>
				<view class="top-icon">
					<zx-icon :name="icon" size="35rpx" color="#333333"></zx-icon>
				</view>
			</template>
			<template v-slot:right>
				<view class="right-button">
					<button :size="buttonSize" :style="{borderRadius: buttonRadius?'500rpx':'10rpx',backgroundColor: buttonBgColor,color: buttonTextColor}" @click="open">{{buttonText}}</button>
				</view>
			</template>
		</zx-notice-bar>
		<!-- 二维码弹窗 -->
		<zx-popup :show="popupShow" mode="center" bgColor="transparent" @close="close">
			<view class="pop-box">
				<zx-image v-if="qrCode" width="500rpx" height="500rpx" mode="aspectFill" :src="qrCode"></zx-image>
			</view>
			<view class="close">
				<zx-icon name="close-circle" size="60rpx" @click="close"></zx-icon>
			</view>
		</zx-popup>
	</view>
</template>

<script>
	export default {
		name:"zx-top-bar",
		data() {
			return {
				popupShow: false
			};
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			icon: {
				type: String,
				default: 'volume-fill'
			},
			content:{
				type: String,
				default: ''
			},
			buttonText: {
				type: String,
				default: '关注我们'
			},
			buttonBgColor: {
				type: String,
				default: '#ff0000'
			},
			buttonTextColor: {
				type: String,
				default: '#ffffff'
			},
			buttonRadius: {
				type: Boolean,
				default: true
			},
			buttonSize: {
				type: String,
				default: 'mini'
			},
			qrCode: {
				type: String,
				default: ''
			}
		},
		methods: {
			open(){
				this.popupShow = true;
			},
			close(){
				this.popupShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.top-icon {
	padding-left: 20rpx;padding-right: 10rpx;
}
.right-button {
	width: 200rpx;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.pop-box {
	width: 550rpx;padding: 30rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;background-color: #ffffff;border-radius: 20rpx;
}
.close {
	padding-top: 30rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;
}
</style>
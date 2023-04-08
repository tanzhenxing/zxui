<template>
	<view v-if="show">
		<zx-notice-bar :scrollable="true" :height="90" :speed="60" bgColor="#ececec" color="#333333" :content="content" :is-left="true" :isRight="true">
			<template v-slot:left>
				<view style="padding-left: 20rpx;padding-right: 10rpx;">
					<zx-icon name="volume-fill" size="40rpx" color="#333333"></zx-icon>
				</view>
			</template>
			<template v-slot:right>
				<view style="width: 200rpx;display: flex;flex-direction: row;justify-content: center;">
					<button :size="buttonSize" :style="{borderRadius: buttonRadius?'500rpx':'10rpx',backgroundColor: buttonBgColor,color: buttonTextColor}" @click="open">{{buttonText}}</button>
				</view>
			</template>
		</zx-notice-bar>
		<!-- 二维码弹窗 -->
		<zx-popup :show="popupShow" mode="center" @close="close">
			<view>
				<image v-if="qrCode" :src="qrCode"></image>
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
				console.log(this.qrCode)
				this.popupShow = true;
			},
			close(){
				this.popupShow = false;
			}
		}
	}
</script>

<style>

</style>
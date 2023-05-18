<template>
	<view v-if="show">
		<zx-notice-bar :scrollable="scrollable" :height="90" :speed="60" bgColor="#ececec" color="#333333" :content="content" :is-left="true" :isRight="true" :single="single">
			<template v-slot:left>
				<view class="top-icon"><zx-icon :name="icon" :size="iconSize" :color="iconColor"></zx-icon></view>
			</template>
			<template v-slot:right>
				<view class="right-button">
					<button :size="buttonSize" :style="{ borderRadius: buttonRadius ? '500rpx' : '10rpx', backgroundColor: buttonBgColor, color: buttonTextColor }" @click="open">
						{{ buttonText }}
					</button>
				</view>
			</template>
		</zx-notice-bar>
		<!-- 关注我们弹窗 -->
		<zx-popup-image :show="qrCodeShow" :src="qrCode" :closeOnClickOverlay="false" text="扫一扫, 加我为好友" padding="20rpx" margin="50rpx" @close="close"></zx-popup-image>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const qrCodeShow =ref(false);

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	single: {
		type: Boolean,
		default: false
	},
	scrollable: {
		type: Boolean,
		default: false
	},
	icon: {
		type: String,
		default: 'volume-fill'
	},
	iconSize: {
		type: String,
		default: '34rpx'
	},
	iconColor: {
		type: String,
		default: '#333333'
	},
	content: {
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
});

const open = () => {
	qrCodeShow.value = true;
};
const close = () => {
	qrCodeShow.value = false;
};
</script>

<style lang="scss" scoped>
.top-icon {
	padding-left: 20rpx;
	padding-right: 10rpx;
}
.right-button {
	width: 200rpx;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
</style>

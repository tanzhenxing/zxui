<template>
	<view>
		<view class="box">
			<view class="pendant">
				<zx-icon name="weixin-fill" :size="iconSize" :color="iconColor" @onClick="openQrcode"></zx-icon>
			</view>
			<zx-gap height="20rpx"></zx-gap>
			<view class="pendant">
				<zx-icon name="phone-fill" :size="iconSize" :color="iconColor" @onClick="openPhone"></zx-icon>
			</view>
		</view>
		<!-- 微信二维码 弹窗 -->
		<zx-popup :show="qrcodeShow" mode="center" round="30rpx" :closeable="true" :overlayOpacity="0.8" :closeOnClickOverlay="false" :zIndex="10074" @close="closeQrcode">
			<view style="text-align: center; margin-bottom: 50rpx; margin-top: 70rpx; width: 450rpx">
				<view v-if="qrcodeArr.length === 0">
					<zx-empty></zx-empty>
				</view>
				<view v-for="(item, index) in qrcodeArr" :key="index">
					<view style="font-size: 0">
						<image style="width: 250rpx" :src="item.qr_code" mode="widthFix"></image>
					</view>
					<view style="margin-left: 40rpx; margin-right: 40rpx">
						<zx-text :text="item.name + ' 的二维码'" lineHeight="60rpx" size="32rpx" align="center" lines="2"></zx-text>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view style="padding-top: 20rpx">
						<button type="warn" size="mini" style="border-radius: 50rpx" @click="shareImage(item.qr_code)">保存图片</button>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</zx-popup>
		<!-- 联系电话 弹窗 -->
		<zx-popup :show="phoneShow" mode="center" round="30rpx" :closeable="true" :overlayOpacity="0.8" :closeOnClickOverlay="false" :zIndex="10074" @close="closePhone">
			<view style="width: 560rpx; margin: 30rpx">
				<view style="text-align: center">
					<text>联系我们</text>
				</view>
				<view style="margin-top: 30rpx; margin-bottom: 30rpx">
					<zx-line></zx-line>
				</view>
				<view v-if="phoneArr.length === 0">
					<zx-empty></zx-empty>
				</view>
				<view v-for="(item, index) in phoneArr" :key="index" :data-index="index" @click="telCall(item.phone)">
					<text class="app-icons">&#xe678; {{ item.name }}: {{ item.phone }}</text>
					<view style="margin-top: 30rpx; margin-bottom: 30rpx">
						<zx-line></zx-line>
					</view>
				</view>
				<view style="height: 60rpx"></view>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	iconColor: {
		type: String,
		default: '#07c160'
	},
	iconSize: {
		type: String,
		default: '60rpx'
	},
	qrcodeArr: {
		type: Array,
		default() {
			return [];
		}
	},
	phoneArr: {
		type: Array,
		default() {
			return [];
		}
	}
});

const qrcodeShow = ref(false);
const phoneShow = ref(false);

const openQrcode = () => {
	qrcodeShow.value = true;
};
const closeQrcode = () => {
	qrcodeShow.value = false;
};
// 联系电话弹窗
const openPhone = () => {
	phoneShow.value = true;
};
// 关闭联系电话弹窗
const closePhone = () => {
	phoneShow.value = false;
};
//拨打电话
const telCall = (phone) => {
	uni.makePhoneCall({
		phoneNumber: phone
	});
};
const shareImage = (img) => {
	uni.downloadFile({
		url: img, 
		success: (res) => {
			if (res.statusCode === 200) {
				wx.showShareImageMenu({
				    path: res.tempFilePath
				})
			}
		}
	});
};
</script>

<style lang="scss" scoped>
.box {
	position: fixed;
	right: 10px;
	bottom: 100px;
	width: 50px;
	z-index: 100;
}
.pendant {
	width: 80rpx;
	height: 80rpx;
	border-radius: 80rpx;
	text-align: center;
	box-shadow: 0px 0px 10px #bfbfbf;
	background-color: #ffffff;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.pendant-bg {
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	padding-left: 12rpx;
	padding-right: 10rpx;
	border-radius: 50rpx;
}

.pendant-margin-top {
	margin-top: 20rpx;
}

.pendant-content {
	padding-bottom: 30rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
}

.icon-color {
	color: #07c160;
}

.popup-close {
	width: 100%;
	height: 150rpx;
	line-height: 150rpx;
	opacity: 0.7;
	text-align: center;
	font-size: 58rpx;
}
.zx-block-text,
.zx-block {
	display: block;
}
.zx-bg-white {
	background-color: #ffffff !important;
}
</style>

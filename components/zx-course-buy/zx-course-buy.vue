<template>
	<view v-if="show" class="zx-course-buy" :style="{backgroundColor: bgColor}">
		<zx-line></zx-line>
		<view class="footer-box">
			<view style="flex: 1;">
				<view style="font-size: 28rpx;color: #666666;">
					<text>共</text>
					<text class="red-text">{{ info.courses }}</text>
					<text>套</text>
					<text class="red-text">{{ info.videos }}</text>
					<text>节</text>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 28rpx;line-height: 40rpx;flex: 1;" v-if="showBuyPrice">
						<text>价格：</text>
						<text class="gui-color-red" style="font-size: 28rpx;">¥</text>
						<text class="gui-color-red" style="font-size: 30rpx;margin-left: 5rpx;">{{ (info.price * 0.01).toFixed(2) }}</text>
					</view>
					<view style="text-decoration:line-through;text-decoration-color: red;font-size: 28rpx;flex: 1;" v-if="showOriginPrice">
						<text>原价：</text>
						<text>¥</text>
						<text style="margin-left: 5rpx;">{{ (info.origin_price * 0.01).toFixed(2) }}</text>
					</view>
				</view>
			</view>
			<view style="width: 230rpx;">
				<button :disabled="disabled" class="buy-botton" @click="buy">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	isRes: {
		type: Boolean,
		default: false
	},
	secType: {
		type: Number,
		default: 2
	},
	module: {
		type: Number,
		default: 0
	},
	info: {
		type: Object,
		default() {
			return { id: 0, appid: '', price: 0, origin_price: 0, courses: 0, videos: 0 };
		}
	},
	showBuyPrice: {
		type: Boolean,
		default: true
	},
	showOriginPrice: {
		type: Boolean,
		default: true
	},
	showBottom: {
		type: String,
		default: 'buy'
	},
	courseId:{
		type:Number,
		default: 0
	},
	courseModule:{
		type:Number,
		default: 2
	}
});

const disabled = ref(false);

// 购买课程
const buy = () => {
	// #ifdef MP-WEIXIN
	getPayInfo();
	// #endif
	//this.ext.goWechatPay(this.secType, this.info.id, this.info.appid);
};
// 获取支付信息
const getPayInfo = async ()=>{
	let isMiniProgram = 0;
	// #ifdef MP-WEIXIN
	isMiniProgram = 1;
	// #endif
	let wechat_info = await proxy.$util.getWxCode();
	if(wechat_info.errMsg!=='login:ok'){
		return
	}
	
	let res = await proxy.$util.http({ 
		path: '/order/book', 
		method: 'post', 
		data: { id:props.courseId,module:props.courseModule,code:wechat_info.code,is_mini:isMiniProgram }
	});
	if (res.code !== 0) {
		return false;
	}
	disabled.value = false;
	
	// 调起微信支付
	wx.requestPayment({
		timeStamp: res.data.timestamp,
		nonceStr: res.data.nonceStr,
		package: res.data.package,
		signType: res.data.signType,
		paySign: res.data.paySign,
		success: (res)=> {
			console.log(JSON.stringify(res))
		},
		fail: (res) => {
		
		}
	});
}
</script>

<style lang="scss" scoped>
.footer-box {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx 30rpx;
}
.red-text {
	color: #ff0000;
	margin-left: 5rpx;
	margin-right: 5rpx;
}
.comment-box {
	width: 700rpx;
	margin: 10rpx;
	border-radius: 20rpx;
	line-height: 80rpx;
}
.comment-name {
	color: #436ab0;
	font-size: 32rpx;
	line-height: 60rpx;
}
.comment-content {
	font-size: 32rpx;
	line-height: 60rpx;
}
.comment-time {
	color: #999999;
	font-size: 28rpx;
	line-height: 50rpx;
}
.comment-reply-box {
	background-color: #f5f7fa;
	padding: 30rpx;
	margin-top: 10rpx;
}
.zx-course-buy {
	position: fixed;
	z-index: 99;
	left: 0;
	bottom: 0;
	width: 750rpx;
	height: 120rpx;
}
/* #ifdef H5 */
.zx-course-buy {
	bottom: 0rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
/* #endif */
.buy-botton {
	background-image: linear-gradient(90deg,#e86e35,#eb5058);color: #ffffff;font-size: 28rpx;padding-top: 10rpx;padding-bottom: 10rpx;border-radius: 50rpx; width: 230rpx;
}
</style>

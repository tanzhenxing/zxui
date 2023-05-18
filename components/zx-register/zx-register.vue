<template>
	<view>
		<zx-popup :show="regShow" mode="center" bgColor="transparent" :closeOnClickOverlay="false" :closeable="true" :zIndex="998" @close="close">
			<view :style="{ width: width }" style="border-radius: 10rpx;">
				<zx-image v-if="bgImage" :width="width" height="auto" radius="10rpx" :src="bgImage" mode="widthFix"></zx-image>
				<view class="reg-box">
					<zx-text text="获取验证码" color="#666666" size="32rpx" lineHeight="50rpx"></zx-text>
					<zx-text text="点击下方快去领取吧" color="#666666" size="32rpx" lineHeight="50rpx"></zx-text>
					<view style="margin-top: 20rpx;" class="flex-center">
						<view style="width: 100rpx;">
							<zx-text text="领取" color="#101010" size="46rpx" lineHeight="80rpx" :bold="true" fontFamily="semiBold" align="center" lines="1"></zx-text>
							<view class="line"></view>
						</view>
						<view style="flex: 1;"><zx-text :text="desc" color="#ff0000" size="42rpx" lineHeight="80rpx" :bold="true" lines="1" align="center"></zx-text></view>
					</view>
					<view style="margin-top: 30rpx;">
						<view style="display: flex;">
							<view style="width: 20rpx;"><zx-text text="*" color="#ff0000" size="28rpx" lineHeight="80rpx"></zx-text></view>
							<view style="flex: 1;"><zx-text text="姓名" color="#333333" size="28rpx" lineHeight="80rpx"></zx-text></view>
						</view>
						<input class="reg-input" placeholder="请输入您的姓名" v-model="regData.name" />
					</view>
					<view style="margin-top: 20rpx;">
						<view style="display: flex;">
							<view style="width: 20rpx;"><zx-text text="*" color="#ff0000" size="28rpx" lineHeight="80rpx"></zx-text></view>
							<view style="flex: 1;"><zx-text text="手机号码" color="#333333" size="28rpx" lineHeight="80rpx"></zx-text></view>
						</view>
						<input class="reg-input" placeholder="请输入您的手机号码" v-model="regData.phone" />
					</view>
					<view style="margin-top: 20rpx;">
						<view style="display: flex;">
							<view style="width: 20rpx;"><zx-text text="*" color="#ff0000" size="28rpx" lineHeight="80rpx"></zx-text></view>
							<view style="flex: 1;"><zx-text text="验证码" color="#333333" size="28rpx" lineHeight="80rpx"></zx-text></view>
						</view>
						<view class="flex-center">
							<view style="flex: 1;"><input class="reg-input" placeholder="请输入验证码" v-model="regData.smsCode" /></view>
							<view style="width: 200rpx;margin-left: 15rpx;">
								<button class="sms-code" @click="getVCode">{{ buttonText }}</button>
							</view>
						</view>
					</view>
					<view style="margin-top: 50rpx;">
						<view style="border-radius: 50rpx;"><button class="submit" @click="submit">立即领取</button></view>
						<view style="padding-top: 30rpx;" class="flex-center">
							<view style="width: 60rpx;"><radio :checked="agreement" @change="radioChange"></radio></view>
							<view style="flex: 1;">
								<view style="font-size: 24rpx;color: #666666;" @tap="agreeClick">
									<text>我已阅读并同意</text>
									<text style="color: #3790FF;">《用户协议和隐私协议》</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</zx-popup>

		<!-- 用户协议  -->
		<zx-popup :show="agreementPopup" mode="center" bgColor="transparent">
			<view class="agreement-box">
				<view style="height: 100rpx;" class="flex-center"><zx-text text="用户协议与隐私协议" align="center" size="36rpx"></zx-text></view>
				<scroll-view scroll-y :style="{ height: contentHeight + 'px', backgroundColor: '#f8f8f8' }">
					<view class="agree-content"><rich-text :nodes="agreeContent"></rich-text></view>
				</scroll-view>
				<view class="agreement-button">
					<zx-text text="不同意" size="34rpx" align="center" @click="disagree"></zx-text>
					<zx-text text="同意协议" size="34rpx" align="center" color="#2979ff" @click="agree"></zx-text>
				</view>
			</view>
		</zx-popup>
		
		
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
import check from '@tanzhenxing/zxui/libs/js/is.js';

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: ''
	},
	desc: {
		type: String,
		default: ''
	},
	mode: {
		type: String,
		default: 'center'
	},
	bgImage: {
		type: String,
		default: ''
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	width: {
		type: String,
		default: '500rpx'
	},
	round: {
		type: String,
		default: '0rpx'
	},
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	closeable: {
		type: Boolean,
		default: false
	},
	buttonType: {
		type: String,
		default: 'primary'
	},
	tips: {
		type: String,
		default: ''
	},
	submitText: {
		type: String,
		default: '立即领取'
	},
	agreeContent: {
		type: String,
		default: ''
	}
});

const regShow = ref(false);
regShow.value = props.show;

const regData = ref({
	name: '',
	phone: '',
	smsCode: ''
});

const contentHeight = ref(400);
const agreement = ref(false);
const agreementPopup = ref(false);
const countNum = ref(0);
const buttonText = ref('获取验证码');
const buttonDisabled = ref(false);
const countDownTimer = ref(null);

const close = () => {
	regShow.value = false;
};
// 用户服务协议
const radioChange = e => {
	console.log(e);
	agreement.value = e[0];
};
const agreeClick = () => {
	agreementPopup.value = true;
};
const disagree = () => {
	// 不同意对应的逻辑
	uni.showToast({
		title: '您不同意本协议',
		icon: 'none'
	});
	agreement.value = false;
	agreementPopup.value = false;
};
const agree = () => {
	// 同意对应的逻辑
	uni.showToast({
		title: '您同意了本协议',
		icon: 'none'
	});
	agreement.value = true;
	agreementPopup.value = false;
};
// 获取验证码
const getVCode = async () => {
	if (regData.value.name === '') {
		uni.showToast({
			title: '姓名不能为空',
			icon: 'none'
		});
		return;
	}

	let check_mobile = check.mobile(regData.value.phone);
	if (!check_mobile) {
		uni.showToast({
			title: '手机号码有误',
			icon: 'none'
		});
		return;
	}

	let res = await proxy.$util.http({
		path: '/sms',
		method: 'post',
		data: { verify_num: regData.value.phone, verify_type: 1 }
	});
	if (res.code !== 0) {
		uni.showToast({
			title: res.message,
			icon: 'none'
		});
		return false;
	}

	uni.showToast({
		title: '短信已发送，请注意查收',
		icon: 'none'
	});

	// 倒计时
	countNum.value = 60;
	countDownTimer.value = setInterval(() => {
		buttonDisabled.value = true;
		countDown();
	}, 1000);
};
// 验证码发送倒计时
const countDown = () => {
	if (countNum.value < 1) {
		clearInterval(countDownTimer.value);
		buttonDisabled.value = false;
		buttonText.value = '重新发送';
		return;
	}
	countNum.value--;
	buttonText.value = countNum.value + '秒重发';
};

// 提交注册
const submit = async () => {
	if (!agreement.value) {
		agreeClick();
		return;
	}
	
	if (regData.value.name === '') {
		uni.showToast({
			title: '姓名不能为空',
			icon:'none'
		});
		return;
	}
	
	let check_mobile = check.mobile(regData.value.phone);
	if (!check_mobile) {
		uni.showToast({
			title: '手机号码有误',
			icon:'none'
		});
		return;
	}

	if (regData.value.smsCode === '') {
		uni.showToast({
			title: '验证码不能为空',
			icon:'none'
		});
		return;
	}

	let res = await proxy.$util.http({
		path: '/register',
		method: 'post',
		data: { phone: regData.value.phone, realname: regData.value.name, code: regData.value.smsCode }
	});
	if (res.code !== 0) {
		uni.showToast({
			title: res.message,
			icon: 'none'
		});
		return false;
	}

	uni.showToast({
		title: '注册成功'
	});
	regShow.value = false;
	// 修改注册状态
	proxy.$store.dispatch('registerChange', true);
	
	let getUserInfo = await proxy.$util.http({
		path: '/user_login',
		method: 'post',
		header: { version: 0.1 }
	});
	if (getUserInfo.code !== 0) {
		return false;
	}
	proxy.$store.dispatch('userInfoChange', res.data.user);

	proxy.$emit('finish');
};
const showToast = (message)=> {
	
	proxy.$refs.uToast.show({
		message: message,
		type: 'error',
		success:()=>{
			console.log('uToast'+message)
		}
	})
}
</script>

<style lang="scss" scoped>
.flex-center {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.reg-input {
	background: transparent;
	border: 1px solid #ffaeae;
	border-radius: 40rpx;
	padding: 20rpx 30rpx;
	font-size: 30rpx;
	color: #101010;
}
.reg-box {
	position: absolute;
	top: 80rpx;
	width: 500rpx;
	margin: 30rpx;
	padding: 10rpx 10rpx;
}
.submit {
	box-shadow: 0px 2px 6px 0px rgba(255, 0, 0, 0.6);
	background-image: linear-gradient(180deg, #ff9c9c 0%, #ff0000 100%);
	border-radius: 50rpx;
	font-size: 32rpx;
	color: #ffffff;
}
.sms-code {
	background-color: #ff0000;
	border-radius: 50rpx;
	font-size: 28rpx;
	color: #ffffff;
	padding: 5rpx;
}
.agreement-box {
	margin: 30rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
}
.agreement-button {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 100rpx;
}
.agree-content {
	padding: 30rpx;
	text-align: justify;
	font-size: 28rpx;
	color: #999999;
}
.line {
	height: 6rpx;
	background-color: #ff0000;
}
</style>

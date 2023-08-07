<template>
	<view @click="wxPay">
		<slot>
			<button type="primary">{{ text }}</button>
		</slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import util from '@tanzhenxing/zxui/libs/js/util.js';
const { proxy } = getCurrentInstance();

const props = defineProps({
	goodsId: {
		type: Number,
		default: 0
	},
	moduleId: {
		type: Number,
		default: 0
	},
	text: {
		type: String,
		default: ''
	}
});

const getWxCode = () => {
	return new Promise((resolve, reject) => {
		wx.login({
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		});
	});
};
const wxPay = async () => {
	let getCode = await this.getWxCode();
	if (getCode.errMsg !== 'login:ok') {
		uni.showToast({
			title: '获取微信code失败'
		});
		return;
	}
	// 获取支付信息
	let payData = { module: this.moduleId, id: this.goodsId, code: getCode.code, is_mini: 1 };
	let res = await util.http({
		path: '/order/book',
		method: 'post',
		data: payData
	});
	if (res.code !== 0) {
		uni.showToast({
			title: '获取微信预支付信息失败'
		});
		return false;
	}
	// 调起微信支付
	wx.requestPayment({
		timeStamp: res.data.timestamp,
		nonceStr: res.data.nonceStr,
		package: res.data.package,
		signType: res.data.signType,
		paySign: res.data.paySign,
		success: (res) => {
			this.$emit('pay', true);
		},
		fail: (res) => {
			this.$emit('pay', false);
		}
	});
};
</script>

<style lang="scss" scoped>
	
</style>

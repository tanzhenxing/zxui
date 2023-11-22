<template>
	<view>
		<zx-popup :show="show" mode="right" :closeable="true" @close="close">
			<view class="withdraw-box">
				<view>
					<zx-text :text="$store.getters.withdrawList[index].title" align="center" size="36rpx" lineHeight="60rpx"></zx-text>
				</view>
				<view style="margin-top: 20rpx">
					<zx-line></zx-line>
				</view>
				<view style="margin-top: 20rpx">
					<!-- 微信提现 -->
					<view v-if="$store.getters.withdrawList[index].id === 'wx'">
						<view class="flex-row">
							<view class="form-label">
								<zx-text text="账户名称：" size="32rpx" color="#333333" lineHeight="90rpx"></zx-text>
							</view>
							<view class="flex1">
								<input type="text" class="form-input" v-model="formData.realname" placeholder="请输入账户名称" />
								<zx-line></zx-line>
							</view>
						</view>
					</view>

					<!-- 银行卡提现 -->
					<view v-if="$store.getters.withdrawList[index].id === 'bank'">
						<view class="flex-row">
							<view class="form-label">
								<zx-text text="账户名称：" size="32rpx" color="#333333" lineHeight="90rpx"></zx-text>
							</view>
							<view class="flex1">
								<input type="text" class="form-input" style="font-size: 34rpx" v-model="formData.realname" />
								<zx-line></zx-line>
							</view>
						</view>
						<view class="flex-row">
							<view class="form-label">
								<zx-text text="银行卡号：" size="32rpx" color="#333333" lineHeight="90rpx"></zx-text>
							</view>
							<view class="flex1">
								<input type="text" class="form-input" v-model="formData.account" placeholder="请输入银行卡号" />
								<zx-line></zx-line>
							</view>
						</view>
						<view class="flex-row">
							<view class="form-label">
								<zx-text text="开户行：" size="32rpx" color="#333333" lineHeight="90rpx"></zx-text>
							</view>
							<view class="flex1">
								<input type="text" class="form-input" v-model="formData.bank_name" placeholder="请输入开户行" />
								<zx-line></zx-line>
							</view>
						</view>
					</view>

					<view class="flex-row">
						<view class="form-label">
							<zx-text text="提现金额：" size="32rpx" color="#333333" lineHeight="90rpx"></zx-text>
						</view>
						<view class="flex1">
							<input type="text" class="form-input" style="color: #999999;" v-model="formData.operation_money" :disabled="true" placeholder="请输入提现金额" />
							<zx-line></zx-line>
						</view>
					</view>

					<view class="flex-row" style="margin-top: 20rpx">
						<view class="form-label">
							<zx-text text="发票凭证：" size="32rpx" color="#333333" lineHeight="90rpx"></zx-text>
						</view>
						<view class="flex1">
							<zx-upload-file
								name="annex"
								ref="annex"
								uploadText="选择图片"
								accept="image"
								:multiple="false"
								:showDelete="true"
								:maxCount="1"
								:fileList="fileList"
								@afterUpload="afterUpload"
							></zx-upload-file>
						</view>
					</view>
				</view>
				<view style="padding: 50rpx">
					<button type="warn" text="申请提现" style="width: 500rpx; border-radius: 50rpx" @click="submit">申请提现</button>
				</view>
				<view>
					<zx-line></zx-line>
				</view>
				<!-- 提现须知 -->
				<view style="margin-top: 40rpx">
					<zx-text text="提现须知" size="34rpx" lineHeight="50rpx" align="center" :bold="true"></zx-text>
					<view style="margin: 30rpx">
						<view v-for="(item, index) in $store.getters.operations" :key="index">
							<zx-text :text="item.text" size="26rpx" lineHeight="40rpx" color="#333333"></zx-text>
						</view>
					</view>
				</view>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	index: {
		type: Number,
		default: 0
	},
	money: {
		type: Number,
		default: 0
	},
	channel: {
		type: String,
		default: 'money'
	}
});

const isShow = ref(false);
const apiPath = ref('/team/withdraw');
const formData = ref({
	type: 1, // 1人工转账 2自动提现
	pay_type: 'bank', // 提现渠道 bank, wx
	bank_name: '', // 开户行
	payment_type: 1, // 1微信 2支付宝 3银行卡
	realname: '', // 账户名称
	account: '', // 银行卡号
	operation_money: '', // 提现金额(元)
	order_wallet: [],
	annex: '' // 发票
});
const lists = ref([]);
const maxMoney = ref(5000); // 单次提现最大金额
const minMoney = ref(500);
const isYuan = ref(false);
const fileList = ref([]);

onMounted(() => {
	formData.value.realname = proxy.$store.getters.userInfo.realname;
	if (props.money > 0) {
		formData.value.operation_money = (props.money * 0.01).toFixed(2);
	}
	// 提现api接口
	if (props.channel === 'agent' || props.channel === 'person') {
		apiPath.value = '/team/withdraws';
	}
});

const getMoney = computed(() => {
	return (props.money * 0.01).toFixed(2);
});

const close = () => {
	proxy.$emit('close');
};
const afterUpload = (e) => {
	fileList.value = e;
	formData.value.annex = e[0].key;
};
const submit = () => {
	formData.value.pay_type = proxy.$store.getters.withdrawList[props.index].id;

	switch (formData.value.pay_type) {
		case 'wx':
			formData.value.payment_type = 1;
			break;
		case 'bank':
			formData.value.payment_type = 3;
			break;
	}

	if (formData.value.pay_type == 'wx' && formData.value.realname == '') {
		uni.showToast({
			title: '账户名称不能为空',
			icon: 'none',
			duration: 1000
		});
		return;
	}

	if (formData.value.pay_type == 'bank') {
		if (formData.value.realname == '') {
			uni.showToast({
				title: '账户名称不能为空',
				icon: 'none',
				duration: 1000
			});
			return;
		}
		if (formData.value.account == '') {
			uni.showToast({
				title: '银行卡号不能为空',
				icon: 'none',
				duration: 1000
			});
			return;
		}
		if (formData.value.bank_name == '') {
			uni.showToast({
				title: '开户行不能为空',
				icon: 'none',
				duration: 1000
			});
			return;
		}
	}

	if (formData.value.annex === '') {
		uni.showToast({
			title: '提现必须要上传发票',
			icon: 'none',
			duration: 1000
		});
		return;
	}

	if (formData.value.operation_money == '') {
		uni.showToast({
			title: '提现金额不能为空',
			icon: 'none',
			duration: 1000
		});
		return;
	}

	// 转换金额单位为元
	if (!isYuan.value) {
		formData.value.order_wallet = proxy.$store.getters.withdrawInfo;
		formData.value.order_wallet.forEach((item, index) => {
			item.operation_money = item.operation_money * 0.01;
		});
		isYuan.value = true;
	}

	postData();
};
// 拆分提现金额
const splitMoney = () => {
	lists.value = [];

	// 金额超过 MaxMoney, 分多次提交
	if (formData.value.order_wallet.length > 0) {
		let tem_arr = [];
		// 筛选超过5000的金额
		formData.value.order_wallet.forEach((item, index) => {
			if (item.operation_money > maxMoney.value) {
				let times = Math.floor(item.operation_money / maxMoney.value);
				for (let i = 0; i < times; i++) {
					let item_obj = Object.assign({}, formData.value);
					item_obj.order_wallet = [{ id: item.id, operation_money: maxMoney.value.toFixed(2) }];
					lists.value.push(item_obj);
				}
				// 剩余金额
				let remainingSum = item.operation_money % maxMoney.value;
				if (remainingSum > 0) {
					tem_arr.push({ id: item.id, operation_money: remainingSum });
				}
			} else {
				if (item.operation_money > 0) {
					tem_arr.push(item);
				}
			}
		});
		// 按照金额 从小到大排序
		tem_arr.sort(function (a, b) {
			if (a['operation_money'] < b['operation_money']) {
				return -1;
			}
			if (a['operation_money'] > b['operation_money']) {
				return 1;
			}
			return 0;
		});

		console.log('tem_arr:' + JSON.stringify(tem_arr));

		// 合并不足5000的金额
		let tem_total = 0;
		let item_arr = [];
		tem_arr.forEach((item, index) => {
			let tem_operation_money = item.operation_money;

			// 金额总和>=5000
			if (tem_total + tem_operation_money <= maxMoney.value) {
				tem_total = tem_total + tem_operation_money;
				item.operation_money = item.operation_money.toFixed(2);
				item_arr.push(item);
			} else {
				let item_obj = Object.assign({}, formData.value);
				item.operation_money = item.operation_money.toFixed(2);
				item_obj.order_wallet = [item];
				lists.value.push(item_obj);
			}
		});

		// 合并的数据
		let item_obj = Object.assign({}, formData.value);
		item_obj.order_wallet = item_arr;
		lists.value.push(item_obj);

		console.log(JSON.stringify(lists.value));
	} else {
		// 余额提现
		let operation_money = parseFloat(formData.value.operation_money);
		if (operation_money > maxMoney.value) {
			//金额大于5000
			let times = Math.floor(operation_money / maxMoney.value);
			for (let i = 0; i < times; i++) {
				let item_obj = Object.assign({}, formData.value);
				item_obj.operation_money = maxMoney.value.toFixed(2);
				lists.value.push(item_obj);
			}
			// 剩余金额>=500
			let remainingSum = operation_money % maxMoney.value;
			if (remainingSum >= minMoney.value) {
				let item_obj = Object.assign({}, formData.value);
				item_obj.operation_money = remainingSum.toFixed(2);
				lists.value.push(item_obj);
			}
			//console.log('money:'+JSON.stringify(lists.value))
		} else {
			// 余额>=500
			if (operation_money >= minMoney.value) {
				let item_obj = Object.assign({}, formData.value);
				item_obj.operation_money = operation_money.toFixed(2);
				lists.value.push(item_obj);
			}
		}
	}
};

// 金额提现
const postData = async () => {
	// 拆分提现金额
	splitMoney();

	// 加载动画
	uni.showLoading({
		title: '提交中'
	});

	let count = 0;
	let postStatus = false;
	let timeId = setInterval(async () => {
		// 检查数据提交状态
		if (postStatus) {
			return;
		}
		// 数据提交完成
		if (count >= lists.value.length) {
			// 关闭动画
			uni.hideLoading();
			// 清除提现信息
			proxy.$store.dispatch('withdrawInfoChange', []);
			// 清除定时器
			clearInterval(timeId);
			// 返回 我的页面
			uni.switchTab({
				url: '/pages/my/index'
			});
			return;
		}
		
		let res = await proxy.$util.http({
			path: apiPath.value,
			method: 'post',
			data: lists.value[count]
		});
		if (res.code !== 0) {
			uni.showToast({
				title: res.message,
				icon: 'none',
				duration: 3000
			});
			// 清除定时器
			clearInterval(timeId);
			return false;
		}
		
		// 数据提交中
		postStatus = true;
		
		// 数据提交成功
		if (res.code === 0) {
			postStatus = false;
			count++;
		}

	}, 500);
};
</script>

<style lang="scss" scoped>
.flex-row {
	display: flex;
	flex-direction: row;
}
.flex1 {
	flex: 1;
}
.form-label {
	width: 180rpx;
}
.form-input {
	line-height: 80rpx;
	padding: 20rpx;
}
.withdraw-box {
	width: 690rpx;
	padding: 20rpx;
}
</style>

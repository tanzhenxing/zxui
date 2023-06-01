<template>
	<view style="margin-bottom: 20rpx;margin-left: 20rpx;margin-right: 20rpx;">
		<zx-section
			:title="item.title"
			bgColor="#ffffff"
			:borderRadius="borderRadius"
			:gap="false"
			:type="decorationType"
			:decorationColor="decorationColor"
			:decorationWidth="decorationWidth"
			:decorationHeight="decorationHeight"
			moreText="更多"
			:moreLink="'/pages/course/play?p=true&id='+item.id"
		>
			<!-- 上方卡槽 -->
			<slot name="top"></slot>
			
			<view style="padding-bottom: 20rpx;">
				<!-- 课程列表 -->
				<view v-if="item.catalogue.length>0" style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;">
					<view v-for="(catalogue,catalogue_index) in item.catalogue" :key="catalogue_index" :style="(item.catalogue.length%2)===0?{width:'315rpx'}:{width:'650rpx'}">
						<view style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
							<zx-image :width="(item.catalogue.length%2)===0?'315rpx':'650rpx'" height="auto" radius="10rpx" :src="catalogue.image" mode="widthFix" @click="goDetail(catalogue)"></zx-image>
						</view>
						<zx-text :text="catalogue.title" lines="2" size="32rpx" color="#313131" :bold="false" lineHeight="60rpx"></zx-text>
						<view style="display: flex;flex-direction: row;">
							<zx-text :text="$util.priceFormat(catalogue.price)" size="28rpx" :bold="false" lineHeight="50rpx" :color="catalogue.price>0?'#ff0000':'#999999'"></zx-text>
							<zx-text :text="catalogue.study_num+'人学过'" size="26rpx" color="#9B9B9B" lineHeight="50rpx" lines="1" align="right"></zx-text>
						</view>
					</view>
				</view>
				<!-- 资源包列表 -->
				<view v-else>
					<view>
						<zx-image width="650rpx" height="auto" radius="10rpx" :src="item.image" mode="widthFix" @click="goList(item)"></zx-image>
					</view>
					<view>
						<zx-text :text="item.bubtitle" lines="2" size="32rpx" color="#313131" lineHeight="50rpx"></zx-text>
					</view>
					<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
						<!-- 价格信息 -->
						<view>
							<zx-text :text="$util.priceFormat(item.price)" :color="item.price>0?'#ff0000':'#9B9B9B'" size="28rpx" lineHeight="50rpx"></zx-text>
							<zx-text :text="item.study_num + '人学过'" size="26rpx" color="#9B9B9B" lineHeight="50rpx"></zx-text>
						</view>
						<view style="width: 250rpx;">
							<view :style="{ backgroundColor: '#ffffff', borderRadius: '45rpx', margin: '10rpx', border: '1px solid ' + getGiftColor }" @click="makePoster">
								<zx-text text="生成分享海报" :color="getGiftColor" align="center" lineHeight="80rpx" size="30rpx"></zx-text>
							</view>
						</view>
						<!-- 拼团 -->
						<view v-if="false" style="width: 210rpx;">
							<view :style="{ backgroundColor: '#ffffff', borderRadius: '45rpx', margin: '10rpx', border: '1px solid ' + getGiftColor }">
								<!-- have_group为0是未参与或发起拼团,为1则是拼团中 -->
								<zx-text
									v-if="item.have_group === 1"
									text="拼团中"
									color="#cccccc"
									align="center"
									lineHeight="90rpx"
									size="34rpx"
									@click="buyGroup"
								></zx-text>
								<!-- is_launch 1是开启拼团，2是不开启 -->
								<zx-text
									v-else
									:text="item.pay_type > 0 ? '拼团成功' : '发起拼团'"
									color="#ff0000"
									align="center"
									lineHeight="90rpx"
									size="34rpx"
									@click="buyGroup"
								></zx-text>
							</view>
						</view>
						<!-- 送五福 -->
						<view v-if="false" style="width: 230rpx;background-color: #ffffff;">
							<view :style="{ borderRadius: '45rpx', margin: '10rpx', border: '1px solid ' + getGiftColor }">
								<!-- wufu_status 1表示显示，0是隐藏 -->
								<zx-text
									text="送五福"
									:color="getGiftColor"
									align="center"
									lineHeight="90rpx"
									size="34rpx"
									prefixIcon="gift-fill"
									:iconStyle="{ color: getGiftColor, fontSize: '40rpx' }"
									@click="openGiftWindow"
								></zx-text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 下方卡槽 -->
			<slot name="buttom"></slot>
		</zx-section>
		
		<!-- 注册弹窗 -->
		<zx-register
			:show="regShow && $store.getters.pageConfig && $store.getters.pageConfig.sy.show"
			desc="公益课专属观看权"
			bgImage="https://files.wufu-app.com/images/popup/home.png"
			width="580rpx"
			bgColor="transparent"
			:agreeContent="$store.getters.agreeContent"
			:closeable="true"
		></zx-register>
		<!-- 送五福弹窗 -->
		<zx-popup :show="showGiftWindow" mode="center" bgColor="transparent" @close="closeGiftWindow">
			<view style="width: 700rpx;">
				<image style="width: 700rpx;" src="https://files.wufu-app.com/images/popup/gift-bg.png" mode="widthFix"></image>
				<view style="position: absolute;left: 0rpx;width: 700rpx;top: 0rpx;">
					<zx-text text="让爱传出去 幸福又美丽" color="#FF2424" align="center" lineHeight="90rpx" size="32rpx" fontFamily="Semibold"></zx-text>
				</view>
				<view style="position: absolute;left: 50rpx;top: 120rpx;font-size: 30rpx;color: #333333;text-align: justify;width: 600rpx;line-height: 50rpx;">
					<view>
						<text>购买课程后，可通过</text>
						<text style="color: #ff0000;font-weight: bold;">链接分享</text>
						<text>给好友</text>
					</view>
					<view>
						<text>好友领取后就能</text>
						<text style="color: #ff0000;font-weight: bold;">免费观看</text>
						<text>赠送课程</text>
					</view>
					<view><text>在我的-赠送记录中查看赠送详情</text></view>
					<view><text>送一次累计一福，送满五福后可领取超值课程</text></view>
				</view>
				<view style="width: 400rpx;position: absolute;left: 150rpx;top: 360rpx;">
					<button
						text="立即赠送"
						size="normal"
						shape="circle"
						color="linear-gradient(180deg, #FF9696 0%, #FF3838 100%)"
						:disabled="submitDisabled"
						:customStyle="{ boxShadow: '0px 0px 10px 0px rgba(219,0,0,0.2)' }"
						:throttleTime="2000"
						@click="buyGift"
					></button>
				</view>
				<view style="position: absolute;width: 80rpx;left: 325rpx;top: 480rpx;">
					<zx-icon name="close-circle" size="60rpx" color="#f3f3f3" @click="closeGiftWindow"></zx-icon>
				</view>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	title: {
		type: String,
		default: '未知分类'
	},
	moreText: {
		type: String,
		default: '课程目录'
	},
	isPrice: {
		type: Boolean,
		default: true
	},
	isBuyPrice: {
		type: Boolean,
		default: true
	},
	showGroup: {
		type: Boolean,
		default: false
	},
	showGift: {
		type: Boolean,
		default: false
	},
	item: {
		type: Object,
		default() {
			return {};
		}
	},
	borderRadius: {
		type: String,
		default: '20rpx'
	}
});

const showGiftWindow = ref(false);
const submitDisabled = ref(false);
const decorationType = ref('line');
const decorationColor = ref('#ff0000');
const decorationWidth = ref('8rpx');
const decorationHeight = ref('35rpx');
const regShow = ref(false);

const getShowGroup = computed(() => {
	if (props.item.pay_type > 0 || props.item.is_launch === 2) {
		return false;
	} else {
		return props.showGroup;
	}
});
const getGroupColor = computed(() => {
	if (props.item.pay_type > 0) {
		return '#cccccc';
	}
	return '#ff0000';
});
const getGiftColor = computed(() => {
	if (props.item.pay_type > 0) {
		return '#ff0000';
	}
	return '#ff0000';
});

const goList = (item) => {
	uni.navigateTo({
		url: '/pages/course/list?p=true&res=1&id=' + item.section_id
	});
};
const goDetail = (item) => {
	console.log(JSON.stringify(item))

	uni.navigateTo({
		url: '/pages/course/player?p=true&res=1&id=' + item.id
	});
};

const makePoster = () => {
	uni.navigateTo({
		url: '/pages/package02/poster/index?posterMode=list&id=' + props.item.section_id + '&p=true&res=1&r_id=' + proxy.$store.getters.userInfo.id
	});
};
const closeGiftWindow = () => {
	showGiftWindow.value = false;
};
const openGiftWindow = () => {
	showGiftWindow.value = true;
};
const buyGift = () => {
	submitDisabled.value = true;
	buyGroup(-1, 33);
};
// 团购
const buyGroup = async (pid = 0, gift = 0) => {
	// 已购买
	if (props.item.pay_type > 0 && pid >= 0) {
		return;
	}
	
	let res = await proxy.$util.http({ path: '/section', method: 'get', data: { section_id: props.item.section_id } });
	if (res.code !== 0) {
		return false;
	}
	
	if (res.data.pay_appid !== undefined) {
		// #ifdef H5
		// 送五福
		if (gift > 0) {
			proxy.$util.goWechatPay(gift, props.item.section_id, res.data.pay_appid);
			return;
		}
		// 团购
		proxy.$util.goWechatPay(3, props.item.section_id, res.data.pay_appid, pid);
		// #endif
		
	}
};
</script>

<style lang="scss" scoped></style>

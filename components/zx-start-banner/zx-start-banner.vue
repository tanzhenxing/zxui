<template>
	<view v-if="startBannerStatus" class="zx-start-banner zx-bg-white zx-dark-bg-level-3" :style="{ height: startBannerHeight + 'px' }">
		<text class="zx-start-banner-skip zx-color-gray zx-border zx-block zx-text-small" @tap.stop="closeStartBanner">跳过</text>
		<swiper :indicator-dots="true" :autoplay="false" :style="{ height: startBannerHeight - 50 + 'px !important', flex: 0 }">
			<swiper-item class="zx-start-banner-swiper-item" v-for="(item,index) in items" :key="index">
				<text class="zx-h2 zx-color-gray">广告{{index}}</text>
				<view v-if="items.length===(index+1)" class="zx-start-banner-close zx-text-center" @tap.stop="closeStartBanner">开始体验</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: 'zx-start-banner',
	data() {
		return {
			// 高度
			startBannerHeight: 500,
			// 展示状态
			startBannerStatus: true
		};
	},
	created() {
		var system = this.system();
		this.startBannerHeight = system.safeArea.height;

		// 根据本地数据判断是否弹窗
		/* var played = uni.getStorageSync('playStartBanner');
		
		if (played != '') {
			this.startBannerStatus = false;
		} else {
			this.startBannerStatus = true;
			// 记录到本地
			uni.setStorageSync('playStartBanner', 'played');
		} */
	},
	props: {
		items: {
			type: Array,
			default: ()=> {
				return []
			}
		}
	},
	methods: {
		closeStartBanner: function() {
			this.startBannerStatus = false;
		},
		system: function() {
			try {
				var res = uni.getSystemInfoSync();
				var iPhoneXBottom = 0;
				if (!res.model) {
					res.model = 'no';
				}
				res.model = res.model.replace(' ', '');
				res.model = res.model.toLowerCase();
				var res1 = res.model.indexOf('iphonex');
				if (res1 > 5) {
					res1 = -1;
				}
				var res2 = res.model.indexOf('iphone1');
				if (res2 > 5) {
					res2 = -1;
				}
				if (res1 != -1 || res2 != -1) {
					res.iPhoneXBottomHeightRpx = 60;
					res.iPhoneXBottomHeightPx = uni.upx2px(60);
				} else {
					res.iPhoneXBottomHeightRpx = 0;
					res.iPhoneXBottomHeightPx = 0;
				}
				return res;
			} catch (e) {
				return null;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.zx-start-banner {
	position: fixed;
	z-index: 990;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	overflow: hidden;
}
.zx-start-banner-skip {
	width: 100rpx;
	height: 50rpx;
	border-radius: 50rpx;
	text-align: center;
	line-height: 50rpx;
	position: fixed;
	z-index: 999;
	top: 120rpx;
	right: 50rpx;
}
.zx-start-banner-close {
	width: 220rpx;
	height: 80rpx;
	border-radius: 80rpx;
	margin-top: 80rpx;
	text-align: center;
	font-size: 28rpx;
	line-height: 80rpx;
	border: 1px solid #f97d7c;
	color: #f97d7c;
}
.zx-start-banner-swiper-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>

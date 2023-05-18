<template>
	<view v-if="show && items" style="background-color: #ffffff;">
		<view class="news-title" style="padding: 20rpx;">
			<view style="display: flex;align-items: center;">
				<view class="line-icon" :style="{ backgroundColor: lineBgColor }"></view>
				<zx-tabs :list="items" keyName="name" width="140rpx" size="34rpx" lineColor="#ff0000" @change="navchange"></zx-tabs>
			</view>
		</view>
		<view class="line"></view>
		<view style="padding: 15rpx 20rpx;">
			<view v-if="!currentLists">
				<zx-empty></zx-empty>
			</view>
			<view v-else v-for="(item, index) in currentLists" :key="index" @tap="clickItem(item)">
				<!-- 最多显示3条 -->
				<view v-if="index < 3" style="margin-top: 15rpx;margin-bottom: 15rpx;display: flex;">
					<view class="item-flex">
						<zx-text :text="item.title" size="32rpx" lines="2" color="#101010" fontFamily="PingFangSC-medium" lineHeight="45rpx"></zx-text>
						<zx-text :text="item.introduce" size="26rpx" lines="2" color="#9B9B9B" lineHeight="40rpx"></zx-text>
						<zx-text v-if="showTime" :text="item.create_time_day" size="26rpx" lines="2" color="#9B9B9B" lineHeight="50rpx"></zx-text>
					</view>
					<view style="width: 220rpx;margin-left: 20rpx;">
						<zx-image width="200rpx" height="160rpx" radius="10rpx" :src="item.image"></zx-image>
						<view v-if="item.link === null || item.link === ''">
							<zx-text :text="'阅读数:' + item.pageview" size="26rpx" lines="2" color="#9B9B9B" lineHeight="50rpx" align="right"></zx-text>
						</view>
					</view>
				</view>
				<zx-line v-if="index < 2"></zx-line>
			</view>
			<view style="padding: 20rpx;">
				<zx-more-button @moreClick="moreClick"></zx-more-button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	// 是否显示时间
	showTime: {
		type: Boolean,
		default: false
	},
	lineBgColor: {
		type: String,
		default: '#ff0000'
	},
	activeColor: {
		type: String,
		default: '#ff0000'
	},
	activeLineBg: {
		type: String,
		default: '#ff0000'
	},
	items: {
		type: Array,
		default() {
			return [];
		}
	},
	moreLink: {
		type: String,
		default: ''
	}
});

const currentUrl = ref('');
const currentLists = ref(null);
const currentIndex = ref(0);

setTimeout(() => {
	if (props.items[0] !== undefined) {
		currentLists.value = props.items[currentIndex.value].article;
	}
}, 500);

const moreClick = () => {
	proxy.$emit('moreClick', props.items[currentIndex.value]);
};
const navchange = e => {
	currentIndex.value = e.index;
	currentLists.value = props.items[currentIndex.value].article;
};
const clickItem = item => {
	proxy.$emit('itemClick', item);
};
</script>

<style lang="scss">
.line {
	height: 1rpx;
	background-color: #dedede;
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.line-icon {
	width: 8rpx;
	height: 35rpx;
	border-radius: 5rpx;
}
.news-title {
	background-color: #ffffff;
}
.item-flex {
	-webkit-flex: 1;
	flex: 1;
}
.item-image {
	width: 220rpx;
	height: 160rpx;
	border-radius: 10rpx;
}

.article-title {
	height: 90rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical !important;
	font-size: 32rpx;
	color: #101010;
	line-height: 45rpx;
	text-align: justify;
}
.article-desc {
	height: 80rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical !important;
	font-size: 26rpx;
	color: #9b9b9b;
	line-height: 40rpx;
	text-align: justify;
}
</style>

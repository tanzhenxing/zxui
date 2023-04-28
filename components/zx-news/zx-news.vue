<template>
	<view v-if="(show>0 || items.length>0)">
		<view class="news-title" style="padding: 20rpx;">
			<view style="display: flex;align-items: center;">
				<view class="line-icon" :style="{backgroundColor: lineBgColor}"></view>
				<zx-tabs :list="items" keyName="name" width="140rpx" size="34rpx" lineColor="#ff0000" @change="navchange"></zx-tabs>
			</view>
		</view>
		<view class="line"></view>
		<view class="news-list" style="padding: 15rpx 20rpx;background-color: #ffffff;">
			<view v-if="currentLists.length===0">
				<zx-empty></zx-empty>
			</view>
			<view v-for="(item,index) in currentLists" :key="index" @tap="clickItem(item)">
				<!-- 最多显示3条 -->
				<view style="margin-top: 15rpx;margin-bottom: 15rpx;display: flex;" v-if="index<3">
					<view class="item-flex">
						<zx-text :text="item.title" size="32rpx" lines="2" color="#101010" fontFamily="PingFangSC-medium" lineHeight="45rpx"></zx-text>
						<zx-text :text="item.introduce" size="26rpx" lines="2" color="#9B9B9B" lineHeight="40rpx"></zx-text>
						<zx-text v-if="showTime" :text="item.create_time_day" size="26rpx" lines="2" color="#9B9B9B" fontFamily="regular" lineHeight="50rpx"></zx-text>
					</view>
					<view style="width: 220rpx;margin-left: 20rpx;">
						<zx-image width="200rpx" height="160rpx" :src="item.image+'?imageMogr2/thumbnail/750x'"></zx-image>
						<view v-if="(item.link===null || item.link==='')">
							<zx-text :text="'阅读数:'+item.pageview" size="26rpx" lines="2" color="#9B9B9B" lineHeight="50rpx" align="right"></zx-text>
						</view>
					</view>
				</view>
				<zx-line></zx-line>
			</view>
			<zx-more-button @click="moreClick"></zx-more-button>
		</view>
		
	</view>
</template>

<script>
export default {
	name: 'zx-news',
	data() {
		return {
			currentUrl: '',
			currentLists: [],
			currentIndex: 0,
		};
	},
	mounted() {
		setTimeout(()=>{
			if(this.items[0]!==undefined){
				this.currentLists = this.items[this.currentIndex].article;
			}
		},500);
	},
	methods: {
		moreClick(){
			this.$emit('moreClick',this.items[this.currentIndex]);
		},
		navchange(e) {
			this.currentIndex = e.index;
			this.currentLists = this.items[this.currentIndex].article;
		},
		clickItem(item){
			this.$emit('itemClick',item);
		}
	},
	props: {
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
			default: '/pages/school/news?id='
		}
	}
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
	-webkit-flex: 1;flex: 1;
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
		-webkit-box-orient: vertical!important;
		font-size: 32rpx;color: #101010;line-height: 45rpx;
		text-align: justify;
	}
	.article-desc {
		height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical!important;
		font-size: 26rpx;color: #9B9B9B;line-height: 40rpx;
		text-align: justify;
	}
</style>

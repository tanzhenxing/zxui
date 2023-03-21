<template>
	<!-- #ifndef APP-NVUE -->
	<view class="zx-article-list-item" :class="itemClass" hover-class="zx-tap" v-for="(item, index) in articles" :key="index" @tap="newstap(item.id)">
		<view>
			<text class="zx-article-list-title zx-block" :class="titleClass">{{ item.title }}</text>
		</view>
		<view class="zx-article-list-img1" v-if="item.imgs.length == 1"><zx-image :src="item.imgs[0]" width="460rpx" height="280rpx"></zx-image></view>
		<view class="zx-flex zx-row zx-nowrap zx-space-between" v-if="item.imgs.length == 2">
			<view class="zx-article-list-img2-in"><zx-image :src="item.imgs[0]" width="335rpx" height="200rpx"></zx-image></view>
			<view class="zx-article-list-img2-in"><zx-image :src="item.imgs[1]" width="335rpx" height="200rpx"></zx-image></view>
		</view>
		<view class="zx-flex zx-row zx-nowrap zx-space-between" v-if="item.imgs.length >= 3">
			<view class="zx-article-list-img3-in"><zx-image :src="item.imgs[0]" width="220rpx" height="150rpx"></zx-image></view>
			<view class="zx-article-list-img3-in"><zx-image :src="item.imgs[1]" width="220rpx" height="150rpx"></zx-image></view>
			<view class="zx-article-list-img3-in"><zx-image :src="item.imgs[2]" width="220rpx" height="150rpx"></zx-image></view>
		</view>
		<view class="zx-article-list-footer zx-flex zx-row zx-space-between zx-align-items-center">
			<text class="zx-article-list-footer-items zx-ellipsis zx-color-gray zx-block zx-icons">&#xe69e; {{ item.author }}</text>
			<text class="zx-article-list-footer-items zx-ellipsis zx-color-gray zx-block zx-icons zx-text-center">&#xe609; {{ item.views }}</text>
			<text class="zx-article-list-footer-items zx-ellipsis zx-color-gray zx-block zx-icons zx-text-right">&#xe64c; {{ item.createTime }}</text>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<cell v-for="(item, index) in articles" :key="index">
		<view class="zx-article-list-item" :class="itemClass" hover-class="zx-tap" @tap="newstap(item.id)">
			<view>
				<text class="zx-article-list-title zx-block" :class="titleClass">{{ item.title }}</text>
			</view>
			<view class="zx-article-list-img1" v-if="item.imgs.length == 1"><zx-image :src="item.imgs[0]" width="460rpx" height="280rpx"></zx-image></view>
			<view class="zx-flex zx-row zx-nowrap zx-space-between" v-if="item.imgs.length == 2">
				<view class="zx-article-list-img2-in"><zx-image :src="item.imgs[0]" width="335rpx" height="200rpx"></zx-image></view>
				<view class="zx-article-list-img2-in"><zx-image :src="item.imgs[1]" width="335rpx" height="200rpx"></zx-image></view>
			</view>
			<view class="zx-flex zx-row zx-nowrap zx-space-between" v-if="item.imgs.length >= 3">
				<view class="zx-article-list-img3-in"><zx-image :src="item.imgs[0]" width="220rpx" height="150rpx"></zx-image></view>
				<view class="zx-article-list-img3-in"><zx-image :src="item.imgs[1]" width="220rpx" height="150rpx"></zx-image></view>
				<view class="zx-article-list-img3-in"><zx-image :src="item.imgs[2]" width="220rpx" height="150rpx"></zx-image></view>
			</view>
			<view class="zx-article-list-footer zx-flex zx-row zx-space-between zx-align-items-center">
				<text class="zx-article-list-footer-items zx-ellipsis zx-color-gray zx-block zx-icons">&#xe69e; {{ item.author }}</text>
				<text class="zx-article-list-footer-items zx-ellipsis zx-color-gray zx-block zx-icons zx-text-center">&#xe609; {{ item.views }}</text>
				<text class="zx-article-list-footer-items zx-ellipsis zx-color-gray zx-block zx-icons zx-text-right">&#xe64c; {{ item.createTime }}</text>
			</view>
		</view>
	</cell>
	<!-- #endif -->
</template>
<script>
export default {
	name: 'zx-article-list',
	props: {
		articles: {
			type: Array,
			default: function() {
				return [];
			}
		},
		itemClass: {
			type: Array,
			default: function() {
				return ['zx-bg-white', 'zx-dark-bg-level-3'];
			}
		},
		titleClass: {
			type: Array,
			default: function() {
				return ['zx-h6', 'zx-primary-text'];
			}
		}
	},
	methods: {
		newstap: function(id) {
			this.$emit('newstap', id);
		}
	},
	emits: ['newstap']
};
</script>
<style scoped>
.zx-article-list {
}
.zx-article-list-item {
	margin-bottom: 30rpx;
	padding: 25rpx 30rpx;
}
.zx-article-list-title {
	overflow: hidden;
}
.zx-article-list-img1 {
	margin-top: 22rpx;
}
.zx-article-list-img2-in {
	width: 335rpx;
	height: 200rpx;
	margin-top: 22rpx;
}
.zx-article-list-img3-in {
	width: 220rpx;
	height: 150rpx;
	margin-top: 22rpx;
}
.zx-article-list-footer {
	margin-top: 20rpx;
}
.zx-article-list-footer-items {
	width: 220rpx;
	height: 50rpx;
	line-height: 50rpx;
	font-size: 26rpx;
	overflow: hidden;
}
.zx-block-text, .zx-block{display:block;}

/* #ifndef APP-NVUE */
.zx-flex{display:flex;}
.zx-border-box{box-sizing:border-box;}
.zx-body{width:750rpx; box-sizing:border-box;}
/* #endif */

/* flex 布局 */
.zx-rows, .zx-row{flex-direction:row !important;}
.zx-columns, .zx-column{flex-direction:column !important;}
.zx-wrap{flex-direction:row !important; flex-wrap:wrap !important;}
.zx-nowrap{flex-direction:row !important; flex-wrap:nowrap !important;}
.zx-space-around{justify-content:space-around !important;}
.zx-space-between{justify-content:space-between !important;}
.zx-justify-content-start{justify-content:flex-start !important;}
.zx-justify-content-center{justify-content:center !important;}
.zx-justify-content-end{justify-content:flex-end !important;}
.zx-align-items-start{align-items:flex-start !important;}
.zx-align-items-center{align-items:center !important;}
.zx-align-items-end{align-items:flex-end !important;}
.zx-flex1{flex:1 !important;}
/* #ifndef APP-NVUE */
.zx-flex-shrink0{flex-shrink:0 !important;}
.zx-flex-shrink1{flex-shrink:1 !important;}
/* #endif */
</style>

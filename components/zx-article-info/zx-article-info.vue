<template>
	<view
		class="zx-editor-show zx-border-box"
		:style="{
			paddingLeft: padding + 'rpx',
			paddingRight: padding + 'rpx',
			width: '100%'
		}"
	>
		<view v-for="(item, index) in article" :key="index">
			<!-- 文本 -->
			<text class="zx-block" :decode="true" :selectable="true" :user-select="true" :class="textClass" v-if="item.type == 'txt'">{{ item.content }}</text>

			<!-- 居中 -->
			<text class="zx-block zx-text-center" :class="centerClass" :selectable="true" :user-select="true" :decode="true" v-if="item.type == 'center'">
				{{ item.content }}
			</text>

			<!-- 图片 -->
			<view class="zx-img-in" v-else-if="item.type == 'img'" :data-url="item.content" @tap="showImgs">
				<zx-image :src="item.content" :height="0" :borderRadius="imgRadius" :width="750 - padding * 2"></zx-image>
			</view>

			<!-- 引用 源码 -->
			<text class="zx-block" :class="quoteClass" :selectable="true" :user-select="true" :decode="true" v-else-if="item.type == 'quote' || item.type == 'pre'">
				{{ item.content }}
			</text>

			<!-- 加粗 -->
			<text class="zx-block zx-bold" :class="strongClass" :selectable="true" :user-select="true" :decode="true" v-else-if="item.type == 'strong'">{{ item.content }}</text>

			<!-- 链接 -->
			<view v-else-if="item.type == 'link'"><zx-link :url="item.content" :title="item.content"></zx-link></view>

			<!-- 分割符 -->
			<text class="zx-block zx-text-center" :class="splineClass" :selectable="true" :user-select="true" v-else-if="item.type == 'spline'">● ● ●</text>

			<!-- h1 -->
			<text class="zx-block zx-h1 zx-primary-text" :decode="true" :selectable="true" :user-select="true" v-else-if="item.type == 'h1'">{{ item.content }}</text>

			<!-- h2 -->
			<text class="zx-block zx-h2 zx-primary-text" :selectable="true" :user-select="true" :decode="true" v-else-if="item.type == 'h2'">{{ item.content }}</text>

			<!-- h3 -->
			<text class="zx-block zx-h3 zx-primary-text" :selectable="true" :user-select="true" :decode="true" v-else-if="item.type == 'h3'">{{ item.content }}</text>

			<!-- h4 -->
			<text class="zx-block zx-h4 zx-primary-text" :selectable="true" :user-select="true" :decode="true" v-else-if="item.type == 'h4'">{{ item.content }}</text>

			<!-- h5 -->
			<text class="zx-block zx-h5 zx-primary-text" :selectable="true" :user-select="true" :decode="true" v-else-if="item.type == 'h5'">{{ item.content }}</text>

			<!-- h6 -->
			<text class="zx-block zx-h6 zx-primary-text" :selectable="true" :user-select="true" :decode="true" v-else-if="item.type == 'h6'">{{ item.content }}</text>

			<!-- 视频 -->
			<view v-if="item.type == 'video'"><video :style="{ width: 720 - padding * 2 + 'rpx' }" :src="item.content" controls></video></view>

			<!-- 间距 -->
			<view :style="{ height: itemMargin }"></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'zx-article-info',
	props: {
		article: {
			type: Array,
			default: function() {
				return new Array();
			}
		},
		itemMargin: {
			type: String,
			default: '20rpx'
		},
		padding: {
			type: Number,
			default: 30
		},
		textClass: {
			type: Array,
			default: function() {
				return ['zx-article-text', 'zx-primary-text'];
			}
		},
		centerClass: {
			type: Array,
			default: function() {
				return ['zx-article-center', 'zx-primary-text'];
			}
		},
		imgRadius: {
			type: String,
			default: '6rpx'
		},
		quoteClass: {
			type: Array,
			default: function() {
				return ['zx-article-quote', 'zx-primary-text', 'zx-bg-gray', 'zx-dark-bg-level-2'];
			}
		},
		strongClass: {
			type: Array,
			default: function() {
				return ['zx-article-strong', 'zx-primary-text'];
			}
		},
		splineClass: {
			type: Array,
			default: function() {
				return ['zx-article-spline', 'zx-color-gray'];
			}
		}
	},
	methods: {
		showImgs: function(e) {
			var currentUrl = e.currentTarget.dataset.url;
			var imgs = [];
			var items = this.article;
			for (let i = 0; i < items.length; i++) {
				if (items[i].type == 'img') {
					imgs.push(items[i].content);
				}
			}
			uni.previewImage({
				urls: imgs,
				current: currentUrl
			});
		}
	}
};
</script>
<style lang="scss" scoped>
	/* 文本尺寸 */
	$zx-text:28rpx;
	$zx-text-small:22rpx;
	$zx-h1:80rpx;
	$zx-h2:60rpx;
	$zx-h3:45rpx;
	$zx-h4:36rpx;
	$zx-h5:32rpx;
	$zx-h6:30rpx;
/* 黑色 */
$dark-l1:rgba(50, 50, 50, 1);
$dark-l2:rgba(55, 55, 55, 1);
$dark-l3:rgba(59, 59, 59, 1);
$dark-l4:rgba(68, 68, 68, 1);
$dark-l5:rgba(100, 100, 100, 1);
$dark-l6:rgba(116, 116, 116, 1);
$dark-l7:rgba(129, 129, 129, 1);
$dark-l8:rgba(150, 150, 150, 1);
$dark-l9:rgba(135, 135, 135, 1);
$dark-l10:rgba(120, 120, 120, 1);
	
/* #ifndef APP-NVUE */
.zx-block {
	word-break: break-all;
}
/* #endif */
.zx-border-box{box-sizing:border-box;}
/* 文本对齐 */
.zx-text-left{text-align:left;}
.zx-text-center{text-align:center;}
.zx-text-right{text-align:right;}
.zx-ellipsis{overflow:hidden;}
.zx-img-in{font-size:0;}
/* 文本修饰 */
.zx-bold{font-weight:bold;} 
.zx-line-through{text-decoration:line-through;}
.zx-underline{text-decoration:underline;}
.zx-italic{font-style:italic;}
/* 文本尺寸 */
.zx-text{font-size:$zx-text;}
.zx-text-small{font-size:$zx-text-small;}
.zx-h1{font-size:$zx-h1;}
.zx-h2{font-size:$zx-h2;}
.zx-h3{font-size:$zx-h3;}
.zx-h4{font-size:$zx-h4;}
.zx-h5{font-size:$zx-h5;}
.zx-h6{font-size:$zx-h6;}

/* 核心文本颜 */
.zx-primary-text{color:$dark-l2;}
.zx-secondary-text{color:$dark-l4;}
.zx-third-text{color:$dark-l8;}

</style>

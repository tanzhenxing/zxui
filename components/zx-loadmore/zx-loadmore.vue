<template>
	<view
		class="zx-loadmore"
		:style="[customStyle,
			{
				backgroundColor: bgColor,
				marginBottom: marginBottom,
				marginTop: marginTop,
				height: height
			}
		]"
	>
		<zx-line v-if="line" length="140rpx" :color="lineColor" :hairline="false" :dashed="dashed"></zx-line>
		<!-- 加载中和没有更多的状态才显示两边的横线 -->
		<view :class="status == 'loadmore' || status == 'nomore' ? 'zx-more' : ''" class="zx-loadmore__content">
			<view class="zx-loadmore__content__icon-wrap" v-if="status === 'loading' && icon">
				<zx-loading-icon :color="iconColor" :size="iconSize" :mode="loadingIcon"></zx-loading-icon>
			</view>
			<!-- 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 -->
			<text
				class="zx-line-1"
				:style="[loadTextStyle]"
				:class="[status == 'nomore' && isDot == true ? 'zx-loadmore__content__dot-text' : 'zx-loadmore__content__text']"
				@tap="loadMore"
			>
				{{ showText }}
			</text>
		</view>
		<zx-line v-if="line" length="140rpx" :color="lineColor" :hairline="false" :dashed="dashed"></zx-line>
	</view>
</template>

<script>
/**
 * loadmore 加载更多
 * @description 此组件一般用于标识页面底部加载数据时的状态。
 * @tutorial https://zxui.org/components/loadMore
 * @property {String}			status			组件状态（默认 'loadmore' ）
 * @property {String}			bgColor			组件背景颜色，在页面是非白色时会用到（默认 'transparent' ）
 * @property {Boolean}			icon			加载中时是否显示图标（默认 true ）
 * @property {String | Number}	fontSize		字体大小（默认 14 ）
 * @property {String | Number}	iconSize		图标大小（默认 17 ）
 * @property {String}			color			字体颜色（默认 '#606266' ）
 * @property {String}			loadingIcon		加载图标（默认 'circle' ）
 * @property {String}			loadmoreText	加载前的提示语（默认 '加载更多' ）
 * @property {String}			loadingText		加载中提示语（默认 '正在加载...' ）
 * @property {String}			nomoreText		没有更多的提示语（默认 '没有更多了' ）
 * @property {Boolean}			isDot			到上一个相邻元素的距离 （默认 false ）
 * @property {String}			iconColor		加载中图标的颜色 （默认 '#b7b7b7' ）
 * @property {String}			lineColor		线条颜色（默认 #E6E8EB ）
 * @property {String | Number}	marginTop		上边距 （默认 10 ）
 * @property {String | Number}	marginBottom	下边距 （默认 10 ）
 * @property {String | Number}	height			高度，单位px （默认 'auto' ）
 * @property {Boolean}			line			是否显示左边分割线  （默认 false ）
 * @property {Boolean}			dashed		// 是否虚线，true-虚线，false-实线  （默认 false ）
 * @event {Function} loadmore status为loadmore时，点击组件会发出此事件
 * @example <zx-loadmore :status="status" icon-type="iconType" load-text="loadText" />
 */
export default {
	name: 'zx-loadmore',
	props: {
	    // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
	    status: {
	        type: String,
	        default: 'loadmore'
	    },
	    // 组件背景色
	    bgColor: {
	        type: String,
	        default: 'transparent'
	    },
	    // 是否显示加载中的图标
	    icon: {
	        type: Boolean,
	        default: true
	    },
	    // 字体大小
	    fontSize: {
	        type: [String, Number],
	        default: '28rpx'
	    },
		    // 图标大小
	    iconSize: {
	        type: [String, Number],
	        default: '34rpx'
	    },
	    // 字体颜色
	    color: {
	        type: String,
	        default: '#606266'
	    },
	    // 加载中状态的图标，spinner-花朵状图标，circle-圆圈状，semicircle-半圆
	    loadingIcon: {
	        type: String,
	        default: 'circle'
	    },
	    // 加载前的提示语
	    loadmoreText: {
	        type: String,
	        default: '加载更多'
	    },
	    // 加载中提示语
	    loadingText: {
	        type: String,
	        default: '正在加载...'
	    },
	    // 没有更多的提示语
	    nomoreText: {
	        type: String,
	        default: '没有更多了'
	    },
	    // 在“没有更多”状态下，是否显示粗点
	    isDot: {
	        type: Boolean,
	        default: false
	    },
	    // 加载中图标的颜色
	    iconColor: {
	        type: String,
	        default: '#b7b7b7'
	    },
	    // 上边距
	    marginTop: {
	        type: [String, Number],
	        default: '10rpx'
	    },
	    // 下边距
	    marginBottom: {
	        type: [String, Number],
	        default: '10rpx'
	    },
	    // 高度，单位px
	    height: {
	        type: [String, Number],
	        default: 'auto'
	    },
	    // 是否显示左边分割线
	    line: {
	        type: Boolean,
	        default: false
	    },
	    // 线条颜色
	    lineColor: {
	        type: String,
	        default: '#E6E8EB'
	    },
	    // 是否虚线，true-虚线，false-实线
	    dashed: {
	        type: Boolean,
	        default: false
	    },
		customStyle: {
			type: Object,
			default: ()=>{
				return {}
			}
		}
	},
	data() {
		return {
			// 粗点
			dotText: '●'
		};
	},
	computed: {
		// 加载的文字显示的样式
		loadTextStyle() {
			return {
				color: this.color,
				fontSize: this.fontSize,
				lineHeight: this.fontSize,
				backgroundColor: this.bgColor
			};
		},
		// 显示的提示文字
		showText() {
			let text = '';
			if (this.status == 'loadmore') text = this.loadmoreText;
			else if (this.status == 'loading') text = this.loadingText;
			else if (this.status == 'nomore' && this.isDot) text = this.dotText;
			else text = this.nomoreText;
			return text;
		}
	},
	methods: {
		loadMore() {
			// 只有在“加载更多”的状态下才发送点击事件，内容不满一屏时无法触发底部上拉事件，所以需要点击来触发
			if (this.status == 'loadmore') this.$emit('loadmore');
		}
	}
};
</script>

<style lang="scss" scoped>
$zx-content-color:#606266;
$zx-tips-color:#909193;

.zx-loadmore {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex: 1;

	&__content {
		margin: 0 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		&__icon-wrap {
			margin-right: 8px;
		}

		&__text {
			font-size: 14px;
			color: $zx-content-color;
		}

		&__dot-text {
			font-size: 15px;
			color: $zx-tips-color;
		}
	}
}
</style>

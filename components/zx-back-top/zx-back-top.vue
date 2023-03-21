<template>
	<zx-transition :show="show" mode="fade" :customStyle="backTopStyle">
		<view class="zx-back-top" :style="[contentStyle]" @click="backToTop">
			<zx-icon :name="icon" :customStyle="iconStyle" color="#ffffff" size="40rpx"></zx-icon>
			<text v-if="text!==''" style="color: #ffffff;font-size: 28rpx;line-height: 25rpx;">{{text}}</text>
		</view>
	</zx-transition>
</template>

<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif
/**
 * backTop 返回顶部
 * @description 返回顶部按钮，方便快速返回顶部的场景。
 * @tutorial https://zxui.org/components/backTop
 * @property {String}			mode  		返回顶部的形状，circle-圆形，square-方形 
 * @property {String} 			icon 		自定义图标
 * @property {String} 			text 		提示文字
 * @property {String | Number}  duration	返回顶部滚动时间 （默认 100）
 * @property {String | Number}  scrollTop	滚动距离 （默认 0 ）
 * @property {String | Number}  top  		距离顶部多少距离显示，单位px （默认 400 ）
 * @property {String | Number}  bottom  	返回顶部按钮到底部的距离，单位px （默认 100 ）
 * @property {String | Number}  right  		返回顶部按钮到右边的距离，单位px （默认 20 ）
 * @property {String | Number}  zIndex 		层级   （默认 9 ）
 * @property {Object<Object>}  	iconStyle 	图标的样式，对象形式   （默认 {color: '#909399',fontSize: '19px'}）
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @example <zx-back-top :scrollTop="scrollTop"></zx-back-top>
 */
export default {
	name: 'zx-back-top',
	props: {
	    // 返回顶部的形状，circle-圆形，square-方形
	    mode: {
	        type: String,
	        default: 'circle'
	    },
		bgColor: {
			type: String,
			default: '#3b3b3b'
		},
	    // 自定义图标
	    icon: {
	        type: String,
	        default: 'arrow-upward'
	    },
	    // 提示文字
	    text: {
	        type: String,
	        default: ''
	    },
	    // 返回顶部滚动时间
	    duration: {
	        type: [String, Number],
	        default: 300
	    },
	    // 滚动距离
	    scrollTop: {
	        type: [String, Number],
	        default: 0
	    },
	    // 距离顶部多少距离显示
	    top: {
	        type: [String, Number],
	        default: 300
	    },
	    // 返回顶部按钮到底部的距离
	    bottom: {
	        type: [String, Number],
	        default: '100rpx'
	    },
	    // 返回顶部按钮到右边的距离
	    right: {
	        type: [String, Number],
	        default: '50rpx'
	    },
	    // 层级
	    zIndex: {
	        type: [String, Number],
	        default: 9
	    },
	    // 图标的样式，对象形式
	    iconStyle: {
	        type: Object,
	        default: function(){
				return {};
			}
	    },
		customStyle: {
			type: Object,
			default: function(){
				return {};
			}
		}
	},
	computed: {
		backTopStyle() {
			// 动画组件样式
			const style = {
				bottom: this.bottom,
				right: this.right,
				width: '100rpx',
				height: '100rpx',
				position: 'fixed',
				zIndex: 10000
			};
			return style;
		},
		show() {
			return this.scrollTop > this.top;
		},
		contentStyle() {
			const style = {};
			let radius = 0;
			// 是否圆形
			if (this.mode === 'circle') {
				radius = '50%';
			} else {
				radius = '10rpx';
			}
			// 为了兼容安卓nvue，只能这么分开写
			style.borderTopLeftRadius = radius;
			style.borderTopRightRadius = radius;
			style.borderBottomLeftRadius = radius;
			style.borderBottomRightRadius = radius;
			style.backgroundColor = '#999999';
			return style;
		}
	},
	methods: {
		backToTop() {
			// #ifdef APP-NVUE
			if (!this.$parent.$refs['zx-back-top']) {
				//uni.$u.error(`nvue页面需要给页面最外层元素设置"ref='zx-back-top'`);
			}
			dom.scrollToElement(this.$parent.$refs['zx-back-top'], {
				offset: 0
			});
			// #endif

			// #ifndef APP-NVUE
			uni.pageScrollTo({
				scrollTop: 0,
				duration: this.duration
			});
			// #endif
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$zx-back-top-flex: 1 !default;
$zx-back-top-height: 100% !default;
$zx-back-top-background-color: #ececec !default;
$zx-back-top-tips-font-size: 12px !default;
.zx-back-top {
	@include flex;
	flex-direction: column;
	align-items: center;
	flex: $zx-back-top-flex;
	height: $zx-back-top-height;
	justify-content: center;
	background-color: $zx-back-top-background-color;

	.tips {
		font-size: $zx-back-top-tips-font-size;
		transform: scale(0.8);
	}
	
	.text {
		
	}
}
</style>

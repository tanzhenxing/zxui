<template>
	<view class="zx-notice" @tap="clickHandler">
		<slot name="icon">
			<view v-if="icon" class="zx-notice__left-icon">
				<zx-icon :name="icon" :color="color" size="19"></zx-icon>
			</view>
		</slot>
		<swiper :disable-touch="disableTouch" :vertical="step ? false : true" circular :interval="duration" :autoplay="true" class="zx-notice__swiper" @change="noticeChange">
			<swiper-item v-for="(item, index) in text" :key="index" class="zx-notice__swiper__item">
				<text class="zx-notice__swiper__item__text zx-line-1" :style="[textStyle]">{{ item }}</text>
			</swiper-item>
		</swiper>
		<view class="zx-notice__right-icon" v-if="['link', 'closable'].includes(mode)">
			<zx-icon v-if="mode === 'link'" name="arrow-right" :size="17" :color="color"></zx-icon>
			<zx-icon v-if="mode === 'closable'" name="close" :size="16" :color="color" @click="close"></zx-icon>
		</view>
	</view>
</template>

<script>
import util from '../../libs/js/util.js';
	
/**
 * ColumnNotice 滚动通知中的垂直滚动 内部组件
 * @description 该组件用于滚动通告场景，是其中的垂直滚动方式
 * @tutorial https://zxui.org/components/noticeBar
 * @property {Array}			text 			显示的内容，字符串
 * @property {String}			icon 			是否显示左侧的音量图标 （ 默认 'volume' ）
 * @property {String}			mode 			通告模式，link-显示右箭头，closable-显示右侧关闭图标
 * @property {String}			color 			文字颜色，各图标也会使用文字颜色 （ 默认 '#f9ae3d' ）
 * @property {String}			bgColor 		背景颜色 （ 默认 '#fdf6ec' ）
 * @property {String | Number}	fontSize		字体大小，单位px  （ 默认 14 ）
 * @property {String | Number}	speed			水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度 （ 默认 80 ）
 * @property {Boolean}			step			direction = row时，是否使用步进形式滚动 （ 默认 false ）
 * @property {String | Number}	duration		滚动一个周期的时间长，单位ms （ 默认 1500 ）
 * @property {Boolean}			disableTouch	是否禁止用手滑动切换   目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序 （ 默认 true ）
 * @example
 */
export default {
	name: 'zx-column-notice',
	props: {
	    // 显示的内容，字符串
	    text: {
	        type: [Array],
	        default: ()=>{
				return []
			}
	    },
	    // 是否显示左侧的音量图标
	    icon: {
	        type: String,
	        default: 'volume'
	    },
	    // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
	    mode: {
	        type: String,
	        default: ''
	    },
	    // 文字颜色，各图标也会使用文字颜色
	    color: {
	        type: String,
	        default: '#f9ae3d'
	    },
	    // 背景颜色
	    bgColor: {
	        type: String,
	        default: '#fdf6ec'
	    },
	    // 字体大小，单位px
	    fontSize: {
	        type: [String, Number],
	        default: '28rpx'
	    },
	    // 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
	    speed: {
	        type: [String, Number],
	        default: 50
	    },
	    // direction = row时，是否使用步进形式滚动
	    step: {
	        type: Boolean,
	        default: false
	    },
	    // 滚动一个周期的时间长，单位ms
	    duration: {
	        type: [String, Number],
	        default: 3000
	    },
	    // 是否禁止用手滑动切换
	    // 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
	    disableTouch: {
	        type: Boolean,
	        default: true
	    }
	},
	computed: {
		// 文字内容的样式
		textStyle() {
			let style = {};
			style.color = this.color;
			style.fontSize = this.fontSize;
			return style;
		},
		// 垂直或者水平滚动
		vertical() {
			if (this.mode == 'horizontal'){
				return false;
			} else {
				return true;
			}
		}
	},
	data() {
		return {
			index: 0
		};
	},
	methods: {
		noticeChange(e) {
			this.index = e.detail.current;
		},
		// 点击通告栏
		clickHandler() {
			this.$emit('click', this.index);
		},
		// 点击关闭按钮
		close() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../theme.scss';
	
.zx-notice {
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__left-icon {
		align-items: center;
		margin-right: 5px;
	}

	&__right-icon {
		margin-left: 5px;
		align-items: center;
	}

	&__swiper {
		height: 16px;
		display: flex;
		align-items: center;
		flex: 1;

		&__item {
			display: flex;
			align-items: center;
			overflow: hidden;

			&__text {
				font-size: 14px;
				color: $zx-warning;
			}
		}
	}
}
</style>

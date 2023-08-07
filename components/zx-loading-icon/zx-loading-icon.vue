<template>
	<view v-if="show" class="zx-loading-icon" :style="customStyle" :class="[vertical && 'zx-loading-icon--vertical']">
		<view v-if="!webviewHide"
			class="zx-loading-icon__spinner"
			:class="[`zx-loading-icon__spinner--${mode}`]"
			ref="ani"
			:style="{
				color: color,
				width: size,
				height: size,
				borderTopColor: color,
				borderBottomColor: otherBorderColor,
				borderLeftColor: otherBorderColor,
				borderRightColor: otherBorderColor,
				'animation-duration': `${duration}ms`,
				'animation-timing-function': mode === 'semicircle' || mode === 'circle' ? timingFunction : ''
			}">
			<block v-if="mode === 'spinner'">
				<!-- #ifndef APP-NVUE -->
				<view v-for="(item, index) in array12" :key="index" class="zx-loading-icon__dot"></view>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<!-- 此组件内部图标部分无法设置宽高，即使通过width和height配置了也无效 -->
				<loading-indicator v-if="!webviewHide"
					class="zx-loading-indicator"
					:animating="true"
					:style="{color: color,width: size,height: size}" />
				<!-- #endif -->
			</block>
		</view>
		<text v-if="text" class="zx-loading-icon__text" :style="{fontSize: textSize,color: textColor}">
			{{ text }}
		</text>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif
/**
 * loading 加载动画
 * @description 警此组件为一个小动画，目前用在uView的loadmore加载更多和switch开关等组件的正在加载状态场景。
 * @tutorial https://zxui.org/components/loading
 * @property {Boolean}			show			是否显示组件  (默认 true)
 * @property {String}			color			动画活动区域的颜色，只对 mode = flower 模式有效
 * @property {String}			textColor		提示文本的颜色
 * @property {Boolean}			vertical		文字和图标是否垂直排列 (默认 false )
 * @property {String}			mode			模式选择，见官网说明（默认 'circle' ）
 * @property {String | Number}	size			加载图标的大小，单位px （默认 24 ）
 * @property {String | Number}	textSize		文字大小（默认 15 ）
 * @property {String | Number}	text			文字内容
 * @property {String}			timingFunction	动画模式 （默认 'ease-in-out' ）
 * @property {String | Number}	duration		动画执行周期时间（默认 1200）
 * @property {String}			inactiveColor	mode=circle时的暗边颜色
 * @property {Object}			customStyle		定义需要用到的外部样式
 * @example <zx-loading-icon mode="circle"></zx-loading-icon>
 */
export default {
	name: 'zx-loading-icon',
	props: {
		// 是否显示组件
		show: {
			type: Boolean,
			default: true
		},
		// 颜色
		color: {
			type: String,
			default: '#ffffff'
		},
		// 提示文字颜色
		textColor: {
			type: String,
			default: '#909193'
		},
		// 文字和图标是否垂直排列
		vertical: {
		 type: Boolean,
			default: false
		},
		// 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
		mode: {
			type: String,
			default: 'circle'
		},
		// 图标大小，单位默认px
		size: {
			type: [String, Number],
			default: '60rpx'
		},
		// 文字大小
		textSize: {
			type: [String, Number],
			default: '30rpx'
		},
		// 文字内容
		text: {
			type: [String, Number],
			default: ''
		},
		// 动画模式
		timingFunction: {
			type: String,
			default: 'ease-in-out'
		},
		// 动画执行周期时间
		duration: {
			type: [String, Number],
			default: 1200
		},
		// mode=circle时的暗边颜色
		inactiveColor: {
			type: String,
			default: 'transparent'
		},
		customStyle: {
			type: Object,
			default: function(){
				return {};
			}
		}
	},
	data() {
		return {
			// Array.form可以通过一个伪数组对象创建指定长度的数组
			// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
			array12: Array.from({
				length: 12
			}),
			// 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
			// 在iOS nvue上，则会一开始默认执行两个周期的动画
			aniAngel: 360, // 动画旋转角度
			webviewHide: false, // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
			loading: false // 是否运行中，针对nvue使用
		};
	},
	computed: {
		// 当为circle类型时，给其另外三边设置一个更轻一些的颜色
		// 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
		// 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
		otherBorderColor() {
			//const lightColor = uni.$u.colorGradient(this.color, '#ffffff', 100)[80];
			const lightColor = '';
			if (this.mode === 'circle') {
				return this.inactiveColor ? this.inactiveColor : lightColor;
			} else {
				return 'transparent';
			}
			// return this.mode === 'circle' ? this.inactiveColor ? this.inactiveColor : lightColor : 'transparent'
		}
	},
	watch: {
		show(n) {
			// nvue中，show为true，且为非loading状态，就重新执行动画模块
			// #ifdef APP-NVUE
			if (n && !this.loading) {
				setTimeout(() => {
					this.startAnimate();
				}, 30);
			}
			// #endif
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			setTimeout(() => {
				// #ifdef APP-NVUE
				this.show && this.nvueAnimate();
				// #endif
				// #ifdef APP-PLUS
				this.show && this.addEventListenerToWebview();
				// #endif
			}, 20);
		},
		// 监听webview的显示与隐藏
		addEventListenerToWebview() {
			// webview的堆栈
			const pages = getCurrentPages();
			// 当前页面
			const page = pages[pages.length - 1];
			// 当前页面的webview实例
			const currentWebview = page.$getAppWebview();
			// 监听webview的显示与隐藏，从而停止或者开始动画(为了性能)
			currentWebview.addEventListener('hide', () => {
				this.webviewHide = true;
			});
			currentWebview.addEventListener('show', () => {
				this.webviewHide = false;
			});
		},
		// #ifdef APP-NVUE
		nvueAnimate() {
			// nvue下，非spinner类型时才需要旋转，因为nvue的spinner类型，使用了weex的
			// loading-indicator组件，自带旋转功能
			this.mode !== 'spinner' && this.startAnimate();
		},
		// 执行nvue的animate模块动画
		startAnimate() {
			this.loading = true;
			const ani = this.$refs.ani;
			if (!ani) return;
			animation.transition(
				ani,
				{
					// 进行角度旋转
					styles: {
						transform: `rotate(${this.aniAngel}deg)`,
						transformOrigin: 'center center'
					},
					duration: this.duration,
					timingFunction: this.timingFunction
					// delay: 10
				},
				() => {
					// 每次增加360deg，为了让其重新旋转一周
					this.aniAngel += 360;
					// 动画结束后，继续循环执行动画，需要同时判断webviewHide变量
					// nvue安卓，页面隐藏后依然会继续执行startAnimate方法
					this.show && !this.webviewHide ? this.startAnimate() : (this.loading = false);
				}
			);
		}
		// #endif
	}
};
</script>

<style lang="scss" scoped>
.zx-loading-icon {
	/* #ifndef APP-NVUE */
	// display: inline-flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: #ffffff;

	&__text {
		margin-left: 10rpx;
		color: #606266;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	&__spinner {
		width: 60rpx;
		height: 60rpx;
		position: relative;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		max-width: 100%;
		max-height: 100%;
		animation: zx-rotate 1s linear infinite;
		/* #endif */
	}

	&__spinner--semicircle {
		border-width: 5rpx;
		border-color: transparent;
		border-top-right-radius: 50%;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		border-style: solid;
	}

	&__spinner--circle {
		border-top-right-radius: 50%;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		border-width: 5rpx;
		border-top-color: #e5e5e5;
		border-right-color: #e5e5e5;
		border-bottom-color: #e5e5e5;
		border-left-color: #e5e5e5;
		border-style: solid;
	}

	&--vertical {
		flex-direction: column;
	}
}



/* #ifndef APP-NVUE */
:host {
	font-size: 0px;
	line-height: 1;
}

.zx-loading-icon {
	&__spinner--spinner {
		animation-timing-function: steps(12);
	}

	&__text:empty {
		display: none;
	}

	&--vertical &__text {
		margin: 15rpx 0 0 ;
		color: #606266;
	}

	&__dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		&:before {
			display: block;
			width: 5rpx;
			height: 25% ;
			margin: 0 auto;
			background-color: '#ffffff';
			border-radius: 40%;
			content: ' ';
		}
	}
}

@for $i from 1 through 12 {
	.zx-loading-icon__dot:nth-of-type(#{$i}) {
		transform: rotate($i * 30deg);
		opacity: 1 - 0.0625 * ($i - 1);
	}
}

@keyframes zx-rotate {
	0% {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(1turn);
	}
}

/* #endif */
</style>

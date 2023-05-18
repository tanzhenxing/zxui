<template>
	<view class="zx-toast">
		<zx-overlay :show="isShow" :custom-style="overlayStyle">
			<view class="zx-toast__content" :style="[contentStyle]"
				:class="['zx-type-' + type, type === 'loading' || loading ? 'zx-toast__content--loading' : '']">
				<zx-loading-icon v-if="type === 'loading'" mode="circle" color="rgb(255, 255, 255)" inactiveColor="rgb(120, 120, 120)" size="25"></zx-loading-icon>
				<zx-icon v-if="type !== 'loading'" :name="icon" size="34rpx" :color="type" :customStyle="iconStyle"></zx-icon>
				<zx-gap v-if="type === 'loading' || loading" height="12" bgColor="transparent"></zx-gap>
				<text class="zx-toast__content__text" :class="['zx-toast__content__text--' + type]" style="max-width: 400rpx;">{{ message }}</text>
			</view>
		</zx-overlay>
	</view>
</template>

<script>
/**
 * toast 消息提示
 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
 * @tutorial https://zxui.org/components/toast
 * @property {String | Number}	zIndex		toast展示时的zIndex值 (默认 10090 )
 * @property {Boolean}			loading		是否加载中 （默认 false ）
 * @property {String | Number}	message		显示的文字内容
 * @property {String}			icon		图标，或者绝对路径的图片
 * @property {String}			type		主题类型 （默认 default）
 * @property {Boolean}			show		是否显示该组件 （默认 false）
 * @property {Boolean}			overlay		是否显示透明遮罩，防止点击穿透 （默认 false ）
 * @property {String}			position	位置 （默认 'center' ）
 * @property {Object}			params		跳转的参数
 * @property {String | Number}  duration	展示时间，单位ms （默认 2000 ）
 * @property {Boolean}			isTab		是否返回的为tab页面 （默认 false ）
 * @property {String}			url			toast消失后是否跳转页面，有则跳转，优先级高于back参数
 * @property {Boolean}			back		结束toast是否自动返回上一页 （默认 false ）
 * @property {Object}			customStyle	组件的样式，对象形式
 * @event {Function}            show        显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
 * @example <zx-toast ref="toast"></zx-toast>
 */
export default {
	name: 'zx-toast',
	props: {
		// 'primary', 'success', 'error', 'warning', 'default', 'loading'
		type: {
			type: String,
			default: ''
		},
		zIndex: {
			type: [String,Number],
			default: '10090'
		},
		 // 是否加载中状态
		loading: {
			type: Boolean,
			default: false
		},
		// 显示文本
		message: {
			type: String,
			default: ''
		},
		// 显示的图标
		icon: {
			type: String,
			default: 'none'
		},
		// 是否防止触摸穿透
		overlay: {
			type: Boolean,
			default: false
		},
		// toast出现的位置
		position: {
			type: String,
			default: ''
		},
		params: {
			type: Object,
			default: function(){
				return {};
			}
		},
		// 显示的时间，毫秒
		duration: {
			type: [String,Number],
			default: 2000
		},
		isTab: {
			type: Boolean,
			default: false
		},
		url: {
			type: String,
			default: ''
		},
		back: {
			type: String,
			default: ''
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
			isShow: false,
			timer: null, // 定时器
		};
	},
	computed: {
		overlayStyle() {
			const style = {
				justifyContent: 'center',
				alignItems: 'center',
				display: 'flex'
			};
			// 将遮罩设置为100%透明度，避免出现灰色背景
			style.backgroundColor = 'rgba(0, 0, 0, 0)';
			return style;
		},
		iconStyle() {
			const style = {};
			// 图标需要一个右边距，以跟右边的文字有隔开的距离
			style.marginRight = '4px';
			// #ifdef APP-NVUE
			// iOSAPP下，图标有1px的向下偏移，这里进行修正
			if (uni.getSystemInfoSync().platform.toLowerCase() === 'ios') {
				style.marginTop = '-1px';
			}
			// #endif
			return style;
		},
		// 内容盒子的样式
		contentStyle() {
			const windowHeight = uni.getSystemInfoSync().windowHeight,style = {};
			let value = 0;
			// 根据top和bottom，对Y轴进行窗体高度的百分比偏移
			if (this.position === 'top') {
				value = -windowHeight * 0.25;
			} else if (this.position === 'bottom') {
				value = windowHeight * 0.25;
			}
			style.transform = `translateY(${value}px)`;
			return style;
		}
	},
	created() {
		
	},
	methods: {
		// 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
		show(options) {
			// 清除定时器
			this.clearTimer();
			this.isShow = true;
			this.timer = setTimeout(() => {
				// 倒计时结束，清除定时器，隐藏toast组件
				this.clearTimer();
			}, this.duration);
		},
		// 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
		hide() {
			this.clearTimer();
		},
		clearTimer() {
			this.isShow = false;
			// 清除定时器
			clearTimeout(this.timer);
			this.timer = null;
		}
	},
	beforeDestroy() {
		this.clearTimer();
	}
};
</script>

<style lang="scss" scoped>
$zx-toast-color: #fff !default;
$zx-toast-border-radius: 4px !default;
$zx-toast-border-background-color: #585858 !default;
$zx-toast-border-font-size: 14px !default;
$zx-toast-border-padding: 12px 20px !default;
$zx-toast-loading-border-padding: 20px 20px !default;
$zx-toast-content-text-color: #fff !default;
$zx-toast-content-text-font-size: 15px !default;
$zx-toast-u-icon: 10rpx !default;
$zx-toast-zx-type-primary-color: #3c9cff !default;
$zx-toast-zx-type-primary-background-color: #ecf5ff !default;
$zx-toast-zx-type-primary-border-color: rgb(215, 234, 254) !default;
$zx-toast-zx-type-primary-border-width: 1px !default;
$zx-toast-zx-type-success-color: #5ac725 !default;
$zx-toast-zx-type-success-background-color: #dbf1e1 !default;
$zx-toast-zx-type-success-border-color: #bef5c8 !default;
$zx-toast-zx-type-success-border-width: 1px !default;
$zx-toast-zx-type-error-color: #f56c6c !default;
$zx-toast-zx-type-error-background-color: #fef0f0 !default;
$zx-toast-zx-type-error-border-color: #fde2e2 !default;
$zx-toast-zx-type-error-border-width: 1px !default;
$zx-toast-zx-type-warning-color: #f9ae3d !default;
$zx-toast-zx-type-warning-background-color: #fdf6ec !default;
$zx-toast-zx-type-warning-border-color: #faecd8 !default;
$zx-toast-zx-type-warning-border-width: 1px !default;
$zx-toast-zx-type-default-color: #fff !default;
$zx-toast-zx-type-default-background-color: #585858 !default;

.zx-toast {
	&__content {
		display: flex;
		padding: $zx-toast-border-padding;
		border-radius: $zx-toast-border-radius;
		background-color: $zx-toast-border-background-color;
		color: $zx-toast-color;
		align-items: center;
		/* #ifndef APP-NVUE */
		max-width: 600rpx;
		/* #endif */
		position: relative;

		&--loading {
			flex-direction: column;
			padding: $zx-toast-loading-border-padding;
		}

		&__text {
			color: $zx-toast-content-text-color;
			font-size: $zx-toast-content-text-font-size;
			line-height: $zx-toast-content-text-font-size;

			&--default {
				color: $zx-toast-content-text-color;
			}

			&--error {
				color: #f56c6c;
			}

			&--primary {
				color: #3c9cff;
			}

			&--success {
				color: #5ac725;
			}

			&--warning {
				color: #f9ae3d;
			}
		}
	}
}

.zx-type-primary {
	color: $zx-toast-zx-type-primary-color;
	background-color: $zx-toast-zx-type-primary-background-color;
	border-color: $zx-toast-zx-type-primary-border-color;
	border-width: $zx-toast-zx-type-primary-border-width;
}

.zx-type-success {
	color: $zx-toast-zx-type-success-color;
	background-color: $zx-toast-zx-type-success-background-color;
	border-color: $zx-toast-zx-type-success-border-color;
	border-width: 1px;
}

.zx-type-error {
	color: $zx-toast-zx-type-error-color;
	background-color: $zx-toast-zx-type-error-background-color;
	border-color: $zx-toast-zx-type-error-border-color;
	border-width: $zx-toast-zx-type-error-border-width;
}

.zx-type-warning {
	color: $zx-toast-zx-type-warning-color;
	background-color: $zx-toast-zx-type-warning-background-color;
	border-color: $zx-toast-zx-type-warning-border-color;
	border-width: 1px;
}

.zx-type-default {
	color: $zx-toast-zx-type-default-color;
	background-color: $zx-toast-zx-type-default-background-color;
}
</style>

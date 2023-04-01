<template>
	<zx-transition mode="fade" :show="show" :duration="fade ? 1000 : 0">
		<view class="zx-image" :style="[wrapStyle, backgroundStyle]" @tap="onClick">
			<view v-if="!isError" class="zx-lazyload__box">
				<image class="zx-lazyload__img"
				:style="{borderRadius: shape == 'circle' ? '10000px' : radius,width: width,height: height}"
					:src="showImg?src:''"
					:mode="mode" 
					:webp="webp" 
					:show-menu-by-longpress="showMenuByLongpress"
					:id="elId"
					@load="onLoadHandler" 
					@error="onErrorHandler">
				</image>
			</view>
			<view v-if="showLoading && loading"
				class="zx-image__loading"
				:style="{
					borderRadius: shape == 'circle' ? '50%' : radius,
					backgroundColor: this.bgColor,
					width: width,
					height: height
				}">
				<slot name="loading">
					<zx-icon :name="loadingIcon" :width="width" :height="height" size="60rpx"></zx-icon>
				</slot>
			</view>
			<view v-if="showError && isError && !loading"
				class="zx-image__error"
				:style="{
					borderRadius: shape == 'circle' ? '50%' : radius,
					width: width,
					height: height
				}">
				<slot name="error">
					<zx-icon :name="errorIcon" :width="width" :height="height" size="60rpx"></zx-icon>
				</slot>
			</view>
		</view>
	</zx-transition>
</template>

<script>
/**
 * Image 图片
 * @description 此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。
 * @tutorial https://zui.org/components/image
 * @property {String}			src 				图片地址
 * @property {String}			mode 				裁剪模式，见官网说明 （默认 'aspectFill' ）
 * @property {String | Number}	width 				宽度，单位任意，如果为数值，则为px单位 （默认 '300' ）
 * @property {String | Number}	height 				高度，单位任意，如果为数值，则为px单位 （默认 '225' ）
 * @property {String}			shape 				图片形状，circle-圆形，square-方形 （默认 'square' ）
 * @property {String | Number}	radius		 		圆角值，单位任意，如果为数值，则为px单位 （默认 0 ）
 * @property {Boolean}			lazyLoad			是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效 （默认 true ）
 * @property {Boolean}			showMenuByLongpress	是否开启长按图片显示识别小程序码菜单，仅微信小程序有效 （默认 true ）
 * @property {String}			loadingIcon 		加载中的图标，或者小图片 （默认 'photo' ）
 * @property {String}			errorIcon 			加载失败的图标，或者小图片 （默认 'error-circle' ）
 * @property {Boolean}			showLoading 		是否显示加载中的图标或者自定义的slot （默认 true ）
 * @property {Boolean}			showError 			是否显示加载错误的图标或者自定义的slot （默认 true ）
 * @property {Boolean}			fade 				是否需要淡入效果 （默认 true ）
 * @property {Boolean}			webp 				只支持网络资源，只对微信小程序有效 （默认 false ）
 * @property {String | Number}	duration 			搭配fade参数的过渡时间，单位ms （默认 500 ）
 * @property {String}			bgColor 			背景颜色，用于深色页面加载图片时，为了和背景色融合  (默认 '#f3f4f6' )
 * @property {Object}			customStyle  		定义需要用到的外部样式
 * @event {Function}	click	点击图片时触发
 * @event {Function}	error	图片加载失败时触发
 * @event {Function} load 图片加载成功时触发
 * @example <zx-image width="100%" height="300px" :src="src"></zx-image>
 */
export default {
	name: 'zx-image',
	options: {
		virtualHost: true
	},
	props: {
	    // 图片地址
	    src: {
	        type: String,
	        default: ''
	    },
	    // 裁剪模式
	    mode: {
	        type: String,
	        default: 'aspectFill'
	    },
	    // 宽度，单位任意
	    width: {
	        type: [String, Number],
	        default: '100%'
	    },
	    // 高度，单位任意
	    height: {
	        type: [String, Number],
	        default: '300rpx'
	    },
	    // 图片形状，circle-圆形，square-方形
	    shape: {
	        type: String,
	        default: 'square'
	    },
	    // 圆角，单位任意
	    radius: {
	        type: [String, Number],
	        default: '5rpx'
	    },
	    // 是否懒加载
	    lazyLoad: {
	        type: Boolean,
	        default: false
	    },
	    // 开启长按图片显示识别微信小程序码菜单
	    showMenuByLongpress: {
	        type: Boolean,
	        default: false
	    },
	    // 加载中的图标，或者小图片
	    loadingIcon: {
	        type: String,
	        default: 'photo'
	    },
	    // 加载失败的图标，或者小图片
	    errorIcon: {
	        type: String,
	        default: 'error-circle'
	    },
	    // 是否显示加载中的图标或者自定义的slot
	    showLoading: {
	        type: Boolean,
	        default: true
	    },
	    // 是否显示加载错误的图标或者自定义的slot
	    showError: {
	        type: Boolean,
	        default: true
	    },
	    // 是否需要淡入效果
	    fade: {
	        type: Boolean,
	        default: true
	    },
	    // 只支持网络资源，只对微信小程序有效
	    webp: {
	        type: Boolean,
	        default: false
	    },
	    // 过渡时间，单位ms
	    duration: {
	        type: [String, Number],
	        default: 500
	    },
	    // 背景颜色，用于深色页面加载图片时，为了和背景色融合
	    bgColor: {
	        type: String,
	        default: '#f3f4f6'
	    },
		//节点布局区域的下边界,目标节点区域以下 bottom(px) 时，就会触发回调函数
		bottom: {
			type: [Number, String],
			default: 50
		},
		//是否停止监听，设置为true时回调函数将不再触发
		disconnect: {
			type: Boolean,
			default: false
		},
		//图片在列表中的索引值
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			show: false,
			// 图片是否加载错误，如果是，则显示错误占位图
			isError: false,
			// 初始化组件时，默认为加载中状态
			loading: true,
			// 不透明度，为了实现淡入淡出的效果
			opacity: 1,
			// 过渡时间，因为props的值无法修改，故需要一个中间值
			durationTime: this.duration,
			// 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
			backgroundStyle: {},
			// 用于fade模式的控制组件显示与否
			showImg: false,
			elId: ''
		};
	},
	watch: {
		src: {
			immediate: true,
			handler(n) {
				if (!n) {
					// 如果传入null或者''，或者false，或者undefined，标记为错误状态
					this.isError = true;
				} else {
					this.isError = false;
					this.loading = true;
				}
			}
		},
		disconnect(val) {
			if (val) {
				this.removeObserver()
			}
		}
	},
	computed: {
		wrapStyle() {
			let style = {};
			style.width = this.width;
			style.height = this.height;
			return style;
		}
	},
	created() {
		this.observer = null;
		this.elId = this.unique() + this.index;
	},
	mounted() {
		this.show = true;
		
		// 是否开启图片懒加载
		if(!this.lazyLoad){
			this.showImg = true;
			return
		}
		
		this.$nextTick(() => {
			setTimeout(() => {
				// #ifndef H5
				if (!this.disconnect) {
					this.initObserver()
				} else {
					this.showImg = true;
				}
				// #endif
		
				// #ifdef H5
				if (!this.disconnect && window.self === window.top) {
					this.initObserver()
				} else {
					this.showImg = true;
				}
				// #endif
			}, 50)
		})
	},
	// #ifndef VUE3
	beforeDestroy() {
		this.removeObserver()
	},
	// #endif
	// #ifdef VUE3
	beforeUnmount() {
		this.removeObserver()
	},
	// #endif
	methods: {
		// 点击图片
		onClick() {
			this.$emit('click', {
				index: this.index
			})
		},
		// 图片加载失败
		onErrorHandler(err) {
			this.loading = false;
			this.isError = true;
			this.$emit('error', err);
		},
		// 图片加载完成，标记loading结束
		onLoadHandler(event) {
			this.loading = false;
			this.isError = false;
			
			this.$emit('load', event);
			this.removeBgColor();
			// 如果不需要动画效果，就不执行下方代码，同时移除加载时的背景颜色
			// 否则无需fade效果时，png图片依然能看到下方的背景色
			// if (!this.fade) return this.removeBgColor();
			// // 原来opacity为1(不透明，是为了显示占位图)，改成0(透明，意味着该元素显示的是背景颜色，默认的灰色)，再改成1，是为了获得过渡效果
			// this.opacity = 0;
			// // 这里设置为0，是为了图片展示到背景全透明这个过程时间为0，延时之后延时之后重新设置为duration，是为了获得背景透明(灰色)
			// // 到图片展示的过程中的淡入效果
			// this.durationTime = 0;
			// // 延时50ms，否则在浏览器H5，过渡效果无效
			// setTimeout(() => {
			// 	this.durationTime = this.duration;
			// 	this.opacity = 1;
			// 	setTimeout(() => {
			// 		this.removeBgColor();
			// 	}, this.durationTime);
			// }, 50);
		},
		// 移除图片的背景色
		removeBgColor() {
			// 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
			this.backgroundStyle = {
				backgroundColor: 'transparent'
			};
		},
		unique: function(n) {
			n = n || 6;
			let rnd = '';
			for (let i = 0; i < n; i++)
				rnd += Math.floor(Math.random() * 10);
			return 'zx_' + new Date().getTime() + rnd;
		},
		removeObserver() {
			if (this.observer) {
				this.observer.disconnect()
				this.observer = null;
			}
		},
		initObserver() {
			if (this.observer || this.showImg) return;
			try {
				let element = this.elId ? `#${this.elId}` : '.zx-lazyload__img';
				const observer = uni.createIntersectionObserver(this)
				observer.relativeToViewport({
					bottom: Number(this.bottom) || 50
				}).observe(element, (res) => {
					if (res.intersectionRatio > 0 && !this.showImg) {
						this.showImg = true;
						this.removeObserver()
					}
				})
				this.observer = observer
			} catch (e) {
				//TODO handle the exception
				this.showImg = true;
				this.removeObserver()
			}
		},
	}
};
</script>

<style lang="scss" scoped>
@import '../../theme.scss';

$zx-image-error-top: 0px !default;
$zx-image-error-left: 0px !default;
$zx-image-error-width: 100% !default;
$zx-image-error-hight: 100% !default;
$zx-image-error-background-color: $zx-bg-color !default;
$zx-image-error-color: $zx-tips-color !default;
$zx-image-error-font-size: 46rpx !default;

.zx-image {
	position: relative;
	transition: opacity 0.5s ease-in-out;

	&__image {
		width: 100%;
		height: 100%;
	}

	&__loading,
	&__error {
		position: absolute;
		top: $zx-image-error-top;
		left: $zx-image-error-left;
		width: $zx-image-error-width;
		height: $zx-image-error-hight;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: $zx-image-error-background-color;
		color: $zx-image-error-color;
		font-size: $zx-image-error-font-size;
	}
}

.zx-lazyload__box {
		display: inline-flex;
		position: relative;
		flex-shrink: 0;
	}

	.zx-lazyload__img {
		width: 100%;
		display: block;
		flex-shrink: 0;
		transition: opacity .3s linear;
	}

	.zx-img__hidden {
		opacity: 0;
		visibility: hidden;
	}

	.zx-img__appear {
		opacity: 1;
		visibility: visible;
	}
	
</style>

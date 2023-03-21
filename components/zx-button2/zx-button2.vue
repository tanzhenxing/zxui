<template>
	<button class="zx-btn" :class="[
			plain ? 'zx-' + type + '-outline' : 'zx-btn-' + (type || 'primary'),
			getDisabledClass(disabled, type, plain),
			getShapeClass(shape, plain),
			getShadowClass(type, shadow, plain),
			bold ? 'zx-text-bold' : '',
			link ? 'zx-btn__link' : '',
			width==='100%' || !width || width===true?'zx-btn__flex-1':''
		]" :hover-class="getHoverClass(disabled, type, plain)"
		:style="{ width: width, height: height, lineHeight: height, fontSize: size + 'rpx', margin: margin }"
		:loading="loading" :form-type="formType" :open-type="openType" @getuserinfo="bindgetuserinfo"
		@getphonenumber="bindgetphonenumber" @contact="bindcontact" @error="binderror" :disabled="disabled"
		@tap.stop="handleClick">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'zx-button2',
		emits: ['click', 'getuserinfo', 'contact', 'getphonenumber', 'error'],
		// #ifndef VUE3
		// #ifndef MP-QQ
		behaviors: ['wx://form-field-button'],
		// #endif
		// #endif
		props: {
			//样式类型 primary, white, danger, warning, green,blue, gray，black,brown,gray-primary,gray-danger,gray-warning,gray-green
			type: {
				type: String,
				default: 'primary'
			},
			//是否加阴影
			shadow: {
				type: Boolean,
				default: false
			},
			// 宽度 rpx或 %
			width: {
				type: String,
				default: '100%'
			},
			//高度 rpx
			height: {
				type: String,
				default: '96rpx'
			},
			//字体大小 rpx
			size: {
				type: Number,
				default: 32
			},
			bold: {
				type: Boolean,
				default: false
			},
			margin: {
				type: String,
				default: '0'
			},
			//形状 circle(圆角), square(默认方形)，rightAngle(平角)
			shape: {
				type: String,
				default: 'square'
			},
			plain: {
				type: Boolean,
				default: false
			},
			//link样式，去掉边框，结合plain一起使用
			link: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			//禁用后背景是否为灰色 （非空心button生效）
			disabledGray: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			formType: {
				type: String,
				default: ''
			},
			openType: {
				type: String,
				default: ''
			},
			index: {
				type: [Number, String],
				default: 0
			},
			//是否需要阻止重复点击【默认200ms】
			preventClick: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				time: 0
			};
		},
		methods: {
			handleClick() {
				if (this.disabled) return;
				if (this.preventClick) {
					if (new Date().getTime() - this.time <= 200) return;
					this.time = new Date().getTime();
					setTimeout(() => {
						this.time = 0;
					}, 200);
				}
				this.$emit('click', {
					index: Number(this.index)
				});
			},
			bindgetuserinfo({
				detail = {}
			} = {}) {
				this.$emit('getuserinfo', detail);
			},
			bindcontact({
				detail = {}
			} = {}) {
				this.$emit('contact', detail);
			},
			bindgetphonenumber({
				detail = {}
			} = {}) {
				this.$emit('getphonenumber', detail);
			},
			binderror({
				detail = {}
			} = {}) {
				this.$emit('error', detail);
			},
			getShadowClass: function(type, shadow, plain) {
				let className = '';
				if (shadow && type != 'white' && !plain) {
					className = 'zx-shadow-' + type;
				}
				return className;
			},
			getDisabledClass: function(disabled, type, plain) {
				let className = '';
				if (disabled && type != 'white' && type.indexOf('-') == -1) {
					let classVal = this.disabledGray ? 'zx-gray-disabled' : 'zx-dark-disabled';
					className = plain ? 'zx-dark-disabled-outline' : classVal;
				}
				return className;
			},
			getShapeClass: function(shape, plain) {
				let className = '';
				if (shape == 'circle') {
					className = plain ? 'zx-outline-fillet' : 'zx-fillet';
				} else if (shape == 'rightAngle') {
					className = plain ? 'zx-outline-rightAngle' : 'zx-rightAngle';
				}
				return className;
			},
			getHoverClass: function(disabled, type, plain) {
				let className = '';
				if (!disabled) {
					className = plain ? 'zx-outline-hover' : 'zx-' + (type || 'primary') + '-hover';
				}
				return className;
			}
		}
	};
</script>

<style scoped>
	.zx-btn-primary {
		background: #5677fc !important;
		color: #fff;
	}

	.zx-shadow-primary {
		box-shadow: 0 10rpx 14rpx 0 rgba(86, 119, 252, 0.2);
	}

	.zx-btn-danger {
		background: #eb0909 !important;
		color: #fff;
	}

	.zx-shadow-danger {
		box-shadow: 0 10rpx 14rpx 0 rgba(235, 9, 9, 0.2);
	}

	.zx-btn-warning {
		background: #fc872d !important;
		color: #fff;
	}

	.zx-shadow-warning {
		box-shadow: 0 10rpx 14rpx 0 rgba(252, 135, 45, 0.2);
	}

	.zx-btn-green {
		background: #07c160 !important;
		color: #fff;
	}

	.zx-shadow-green {
		box-shadow: 0 10rpx 14rpx 0 rgba(7, 193, 96, 0.2);
	}

	.zx-btn-blue {
		background: #007aff !important;
		color: #fff;
	}

	.zx-shadow-blue {
		box-shadow: 0 10rpx 14rpx 0 rgba(0, 122, 255, 0.2);
	}

	.zx-btn-white {
		background: #fff !important;
		color: #333 !important;
	}

	.zx-btn-gray {
		background: #bfbfbf !important;
		color: #fff !important;
	}

	.zx-btn-black {
		background: #333 !important;
		color: #fff !important;
	}

	.zx-btn-brown {
		background: #ac9157 !important;
		color: #fff !important;
	}

	.zx-btn-gray-black {
		background: #f2f2f2 !important;
		color: #333;
	}

	.zx-btn-gray-primary {
		background: #f2f2f2 !important;
		color: #5677fc !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.zx-gray-primary-hover {
		background: #d9d9d9 !important;
	}

	.zx-btn-gray-green {
		background: #f2f2f2 !important;
		color: #07c160 !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.zx-gray-green-hover {
		background: #d9d9d9 !important;
	}

	.zx-btn-gray-danger {
		background: #f2f2f2 !important;
		color: #eb0909 !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.zx-gray-danger-hover {
		background: #d9d9d9 !important;
	}

	.zx-btn-gray-warning {
		background: #f2f2f2 !important;
		color: #fc872d !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.zx-gray-warning-hover {
		background: #d9d9d9 !important;
	}

	.zx-shadow-gray {
		box-shadow: 0 10rpx 14rpx 0 rgba(191, 191, 191, 0.2);
	}

	.zx-hover-gray {
		background: #f7f7f9 !important;
	}

	.zx-black-hover {
		background: #555 !important;
		color: #e5e5e5 !important;
	}

	.zx-brown-hover {
		background: #A37F49 !important;
		color: #e5e5e5 !important;
	}

	/* button start*/

	.zx-btn {
		width: 100%;
		position: relative;
		/* #ifndef MP-QQ */
		border: 0 !important;
		/* #endif */
		/* #ifdef MP-QQ */
		border: 1rpx solid;
		box-sizing: border-box;
		/* #endif */
		border-radius: 6rpx;
		padding-left: 0;
		padding-right: 0;
		overflow: visible;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.zx-btn__flex-1 {
		flex: 1;
	}

	/* #ifndef MP-QQ */
	.zx-btn::after {
		content: '';
		position: absolute;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5) translateZ(0);
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 12rpx;
		border: 0;
	}

	/* #endif */


	/* #ifdef MP-BAIDU */
	/* .zx-btn:active::after {
		background-color: rgba(0, 0, 0, 0.2) !important;
	} */
	/* #endif */

	.zx-text-bold {
		font-weight: bold;
	}

	/* #ifdef MP-QQ */
	.zx-btn-white {
		border: 1rpx solid #bfbfbf;
	}

	/* #endif */

	/* #ifndef MP-QQ */
	.zx-btn-white::after {
		border: 1px solid #bfbfbf;
	}

	/* #endif */


	.zx-white-hover {
		background: #e5e5e5 !important;
		color: #2e2e2e !important;
	}

	.zx-dark-disabled {
		opacity: 0.6 !important;
		color: #fafbfc !important;
	}

	.zx-dark-disabled-outline {
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
		opacity: 0.5 !important;
	}

	.zx-gray-disabled {
		background: #f3f3f3 !important;
		color: #919191 !important;
		box-shadow: none;
	}

	.zx-outline-hover {
		opacity: 0.5 !important;
	}

	.zx-primary-hover {
		background: #4a67d6 !important;
		color: #e5e5e5 !important;
	}

	/* #ifndef MP-QQ */
	.zx-primary-outline::after {
		border: 1px solid #5677fc !important;
	}

	/* #endif */

	.zx-primary-outline {
		color: #5677fc !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #5677fc !important;
		/* #endif */
	}

	.zx-danger-hover {
		background: #c80808 !important;
		color: #e5e5e5 !important;
	}

	.zx-danger-outline {
		color: #eb0909 !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #eb0909 !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.zx-danger-outline::after {
		border: 1px solid #eb0909 !important;
	}

	/* #endif */

	.zx-warning-hover {
		background: #d67326 !important;
		color: #e5e5e5 !important;
	}

	.zx-warning-outline {
		color: #fc872d !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #fc872d !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.zx-warning-outline::after {
		border: 1px solid #fc872d !important;
	}

	/* #endif */

	.zx-green-hover {
		background: #06ad56 !important;
		color: #e5e5e5 !important;
	}

	.zx-green-outline {
		color: #07c160 !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #07c160 !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.zx-green-outline::after {
		border: 1px solid #07c160 !important;
	}

	/* #endif */

	.zx-blue-hover {
		background: #0062cc !important;
		color: #e5e5e5 !important;
	}

	.zx-blue-outline {
		color: #007aff !important;
		background: transparent;
		/* #ifdef APP-PLUS */
		border: 1rpx solid #007aff !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.zx-blue-outline::after {
		border: 1px solid #007aff !important;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.zx-btn-gradual {
		background: linear-gradient(90deg, rgb(255, 89, 38), rgb(240, 14, 44)) !important;
		color: #fff !important;
	}

	.zx-shadow-gradual {
		box-shadow: 0 10rpx 14rpx 0 rgba(235, 9, 9, 0.15);
	}

	/* #endif */

	.zx-gray-hover {
		background: #a3a3a3 !important;
		color: #898989;
	}

	/* #ifndef APP-NVUE */
	.zx-gradual-hover {
		background: linear-gradient(90deg, #d74620, #cd1225) !important;
		color: #fff !important;
	}

	/* #endif */

	.zx-gray-outline {
		color: #999 !important;
		background: transparent !important;
	}

	.zx-white-outline {
		color: #fff !important;
		background: transparent !important;
		/* #ifdef MP-QQ */
		border: 1rpx solid #fff !important;
		/* #endif */
	}

	.zx-black-outline {
		background: transparent !important;
		color: #333 !important;
		/* #ifdef MP-QQ */
		border: 1rpx solid #ccc !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.zx-gray-outline::after {
		border: 1px solid #ccc !important;
	}

	/* #endif */

	/* #ifndef MP-QQ */
	.zx-white-outline::after {
		border: 1px solid #fff !important;
	}

	.zx-black-outline::after {
		border: 1px solid #333 !important;
	}

	.zx-brown-outline::after {
		border: 1px solid #ac9157 !important;
	}

	/* #endif */

	.zx-brown-outline {
		color: #ac9157 !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #ac9157 !important;
		/* #endif */
	}

	/*圆角 */

	.zx-fillet {
		border-radius: 50rpx;
	}

	.zx-btn-white.zx-fillet::after {
		border-radius: 98rpx;
	}

	.zx-outline-fillet::after {
		border-radius: 98rpx;
	}

	/*平角*/
	.zx-rightAngle {
		border-radius: 0;
	}

	.zx-btn-white.zx-rightAngle::after {
		border-radius: 0;
	}

	.zx-outline-rightAngle::after {
		border-radius: 0;
	}

	/* #ifdef MP-QQ */
	.zx-btn__link {
		border: 0 !important;
	}

	/* #endif */

	.zx-btn__link::after {
		border: 0 !important;
	}
</style>

<template>
	<view
		class="zx-tag"
		:hover-class="hover ? 'zx-tag-opcity' : ''"
		:hover-stay-time="150"
		:class="[originLeft ? 'zx-origin-left' : '', originRight ? 'zx-origin-right' : '', getClassName(shape, plain), getTypeClass(type, plain)]"
		:style="{ transform: `scale(${scaleMultiple})`, padding: padding, margin: margin, fontSize: size, lineHeight: size }"
		@tap="handleClick"
	>
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'zx-tag',
	emits: ['click'],
	props: {
		type: {
			type: String,
			default: 'primary'
		},
		//padding
		padding: {
			type: String,
			default: '16rpx 26rpx'
		},
		margin: {
			type: String,
			default: '0'
		},
		//文字大小 rpx
		size: {
			type: String,
			default: '28rpx'
		},
		// circle, square，circleLeft，circleRight
		shape: {
			type: String,
			default: 'square'
		},
		//是否空心
		plain: {
			type: Boolean,
			default: false
		},
		//点击效果
		hover: {
			type: Boolean,
			default: false
		},
		//缩放倍数
		scaleMultiple: {
			type: Number,
			default: 1
		},
		originLeft: {
			type: Boolean,
			default: false
		},
		originRight: {
			type: Boolean,
			default: false
		},
		index: {
			type: Number,
			default: 0
		}
	},
	methods: {
		handleClick() {
			this.$emit('click', {
				index: this.index
			});
		},
		getTypeClass: function(type, plain) {
			return plain ? 'zx-' + type + '-outline' : 'zx-' + type;
		},
		getClassName: function(shape, plain) {
			//circle, square，circleLeft，circleRight
			var className = plain ? 'zx-tag-outline ' : '';
			if (shape != 'square') {
				if (shape == 'circle') {
					className = className + (plain ? 'zx-tag-outline-fillet' : 'zx-tag-fillet');
				} else if (shape == 'circleLeft') {
					className = className + 'zx-tag-fillet-left';
				} else if (shape == 'circleRight') {
					className = className + 'zx-tag-fillet-right';
				}
			}
			return className;
		}
	}
};
</script>

<style scoped>
/* color start*/

.zx-primary {
	background-color: #5677fc !important;
	color: #fff;
}

.zx-light-primary {
	background-color: #5c8dff !important;
	color: #fff;
}

.zx-dark-primary {
	background-color: #4a67d6 !important;
	color: #fff;
}

.zx-dLight-primary {
	background-color: #4e77d9 !important;
	color: #fff;
}

.zx-danger {
	background-color: #ed3f14 !important;
	color: #fff;
}

.zx-red {
	background-color: #ff201f !important;
	color: #fff;
}

.zx-warning {
	background-color: #ff7900 !important;
	color: #fff;
}

.zx-green {
	background-color: #19be6b !important;
	color: #fff;
}

.zx-high-green {
	background-color: #52dcae !important;
	color: #52dcae;
}

.zx-black {
	background-color: #000 !important;
	color: #fff;
}

.zx-white {
	background-color: #fff !important;
	color: #333 !important;
}

.zx-translucent {
	background-color: rgba(0, 0, 0, 0.7);
}

.zx-light-black {
	background-color: #333 !important;
}

.zx-gray {
	background-color: #ededed !important;
}

.zx-phcolor-gray {
	background-color: #ccc !important;
}

.zx-divider-gray {
	background-color: #eaeef1 !important;
}

.zx-btn-gray {
	background-color: #ededed !important;
	color: #999 !important;
}

.zx-hover-gray {
	background-color: #f7f7f9 !important;
}

.zx-bg-gray {
	background-color: #fafafa !important;
}

.zx-light-blue {
	background-color: #ecf6fd;
	color: #4dabeb !important;
}

.zx-light-brownish {
	background-color: #fcebef;
	color: #8a5966 !important;
}

.zx-light-orange {
	background-color: #fef5eb;
	color: #faa851 !important;
}

.zx-light-green {
	background-color: #e8f6e8;
	color: #44cf85 !important;
}

.zx-primary-outline::after {
	border: 1px solid #5677fc !important;
}

.zx-primary-outline {
	color: #5677fc !important;
	background-color: none;
}

.zx-danger-outline {
	color: #ed3f14 !important;
	background-color: none;
}

.zx-danger-outline::after {
	border: 1px solid #ed3f14 !important;
}

.zx-red-outline {
	color: #ff201f !important;
	background-color: none;
}

.zx-red-outline::after {
	border: 1px solid #ff201f !important;
}

.zx-warning-outline {
	color: #ff7900 !important;
	background-color: none;
}

.zx-warning-outline::after {
	border: 1px solid #ff7900 !important;
}

.zx-green-outline {
	color: #44cf85 !important;
	background-color: none;
}

.zx-green-outline::after {
	border: 1px solid #44cf85 !important;
}

.zx-high-green-outline {
	color: #52dcae !important;
	background-color: none;
}

.zx-high-green-outline::after {
	border: 1px solid #52dcae !important;
}

.zx-gray-outline {
	color: #999 !important;
	background-color: none;
}

.zx-gray-outline::after {
	border: 1px solid #ccc !important;
}

.zx-black-outline {
	color: #333 !important;
	background-color: none;
}

.zx-black-outline::after {
	border: 1px solid #333 !important;
}

.zx-white-outline {
	color: #fff !important;
	background-color: none;
}

.zx-white-outline::after {
	border: 1px solid #fff !important;
}

/* color end*/

/* tag start*/

.zx-tag {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6rpx;
	flex-shrink: 0;
}

.zx-tag-outline {
	position: relative;
	background-color: none;
	color: #5677fc;
}

.zx-tag-outline::after {
	content: ' ';
	position: absolute;
	width: 200%;
	height: 200%;
	transform: scale(0.5) translateZ(0);
	transform-origin: 0 0;
	box-sizing: border-box;
	left: 0;
	top: 0;
	border-radius: 12rpx;
}

.zx-tag-fillet {
	border-radius: 50rpx;
}

.zx-white.zx-tag-fillet::after {
	border-radius: 80rpx;
}

.zx-tag-outline-fillet::after {
	border-radius: 80rpx;
}

.zx-tag-fillet-left {
	border-radius: 50rpx 0 0 50rpx;
}

.zx-tag-fillet-right {
	border-radius: 0 50rpx 50rpx 0;
}

.zx-tag-fillet-left.zx-tag-outline::after {
	border-radius: 100rpx 0 0 100rpx;
}

.zx-tag-fillet-right.zx-tag-outline::after {
	border-radius: 0 100rpx 100rpx 0;
}

/* tag end*/
.zx-origin-left {
	transform-origin: 0 center;
}

.zx-origin-right {
	transform-origin: 100% center;
}

.zx-tag-opcity {
	opacity: 0.5;
}
</style>

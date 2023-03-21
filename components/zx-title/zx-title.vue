<template>
	<view class="zx-title" :style="{ 'align-items': textAlign }">
		<text class="base" :class="[type]" :style="{ color: color }">{{ title }}</text>
	</view>
</template>

<script>
/**
 * Title 标题
 * @description 标题组件
 * @tutorial
 * @property {String} type = [h1|h2|h3|h4|h5] 标题类型
 * @property {String} title 标题内容
 * @property {String} align = [left|center|right] 对齐方式
 * @property {String} color 字体颜色
 */
export default {
	name: 'zx-title',
	props: {
		type: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		align: {
			type: String,
			default: 'left'
		},
		color: {
			type: String,
			default: '#333333'
		}
	},
	data() {
		return {};
	},
	computed: {
		textAlign() {
			let align = 'center';
			switch (this.align) {
				case 'left':
					align = 'flex-start';
					break;
				case 'center':
					align = 'center';
					break;
				case 'right':
					align = 'flex-end';
					break;
			}
			return align;
		}
	},
	watch: {},
	mounted() {},
	methods: {}
};
</script>

<style scoped lang="scss">
.zx-title {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 15rpx 0;
	flex: 1;

	.base {
		font-size: 30rpx;
		color: #333;
		font-weight: 500;
	}

	.h1 {
		font-size: 40rpx;
		color: #333;
		font-weight: bold;
	}

	.h2 {
		font-size: 36rpx;
		color: #333;
		font-weight: bold;
	}

	.h3 {
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.h4 {
		font-size: 28rpx;
		color: #333;
		font-weight: bold;
	}

	.h5 {
		font-size: 24rpx;
		color: #333;
		font-weight: bold;
	}
}
</style>

<template>
	<view class="zx-section" :style="{ backgroundColor: bgColor, borderRadius: borderRadius }">
		<view class="header" :style="{ padding: titlePadding, height: height }" @click="onClick">
			<slot name="decoration">
				<view :class="type" :style="{ backgroundColor: decorationColor, height: decorationHeight, width: decorationWidth, marginRight: decorationSpace }"></view>
			</slot>
			<slot name="title">
				<view class="title">
					<zx-text :text="title" :size="titleFontSize" :color="titleColor" :bold="titleBold" lines="1"></zx-text>
					<zx-text v-if="subTitle" :text="subTitle" :size="subTitleFontSize" :color="subTitleColor" lineHeight="35rpx" lines="1"></zx-text>
				</view>
			</slot>
			<slot name="right">
				<view v-if="moreShow" class="slot-right">
					<zx-more :text="moreText" :link="moreLink" :size="moreSize"></zx-more>
				</view>
			</slot>
		</view>
		<zx-line v-if="line" :color="lineColor"></zx-line>
		<view class="content" :style="{ padding: padding }"><slot></slot></view>
	</view>
</template>

<script setup>
/**
 * Section 标题栏
 * @description 标题栏
 * @property {String} type = [line|circle|square] 标题装饰类型
 * @property {String} title 主标题
 * @property {String} titleFontSize 主标题字体大小
 * @property {String} titleColor 主标题字体颜色
 * @property {String} subTitle 副标题
 * @property {String} subTitleFontSize 副标题字体大小
 * @property {String} subTitleColor 副标题字体颜色
 * @property {String} padding 默认插槽 padding
 */
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	type: {
		type: String,
		default: 'line'
	},
	bgColor: {
		type: String,
		default: 'transparent'
	},
	height: {
		type: String,
		default: '80rpx'
	},
	borderRadius: {
		type: String,
		default: '0rpx'
	},
	title: {
		type: String,
		required: true,
		default: ''
	},
	titleFontSize: {
		type: String,
		default: '34rpx'
	},
	titleColor: {
		type: String,
		default: '#333333'
	},
	titleBold: {
		type: Boolean,
		default: false
	},
	subTitle: {
		type: String,
		default: ''
	},
	subTitleFontSize: {
		type: String,
		default: '28rpx'
	},
	subTitleColor: {
		type: String,
		default: '#999999'
	},
	titlePadding: {
		type: String,
		default: '25rpx'
	},
	padding: {
		type: String,
		default: '25rpx'
	},
	moreShow: {
		type: Boolean,
		default: true
	},
	moreLink: {
		type: String,
		default: ''
	},
	moreText: {
		type: String,
		default: 'More'
	},
	moreSize: {
		type: String,
		default: '28rpx'
	},
	line: {
		type: Boolean,
		default: true
	},
	lineColor: {
		type: String,
		default: '#c5c5c5'
	},
	decorationColor: {
		type: String,
		default: '#2979ff'
	},
	decorationHeight: {
		type: String,
		default: '35rpx'
	},
	decorationWidth: {
		type: String,
		default: '35rpx'
	},
	decorationSpace: {
		type: String,
		default: '15rpx'
	}
});

const onClick = () => {
	proxy.$emit('click');
};
const onMoreLink = () => {
	uni.navigateTo({
		url: props.moreLink
	});
};
</script>
<style lang="scss" scoped>
.zx-section {
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
		color: #333;

		.distraction {
			flex-direction: row;
			align-items: center;
		}
		&-sub {
			margin-top: 5rpx;
		}
	}

	.header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding: 15rpx 2rpx;
		font-weight: normal;

		.title {
			flex: 1;
		}
		.line {
			border-radius: 20rpx;
		}

		.circle {
			border-top-right-radius: 100rpx;
			border-top-left-radius: 100rpx;
			border-bottom-left-radius: 100rpx;
			border-bottom-right-radius: 100rpx;
		}

		.square {
		}

		.slot-right {
			font-size: 28rpx;
		}
	}
}

.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

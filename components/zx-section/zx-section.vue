<template>
	<view class="zx-section" :style="{backgroundColor:bgColor}">
		<view class="zx-section-header" @click="onClick">
			<view v-if="type" class="zx-section-header__decoration" :class="type"></view>
			<slot v-else name="decoration"></slot>
			
			<view class="zx-section-header__content">
				<text :style="{ 'font-size': titleFontSize, color: titleColor }" class="zx-section__content-title" :class="{ distraction: !subTitle }">{{ title }}</text>
				<text v-if="subTitle" :style="{ 'font-size': subTitleFontSize, color: subTitleColor }" class="zx-section-header__content-sub">{{ subTitle }}</text>
			</view>
			<view class="zx-section-header__slot-right">
				<slot name="right">
					<view style="display: flex;justify-content: center;align-items: center;" @click="onMoreLink">
						<zx-text :text="moreText" size="28rpx" color="#909399"></zx-text>
						<zx-icon name="arrow-right-double" size="32rpx" style="margin-left: 10rpx;"></zx-icon>
					</view>
				</slot>
			</view>
		</view>
		<view class="zx-section-content" :style="{ padding: _padding }">
			<slot />
		</view>
	</view>
</template>

<script>
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

export default {
	name: 'zx-section',
	emits: ['click'],
	props: {
		type: {
			type: String,
			default: ''
		},
		bgColor: {
			type: String,
			default: 'transparent'
		},
		title: {
			type: String,
			required: true,
			default: ''
		},
		titleFontSize: {
			type: String,
			default: '14px'
		},
		titleColor: {
			type: String,
			default: '#333'
		},
		subTitle: {
			type: String,
			default: ''
		},
		subTitleFontSize: {
			type: String,
			default: '12px'
		},
		subTitleColor: {
			type: String,
			default: '#999'
		},
		padding: {
			type: [Boolean, String],
			default: false
		},
		moreLink: {
			type: String,
			default: ''
		},
		moreText: {
			type: String,
			default: 'More'
		}
	},
	computed: {
		_padding() {
			if (typeof this.padding === 'string') {
				return this.padding;
			}

			return this.padding ? '10px' : '';
		}
	},
	watch: {
		
	},
	methods: {
		onClick() {
			this.$emit('click');
		},
		onMoreLink(){
			uni.navigateTo({
				url: this.moreLink
			})
		}
	}
};
</script>
<style lang="scss">
$zx-primary: #2979ff !default;

.zx-section {

	.zx-section-header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding: 15rpx 2rpx;
		font-weight: normal;

		&__decoration {
			margin-right: 6px;
			background-color: $zx-primary;
			&.line {
				width: 4px;
				height: 12px;
				border-radius: 10px;
			}

			&.circle {
				width: 8px;
				height: 8px;
				border-top-right-radius: 50px;
				border-top-left-radius: 50px;
				border-bottom-left-radius: 50px;
				border-bottom-right-radius: 50px;
			}

			&.square {
				width: 8px;
				height: 8px;
			}
		}

		&__content {
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
				margin-top: 2px;
			}
		}

		&__slot-right {
			font-size: 14px;
		}
	}

	.zx-section-content {
		font-size: 14px;
	}
}
</style>

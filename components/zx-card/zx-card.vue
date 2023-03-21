<template>
	<view class="zx-card" :class="{ 'zx-card--full': isFull, 'zx-card--shadow': isShadow,'zx-card--border':border}"
		:style="{'margin':isFull?0:margin,'padding':spacing,'box-shadow':isShadow?shadow:''}">
		<!-- 封面 -->
		<slot name="cover">
			<view v-if="cover" class="zx-card__cover">
				<image class="zx-card__cover-image" mode="widthFix" @click="onClick('cover')" :src="cover"></image>
			</view>
		</slot>
		<slot name="title">
			<view v-if="title || extra" class="zx-card__header">
				<!-- 卡片标题 -->
				<view class="zx-card__header-box" @click="onClick('title')">
					<view v-if="thumbnail" class="zx-card__header-avatar">
						<image class="zx-card__header-avatar-image" :src="thumbnail" mode="aspectFit" />
					</view>
					<view class="zx-card__header-content">
						<text class="zx-card__header-content-title zx-ellipsis">{{ title }}</text>
						<text v-if="title&&subTitle"
							class="zx-card__header-content-subtitle zx-ellipsis">{{ subTitle }}</text>
					</view>
				</view>
				<view class="zx-card__header-extra" @click="onClick('extra')">
					<slot name="extra">
						<text class="zx-card__header-extra-text">{{ extra }}</text>
					</slot>
				</view>
			</view>
		</slot>
		<!-- 卡片内容 -->
		<view class="zx-card__content" :style="{padding:padding}" @click="onClick('content')">
			<slot></slot>
		</view>
		<view class="zx-card__actions" @click="onClick('actions')">
			<slot name="actions"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * Card 卡片
	 * @description 卡片视图组件
	 * @tutorial 
	 * @property {String} title 标题文字
	 * @property {String} subTitle 副标题
	 * @property {Number} padding 内容内边距
	 * @property {Number} margin 卡片外边距
	 * @property {Number} spacing 卡片内边距
	 * @property {String} extra 标题额外信息
	 * @property {String} cover 封面图（本地路径需要引入）
	 * @property {String} thumbnail 标题左侧缩略图
	 * @property {Boolean} isFull = [true | false] 卡片内容是否通栏，为 true 时将去除padding值
	 * @property {Boolean} isShadow = [true | false] 卡片内容是否开启阴影
	 * @property {String}  shadow 卡片阴影
	 * @property {Boolean} border 卡片边框
	 * @event {Function} click 点击 Card 触发事件
	 */
	export default {
		name: 'zx-card',
		emits: ['click'],
		props: {
			title: {
				type: String,
				default: ''
			},
			subTitle: {
				type: String,
				default: ''
			},
			padding: {
				type: String,
				default: '10rpx'
			},
			margin: {
				type: String,
				default: '15rpx'
			},
			spacing: {
				type: String,
				default: '0 10rpx'
			},
			extra: {
				type: String,
				default: ''
			},
			cover: {
				type: String,
				default: ''
			},
			thumbnail: {
				type: String,
				default: ''
			},
			isFull: {
				// 内容区域是否通栏
				type: Boolean,
				default: false
			},
			isShadow: {
				// 是否开启阴影
				type: Boolean,
				default: true
			},
			shadow: {
				type: String,
				default: '0px 0px 6rpx 2rpx rgba(0, 0, 0, 0.08)'
			},
			border: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			onClick(type) {
				this.$emit('click', type)
			}
		}
	}
</script>

<style lang="scss">
	$zx-border-3: #EBEEF5 !default;
	$zx-shadow-base:0 0px 6px 1px rgba($color: #a5a5a5, $alpha: 0.2) !default;
	$zx-main-color: #3a3a3a !default;
	$zx-base-color: #6a6a6a !default;
	$zx-secondary-color: #909399 !default;
	$zx-spacing-sm: 8px !default;
	$zx-border-color:$zx-border-3;
	$zx-shadow: $zx-shadow-base;
	$zx-card-title: 15px;
	$zx-cart-title-color:$zx-main-color;
	$zx-card-subtitle: 12px;
	$zx-cart-subtitle-color:$zx-secondary-color;
	$zx-card-spacing: 10px;
	$zx-card-content-color: $zx-base-color;

	.zx-card {
		margin: $zx-card-spacing;
		padding: 0 $zx-spacing-sm;
		border-radius: 10rpx;
		overflow: hidden;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		background-color: #fff;
		flex: 1;

		.zx-card__cover {
			position: relative;
			margin-top: $zx-card-spacing;
			flex-direction: row;
			overflow: hidden;
			border-radius: 4px;
			.zx-card__cover-image {
				flex: 1;
				// width: 100%;
				/* #ifndef APP-PLUS */
				vertical-align: middle;
				/* #endif */
			}
		}

		.zx-card__header {
			display: flex;
			border-bottom: 1px $zx-border-color solid;
			flex-direction: row;
			align-items: center;
			padding: $zx-card-spacing;
			overflow: hidden;

			.zx-card__header-box {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex: 1;
				flex-direction: row;
				align-items: center;
				overflow: hidden;
			}

			.zx-card__header-avatar {
				width: 40px;
				height: 40px;
				overflow: hidden;
				border-radius: 5px;
				margin-right: $zx-card-spacing;
				.zx-card__header-avatar-image {
					flex: 1;
					width: 40px;
					height: 40px;
				}
			}

			.zx-card__header-content {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				justify-content: center;
				flex: 1;
				// height: 40px;
				overflow: hidden;

				.zx-card__header-content-title {
					font-size: $zx-card-title;
					color: $zx-cart-title-color;
					// line-height: 22px;
				}

				.zx-card__header-content-subtitle {
					font-size: $zx-card-subtitle;
					margin-top: 5px;
					color: $zx-cart-subtitle-color;
				}
			}

			.zx-card__header-extra {
				line-height: 12px;

				.zx-card__header-extra-text {
					font-size: 12px;
					color: $zx-cart-subtitle-color;
				}
			}
		}

		.zx-card__content {
			padding: $zx-card-spacing;
			font-size: 14px;
			color: $zx-card-content-color;
			line-height: 22px;
		}

		.zx-card__actions {
			font-size: 12px;
		}
	}

	.zx-card--border {
		border: 1px solid $zx-border-color;
	}

	.zx-card--shadow {
		position: relative;
		/* #ifndef APP-NVUE */
		box-shadow: $zx-shadow;
		/* #endif */
	}

	.zx-card--full {
		margin: 0;
		border-left-width: 0;
		border-left-width: 0;
		border-radius: 0;
	}

	/* #ifndef APP-NVUE */
	.zx-card--full:after {
		border-radius: 0;
	}

	/* #endif */
	.zx-ellipsis {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}
</style>

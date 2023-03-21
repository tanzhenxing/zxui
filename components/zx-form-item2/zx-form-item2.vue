<template>
	<view class="zx-form__item-wrap" :class="{'zx-form__highlight':highlight}"
		:style="{padding:padding,background:background,marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx',borderRadius:radius}"
		@tap="handleClick">
		<!-- #ifdef APP-NVUE -->
		<view class="zx-form__asterisk" v-if="asterisk">
			<text :style="{color:asteriskColor}">*</text>
		</view>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view class="zx-form__asterisk" v-if="asterisk" :style="{color:asteriskColor}">*</view>
		<!-- #endif -->
		<text :style="{width:labelWidth+'rpx',fontSize:labelSize+'rpx',color:labelColor,paddingRight:labelRight+'rpx'}"
			v-if="label">{{label}}</text>
		<view class="zx-form__item-content">
			<slot></slot>
		</view>
		<slot name="right"></slot>
		<view v-if="bottomBorder" :style="{background:borderColor,left:left+'rpx',right:right+'rpx'}"
			class="zx-form__item-bottom"></view>
		<view class="zx-form__item-arrow" v-if="arrow" :style="{'border-color':arrowColor}">
		</view>
	</view>
</template>

<script>
	export default {
		name: 'zx-form-item2',
		emits: ['click'],
		props: {
			padding: {
				type: String,
				default: '26rpx 30rpx'
			},
			marginTop: {
				type: [Number, String],
				default: 0
			},
			marginBottom: {
				type: [Number, String],
				default: 0
			},
			label: {
				type: String,
				default: ''
			},
			labelSize: {
				type: [Number, String],
				default: 32
			},
			labelColor: {
				type: String,
				default: '#333'
			},
			labelWidth: {
				type: [Number, String],
				default: 140
			},
			labelRight: {
				type: [Number, String],
				default: 16
			},
			asterisk: {
				type: Boolean,
				default: false
			},
			asteriskColor: {
				type: String,
				default: '#EB0909'
			},
			background: {
				type: String,
				default: '#fff'
			},
			highlight: {
				type: Boolean,
				default: false
			},
			arrow: {
				type: Boolean,
				default: false
			},
			arrowColor: {
				type: String,
				default: '#c0c0c0'
			},
			bottomBorder: {
				type: Boolean,
				default: true
			},
			borderColor: {
				type: String,
				default: '#eaeef1'
			},
			left: {
				type: [Number, String],
				default: 30
			},
			right: {
				type: [Number, String],
				default: 0
			},
			radius: {
				type: String,
				default: '0'
			},
			index: {
				type: [Number, String],
				default: 0
			}
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					index: this.index
				});
			}
		}
	}
</script>

<style scoped>
	.zx-form__item-wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		display: flex;
		/* #endif */
		flex-direction: row;
		flex: 1;
		align-items: center;
		position: relative;
	}

	.zx-form__highlight:active {
		background-color: #f1f1f1 !important;
	}

	.zx-form__asterisk {
		position: absolute;
		left: 12rpx;
		/* #ifndef APP-NVUE */
		height: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		line-height: 1.15;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		align-items: center;
		justify-content: center;
		line-height: 1;
		/* #endif */
	}

	.zx-form__item-label {
		padding-right: 12rpx;
		/* #ifndef APP-NVUE */
		display: inline-block;
		flex-shrink: 0;
		/* #endif */
	}

	.zx-form__item-content {
		flex: 1;
	}

	.zx-form__item-bottom {
		position: absolute;
		bottom: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */
		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5) translateZ(0);
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 100%;
		z-index: 1;
		/* #endif */
	}

	.zx-form__item-arrow {
		height: 40rpx;
		width: 40rpx;
		border-width: 3px 3px 0 0;
		border-style: solid;
		transform: rotate(45deg) scale(0.5);
		/* #ifndef APP-NVUE */
		border-radius: 4rpx;
		flex-shrink: 0;
		margin-left: auto;
		box-sizing: border-box;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-top-right-radius: 3rpx;
		/* #endif */
		transform-origin: center center;
		margin-right: -5.8579rpx;
	}
</style>

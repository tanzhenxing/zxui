<template>
	<view class="zx-steps-box" :class="{ 'zx-steps-column': direction === 'column' }">
		<view class="zx-step-item" :style="{ width: direction === 'column' ? '100%' : spacing }"
			:class="[direction === 'row' ? 'zx-step-horizontal' : 'zx-step-vertical']" v-for="(item, index) in items"
			:key="index" @tap.stop="handleClick(index)">
			<view class="zx-step-item-ico" :class="[direction === 'column' ? 'zx-step-column_ico' : 'zx-step-row_ico']" :style="{ width: direction === 'column' ? '36rpx' : '100%' }">
				<view v-if="!item.name && !item.icon" class="zx-step-ico"
					 :style="{
						width: type == 2 || activeSteps === index ? '36rpx' : '16rpx',
						height: type == 2 || activeSteps === index ? '36rpx' : '16rpx',
						backgroundColor: index <= activeSteps ? activeColor : type == 2 ? '#fff' : deactiveColor,
						borderColor: index <= activeSteps ? activeColor : deactiveColor
					}">
					<text v-if="activeSteps !== index"
						:style="{ color: index <= activeSteps ? '#fff' : '' }">{{ type == 1 ? '' : index + 1 }}</text>
					<zx-icon name="check" :size="16" color="#fff" v-if="activeSteps === index"></zx-icon>
				</view>
				<view class="zx-step-custom" :style="{ backgroundColor: backgroundColor }"
					v-if="item.name || item.icon">
					<zx-icon :name="item.name" :size="item.size || 20" :color="index <= activeSteps ? activeColor : deactiveColor"
						v-if="item.name"></zx-icon>
					<image :src="index <= activeSteps ? item.activeIcon : item.icon" class="zx-step-img"
						mode="widthFix" v-if="!item.name"></image>
				</view>
				<view class="zx-step-line"
					:class="['zx-step-' + direction + '_line', direction == 'column' && (item.name || item.icon) ? 'zx-custom-left' : '']"
					:style="{
						borderColor: index <= activeSteps - 1 ? activeColor : deactiveColor,
						borderRightStyle: direction == 'column' ? lineStyle : '',
						borderTopStyle: direction == 'column' ? '' : lineStyle
					}" v-if="index != items.length - 1"></view>
			</view>
			<view class="zx-step-item-main" :class="['zx-step-' + direction + '_item_main']">
				<view class="zx-step-item-title" :style="{
						color: index <= activeSteps ? activeColor : deactiveColor,
						fontSize: titleSize + 'rpx',
						lineHeight: titleSize + 'rpx',
						fontWeight: bold ? 'bold' : 'normal'
					}">
					{{ item.title }}
				</view>
				<view class="zx-step-item-content"
					:style="{ color: index <= activeSteps ? activeColor : deactiveColor, fontSize: descSize + 'rpx' }">
					{{ item.desc }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	//如果自定义传入图标内容，则需要拆分组件
	export default {
		name: 'zx-steps',
		emits: ['click'],
		props: {
			// 1-默认步骤 2-数字步骤
			type: {
				type: Number,
				default: 1
			},
			spacing: {
				type: String,
				default: '160rpx'
			},
			// 方向 row column
			direction: {
				type: String,
				default: 'row'
			},
			// 激活状态成功颜色
			activeColor: {
				type: String,
				default: '#5677fc'
			},
			// 未激活状态颜色
			deactiveColor: {
				type: String,
				default: '#999999'
			},
			//title字体大小
			titleSize: {
				type: Number,
				default: 28
			},
			//title是否粗体
			bold: {
				type: Boolean,
				default: false
			},
			//desc字体大小
			descSize: {
				type: Number,
				default: 24
			},
			// 当前步骤
			activeSteps: {
				type: Number,
				default: -1
			},
			//线条样式 同border线条样式
			lineStyle: {
				type: String,
				default: 'solid'
			},
			/**
				 * [{
						title: "标题",
						desc: "描述",
						name:"字体图标 thorui icon内", 
						size:字体图标大小，单位px
						icon:"图片图标", 
						activeIcon:"已完成步骤显示图片图标"
					}]
				 * */
			items: {
				type: Array,
				default () {
					return [];
				}
			},
			//自定义item内容时背景色
			backgroundColor: {
				type: String,
				default: '#fff'
			}
		},
		data() {
			return {};
		},
		methods: {
			handleClick(index) {
				this.$emit('click', {
					index: index
				});
			}
		}
	};
</script>

<style scoped>
	.zx-steps-box {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.zx-steps-column {
		flex-direction: column;
	}

	.zx-step-ico {
		border-radius: 50%;
		position: relative;
		z-index: 3;
		margin: 0 auto;
		border-width: 1rpx;
		border-style: solid;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.zx-step-row_ico {
		align-items: center;
	}

	.zx-step-column_ico {
		align-items: flex-start;
	}

	.zx-step-line {
		position: absolute;
		left: 50%;
		top: 20rpx;
		width: 100%;
		height: 0rpx;
		border-top-width: 1px;
		z-index: 2;
		transform: translateY(-50%) translateZ(0);
	}

	.zx-step-row_item_main {
		text-align: center;
	}

	.zx-step-item {
		font-size: 24rpx;
		position: relative;
		box-sizing: border-box;
	}

	.zx-step-item-ico {
		height: 36rpx;
		display: flex;
		justify-content: center;
	}

	.zx-step-custom {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48rpx;
		height: 40rpx;
		position: relative;
		z-index: 4;
		margin: 0 auto;
	}

	.zx-step-img {
		width: 40rpx;
		height: 40rpx;
	}

	.zx-step-item-main {
		margin-top: 16rpx;
		clear: both;
	}

	.zx-step-item-title {
		word-break: break-all;
	}

	.zx-step-item-content {
		margin-top: 8rpx;
		word-break: break-all;
	}

	.zx-step-vertical {
		width: 100%;
		display: flex;
		padding-bottom: 60rpx;
	}

	.zx-step-column_item_main {
		margin-top: 0;
		padding-left: 20rpx;
		max-width: 80%;
	}

	.zx-step-column_line {
		position: absolute;
		height: 100%;
		top: 0;
		left: 18rpx;
		margin: 0;
		width: 0rpx;
		border-right-width: 1px;
		transform: none !important;
	}

	.zx-custom-left {
		left: 20rpx !important;
	}
</style>

<template>
	<view class="zx-cell" :style="[customStyle]"
		:hover-class="(!disabled && (clickable || isLink)) ? 'zx-cell--clickable' : ''" :hover-stay-time="250"
		@tap="clickHandler">
		<view class="zx-cell__body" :class="[ center && 'zx-cell--center', size === 'large' && 'zx-cell__body--large']">
			<view class="zx-cell__body__content">
				<view class="zx-cell__left-icon-wrap" v-if="$slots.icon || icon">
					<slot name="icon" v-if="$slots.icon"></slot>
					<zx-icon v-else :name="icon" :custom-style="iconStyle" :size="size === 'large' ? '50rpx' : '36rpx'"></zx-icon>
				</view>
				<view class="zx-cell__title">
					<slot name="title">
						<text v-if="title" class="zx-cell__title-text" :style="[titleTextStyle]"
							:class="[disabled && 'zx-cell--disabled', size === 'large' && 'zx-cell__title-text--large']">{{ title }}</text>
					</slot>
					<slot name="label">
						<text class="zx-cell__label" v-if="label"
							:class="[disabled && 'zx-cell--disabled', size === 'large' && 'zx-cell__label--large']">{{ label }}</text>
					</slot>
				</view>
			</view>
			<slot name="value">
				<text class="zx-cell__value"
					:class="[disabled && 'zx-cell--disabled', size === 'large' && 'zx-cell__value--large']">{{ value }}</text>
			</slot>
			<view class="zx-cell__right-icon-wrap" v-if="$slots['right-icon'] || isLink"
				:class="[`zx-cell__right-icon-wrap--${arrowDirection}`]">
				<slot name="right-icon" v-if="$slots['right-icon']">
				</slot>
				<zx-icon v-else :name="rightIcon" :custom-style="rightIconStyle" :color="disabled ? '#c8c9cc' : 'info'" :size="size === 'large' ? '36rpx' : '32rpx'"></zx-icon>
			</view>
		</view>
		<zx-line v-if="border"></zx-line>
	</view>
</template>

<script>
	/**
	 * cell  单元格
	 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。
	 * @tutorial https://zxui.org/components/cell
	 * @property {String | Number}	title			标题
	 * @property {String | Number}	label			标题下方的描述信息
	 * @property {String | Number}	value			右侧的内容
	 * @property {String}			icon			左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
	 * @property {Boolean}			disabled		是否禁用cell	
	 * @property {Boolean}			border			是否显示下边框 (默认 true )
	 * @property {Boolean}			center			内容是否垂直居中(主要是针对右侧的value部分) (默认 false )
	 * @property {String}			url				点击后跳转的URL地址
	 * @property {String}			linkType		链接跳转的方式，内部使用的是uView封装的route方法，可能会进行拦截操作 (默认 'navigateTo' )
	 * @property {Boolean}			clickable		是否开启点击反馈(表现为点击时加上灰色背景) （默认 false ） 
	 * @property {Boolean}			isLink			是否展示右侧箭头并开启点击反馈 （默认 false ）
	 * @property {Boolean}			required		是否显示表单状态下的必填星号(此组件可能会内嵌入input组件) （默认 false ）
	 * @property {String}			rightIcon		右侧的图标箭头 （默认 'arrow-right'）
	 * @property {String}			arrowDirection	右侧箭头的方向，可选值为：left，up，down
	 * @property {Object | String}			rightIconStyle	右侧箭头图标的样式
	 * @property {Object | String}			titleStyle		标题的样式
	 * @property {Object | String}			iconStyle		左侧图标样式
	 * @property {String}			size			单位元的大小，可选值为 large，normal，mini 
	 * @property {Boolean}			stop			点击cell是否阻止事件传播 (默认 true )
	 * @property {Object}			customStyle		定义需要用到的外部样式
	 * 
	 * @event {Function}			click			点击cell列表时触发
	 * @example 该组件需要搭配cell-group组件使用，见官方文档示例
	 */
	export default {
		name: 'zx-cell',
		data() {
			return {

			}
		},
		props: {
		    // 标题
		    title: {
		        type: [String, Number],
		        default: ''
		    },
		    // 标题下方的描述信息
		    label: {
		        type: [String, Number],
		        default: ''
		    },
		    // 右侧的内容
		    value: {
		        type: [String, Number],
		        default: ''
		    },
		    // 左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
		    icon: {
		        type: String,
		        default: ''
		    },
		    // 是否禁用cell
		    disabled: {
		        type: Boolean,
		        default: false
		    },
		    // 是否显示下边框
		    border: {
		        type: Boolean,
		        default: true
		    },
		    // 内容是否垂直居中(主要是针对右侧的value部分)
		    center: {
		        type: Boolean,
		        default: false
		    },
		    // 点击后跳转的URL地址
		    url: {
		        type: String,
		        default: ''
		    },
		    // 链接跳转的方式，内部使用的是封装的route方法，可能会进行拦截操作
		    linkType: {
		        type: String,
		        default: 'navigateTo'
		    },
		    // 是否开启点击反馈(表现为点击时加上灰色背景)
		    clickable: {
		        type: Boolean,
		        default: false
		    },
		    // 是否展示右侧箭头并开启点击反馈
		    isLink: {
		        type: Boolean,
		        default: false
		    },
		    // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
		    required: {
		        type: Boolean,
		        default: false
		    },
		    // 右侧的图标箭头
		    rightIcon: {
		        type: String,
		        default: 'arrow-right'
		    },
		    // 右侧箭头的方向，可选值为：left，up，down
		    arrowDirection: {
		        type: String,
		        default: 'right'
		    },
		    // 左侧图标样式
		    iconStyle: {
		        type: [Object, String],
		        default: () => {
					return {}
				}
		    },
		    // 右侧箭头图标的样式
		    rightIconStyle: {
		        type: [Object, String],
		        default: () => {
					return {}
				}
		    },
		    // 标题的样式
		    titleStyle: {
		        type: [Object, String],
				default: () => {
					return {}
				}
		    },
		    // 单位元的大小，可选值为large
		    size: {
		        type: String,
		        default: ''
		    },
		    // 点击cell是否阻止事件传播
		    stop: {
		        type: Boolean,
		        default: true
		    },
		    // 标识符，cell被点击时返回
		    name: {
		        type: [Number, String],
		        default: ''
		    },
			customStyle: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		computed: {
			titleTextStyle() {
				return this.titleStyle
			}
		},
		methods: {
			// 点击cell
			clickHandler(e) {
				if (this.disabled) return
				this.$emit('click', {
					name: this.name
				})
				// 如果配置了url(此props参数通过mixin引入)参数，跳转页面
				this.openPage()
				// 是否阻止事件传播
				this.stop && this.preventEvent(e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../theme.scss";
	@import "../../libs/css/components.scss";

	$zx-cell-padding: 10px 15px !default;
	$zx-cell-font-size: 15px !default;
	$zx-cell-line-height: 24px !default;
	$zx-cell-color: $zx-main-color !default;
	$zx-cell-icon-size: 16px !default;
	$zx-cell-title-font-size: 15px !default;
	$zx-cell-title-line-height: 22px !default;
	$zx-cell-title-color: $zx-main-color !default;
	$zx-cell-label-font-size: 12px !default;
	$zx-cell-label-color: $zx-tips-color !default;
	$zx-cell-label-line-height: 18px !default;
	$zx-cell-value-font-size: 14px !default;
	$zx-cell-value-color: $zx-content-color !default;
	$zx-cell-clickable-color: $zx-bg-color !default;
	$zx-cell-disabled-color: #c8c9cc !default;
	$zx-cell-padding-top-large: 13px !default;
	$zx-cell-padding-bottom-large: 13px !default;
	$zx-cell-value-font-size-large: 15px !default;
	$zx-cell-label-font-size-large: 14px !default;
	$zx-cell-title-font-size-large: 16px !default;
	$zx-cell-left-icon-wrap-margin-right: 4px !default;
	$zx-cell-right-icon-wrap-margin-left: 4px !default;
	$zx-cell-title-flex:1 !default;
	$zx-cell-label-margin-top:5px !default;


	.zx-cell {
		&__body {
			@include flex();
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			/* #endif */
			padding: $zx-cell-padding;
			font-size: $zx-cell-font-size;
			color: $zx-cell-color;
			// line-height: $zx-cell-line-height;
			align-items: center;

			&__content {
				@include flex(row);
				align-items: center;
				flex: 1;
			}

			&--large {
				padding-top: $zx-cell-padding-top-large;
				padding-bottom: $zx-cell-padding-bottom-large;
			}
		}

		&__left-icon-wrap,
		&__right-icon-wrap {
			@include flex();
			align-items: center;
			// height: $zx-cell-line-height;
			font-size: $zx-cell-icon-size;
		}

		&__left-icon-wrap {
			margin-right: $zx-cell-left-icon-wrap-margin-right;
		}

		&__right-icon-wrap {
			margin-left: $zx-cell-right-icon-wrap-margin-left;
			transition: transform 0.3s;

			&--up {
				transform: rotate(-90deg);
			}

			&--down {
				transform: rotate(90deg);
			}
		}

		&__title {
			flex: $zx-cell-title-flex;

			&-text {
				font-size: $zx-cell-title-font-size;
				line-height: $zx-cell-title-line-height;
				color: $zx-cell-title-color;

				&--large {
					font-size: $zx-cell-title-font-size-large;
				}
			}

		}

		&__label {
			margin-top: $zx-cell-label-margin-top;
			font-size: $zx-cell-label-font-size;
			color: $zx-cell-label-color;
			line-height: $zx-cell-label-line-height;

			&--large {
				font-size: $zx-cell-label-font-size-large;
			}
		}

		&__value {
			text-align: right;
			font-size: $zx-cell-value-font-size;
			line-height: $zx-cell-line-height;
			color: $zx-cell-value-color;

			&--large {
				font-size: $zx-cell-value-font-size-large;
			}
		}

		&--clickable {
			background-color: $zx-cell-clickable-color;
		}

		&--disabled {
			color: $zx-cell-disabled-color;
			/* #ifndef APP-NVUE */
			cursor: not-allowed;
			/* #endif */
		}

		&--center {
			align-items: center;
		}
	}
</style>

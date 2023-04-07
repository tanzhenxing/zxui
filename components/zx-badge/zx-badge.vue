<template>
	<view class="zx-badge">
		<slot></slot>
		<text v-if="show || text!==''" :class="[this.size,this.absolute ? 'absolute' : '',this.type]" :style="[positionStyle, getStyle,customStyle, dotStyle]"
			class="badge" @click="onClick()">{{displayValue}}</text>
	</view>
</template>

<script>
	/**
	 * Badge 数字角标
	 * @description 数字角标一般和其它控件（列表、9宫格等）配合使用，用于进行数量提示
	 * @tutorial
	 * @property {String} type = [info|primary|success|warning|error] 颜色类型
	 * @property {String} text 角标内容
	 * @property {String} size = [normal|small] 角标大小
	 * @property {String} inverted = [true|false] 是否无需背景颜色
	 * @property {Number} maxNum 展示封顶的数字值，超过 99 显示 99+
	 * @property {String} absolute = [rightTop|rightBottom|leftBottom|leftTop] 开启绝对定位, 角标将定位到其包裹的标签的四角上		
	 * @property {Array[number]} offset	距定位角中心点的偏移量，只有存在 absolute 属性时有效
	 * @property {String} isDot = [true|false] 是否显示为一个小点
	 * @event {Function} click 点击 Badge 触发事件
	 * @example <zx-badge text="1"></zx-badge>
	 */
	export default {
		name: 'zx-badge',
		emits: ['click'],
		props: {
			// 是否显示
			show: {
			    type: Boolean,
			    default: true
			},
			type: {
				type: String,
				default: 'error'
			},
			// 背景颜色，优先级比type高，如设置，type参数会失效
			bgColor: {
			    type: String,
			    default: ''
			},
			// 字体颜色
			color: {
			    type: String,
			    default: '#ffffff'
			},
			inverted: {
				type: Boolean,
				default: false
			},
			isDot: {
				type: Boolean,
				default: false
			},
			maxNum: {
				type: Number,
				default: 99
			},
			absolute: {
				type: String,
				default: ''
			},
			offset: {
				type: Array,
				default () {
					return [0, 0]
				}
			},
			text: {
				type: [String, Number],
				default: ''
			},
			size: {
				type: String,
				default: 'small'
			},
			customStyle: {
				type: [Object,String],
				default () {
					return {}
				}
			}
		},
		data() {
			return {};
		},
		computed: {
			width() {
				return String(this.text).length * 8 + 12
			},
			classNames() {
				
				return [
					this.size,
					this.absolute ? 'absolute' : ''
				].join(' ')
			},
			positionStyle() {
				if (!this.absolute) return {}
				let w = this.width / 2,
					h = 10
				if (this.isDot) {
					w = 5
					h = 5
				}
				const x = `${- w  + this.offset[0]}px`
				const y = `${- h + this.offset[1]}px`

				const whiteList = {
					rightTop: {
						right: x,
						top: y
					},
					rightBottom: {
						right: x,
						bottom: y
					},
					leftBottom: {
						left: x,
						bottom: y
					},
					leftTop: {
						left: x,
						top: y
					}
				}
				const match = whiteList[this.absolute]
				return match ? match : whiteList['rightTop']
			},
			dotStyle() {
				if (!this.isDot) return {}
				return {
					width: '10px',
					minWidth: '0',
					height: '10px',
					padding: '0',
					borderRadius: '10px'
				}
			},
			getStyle(){
				let style = {color:this.color};
				if(this.bgColor){
					style.backgroundColor = this.bgColor;
				}
				return style;
			},
			displayValue() {
				const {
					isDot,
					text,
					maxNum
				} = this
				return isDot ? '' : (Number(text) > maxNum ? `${maxNum}+` : text)
			}
		},
		methods: {
			onClick() {
				this.$emit('click');
			}
		}
	};
</script>

<style lang="scss">
	@import '../../theme.scss';
	
	$bage-size: 24rpx;
	$bage-small: scale(0.8);

	.zx-badge {
		/* #ifdef APP-NVUE */
		// align-self: flex-start;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
		position: relative;
		
		.absolute {
			position: absolute;
		}
		
		.small {
			transform: $bage-small;
			transform-origin: center center;
		}
		
		.normal {
			
		}
		
		.badge {
			/* #ifndef APP-NVUE */
			display: flex;
			overflow: hidden;
			box-sizing: border-box;
			/* #endif */
			justify-content: center;
			flex-direction: row;
			height: 20px;
			min-width: 20px;
			padding: 0 4px;
			line-height: 18px;
			color: #fff;
			border-radius: 100px;
			background-color: #909399;
			background-color: transparent;
			border: 1px solid #fff;
			text-align: center;
			font-family: 'Helvetica Neue', Helvetica, sans-serif;
			font-feature-settings: "tnum";
			font-size: $bage-size;
			/* #ifdef H5 */
			z-index: 999;
			cursor: pointer;
			/* #endif */
		}
		
		.info {
			color: #fff;
			background-color: $zx-info;
		}
		
		.primary {
			background-color: $zx-primary;
		}
		
		.success {
			background-color: $zx-success;
		}
		
		.warning {
			background-color: $zx-warning;
		}
		
		.error {
			background-color: $zx-error;
		}
		
		.inverted {
			padding: 0 5px 0 0;
			color: $zx-info;
		}
		
		.info-inverted {
			color: $zx-info;
			background-color: transparent;
		}
		
		.primary-inverted {
			color: $zx-primary;
			background-color: transparent;
		}
		
		.success-inverted {
			color: $zx-success;
			background-color: transparent;
		}
		
		.warning-inverted {
			color: $zx-warning;
			background-color: transparent;
		}
		
		.error-inverted {
			color: $zx-error;
			background-color: transparent;
		}
		
	}
	
</style>

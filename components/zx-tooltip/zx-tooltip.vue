<template>
	<view class="zx-tooltip" :style="customStyle">
		<zx-overlay :show="showTooltip && tooltipTop !== -10000 && overlay" customStyle="backgroundColor: rgba(0, 0, 0, 0)" @click="overlayClickHandler"></zx-overlay>
		<view class="zx-tooltip__wrapper">
			<text class="zx-tooltip__wrapper__text"
				:id="textId"
				:ref="textId"
				:userSelect="false"
				:selectable="false"
				:style="{color: color,backgroundColor: bgColor && showTooltip && tooltipTop !== -10000 ? bgColor : 'transparent'}"
				@longpress.stop="longpressHandler">
				{{ text }}
			</text>
			<zx-transition mode="fade" :show="showTooltip" duration="300" :customStyle="{position: 'absolute',top: tooltipTop,zIndex: zIndex,...tooltipStyle}">
				<view class="zx-tooltip__wrapper__popup" :id="tooltipId" :ref="tooltipId">
					<view v-if="showCopy || buttons.length"
						class="zx-tooltip__wrapper__popup__indicator"
						hover-class="zx-tooltip__wrapper__popup__indicator--hover"
						:style="[indicatorStyle,{width: indicatorWidth,height: indicatorWidth}]">
						<!-- 由于nvue不支持三角形绘制，这里就做一个四方形，再旋转45deg，得到露出的一个三角 -->
					</view>
					<view class="zx-tooltip__wrapper__popup__list">
						<view v-if="showCopy" class="zx-tooltip__wrapper__popup__list__btn" hover-class="zx-tooltip__wrapper__popup__list__btn--hover" @tap="setClipboardData">
							<text class="zx-tooltip__wrapper__popup__list__btn__text">复制</text>
						</view>
						<zx-line direction="column" color="#8d8e90" v-if="showCopy && buttons.length > 0" length="18"></zx-line>
						<block v-for="(item, index) in buttons" :key="index">
							<view class="zx-tooltip__wrapper__popup__list__btn" hover-class="zx-tooltip__wrapper__popup__list__btn--hover">
								<text class="zx-tooltip__wrapper__popup__list__btn__text" @tap="btnClickHandler(index)">{{ item }}</text>
							</view>
							<zx-line v-if="index < buttons.length - 1" direction="column" color="#8d8e90" length="18"></zx-line>
						</block>
					</view>
				</view>
			</zx-transition>
		</view>
	</view>
</template>

<script>
import myString from '../../libs/js/string.js';
import util from '../../libs/js/util.js';

// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif
// #ifdef H5
import ClipboardJS from 'clipboard';
// #endif
/**
 * Tooltip
 * @description
 * @tutorial https://zxui.org/components/tooltip
 * @property {String | Number}	text		需要显示的提示文字
 * @property {String | Number}	copyText	点击复制按钮时，复制的文本，为空则使用text值
 * @property {String | Number}	size		文本大小（默认 14 ）
 * @property {String}			color		字体颜色（默认 '#606266' ）
 * @property {String}			bgColor		弹出提示框时，文本的背景色（默认 'transparent' ）
 * @property {String}			direction	弹出提示的方向，top-上方，bottom-下方（默认 'top' ）
 * @property {String | Number}	zIndex		弹出提示的z-index，nvue无效（默认 10071 ）
 * @property {Boolean}			showCopy	是否显示复制按钮（默认 true ）
 * @property {Array}			buttons		扩展的按钮组
 * @property {Boolean}			overlay		是否显示透明遮罩以防止触摸穿透（默认 true ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event {Function}
 * @example
 */
export default {
	name: 'zx-tooltip',
	data() {
		return {
			// 是否展示气泡
			showTooltip: true,
			// 生成唯一id，防止一个页面多个组件，造成干扰
			textId: myString.uuid(),
			tooltipId: myString.uuid(),
			// 初始时甚至为很大的值，让其移到屏幕外面，为了计算元素的尺寸
			tooltipTop: -10000,
			// 气泡的位置信息
			tooltipInfo: {
				width: 0,
				left: 0
			},
			// 文本的位置信息
			textInfo: {
				width: 0,
				left: 0
			},
			// 三角形指示器的样式
			indicatorStyle: {},
			// 气泡在可能超出屏幕边沿范围时，重新定位后，距离屏幕边沿的距离
			screenGap: 12,
			// 三角形指示器的宽高，由于对元素进行了角度旋转，精确计算指示器位置时，需要用到其尺寸信息
			indicatorWidth: 14
		};
	},
	props: {
	    // 需要显示的提示文字
	    text: {
	        type: [String, Number],
	        default: ''
	    },
	    // 点击复制按钮时，复制的文本，为空则使用text值
	    copyText: {
	        type: [String, Number],
	        default: ''
	    },
	    // 文本大小
	    size: {
	        type: [String, Number],
	        default: '28rpx'
	    },
	    // 字体颜色
	    color: {
	        type: String,
	        default: '#606266'
	    },
	    // 弹出提示框时，文本的背景色
	    bgColor: {
	        type: String,
	        default: 'transparent'
	    },
	    // 弹出提示的方向，top-上方，bottom-下方
	    direction: {
	        type: String,
	        default: 'top'
	    },
	    // 弹出提示的z-index，nvue无效
	    zIndex: {
	        type: [String, Number],
	        default: '10071'
	    },
	    // 是否显示复制按钮
	    showCopy: {
	        type: Boolean,
	        default: true
	    },
	    // 扩展的按钮组
	    buttons: {
	        type: Array,
	        default: function(){
				return []
			}
	    },
	    // 是否显示透明遮罩以防止触摸穿透
	    overlay: {
	        type: Boolean,
	        default: true
	    },
	    // 是否显示复制成功或者失败的toast
	    showToast: {
	        type: Boolean,
	        default: true
	    }
	},
	watch: {
		propsChange() {
			//this.getElRect();
		}
	},
	computed: {
		// 特别处理H5的复制，因为H5浏览器是自带系统复制功能的，在H5环境
		// 当一些依赖参数变化时，需要重新计算气泡和指示器的位置信息
		propsChange() {
			return [this.text, this.buttons];
		},
		// 计算气泡和指示器的位置信息
		tooltipStyle() {
			const style = {
					transform: `translateY(${this.direction === 'top' ? '-100%' : '100%'})`
				},
				sys = util.sys();
			if (this.tooltipInfo.width / 2 > this.textInfo.left + this.textInfo.width / 2 - this.screenGap) {
				this.indicatorStyle = {};
				style.left = `-${this.textInfo.left - this.screenGap}`;
				this.indicatorStyle.left = this.textInfo.width / 2 - uni.upx2px(style.left) - this.indicatorWidth / 2;
			} else if (this.tooltipInfo.width / 2 > sys.windowWidth - this.textInfo.right + this.textInfo.width / 2 - this.screenGap) {
				this.indicatorStyle = {};
				style.right = `-${sys.windowWidth - this.textInfo.right - this.screenGap}`;
				this.indicatorStyle.right = this.textInfo.width / 2 - uni.upx2px(style.right) - this.indicatorWidth / 2;
			} else {
				const left = Math.abs(this.textInfo.width / 2 - this.tooltipInfo.width / 2);
				style.left = this.textInfo.width > this.tooltipInfo.width ? left : -left;
				this.indicatorStyle = {};
			}
			if (this.direction === 'top') {
				style.marginTop = '-10px';
				this.indicatorStyle.bottom = '-4px';
			} else {
				style.marginBottom = '-10px';
				this.indicatorStyle.top = '-4px';
			}
			return style;
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getElRect();
		},
		// 长按触发事件
		async longpressHandler() {
			this.tooltipTop = 0;
			this.showTooltip = true;
		},
		// 点击透明遮罩
		overlayClickHandler() {
			this.showTooltip = false;
		},
		// 点击弹出按钮
		btnClickHandler(index) {
			this.showTooltip = false;
			// 如果需要展示复制按钮，此处index需要加1，因为复制按钮在第一个位置
			this.$emit('click', this.showCopy ? index + 1 : index);
		},
		// 查询内容高度
		queryRect(ref) {
			// #ifndef APP-NVUE
			// 组件内部一般用this.$uGetRect，对外的为uni.$u.getRect，二者功能一致，名称不同
			return new Promise(resolve => {
				util.getRect(`#${ref}`).then(size => {
					resolve(size);
				});
			});
			// #endif

			// #ifdef APP-NVUE
			// nvue下，使用dom模块查询元素高度
			// 返回一个promise，让调用此方法的主体能使用then回调
			return new Promise(resolve => {
				dom.getComponentRect(this.$refs[ref], res => {
					resolve(res.size);
				});
			});
			// #endif
		},
		// 元素尺寸
		getElRect() {
			// 调用之前，先将指示器调整到屏幕外，方便获取尺寸
			this.showTooltip = true;
			this.tooltipTop = -10000;
			util.sleep(500).then(() => {
				this.queryRect(this.tooltipId).then(size => {
					this.tooltipInfo = size;
					// 获取气泡尺寸之后，将其隐藏，为了让下次切换气泡显示与隐藏时，有淡入淡出的效果
					this.showTooltip = false;
				});
				this.queryRect(this.textId).then(size => {
					this.textInfo = size;
				});
			});
		},
		// 复制文本到粘贴板
		setClipboardData() {
			// 关闭组件
			this.showTooltip = false;
			this.$emit('click', 0);
			// #ifndef H5
			uni.setClipboardData({
				// 优先使用copyText字段，如果没有，则默认使用text字段当做复制的内容
				data: this.copyText || this.text,
				success: () => {
					this.showToast && uni.$u.toast('复制成功');
				},
				fail: () => {
					this.showToast && uni.$u.toast('复制失败');
				},
				complete: () => {
					this.showTooltip = false;
				}
			});
			// #endif

			// #ifdef H5
			let event = window.event || e || {};
			let clipboard = new ClipboardJS('', {
				text: () => this.copyText || this.text
			});
			clipboard.on('success', e => {
				this.showToast && uni.$u.toast('复制成功');
				clipboard.off('success');
				clipboard.off('error');
				// 在单页应用中，需要销毁DOM的监听
				clipboard.destroy();
			});
			clipboard.on('error', e => {
				this.showToast && uni.$u.toast('复制失败');
				clipboard.off('success');
				clipboard.off('error');
				// 在单页应用中，需要销毁DOM的监听
				clipboard.destroy();
			});
			clipboard.onClick(event);
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.zx-tooltip {
	position: relative;
	display: flex;

	&__wrapper {
		display: flex;
		justify-content: center;
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		/* #endif */

		&__text {
			font-size: 14px;
		}

		&__popup {
			display: flex;
			justify-content: center;

			&__list {
				background-color: #060607;
				position: relative;
				flex: 1;
				border-radius: 5px;
				padding: 0px 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				overflow: hidden;

				&__btn {
					padding: 11px 13px;

					&--hover {
						background-color: #58595b;
					}

					&__text {
						line-height: 12px;
						font-size: 13px;
						color: #ffffff;
					}
				}
			}

			&__indicator {
				position: absolute;
				background-color: #060607;
				width: 14px;
				height: 14px;
				bottom: -4px;
				transform: rotate(45deg);
				border-radius: 2px;
				z-index: -1;

				&--hover {
					background-color: #58595b;
				}
			}
		}
	}
}
</style>

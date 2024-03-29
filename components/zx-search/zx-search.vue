<template>
	<view class="zx-search" :style="[{margin: margin,}, customStyle]" @tap="clickHandler">
		<view class="zx-search__content"
		    :style="{backgroundColor: bgColor,borderRadius: shape == 'round' ? '100px' : '4px',borderColor: borderColor}">
			<template v-if="$slots.label || label !== null">
				<slot name="label">
					<text class="zx-search__content__label">{{ label }}</text>
				</slot>
			</template>
			<view class="zx-search__content__icon">
				<zx-icon :size="searchIconSize" :name="searchIcon" :color="searchIconColor ? searchIconColor : color" @tap="clickIcon"></zx-icon>
			</view>
			<input
			    confirm-type="search"
				:value="value"
				:disabled="disabled"
			    :focus="focus"
			    :maxlength="maxlength"
			    placeholder-class="zx-search__content__input--placeholder"
			    :placeholder="placeholder"
			    :placeholder-style="`color: ${placeholderColor}`"
			    class="zx-search__content__input"
			    type="text"
			    :style="[{textAlign: inputAlign,color: color,backgroundColor: bgColor,height: height}, inputStyle]"
				@blur="blur"
				@confirm="search"
				@input="inputChange"
				@focus="getFocus"
			/>
			<view v-if="keyword && clearabled && focused" class="zx-search__content__icon zx-search__content__close" @tap="clear">
				<zx-icon name="close" size="11" color="#ffffff" :customStyle="{lineHeight: '12px'}"></zx-icon>
			</view>
		</view>
		<text :style="[actionStyle]" class="zx-search__action" :class="[(showActionBtn || show) && 'zx-search__action--active']"  @tap.stop.prevent="custom">{{ actionText }}</text>
	</view>
</template>

<script>
	/**
	 * search 搜索框
	 * @description 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。
	 * @tutorial https://zxui.org/components/search
	 * @property {String}			shape				搜索框形状，round-圆形，square-方形（默认 'round' ）
	 * @property {String}			bgColor				搜索框背景颜色（默认 '#f2f2f2' ）
	 * @property {String}			placeholder			占位文字内容（默认 '请输入关键字' ）
	 * @property {Boolean}			clearabled			是否启用清除控件（默认 true ）
	 * @property {Boolean}			focus				是否自动获得焦点（默认 false ）
	 * @property {Boolean}			showAction			是否显示右侧控件（默认 true ）
	 * @property {Object}			actionStyle			右侧控件的样式，对象形式
	 * @property {String}			actionText			右侧控件文字（默认 '搜索' ）
	 * @property {String}			inputAlign			输入框内容水平对齐方式 （默认 'left' ）
	 * @property {Object}			inputStyle			自定义输入框样式，对象形式
	 * @property {Boolean}			disabled			是否启用输入框（默认 false ）
	 * @property {String}			borderColor			边框颜色，配置了颜色，才会有边框 (默认 'transparent' )
	 * @property {String}			searchIconColor		搜索图标的颜色，默认同输入框字体颜色 (默认 '#909399' )
	 * @property {Number | String}	searchIconSize 搜索图标的字体，默认22
	 * @property {String}			color				输入框字体颜色（默认 '#606266' ）
	 * @property {String}			placeholderColor	placeholder的颜色（默认 '#909399' ）
	 * @property {String}			searchIcon			输入框左边的图标，可以为uView图标名称或图片路径  (默认 'search' )
	 * @property {String}			margin				组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"   (默认 '0' )
	 * @property {Boolean} 			animation			是否开启动画，见上方说明（默认 false ）
	 * @property {String}			value				输入框初始值
	 * @property {String | Number}	maxlength			输入框最大能输入的长度，-1为不限制长度  (默认 '-1' )
	 * @property {String | Number}	height				输入框高度，单位px（默认 64 ）
	 * @property {String | Number}	label				搜索框左边显示内容
	 * @property {Object}			customStyle			定义需要用到的外部样式
	 *
	 * @event {Function} change 输入框内容发生变化时触发
	 * @event {Function} search 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
	 * @event {Function} custom 用户点击右侧控件时触发
	 * @event {Function} clear 用户点击清除按钮时触发
	 * @example <zx-search placeholder="日照香炉生紫烟" v-model="keyword"></zx-search>
	 */
	export default {
		name: "zx-search",
		props: {
		    // 搜索框形状，round-圆形，square-方形
		    shape: {
		        type: String,
		        default: 'round'
		    },
		    // 搜索框背景色，默认值#f2f2f2
		    bgColor: {
		        type: String,
		        default: '#f2f2f2'
		    },
		    // 占位提示文字
		    placeholder: {
		        type: String,
		        default: '请输入关键字'
		    },
		    // 是否启用清除控件
		    clearabled: {
		        type: Boolean,
		        default: true
		    },
		    // 是否自动聚焦
		    focus: {
		        type: Boolean,
		        default: false
		    },
		    // 是否在搜索框右侧显示按钮
		    showAction: {
		        type: Boolean,
		        default: true
		    },
		    // 右边控件的样式
		    actionStyle: {
		        type: Object,
		        default: function(){
					return {};
				}
		    },
		    // 右侧按钮文字
		    actionText: {
		        type: String,
		        default: '搜索'
		    },
		    // 输入框内容对齐方式，可选值为 left|center|right
		    inputAlign: {
		        type: String,
		        default: 'left'
		    },
		    // input输入框的样式，可以定义文字颜色，大小等，对象形式
		    inputStyle: {
		        type: Object,
		        default: function(){
					return {};
				}
		    },
		    // 是否启用输入框
		    disabled: {
		        type: Boolean,
		        default: false
		    },
		    // 边框颜色
		    borderColor: {
		        type: String,
		        default: 'transparent'
		    },
		    // 搜索图标的颜色，默认同输入框字体颜色
		    searchIconColor: {
		        type: String,
		        default: '#909399'
		    },
		    // 输入框字体颜色
		    color: {
		        type: String,
		        default: '#606266'
		    },
		    // placeholder的颜色
		    placeholderColor: {
		        type: String,
		        default: '#909399'
		    },
		    // 左边输入框的图标名称或图片路径
		    searchIcon: {
		        type: String,
		        default: 'search'
		    },
		    searchIconSize: {
		        type: [Number, String],
		        default: '44rpx'
		    },
		    // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
		    margin: {
		        type: String,
		        default: '0rpx'
		    },
		    // 开启showAction时，是否在input获取焦点时才显示
		    animation: {
		        type: Boolean,
		        default: false
		    },
		    // 输入框的初始化内容
		    value: {
		        type: String,
		        default: ''
		    },
		    // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
		    maxlength: {
		        type: [String, Number],
		        default: -1
		    },
		    // 搜索框高度，单位px
		    height: {
		        type: [String, Number],
		        default: '80rpx'
		    },
		    // 搜索框左侧文本
		    label: {
		        type: [String, Number, null],
		        default: ''
		    },
			customStyle: {
				type: Object,
				default: function(){
					return {};
				}
			}
		},
		data() {
			return {
				keyword: '',
				showClear: false, // 是否显示右边的清除图标
				show: false,
				// 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
				focused: this.focus
				// 绑定输入框的值
				// inputValue: this.value
			};
		},
		watch: {
			keyword(nVal) {
				// 双向绑定值，让v-model绑定的值双向变化
				this.$emit('input', nVal);
				// 触发change事件，事件效果和v-model双向绑定的效果一样，让用户多一个选择
				this.$emit('change', nVal);
			},
			value: {
				immediate: true,
				handler(nVal) {
					this.keyword = nVal;
				}
			}
		},
		computed: {
			showActionBtn() {
				return !this.animation && this.showAction
			}
		},
		methods: {
			// 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
			inputChange(e) {
				this.keyword = e.detail.value;
			},
			// 清空输入
			// 也可以作为用户通过this.$refs形式调用清空输入框内容
			clear() {
				this.keyword = '';
				// 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
				this.$nextTick(() => {
					this.$emit('clear');
				})
			},
			// 确定搜索
			search(e) {
				this.$emit('search', e.detail.value);
				try {
					// 收起键盘
					uni.hideKeyboard();
				} catch (e) {}
			},
			// 点击右边自定义按钮的事件
			custom() {
				this.$emit('custom', this.keyword);
				try {
					// 收起键盘
					uni.hideKeyboard();
				} catch (e) {}
			},
			// 获取焦点
			getFocus() {
				this.focused = true;
				// 开启右侧搜索按钮展开的动画效果
				if (this.animation && this.showAction) this.show = true;
				this.$emit('focus', this.keyword);
			},
			// 失去焦点
			blur() {
				// 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
				// 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
				setTimeout(() => {
					this.focused = false;
				}, 100)
				this.show = false;
				this.$emit('blur', this.keyword);
			},
			// 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
			clickHandler() {
				if (this.disabled) this.$emit('click');
			},
			// 点击左边图标
			clickIcon() {
				this.$emit('clickIcon');
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "@tanzhenxing/zxui/theme.scss";

$zx-search-content-padding: 0 10px !default;
$zx-search-label-color: $zx-main-color !default;
$zx-search-label-font-size: 14px !default;
$zx-search-label-margin: 0 4px !default;
$zx-search-close-size: 20px !default;
$zx-search-close-radius: 100px !default;
$zx-search-close-bgColor: #C6C7CB !default;
$zx-search-close-transform: scale(0.82) !default;
$zx-search-input-font-size: 14px !default;
$zx-search-input-margin: 0 5px !default;
$zx-search-input-color: $zx-main-color !default;
$zx-search-input-placeholder-color: $zx-tips-color !default;
$zx-search-action-font-size: 14px !default;
$zx-search-action-color: $zx-main-color !default;
$zx-search-action-width: 0 !default;
$zx-search-action-active-width: 40px !default;
$zx-search-action-margin-left: 5px !default;

/* #ifdef H5 */
// iOS15在H5下，hx的某些版本，input type=search时，会多了一个搜索图标，进行移除
[type="search"]::-webkit-search-decoration {
    display: none;
}
/* #endif */

.zx-search {
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 1;

	&__content {
		display: flex;
		align-items: center;
		padding: $zx-search-content-padding;
		flex: 1;
		justify-content: space-between;
		border-width: 1px;
		border-color: transparent;
		border-style: solid;
		overflow: hidden;

		&__icon {
			display: flex;
			align-items: center;
		}

		&__label {
			color: $zx-search-label-color;
			font-size: $zx-search-label-font-size;
			margin: $zx-search-label-margin;
		}

		&__close {
			width: $zx-search-close-size;
			height: $zx-search-close-size;
			border-top-left-radius: $zx-search-close-radius;
			border-top-right-radius: $zx-search-close-radius;
			border-bottom-left-radius: $zx-search-close-radius;
			border-bottom-right-radius: $zx-search-close-radius;
			background-color: $zx-search-close-bgColor;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			transform: $zx-search-close-transform;
		}

		&__input {
			flex: 1;
			font-size: $zx-search-input-font-size;
			line-height: 1;
			margin: $zx-search-input-margin;
			color: $zx-search-input-color;

			&--placeholder {
				color: $zx-search-input-placeholder-color;
			}
		}
	}

	&__action {
		font-size: $zx-search-action-font-size;
		color: $zx-search-action-color;
		width: $zx-search-action-width;
		overflow: hidden;
		transition-property: width;
		transition-duration: 0.3s;
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		/* #endif */
		text-align: center;

		&--active {
			width: $zx-search-action-active-width;
			margin-left: $zx-search-action-margin-left;
		}
	}
}
</style>

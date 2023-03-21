<template>
	<view class="zx-searchbar__box" :style="{ backgroundColor: backgroundColor, padding: padding }">
		<view class="zx-search-bar__form" :style="{height: height}">
			<view class="zx-search-bar__box"
				:style="{ height: height, borderRadius: radius, backgroundColor: inputBgColor }"  v-if="showInput" >
				<icon class="zx-icon-search" type="search" :size="13"></icon>
				<input type="text" class="zx-search-bar__input" :placeholder="placeholder" :value="valueTxt"
					:focus="isFocus" :disabled="disabled" confirm-type="search" @blur="inputBlur" @focus="inputFocus"
					@input="inputChange" @confirm="search"/>
				<icon type="clear" :size="15" class="zx-icon-clear" v-if="valueTxt.length > 0 && !disabled"
					@tap.stop="clearInput"></icon>
			</view>
			<view class="zx-search-bar__label" :style="{height: height, borderRadius: radius, backgroundColor: inputBgColor }"
				v-if="!isFocus && !searchState && showLabel" @tap="tapShowInput">
				<icon class="zx-icon-search" type="search" :size="13"></icon>
				<text class="zx-search-bar__text">{{ placeholder }}</text>
			</view>
		</view>
		<view v-if="cancel && searchState && !valueTxt" class="zx-search-bar__cancel-btn"
			:style="{ color: cancelColor }" @tap="hideInput">{{ cancelText }}</view>
		<view v-if="valueTxt && !disabled && searchState" class="zx-search-bar__cancel-btn"
			:style="{ color: searchColor }" @tap="search">{{ searchText }}</view>
	</view>
</template>

<script>
	//默认高度52px
	export default {
		name: 'zx-search-bar',
		emits: ['clear', 'focus', 'blur', 'click', 'cancel', 'input', 'search'],
		props: {
			//搜索栏背景色
			backgroundColor: {
				type: String,
				default: '#ededed'
			},
			//搜索栏padding
			padding: {
				type: String,
				default: '8px 10px'
			},
			//input框高度
			height: {
				type: String,
				default: '36px'
			},
			radius: {
				type: String,
				default: '4px'
			},
			//input框背景色
			inputBgColor: {
				type: String,
				default: '#fff'
			},
			focus: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: '请输入搜索关键词'
			},
			value: {
				type: String,
				default: ''
			},
			//input是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			cancelColor: {
				type: String,
				default: '#888'
			},
			cancel: {
				type: Boolean,
				default: true
			},
			searchText: {
				type: String,
				default: '搜索'
			},
			searchColor: {
				type: String,
				default: '#5677fc'
			},
			//是否显示占位标签
			showLabel: {
				type: Boolean,
				default: true
			},
			//是否显示输入框
			showInput: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.valueTxt = this.value;
			this.isFocus = this.focus;
			if (this.focus || this.valueTxt.length > 0) {
				this.searchState = true;
			}
		},
		watch: {
			value(val) {
				this.valueTxt = val;
			}
		},
		data() {
			return {
				searchState: false,
				isFocus: false,
				valueTxt: ''
			};
		},
		methods: {
			clearInput() {
				this.valueTxt = '';
				// #ifdef MP-TOUTIAO || MP-WEIXIN
				this.isFocus = false;
				uni.hideKeyboard()
				// #endif
				// #ifndef MP-TOUTIAO || MP-WEIXIN
				this.isFocus = true;
				// #endif
				this.$emit('clear');
			},
			inputFocus(e) {
				if (!this.showLabel) {
					this.searchState = true
				}
				this.$emit('focus', e.detail);
			},
			inputBlur(e) {
				this.isFocus = false;
				this.$emit('blur', e.detail);
			},
			tapShowInput() {
				if (!this.disabled && this.showInput) {
					this.searchState = true;
					setTimeout(() => {
						this.isFocus = true;
					}, 20)
				}
				this.$emit('click', {});
			},

			hideInput() {
				this.searchState = false;
				this.isFocus = false;
				uni.hideKeyboard()
				this.$emit('cancel', {});
			},
			inputChange(e) {
				this.valueTxt = e.detail.value;
				this.$emit('input', e.detail);
			},
			search() {
				this.$emit('search', {
					value: this.valueTxt
				});
			}
		}
	};
</script>

<style scoped>
	.zx-searchbar__box {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	.zx-search-bar__form {
		position: relative;
		-webkit-box-flex: 1;
		-webkit-flex: auto;
		flex: auto;
	}

	.zx-search-bar__box {
		width: 100%;
		padding-left: 10px;
		padding-right: 8px;
		box-sizing: border-box;
		z-index: 1;
		display: flex;
		align-items: center;
	}

	.zx-search-bar__box .zx-search-bar__input {
		padding: 0 8px;
		width: 100%;
		border: 0;
		font-size: 14px;
		box-sizing: content-box;
		background: transparent;
	}

	.zx-search-bar__box .zx-search-bar__input:focus {
		outline: none;
	}

	.zx-search-bar__box .zx-icon-search {
		flex-shrink: 0;
	}

	.zx-search-bar__box .zx-icon-clear {
		margin-left: 2px;
		flex-shrink: 0;
	}

	.zx-search-bar__label {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		font-size: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.zx-search-bar__cancel-btn {
		font-size: 15px;
		margin-left: 8px;
		line-height: 28px;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.zx-search-bar__text {
		display: inline-block;
		font-size: 14px;
		vertical-align: middle;
		padding-left: 12rpx;
		color: rgba(0, 0, 0, 0.5);
	}
</style>

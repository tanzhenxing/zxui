<template>
	<view class="zx-toolbar" v-if="show">
		<view class="zx-toolbar__cancel__wrapper" hover-class="zx-hover-class">
			<text
				class="zx-toolbar__wrapper__cancel"
				@tap="cancel"
				:style="{
					color: cancelColor
				}"
			>
				{{ cancelText }}
			</text>
		</view>
		<text class="zx-toolbar__title zx-line-1" v-if="title">{{ title }}</text>
		<view class="zx-toolbar__confirm__wrapper" hover-class="zx-hover-class">
			<text
				class="zx-toolbar__wrapper__confirm"
				@tap="confirm"
				:style="{
					color: confirmColor
				}"
			>
				{{ confirmText }}
			</text>
		</view>
	</view>
</template>

<script setup>
/**
 * Toolbar 工具条
 * @description
 * @tutorial https://zxui.org/components/toolbar
 * @property {Boolean}	show			是否展示工具条（默认 true ）
 * @property {String}	cancelText		取消按钮的文字（默认 '取消' ）
 * @property {String}	confirmText		确认按钮的文字（默认 '确认' ）
 * @property {String}	cancelColor		取消按钮的颜色（默认 '#909193' ）
 * @property {String}	confirmColor	确认按钮的颜色（默认 '#3c9cff' ）
 * @property {String}	title			标题文字
 * @event {Function}
 * @example
 */
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// 是否展示工具条
	show: {
		type: Boolean,
		default: true
	},
	// 取消按钮的文字
	cancelText: {
		type: String,
		default: '取消'
	},
	// 确认按钮的文字
	confirmText: {
		type: String,
		default: '确认'
	},
	// 取消按钮的颜色
	cancelColor: {
		type: String,
		default: '#2b85e4'
	},
	// 确认按钮的颜色
	confirmColor: {
		type: String,
		default: '#2b85e4'
	},
	// 标题文字
	title: {
		type: String,
		default: ''
	}
});

// 点击取消按钮
const cancel = () => {
	proxy.$emit('cancel');
};
// 点击确定按钮
const confirm = () => {
	proxy.$emit('confirm');
};
</script>

<style lang="scss" scoped>
$zx-tips-color: #2979ff;
$zx-main-color: #303133;
$zx-primary: #2979ff;

.zx-toolbar {
	height: 42px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__wrapper {
		&__cancel {
			color: $zx-tips-color;
			font-size: 15px;
			padding: 0 15px;
		}
	}

	&__title {
		color: $zx-main-color;
		padding: 0 60rpx;
		font-size: 16px;
		flex: 1;
		text-align: center;
	}

	&__wrapper {
		&__confirm {
			color: $zx-primary;
			font-size: 15px;
			padding: 0 15px;
		}
	}
}
</style>

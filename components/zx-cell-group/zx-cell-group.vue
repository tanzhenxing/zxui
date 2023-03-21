<template>
	<view :style="[customStyle]" class="zx-cell-group">
		<view v-if="title" class="zx-cell-group__title">
			<slot name="title">
				<text class="zx-cell-group__title__text">{{ title }}</text>
			</slot>
		</view>
		<view class="zx-cell-group__wrapper">
			<zx-line v-if="border"></zx-line>
			<slot />
		</view>
	</view>
</template>

<script>
/**
 * cellGroup  单元格
 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。
 * @tutorial https://zxui.org/components/cell
 *
 * @property {String}	title		分组标题
 * @property {Boolean}	border		是否显示外边框 (默认 true )
 * @property {Object}	customStyle	定义需要用到的外部样式
 *
 * @event {Function} click 	点击cell列表时触发
 * @example <zx-cell-group title="设置喜好">
 */
export default {
	name: 'zx-cell-group',
	props: {
		// 分组标题
		title: {
			type: String,
			default: ''
		},
		// 是否显示外边框
		border: {
			type: Boolean,
		 default: true
		},
		customStyle: {
			type: Object,
			default: function() {
				return {};
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	@import "../../theme.scss";
@import '../../libs/css/components.scss';

$zx-cell-group-title-padding: 16px 16px 8px !default;
$zx-cell-group-title-font-size: 15px !default;
$zx-cell-group-title-line-height: 16px !default;
$zx-cell-group-title-color: $zx-main-color !default;

.zx-cell-group {
	flex: 1;

	&__title {
		padding: $zx-cell-group-title-padding;

		&__text {
			font-size: $zx-cell-group-title-font-size;
			line-height: $zx-cell-group-title-line-height;
			color: $zx-cell-group-title-color;
		}
	}

	&__wrapper {
		position: relative;
	}
}
</style>

<template>
	<view class="zx-selected-class zx-dropdown-list" :style="{ height: selectHeight ? selectHeight + 'rpx' : 'auto' }">
		<slot name="selectionbox"></slot>
		<view
			class="zx-dropdown-view"
			:class="[show ? 'zx-dropdownlist-show' : '']"
			:style="{ backgroundColor: backgroundColor, height: show ? height + 'rpx' : 0, top: top + 'rpx' }"
		>
			<slot name="dropdownbox"></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'zx-dropdown-list',
	props: {
		//控制显示
		show: {
			type: Boolean,
			default: false
		},
		//背景颜色
		backgroundColor: {
			type: String,
			default: 'transparent'
		},
		//top  rpx
		top: {
			type: Number,
			default: 0
		},
		//下拉框高度 rpx
		height: {
			type: Number,
			default: 0
		},
		//选择框高度 单位rpx
		selectHeight: {
			type: Number,
			default: 0
		}
	},
	methods: {}
};
</script>

<style scoped>
.zx-dropdown-list {
	position: relative;
}

.zx-dropdown-view {
	width: 100%;
	overflow: hidden;
	position: absolute;
	z-index: -99;
	left: 0;
	opacity: 0;
	/* visibility: hidden; */
	transition: all 0.2s ease-in-out;
}

.zx-dropdownlist-show {
	opacity: 1;
	z-index: 996;
	/* visibility: visible; */
}
</style>

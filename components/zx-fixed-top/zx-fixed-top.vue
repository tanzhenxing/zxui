<template>
	<view>
		<view class="fixed-top-view" :class="[isFixed ? 'zx-fixed-top' : '']" :style="{ backgroundColor: backgroundColor,top:offsetTop }">
			<!-- 当导航吸顶时展示占位  -->
			<zx-status-bar v-if="isFixed" bgColor="#ffffff"></zx-status-bar>
			<view v-if="isFixed" :style="{height: offsetTop,backgroundColor: backgroundColor}"></view>
			<slot></slot>
		</view>
		
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	isFixed: {
		type: Boolean,
		default: false
	},
	offsetTop: {
		type: String,
		default: '0rpx'
	},
	backgroundColor: {
		type: String,
		default: '#ececec'
	}
});

</script>

<style>
.fixed-top-view {
	height: 88rpx;
	line-height: 88rpx;
}
.zx-fixed-top {
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	width: 750rpx;
}
/* #ifdef  H5 */
.zx-fixed-top {
	top: 0px;
}
/* #endif */

</style>

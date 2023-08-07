<template>
	<view
		class="zx-totop zx-fade-in zx-bg-white zx-dark-bg-level-3"
		hover-class="zx-tap"
		v-if="show"
		@tap="totop"
		:style="{
			bottom: bottom,
			right: right,
			zIndex: zIndex,
			borderRadius: borderRadius
		}"
	>
		<zx-icon name="arrow-up" :size="fontSize"></zx-icon>
	</view>
</template>
<script setup>
import { ref, getCurrentInstance, watch } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	top: {
		type: Number,
		default: 0
	},
	bottom: {
		type: String,
		default: '80rpx'
	},
	right: {
		type: String,
		default: '30rpx'
	},
	borderRadius: {
		type: String,
		default: '6rpx'
	},
	zIndex: {
		type: Number,
		default: 9
	},
	fontSize: {
		type: String,
		default: '44rpx'
	}
});

const show = ref(false);
const timer = ref(null);

const totop = () => {
	// #ifndef APP-NVUE
	uni.pageScrollTo({
		scrollTop: 0,
		duration: 100
	});
	// #endif
	proxy.$emit('totop');
};
</script>
<style lang="scss" scoped>
.zx-totop {
	width: 80rpx;
	height: 80rpx;
	position: fixed;
}
.zx-totop-text {
	width: 80rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 38rpx;
	text-align: center;
}
.zx-tap {
	opacity: 0.88;
}
@keyframes zx-fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.zx-fade-in {
	animation: zx-fade-in 200ms ease-in forwards;
}
.zx-bg-white {
	background-color: #ffffff !important;
}
</style>

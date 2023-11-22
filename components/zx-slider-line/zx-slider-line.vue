<template>
	<view id="zxSlider" ref="zxSlider" class="zx-slider"
		:style="{ backgroundColor: backgroundColor, height: height }"
		@touchstart="touchStart"
		@touchmove.stop.prevent="touchMove"
		@touchend="touchEnd"
		@tap="onTap">
		<!-- 滑块左侧线条 -->
		<view class="zx-line" :style="{opacity: 0.3,height: lineHeight, backgroundColor: lineColor, top: getLineTop + 'rpx',width:slideWidth+'px' }"></view>
		<!-- 滑块右侧线条 -->
		<view class="zx-slider-line" :style="{opacity: 0.8,  height: lineHeight, backgroundColor: lineColor,top: getLineTop + 'rpx', left: slideLeft+'px', width: (slideWidth-slideLeft)+'px' }"></view>
		<!-- 滑块 -->
		<view class="zx-slider-bar zx-block" :style="{ backgroundColor: color, height: size, width: size, left: slideLeft+'px' }"></view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();

const zxSlider = ref();

const props = defineProps({
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	height: {
		type: String,
		default: '25rpx'
	},
	size: {
		type: String,
		default: '20rpx'
	},
	color: {
		type: String,
		default: '#19be6b'
	},
	// 是否启用滑动
	canSlide: {
		type: Boolean,
		default: true
	},
	lineHeight: {
		type: String,
		default: '2rpx'
	},
	lineColor: {
		type: String,
		default: '#19be6b'
	}
});

const getLineTop = computed(() => {
	return parseInt(props.height) * 0.5 - parseInt(props.lineHeight);
});

const slideWidth = ref(0); // 组件宽度
const startLeft = ref(0);  // 组件距离左边的距离
const slideLeft = ref(0)   // 滑块距离左边的距离
const progressWidth = ref(0); // 进度条宽度

const getWidth = () => {
	uni.createSelectorQuery()
		.in(instance)
		.select('#zxSlider')
		.fields({ size: true, rect: true }, (res) => {
			startLeft.value = res.left;
			slideWidth.value = res.width;
			progressWidth.value = slideWidth.value - uni.upx2px(parseInt(props.size))
		})
		.exec();
};

proxy.$nextTick(() => {
	getWidth();
});

const onTap = (e)=>{
	//console.log(JSON.stringify(e))
}
const touchStart = (e) => {
	proxy.$emit('touchStart', e);
};
const touchMove = (e) => {
	if (!props.canSlide) {
		return;
	}
	let touch = e.touches[0] || e.changedTouches[0];
	slideLeft.value = getSlideLeft(touch);
	proxy.$emit('touchMove', e);
};
const touchEnd = (e) => {
	if (!props.canSlide) {
		return;
	}
	let touch = e.touches[0] || e.changedTouches[0];
	slideLeft.value = getSlideLeft(touch);
	// 进度
	let progress = parseInt(slideLeft.value / progressWidth.value * 100);
	proxy.$emit('touchEnd', progress);
};
// 获取滑块左边距离
const getSlideLeft = (touch)=>{
	let slideLength = Math.abs(touch.clientX - startLeft.value);
	// 最小值
	if(slideLength<0){
		slideLength = 0
	}
	// 最大值
	if(slideLength>progressWidth.value){
		slideLength = slideWidth.value
	}
	return slideLength;
}
// 设置进度
const setProgress = (progress) => {
	if (progress < 0) {
		progress = 0;
	}
	// 最大值
	if (progress > 100) {
		progress = 100;
	}
	slideLeft.value = (progress / 100) * progressWidth.value;
};

defineExpose({ setProgress });
</script>

<style>
.zx-slider {
	overflow: hidden;
	position: relative;
	align-items: center;
	display: flex;
	flex-direction: row;
}
.zx-line {
	position: absolute;
}
.zx-slider-line {
	position: absolute;
	left: 0;
	top: 0;
}
.zx-slider-bar {
	position: absolute;
	overflow: hidden;
	border-radius: 50px;
}
.zx-block {
	display: block;
}
</style>

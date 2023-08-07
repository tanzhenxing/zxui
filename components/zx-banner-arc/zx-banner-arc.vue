<template>
	<view class="zx-banner-arc" :style="{ height: height + 'rpx' }">
		<view
			class="zx-banner--box"
			:style="{
				background: background,
				height: height + 'rpx',
				width: width + '%',
				paddingLeft: (width - 100) / 2 + '%',
				paddingRight: (width - 100) / 2 + '%',
				left: '-' + (width - 100) / 2 + '%'
			}"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	height: {
		type: [Number, String],
		default: 400
	},
	percent: {
		type: [Number, String],
		default: 120
	},
	background: {
		type: String,
		default: '-webkit-linear-gradient(#5473FF,#6DA8FF)'
	}
});

const width = ref(120);

onMounted(() => {
	width.value = getPercent(props.percent);
});

const getPercent = (val) => {
	//最低值120，尽量传偶数值
	val = Number(val || 0);
	return val < 120 ? 120 : val;
};
</script>

<style lang="scss" scoped>
.zx-banner-arc {
	width: 100%;
	position: relative;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
}

.zx-banner--box {
	box-sizing: border-box;
	position: absolute;
	z-index: 1;
	top: 0;
	border-radius: 0 0 50% 50%;
	overflow: hidden;
}
</style>

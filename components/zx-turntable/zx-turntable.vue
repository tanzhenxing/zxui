<template>
	<view class="zx-turntable" :animation="animationData">
		<view class="zx-turntable-item" v-for="(item, index) in rewardNames" :key="index" :style="{ transform: 'rotate(' + (inital - averageRotate * index) + 'deg)' }">
			<view class="zx-turntable-inner" :style="{ transform: 'translateX(-300rpx) rotate(' + averageRotate + 'deg)', background: rewardBGColors[index] }">
				<text
					class="zx-turntable-text"
					:style="{ transform: 'translateY(120rpx) translateX(' + textTrX + ') rotate(' + textRotate + ')', fontSize: fontSize, color: rewardColors[index] }"
				>
					{{ item }}
				</text>
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// 奖品名称
	rewardNames: {
		type: Array,
		default: () => {
			return ['', '', '', '', '', ''];
		}
	},
	// 奖品展示区背景颜色
	rewardBGColors: {
		type: Array,
		default: () => {
			return [];
		}
	},
	// 奖品展示区文本颜色
	rewardColors: {
		type: Array,
		default: () => {
			return [];
		}
	},
	// 文本尺寸
	fontSize: {
		type: String,
		default: '32rpx'
	}
});

// 是否正在抽奖
const luckyStatus = ref(0);
// 动画对象
const animationData = ref({});
const tpmimgtimmer = ref(null);
// 中奖奖品 index
const RewardIndex = ref(-1);
// 角度
const averageRotate = ref(0);
const inital = ref(0);
const textTrX = ref('43rpx');
const textRotate = ref('-30deg');

onMounted(() => {});

const init = () => {
	let length = props.rewardNames.length;
	averageRotate.value = 360 / length;
	inital.value = (360 / length / 2) * -1;
	switch (length) {
		case 4:
			textTrX.value = '0rpx';
			textRotate.value = '-45deg';
			break;
		case 6:
			textTrX.value = '43rpx';
			textRotate.value = '55deg';
			break;
		case 8:
			textTrX.value = '72rpx';
			textRotate.value = '65deg';
			break;
	}
	let animation = null;
	animation = uni.createAnimation({
		duration: 0,
		timingFunction: 'ease'
	});
	animation.rotateZ(averageRotate.value / 2).step();
	animationData.value = animation.export();
};
const goto = (index) => {
	if (luckyStatus.value != 0) {
		return;
	}
	RewardIndex.value = index;
	animationData.value = {};
	luckyStatus.value = 1;

	// 轮盘归零
	let animation = null;
	animation = uni.createAnimation({
		duration: 0,
		timingFunction: 'ease'
	});
	animation.rotateZ(averageRotate.value / 2).step();
	animationData.value = animation.export();

	// 计算奖品角度
	let rewardRadiu = 360 / props.rewardNames.length;
	let rewardRadiuNeed = 360 * 6 + rewardRadiu * RewardIndex.value;
	setTimeout(() => {
		animation = uni.createAnimation({
			duration: 5000,
			timingFunction: 'ease'
		});
		animation.rotateZ(rewardRadiuNeed).step();
		animationData.value = animation.export();
	}, 100);
	setTimeout(() => {
		// 停止动画
		luckyStatus.value = 0;
		proxy.$emit('end', index);
		RewardIndex.value = -1;
	}, 5000);
};
</script>
<style lang="scss" scoped>
.zx-turntable {
	position: relative;
	transform-origin: center;
	width: 600rpx;
	height: 600rpx;
}
.zx-turntable-item {
	position: absolute;
	left: 50%;
	width: 300rpx;
	height: 600rpx;
	border-radius: 0px 300rpx 300rpx 0;
	overflow: hidden;
	transform-origin: left center;
}

.zx-turntable-inner {
	text-align: center;
	width: 300rpx;
	height: 600rpx;
	transform-origin: right center;
	border-radius: 300rpx 0 0 300rpx;
}

.zx-turntable-text {
	display: block;
	transform-origin: center;
}
</style>

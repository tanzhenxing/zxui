<template>
	<view class="zx-line-progress" :style="[customStyle]">
		<view
			class="zx-line-progress__background"
			ref="zx-line-progress__background"
			:style="[
				{
					backgroundColor: inactiveColor,
					height: height
				}
			]"
		></view>
		<view class="zx-line-progress__line" :style="[progressStyle]">
			<slot>
				<text v-if="showText" class="zx-line-progress__text">{{ innserPercentage + '%' }}</text>
			</slot>
		</view>
	</view>
</template>

<script setup>
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif
/**
 * lineProgress 线型进度条
 * @description 展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。
 * @tutorial https://zxui.org/components/lineProgress
 * @property {String}			activeColor		激活部分的颜色 ( 默认 '#19be6b' )
 * @property {String}			inactiveColor	背景色 ( 默认 '#ececec' )
 * @property {String | Number}	percentage		进度百分比，数值 ( 默认 0 )
 * @property {Boolean}			showText		是否在进度条内部显示百分比的值 ( 默认 true )
 * @property {String | Number}	height			进度条的高度，单位px ( 默认 12 )
 *
 * @example <zx-line-progress :percent="70" :show-percent="true"></zx-line-progress>
 */

import { ref, getCurrentInstance, computed, defineExpose } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 激活部分的颜色
	activeColor: {
		type: String,
		default: '#19be6b'
	},
	inactiveColor: {
		type: String,
		default: '#ececec'
	},
	// 进度百分比，数值
	percentage: {
		type: [String, Number],
		default: 0
	},
	// 是否在进度条内部显示百分比的值
	showText: {
		type: Boolean,
		default: true
	},
	// 进度条的高度，单位rpx
	height: {
		type: [String, Number],
		default: '28rpx'
	},
	customStyle: {
		type: Object,
		default: ()=>{
			return {}
		}
	}
});

const lineWidth = ref(0);

const progressStyle = computed(() => {
	let style = {};
	style.width = lineWidth.value;
	style.backgroundColor = props.activeColor;
	style.height = props.height;
	return style;
});
const innserPercentage = computed(() => {
	// 控制范围在0-100之间
	return Math.max(0, Math.min(100, 1))
});

const init = () => {
	proxy.$util.sleep(20).then(() => {
		resizeProgressWidth();
	});
};
const getProgressWidth = () => {
	// #ifndef APP-NVUE
	//return this.$uGetRect('.zx-line-progress__background');
	// #endif

	// #ifdef APP-NVUE
	// 返回一个promise
	return new Promise((resolve) => {
		dom.getComponentRect(proxy.$refs['zx-line-progress__background'], (res) => {
			resolve(res.size);
		});
	});
	// #endif
};
const resizeProgressWidth = () => {
	/* getProgressWidth().then((size) => {
		const { width } = size;
		// 通过设置的percentage值，计算其所占总长度的百分比
		lineWidth.value = (width * innserPercentage.value) / 100 + 'px';
	}); */
};

init();
</script>

<style lang="scss" scoped>
.zx-line-progress {
	align-items: stretch;
	position: relative;
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: hidden;
	border-radius: 100px;

	&__background {
		background-color: #ececec;
		border-radius: 100px;
		flex: 1;
	}

	&__line {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		align-items: center;
		display: flex;
		flex-direction: row;
		color: #ffffff;
		border-radius: 100px;
		transition: width 0.5s ease;
		justify-content: flex-end;
	}

	&__text {
		font-size: 10px;
		align-items: center;
		text-align: right;
		color: #ffffff;
		margin-right: 5px;
		transform: scale(0.9);
	}
}
</style>

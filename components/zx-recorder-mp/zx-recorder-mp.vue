<template>
	<view>
		<slot></slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, defineExpose } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 配置信息
	config: {
		type: Object,
		default: ()=>{
			return {}
		}
	}
});

const recorderManager = uni.getRecorderManager();

// 开始录音
const start = () => {
	recorderManager.start(props.config);
};
const stop = () => {
	recorderManager.stop();
};

const pause = () => {
	recorderManager.pause();
};

const resume = () => {
	recorderManager.resume();
};

recorderManager.onStart((res) => {
	proxy.$emit('onStart', res);
});

recorderManager.onPause((res) => {
	proxy.$emit('onPause', res);
});


recorderManager.onResume((res) => {
	proxy.$emit('onResume', res);
});

recorderManager.onStop((res) => {
	proxy.$emit('onStop', res);
});

recorderManager.onInterruptionBegin((res) => {
	console.log('onInterruptionBegin:' + JSON.stringify(res));
	proxy.$emit('onInterruptionBegin', res);
});

recorderManager.onInterruptionEnd((res) => {
	console.log('onInterruptionEnd:' + JSON.stringify(res));
	proxy.$emit('onInterruptionEnd', res);
});

recorderManager.onError((res) => {
	console.log('onError:' + JSON.stringify(res));
	proxy.$emit('onError', res);
});

defineExpose({ start, pause, resume, stop });
</script>

<style></style>

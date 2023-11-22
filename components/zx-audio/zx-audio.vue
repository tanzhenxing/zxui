<template>
	<view>
		<slot></slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, onMounted, watch } from 'vue';
const { proxy } = getCurrentInstance();

const audioContext = proxy.$audio;

const props = defineProps({
	src: {
		type: String,
		default: null
	},
	startTime: {
		type: Number,
		default: 0
	},
	autoplay: {
		type: Boolean,
		default: false
	},
	loop: {
		type: Boolean,
		default: false
	},
	obeyMuteSwitch: {
		type: Boolean,
		default: true
	},
	volume: {
		type: Number,
		default: 0.8
	},
	// "ambient" - 不中止其他声音播放，不能后台播放，静音后无声音； "soloAmbient" - 中止其他声音播放，不能后台播放，静音后无声音； "playback" - 中止其他声音，可以后台播放，静音后有声音。
	sessionCategory: {
		type: String,
		default: 'playback'
	},
	playbackRate: {
		type: Number,
		default: 1.0
	}
});

const audioData = ref({
	duration: 0,
	currentTime: 0,
	progress: 0
});

onMounted(() => {
	setConfig();
	// 是否自动播放
	if(props.autoplay){
		change();
	}
});

watch(
	() => props.src,
	(newVal, oldVal) => {
		change();
	}
);

audioContext.onCanplay((e) => {
	proxy.$emit('onCanplay', audioContext.duration);
});

audioContext.onPlay(() => {
	proxy.$emit('onPlay');
});

audioContext.onWaiting((e) => {
	proxy.$emit('onWaiting');
});

audioContext.onTimeUpdate(() => {
	audioData.value.duration = audioContext.duration;
	audioData.value.currentTime = audioContext.currentTime;
	audioData.value.progress = parseInt((audioData.value.currentTime / audioData.value.duration) * 100);
	proxy.$emit('onTimeUpdate', audioData.value);
});

audioContext.onSeeking((e) => {
	//console.log('onSeeking' + e);
	proxy.$emit('onSeeking');
});

audioContext.onSeeked((e) => {
	//console.log('onSeeked' + e);
	proxy.$emit('onSeeked');
});

audioContext.onPause((e) => {
	proxy.$emit('onPause');
});

audioContext.onStop((e) => {
	proxy.$emit('onStop');
});

audioContext.onEnded(() => {
	proxy.$emit('onEnded');
});

audioContext.onError((e) => {
	console.log('onError:' + e);
	proxy.$emit('onError', e);
});

const change = () => {
	if (props.src) {
		audioContext.src = props.src;
	}
};

// 设置属性
const setConfig = () => {
	audioContext.startTime = props.startTime;
	audioContext.autoplay = props.autoplay;
	audioContext.loop = props.loop;
	audioContext.obeyMuteSwitch = props.obeyMuteSwitch;
	audioContext.volume = props.volume;
	audioContext.sessionCategory = props.sessionCategory;
	audioContext.playbackRate = props.playbackRate;
};

// 开始播放
const play = () => {
	setTimeout(() => {
		audioContext.play();
	}, 300);
};
const pause = () => {
	audioContext.pause();
};
const stop = () => {
	audioContext.stop();
};
const seek = (time) => {
	audioContext.seek(time);
};
const destroy = () => {
	audioContext.destroy();
};

// 设置进度
const setProgress = (progress) => {
	audioData.progress = progress;
	let time = Math.round((audioData.value.duration * progress) / 100);
	setTimeout(() => {
		audioContext.seek(time);
		audioContext.play();
	});
};

defineExpose({ play, pause, seek, stop, destroy,change });
</script>

<style lang="scss" scoped></style>

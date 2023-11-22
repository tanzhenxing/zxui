<template>
	<view>
		<slot>
			<view class="zx-audio zx-audio-box" :style="{ position: 'absolute !important' }">
				<view class="zx-audio-bg" @click="playing">
					<image class="zx-audio-img" :class="paused? '' : 'zx-playing'" :src="icon"></image>
				</view>
			</view>
		</slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, defineExpose } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	skin: {
		type: String,
		default: ''
	},
	icon: {
		type: String,
		default: 'https://files.wufu-app.com/images/icon/music_icon.png'
	},
	// 当前播放的音频
	currentAudio: {
		type: Object,
		default: () => {
			return {
				src: 'https://exhibit.wufu-app.com/audio/167636771462852',
				title: '',
				epname: '',
				singer: '',
				coverImgUrl: ''
			};
		}
	},
	// 音频开始播放的位置（单位：s）
	startTime: {
		type: Number,
		default: 0
	},
	// 播放的倍率。可取值：0.5/0.8/1.0/1.25/1.5/2.0，默认值为1.0
	playbackRate: {
		type: Number,
		default: 1.0
	},
	// 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
	paused: {
		type: Boolean,
		default: true
	},
	buffered: {
		type: Number,
		default: 0
	},
	webUrl: {
		type: String,
		default: ''
	},
	protocol: {
		type: String,
		default: 'http'
	}
});

const audioData = ref({
	duration: 0, // 音频总时长
	currentTime: 0, // 当前播放位置
	progress: 0
});

const playStatus = ref(false);
playStatus.value = props.paused;

const loopStatus = ref(false);
const zxSlider = ref();

const audio = uni.getBackgroundAudioManager();

proxy.$nextTick(() => {
	// 设置属性
	audio.src = props.currentAudio.src;
	audio.startTime = props.startTime;
	audio.title = props.currentAudio.title;
	audio.epname = props.currentAudio.epname;
	audio.singer = props.currentAudio.singer;
	audio.coverImgUrl = props.currentAudio.coverImgUrl;
	audio.playbackRate = props.playbackRate;

	// 背景音频进入可以播放状态，但不保证后面可以流畅播放
	audio.onCanplay(() => {
		proxy.$emit('onCanplay');
	});
	// 背景音频播放事件
	audio.onPlay(() => {
		playStatus.value = true;
		proxy.$emit('onPlay');
	});
	// 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
	audio.onWaiting((e) => {
		console.log('onWaiting' + e);
		proxy.$emit('onWaiting');
	});
	// 背景音频播放进度更新事件
	audio.onTimeUpdate(() => {
		audioData.value.duration = audio.duration;
		audioData.value.currentTime = audio.currentTime;
		audioData.progress = parseInt((audioData.value.currentTime / audioData.value.duration) * 100);
		//console.log('onTimeUpdate:'+JSON.stringify(audioData.value))
		// 更新进度
		/* if (props.skin === 'normal') {
			zxSlider.value.setProgress(audioData.progress);
		} */

		proxy.$emit('onTimeUpdate', audioData.value);
	});
	// 背景音频暂停事件
	audio.onPause((e) => {
		proxy.$emit('onPause');
	});
	// 背景音频停止事件
	audio.onStop((e) => {
		proxy.$emit('onStop');
	});
	// 背景音频自然播放结束事件
	audio.onEnded((e) => {
		console.log('onEnded' + e);
		proxy.$emit('onEnded');
	});
	// 背景音频播放错误事件
	audio.onError((e) => {
		console.log('onError:' + e);
		proxy.$emit('onError', e);
	});
	// 用户在系统音乐播放面板点击上一曲事件（iOS only）
	audio.onPrev = (e) => {
		console.log('onError:' + e);
		proxy.$emit('onPrev', e);
	};
	// 用户在系统音乐播放面板点击下一曲事件（iOS only）
	audio.onNext = () => {
		console.log('onNext:' + e);
		proxy.$emit('onNext', e);
	};
});

const playing = () => {
	if (playStatus.value) {
		audio.pause();
	} else {
		audio.play();
	}
	playStatus.value = !playStatus.value;
	console.log('playing:'+playStatus.value)
};

// 播放
const play = () => {
	setTimeout(()=>{
		audio.play();
	},300);
};
// 暂停
const pause = () => {
	audio.pause();
};
// 停止
const stop = () => {
	audio.stop();
};
// 跳转到指定位置，单位 s
const seek = () => {
	audio.seek();
};
</script>

<style scoped>
.zx-audio {
	z-index: 2;
	left: 0;
	top: 0;
}
.zx-audio-box {
	top: 100rpx;
	left: 10rpx;
	background-color: #d5d4d4;
	border-radius: 50rpx;
	width: 100rpx;
	height: 100rpx;
}
.zx-audio-bg {
	width: 80rpx;
	height: 80rpx;
	border-radius: 40rpx;
	background-color: #7e7d7d;
	margin-top: 10rpx;
	margin-left: 10rpx;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
}
.zx-audio-img {
	width: 60rpx;
	height: 60rpx;
}
@keyframes zx-rotate360 {
	0% {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(180deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
.zx-playing {
	animation: zx-rotate360 6000ms infinite linear;
}
</style>

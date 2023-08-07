<template>
	<view>
		<video
			:id="videoId"
			:style="{ width: width, height: height }"
			:title="currentVideo.title"
			:src="currentVideo.url"
			:poster="currentVideo.poster"
			:autoplay="autoplay"
			:loop="loop"
			:muted="muted"
			:initial-time="initialTime"
			:duration="duration"
			:controls="controls"
			@play="onPlay"
			@pause="onPause"
			@ended="onEnded"
			@timeupdate="onTimeUpdate"
			@progress="onProgress"
			@waiting="onWaiting"
			@loadedmetadata="onLoadedMetaData"
			@loadstart="onLoadStart"
			@loadeddata="onLoadedData"
			@seeked="onSeeked"
			@seeking="onSeeking"
			@fullscreenchange="onFullScreenChange"
			@fullscreenclick="onFullScreenClick"
			@controlstoggle="onControlsToggle"
			@error="onError">
			<!-- <cover-view :style="{width: width,height:height}">
			<view class="zx-flex-column">
				<view class="zx-flex-row zx-flex-align-xy" style="height: 350rpx;">
					<zx-loading-icon v-if="showWaiting" :vertical="false" mode="semicircle" color="#ffffff" sizeize="40"></zx-loading-icon>
				</view>
				<view>
					
				</view>
			</view>
		</cover-view> -->
		</video>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	videoId: {
		type: String,
		default: 'myVideo'
	},
	currentVideo: {
		type: Object,
		default: () => {
			return {};
		}
	},
	autoplay: {
		type: Boolean,
		default: true
	},
	loop: {
		type: Boolean,
		default: false
	},
	muted: {
		type: Boolean,
		default: false
	},
	duration: {
		type: Number,
		default: 0
	},
	initialTime: {
		type: Number,
		default: 0
	},
	width: {
		type: String,
		default: '750rpx'
	},
	height: {
		type: String,
		default: '420rpx'
	},
	controls: {
		type: Boolean,
		default: true
	},
	// 是否保存播放记录
	record: {
		type: Boolean,
		default: true
	}
});

const videoContext = ref(null);
videoContext.value = uni.createVideoContext(props.videoId);

const showWaiting = ref(false);

const progressBuffered = ref(0); // 缓存进度
const currentProgress = ref(0); // 播放进度

const play = () => {
	videoContext.value.play();
};
const pause = () => {
	videoContext.value.pause();
};
const seek = (number) => {
	videoContext.value.seek(number);
};
const stop = () => {
	videoContext.value.stop();
};
const playbackRate = (rate) => {
	videoContext.value.playbackRate(rate);
};
const requestFullScreen = () => {
	videoContext.value.requestFullScreen();
};
const exitFullScreen = () => {
	videoContext.value.exitFullScreen();
};
const showStatusBar = () => {
	videoContext.value.showStatusBar();
};
const hideStatusBar = () => {
	videoContext.value.hideStatusBar();
};
// 当开始/继续播放时触发
const onPlay = (e) => {
	//console.log('onPlay:'+JSON.stringify(e))
	proxy.$emit('onPlay');
};
// 当暂停播放时触发
const onPause = (e) => {
	//console.log('onPause:'+JSON.stringify(e))
	proxy.$emit('onPlay');
};

// 当播放到末尾时触发
const onEnded = (e) => {
	//console.log('onEnded:'+JSON.stringify(e))
	proxy.$emit('onEnded');
};

// 播放进度变化时触发
const onTimeUpdate = (e) => {
	//console.log('onTimeUpdate:'+JSON.stringify(e))
	proxy.$emit('onTimeUpdate', e.detail);
};
// 视频元数据加载完成
const onLoadedMetaData = (e) => {
	//console.log('onLoadedMetaData:'+JSON.stringify(e.detail))
	proxy.$emit('onLoadedMetaData', e.detail);
};
// 视频出现缓冲时触发
const onWaiting = (e) => {
	//console.log('onWaiting:' + JSON.stringify(e));
	proxy.$emit('onWaiting');
};
// 加载进度
const onProgress = (e) => {
	//progressBuffered.value = e.detail.buffered;
	//console.log('onProgress:'+JSON.stringify(e))
	proxy.$emit('onProgress', e.detail.buffered);
};
// 视频播放全屏播放时点击事件
const onFullScreenClick = (e) => {
	console.log('onFullScreenClick:' + JSON.stringify(e));
};
// 视频进入、退出全屏
const onFullScreenChange = (e) => {
	console.log('onFullScreenChange:' + JSON.stringify(e));
};
// 开始加载数据
const onLoadStart = (e) => {
	console.log('onLoadStart:' + JSON.stringify(e));
};
// 视频资源开始加载时触发
const onLoadedData = (e) => {
	console.log('onLoadedData:' + JSON.stringify(e));
};

// 切换 controls 显示/隐藏
const onControlsToggle = (e) => {
	console.log('onControlsToggle:' + JSON.stringify(e));
};

// 拖动进度条结束
const onSeeked = (e) => {
	console.log('onSeeked:' + JSON.stringify(e));
};
// 正在拖动进度条
const onSeeking = (e) => {
	console.log('onSeeking:' + JSON.stringify(e));
};
// 视频播放出错时触发
const onError = (e) => {
	console.log('onError:' + JSON.stringify(e));
};
const showInfo = () => {
	console.log('showInfo');
};

defineExpose({ play, pause, seek, stop, playbackRate });

</script>

<style></style>

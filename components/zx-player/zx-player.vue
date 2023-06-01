<template>
	<view id="header" v-if="show">
		<view :style="{ height: VideoHeight,top:barHeight+'px',backgroundColor:'#ffffff' }" :class="[isFixed ? 'gui-fixed-top' : '']">
			<view :style="'width: 750rpx;height:' + VideoHeight" v-if="showVideo">
				<!-- :initial-time="currentVideo.course_last_seconds" @timeupdate="timeupdate" -->
				<video
					:id="videoId"
					:style="'width: 100%;height:' + VideoHeight"
					:src="currentVideo.url"
					:poster="currentVideo.poster"
					:title="currentVideo.title"
					:duration="duration"
					:object-fit="objectFit"
					:controls="controls"
					:page-gesture="pageGesture"
					:enable-progress-gesture="enableProgressGesture"
					:autoplay="autoplay"
					:loop="loop"
					:muted="muted"
					:show-mute-btn="showMuteBtn"
					:show-progress="showProgress"
					:show-fullscreen-btn="showFullscreenBtn"
					:show-play-btn="showPlayBtn"
					:show-center-play-btn="showCenterPlayBtn"
					:play-btn-position="playBtnPosition"
					:mobilenet-hint-type="mobilenetHintType"
					:enable-play-gesture="enablePlayGesture"
					:auto-pause-if-navigate="autoPauseIfNavigate"
					:auto-pause-if-open-native="autoPauseIfOpenNative"
					:vslide-gesture="vslideGesture"
					:vslide-gesture-in-fullscreen="vslideGestureInFullscreen"
					:poster-for-crawler="posterForCrawler"
					:direction="direction"
					:show-loading="showLoading"
					:danmu-list="danmuList"
					:danmu-btn="danmuBtn"
					:enable-danmu="enableDanmu"
					:ad-unit-id="adUnitId"
					:codec="codec"
					:http-cache="httpCache"
					:play-strategy="playStrategy"
					:header="header"
					@error="error"
					@progress="progress"
					@pause="pause"
					@waiting="waiting"
					@play="play"
					@ended="ended"
					@fullscreenchange="fullscreenchange"
					@controlstoggle="controlstoggle"
					@oncanplaythrough="oncanplaythrough"
					@loadedmetadata="loadedmetadata"
					
					@fullscreenclick="fullscreenclick"
					@loadeddata="loadeddata"
					@loadstart="loadstart"
					@seeked="seeked"
					@seeking="seeking"
				>
					<cover-view :style="'width: 100%;height: ' + VideoHeight + ';'" @tap="getControl">
						<view :style="'height: ' + VideoHeight + ';'" class="gui-flex gui-space-between gui-align-items-center" v-show="showLoadding">
							<!-- 视频加载中 -->
							<view class="gui-flex1">
								<zx-loading-icon color="#ffffff" text="视频加载中" textColor="#ffffff"></zx-loading-icon>
							</view>
						</view>
						<view :style="'height: ' + VideoHeight + ';'" class="gui-flex gui-space-between gui-align-items-center" v-show="showRePlay">
							<!-- 重新播放 showRePlay -->
							<view class="gui-flex1">
								<view class="gui-flex gui-space-between gui-align-items-center">
									<view class="gui-flex1">
										<view class="icon-tools" style="margin-left: 60rpx;" @click.stop="lastPlay">
											<view style="padding-top: 20rpx;"><text class="gui-icons icon-size">&#xe659;</text></view>
										</view>
									</view>
									<view class="gui-flex1">
										<view class="icon-tools" style="margin-left: 50rpx;width: 120rpx;height: 120rpx;" @click.stop="rePlay">
											<view style="padding-top: 40rpx;"><text class="app-iconfont icon-size" style="font-size: 70rpx;">&#xe68d;</text></view>
										</view>
									</view>
									<view class="gui-flex1">
										<view class="icon-tools" style="margin-left: 70rpx;" @click.stop="nextPlay">
											<view style="padding-top: 20rpx;"><text class="gui-icons icon-size">&#xe65a;</text></view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view :style="'height: ' + VideoHeight + ';padding-top: 20rpx;'" class="gui-flex gui-justify-content-end" v-show="showSpeed">
							<!-- 加速播放 -->
							<view style="width: 120rpx;margin-right: 50rpx;">
								<view style="background-color: #878787;" v-for="(item, index) in playSpeed" :key="index" @click.stop="getSpeed(index)">
									<zx-text :text="item.speed" :color="item.color" size="30rpx" lineHeight="55rpx" align="center"></zx-text>
								</view>
							</view>
						</view>
						<!-- 控制条 -->
						<view class="uni-video-bar uni-video-bar-full" v-show="showControls">
							<view class="uni-video-controls">
								<view class="uni-video-control-button" :class="getPlayButton" @click.stop="videoPlay"></view>
								<view class="uni-video-current-time">{{ getCurrentTime }}</view>
								<view class="uni-video-progress-container">
									<view class="uni-video-progress">
										<view class="uni-video-progress-buffered" :style="'width: ' + getProgressBuffered + ';'"></view>
										<view class="uni-video-ball" :style="'left: ' + getCurrentProgress + ';'"><view class="uni-video-inner"></view></view>
									</view>
								</view>
								<view class="uni-video-duration">{{ getDuration }}</view>
							</view>
							<view style="padding-left: 10rpx;padding-right: 10rpx;" @click.stop="setSpeed"><zx-text text="倍速" color="#ffffff" size="28rpx"></zx-text></view>
							<view class="uni-video-fullscreen" @click.stop="getFullscreen"></view>
						</view>
					</cover-view>
				</video>
			</view>
		</view>
		<view :style="'height:' + VideoHeight + ';'" v-if="isFixed"></view>

		<!-- 试看结束弹窗 -->
		<zx-popup :show="testShow" mode="center" :closeable="true" @close="testClose" @open="testOpen">
			<view style="width: 700rpx;height: 300rpx;">
				<text>试看已经结束</text>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	isBuy: {
		type: Boolean,
		default: false
	},
	isRecord: {
		type: Boolean,
		default: true
	},
	fixTop: {
		type: Number,
		default: 40
	},
	scrollTop: {
		type: Number,
		default: 0
	},
	goNext: {
		type: Function,
		default: null
	},
	goLast: {
		type: Function,
		default: null
	},
	showInfo: {
		type: Boolean,
		default: true
	},
	catalogueId: {
		type: Number,
		default: 0
	},
	studyNum: {
		type: Number,
		default: 0
	},
	currentVideo: {
		type: Object,
		default() {
			return {};
		}
	},
	currentIndex: {
		type: Number,
		default: 0
	},
	videoId: {
		type: String,
		default: 'myPlayer'
	},
	show: {
		type: Boolean,
		default: true
	},
	pageGesture: {
		type: Boolean,
		default: false
	},
	autoplay: {
		type: Boolean,
		default: false
	},
	loop: {
		type: Boolean,
		default: false
	},
	muted: {
		type: Boolean,
		default: false
	},
	showMuteBtn: {
		type: Boolean,
		default: false
	},
	initialTime: {
		type: Number,
		default: 0
	},
	duration: {
		type: Number,
		default: 0
	},
	controls: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	src: {
		type: String,
		default: ''
	},
	poster: {
		type: String,
		default: ''
	},
	enableDanmu: {
		type: Boolean,
		default: false
	},
	danmuList: {
		type: Array,
		default() {
			return [];
		}
	},
	danmuBtn: {
		type: Boolean,
		default: false
	},
	direction: {
		type: Number,
		default: 0
	},
	showProgress: {
		type: Boolean,
		default: false
	},
	showFullscreenBtn: {
		type: Boolean,
		default: true
	},
	showPlayBtn: {
		type: Boolean,
		default: true
	},
	showCenterPlayBtn: {
		type: Boolean,
		default: true
	},
	showLoading: {
		type: Boolean,
		default: true
	},
	enableProgressGesture: {
		type: Boolean,
		default: false
	},
	objectFit: {
		type: String,
		default: 'contain' // contain：包含，fill：填充，cover：覆盖
	},
	playBtnPosition: {
		type: String,
		default: 'bottom'
	},
	mobilenetHintType: {
		type: Number,
		default: 1
	},
	enablePlayGesture: {
		type: Boolean,
		default: false
	},
	autoPauseIfNavigate: {
		type: Boolean,
		default: true
	},
	autoPauseIfOpenNative: {
		type: Boolean,
		default: true
	},
	vslideGesture: {
		type: Boolean,
		default: false
	},
	vslideGestureInFullscreen: {
		type: Boolean,
		default: true
	},
	adUnitId: {
		type: String,
		default: ''
	},
	posterForCrawler: {
		type: String,
		default: ''
	},
	codec: {
		type: String,
		default: 'hardware'
	},
	httpCache: {
		type: Boolean,
		default: true
	},
	playStrategy: {
		type: Number,
		default: 0
	},
	header: {
		type: Object,
		default() {
			return {};
		}
	},
	VideoHeight: {
		type: String,
		default: '422rpx'
	},
	// 是否记录播放位置
	record: {
		type: Boolean,
		default: true
	}
});

const videoContext = ref(null);
const showVideo = ref(true);
const showLoadding = ref(false);
const showRePlay = ref(false);
const showControls = ref(true);
const showSpeed = ref(false);
const speed = ref(1.0);
const playSpeed = ref([
	{ speed: '0.5', color: '#ffffff' },
	{ speed: '0.8', color: '#ffffff' },
	{ speed: '1.0', color: '#ffffff' },
	{ speed: '1.2', color: '#ffffff' },
	{ speed: '1.5', color: '#ffffff' },
	{ speed: '2.0', color: '#ffffff' }
]);
const videoDuration = ref('00:00');
const currentTime = ref('00:00');
const isFullScreen = ref(false); // 是否全屏
const progressBuffered = ref(0); // 缓存进度
const currentProgress = ref(0); // 播放进度
const playStatus = ref(false); // 播放状态
const testShow = ref(false);
const lastUpdateTime = ref(0);
const playEndTime = ref(0);
const lastPlayTime = ref(0);
const barHeight = ref(0);
// #ifdef MP-WEIXIN
barHeight.value = uni.getSystemInfoSync().statusBarHeight + 44;
// #endif


videoContext.value = uni.createVideoContext(props.videoId);

//hiddenControls();

const isFixed = () => {
	if (scrollTop.value > fixTop.value) {
		return true;
	} else {
		return false;
	}
};
// 播放、暂停按钮
const getPlayButton = computed(() => {
	let playButton = '';
	if (playStatus.value) {
		playButton = 'uni-video-control-button-pause';
	} else {
		playButton = 'uni-video-control-button-play';
	}
	return playButton;
});
// 总时长
const getDuration = computed(() => {
	let time_str = '';
	if (typeof videoDuration.value === 'number') {
		time_str = videoTimeFormat(videoDuration.value);
	} else {
		time_str = videoDuration.value;
	}
	return time_str;
});
// 当前播放位置
const getCurrentTime = computed(() => {
	let time_str = '';
	if (typeof currentTime.value === 'number') {
		time_str = videoTimeFormat(currentTime.value);
	} else {
		time_str = currentTime.value;
	}
	return time_str;
});
const videoTimeFormat=(s)=> {
		s = Math.floor(s);
		if (s < 60) {
			if (s < 10) {
				return '00:0' + s;
			}
			return '00:' + s;
		} else {
			var second = s % 60;
			s = s - second;
			var minute = s / 60;
			if (minute < 10) {
				minute = '0' + minute;
			}
			if (second < 10) {
				second = '0' + second;
			}

			return minute + ':' + second;
		}
	}
const getProgressBuffered = computed(() => {
	return progressBuffered.value.toFixed(2) + '%';
});
const getCurrentProgress = computed(() => {
	let progress = '0%';
	if (typeof videoDuration.value === 'number') {
		progress = ((currentTime.value / videoDuration.value) * 100).toFixed(2) + '%';
	}
	return progress;
});

// 错误信息
const error = e => {
	//console.log('error:'+JSON.stringify(e))
};
const getControl = () => {
	showControls.value = !showControls.value;
};
const hiddenControls = (time = 5000) => {
	setTimeout(() => {
		showControls.value  = false;
	}, time);
};
// 加载进度
const progress = e => {
	progressBuffered.value = e.detail.buffered;
	//console.log('progress:'+JSON.stringify(e))
};
const controlstoggle = e => {
	console.log('controlstoggle:' + JSON.stringify(e));
};
const pause = e => {
	playStatus.value = false;
	updatePlayInfo(true);
	//console.log('pause:'+JSON.stringify(e))
};
const waiting = e => {
	showLoadding.value = true;
	//console.log('waiting:'+JSON.stringify(e))
};
const ended = e => {
	showControls.value = false;
	showRePlay.value = true;
	updatePlayInfo(true);
	proxy.$emit('ended');
	//console.log('ended:'+JSON.stringify(e))
};
const oncanplaythrough = e => {
	console.log('oncanplaythrough:' + JSON.stringify(e));
};
const fullscreenclick = e => {
	console.log('fullscreenclick:' + JSON.stringify(e));
};
// 全屏操作
const getFullscreen = () => {
	if (isFullScreen.value) {
		videoContext.value.exitFullScreen();
		isFullScreen.value = false;
	} else {
		videoContext.value.requestFullScreen();
		isFullScreen.value = true;
	}
	console.log('getFullscreen:' + isFullScreen.value);
};
const fullscreenchange = e => {
	//isFullScreen.value = e.detail.fullScreen;
	console.log('fullscreenchange:' + JSON.stringify(e.detail));
};
const loadedmetadata = e => {
	videoDuration.value = e.detail.duration;
};
const timeupdate = e => {
	return;
	// 跳转到上次播放位置
	if (!props.currentVideo.is_seek) {
		showLoadding.value = true;
		videoContext.value.seek(props.currentVideo.course_last_seconds);
		setTimeout(() => {
			videoContext.value.play();
			props.currentVideo.is_seek = true;
		}, 300);
		return;
	}
	// 关闭加载动画
	showLoadding.value = false;

	// 当前播放位置
	currentTime.value = e.detail.currentTime;

	proxy.$emit('getPlayCurrentTime', e.detail.currentTime);
	proxy.$emit('getVideoDuration', e.detail.duration);

	// 获取本次播放起始时间
	let currentTime = Number(e.detail.currentTime);
	proxy.playEndTime.value = parseInt(currentTime);
	// 提交播放记录
	if (isRecord.value) {
		updatePlayInfo();
	}

	// 试看结束
	if (props.currentVideo.test_time > 0 && currentTime.value > props.currentVideo.test_time && isBuy.value === false) {
		uni.showToast({
			title: '试看已结束',
			duration: 3000,
			success: () => {
				videoContext.value.seek(0);
				videoContext.value.pause();
			}
		});
	}
	
};
const play = e => {
	playStatus.value = true;
	showControls.value = true;
	showRePlay.value = false;
	//console.log('play:'+JSON.stringify(e))
};
const videoPlay = e => {
	showRePlay.value = false;
	if (playStatus) {
		videoContext.value.pause();
	} else {
		setTimeout(() => {
			videoContext.value.play();
		}, 300);
	}
};
const lastPlay = () => {
	if (goLast() !== null) {
		videoPlay();
	}
};
// 重播
const rePlay = () => {
	showRePlay.value = false;
	setTimeout(() => {
		videoContext.value.seek(0);
	}, 500);
	setTimeout(() => {
		videoContext.value.play();
	}, 1000);
	setTimeout(() => {
		videoContext.value.playbackRate(speed.value);
	}, 2000);
};
const nextPlay = () => {
	if (goNext() !== null) {
		videoPlay();
	}
};
const getSpeed = index => {
	playSpeed.value.forEach((item, idx) => {
		item.color = '#ffffff';
		if (index === idx) {
			item.color = '#ff0000';
			speed.value = parseFloat(item.speed);
		}
	});

	setTimeout(() => {
		videoContext.value.playbackRate(speed.value);
		showSpeed.value = false;
	}, 300);

	//console.log(JSON.stringify(this.speed));
};
const setSpeed = () => {
	showSpeed.value = !showSpeed.value;
};

const seeked = e => {
	console.log('seeked:' + JSON.stringify(e));
};
const seeking = e => {
	console.log('seeking:' + JSON.stringify(e));
};
const loadeddata = e => {
	console.log('loadeddata:' + JSON.stringify(e));
};
const loadstart = e => {
	console.log('loadstart:' + JSON.stringify(e));
};
const testClose = () => {
	testShow.value = false;
};
const testOpen = () => {
	testShow.value = true;
};
// 更新播放信息
const updatePlayInfo = (updateStatus = false) => {
	// 是否记录视频播放位置
	if (!props.record) {
		return;
	}

	if (lastUpdateTime.value === 0) {
		lastUpdateTime.value = playEndTime.value;
	}
	let update_time = Math.abs(playEndTime.value - lastUpdateTime.value);
	let back_update_time = playEndTime.value - lastUpdateTime.value;
	let sum_time = parseInt(videoDuration.value);

	let data = {
		catalogue_id: props.catalogueId,
		course_id: props.currentVideo.id,
		start_time: lastUpdateTime.value,
		end_time: playEndTime.value,
		sum_time: sum_time
	};

	// 视频总时长为0，不提交播放记录
	if (sum_time === 0) {
		postData(data);
	}

	// 提交播放记录
	if (updateStatus) {
		postData(data);
	}

	// 间隔10秒 提交一次数据
	if (update_time > 9 && update_time < 11) {
		if (lastUpdateTime.value > playEndTime.value ) {
			return;
		}
		//console.log('post data:'+JSON.stringify(data));
		lastUpdateTime.value  = playEndTime.value ;
		postData(data);
	}

	if (update_time > 11) {
		lastUpdateTime.value  = playEndTime.value ;
	} else {
		lastPlayTime.value  = playEndTime.value ;
	}
};
// 提交播放记录
const postData = async (data) => {
	let res = await proxy.$util.http({ 
		path: '/play_lock', 
		method: 'post', 
		data: data ,
	});
	if (res.code !== 0) {
		return false;
	}
	
	if (res.code === 1000) {
		videoContext.value.pause();
		proxy.$util.reLogin();
		
		return false;
	}
	
};
</script>

<style lang="scss" scoped>
.icon-size {
	font-size: 45rpx;
	line-height: 45rpx;
}
.icon-text {
	font-size: 26rpx;
	line-height: 35rpx;
}
.icon-tools {
	color: #ffffff;
	text-align: center;
	background-color: rgba(65, 65, 65, 0.1);
	border-radius: 50%;
	height: 80rpx;
	width: 80rpx;
}
.speed {
	background-color: #878787;
}

.fixed-top-view {
	height: 425rpx;
	opacity: 1;
}

.gui-fixed-top {
	position: fixed;
	z-index: 999;
	left: 0;
	width: 750rpx;
}
</style>

<template>
	<view>
		<!-- #ifdef MP -->
		<zx-recorder-mp
			ref="recorder"
			:config="{ duration: duration, format: format }"
			@onStart="onStart"
			@onStop="onStop"
			@onPause="onPause"
			@onResume="onResume"
		></zx-recorder-mp>
		<!-- #endif -->
		
		<view>
			<button @tap="start">开始</button>
			<button @tap="stop">停止</button>
			<button @tap="pause">暂停</button>
			<button @tap="resume">继续</button>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, defineExpose } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	// 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
	duration: {
		type:Number,
		default: 60000
	},
	// 采样率，有效值 8000/16000/44100
	sampleRate: {
		type:Number,
		default: 16000
	},
	// 录音通道数，有效值 1、2
	numberOfChannels: {
		type:Number,
		default: 2
	},
	// 编码码率
	encodeBitRate: {
		type:Number,
		default: 64000
	},
	// 音频格式，有效值 aac/mp3/wav/PCM
	format: {
		type:String,
		default: 'mp3'
	},
	// 指定帧大小，单位 KB。
	frameSize: {
		type:String,
		default: ''
	},
	// 隐藏录音图标
	hideTips: {
		type:Boolean,
		default: false
	},
	// 指定录音的音频输入源。
	audioSource: {
		type:String,
		default: ''
	},
	// 检测声音分贝数
	detectDecibel: {
		type:Boolean,
		default: false
	}
});

const recorder = ref();

const recordFile = ref({
	duration:0,
	tempFilePath:'',
	fileSize:0,
	url:'',
	key:''
});


// 开始录音
const start = ()=>{
	recorder.value.start();
}
const onStart= (res)=>{

}
// 停止录音
const stop = ()=>{
	recorder.value.stop();
}
const onStop= async (res)=>{
	recordFile.value.duration = res.duration
	recordFile.value.tempFilePath = res.tempFilePath
	recordFile.value.fileSize = res.fileSize
	await uploadFile();
	proxy.$emit('end',recordFile.value)
}
// 暂停录音
const pause = ()=>{
	recorder.value.pause();
}
const onPause= (res)=>{

}
// 继续录音
const resume = ()=>{
	recorder.value.resume();
}
const onResume= (res)=>{

}

const uploadFile=async()=>{
	const result = await uniCloud.uploadFile({
	    filePath: recordFile.value.tempFilePath,
	    cloudPath: 'audio/'+Date.now()+'.mp3',
	    onUploadProgress: (progressEvent)=> {
	        console.log(progressEvent);
	        let percentCompleted = Math.round(
	            (progressEvent.loaded * 100) / progressEvent.total
	        );
	    }
	});
	console.log(JSON.stringify(result))
}
</script>

<style></style>

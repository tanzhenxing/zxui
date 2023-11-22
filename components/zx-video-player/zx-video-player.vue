<template>
	<view>
		<view v-if="show">
			<zx-image :width="width" :height="height" :src="poster"></zx-image>
			<view>
				
			</view>
		</view>
		<view v-else>
			<video :id="id" :ref="id" :style="{width: width,height:height}" :src="src" :poster="poster" :object-fit="objectFit" :autoplay="autoplay" :muted="muted" initial-time="" duration="" :controls="controls" danmu-list="" danmu-btn="" enable-danmu=""></video>
		</view>
	</view>
	
</template>

<script setup>
import {ref,getCurrentInstance} from 'vue'
const {proxy} = getCurrentInstance()

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	id:{
		type: String,
		default: 'videoId'
	},
	src: {
		type: String,
		default: ''
	},
	poster: {
		type: String,
		default: ''
	},
	width: {
		type: String,
		default: '690rpx'
	},
	height: {
		type: String,
		default: '450rpx'
	},
	objectFit: {
		type: String,
		default: '450rpx'
	},
	autoplay: {
		type: Boolean,
		default: false
	},
	muted: {
		type: Boolean,
		default: false
	},
	controls: {
		type: Boolean,
		default: true
	}
})

const getVideoInfo=()=>{
	if(props.src){
		uni.getVideoInfo({
			src:props.src,
			success: (res) => {
				proxy.$emit('getVideoInfo');
			}
		})
	}
}


</script>

<style lang="scss" scoped>

</style>
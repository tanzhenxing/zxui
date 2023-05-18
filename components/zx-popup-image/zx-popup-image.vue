<template>
	<view>
		<zx-popup :show="show" :mode="mode" :round="round" :closeable="closeable" :closeOnClickOverlay="closeOnClickOverlay" :overlayOpacity="overlayOpacity" bgColor="transparent" :zIndex="10074" @close="close">
			<view class="flex-center column" :style="{backgroundColor:bgColor,borderRadius:round,padding: padding,margin:margin}">
				<zx-image :width="getImageWidth+'rpx'" :height="imgHeight" :src="src" :radius="imgRadius" :mode="imgMode" @click="goLink"></zx-image>
				<zx-text v-if="text" :text="text" align="center" lineHeight="50rpx" size="30rpx"></zx-text>
			</view>
			<view v-if="closeIcon" class="flex-center row close">
				<zx-icon name="close-circle-fill" color="#c5c5c5" size="60rpx" @click="close"></zx-icon>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	text: {
		type: String,
		default: ''
	},
	item: {
		type: Object,
		default: ()=>{
			return {}
		}
	},
	zIndex: {
		type: Number,
		default: 10074
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	round: {
		type: String,
		default: '15rpx'
	},
	mode: {
		type: String,
		default: 'center'
	},
	closeable: {
		type: Boolean,
		default: false
	},
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	overlayOpacity: {
		type: Number,
		default: 0.8
	},
	src:{
		type: String,
		default: ''
	},
	link: {
		type: String,
		default: ''
	},
	padding: {
		type: String,
		default: '0rpx'
	},
	margin: {
		type: String,
		default: '0rpx'
	},
	imgWidth: {
		type: String,
		default: '700rpx'
	},
	imgHeight: {
		type: String,
		default: 'auto'
	},
	imgMode: {
		type: String,
		default: 'widthFix'
	},
	imgRadius: {
		type: String,
		default: '10rpx'
	},
	closeIcon:{
		type: Boolean,
		default: true
	}
});

const getImageWidth = computed(()=>{
	return parseInt(props.imgWidth) - (parseInt(props.padding) + parseInt(props.margin))*2;
});

// 关闭广告
const close = () => {
	proxy.$emit('close');
};
const goLink = () => {
	// #ifdef H5
	if(props.link){
		window.location.href = props.link;
	}
	// #endif
	
};
</script>

<style lang="scss">
	.flex-center {
		display: flex;align-items: center;justify-content: center;
		
	}
	.column {
		flex-direction: column;
	}
	.row {
		flex-direction: row;
	}
.close {
	margin-top: 20rpx;
	background-color: transparent;
}
</style>

<template>
	<view>
		<view v-if="(videoUrl==='' && content===null) || (videoUrl==='' && content==='')">
			<zx-empty></zx-empty>
		</view>
		<view v-else>
			<video :id="videoId" :style="{width: '100%'}" :src="videoUrl" :poster="videoImg" object-fit="fill" :autoplay="autoplay" :muted="muted" controls></video>
		</view>
		<view class="introduce-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	
export default {
	name: 'zx-introduce',
	data() {
		return {
			videoWidth: '710rpx',
			videoHeight: '350rpx'
		};
	},
	created() {
		setTimeout(()=>{
		  uni.createVideoContext(this.videoId).pause();
		},1000);
		/* setTimeout(()=>{
			if(this.videoUrl!==''){
				uni.getVideoInfo({
					src: this.videoUrl,
					success: (res) => {
						this.videoWidth = uni.upx2px(710);
						this.videoHeight = this.videoWidth * (res.width / res.height)
						console.log(JSON.stringify(res),this.videoWidth,this.videoHeight)
					}
				});
			}
		},500) */
	},
	props: {
		videoId: {
			type: String,
			default: 'videoId'
		},
		videoUrl: {
			type: String,
			default: ''
		},
		videoImg: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		muted: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss">
.introduce-video {
	background-color: #ffffff;
	width: 100%;
	height: 400rpx;
}
.introduce-content {
	font-size: 32rpx;
	text-align: justify;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	line-height: 50rpx;
	color: #303133;
	padding-left: 10rpx;
	padding-right: 10rpx;
}
</style>

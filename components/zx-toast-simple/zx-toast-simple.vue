<template>
	<view class="zx-toast" :class="[visible?'zx-toast-show':'',content?'zx-toast-padding':'',icon?'':'zx-unicon-padding']" :style="{width:getWidth(icon,content),zIndex:zIndex}">
		<image :src="imgUrl" class="zx-toast-img" v-if="icon"></image>
		<view class="zx-toast-text" :class="[icon?'':'zx-unicon']">{{title}}</view>
		<view class="zx-toast-text zx-content-ptop" v-if="content && icon">{{content}}</view>
	</view>
</template>

<script>
	export default {
		name: "zx-toast-simple",
		props: {
			zIndex:{
				type:Number,
				default:99999
			}
		},
		data() {
			return {
				timer: null,
				//是否显示
				visible: false,
				//显示标题
				title: "操作成功",
				//显示内容
				content: "",
				//是否有icon
				icon:false,
				imgUrl:""
			};
		},
		methods: {
			show: function(options) {
				let {
					duration = 2000,
					icon=false
				} = options;
				clearTimeout(this.timer);
				this.visible = true;
				this.title = options.title || "";
				this.content = options.content || "";
				this.icon=icon;
				if(icon && options.imgUrl){
					this.imgUrl=options.imgUrl
				}
				this.timer = setTimeout(() => {
					this.visible = false;
					clearTimeout(this.timer);
					this.timer = null;
				}, duration);
			},
			getWidth(icon,content){
				let width="auto";
				if(icon){
					width=content?'420rpx':'360rpx'
				}
				return width
			}
		}
	}
</script>

<style scoped>
	.zx-toast {
		background-color: rgba(0, 0, 0, 0.75);
		border-radius: 10rpx;
		position: fixed;
		visibility: hidden;
		opacity: 0;
		left: 50%;
		top: 48%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		transition:  0.3s ease-in-out;
		transition-property:opacity,visibility;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 60rpx 20rpx 54rpx 20rpx;
		box-sizing: border-box;
	}

	.zx-toast-padding {
		padding-top: 50rpx !important;
		padding-bottom: 50rpx !important;
	}
	.zx-unicon-padding {
		padding: 24rpx 40rpx !important;
		word-break: break-all;
	}

	.zx-toast-show {
		visibility: visible;
		opacity: 1;
	}


	.zx-toast-img {
		width: 120rpx;
		height: 120rpx;
		display: block;
		margin-bottom: 28rpx;
	}

	.zx-toast-text {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 400;
		color: #fff;
		text-align: center;
	}
	.zx-unicon{
		line-height: 40rpx !important;
		font-size: 32rpx !important;
	}
	.zx-content-ptop {
		padding-top: 10rpx;
		font-size: 26rpx !important;
	}
</style>

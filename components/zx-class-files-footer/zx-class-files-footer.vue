<template>
	<view>
		<view :span="12" v-for="(item,index) in items" :key="index">
			<navigator :url="item.path+'?id='+id">
			<view class="vote-icon-text">
				<image class="vote-icon-image" :src="(index===currentIndex)?item.icon:item.activeIcon" mode="aspectFill"></image>
			</view>
			<view class="vote-icon-title">
				<text>{{item.title}}</text>
			</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-vote-footer",
		data() {
			return {
				items: [
					{title:'相册',path:'/pages/family/class/album',icon:'https://files.wufu-app.com/images/icon/class/xc.png',activeIcon:'https://files.wufu-app.com/images/icon/class/sxc.png'},
					{title:'视频',path:'/pages/family/video/video',icon:'https://files.wufu-app.com/images/icon/class/sp.png',activeIcon:'https://files.wufu-app.com/images/icon/class/spu.png'}
				]
			};
		},
		props: {
			currentIndex: {
				type: Number,
				default: 0
			},
			id: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style scoped>
.vote-icon-text {
		text-align: center;
		margin-top: 2rpx;
	}
	.vote-icon-image {
		width:40rpx;height: 40rpx;
	}
	.vote-icon-title {
		text-align: center;line-height: 32rpx;font-size: 28rpx;
	}
</style>
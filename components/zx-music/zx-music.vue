<template>
	<view>
		<!-- 简约版 -->
		<view v-if="skin==='mini'" class="uni-pa-6">
			<view class="gui-flex gui-row gui-align-items-center gui-justify-content-center">
				<image class="gui-player-poster-img" :class="[playStatus == 1 ? 'gui-playing' : '']" :style="{width: posterSize+'rpx',height: posterSize+'rpx', borderRadius: (posterSize * 0.5) +'rpx'}" :src="currentAudio.coverImgUrl" mode="aspectFill"></image>
				<view class="gui-flex1 uni-px-4">
					<zx-text :text="currentAudio.title" size="30rpx" lineHeight="40rpx" fontFamily="regular"></zx-text>
					<zx-text :text="currentAudio.introduce" size="28rpx" color="#666666" lineHeight="40rpx" :lines="1" fontFamily="regular"></zx-text>
					<view class="uni-mt-2">
						<!-- <zx-line-progress :percentage="progress" activeColor="#18b566"></zx-line-progress> -->
					</view>
				</view>
				<view class="gui-flex gui-column gui-align-items-center gui-justify-content-center">
					<button type="primary" size="mini" shape="circle" color="#FF0000" :throttleTime="500" text="换一换" :customStyle="{marginBottom:'10rpx'}" icon="reload" @click="random"></button>
					<view>
						<!-- 微信浮窗播放按钮 -->
						<view v-if="isWechatAudio">
							<!-- <wx-open-audio id="wechatAudio" ref="wechatAudio" :title="currentAudio.title" singer="" :episode="currentAudio.introduce" :src="currentAudio.src" :cover="currentAudio.coverImgUrl">
								<script type="text/wxtag-template" slot="default">
									<div class="icon-font">
										<span class="iconfont icon-play-circle-fill"></span>
									</div>
								</script>
								<script type="text/wxtag-template" slot="playing">
									<div class="icon-font">
										<span class="iconfont icon-poweroff-circle-fill"></span>
									</div>
								</script> 
								<script type="text/wxtag-template" slot="style">
								    <style>
								        @font-face {
								          font-family: "iconfont";
								          src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAL4AAsAAAAAB1QAAAKsAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACCfgqCGIIgATYCJAMMCwgABCAFhGcHURuPBhHVk3lkPxNscBt1I9rHm2Xe7AIOdc3QDG18E0S1Rvbs7N0TsSKgICogdqwiZByhJJJoPzJ1m5tVSF64CMOU2F9+61ISVtelYQUA4eJ+1nlAEGCM8/m/n/zLn8gF8BVVUZf92doi7ftotPOB1mmzEUYBTSfEUzic8co8BwH8KVXHtLT1jBC8cXHnZuJZLKFAmiwb161ZxFf0YrFI+CK4fZda5AIOmJPmDYrz4fXlL018weAo1i4Dq1tX8uBX+68OPeA9+hVfgIDhBnAABQp3ZpGxdusAGkcLKf51Vksm7W8R+NXheb/affm+//BAMCAuFj8QgFwozR0pXBW3psAyDAAKgMsrxCeBI5SL7KqYqNDQqJDdp0be2uTA9x05/f9ADv7ef27mwBV//1PXRA9eDwg4fZXJfOEBtsmRK8I216NGo65eSdWGXWtqVlZXr6xZs+xIgvYrq9fULJc6vhzXFi11m/0oUarBLN2jnn26kbnNtlYzF9KSjZcwlwUAvOpDbQy/IYDAq57jd+dDav5NgAXgx+frHfF4tfS34HubVoH/rp7pWdTqPlBbJ3dTEECpeoWwAfztAHgsZ7jv4zURvfkg+BKRwuBDAhRf0inL5cMhgHK4+FILfwq0rg4gwlYUsX5AtsMEQqh7MARzH0qo55TlPsAh2k+4hPoPf8YkaLsAsgObK6MW7KE7YTLBk6OVUOwLh9Vqrgr9kNOEANRFVUw80SNPMSNtQyNCQBwcPPjT0NoAkcOMRopRJLZlSXUXKUxw6sqoBXvQnWAywZNfXPL398JhtZp7Ur8opwniQa1Q9aCeKt8r7052SdvQECFATOIOPMRBaG0AsX7QjEYK44hwbJV2MeqrKtbXuI/bAvhj/YCKERXLXtiRA1FuJjYWc5qszaLVZ8GoFA==') format('woff2');
								        }
								        .iconfont {
								          font-family: "iconfont" !important;
								          font-style: normal;
										  color: #ff0000;
										  font-size: 40px;
										  line-height: 40px;
								          -webkit-font-smoothing: antialiased;
								          -moz-osx-font-smoothing: grayscale;
								        }
								        .icon-poweroff-circle-fill:before {
								          content: "\e847";
								        }
								        .icon-play-circle-fill:before {
								          content: "\e848";
								        }
										.icon-font {
											width: 40px;
											height: 40px;
											text-align: center;
										}
								    </style>
								</script>
							</wx-open-audio> -->
						</view>
						<!-- 默认播放按钮 -->
						<zx-icon v-else :name="playStatus===1?'pause-circle-fill':'play-circle-fill'" color="#FF0000" size="70rpx" @click="playing"></zx-icon>
					</view>
				</view>
			</view>
			<view v-if="currentAudio.lyric!==undefined" class="lyric" style="background-color: ;">
				<scroll-view :scroll-top="0" :scroll-y="true" class="scroll-Y" :show-scrollbar="true">
					<text :style="{color:lyricColor}">{{currentAudio.lyric}}</text>
				</scroll-view>
			</view>
		</view>
		
		<!-- 通用版 -->
		<view v-else-if="skin==='normal'" class="gui-player">
			<view class="gui-flex gui-row gui-align-items-center gui-justify-content-center">
				<view style="width: 70rpx;"></view>
				<view class="gui-flex1">
					<zx-text :text="currentAudio.sort>0?currentAudio.sort+'. '+currentAudio.title:currentAudio.title" align="center" lineHeight="100rpx" size="40rpx" lines="1" color="#ffffff" fontFamily="medium"></zx-text>
				</view>
				<view style="width: 70rpx;">
					<zx-icon :name="currentAudio.is_love === 0?'heart':'heart-fill'" color="#ffffff" size="55rpx" @click="collect"></zx-icon>
				</view>
			</view>
			<view class="gui-player-poster">
				<image class="gui-player-poster-img" :class="[playStatus == 1 ? 'gui-playing' : '']" :style="{width: posterSize+'rpx',height: posterSize+'rpx', borderRadius: (posterSize * 0.5) +'rpx'}" :src="currentAudio.coverImgUrl" mode="aspectFill"></image>
			</view>
			<view v-if="currentAudio.lyric!==undefined" class="lyric">
				<scroll-view :scroll-top="0" :scroll-y="true" class="scroll-Y" :show-scrollbar="true">
					<text :style="{color:lyricColor}">{{currentAudio.lyric}}</text>
				</scroll-view>
			</view>
			<!-- 播放进度 -->
			<view style="padding:25rpx;">
				<!-- <zx-single-slider ref="graceSingleSlider" :barWidth="160" :barHeight="28"
					:barText="playTime" barColor="#36395A"
					barBgColor="linear-gradient(to right, #FFFFFF,#FFFFFF)"
					bglineColor="rgba(255,255,255,0.5)" bglineAColor="#FFFFFF"
					@change="progressChange"></zx-single-slider> -->
			</view>
			<!-- 播放工具 -->
			<view class="uni-pa-6">
				<view class="gui-flex gui-row gui-space-between">
					<text class="gui-icons icon-size" :style="dotype===1?'':{fontSize:'46rpx'}" @click="changeType">{{dotype===1?'&#xe677;':'&#xe64a;'}}</text>
					<text class="gui-icons icon-size" @click="prev">&#xe659;</text>
					<!-- <zx-wx-open-audio :item="currentAudio"></zx-wx-open-audio> -->
					<text v-if="!isWechatAudio" class="gui-icons icon-size" style="font-size:66rpx;" @click="playing">{{playStatus===1?'&#xe64b;':'&#xe649;'}}</text>
					<text class="gui-icons icon-size" @click="next">&#xe65a;</text>
					<text class="gui-icons icon-size" style="font-size: 46rpx;" @click="openList">&#xe648;</text>
				</view>
			</view>
		</view>
		
		<!-- 背景音乐版 -->
		<view v-else-if="skin==='bgsound'">
			<view v-if="isWechatAudio">
				<view class="gui-fixed-lt music-box">
					<view class="music-box-bg">
						<!-- <wx-open-audio id="wechatAudio" ref="wechatAudio" :title="currentAudio.title" singer="" :episode="currentAudio.introduce" :src="currentAudio.src" :cover="currentAudio.coverImgUrl">
							<script type="text/wxtag-template" slot="default">
								<image class="music-box-img" src="https://app.wufzx-app.com/static/icon/music_icon.png"></image>
							</script>
							<script type="text/wxtag-template" slot="playing">
								<image class="music-box-img gui-playing" src="https://app.wufzx-app.com/static/icon/music_icon.png"></image>
							</script> 
							<script type="text/wxtag-template" slot="style">
							    <style>
									@keyframes gui-rotate360 {
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
									.gui-playing {
										animation: gui-rotate360 6000ms infinite linear;
									}
							       .music-box-img {
									   width: 35px;
									   height: 35px;
							       }
							    </style>
							</script>
						</wx-open-audio> -->
					</view>
				</view>
			</view>
			<view v-else class="gui-fixed-lt music-box">
				<view class="music-box-bg" @click="playing">
					<image class="music-box-img" :class="playStatus == 1 ? 'gui-playing' : ''" src="/static/icon/music_icon.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-music",
		data() {
			return {
				player: null,
				duration: 0,   // 音频总时长
				currentTime: 0,
				playTime: '00:00',
				timer: null,
				dotype: 1,
				playStatus: 2,    // 1，正在播放，2暂停中
				progress: 0
			};
		},
		created() {
			this.$nextTick(()=>{
				if(this.isWechatAudio){
					this.player = document.getElementById('wechatAudio');
				} else {
					this.player = uni.createInnerAudioContext();
				}
				if (this.autoplay) {
					this.play();
				}
				this.onCanplay();
				this.onTimeUpdate();
				this.onPlay();
				this.onPause();
				this.onEnded();
			})
		},
		props: {
			skin: {
				type: String,
				default: 'normal'
			},
			isWechatAudio: {
				type: Boolean,
				default: false
			},
			audioType: {
				type:Number,
				default: 1
			},
			currentAudio: {
				type: Object,
				default: function(){
					return {};
				}
			},
			autoPlay: {
				type: Boolean,
				default: false
			},
			showLike: {
				type: Boolean,
				default: true
			},
			posterSize: {
				type: Number,
				default: 200
			},
			lyricColor: {
				type: String,
				default: '#666666'
			}
		},
		methods: {
			// 检测音频时长
			onCanplay(){
				if(this.isWechatAudio){
					this.player.addEventListener('canplay', (event)=> {
						setTimeout(() => {
							this.duration = event.detail.duration;
							this.playTime = '00:00' + ' / ' + this.ext.timeFormat(this.duration);
						}, 100);
					});
				} else {
					this.player.onCanplay(() => {
						setTimeout(() => {
							this.duration = this.player.duration;
							this.playTime = '00:00' + ' / ' + this.ext.timeFormat(this.duration);
						}, 100);
					});
				}
			},
			// 音频播放进度更新事件
			onTimeUpdate(){
				if(this.isWechatAudio){
					this.player.addEventListener('timeupdate', (event)=> {
						this.currentTime = event.detail.currentTime;
						// 调整进度
						this.progress = Math.round((this.currentTime / this.duration) * 100);
						let ref = this.$refs.graceSingleSlider;
						if (ref) {
							ref.setProgress(this.progress);
						}
						this.playTime = this.ext.timeFormat(this.currentTime) + ' / ' + this.ext.timeFormat(this.duration);
					});
				} else {
					this.player.onTimeUpdate(() => {
						try {
							this.currentTime = this.player.currentTime;
							// 调整进度
							this.progress = Math.round((this.currentTime / this.duration) * 100);
							let ref = this.$refs.graceSingleSlider;
							if (ref) {
								ref.setProgress(this.progress);
							}
							this.playTime = this.ext.timeFormat(this.currentTime) + ' / ' + this.ext.timeFormat(this.duration);
						} catch (e) {
							console.log('onTimeUpdate:'+JSON.stringify(e))
						}
					});
				}
				
			},
			// 正在播放
			onPlay(){
				if(this.isWechatAudio){
					this.player.addEventListener('play', (event)=> {
						this.playStatus = 1;
					});
				} else {
					this.player.onPlay(() => {
						this.playStatus = 1;
					});
				}
			},
			// 暂停中
			onPause(){
				if(this.isWechatAudio){
					this.player.addEventListener('pause', (event)=> {
						this.playStatus = 2;
					});
				} else {
					this.player.onPause(() => {
						this.playStatus = 2;
					});
				}
			},
			// 播放结束
			onEnded(){
				if(this.isWechatAudio){
					this.player.addEventListener('ended',(event)=> {
					  switch (this.dotype) {
					  	case 1:
					  		this.next();
					  		break;
					  	case 2:
					  		this.player.seek(0);
					  		this.play();
					  		break;
					  }
					});
				} else {
					this.player.onEnded(() => {
						switch (this.dotype) {
							case 1:
								this.next();
								break;
							case 2:
								this.player.seek(0);
								this.play();
								break;
						}
					});
				}
			},
			// 收藏
			collect(){
				if(this.currentAudio.is_love>0){
					this.unCollect();
				} else {
					this.setCollect();
				}
			},
			setCollect() {
				let path = '';
				switch(this.audioType){
					case 1:
					path = '/school_data/yetingfm/loveSong';
					break;
					case 2:
					path = '/education/redsong/loveSong';
					break;
				}
				
				let data = {
					id: this.currentAudio.id
				};
				let method = 'GET';
				this.ext.getData(path, data, method).then(res => {
					//console.log('collect:'+JSON.stringify(res),'path:'+path,'data:'+JSON.stringify(data))
					if (res.code === 0) {
						this.currentAudio.is_love = 1;
						this.loveList = [];
						this.lovePage = 1;
						uni.showToast({
							title: '收藏成功',
							duration: 1000
						});
					}
				});
			},
			unCollect() {
				let path = '';
				switch(this.audioType){
					case 1:
					path = '/school_data/yetingfm/cancelSong';
					break;
					case 2:
					path = '/education/redsong/cancelSong';
					break;
				}
				
				let data = {
					id: this.currentAudio.id
				};
				let method = 'GET';
				this.ext.getData(path, data, method).then(res => {
					//console.log('unCollect:'+JSON.stringify(res),'path:'+path,'data:'+JSON.stringify(data))
					if (res.code === 0) {
						this.currentAudio.is_love = 0;
						this.loveList = [];
						this.lovePage = 1;
						uni.showToast({
							title: '已取消收藏',
							duration: 1000
						});
					}
				});
			},
			// 进度修改
			progressChange(e) {
				console.log(e)
				if(this.currentTime===0){
					this.setAudio();
				}
				if (this.timer != null) {
					clearTimeout(this.timer);
				}
				let needTime = (this.duration * e) / 100;
				needTime = Math.round(needTime);
			
				this.playTime = this.ext.timeFormat(needTime) + ' / ' + this.ext.timeFormat(this.duration);
				
				if(this.isWechatAudio){
					this.player.currentTime(needTime);
					this.timer = setTimeout(() => {
						this.player.play();
					}, 300);
				} else {
					this.timer = setTimeout(() => {
						this.player.seek(needTime);
						this.player.play();
					}, 300);
				}
			},
			// 切换播放模式
			changeType() {
				switch (this.dotype) {
					case 1:
						this.dotype = 2;
						uni.showToast({
							title: '切换为单曲循环'
						});
						break;
					case 2:
						this.dotype = 1;
						uni.showToast({
							title: '切换为列表循环'
						});
						break;
				}
			},
			playing(){
				if(this.player.currentTime===0){
					this.setAudio();
				}
				switch(this.playStatus){
					case 1:
					this.player.pause();
					break;
					case 2:
					this.player.pause();
					setTimeout(()=>{
						this.player.play();
					},300);
					break;
				}
			},
			// 暂停
			pause() {
				this.player.pause();
			},
			// 播放
			play() {
				this.player.pause();
				// 设置播放信息
				this.setAudio();
				// 开始播放
				setTimeout(()=>{
					this.player.play();
				},300);
			},
			// 下一首
			next() {
				this.$emit('next');
				this.play();
			},
			// 上一首
			prev() {
				this.$emit('prev');
				this.play();
			},
			end(){
				this.$emit('end',this.dotype);
			},
			// 设置待播放信息
			setAudio() {
				this.player.title = this.currentAudio.title;
				this.player.singer = this.currentAudio.singer;
				this.player.coverImgUrl = this.currentAudio.coverImgUrl;
				this.player.src = this.currentAudio.src;
			},
			openList(){
				this.$emit('openList');
			},
			random(){
				this.$emit('random');
			}
		}
	}
</script>

<style scoped>
	.play-bg {
		background-color: #ececec;
		border-radius: 20px;
		width: 40px;
		height: 40px;
	}
.lyric {
	text-align: center;
	font-size: 28rpx;
	line-height: 45rpx;
}
.scroll-Y {
	height: 500rpx;
}
.gui-player {

}

.gui-player-title {
	text-align: center;
	line-height: 50rpx;
	font-size: 40rpx;
	font-weight: bold;
	color: #ffffff;
}

.gui-player-singer {
	text-align: center;
	line-height: 40rpx;
	font-size: 26rpx;
	color: #ffffff;
}

.gui-player-poster {
	padding: 50rpx;
	line-height: 0;
	text-align: center;
}

.gui-player-poster-img {
	box-shadow: 0rpx 2rpx 2rpx #323232;
}

@keyframes gui-rotate360 {
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

.gui-playing {
	animation: gui-rotate360 6000ms infinite linear;
}

.gui-player-console {
	padding: 20rpx 10rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.gui-player-tool {
	width: 100rpx;
	line-height: 100rpx;
	text-align: center;
	font-size: 50rpx;
	display: block;
	flex-shrink: 0;
	color: #ffffff;
}

.gui-player-console-c {
	width: 400rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}


.icon-size {
	font-size: 60rpx;
	line-height: 80rpx;
	color: #ffffff;
}

.music-words {
	text-align: center;
	color: #ffffff;
	margin-bottom: 10px;
	line-height: 25px;
	max-height: 100px;
	overflow: hidden;
}

	.music-box {
		top:100rpx; left:10rpx;background-color: #d5d4d4;border-radius: 50rpx;width: 100rpx;height: 100rpx;
	}
	.music-box-bg {
		width: 80rpx;height: 80rpx;border-radius: 40rpx;background-color: #7e7d7d;margin-top: 10rpx;margin-left: 10rpx;
		display: flex;flex-direction:row;flex-wrap:nowrap;justify-content:center;align-items:center;
	}
	.music-box-img {
		width: 35px;
		height: 35px;
	}
</style>
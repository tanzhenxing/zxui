<template>
	<view>
		<view class="uni-ma-2">				
			<!-- <view class="scroll-view" v-if="item.group_list.length > 0">
				<swiper autoplay="true">
					<swiper-item v-for="(item_g, index_g) in item.group_list" :key="index_g">
						<view class="create-group">
							<view class="create-group-image-name">
								<view>
									<image class="create-group-image" :src="item_g.avatar"></image>
								</view>
								<view class="create-group-name-view">
									<text class="create-group-name">{{item_g.nickname}}</text>
								</view>
							</view>
							<view class="create-group-time-action">
								<view class="create-group-time-view">
									<text class="create-group-time">剩余{{item_g.currentTime}}</text>
								</view>
								<view class="to-group" @tap="toGroup(item_g,item.group_list.length)">
									<text class="to-group-text">去拼团</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view> -->	
			<view class="group-hr" v-if="item.group_list.length > 0"></view>
			
			<view class="uni-mx-2">				
				<view style="display: flex;" class="my-groups" v-show="item.is_launch == 1">
					<view class="my-group" @tap="buyGroup(item)">
						<text class="my-group-text">立即拼团</text>
					</view>
				</view>
			</view>
			<view class="group-hr-down" v-if="item.group_list.length > 0"></view>
		</view>
	
		<zx-popup ref="popupComment">
			<view class="group-window">					
				<view class="popup-comment">
					<view>
						<text class="create-group-name">参与{{group_info.nickname}}的拼单</text>
					</view>
					<view>
						<text class="create-group-time-small">{{group_info.currentTime}}后结束拼团</text>
					</view>
					<view class="group-users">	
						<view class="group-users-one">											
							<view>
								<image class="create-group-image" :src="group_info.avatar"></image>
							</view>
							<view class="group-master">
								<text class="group-master-name">团长</text>
							</view>
						</view>	
						<view class="group-users-one" v-for="(item_group_fans, index_group_fans) in group_info.group_fans" :key="index_group_fans" v-if="item_group_fans.fans_id != group_info.fans_id">
							<view>
								<image class="create-group-image" :src="item_group_fans.avatar"></image>
							</view>
						</view>	
						<view class="group-users-one" v-for="n in group_info.remain_group_fans">
							<view>
								<image class="create-group-image" src="https://files.wufu-app.com/images/icon/group_circle.png"></image>
							</view>
						</view>
					</view>
					<view class="popup-comment-send-view" @click="toSend(group_info)">
						<text class="popup-comment-send">参与拼团</text>
					</view>
				</view>
				<view class="publish-options-close" @tap="toPublish()">
					<zx-icon style="background-color:lightgray;border-radius: 50%;" type="closeempty" size="18"></zx-icon>
				</view>
			</view>
		</zx-popup>
	</view>
</template>

<script>
	export default {
		name:"my-course-catalogue-group-launch",
		data() {
			return {
				group_info: {},
			};
		},
		
		props: {
			title: {
				type: String,
				default: '未知分类'
			},
			moreText: {
				type: String,
				default: '课程目录'
			},
			showPrice: {
				type: Boolean,
				default: true
			},
			buyPrice: {
				type: Boolean,
				default: true
			},
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		
		methods: {
			toGroup(item,group_length){				
				if(group_length == 1){
					this.group_info = item;
					this.$refs.popupComment.open();
				}else{
					uni.navigateTo({
						url:'/pages/course/group/list?section_id='+item.resource_id+'&type=2'
					})
				}
			},
			
			toPublish: function(index) {
				this.$refs.popupComment.close()
			},
			
			buyGroup(item){
				let path = '/section';
				let data = {
					'section_id':item.section_id,
				};
				let method = 'GET';
				this.ext.getData(path,data,method).then(res=>{					
					if(res.code != 0){
						uni.showToast({
							title: res.message.toString(),
							icon: 'none',
							duration: 1000   
						});
						return;
					}
					
					if(res.data.pay_appid != undefined){
						this.ext.goWechatPayGroup(3,item.section_id,res.data.pay_appid,0);
					}
				});
			},
			
			toSend(group_info){
				let path = '/section';
				let data = {
					'section_id':group_info.resource_id,
				};
				let method = 'GET';
				this.ext.getData(path,data,method).then(res=>{					
					if(res.code != 0){
						uni.showToast({
							title: res.message.toString(),
							icon: 'none',
							duration: 1000   
						});
						return;
					}
					
					if(res.data.pay_appid != undefined){
						this.ext.goWechatPayGroup(3,group_info.resource_id,res.data.pay_appid,group_info.id);
					}
				});
			},
		}
	}
</script>

<style>
	.create-group{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}	
	
	.create-group-image-name{
		display: flex;
		flex-direction: row;
		align-items: center;
	}	
	
	.create-group-time-action{
		display: flex;
		flex-direction: row;
	}
	
	.create-group-image{		
		width: 80rpx;
		height: 80rpx;
		border-radius: 78rpx;
		background-color: #ECECEC;
	}
	
	.create-group-name-view{
		margin-left: 20rpx;
	}
	
	.create-group-name{
		color: rgb(16, 16, 16);
		font-weight: bold;
		font-size: 32rpx;
	}	
	
	.create-group-time-view{
		margin-right: 20rpx;
	}	
	
	.create-group-time{
		color: rgb(155, 155, 155);
		font-size: 32rpx;
	}
	
	.to-group{
		background-color: red;
		border-radius: 5rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width:150rpx;
		height:30rpx;
	}
	
	.to-group-text{
		color:white;
		font-size: 36rpx;
	}	
	
	.group-hr{
		border-bottom: 1rpx solid lightgray;
		margin-top: 30rpx;
		margin-bottom: 10rpx;
	}	
	
	.group-hr-down{
		/* border-bottom: 1rpx solid lightgray; */
		margin-top: 30rpx;
		/* margin-bottom: 10rpx; */
	}
	
	.my-groups{
		display:flex;
		justify-content: space-between;
	}	
	
	.my-group{
		background-color: red;
		border-radius: 60rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		width:150rpx;
		height:80rpx;
		z-index: 1;
	}
	
	.my-group-text{
		color:white;
		font-size: 36rpx;
	}
	
	.scroll-view{
		height: 100rpx;
	}
		
	.popup-comment{
		display: flex;
		background-color: white;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-left: 100rpx;
		padding-right: 100rpx;
		padding-top:40rpx;
		border-radius: 20rpx;
	}
		
	.popup-comment-send-view{
		background-color: red;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 100rpx 10rpx 100rpx;
		background-color: #FF0000;
		border-radius: 10rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}
	
	.popup-comment-send{
		color: white;
		font-size: 28rpx;
	}
	
	.group-master{
		position: absolute;
		z-index:999;
		margin-top: -40rpx;
		width: 80rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background-color: rgb(255,186,20);
		display: flex;
		justify-content: center;
	}
	
	.group-master-name{
		color: white;
	}
	
	.group-users{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 20rpx;
		width: 300rpx;
	}
	
	.group-users-one{
		margin-right: 20rpx;
	}
	
	.create-group-time-small{
		color: #999999;
		font-size: 26rpx;
	}
	
	.group-window{
		display: flex;
		flex-direction: row;
	}
	
	.publish-options-close{
		margin-top: -20rpx;
		margin-left: -30rpx;
	}
	
	.uni-mx-2{
		display: flex;
		justify-content: flex-end;
		margin-top: 30rpx;
	}
</style>
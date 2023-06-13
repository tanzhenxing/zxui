<template>
	<view v-if="show" class="uni-px-2">
		<view>
			<swiper :vertical="true" :autoplay="true" :circular="true" :interval="interval" :current="0" style="height: 80rpx;padding-top: 20rpx;padding-bottom: 20rpx;background-color: #ffffff;">
				<swiper-item v-for="(item, index) in lists" :key="index">
					<view class="gui-flex gui-rows gui-justify-content-center gui-align-items-center">
						<view style="width: 100rpx;">
							<zx-avatar :src="item.avatar" size="80rpx" mode="aspectFill"></zx-avatar>
						</view>
						<view class="gui-flex1">
							<zx-text :text="item.nickname" size="32rpx" :bold="true" color="#101010" lines="1"></zx-text>
						</view>
						<view style="width: 220rpx;">
							<view style="display: flex;">
								<view style="width: 70rpx;">
									<zx-text color="#666666" text="剩余" size="30rpx"></zx-text>
								</view>
								<view style="flex: 1;">
									<zx-countdown :time="(item.end_time * 1000 - Date.parse(new Date())) % (60 * 60 * 24 * 1000)" format="HH:mm:ss"></zx-countdown>
								</view>
							</view>
						</view>
						<view style="width: 180rpx;">
							<button type="default" size="mini" style="color: #ffffff;background-color: #ff0000;font-size: 30rpx;margin-top: 5rpx;" @click="openPopup(item)">去拼团</button>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<zx-line></zx-line>
		</view>
		<!-- <view class="uni-py-4">
			<view style="display: flex;">
				<view style="flex: 1;">
					<button v-if="showGiftButton" type="default" style="color: #ffffff;background-color: #ff0000;" @click="buyGift">送五福</button>
				</view>
				<view style="width: 220rpx;">
					<button v-if="showGroupButton" type="default" style="color: #ffffff;background-color: #ff0000;border-radius: 60rpx;width: 200rpx;size: 30rpx;" @click="buyGroup(0)">立即拼团</button>
				</view>
			</view>
		</view> -->
		
		<!-- 弹窗 -->
		<zx-group-popup  v-if="show_popup" :item="group_info" :show="show_popup" :showPopupButton="true" :disabled="disabled" :popupText="disabled?'拼团中':'参与拼团'" @close="closePopup"></zx-group-popup>
	</view>
</template>

<script>
	import myGroupPopup from './zx-group-popup.vue';
	
	export default {
		name:"zx-course-catalogue-group",
		components: {
			myGroupPopup
		},
		data() {
			return {
				show_popup:false,
				group_info: {},
			};
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			},
			showGroupButton: {
				type: Boolean,
				default: true
			},
			showGiftButton: {
				type: Boolean,
				default: false
			},
			showPopup: {
				type: Boolean,
				default: false
			},
			interval: {
				type: Number,
				default: 2000
			},
			sectionId: {
				type: Number,
				default: 0
			},
			lists: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		created() {
			this.show_popup = this.showPopup;
		},
		computed: {
			
		},
		methods: {
			openPopup(item){
				this.group_info = item;
				if(this.lists.length===1){
					this.show_popup = true;
				} else {
					uni.navigateTo({
						url:'./group/list?section_id='+item.resource_id+'&type=2'
					});
				}
			},
			closePopup(){
				this.show_popup = false;
			},
			buyGift(){
				
			},
			buyGroup(pid=0){
				let path = '/section';
				let data = {
					section_id:this.sectionId,
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
					
					if(res.data.pay_appid !== undefined){
						this.ext.goWechatPay(3,this.sectionId,res.data.pay_appid,pid);
					}
				});
			},
		}
	}
</script>

<style scoped>
	.close {
		position: absolute;
		right: 0;
		background-color: #D8D8D8;
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
		margin-top: -20rpx;
		margin-right: -20rpx;
	}
	
</style>
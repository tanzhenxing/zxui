<template>
	<view>
		<zx-popup :show="show" mode="center" round="20rpx" @close="close">
			<view class="close gui-flex gui-rows gui-align-items-center gui-justify-content-center" @click="close">
				<zx-icon name="close" size="30rpx"></zx-icon>
			</view>
			<view style="width: 500rpx;margin-top: 50rpx;margin-bottom: 50rpx;">
				<view class="gui-flex gui-columns gui-align-items-center gui-justify-content-center">
					<view style="margin-left: 20rpx;margin-right: 20rpx;">
						<zx-text color="#101010" :text="'参与'+item.nickname+'的拼单'" size="34rpx" :bold="true" align="center" lines="1"></zx-text>
					</view>
					<view class="gui-flex gui-rows gui-align-items-center gui-justify-content-center" :style="{width:'280rpx',marginTop:'10rpx'}">
						<view v-if="(currentTime*0.001)<item.end_time" class="gui-flex1">
							<zx-count-down :time="(item.end_time * 1000 - Date.parse(new Date())) % (60 * 60 * 24 * 1000)" format="HH:mm:ss"></zx-count-down>
						</view>
						<view style="width: 160rpx;">
							<zx-text color="#666666" :text="(currentTime*0.001)<item.end_time?'后结束拼团':'拼团已结束'" size="30rpx" align="right"></zx-text>
						</view>
					</view>
				</view>
				<view class="uni-pa-6">
					<view v-if="item!=={}" class="gui-flex gui-rows gui-align-items-center gui-justify-content-center gui-wrap">
						<view class="uni-mx-4">
							<zx-avatar :src="item.avatar" size="80rpx"></zx-avatar>
							<view style="position: absolute;top: 230rpx;">
								<gui-tags text="团长" bgClass="group-tag" borderColor="#FFBA14" :size="20" :borderRadius="20"></gui-tags>
							</view>
						</view>
						<view v-if="item.group_fans.length>0">
							<view :class="item.fans_id!==user.fans_id?'uni-mx-4':''" v-for="(user,user_index) in item.group_fans" :key="user_index">
								<zx-avatar v-if="item.fans_id!==user.fans_id" :src="user.avatar" size="80rpx"></zx-avatar>
							</view>
						</view>
						<template v-if="item.num!==undefined">
						<view class="uni-mx-4" v-for="(n,n_index) in (item.num - item.group_fans.length)" :key="n_index">
							<zx-avatar src="/static/icon/group_circle.png" size="80rpx"></zx-avatar>
						</view>
						</template>
					</view>
				</view>
				
				<view class="gui-flex gui-columns gui-align-items-center gui-justify-content-center">
					<view style="margin-top: 20rpx;">
						<button v-if="showPopupButton" type="warn" style="color: #ffffff;width: 300rpx;font-size: 30rpx;" size="mini" :disabled="disabled" @click="goGroup">{{popupText}}</button>
					</view>
				</view>
			</view>
		</zx-popup>
	</view>
	
</template>

<script>
	export default {
		name:"zx-group-popup",
		data() {
			return {
				show_popup:false,
				currentTime: 0
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			showPopupButton: {
				type: Boolean,
				default: true
			},
			popupText: {
				type: String,
				default: '参与拼团'
			},
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		created() {
			setInterval(() => {
				this.currentTime = Date.parse(new Date());
			}, 500);
		},
		computed: {
			
		},
		methods: {
			open(){
				this.$emit('open');
			},
			close(){
				this.$emit('close');
			},
			goGroup(){
				let path = '/section';
				let data = {
					'section_id':this.item.resource_id,
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
						this.ext.goWechatPay(3,this.item.resource_id,res.data.pay_appid,this.item.id);
					}
				});
			}
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
	.group-tag {
		background-color: #FFBA14;
		color: #ffffff;
	}
</style>
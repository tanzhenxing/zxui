<template>
	<view>
		<zx-section :title="title" bgColor="#ffffff">
			<template v-slot:right>
				<zx-more :link="getMoreLink"></zx-more>
			</template>
			<!-- 图文滚动 -->
			<view v-if="modelType===1">
				<!-- 只有一条记录不滚动 -->
				<view style="padding: 25rpx;" v-if="items.length === 1" @click="itemClick(items[0])">
					<zx-image width="345rpx" height="200rpx" :src="items[0].image+'?imageMogr2/thumbnail/750x'"></zx-image>
					<view class="item-title">
						<zx-text :text="items[0].title" color="#ffffff" size="24rpx" lineHeight="45rpx"></zx-text>
					</view>
				</view>
				<view v-else style="padding: 25rpx;">
					<zx-scrollitems :duration="50" :items="items" @itemTap="itemClick"></zx-scrollitems>
				</view>
			</view>
			<!-- 图文展示 3列 -->
			<view v-else-if="modelType===2">
				<view style="display: flex;flex-direction: row;justify-content: flex-start;flex-wrap: wrap;padding-top: 10rpx;padding-bottom: 10rpx;">
					<view :style="picBoxStyle" style="margin-left: 20rpx;" v-for="(item, index) in items" :key="index" @click="itemClick(item)">
						<zx-image :width="imageStyle.width" :height="imageStyle.height" :src="item.image+'?imageMogr2/thumbnail/750x'"></zx-image>
						<zx-text :text="item.title" :lines="titleStyle.lines" :align="titleStyle.align" size="32rpx" :color="titleStyle.color" :bold="false" lineHeight="50rpx"></zx-text>
						<zx-text :text="item.introduce" :lines="descStyle.lines" :align="descStyle.align" :color="descStyle.color" size="26rpx" lineHeight="50rpx"></zx-text>
					</view>
				</view>
			</view>
			<!-- 图文展示 2列 -->
			<view v-else-if="modelType===3" style="padding-top: 10rpx;padding-left: 20rpx;">
				<view style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-around;">
					<view class="zx-waterfall-item" v-for="(lists, lists_index) in getLists" :key="lists_index">
						<view class="zx-waterfall-items" v-for="(item, index) in lists" :key="index">
							<view :style="picBoxStyle" @click="itemClick(item)">
								<view>
									<zx-image :width="imageStyle.width" :height="imageStyle.height" :src="item.image+'?imageMogr2/thumbnail/750x'" mode="widthFix"></zx-image>
								</view>
								<view style="text-align: justify;">
									<zx-text :text="item.title" :lines="2" :align="titleStyle.align" size="30rpx" :color="titleStyle.color" lineHeight="50rpx"></zx-text>
								</view>
								<view style="padding-bottom: 10rpx;text-align: justify;">
									<zx-text :text="item.introduce" :lines="2" :align="descStyle.align" :color="descStyle.color" :size="descStyle.size" lineHeight="50rpx"></zx-text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
					<view style="340rpx" v-for="(item, index) in items" :key="index">
						<view :style="picBoxStyle" class="uni-px-2" @click="itemClick(item)">
							<view>
								<zx-image :width="imageStyle.width" :height="imageStyle.height" :src="item.image+'?imageMogr2/thumbnail/750x'"></zx-image>
							</view>
							<view>
								<zx-text :text="item.title" :lines="titleStyle.lines" :align="titleStyle.align" :size="titleStyle.size" :color="titleStyle.color" :bold="titleStyle.bold" lineHeight="50rpx"></zx-text>
							</view>
							<view class="uni-mx-3" style="height: 60rpx;">
								<zx-text :text="item.introduce" :lines="descStyle.lines" :align="descStyle.align" :color="descStyle.color" :size="descStyle.size" lineHeight="50rpx"></zx-text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</zx-section>
	</view>
</template>

<script>
	import { encode } from '../../libs/js/base64.js';
	
	export default {
		name:"zx-pic-items",
		data() {
			return {
				picBoxStyle: {width:'222rpx',marginTop:'10rpx',marginBottom:'10rpx',backgroundColor:'#ECECEC',borderRadius: '10rpx'},
				titleStyle: {bold:true,lines:1,align:'center',color:'#101010',size:'32rpx',lineHeight:'50rpx;'},
				descStyle: {lines:1,align:'center',color:'#9B9B9B',size:'26rpx',lineHeight:'50rpx'},
				imageStyle: {width:'100%',height:'268rpx',backgroundColor:'#ECECEC',borderTopLeftRadius: '10rpx',borderTopRightRadius: '10rpx'}
			};
		},
		computed: {
			getLists(){
				let lists = this.items;
				let result = [[],[]];
				lists.forEach((item,index)=>{
					let sort = (index+2)%2;
					result[sort].push(item);
				});
				return result;
			},
			getMoreLink(){
				let currentUrl = this.$store.getters.domain + '/?' + Date.now() + '#' + '/pages/article/list?id=' + this.categoryId + '&model_type=' + this.modelType;
				return  '/pages/webview/webview?url=' + encode(currentUrl);
			}
		},
		created() {
			if(this.modelType===3){
				this.picBoxStyle = {width:'330rpx',marginTop:'10rpx',marginBottom:'10rpx',backgroundColor:'#f0f0f0',borderRadius: '10rpx'};
				this.titleStyle = {bold:false,lines:1,align:'center',color:'#101010',size:'28rpx',lineHeight:'50rpx;'};
				this.descStyle = {lines:1,align:'center',color:'#9B9B9B',size:'26rpx',lineHeight:'45rpx'};
				this.imageStyle = {width:'330rpx',height:'222rpx',backgroundColor:'#f0f0f0',borderTopLeftRadius: '10rpx',borderTopRightRadius: '10rpx'};
			}
		},
		props: {
			mode: {
				type: String,
				default: 'common'  // 普通 common, 滚动 scroll，人物 person
			},
			title: {
				type: String,
				default: '暂无分类名称'
			},
			moreText: {
				type: String,
				default: '更多'
			},
			moreUrl: {
				type: String,
				default: ''
			},
			categoryId: {
				type: Number,
				default: 0
			},
			modelType: {
				type: Number,
				default: 1
			},
			span:  {
				type: Number,
				default: 8
			},
			items: {
				type: Array,
				default() {
					return [];
				}
			},
		},
		methods: {
			// 新闻动态，点击列表文章跳转
			itemClick : function (item) {
				if(item.link===null || item.link===''){
					uni.navigateTo({
						url: '../article/article?show=1&name=yszx&id='+item.id
					});
				} else {
					uni.showModal({
						title: '外部链接',
						content: '暂时不支持在小程序打开外部链接',
						showCancel: false,
						cancelText: '取消',
						confirmText: '确认',
						success: (res)=> {
							if (res.confirm) {
							
							}
						}
					});
					/* uni.navigateTo({
						url: '/pages/webview/webview?url='+encode(item.link)
					}); */
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.item-title {
	background-color: #101010;width: 335rpx;opacity: 0.4;margin-top: -50rpx;padding-left: 10rpx;
}
.zx-waterfall-item{width:360rpx;}
.zx-waterfall-items{margin-bottom:28rpx;}
</style>
<template>
	<view v-if="show">
		<view class="zx-speaker" :style="{backgroundColor:bgColor}">
			<slot name="icon">
				<zx-icon :name="icon" :color="iconColor" :size="iconSize" :width="iconWidth" :height="iconHeight"></zx-icon>
			</slot>
			<view class="flex1">
				<swiper :vertical="vertical" @change="change" autoplay="true" :circular="true" :interval="interval" :current="current" :style="{ height: height,paddingLeft:space}">
					<swiper-item v-for="(item, index) in list" :key="index">
						<zx-text :text="item[keyName]" :lineHeight="height" :size="size" lines="1" @click="openLink(item)"></zx-text>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 公告内容弹窗-->
		<zx-popup :show="showPopup" mode="center" :closeable="true" @close="close">
			<view :style="{width:'600rpx',paddingBottom:'20rpx'}">
				<view>
					<zx-text text="公告" lineHeight="100rpx" size="36rpx" align="center"></zx-text>
					<zx-line></zx-line>
				</view>
				<view :style="{padding: '30rpx',textAlign: 'justify',fontSize:size}">
					<zx-parse :content="currrentItem[keyName]"></zx-parse>
				</view>
			</view>
		</zx-popup>
	</view>
</template>
<script>
import util from '../../libs/js/util.js';

export default {
	name: 'zx-speaker',
	props: {
		show: {
			type: Boolean,
			default: true
		},
		icon: {
			type: String,
			default: 'volume-fill'
		},
		iconColor: {
			type: String,
			default: '#ff0000'
		},
		iconSize: {
			type: String,
			default: '36rpx'
		},
		iconWidth: {
			type: String,
			default: '50rpx'
		},
		iconHeight: {
			type: String,
			default: '50rpx'
		},
		list: {
			type: Array,
			default: function() {
				return [];
			}
		},
		keyName: {
			type: String,
			default: 'title'
		},
		current: { 
			type: Number, 
			default: 0 
		},
		vertical: { 
			type: Boolean, 
			default: true 
		},
		interval: { 
			type: Number, 
			default: 3000 
		},
		itemClass: {
			type: Array,
			default: function() {
				return ['gui-text', 'gui-primary-text'];
			}
		},
		lineHeight: {
			type: String,
			default: '50rpx' 
		},
		height: { 
			type: String, 
			default: '70rpx' 
		},
		size: {
			type: String,
			default: '28rpx'
		},
		space: {
			type: String,
			default: '20rpx'
		},
		bgColor: {
			type: String,
			default: '#ffffff'
		}
	},
	data() {
		return {
			currrentItem: null,
			showPopup: false,
		};
	},
	methods: {
		change(index) {
			this.$emit('change', index.detail.current);
		},
		openLink(item){
			this.currrentItem = item;
			this.showPopup = true;
			//util.navigate(item.url,item.type);
		},
		close(){
			this.showPopup = false;
		}
	},
	emits: ['change']
};
</script>
<style scoped>
.zx-speaker {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
}
.flex1 {
	flex:1
}
</style>

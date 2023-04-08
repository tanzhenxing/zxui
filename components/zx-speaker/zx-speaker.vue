<template>
	<view class="zx-speaker" :style="{backgroundColor:bgColor}">
		<slot name="icon">
			<zx-icon name="volume-fill"></zx-icon>
		</slot>
		<view class="flex1">
			<swiper :vertical="vertical" @change="change" autoplay="true" :circular="true" :interval="interval" :current="current" :style="{ height: height,paddingLeft:space}">
				<swiper-item v-for="(item, index) in list" :key="index">
					<zx-text :text="item.title" :lineHeight="height" :size="size" lines="1" @click="openLink(item)"></zx-text>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
import util from '../../libs/js/util.js';

export default {
	name: 'zx-speaker',
	props: {
		list: {
			type: Array,
			default: function() {
				return [];
			}
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
		return {};
	},
	methods: {
		change(index) {
			this.$emit('change', index.detail.current);
		},
		openLink(item){
			util.navigate(item.url,item.type);
		}
	},
	emits: ['change']
};
</script>
<style scoped>
.zx-speaker {
	display: flex;flex-direction: row;flex-wrap: nowrap;align-items: center;padding-left: 20rpx;padding-right: 20rpx;
}
.flex1 {
	flex:1
}
</style>

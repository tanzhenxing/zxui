<template>
	<view style="padding: 20rpx;">
		<view v-for="(item,index) in items" :key="index" class="idea">
			<view class="box">
				<view class="title">
					<zx-text :text="item.title" lineHeight="80rpx" color="#ff0000" size="32rpx" lines="1" :bold="false" align="center"></zx-text>
				</view>
				<view class="line"></view>
				<view class="content">
					<zx-text :text="item.text" lineHeight="40rpx" size="32rpx" :bold="false" lines="2"></zx-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,getCurrentInstance} from 'vue'
	const {proxy} = getCurrentInstance();
	const props = defineProps({
		items: {
			type: Array,
			default:()=> {
				return [];
			}
		}
	})
</script>

<style lang="scss" scoped>
	.idea {
		display: flex;flex-direction: column;height: 145rpx;
		
		.box {
			width: '100%';
			border-radius: 100rpx;
			padding: 20rpx;
			border: 2px solid #FF9F9F;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
		}
		.title {
			width: 180rpx;
		}
		.line {
			width: 5rpx;background-color: #FF9F9F;height: 80rpx;
		}
		.content {
			-webkit-flex: 1;flex: 1;padding-left: 15rpx;padding-right: 15rpx;
		}
	}
	
</style>
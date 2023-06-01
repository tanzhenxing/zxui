<template>
	<view style="padding: 20rpx;" v-if="items.length > 0">
		<view v-for="(item, index) in items" :key="index">
			<view style="display: flex;" @click="onClick(item)">
				<zx-image v-if="imgPlace === 'left'" :src="item.image" radius="10rpx" :width="showDesc ? imgWidth : '225rpx'" :height="showDesc ? imgHeight : '150rpx'" backgroundColor="#ececec"></zx-image>
				<view style="flex: 1;">
					<view :style="imgPlace === 'left' ? 'margin-left: 20rpx;' : 'margin-right: 20rpx;'">
						<view class="text-style" :style="showDesc ? { height: '90rpx' } : { height: '100rpx' }">
							<zx-text :text="item.title" :lines="2" :lineHeight="showDesc ? '45rpx' : '50rpx'" :size="titleSize" :color="titleColor"></zx-text>
						</view>
						<view class="text-style" :style="showDesc ? { height: '80rpx' } : { height: '40rpx' }" v-if="showDesc">
							<zx-text :text="item.introduce" :lines="2" lineHeight="40rpx" size="26rpx" :color="textColor"></zx-text>
						</view>
						<view style="display: flex;">
							<view style="flex:1;" v-if="showTime">
								<zx-text
									prefixIcon="clock"
									:text="item.create_time"
									size="26rpx"
									:color="textColor"
									:lineHeight="showDesc ? '40rpx' : '60rpx'"
									lines="1"
								></zx-text>
							</view>
							<view style="flex:1;display: flex;flex-direction: row;align-items: center;" v-if="showRead && item.pageview !== undefined">
								<view style="margin-right: 10rpx;">
									<zx-icon name="eye" size="35rpx"></zx-icon>
								</view>
								<zx-text
									:text="item.pageview"
									size="26rpx"
									:color="textColor"
									:lineHeight="showDesc ? '40rpx' : '60rpx'"
									lines="1"
									:align="showTime ? 'right' : 'left'"
								></zx-text>
							</view>
						</view>
					</view>
				</view>
				<zx-image v-if="imgPlace === 'right'" :src="item.image" radius="10rpx" :width="showDesc ? imgWidth : '225rpx'" :height="showDesc ? imgHeight : '150rpx'"></zx-image>
			</view>
			<view style="margin-bottom: 20rpx;margin-top: 15rpx;"><zx-line></zx-line></view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	showRead: {
		type: Boolean,
		default: true
	},
	showTime: {
		type: Boolean,
		default: false
	},
	showDesc: {
		type: Boolean,
		default: true
	},
	titleSize: {
		type: String,
		default: '30rpx'
	},
	titleColor: {
		type: String,
		default: '#101010'
	},
	textColor: {
		type: String,
		default: '#9B9B9B'
	},
	imgPlace: {
		type: String,
		default: 'left'
	},
	imgWidth: {
		type: String,
		default: '300rpx'
	},
	imgHeight: {
		type: String,
		default: '225rpx'
	},
	items: {
		type: Array,
		default() {
			return [];
		}
	}
});

const onClick = item => {
	proxy.$emit('onClick',item)
};
</script>

<style lang="scss" scoped>
.text-style {
	text-align: justify;
}
</style>

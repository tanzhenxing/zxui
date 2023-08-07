<template>
	<view v-if="show" class="zx-empty" :style="[emptyStyle]">
		<view>
			<image :src="isImage?icon:iconUrl[icon]" mode="widthFix" :style="{ width: width, height: height }"></image>
		</view>
		<view>
			<zx-text :text="text" :color="textColor" :size="textSize"></zx-text>
		</view>
		<view class="zx-slot-wrap" v-if="$slots.default || $slots.$default">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
/**
 * empty 内容为空
 * @description 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景
 * @tutorial https://zxui.org/components/empty
 * @property {Boolean}			show		是否显示组件
 * @property {String}			icon		内置图标名称，或图片路径
 * @property {String}			text		提示文字
 * @property {String}			textColor	文字颜色
 * @property {String | Number}	textSize	文字大小
 * @property {String}			iconColor	图标的颜色
 * @property {String | Number}	iconSize	图标的大小
 * @property {String | Number}	width		图标宽度
 * @property {String | Number}	height		图标高度
 * @property {String | Number}	marginTop	组件距离上一个元素之间的距离
 * @example <zx-empty text="无数据" icon="data"></zx-empty>
 */

import { ref, computed } from 'vue';

const props = defineProps({
	// 是否显示组件
	show: {
		type: Boolean,
		default: true
	},
	// 组件距离上一个元素之间的距离，默认rpx单位
	marginTop: {
		type: String,
		default: '10rpx'
	},
	// 内置图标名称，或图片路径，建议绝对路径
	icon: {
		type: String,
		default: 'data'
	},
	// 提示文字
	text: {
		type: String,
		default: '数据为空'
	},
	// 文字颜色
	textColor: {
		type: String,
		default: '#c0c4cc'
	},
	// 文字大小
	textSize: {
		type: String,
		default: '32rpx'
	},
	// 图标的颜色
	iconColor: {
		type: String,
		default: '#c0c4cc'
	},
	// 图标的大小
	iconSize: {
		type: String,
		default: '180rpx'
	},
	//  图标宽度，单位px
	width: {
		type: [String, Number],
		default: '320rpx'
	},
	// 图标高度，单位px
	height: {
		type: [String, Number],
		default: '320rpx'
	}
});

// 默认图标
const iconUrl = ref({
	address: 'https://files.wufu-app.com/images/empty/address.png',
	auth: 'https://files.wufu-app.com/images/empty/auth.png',
	cart: 'https://files.wufu-app.com/images/empty/cart.png',
	collection: 'https://files.wufu-app.com/images/empty/collection.png',
	comment: 'https://files.wufu-app.com/images/empty/comment.png',
	coupon: 'https://files.wufu-app.com/images/empty/coupon.png',
	data: 'https://files.wufu-app.com/images/empty/data.png',
	message: 'https://files.wufu-app.com/images/empty/message.png',
	message_list: 'https://files.wufu-app.com/images/empty/message_list.png',
	news: 'https://files.wufu-app.com/images/empty/news.png',
	orders: 'https://files.wufu-app.com/images/empty/orders.png',
	page: 'https://files.wufu-app.com/images/empty/page.png',
	record: 'https://files.wufu-app.com/images/empty/record.png',
	search: 'https://files.wufu-app.com/images/empty/search.png',
	wifi: 'https://files.wufu-app.com/images/empty/wifi.png'
});

// 组件样式
const emptyStyle = computed(() => {
	const style = {};
	style.marginTop = props.marginTop;
	return style;
});

// 判断icon是否图片路径
const isImage = computed(() => {
	return props.icon.indexOf('/') >= 0;
});
</script>

<style lang="scss" scoped>
.zx-empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.zx-slot-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
}
</style>

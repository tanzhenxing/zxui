<template>
	<view class="zx-avatar-group">
		<view class="zx-avatar-group__item" v-for="(item, index) in showUrl" :key="index" :style="{ marginLeft: index === 0 ? 0 : -size * gap }">
			<zx-avatar :size="size + 'rpx'" :shape="shape" :mode="mode" :src="testObject(item) ? (keyName && item[keyName]) || item.url : item"></zx-avatar>
			<view class="zx-avatar-group__item__show-more" v-if="showMore && index === showUrl.length - 1 && (urls.length > maxCount || extraValue > 0)" @tap="clickHandler">
				<zx-text
					color="#ffffff"
					:size="size * 0.4 + 'rpx'"
					:text="`+${extraValue || urls.length - showUrl.length}`"
					align="center"
					customStyle="justify-content: center"
				></zx-text>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * AvatarGroup  头像组
 * @description 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。
 * @tutorial https://zxui.org/components/avatar
 * @property {Array}           urls     头像图片组 （默认 [] ）
 * @property {String | Number} maxCount 最多展示的头像数量 （ 默认 5 ）
 * @property {String}          shape    头像形状（ 'circle' (默认) | 'square' ）
 * @property {String}          mode     图片裁剪模式（默认 'scaleToFill' ）
 * @property {Boolean}         showMore 超出maxCount时是否显示查看更多的提示 （默认 true ）
 * @property {String | Number} size        头像大小 （默认 40 ）
 * @property {String}          keyName     指定从数组的对象元素中读取哪个属性作为图片地址
 * @property {String | Number} gap         头像之间的遮挡比例（0.4代表遮挡40%）  （默认 0.5 ）
 * @property {String | Number} extraValue  需额外显示的值
 * @event    {Function}        showMore    头像组更多点击
 * @example  <zx-avatar-group :urls="urls" size="35" gap="0.4" ></zx-avatar-group>
 */
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 头像图片组
	urls: {
		type: Array,
		default: () => {
			return [];
		}
	},
	// 最多展示的头像数量
	maxCount: {
		type: [String, Number],
		default: 5
	},
	// 头像形状
	shape: {
		type: String,
		default: 'circle'
	},
	// 图片裁剪模式
	mode: {
		type: String,
		default: 'scaleToFill'
	},
	// 超出maxCount时是否显示查看更多的提示
	showMore: {
		type: Boolean,
		default: true
	},
	// 头像大小
	size: {
		type: [String, Number],
		default: 80
	},
	// 指定从数组的对象元素中读取哪个属性作为图片地址
	keyName: {
		type: String,
		default: ''
	},
	// 头像之间的遮挡比例
	gap: {
		type: [String, Number],
		validator(value) {
			return value >= 0 && value <= 1;
		},
		default: 0.5
	},
	// 需额外显示的值
	extraValue: {
		type: [Number, String],
		default: ''
	}
});

const showUrl = computed(() => {
	return this.urls.slice(0, this.maxCount);
});

const clickHandler = () => {
	proxy.$emit('showMore');
};
const testObject = (value) => {
	return Object.prototype.toString.call(value) === '[object Object]';
};
</script>

<style lang="scss" scoped>
.zx-avatar-group {
	display: flex;
	flex-direction: row;

	&__item {
		margin-left: -10px;
		position: relative;

		&--no-indent {
			// 如果你想质疑作者不会使用:first-child，说明你太年轻，因为nvue不支持
			margin-left: 0;
		}

		&__show-more {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.3);
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-radius: 100px;
		}
	}
}
</style>

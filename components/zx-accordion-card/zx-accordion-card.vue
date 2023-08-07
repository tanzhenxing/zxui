<template>
	<view class="content">
		<view class="zx-accordion" :style="{ backgroundColor: bgColor }">
			<view hover-class="zx-tap" @tap="toggle">
				<slot name="title">
					<view class="zx-title">
						<view class="zx-flex1">
							<zx-text lines="1" :text="title" :size="titleSize" :color="titleColor"></zx-text>
						</view>
						<view class="zx-icon">
							<zx-icon :name="icon" :color="showStatus ? iconColorActive : iconColor" size="50rpx"></zx-icon>
						</view>
					</view>
				</slot>
			</view>
			<view v-show="showStatus" class="zx-fade-in zx-accordion-card-body">
				<slot name="body">
					<view class="zx-item" v-for="(item, index) in items" :key="index" @click="onClick(item,index)">
						<zx-text :text="item.title" :color="itemColor" :size="itemSize" :lineHeight="itemLineHeight" lines="1"></zx-text>
						<zx-icon name="arrow-right" :color="iconColor" size="28rpx"></zx-icon>
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>
<script setup>
/**
 * 手风琴
 * @description 手风琴的功能
 * @tutorial https://zxui.org/components/accordion-card
 * @property {Boolean}         show             是否显示
 * @property {Boolean}         status           是否展开
 * @property {String}          title            标题名称
 * @property {String | Number} multipleSize     多图时，图片边长 （默认 70 ）
 * @property {String | Number} space            多图时，图片水平和垂直之间的间隔 （默认 6 ）
 * @property {String}          singleMode       单图时，图片缩放裁剪的模式 （默认 'scaleToFill' ）
 * @property {String}          multipleMode     多图时，图片缩放裁剪的模式 （默认 'aspectFill' ）
 * @property {String | Number} maxCount         取消按钮的提示文字 （默认 9 ）
 * @property {Boolean}         previewFullImage 是否可以预览图片 （默认 true ）
 * @property {String | Number} rowCount         每行展示图片数量，如设置，singleSize和multipleSize将会无效	（默认 3 ）
 * @property {Boolean}         showMore         超出maxCount时是否显示查看更多的提示 （默认 true ）
 *
 * @event    {Function}        albumWidth       某些特殊的情况下，需要让文字与相册的宽度相等，这里事件的形式对外发送  （回调参数 width ）
 * @example <zx-accordion-card :items="items"></zx-accordion-card>
 */
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	// 是否为展开状态
	status: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	titleSize: {
		type: String,
		default: '34rpx'
	},
	titleColor: {
		type: String,
		default: '#303133'
	},
	icon: {
		type: String,
		default: 'list'
	},
	iconColor: {
		type: String,
		default: '#435862'
	},
	iconColorActive: {
		type: String,
		default: '#3c9cff'
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	itemSize: {
		type: String,
		default: '28rpx'
	},
	itemColor: {
		type: String,
		default: '#303133'
	},
	itemLineHeight: {
		type: String,
		default: '100rpx'
	},
	items: {
		type: Array,
		default: () => {
			return [];
		}
	}
});

const showStatus = ref(false);
showStatus.value = props.status;

const toggle = () => {
	if (showStatus.value) {
		close();
	} else {
		open();
	}
};
const open = () => {
	showStatus.value = true;
	proxy.$emit('open');
};
const close = () => {
	showStatus.value = false;
	proxy.$emit('close');
};
const onClick = (item) => {
	proxy.$emit('onClick')
};
</script>
<style scoped lang="scss">
.content {
	padding: 20rpx;
}
.zx-accordion {
	padding: 20rpx;
	border-radius: 15rpx;
}
.zx-tap {
	opacity: 0.88;
}
.zx-accordion-card-body {
	padding-bottom: 10rpx;
	padding-top: 10rpx;
}
.zx-title {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
}
.zx-item {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #f2f2f2 !important;
}
.zx-flex1 {
	flex: 1;
}
.zx-icon {
	width: 80rpx;
}
@keyframes zx-fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.zx-fade-in {
	animation: zx-fade-in 200ms ease-in forwards;
}
</style>

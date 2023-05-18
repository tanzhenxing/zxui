<template>
	<view>
		<zx-popup :show="popupShow" mode="center" :closeOnClickOverlay="false" round="20rpx" @close="close">
			<view style="width: 550rpx;padding: 30rpx;text-align: justify;">
				<view>
					<zx-text :text="title" size="40rpx" :bold="true" align="center" lineHeight="70rpx"></zx-text>
					<zx-line margin="20rpx 0rpx"></zx-line>
					<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scroll-Y" :show-scrollbar="true" @scroll="scroll">
						<zx-text
							:text="item.text"
							:size="item.size ? item.size : '28rpx'"
							:bold="item.bold ? true : false"
							:lineHeight="item.lineHeight ? item.lineHeight : '45rpx'"
							v-for="(item, index) in items"
							:key="index"
						></zx-text>
					</scroll-view>
				</view>
				<view style="margin-top: 10rpx;display: flex;">
					<radio justifyContent="flex-start" :checked="agreement" @change="radioChange"></radio>
					<text style="flex: 1;color: #666666;" @click="agree">{{ agreeText }}</text>
				</view>
				<view style="margin-top: 20rpx;margin-bottom: 20rpx;">
					<button :text="buttonText" color="#ff0000" @click="createButtom">{{ buttonText }}</button>
				</view>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	items: {
		type: Array,
		default() {
			return [];
		}
	},
	title: {
		type: String,
		default: '操作须知'
	},
	name: {
		type: String,
		default: 'instructions'
	},
	agreeText: {
		type: String,
		default: '我已阅读'
	},
	buttonText: {
		type: String,
		default: '我已阅读'
	}
});

const agreement = ref(false);
const popupShow = ref(false);
popupShow.value = props.show;

const scrollTop = ref(0);
const old = ref({
	scrollTop: 0
});

const createButtom = () => {
	if (!agreement.value) {
		uni.showToast({
			title: '请勾选我已阅读'
		});
	} else {
		uni.setStorage({
			key: props.name,
			data: false,
			success: () => {
				popupShow.value = false;
			}
		});
	}
};
const radioChange = e => {
	agreement.value = e[0];
};
const agree = () => {
	agreement.value = !agreement.value;
};
const scroll = e => {
	old.value.scrollTop = e.detail.scrollTop;
};
const close = ()=>{
	popupShow.value = false;
}
</script>

<style scoped>
.scroll-Y {
	height: 500rpx;
}
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}
.scroll-view-item {
	height: 500rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}
.scroll-view-item_H {
	display: inline-block;
	width: 100%;
	height: 500rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}
</style>

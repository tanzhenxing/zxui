<template>
	<view>
		<zx-section
			:title="title"
			:bgColor="bgColor"
			padding="10rpx"
			:decorationType="decorationType"
			:decorationColor="decorationColor"
			:decorationWidth="decorationWidth"
			:decorationHeight="decorationHeight"
		>
			<!-- 右侧更多链接 -->
			<template v-slot:right>
				<view class="zx-flex-row zx-flex-align-xy" @click="moreClick">
					<zx-text text="更多" color="#555555" size="28rpx"></zx-text>
					<zx-icon name="arrow-right-double" color="#555555r" size="32rpx"></zx-icon>
				</view>
			</template>

			<!-- 图文滚动 -->
			<view v-if="modelType === 1">
				<!-- 只有一条记录不滚动 -->
				<view style="padding: 25rpx" v-if="items.length === 1" @click="itemClick(items[0])">
					<zx-image width="345rpx" height="200rpx" :src="items[0].image" srcParams="?imageMogr2/thumbnail/750x"></zx-image>
					<view class="item-title">
						<zx-text :text="items[0].title" color="#ffffff" size="24rpx" lineHeight="45rpx"></zx-text>
					</view>
				</view>
				<view v-else style="padding: 25rpx">
					<zx-scrollitems :duration="50" :items="items" @itemTap="scrollClick"></zx-scrollitems>
				</view>
			</view>
			<!-- 图文展示 3列 -->
			<view v-else-if="modelType === 2">
				<view class="item-box">
					<view :style="{ width: '222rpx', padding: '15rpx 10rpx' }" v-for="(item, index) in items" :key="index" @click="itemClick(item)">
						<view style="background-color: #ececec">
							<zx-image width="100%" height="268rpx" :src="item.image" srcParams="?imageMogr2/thumbnail/750x" radius="10rpx 10rpx 0rpx 0rpx"></zx-image>
						</view>
						<view class="item-content">
							<zx-text
								:text="item.title"
								:lines="titleStyle.lines"
								:align="titleStyle.align"
								size="32rpx"
								:color="titleStyle.color"
								:bold="false"
								lineHeight="45rpx"
							></zx-text>
							<zx-text :text="item.introduce" :lines="descStyle.lines" :align="descStyle.align" :color="descStyle.color" size="26rpx" lineHeight="40rpx"></zx-text>
						</view>
					</view>
				</view>
			</view>
			<!-- 图文展示 2列 -->
			<view v-else-if="modelType === 3">
				<view class="item-box">
					<view class="zx-waterfall-item" v-for="(lists, lists_index) in getLists" :key="lists_index">
						<view v-for="(item, index) in lists" :key="index">
							<view :style="{ width: '340rpx', padding: '10rpx' }" @click="itemClick(item)">
								<view style="background-color: #ececec">
									<zx-image
										width="340rpx"
										height="auto"
										:src="item.image"
										srcParams="?imageMogr2/thumbnail/750x"
										mode="widthFix"
										radius="10rpx 10rpx 0rpx 0rpx"
									></zx-image>
								</view>
								<view class="item-content">
									<zx-text :text="item.title" :lines="2" :align="titleStyle.align" size="30rpx" :color="titleStyle.color" lineHeight="45rpx"></zx-text>
									<zx-text
										:text="item.introduce"
										:lines="2"
										:align="descStyle.align"
										:color="descStyle.color"
										:size="descStyle.size"
										lineHeight="40rpx"
									></zx-text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</zx-section>
		<zx-gap></zx-gap>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	bgColor: {
		type: String,
		default: '#ffffff'
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
	span: {
		type: Number,
		default: 8
	},
	items: {
		type: Array,
		default: function () {
			return [];
		}
	},
	decorationType: {
		type: String,
		default: 'line'
	},
	decorationColor: {
		type: String,
		default: '#ff0000'
	},
	decorationWidth: {
		type: String,
		default: '8rpx'
	},
	decorationHeight: {
		type: String,
		default: '35rpx'
	},
	decorationType: {
		type: String,
		default: 'line'
	}
});

const picBoxStyle = ref({ width: '222rpx', marginTop: '10rpx', marginBottom: '10rpx', backgroundColor: '#ECECEC', borderRadius: '10rpx' });
const titleStyle = ref({ bold: true, lines: 1, align: 'center', color: '#101010', size: '32rpx', lineHeight: '50rpx;' });
const descStyle = ref({ lines: 1, align: 'center', color: '#9B9B9B', size: '26rpx', lineHeight: '50rpx' });
const imageStyle = ref({ width: '100%', height: '268rpx', backgroundColor: '#ECECEC', borderTopLeftRadius: '10rpx', borderTopRightRadius: '10rpx' });

onMounted(() => {
	if (props.modelType === 3) {
		picBoxStyle.value = { width: '330rpx', marginTop: '10rpx', marginBottom: '10rpx', backgroundColor: '#f0f0f0', borderRadius: '10rpx' };
		titleStyle.value = { bold: false, lines: 1, align: 'center', color: '#101010', size: '28rpx', lineHeight: '50rpx;' };
		descStyle.value = { lines: 1, align: 'center', color: '#9B9B9B', size: '26rpx', lineHeight: '45rpx' };
		imageStyle.value = { width: '330rpx', height: '222rpx', backgroundColor: '#f0f0f0', borderTopLeftRadius: '10rpx', borderTopRightRadius: '10rpx' };
	}
});

const getLists = computed(() => {
	let lists = props.items;
	let result = [[], []];
	lists.forEach((item, index) => {
		let sort = (index + 2) % 2;
		result[sort].push(item);
	});
	return result;
});

const itemClick = (item) => {
	proxy.$emit('itemClick', item);
};
const scrollClick = (item) => {
	proxy.$emit('scrollClick', item);
};
const moreClick = () => {
	proxy.$emit('moreClick');
};
</script>

<style lang="scss" scoped>
.item-title {
	background-color: #101010;
	width: 335rpx;
	opacity: 0.4;
	margin-top: -50rpx;
	padding-left: 10rpx;
}
.zx-waterfall-item {
	width: 360rpx;
}

.item-box {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: space-between;
}
.item-content {
	text-align: justify;
	background-color: #ececec;
	border-radius: 0rpx 0rpx 10rpx 10rpx;
	padding-left: 15rpx;
	padding-right: 15rpx;
	padding-bottom: 15rpx;
}
</style>

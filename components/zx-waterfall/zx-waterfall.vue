<template>
	<view class="zx-waterfall" :style="{ paddingLeft: leftGap, paddingRight: rightGap, background: backgroundColor, borderRadius: radius }">
		<view class="list" id="zx-waterfall__left" :style="{ marginRight: columnGap }">
			<view v-for="(item, index) in leftList" :key="index">
				<slot name="left" :entity="item" :index="index" :isList="columnCount == 1"></slot>
			</view>
		</view>
		<view v-if="columnCount > 1" class="list" id="zx-waterfall__right">
			<view v-for="(item, index) in rightList" :key="index">
				<slot name="right" :entity="item" :index="index" :isList="columnCount == 1"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * 列表中图片可以使用懒加载或者其他方式
 * 优先计算出图片高度,以达到最佳效果
 */
import { ref, getCurrentInstance, computed, onMounted } from 'vue';

const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();

const props = defineProps({
	//列表数据，不建议一次性加载过多数据
	listData: {
		type: Array,
		default: () => {
			return [];
		}
	},
	//每页数据条数(固定条数),当总数据长度小于等于该数时表示第一页数据，刷新重置
	pageSize: {
		type: Number,
		default: 10
	},
	//数据分组类型：1-简单左右分组，按顺序排列，伪瀑布流 2-计算左右容器高度进行分组
	type: {
		type: Number,
		default: 1
	},
	//瀑布流列数，目前支持最大值为2
	columnCount: {
		type: Number,
		default: 2
	},
	//列与列的间隙
	columnGap: {
		type: String,
		default: '10rpx'
	},
	//左侧和列表的间隙
	leftGap: {
		type: String,
		default: '0'
	},
	//右侧和列表的间隙
	rightGap: {
		type: String,
		default: '0'
	},
	//列表背景色，可使用渐变色
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	//列表外层容器圆角值
	radius: {
		type: String,
		default: '0'
	}
});

const leftListConst = ref([]);
const leftList = ref([]);
const rightList = ref([]);
const init = ref(true);

onMounted(() => {
	init.value = false;
	columnChange();
});

const columnChange = (val) => {
	if (props.columnCount < 2) {
		leftList.value = [...props.listData];
	} else {
		if (val && val == 2) {
			leftList.value = [...leftListConst.value];
		}
		initData();
	}
};
const initData = () => {
	if (props.type == 1) {
		getSubGroup();
	} else {
		getArrayByHeight();
	}
};
const getDiffList = () => {
	let diffList = [];
	let total = props.listData.length;
	if (total <= props.pageSize) {
		leftListConst.value = [];
		leftList.value = [];
		rightList.value = [];
	}
	let sum = leftListConst.value.length + rightList.value.length;
	let diff = total - sum;
	if (diff > 0) {
		diffList = [...props.listData].filter((item, index) => {
			return index >= sum;
		});
	}
	return diffList;
};
const getSubGroup = () => {
	//type=1时执行简单数据分组
	if (!props.listData && props.listData.length === 0) return;
	let leftList = [];
	let rightList = [];
	let data = getDiffList();
	data.forEach((item, index) => {
		if (index % 2 === 0) {
			leftList.push(item);
		} else {
			rightList.push(item);
		}
	});
	leftList.value = leftList.value.concat(leftList);
	leftListConst.value = leftListConst.value.concat(leftList);
	rightList.value = rightList.value.concat(rightList);
};
const getArrayByHeight = async () => {
	if (!props.listData && props.listData.length === 0) return;
	let data = getDiffList();
	for (let item of data) {
		await render(item);
	}
};
const sleep = (millisecond) => {
	let now = new Date();
	let exitTime = now.getTime() + millisecond;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime) return;
	}
};
const render = async (item) => {
	sleep(50);
	let obj = await getContainerHeight();
	return await new Promise((resolve, reject) => {
		if (obj && typeof obj.leftHeight === 'number') {
			if (obj.leftHeight <= obj.rightHeight) {
				leftList.value.push(item);
				leftListConst.value.push(item);
			} else {
				rightList.value.push(item);
			}
			resolve(true);
		} else {
			reject(false);
		}
	});
};
const getContainerHeight = async () => {
	return await new Promise((resolve, reject) => {
		const query = uni.createSelectorQuery().in(instance);
		let nodes = query.selectAll('#zx-waterfall__left, #zx-waterfall__right');
		nodes.boundingClientRect().exec((res) => {
			if (res && res[0]) {
				const rects = res[0];
				const leftHeight = rects[0].height;
				const rightHeight = rects[1].height;
				resolve({
					leftHeight: leftHeight,
					rightHeight: rightHeight
				});
			} else {
				reject(res);
			}
		});
	});
};
</script>

<style lang="scss" scoped>
.zx-waterfall {
	width: 100%;
	display: inline-flex;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	box-sizing: border-box;
	align-items: flex-start;

	.list {
		flex: 1;
	}
}
</style>

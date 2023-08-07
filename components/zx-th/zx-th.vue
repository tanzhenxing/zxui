<template>
	<!-- #ifdef H5 -->
	<th :rowspan="rowspan" :colspan="colspan" class="zx-table-th" :class="{ 'table--border': border }" :style="{ width: customWidth + 'px', 'text-align': align }">
		<view class="zx-table-th-row">
			<view class="zx-table-th-content" :style="{ 'justify-content': contentAlign }" @click="sort">
				<slot></slot>
				<view v-if="sortable" class="arrow-box">
					<text class="arrow up" :class="{ active: ascending }" @click.stop="ascendingFn"></text>
					<text class="arrow down" :class="{ active: descending }" @click.stop="descendingFn"></text>
				</view>
			</view>
			<zx-filter-dropdown
				v-if="filterType || filterData.length"
				:filterDefaultValue="filterDefaultValue"
				:filterData="filterData"
				:filterType="filterType"
				@change="ondropdown"
			></zx-filter-dropdown>
		</view>
	</th>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view class="zx-table-th" :class="{ 'table--border': border }" :style="{ width: customWidth + 'px', 'text-align': align }"><slot></slot></view>
	<!-- #endif -->
</template>

<script setup>
/**
 * Th 表头
 * @description 表格内的表头单元格组件
 * @property {Number | String} 	width 	单元格宽度（支持纯数字、携带单位px或rpx）
 * @property {Boolean} 	sortable 					是否启用排序
 * @property {Number} 	align = [left|center|right]	单元格对齐方式
 * @value left   	单元格文字左侧对齐
 * @value center	单元格文字居中
 * @value right		单元格文字右侧对齐
 * @property {Array}	filterData 筛选数据
 * @property {String}	filterType	[search|select] 筛选类型
 * @value search	关键字搜素
 * @value select	条件选择
 * @event {Function} sort-change 排序触发事件
 */
import { ref, getCurrentInstance, onMounted, computed } from 'vue';
const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();
const props = defineProps({
	width: {
		type: [String, Number],
		default: ''
	},
	align: {
		type: String,
		default: 'left'
	},
	rowspan: {
		type: [Number, String],
		default: 1
	},
	colspan: {
		type: [Number, String],
		default: 1
	},
	sortable: {
		type: Boolean,
		default: false
	},
	filterType: {
		type: String,
		default: ''
	},
	filterData: {
		type: Array,
		default: () => {
			return [];
		}
	},
	filterDefaultValue: {
		type: [Array, String],
		default: () => {
			return '';
		}
	}
});

const border = ref(false);
const ascending = ref(false);
const descending = ref(false);
const root = ref(null);
const rootTr = ref(null);
onMounted(() => {
	root.value = getTable('uniTable');
	rootTr.value = getTable('uniTr');
	rootTr.value.minWidthUpdate(customWidth.value ? customWidth.value : 140);
	border.value = root.value.border;
	root.value.thChildren.push(instance);
});

// 根据props中的width属性 自动匹配当前th的宽度(px)
const customWidth = computed(() => {
	if (typeof props.width === 'number') {
		return props.width;
	} else if (typeof props.width === 'string') {
		let regexHaveUnitPx = new RegExp(/^[1-9][0-9]*px$/g);
		let regexHaveUnitRpx = new RegExp(/^[1-9][0-9]*rpx$/g);
		let regexHaveNotUnit = new RegExp(/^[1-9][0-9]*$/g);
		if (props.width.match(regexHaveUnitPx) !== null) {
			// 携带了 px
			return props.width.replace('px', '');
		} else if (props.width.match(regexHaveUnitRpx) !== null) {
			// 携带了 rpx
			let numberRpx = Number(props.width.replace('rpx', ''));
			let widthCoe = uni.getSystemInfoSync().screenWidth / 750;
			return Math.round(numberRpx * widthCoe);
		} else if (props.width.match(regexHaveNotUnit) !== null) {
			// 未携带 rpx或px 的纯数字 String
			return props.width;
		} else {
			// 不符合格式
			return '';
		}
	} else {
		return '';
	}
});
const contentAlign = computed(() => {
	let align = 'left';
	switch (props.align) {
		case 'left':
			align = 'flex-start';
			break;
		case 'center':
			align = 'center';
			break;
		case 'right':
			align = 'flex-end';
			break;
	}
	return align;
});

const sort = () => {
	if (!props.sortable){
		return;
	}
	clearOther();
	if (!ascending.value && !descending.value) {
		ascending.value = true;
		proxy.$emit('sort-change', { order: 'ascending' });
		return;
	}
	if (ascending.value && !descending.value) {
		ascending.value = false;
		descending.value = true;
		proxy.$emit('sort-change', { order: 'descending' });
		return;
	}

	if (!ascending.value && descending.value) {
		ascending.value = false;
		descending.value = false;
		proxy.$emit('sort-change', { order: null });
	}
};
const ascendingFn = () => {
	.clearOther();
	ascending.value = !ascending.value;
	descending.value = false;
	proxy.$emit('sort-change', { order: ascending.value ? 'ascending' : null });
};
const descendingFn = () => {
	clearOther();
	descending.value = !descending.value;
	ascending.value = false;
	proxy.$emit('sort-change', { order: descending.value ? 'descending' : null });
};
const clearOther = () => {
	root.value.thChildren.map((item) => {
		if (item !== instance) {
			item.ascending = false;
			item.descending = false;
		}
		return item;
	});
};
const ondropdown = (e) => {
	proxy.$emit('filter-change', e);
};
/**
 * 获取父元素实例
 */
const getTable = (name) => {
	let parent = proxy.$parent;
	let parentName = parent.$options.name;
	while (parentName !== name) {
		parent = parent.$parent;
		if (!parent) return false;
		parentName = parent.$options.name;
	}
	return parent;
};
</script>

<style lang="scss" scoped>
$border-color: #ebeef5;
$zx-primary: #007aff !default;

.zx-table-th {
	padding: 12px 10px;
	/* #ifndef APP-NVUE */
	display: table-cell;
	box-sizing: border-box;
	/* #endif */
	font-size: 14px;
	font-weight: bold;
	color: #909399;
	border-bottom: 1px $border-color solid;
}

.zx-table-th-row {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
}

.table--border {
	border-right: 1px $border-color solid;
}
.zx-table-th-content {
	display: flex;
	align-items: center;
	flex: 1;
}
.arrow-box {
}
.arrow {
	display: block;
	position: relative;
	width: 10px;
	height: 8px;
	// border: 1px red solid;
	left: 5px;
	overflow: hidden;
	cursor: pointer;
}
.down {
	top: 3px;
	::after {
		content: '';
		width: 8px;
		height: 8px;
		position: absolute;
		left: 2px;
		top: -5px;
		transform: rotate(45deg);
		background-color: #ccc;
	}
	&.active {
		::after {
			background-color: $zx-primary;
		}
	}
}
.up {
	::after {
		content: '';
		width: 8px;
		height: 8px;
		position: absolute;
		left: 2px;
		top: 5px;
		transform: rotate(45deg);
		background-color: #ccc;
	}
	&.active {
		::after {
			background-color: $zx-primary;
		}
	}
}
</style>

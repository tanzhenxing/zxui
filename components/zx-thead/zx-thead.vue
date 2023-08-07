<template>
	<!-- #ifdef H5 -->
	<thead class="zx-table-thead">
		<tr class="zx-table-tr">
			<th :rowspan="rowspan" colspan="1" class="checkbox" :class="{ 'tr-table--border': border }">
				<zx-table-checkbox :indeterminate="indeterminate" :checked="checked" @checkboxSelected="checkboxSelected"></zx-table-checkbox>
			</th>
		</tr>
		<slot></slot>
	</thead>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view class="zx-table-thead"><slot></slot></view>
	<!-- #endif -->
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();
const props = defineProps({});

const border = ref(false);
const selection = ref(false);
const rowspan = ref(1);
const indeterminate = ref(false);
const checked = ref(false);
const root = ref({});

onMounted(() => {
	root.value = getTable();
	// #ifdef H5
	root.value.theadChildren = instance;
	// #endif
	border.value = root.value.border;
	selection.value = root.value.type;
});

const init = (self) => {
	rowspan.value++;
};
const checkboxSelected = (e) => {
	indeterminate.value = false;
	const backIndexData = root.value.backIndexData;
	const data = root.value.trChildren.filter((v) => !v.disabled && v.keyValue);
	if (backIndexData.length === data.length) {
		checked.value = false;
		root.value.clearSelection();
	} else {
		checked.value = true;
		root.value.selectionAll();
	}
};
/**
 * 获取父元素实例
 */
const getTable = (name = 'zx-table') => {
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

.zx-table-thead {
	display: table-header-group;
}

.zx-table-tr {
	/* #ifndef APP-NVUE */
	display: table-row;
	transition: all 0.3s;
	box-sizing: border-box;
	/* #endif */
	border: 1px red solid;
	background-color: #fafafa;
}

.checkbox {
	padding: 0 8px;
	width: 26px;
	padding-left: 12px;
	/* #ifndef APP-NVUE */
	display: table-cell;
	vertical-align: middle;
	/* #endif */
	color: #333;
	font-weight: 500;
	border-bottom: 1px $border-color solid;
	font-size: 14px;
	// text-align: center;
}

.tr-table--border {
	border-right: 1px $border-color solid;
}

/* #ifndef APP-NVUE */
.zx-table-tr {
	::v-deep .zx-table-th {
		&.table--border:last-child {
			// border-right: none;
		}
	}

	::v-deep .zx-table-td {
		&.table--border:last-child {
			// border-right: none;
		}
	}
}

/* #endif */
</style>

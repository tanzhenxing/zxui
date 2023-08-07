<template>
	<view v-if="show" class="zx-table"></view>
</template>

<script setup>
/**
 * Table 表格
 * @description 表格组件一般用于展示大量结构化数据的场景 本组件标签类似HTML的table表格，由table、tr、th、td四个组件组成
 * @tutorial https://zxui.org/components/table.html
 */
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	show: {
		type: Boolean,
		default: true
	}
});
</script>

<style lang="scss" scoped>
.zx-table {
	font-size: 0;
	box-sizing: border-box;
}
</style>

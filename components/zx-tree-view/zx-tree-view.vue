<template>
	<view class="zx-tree__view">
		<zx-tree-node v-for="(item, index) in treeData" :key="index" :node="item" :collapsible="collapsible" :triangle="triangle" @click="handleClick"></zx-tree-node>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	treeData: {
		type: Array,
		default() {
			return [];
		}
	},
	//是否可折叠
	collapsible: {
		type: Boolean,
		default: true
	},
	//是否显示三角箭头
	triangle: {
		type: Boolean,
		default: true
	}
});

const handleClick = (e) => {
	proxy.$emit('click', e);
};
</script>

<style scoped>
.zx-tree__view {
	width: 100%;
	position: relative;
}
</style>

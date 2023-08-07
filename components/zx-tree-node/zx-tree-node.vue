<template>
	<view class="zx-tree__node">
		<view class="zx-tree__label" @tap="handleClick">
			<view class="zx-treeview__triangle" :class="{ 'zx-triangle__90deg': !collapsed }" v-if="node.children && node.children.length > 0 && triangle"></view>
			<template v-if="node.src">
				<image class="zx-tree__icon" mode="widthFix" :src="node.src" :class="{ 'zx-treeview__icon-hidden': !collapsed }"></image>
			</template>
			<template v-if="node.activeSrc">
				<image class="zx-tree__icon" mode="widthFix" :src="node.activeSrc" :class="{ 'zx-treeview__icon-hidden': collapsed }"></image>
			</template>
			<text>{{ node.text }}</text>
		</view>
		<template v-if="node.children && node.children.length > 0">
			<view class="zx-tree__children" v-show="!collapsed">
				<zx-tree-node v-for="(item, index) in node.children" :key="index" :node="item" :collapsible="collapsible" :triangle="triangle" @click="nodeClick"></zx-tree-node>
			</view>
		</template>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	node: {
		type: Object,
		default: () => {
			return {};
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

const collapsed = ref(true);

onMounted(() => {
	if (props.node.collapsed === false) {
		collapsed.value = false;
	}
});

const handleClick = (e) => {
	if (props.collapsible && props.node.children && props.node.children.length > 0) {
		collapsed.value = !collapsed.value;
	}
	proxy.$emit('click', props.node);
};
const nodeClick = (e) => {
	proxy.$emit('click', e);
};
</script>

<style scoped>
.zx-tree__node {
	box-sizing: border-box;
}

.zx-tree__label {
	display: inline-flex;
	align-items: center;
	padding: var(--zx-treeview-label-padding, 10px 15px);
	position: relative;
	border: var(--zx-treeview-label-border, 0);
	margin: var(--zx-treeview-label-margin, 0);
	border-radius: var(--zx-treeview-label-radius, 0);
	background-color: var(--zx-treeview-label-bgcolor, transparent);
	color: var(--zx-treeview-label-color, #000);
	font-size: var(--zx-treeview-label-size, 15px);
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-font-smoothing: antialiased;
}

.zx-tree__icon {
	width: var(--zx-treeview-icon-width, 20px);
	height: var(--zx-treeview-icon-height, 20px);
	margin-right: var(--zx-treeview-icon-mr, 8px);
	flex-shrink: 0;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-font-smoothing: antialiased;
	/* transition: all 0.3s; */
	display: block;
}

.zx-tree__children {
	padding-left: var(--zx-treeview-children-pl, 30px);
	position: relative;
}

.zx-treeview__triangle {
	width: 0;
	height: 0;
	border-top: var(--zx-treeview-triangle-bt, 6px) solid transparent;
	border-bottom: var(--zx-treeview-triangle-bt, 6px) solid transparent;
	border-left: var(--zx-treeview-triangle-bl, 8px) solid #000000;
	margin-right: var(--zx-treeview-triangle-mr, 10px);
	transition: transform 0.3s;
	flex-shrink: 0;
}

.zx-triangle__90deg {
	transform: rotate(90deg) translate3d(0, 0, 0);
}

.zx-treeview__icon-hidden {
	opacity: 0;
	visibility: hidden;
	display: none;
}
</style>

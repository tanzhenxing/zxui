<template>
	<view>
		<view v-for="(tree, index) in treesIN" :key="index">
			<view
				class="zx-flex zx-row zx-nowrap zx-align-items-center zx-tree"
				:data-havsons="tree.children"
				:data-treeindexs="indexesIn"
				:data-index="index"
				:data-id="tree.id"
				:data-treelevel="level"
				:data-cancheck="allCanCheck || !tree.children"
				:style="{ paddingLeft: indent * level + 'rpx' }"
				@tap.stop="taped"
			>
				<view class="zx-tree-icons zx-color-gray" :data-id="tree.id" @tap.stop="fold" v-if="type == 'text' && isIcon">
					<text class="zx-tree-icons-text zx-icons" v-if="tree.children">&#xe62d;</text>
				</view>
				<view class="zx-tree-icons" v-if="type == 'radio' && (allCanCheck || !tree.children)">
					<text :class="checkedClass" class="zx-tree-icons-text zx-icons zx-fade-in" v-if="tree.id == checkedId">&#xe7f8;</text>
					<text class="zx-tree-icons-text zx-icons" v-else>&#xe762;</text>
				</view>
				<view class="zx-tree-icons" v-if="type == 'checkbox' && (allCanCheck || !tree.children)">
					<text :class="checkedClass" class="zx-tree-icons-text zx-icons zx-fade-in" v-if="isChecked(tree.id)">&#xe685;</text>
					<text class="zx-tree-icons-text zx-icons icon-checkbox" v-else>&#xe762;</text>
				</view>
				<text class="zx-block zx-tree-title zx-flex1">{{ tree.label }}</text>
			</view>
			<view>
				<zx-tree
					v-if="arrayIndexOf(notids, tree.id) == -1"
					:trees="tree.children"
					:indent="indent"
					:level="level + 1"
					:allCanCheck="allCanCheck"
					:isIcon="isIcon"
					:checkedId="checkedId"
					:checkedIds="checkedIds"
					:type="type"
					:indexes="[indexesIn, index]"
					:checkedClass="checkedClass"
					@taped="tapbase"
				></zx-tree>
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	trees: {
		type: Array,
		default: () => {
			return [];
		}
	},
	indent: {
		type: Number,
		default: 28
	},
	level: {
		type: Number,
		default: 0
	},
	type: {
		type: String,
		default: 'text'
	},
	isIcon: {
		type: Boolean,
		default: true
	},
	indexes: {
		type: Array,
		default: () => {
			return ['', 0];
		}
	},
	checkedId: {
		type: [String, Number],
		default: '-1'
	},
	checkedIds: {
		type: Array,
		default: () => {
			return [];
		}
	},
	allCanCheck: {
		type: Boolean,
		default: true
	},
	isFold: {
		type: Boolean,
		default: true
	},
	checkedClass: {
		type: Array,
		default: () => {
			return ['zx-primary-color'];
		}
	}
});

const treesIN = ref([]);
const indexesIn = ref([]);
const notids = ref([]);

onMounted(() => {
	treesIN.value = props.trees;
	let indexes = [];
	if (props.indexes[0] != '') {
		indexes = props.indexes[0].split(',');
	}
	indexes.push(props.indexes[1]);
	indexesIn.value = indexes.join(',');
});

const fold = (e) => {
	let id = e.currentTarget.dataset.id;
	if (props.isFold) {
		let res = arrayIndexOf(notids.value, id);
		if (res == -1) {
			notids.value.push(id);
		} else {
			notids.value.splice(res, 1);
		}
	}
	e.stopPropagation();
	return;
};
const taped = (e) => {
	let treeindexs = e.currentTarget.dataset.treeindexs;
	treeindexs = treeindexs.split(',');
	let index = e.currentTarget.dataset.index;
	treeindexs.push(index);
	treeindexs.shift();
	if (props.type == 'text') {
		tapbase(treeindexs);
	} else {
		let cancheck = e.currentTarget.dataset.cancheck;
		if (cancheck) {
			tapbase(treeindexs);
		}
	}
	e.stopPropagation();
};
const tapbase = (e) => {
	proxy.$emit('taped', e);
};
const setTrees = (trees) => {
	treesIN.value = trees;
};
const isChecked = (checkedId) => {
	for (let i = 0; i < props.checkedIds.length; i++) {
		if (props.checkedIds[i] == checkedId) {
			return true;
		}
	}
	return false;
};
const arrayIndexOf = (arr, needFind) => {
	let index = -1;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == needFind) {
			index = i;
			return i;
		}
	}
	return index;
};
</script>
<style scoped></style>

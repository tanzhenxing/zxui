<template>
	<view class="zx-org__tree">
		<zx-org-node v-for="(item,index) in treeData" :key="index" :node="item" :collapsible="collapsible"
			@click="handleClick">
		</zx-org-node>
	</view>
</template>

<script>
	//如果未开启easycom模式，请自行引入zx-org-node组件
	export default {
		name: "zx-org-tree",
		emits: ['click'],
		props: {
			treeData: {
				type: Array,
				default () {
					return []
				}
			},
			//是否可折叠（收起展开）
			collapsible: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClick: function(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.zx-org__tree {
		width: 100%;
	}
</style>

<template>
	<view class="zx-breadcrumb">
		<view class="zx-breadcrumb-item" v-for="(item,index) in items" :key="index">
			<zx-text :text="item.name" :size="size" :lineHeight="lineHeight" :color="(index+1)===items.length?activeColor:color"></zx-text>
			<view v-if="items.length>(index+1)" :style="{paddingLeft:space,paddingRight:space}">
				<text :style="[separatorStyle,{fontSize:size,lineHeight:lineHeight}]">{{separator}}</text>
			</view>
		</view>
	</view>
</template>
<script>
/**
 * Breadcrumb 面包屑导航
 * @description 显示当前页面的路径，快速返回之前的任意页面
 * @tutorial
 * @property {String} separator 分隔符，默认为斜杠'/'
 * @property {String} separatorClass 图标分隔符 class
 */
export default {
	name: 'zx-breadcrumb',
	data() {
		return {};
	},
	props: {
		show: {
			type: Boolean,
			default: true
		},
		items: {
			type: Array,
			default: ()=>{
				return []
			}
		},
		space: {
			type: String,
			default: '10rpx'
		},
		color: {
			type: String,
			default: '#3a3a3a'
		},
		activeColor: {
			type: String,
			default: '#9a9a9a'
		},
		size: {
			type: String,
			default: '32rpx'
		},
		lineHeight: {
			type: String,
			default: '40rpx'
		},
		separator: {
			type: String,
			default: '/'
		},
		separatorStyle: {
			type: Object,
			default: ()=>{
				return {}
			}
		}
	}
};
</script>
<style lang="scss">
@import '../../theme.scss';

.zx-breadcrumb {
	display: flex;
	flex-direction: row;
}

.zx-breadcrumb-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	white-space: nowrap;
}
</style>

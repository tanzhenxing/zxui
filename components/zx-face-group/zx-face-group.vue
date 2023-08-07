<template>
	<view class="zx-face-group zx-img-in" :style="{ height: size + borderWidth * 2 + 'rpx' }">
		<template v-for="(item, index) in items" :key="index">
			<image class="zx-face-items" mode="aspectFill" :src="item" :style="[getStyle, { zIndex: startIndex + index, left: space * index + 'rpx' }]" @tap.stop="onClick(index)"></image>
		</template>
		<view v-if="isAddBtn" class="zx-face-items flex-center" :style="getStyle" @tap.stop="addBtnClick">
			<slot>
				<zx-icon :name="addBtnIcon" :size="size * 0.5 + 'rpx'"></zx-icon>
			</slot>
		</view>
	</view>
</template>
<script setup>
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 头像列表
	items: {
		type: Array,
		default: () => {
			return [];
		}
	},
	// 头像大小
	size: {
		type: Number,
		default: 80
	},
	// 间距
	space: {
		type: Number,
		default: 50
	},
	// 边框宽度
	borderWidth: {
		type: Number,
		default: 4
	},
	// 边框颜色
	borderColor: {
		type: String,
		default: '#F5F5F5'
	},
	// 	头像起始 z-index 层级
	startIndex: {
		type: Number,
		default: 100
	},
	// 	是否展示功能按钮
	isAddBtn: {
		type: Boolean,
		default: false
	},
	addBtnColor: {
		type: String,
		default: '#ececec'
	},
	addBtnIcon: {
		type: String,
		default: 'plus'
	}
});

const getStyle = computed(() => {
	let style = {
		borderWidth: props.borderWidth + 'rpx',
		borderStyle: 'solid',
		borderColor: props.borderColor,
		width: props.size + 'rpx',
		height: props.size + 'rpx'
	};
	if (props.isAddBtn) {
		style.backgroundColor = props.addBtnColor;
		style.left = props.space * Number(props.items.length) + 'rpx';
		style.zIndex = props.startIndex + props.items.length + 1;
	}
	return style;
});
const onClick = (index)=>{
	proxy.$emit('onClick',index);
}
const addBtnClick = () => {
	proxy.$emit('addBtnClick');
};
</script>
<style lang="scss" scoped>
.zx-face-group {
	position: relative;
}
.zx-face-items {
	position: absolute;
	overflow: hidden;
	border-radius: 100px;
	font-size: 0;
}
.zx-img-in {
	font-size: 0;
}
.flex-center {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>

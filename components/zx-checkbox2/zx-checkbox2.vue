<template>
	<view
		class="zx-checkbox__input"
		:class="{ 'zx-checkbox__disabled': disabled }"
		:style="{
			backgroundColor: getBackgroundStyle(val, isCheckMark),
			border: getBorderStyle(val, isCheckMark),
			zoom: nvue ? 1 : scaleRatio,
			transform: `scale(${nvue ? scaleRatio : 1})`
		}"
		@tap.stop="checkboxChange"
	>
		<view v-if="val" class="zx-check__mark" :style="{ borderBottomColor: checkMarkColor, borderRightColor: checkMarkColor }"></view>
		<checkbox class="zx-checkbox__hidden" style="position: absolute; opacity: 0" hidden :color="color" :disabled="disabled" :value="value" :checked="val"></checkbox>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed, watch } from 'vue';
const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();
const props = defineProps({
	value: {
		type: String,
		default: ''
	},
	checked: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	//checkbox选中背景颜色
	color: {
		type: String,
		default: '#5677fc'
	},
	//checkbox未选中时边框颜色
	borderColor: {
		type: String,
		default: '#ccc'
	},
	//是否只展示对号，无边框背景
	isCheckMark: {
		type: Boolean,
		default: false
	},
	//对号颜色
	checkMarkColor: {
		type: String,
		default: '#fff'
	},
	scaleRatio: {
		type: [Number, String],
		default: 1
	}
});

const nvue = ref(false);
const val = ref(false);
const group = ref(null)
const label = ref(null);

onMounted(() => {
	// #ifdef APP-NVUE
	nvue.value = true;
	// #endif

	val.value = props.checked;
	group.value = getParent();
	if (group.value) {
		group.value.childrens.push(instance);
		if (group.value && group.value.length > 0) {
			val.value = group.value.includes(props.value);
		}
		// #ifdef VUE3
		if (group.value.modelValue && group.value.modelValue.length > 0) {
			val.value = group.value.modelValue.includes(props.value);
		}
		// #endif
	}
	label.value = getParent('zx-label');
	if (label.value) {
		label.value.childrens.push(instance);
	}
});

watch(val, (newVal) => {
	if (group.value) {
		group.value.changeValue(val.value, instance);
	}
});

const getBackgroundStyle = (val, isCheckMark) => {
	let color = val ? props.color : '#fff';
	if (isCheckMark) {
		color = 'transparent';
	}
	return color;
};
const getBorderStyle = (val, isCheckMark) => {
	let color = val ? props.color : props.borderColor;
	if (isCheckMark) {
		color = 'transparent';
	}
	return `1px solid ${color}`;
};
const checkboxChange = (e) => {
	if (props.disabled) return;
	val.value = !val.value;
	proxy.$emit('change', {
		checked: val.value,
		value: props.value
	});
};
const getParent = (name = 'zx-checkbox-group') => {
	let parent = proxy.$parent;
	let parentName = parent.$options.name;
	while (parentName !== name) {
		parent = parent.$parent;
		if (!parent) return false;
		parentName = parent.$options.name;
	}
	return parent;
};
const labelClick = () => {
	checkboxChange();
};
</script>

<style lang="scss" scoped>
.zx-checkbox__input {
	font-size: 0;
	color: rgba(0, 0, 0, 0);
	width: 40rpx;
	height: 40rpx;
	border-width: 1px;
	border-style: solid;
	/* #ifdef APP-NVUE */
	border-radius: 40rpx;
	/* #endif */
	/* #ifndef APP-NVUE */
	display: inline-flex;
	box-sizing: border-box;
	border-radius: 50%;
	vertical-align: top;
	flex-shrink: 0;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
}

.zx-check__mark {
	width: 20rpx;
	height: 40rpx;
	border-bottom-style: solid;
	border-bottom-width: 3px;
	border-bottom-color: #ffffff;
	border-right-style: solid;
	border-right-width: 3px;
	border-right-color: #ffffff;
	transform: rotate(45deg) scale(0.5);
	transform-origin: 54% 48%;
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	/* #endif */
}

.zx-checkbox__hidden {
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	border: 0 none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	/* #endif */
	/* #ifdef APP-NVUE */
	width: 100wx;
	height: 100wx;
	border-width: 0;
	/* #endif */
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	z-index: 2;
}

.zx-checkbox__disabled {
	opacity: 0.6;
}
</style>

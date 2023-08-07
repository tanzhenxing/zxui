<template>
	<view class="zx-table-checkbox" @click="selected">
		<view v-if="!indeterminate" class="checkbox__inner" :class="{ 'is-checked': isChecked, 'is-disable': isDisabled }">
			<view class="checkbox__inner-icon"></view>
		</view>
		<view v-else class="checkbox__inner checkbox--indeterminate">
			<view class="checkbox__inner-icon"></view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	indeterminate: {
		type: Boolean,
		default: false
	},
	checked: {
		type: [Boolean, String],
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	index: {
		type: Number,
		default: -1
	},
	cellData: {
		type: Object,
		default() {
			return {};
		}
	}
});

const isChecked = ref(false);
const isDisabled = ref(false);
const isIndeterminate = ref(false);

onMounted(() => {
	if (typeof props.checked === 'boolean') {
		isChecked.value = props.checked;
	}
	isDisabled.value = props.disabled;
});

const selected = () => {
	if (isDisabled.value) {
		return;
	}
	isIndeterminate.value = false;
	isChecked.value = !isChecked.value;
	proxy.$emit('checkboxSelected', {
		checked: isChecked.value,
		data: props.cellData
	});
};
</script>

<style lang="scss" scoped>
$zx-primary: #007aff !default;
$border-color: #dcdfe6;
$disable: 0.4;

.zx-table-checkbox {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	margin: 5px 0;
	cursor: pointer;

	// 多选样式
	.checkbox__inner {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		box-sizing: border-box;
		/* #endif */
		position: relative;
		width: 16px;
		height: 16px;
		border: 1px solid $border-color;
		border-radius: 2px;
		background-color: #fff;
		z-index: 1;

		.checkbox__inner-icon {
			position: absolute;
			/* #ifdef APP-NVUE */
			top: 2px;
			/* #endif */
			/* #ifndef APP-NVUE */
			top: 2px;
			/* #endif */
			left: 5px;
			height: 7px;
			width: 3px;
			border: 1px solid #fff;
			border-left: 0;
			border-top: 0;
			opacity: 0;
			transform-origin: center;
			transform: rotate(45deg);
			box-sizing: content-box;
		}

		&.checkbox--indeterminate {
			border-color: $zx-primary;
			background-color: $zx-primary;

			.checkbox__inner-icon {
				position: absolute;
				opacity: 1;
				transform: rotate(0deg);
				height: 2px;
				top: 0;
				bottom: 0;
				margin: auto;
				left: 0px;
				right: 0px;
				bottom: 0;
				width: auto;
				border: none;
				border-radius: 2px;
				transform: scale(0.5);
				background-color: #fff;
			}
		}
		&:hover {
			border-color: $zx-primary;
		}
		// 禁用
		&.is-disable {
			/* #ifdef H5 */
			cursor: not-allowed;
			/* #endif */
			background-color: #f2f6fc;
			border-color: $border-color;
		}

		// 选中
		&.is-checked {
			border-color: $zx-primary;
			background-color: $zx-primary;

			.checkbox__inner-icon {
				opacity: 1;
				transform: rotate(45deg);
			}

			// 选中禁用
			&.is-disable {
				opacity: $disable;
			}
		}
	}
}
</style>

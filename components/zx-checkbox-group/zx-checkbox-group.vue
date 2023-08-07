<template>
	<view class="zx-checkbox-group" :class="bemClass">
		<slot></slot>
	</view>
</template>

<script setup>
/**
 * checkboxGroup 复选框组
 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @tutorial https://zxui.org/components/checkbox
 * @property {String}			name			标识符
 * @property {Array}			value			绑定的值
 * @property {String}			shape			形状，circle-圆形，square-方形 （默认 'square' ）
 * @property {Boolean}			disabled		是否禁用全部checkbox （默认 false ）
 * @property {String}			activeColor		选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值 （默认 '#2979ff' ）
 * @property {String}			inactiveColor	未选中的颜色 （默认 '#c8c9cc' ）
 * @property {String | Number}	size			整个组件的尺寸 单位px （默认 18 ）
 * @property {String}			placement		布局方式，row-横向，column-纵向 （默认 'row' ）
 * @property {String | Number}	labelSize		label的字体大小，px单位  （默认 14 ）
 * @property {String}			labelColor		label的字体颜色 （默认 '#303133' ）
 * @property {Boolean}			labelDisabled	是否禁止点击文本操作 (默认 false )
 * @property {String}			iconColor		图标颜色 （默认 '#ffffff' ）
 * @property {String | Number}	iconSize		图标的大小，单位px （默认 12 ）
 * @property {String}			iconPlacement	勾选图标的对齐方式，left-左边，right-右边  （默认 'left' ）
 * @property {Boolean}			borderBottom	placement为row时，是否显示下边框 （默认 false ）
 * @event {Function}	change	任一个checkbox状态发生变化时触发，回调为一个对象
 * @event {Function}	input	修改通过v-model绑定的值时触发，回调为一个对象
 * @example <zx-checkbox-group></zx-checkbox-group>
 */
import { ref, getCurrentInstance, computed, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// 标识符
	name: {
		type: String,
		default: ''
	},
	// 绑定的值
	value: {
		type: Array,
		default: () => {
			return [];
		}
	},
	// 形状，circle-圆形，square-方形
	shape: {
		type: String,
		default: 'square'
	},
	// 是否禁用全部checkbox
	disabled: {
		type: Boolean,
		default: false
	},

	// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
	activeColor: {
		type: String,
		default: '#2979ff'
	},
	// 未选中的颜色
	inactiveColor: {
		type: String,
		default: '#c8c9cc'
	},

	// 整个组件的尺寸，默认px
	size: {
		type: [String, Number],
		default: '36rpx'
	},
	// 布局方式，row-横向，column-纵向
	placement: {
		type: String,
		default: 'row'
	},
	// label的字体大小，px单位
	labelSize: {
		type: [String, Number],
		default: '28rpx'
	},
	// label的字体颜色
	labelColor: {
		type: [String],
		default: '#303133'
	},
	// 是否禁止点击文本操作
	labelDisabled: {
		type: Boolean,
		default: 'false'
	},
	// 图标颜色
	iconColor: {
		type: String,
		default: '#ffffff'
	},
	// 图标的大小，单位px
	iconSize: {
		type: [String, Number],
		default: '24rpx'
	},
	// 勾选图标的对齐方式，left-左边，right-右边
	iconPlacement: {
		type: String,
		default: 'left'
	},
	// 竖向配列时，是否显示下划线
	borderBottom: {
		type: Boolean,
		default: false
	}
});

// 这里computed的变量，都是子组件zx-checkbox需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
// 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(zx-checkbox-group)
// 拉取父组件新的变化后的参数
const parentData = computed(() => {
	return [props.value, props.disabled, props.inactiveColor, props.activeColor, props.size, props.labelDisabled, props.shape, props.iconSize, props.borderBottom, props.placement];
});

onMounted(() => {});

// 将其他的checkbox设置为未选中的状态
const unCheckedOther = (childInstance) => {
	const values = [];
	proxy.children.map((child) => {
		// 将被选中的checkbox，放到数组中返回
		if (child.isChecked) {
			values.push(child.name);
		}
	});
	// 发出事件
	proxy.$emit('change', values);
	// 修改通过v-model绑定的值
	proxy.$emit('input', values);
};
</script>

<style lang="scss" scoped>
.zx-checkbox-group {
	&--row {
		display: flex;
	}

	&--column {
		display: flex;
		flex-direction: column;
	}
}
</style>

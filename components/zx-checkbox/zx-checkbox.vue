<template>
	<view
		class="zx-checkbox"
		:style="[checkboxStyle]"
		@tap.stop="wrapperClickHandler"
		:class="[`zx-checkbox-label--${parentData.iconPlacement}`, parentData.borderBottom && parentData.placement === 'column' && 'zx-border-bottom']"
	>
		<view class="zx-checkbox__icon-wrap" @tap.stop="iconClickHandler" :class="iconClasses" :style="[iconWrapStyle]">
			<slot name="icon">
				<zx-icon class="zx-checkbox__icon-wrap__icon" name="checkbox-mark" :size="elIconSize" :color="elIconColor"></zx-icon>
			</slot>
		</view>
		<text
			@tap.stop="labelClickHandler"
			:style="{
				color: elDisabled ? elInactiveColor : elLabelColor,
				fontSize: elLabelSize,
				lineHeight: elLabelSize
			}"
		>
			{{ label }}
		</text>
	</view>
</template>

<script setup>
/**
 * checkbox  复选框
 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @tutorial https://uviewui.com/components/checkbox.html
 * @property {String | Number | Boolean}	name			checkbox组件的标示符
 * @property {String}						shape			形状，square为方形，circle为圆型
 * @property {String | Number}				size			整体的大小
 * @property {Boolean}						checked			是否默认选中
 * @property {String | Boolean}				disabled		是否禁用
 * @property {String}						activeColor		选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
 * @property {String}						inactiveColor	未选中的颜色
 * @property {String | Number}				iconSize		图标的大小，单位px
 * @property {String}						iconColor		图标颜色
 * @property {String | Number}				label			label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
 * @property {String}						labelColor 		label的颜色
 * @property {String | Number}				labelSize		label的字体大小，px单位
 * @property {String | Boolean}				labelDisabled	是否禁止点击提示语选中复选框
 * @property {Object}						customStyle		定义需要用到的外部样式
 *
 * @event {Function}	change	任一个checkbox状态发生变化时触发，回调为一个对象
 * @example <zx-checkbox v-model="checked" :disabled="false">天涯</zx-checkbox>
 */
import { ref, getCurrentInstance, onMounted, computed } from 'vue';
const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();

const props = defineProps({
	// checkbox的名称
	name: {
		type: [String, Number, Boolean],
		default: ''
	},
	// 形状，square为方形，circle为圆型
	shape: {
		type: String,
		default: 'square'
	},
	// 整体的大小
	size: {
		type: [String, Number],
		default: '36rpx'
	},
	// 是否默认选中
	checked: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: [String, Boolean],
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
	// 图标的大小，单位px
	iconSize: {
		type: [String, Number],
		default: '24rpx'
	},
	// 图标颜色
	iconColor: {
		type: String,
		default: '#ffffff'
	},
	// label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
	label: {
		type: [String, Number],
		default: ''
	},
	// label的字体大小，px单位
	labelSize: {
		type: [String, Number],
		default: '28rpx'
	},
	// label的颜色
	labelColor: {
		type: String,
		default: '#303133'
	},
	// 是否禁止点击提示语选中复选框
	labelDisabled: {
		type: [String, Boolean],
		default: false
	}
});

const isChecked = ref(false);
// 父组件的默认值，因为头条小程序不支持在computed中使用parent.shape的形式
// 故只能使用如此方法
const parentData = ref({
	iconSize: 12,
	labelDisabled: null,
	disabled: null,
	shape: 'square',
	activeColor: null,
	inactiveColor: null,
	size: 18,
	value: null,
	iconColor: null,
	placement: 'row',
	borderBottom: false,
	iconPlacement: 'left'
});

// 是否禁用，如果父组件zx-raios-group禁用的话，将会忽略子组件的配置
const elDisabled = computed(() => {
	return props.disabled !== '' ? props.disabled : parentData.value.disabled !== null ? parentData.value.disabled : false;
});
// 是否禁用label点击
const elLabelDisabled = computed(() => {
	return props.labelDisabled !== '' ? props.labelDisabled : parentData.value.labelDisabled !== null ? parentData.value.labelDisabled : false;
});
// 组件尺寸，对应size的值，默认值为21px
const elSize = computed(() => {
	return props.size ? props.size : parentData.value.size ? parentData.value.size : 21;
});
// 组件的勾选图标的尺寸，默认12px
const elIconSize = computed(() => {
	return props.iconSize ? props.iconSize : parentData.value.iconSize ? parentData.value.iconSize : 12;
});
// 组件选中激活时的颜色
const elActiveColor = computed(() => {
	return props.activeColor ? props.activeColor : parentData.value.activeColor ? parentData.value.activeColor : '#2979ff';
});
// 组件选未中激活时的颜色
const elInactiveColor = computed(() => {
	return props.inactiveColor ? props.inactiveColor : parentData.value.inactiveColor ? parentData.value.inactiveColor : '#c8c9cc';
});
// label的颜色
const elLabelColor = computed(() => {
	return props.labelColor ? props.labelColor : parentData.value.labelColor ? parentData.value.labelColor : '#606266';
});
// 组件的形状
const elShape = computed(() => {
	return props.shape ? props.shape : parentData.value.shape ? parentData.value.shape : 'circle';
});
// label大小
const elLabelSize = computed(() => {
	return props.labelSize ? props.labelSize : parentData.value.labelSize ? parentData.value.labelSize : '15';
});
const elIconColor = computed(() => {
	const iconColor = props.iconColor ? props.iconColor : parentData.value.iconColor ? parentData.value.iconColor : '#ffffff';
	// 图标的颜色
	if (elDisabled.value) {
		// disabled状态下，已勾选的checkbox图标改为elInactiveColor
		return isChecked.value ? elInactiveColor.value : 'transparent';
	} else {
		return isChecked.value ? iconColor : 'transparent';
	}
});
const iconClasses = computed(() => {
	let classes = [];
	// 组件的形状
	classes.push('zx-checkbox__icon-wrap--' + elShape.value);
	if (elDisabled.value) {
		classes.push('zx-checkbox__icon-wrap--disabled');
	}
	if (isChecked.value && elDisabled.value) {
		classes.push('zx-checkbox__icon-wrap--disabled--checked');
	}
	// 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
	// #ifdef MP-ALIPAY || MP-TOUTIAO
	classes = classes.join(' ');
	// #endif
	return classes;
});
const iconWrapStyle = computed(() => {
	// checkbox的整体样式
	const style = {};
	style.backgroundColor = isChecked.value && !elDisabled.value ? elActiveColor.value : '#ffffff';
	style.borderColor = isChecked.value && !elDisabled.value ? elActiveColor.value : elInactiveColor.value;
	style.width = elSize.value;
	style.height = elSize.value;
	// 如果是图标在右边的话，移除它的右边距
	if (parentData.value.iconPlacement === 'right') {
		style.marginRight = 0;
	}
	return style;
});
const checkboxStyle = computed(() => {
	const style = {};
	if (parentData.value.borderBottom && parentData.value.placement === 'row') {
		console.log('检测到您将borderBottom设置为true，需要同时将zx-checkbox-group的placement设置为column才有效')
	}
	// 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
	if (parentData.value.borderBottom && parentData.value.placement === 'column') {
		style.paddingBottom = '8px';
	}
	return proxy.$util.deepMerge(style, props.customStyle);
});

onMounted(() => {
	init();
});

const init = () => {
	// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
	updateParentData();
	if (!proxy.parent) {
		console.log('zx-checkbox必须搭配zx-checkbox-group组件使用')
	}
	// 设置初始化时，是否默认选中的状态，父组件zx-checkbox-group的value可能是array，所以额外判断
	if (props.checked) {
		isChecked.value = true;
	} else if (testArray(parentData.value.value)) {
		// 查找数组是是否存在name元素值
		isChecked.value = parentData.value.value.some((item) => {
			return item === props.name;
		});
	}
};
const updateParentData = () => {
	//instance.getParentData('zx-checkbox-group');
};
// 横向两端排列时，点击组件即可触发选中事件
const wrapperClickHandler = (e) => {
	parentData.value.iconPlacement === 'right' && iconClickHandler(e);
};
// 点击图标
const iconClickHandler = (e) => {
	proxy.preventEvent(e);
	// 如果整体被禁用，不允许被点击
	if (!elDisabled.value) {
		setRadioCheckedStatus();
	}
};
// 点击label
const labelClickHandler = (e) => {
	proxy.preventEvent(e);
	// 如果按钮整体被禁用或者label被禁用，则不允许点击文字修改状态
	if (!elLabelDisabled.value && !elDisabled.value) {
		setRadioCheckedStatus();
	}
};
const emitEvent = () => {
	proxy.$emit('change', isChecked.value);
	// 尝试调用zx-form的验证方法，进行一定延迟，否则微信小程序更新可能会不及时
	proxy.$nextTick(() => {
		formValidate(instance, 'change');
	});
};
// 改变组件选中状态
// 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有zx-checkbox实例
// 将本组件外的其他zx-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
const setRadioCheckedStatus = () => {
	// 将本组件标记为与原来相反的状态
	isChecked.value = !isChecked.value;
	emitEvent();
	typeof proxy.parent.unCheckedOther === 'function' && proxy.parent.unCheckedOther(instance);
};
/**
 * @description 在zx-form的子组件内容发生变化，或者失去焦点时，尝试通知zx-form执行校验方法
 * @param {*} instance
 * @param {*} event
 */
const formValidate=(instance, event)=> {
	const formItem = $parent.call(instance, 'zx-form-item')
	const form = $parent.call(instance, 'zx-form')
	if (formItem && form) {
		form.validateField(formItem.prop, () => {}, event)
	}
}
/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
  $parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
const $parent=(name = undefined)=> {
	let parent = proxy.$parent
	// 通过while历遍，这里主要是为了H5需要多层解析的问题
	while (parent) {
		// 父组件
		if (parent.$options && parent.$options.name !== name) {
			// 如果组件的name不相等，继续上一级寻找
			parent = parent.$parent
		} else {
			return parent
		}
	}
	return false
}
const testArray=(value)=> {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'
}
</script>

<style lang="scss" scoped>
$zx-checkbox-icon-wrap-margin-right: 6px !default;
$zx-checkbox-icon-wrap-font-size: 6px !default;
$zx-checkbox-icon-wrap-border-width: 1px !default;
$zx-checkbox-icon-wrap-border-color: #c8c9cc !default;
$zx-checkbox-icon-wrap-icon-line-height: 0 !default;
$zx-checkbox-icon-wrap-circle-border-radius: 100% !default;
$zx-checkbox-icon-wrap-square-border-radius: 3px !default;
$zx-checkbox-icon-wrap-checked-color: #fff !default;
$zx-checkbox-icon-wrap-checked-background-color: red !default;
$zx-checkbox-icon-wrap-checked-border-color: #2979ff !default;
$zx-checkbox-icon-wrap-disabled-background-color: #ebedf0 !default;
$zx-checkbox-icon-wrap-disabled-checked-color: #c8c9cc !default;
$zx-checkbox-label-margin-left: 5px !default;
$zx-checkbox-label-margin-right: 12px !default;
$zx-checkbox-label-color: #606266 !default;
$zx-checkbox-label-font-size: 15px !default;
$zx-checkbox-label-disabled-color: #c8c9cc !default;

.zx-checkbox {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: row;
	/* #endif */
	overflow: hidden;
	flex-direction: row;
	align-items: center;

	&-label--left {
		flex-direction: row;
	}

	&-label--right {
		flex-direction: row-reverse;
		justify-content: space-between;
	}

	&__icon-wrap {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		// nvue下，border-color过渡有问题
		transition-property: border-color, background-color, color;
		transition-duration: 0.2s;
		/* #endif */
		color: #606266;
		display: flex;
		align-items: center;
		justify-content: center;
		color: transparent;
		text-align: center;
		margin-right: $zx-checkbox-icon-wrap-margin-right;

		font-size: $zx-checkbox-icon-wrap-font-size;
		border-width: $zx-checkbox-icon-wrap-border-width;
		border-color: $zx-checkbox-icon-wrap-border-color;
		border-style: solid;

		/* #ifdef MP-TOUTIAO */
		// 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
		&__icon {
			line-height: $zx-checkbox-icon-wrap-icon-line-height;
		}

		/* #endif */

		&--circle {
			border-radius: $zx-checkbox-icon-wrap-circle-border-radius;
		}

		&--square {
			border-radius: $zx-checkbox-icon-wrap-square-border-radius;
		}

		&--checked {
			color: $zx-checkbox-icon-wrap-checked-color;
			background-color: $zx-checkbox-icon-wrap-checked-background-color;
			border-color: $zx-checkbox-icon-wrap-checked-border-color;
		}

		&--disabled {
			background-color: $zx-checkbox-icon-wrap-disabled-background-color !important;
		}

		&--disabled--checked {
			color: $zx-checkbox-icon-wrap-disabled-checked-color !important;
		}
	}

	&__label {
		/* #ifndef APP-NVUE */
		word-wrap: break-word;
		/* #endif */
		margin-left: $zx-checkbox-label-margin-left;
		margin-right: $zx-checkbox-label-margin-right;
		color: $zx-checkbox-label-color;
		font-size: $zx-checkbox-label-font-size;

		&--disabled {
			color: $zx-checkbox-label-disabled-color;
		}
	}
}
</style>

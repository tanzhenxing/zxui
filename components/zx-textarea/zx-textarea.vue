<template>
	<view class="zx-textarea" :class="textareaClass" :style="[textareaStyle]">
		<textarea
			class="field"
			:value="innerValue"
			:style="{ height: height }"
			:placeholder="placeholder"
			:placeholder-class="placeholderClass"
			:disabled="disabled"
			:focus="focus"
			:autoHeight="autoHeight"
			:fixed="fixed"
			:cursorSpacing="cursorSpacing"
			:cursor="cursor"
			:autoFocus="autoFocus"
			:confirmType="confirmType"
			:confirmHold="confirmHold"
			:showConfirmBar="showConfirmBar"
			:selectionStart="selectionStart"
			:selectionEnd="selectionEnd"
			:adjustPosition="adjustPosition"
			:disableDefaultPadding="disableDefaultPadding"
			:holdKeyboard="holdKeyboard"
			:autoBlur="autoBlur"
			:maxlength="maxlength"
			:ignoreCompositionEvent="ignoreCompositionEvent"
			:inputmode="inputmode"
			@focus="onFocus"
			@blur="onBlur"
			@linechange="onLinechange"
			@input="onInput"
			@confirm="onConfirm"
			@keyboardheightchange="onKeyboardheightchange"
		></textarea>
		<text v-if="count" class="count" :style="{ 'background-color': disabled ? 'transparent' : '#ffffff' }">{{ innerValue.length }}/{{ maxlength }}</text>
	</view>
</template>

<script setup>
/**
 * Textarea 文本域
 * @description 文本域此组件满足了可能出现的表单信息补充，编辑等实际逻辑的功能，内置了字数校验等
 * @tutorial https://zxui.org/components/textarea
 *
 * @property {String | Number} 		value					输入框的内容
 * @property {String | Number}		placeholder				输入框为空时占位符
 * @property {String}			    placeholderClass		指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ （ 默认 'input-placeholder' ）
 * @property {String | Object}	    placeholderStyle		指定placeholder的样式，字符串/对象形式，如"color: red;"
 * @property {String | Number}		height					输入框高度（默认 70 ）
 * @property {String}				confirmType				设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效（默认 'done' ）
 * @property {Boolean}				disabled				是否禁用（默认 false ）
 * @property {Boolean}				count					是否显示统计字数（默认 false ）
 * @property {Boolean}				focus					是否自动获取焦点，nvue不支持，H5取决于浏览器的实现（默认 false ）
 * @property {Boolean | Function}	autoHeight				是否自动增加高度（默认 false ）
 * @property {Boolean}				fixed					如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true（默认 false ）
 * @property {Number}				cursorSpacing			指定光标与键盘的距离（默认 0 ）
 * @property {String | Number}		cursor					指定focus时的光标位置
 * @property {Boolean}				showConfirmBar			是否显示键盘上方带有”完成“按钮那一栏，（默认 true ）
 * @property {Number}				selectionStart			光标起始位置，自动聚焦时有效，需与selection-end搭配使用，（默认 -1 ）
 * @property {Number | Number}		selectionEnd			光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认 -1 ）
 * @property {Boolean}				adjustPosition			键盘弹起时，是否自动上推页面（默认 true ）
 * @property {Boolean | Number}		disableDefaultPadding	是否去掉 iOS 下的默认内边距，只微信小程序有效（默认 false ）
 * @property {Boolean}				holdKeyboard			focus时，点击页面的时候不收起键盘，只微信小程序有效（默认 false ）
 * @property {String | Number}		maxlength				最大输入长度，设置为 -1 的时候不限制最大长度（默认 140 ）
 * @property {String}				border					边框类型，surround-四周边框，none-无边框，bottom-底部边框（默认 'surround' ）
 * @property {Boolean}				ignoreCompositionEvent	是否忽略组件内对文本合成系统事件的处理
 *
 * @event {Function(e)} focus					输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
 * @event {Function(e)} blur					输入框失去焦点时触发，event.detail = {value, cursor}
 * @event {Function(e)} linechange				输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}
 * @event {Function(e)} input					当键盘输入时，触发 input 事件
 * @event {Function(e)} confirm					点击完成时， 触发 confirm 事件
 * @event {Function(e)} keyboardheightchange	键盘高度发生变化的时候触发此事件
 * @example <zx-textarea v-model="value" placeholder="请输入内容" ></zx-textarea>
 */

import { ref, getCurrentInstance, computed, watch } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 输入框的内容
	value: {
		type: [String, Number],
		default: ''
	},
	// 输入框为空时占位符
	placeholder: {
		type: [String, Number],
		default: ''
	},
	// 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
	placeholderClass: {
		type: String,
		default: 'textarea-placeholder'
	},
	// 指定placeholder的样式
	placeholderStyle: {
		type: [String, Object],
		default: function () {
			return { color: '#c0c4cc' };
		}
	},
	// 输入框高度
	height: {
		type: [String, Number],
		default: '140rpx'
	},
	// 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
	confirmType: {
		type: String,
		default: 'done'
	},
	// 点击键盘右下角按钮时是否保持键盘不收起
	confirmHold: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 是否显示统计字数
	count: {
		type: Boolean,
		default: false
	},
	// 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
	focus: {
		type: Boolean,
		default: false
	},
	// 自动聚焦，拉起键盘
	autoFocus: {
		type: Boolean,
		default: false
	},
	// 是否自动增加高度
	autoHeight: {
		type: Boolean,
		default: false
	},
	// 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
	fixed: {
		type: Boolean,
		default: false
	},
	// 指定光标与键盘的距离
	cursorSpacing: {
		type: Number,
		default: 0
	},
	// 指定focus时的光标位置
	cursor: {
		type: [String, Number],
		default: ''
	},
	// 是否显示键盘上方带有”完成“按钮那一栏，
	showConfirmBar: {
		type: Boolean,
		default: true
	},
	// 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
	selectionStart: {
		type: Number,
		default: -1
	},
	// 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
	selectionEnd: {
		type: Number,
		default: -1
	},
	// 键盘弹起时，是否自动上推页面
	adjustPosition: {
		type: Boolean,
		default: true
	},
	// 是否去掉 iOS 下的默认内边距，只微信小程序有效
	disableDefaultPadding: {
		type: Boolean,
		default: false
	},
	// focus时，点击页面的时候不收起键盘，只微信小程序有效
	holdKeyboard: {
		type: Boolean,
		default: false
	},
	// 键盘收起时，是否自动失去焦点
	autoBlur: {
		type: Boolean,
		default: false
	},
	// 最大输入长度，设置为 -1 的时候不限制最大长度
	maxlength: {
		type: [String, Number],
		default: 140
	},
	// 边框类型，surround-四周边框，bottom-底部边框
	border: {
		type: String,
		default: 'surround'
	},
	// 是否忽略组件内对文本合成系统事件的处理
	ignoreCompositionEvent: {
		type: Boolean,
		default: true
	},
	// 用户在编辑元素或其内容时可能输入的数据类型的提示 , none,text,decimal,numeric,tel,search,emailurl
	inputmode: {
		type: String,
		default: 'text'
	}
});

// 输入框的值
const innerValue = ref('');
// 是否处于获得焦点状态
const focused = ref(false);
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref(true);
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref(false);
const innerFormatter = ref(null);

// 组件的类名
const textareaClass = computed(() => {
	let classStr = '';
	switch (props.border) {
		case 'surround':
			classStr = 'zx-border radius';
			break;
		case 'bottom':
			classStr = 'zx-border-bottom no-radius';
			break;
	}
	return classStr;
});
// 组件的样式
const textareaStyle = computed(() => {
	const style = {};
	// #ifdef APP-NVUE
	// 由于textarea在安卓nvue上的差异性，需要额外再调整其内边距
	if (uni.getSystemInfoSync().platform.toLowerCase() === 'android') {
		style.paddingTop = '6px';
		style.paddingLeft = '9px';
		style.paddingBottom = '3px';
		style.paddingRight = '6px';
	}
	// #endif
	return style;
});

// 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
const setFormatter = (e) => {
	innerFormatter.value = e;
};
const onFocus = (e) => {
	proxy.$emit('focus', e);
};
const onBlur = (e) => {
	proxy.$emit('blur', e);
};
const onLinechange = (e) => {
	proxy.$emit('linechange', e);
};
const onInput = (e) => {
	let { value = '' } = e.detail || {};
	innerValue.value = value;
	proxy.$nextTick(() => {
		valueChange();
	});
};
// 内容发生变化，进行处理
const valueChange = () => {
	const value = innerValue.value;
	proxy.$nextTick(() => {
		proxy.$emit('input', value);
		// 标识value值的变化是由内部引起的
		changeFromInner.value = true;
		proxy.$emit('change', value);
	});
};
const onConfirm = (e) => {
	proxy.$emit('confirm', e);
};
const onKeyboardheightchange = (e) => {
	proxy.$emit('keyboardheightchange', e);
};

watch(
	innerValue,
	(newVal, oldVal) => {
		innerValue.value = newVal;
		/* #ifdef H5 */
		// 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
		if (firstChange.value === false && changeFromInner.value === false) {
			valueChange();
		}
		/* #endif */
		firstChange.value = false;
		// 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
		changeFromInner.value = false;
	},
	{ immediate: true }
);
</script>

<style lang="scss" scoped>
.zx-border {
	border-width: 0.5px !important;
	border-color: #dadbde !important;
	border-style: solid;
}
.zx-border-bottom {
	border-bottom-width: 0.5px !important;
	border-color: #dadbde !important;
	border-bottom-style: solid;
}
.zx-textarea {
	border-radius: 4px;
	background-color: #fff;
	position: relative;
	display: flex;
	flex: 1;
	padding: 9px;

	.radius {
		border-radius: 4px;
	}

	.no-radius {
		border-radius: 0;
	}

	.disabled {
		background-color: #f5f7fa;
	}

	.field {
		flex: 1;
		font-size: 15px;
		color: #606266;
		width: 100%;
	}

	.count {
		position: absolute;
		right: 5px;
		bottom: 2px;
		font-size: 12px;
		color: #909193;
		background-color: #ffffff;
		padding: 1px 4px;
	}
}
</style>

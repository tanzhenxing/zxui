<template>
	<view class="zx-code-input">
		<view class="zx-code-input__item" :style="[itemStyle(index)]" v-for="(item, index) in codeLength" :key="index">
			<view class="zx-code-input__item__dot" v-if="dot && codeArray.length > index"></view>
			<text
				v-else
				:style="{
					fontSize: fontSize,
					fontWeight: bold ? 'bold' : 'normal',
					color: color
				}"
			>
				{{ codeArray[index] }}
			</text>
			<view class="zx-code-input__item__line" v-if="mode === 'line'" :style="[lineStyle]"></view>
			<!-- #ifndef APP-PLUS -->
			<view v-if="isFocus && codeArray.length === index" :style="{ backgroundColor: color }" class="zx-code-input__item__cursor"></view>
			<!-- #endif -->
		</view>
		<input
			:disabled="disabledKeyboard"
			type="number"
			:focus="focus"
			:value="inputValue"
			:maxlength="maxlength"
			:adjustPosition="adjustPosition"
			class="zx-code-input__input"
			@input="inputHandler"
			:style="{
				height: size
			}"
			@focus="isFocus = true"
			@blur="isFocus = false"
		/>
	</view>
</template>

<script setup>
/**
 * CodeInput 验证码输入
 * @description 该组件一般用于验证用户短信验证码的场景，也可以结合uView的键盘组件使用
 * @tutorial https://zxui.org/components/codeInput.html
 * @property {String | Number}	maxlength			最大输入长度 （默认 6 ）
 * @property {Boolean}			dot					是否用圆点填充 （默认 false ）
 * @property {String}			mode				显示模式，box-盒子模式，line-底部横线模式 （默认 'box' ）
 * @property {Boolean}			hairline			是否细边框 （默认 false ）
 * @property {String | Number}	space				字符间的距离 （默认 10 ）
 * @property {String | Number}	value				预置值
 * @property {Boolean}			focus				是否自动获取焦点 （默认 false ）
 * @property {Boolean}			bold				字体和输入横线是否加粗 （默认 false ）
 * @property {String}			color				字体颜色 （默认 '#606266' ）
 * @property {String | Number}	fontSize			字体大小，单位px （默认 18 ）
 * @property {String | Number}	size				输入框的大小，宽等于高 （默认 35 ）
 * @property {Boolean}			disabledKeyboard	是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true （默认 false ）
 * @property {String}			borderColor			边框和线条颜色 （默认 '#c9cacc' ）
 * @property {Boolean}			disabledDot			是否禁止输入"."符号 （默认 true ）
 *
 * @event {Function}	change	输入内容发生改变时触发，具体见上方说明			value：当前输入的值
 * @event {Function}	finish	输入字符个数达maxlength值时触发，见上方说明	value：当前输入的值
 * @example	<zx-code-input v-model="value4" :focus="true"></zx-code-input>
 */
import { ref, getCurrentInstance, onMounted, watch, computed } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	// 键盘弹起时，是否自动上推页面
	adjustPosition: {
		type: Boolean,
		default: true
	},
	// 最大输入长度
	maxlength: {
		type: [String, Number],
		default: 6
	},
	// 是否用圆点填充
	dot: {
		type: Boolean,
		default: false
	},
	// 显示模式，box-盒子模式，line-底部横线模式
	mode: {
		type: String,
		default: 'box'
	},
	// 是否细边框
	hairline: {
		type: Boolean,
		default: false
	},
	// 字符间的距离
	space: {
		type: String,
		default: '20rpx'
	},
	// 预置值
	value: {
		type: String,
		default: ''
	},
	// 是否自动获取焦点
	focus: {
		type: Boolean,
		default: false
	},
	// 字体是否加粗
	bold: {
		type: Boolean,
		default: false
	},
	// 字体颜色
	color: {
		type: String,
		default: '#606266'
	},
	// 字体大小
	fontSize: {
		type: String,
		default: '36rpx'
	},
	// 输入框的大小，宽等于高
	size: {
		type: String,
		default: '70rpx'
	},
	// 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
	disabledKeyboard: {
		type: Boolean,
		default: false
	},
	// 边框和线条颜色
	borderColor: {
		type: String,
		default: '#c9cacc'
	},
	// 是否禁止输入"."符号
	disabledDot: {
		type: Boolean,
		default: true
	}
});

const inputValue = ref('');
const isFocus = ref(false);
onMounted(() => {
	isFocus.value = props.focus;
});

// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
const codeLength = computed(() => {
	return new Array(Number(props.maxlength));
});
// 循环item的样式
const itemStyle = computed(() => {
	return (index) => {
		const style = {
			width: props.size,
			height: props.size
		};
		// 盒子模式下，需要额外进行处理
		if (props.mode === 'box') {
			// 设置盒子的边框，如果是细边框，则设置为0.5px宽度
			style.border = `${props.hairline ? 0.5 : 1}px solid ${props.borderColor}`;
			// 如果盒子间距为0的话
			if (uni.upx2px(props.space) === 0) {
				// 给第一和最后一个盒子设置圆角
				if (index === 0) {
					style.borderTopLeftRadius = '3px';
					style.borderBottomLeftRadius = '3px';
				}
				if (index === codeLength.value.length - 1) {
					style.borderTopRightRadius = '3px';
					style.borderBottomRightRadius = '3px';
				}
				// 最后一个盒子的右边框需要保留
				if (index !== codeLength.value.length - 1) {
					style.borderRight = 'none';
				}
			}
		}
		if (index !== codeLength.value.length - 1) {
			// 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
			style.marginRight = props.space;
		} else {
			// 最后一个盒子的有边框需要保留
			style.marginRight = 0;
		}

		return style;
	};
});
// 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
const codeArray = computed(() => {
	return String(inputValue.value).split('');
});
// 下划线模式下，横线的样式
const lineStyle = () => {
	const style = {};
	style.height = props.hairline ? '2px' : '4px';
	style.width = props.size;
	// 线条模式下，背景色即为边框颜色
	style.backgroundColor = props.borderColor;
	return style;
};

// 监听输入框的值发生变化
const inputHandler = (e) => {
	const value = e.detail.value;
	inputValue.value = value;
	// 是否允许输入“.”符号
	if (props.disabledDot) {
		proxy.$nextTick(() => {
			inputValue.value = value.replace('.', '');
		});
	}
	// 未达到maxlength之前，发送change事件，达到后发送finish事件
	proxy.$emit('change', value);
	// 修改通过v-model双向绑定的值
	proxy.$emit('input', value);
	// 达到用户指定输入长度时，发出完成事件
	if (String(value).length >= Number(props.maxlength)) {
		proxy.$emit('finish', value);
	}
};

</script>

<style lang="scss" scoped>
$zx-content-color: #666666;
$zx-code-input-cursor-width: 1px;
$zx-code-input-cursor-height: 40%;
$zx-code-input-cursor-animation-duration: 1s;
$zx-code-input-cursor-animation-name: zx-cursor-flicker;

.zx-code-input {
	display: flex;
	position: relative;
	overflow: hidden;

	&__item {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		&__text {
			font-size: 15px;
			color: $zx-content-color;
		}

		&__dot {
			width: 7px;
			height: 7px;
			border-radius: 100px;
			background-color: $zx-content-color;
		}

		&__line {
			position: absolute;
			bottom: 0;
			height: 4px;
			border-radius: 100px;
			width: 40px;
			background-color: $zx-content-color;
		}
		/* #ifndef APP-PLUS */
		&__cursor {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: $zx-code-input-cursor-width;
			height: $zx-code-input-cursor-height;
			animation: $zx-code-input-cursor-animation-duration zx-cursor-flicker infinite;
		}
		/* #endif */
	}

	&__input {
		// 之所以需要input输入框，是因为有它才能唤起键盘
		// 这里将它设置为两倍的屏幕宽度，再将左边的一半移出屏幕，为了不让用户看到输入的内容
		position: absolute;
		left: -750rpx;
		width: 1500rpx;
		top: 0;
		background-color: transparent;
		text-align: left;
	}
}

/* #ifndef APP-PLUS */
@keyframes zx-cursor-flicker {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
/* #endif */
</style>

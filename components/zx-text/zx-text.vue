<template>
	<view
		v-if="show"
		class="zx-text"
		:class="block ? 'block' : 'inline'"
		:style="{ justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end' }"
		@tap="clickHandler"
	>
		<slot name="left"></slot>
		<text
			:class="[mode === 'price' ? 'price' : 'value', lines && `zx-line-${lines}`]"
			:style="[valueStyle]"
			:selectable="selectable"
			:userSelect="userSelect"
			:space="space"
			:decode="decode"
		>
			{{ symbol }}{{ getText }}
		</text>
		<slot name="right"></slot>
	</view>
</template>

<script setup>
/**
 * Text 文本
 * @description 集成了文本类在项目中的常用功能，包括状态，格式化日期，姓名脱敏。
 * @tutorial https://zxui.org/components/loading
 * @property {Boolean} 					show		是否显示
 * @property {Boolean} 					type		主题颜色 primary，success， warning，danger，gray，black，white
 * @property {String | Number}			text		显示的值
 * @property {String} 					mode		文本处理的匹配模式 text-普通文本，price-价格，name-姓名，date-日期，mobile-手机号码
 * @property {Boolean} 					bold		是否粗体
 * @property {String | Number} 			lines		文本显示的行数，如果设置，超出此行数，将会显示省略号
 * @property {String} 					color		文本颜色
 * @property {String | Number} 			size		字体大小
 * @property {String} 					decoration	文字装饰，下划线，中划线等，可选值 none|underline|line-through
 * @property {String | Number} 			lineHeight	文本行高
 * @property {String} 					align		文本对齐方式，可选值left|center|right
 * @property {String} 					wordWrap	文字换行，可选值break-word|normal|anywhere
 * @event {Function}                    click       点击触发事件
 * @example <zx-text text="文字内容"></zx-text>
 */
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	// 是否显示
	show: {
		type: Boolean,
		default: true
	},
	// 样式
	type: {
		type: String,
		default: 'black'
	},
	// 显示的值
	text: {
		type: [String, Number],
		default: ''
	},
	// 文本处理的匹配模式
	// text-普通文本，price-价格，name-姓名，date-日期，mobile
	mode: {
		type: String,
		default: 'text'
	},
	fontFamily: {
		type: String,
		default: ''
	},
	symbol: {
		type: String,
		default: ''
	},
	// 是否粗体，默认normal
	bold: {
		type: Boolean,
		default: false
	},
	// 文本显示的行数，如果设置，超出此行数，将会显示省略号
	lines: {
		type: [String, Number],
		default: ''
	},
	// 文本颜色
	color: {
		type: String,
		default: ''
	},
	// 字体大小
	size: {
		type: String,
		default: '32rpx'
	},
	// 文字装饰，下划线，中划线等，可选值 none|underline|line-through
	decoration: {
		tepe: String,
		default: 'none'
	},
	// 文本行高
	lineHeight: {
		type: String,
		default: '50rpx'
	},
	// 文本对齐方式，可选值left|center|right
	align: {
		type: String,
		default: 'left'
	},
	// 文字换行，可选值break-word|normal|anywhere
	wordWrap: {
		type: String,
		default: 'normal'
	},
	//
	selectable: {
		type: Boolean,
		default: false
	},
	userSelect: {
		type: Boolean,
		default: false
	},
	decode: {
		type: Boolean,
		default: false
	},
	block: {
		type: Boolean,
		default: true
	},
	// 显示连续空格 ensp \ emsp \ nbsp
	space: {
		type: String,
		default: ''
	},
	// 是否拨打电话
	call: {
		type: Boolean,
		default: false
	}
});

const valueStyle = computed(() => {
	let color = props.color || '';
	if (!color && props.type) {
		color = {
			primary: '#5677fc',
			success: '#07c160',
			warning: '#ff7900',
			danger: '#EB0909',
			gray: '#999999',
			black: '#333333',
			white: '#ffffff'
		}[props.type];
	}

	const style = {
		textDecoration: props.decoration,
		fontWeight: props.bold ? 'bold' : 'normal',
		wordWrap: props.wordWrap,
		fontSize: props.size,
		color: color,
		lines: props.lines,
		lineHeight: props.lineHeight,
		textAlign: 'justify'
	};
	if (props.fontFamily !== '') {
		style.fontFamily = props.fontFamily + ', -apple-system, Arial, Helvetica' + ', sans-serif';
	}
	return style;
});
const getText = computed(() => {
	let text = props.text;
	switch (props.mode) {
		case 'price':
			text = formatPrice(text);
			break;
		case 'name':
			text = formatName(text);
			break;
		case 'date':
			text = formatTime(text);
			break;
		case 'mobile':
			text = formatMobile(text);
			break;
		default:
			break;
	}
	return text;
});
const getColor=computed(() => {
	let color = props.color || '';
	if (!color && props.type) {
		color = {
			primary: '#5677fc',
			success: '#07c160',
			warning: '#ff7900',
			danger: '#EB0909',
			gray: '#999999',
			black: '#333333',
			white: '#ffffff'
		}[props.type];
	}
	return color;
});

const clickHandler = () => {
	proxy.$emit('click', { text: props.text });
	if (props.call && props.mode === 'mobile') {
		uni.makePhoneCall({
			phoneNumber: props.text
		});
	}
};
// 金额格式化
const formatPrice = (price) => {
	return parseFloat(price)
		.toFixed(2)
		.toString()
		.split('')
		.reverse()
		.join('')
		.replace(/(\d{3})/g, '$1,')
		.replace(/\,$/, '')
		.split('')
		.reverse()
		.join('');
};
// 姓名脱敏规则
const formatName = (name) => {
	let value = '';
	if (name.length === 2) {
		value = name.substr(0, 1) + '*';
	} else if (name.length > 2) {
		let char = '';
		for (let i = 0, len = name.length - 2; i < len; i++) {
			char += '*';
		}
		value = name.substr(0, 1) + char + name.substr(-1, 1);
	} else {
		value = name;
	}
	return value;
};
// 手机号码脱敏规则
const formatMobile = (num) => {
	return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
};
// 时间格式化
const formatTime = (dateTime = null, formatStr = 'yyyy-mm-dd') => {
	let date;
	// 若传入时间为假值，则取当前时间
	if (!dateTime) {
		date = new Date();
	}
	// 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
	else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
		date = new Date(dateTime * 1000);
	}
	// 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
	else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
		date = new Date(Number(dateTime));
	}
	// 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
	// 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
	else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
		date = new Date(dateTime.replace(/-/g, '/'));
	}
	// 其他都认为符合 RFC 2822 规范
	else {
		date = new Date(dateTime);
	}

	const timeSource = {
		y: date.getFullYear().toString(), // 年
		m: (date.getMonth() + 1).toString().padStart(2, '0'), // 月
		d: date.getDate().toString().padStart(2, '0'), // 日
		h: date.getHours().toString().padStart(2, '0'), // 时
		M: date.getMinutes().toString().padStart(2, '0'), // 分
		s: date.getSeconds().toString().padStart(2, '0') // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};

	for (const key in timeSource) {
		const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
		if (ret) {
			// 年可能只需展示两位
			const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0;
			formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
		}
	}
	return formatStr;
};
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
.inline {
	display: inline-flex;
}

.block {
	display: flex;
}
/* #endif */

.zx-text {
	flex-direction: row;
	align-items: center;
	flex-wrap: nowrap;
	flex: 1;
	/* #ifndef APP-NVUE */
	//width: 100%;
	/* #endif */

	.price {
	}

	.value {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		text-overflow: ellipsis;
		align-items: center;
	}
}
@for $i from 1 through 5 {
	.zx-line-#{$i} {
		/* #ifdef APP-NVUE */
		// nvue下，可以直接使用lines属性，这是weex特有样式
		lines: $i;
		text-overflow: ellipsis;
		overflow: hidden;
		flex: 1;
		/* #endif */

		/* #ifndef APP-NVUE */
		// vue下，单行和多行显示省略号需要单独处理
		@if $i == '1' {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		} @else {
			display: -webkit-box !important;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			-webkit-line-clamp: $i;
			-webkit-box-orient: vertical !important;
		}
		/* #endif */
	}
}
</style>

<template>
	<zx-picker
		ref="picker"
		:show="show"
		:closeOnClickOverlay="closeOnClickOverlay"
		:columns="columns"
		:title="title"
		:itemHeight="itemHeight"
		:showToolbar="showToolbar"
		:visibleItemCount="visibleItemCount"
		:defaultIndex="innerDefaultIndex"
		:cancelText="cancelText"
		:confirmText="confirmText"
		:cancelColor="cancelColor"
		:confirmColor="confirmColor"
		@close="close"
		@cancel="cancel"
		@confirm="confirm"
		@change="change"
	></zx-picker>
</template>

<script setup>
/**
 * DatetimePicker 时间日期选择器
 * @description 此选择器用于时间日期
 * @tutorial https://zxui.org/components/datetimePicker.html
 * @property {Boolean}			show				用于控制选择器的弹出与收起 ( 默认 false )
 * @property {Boolean}			showToolbar			是否显示顶部的操作栏  ( 默认 true )
 * @property {String | Number}	value				绑定值
 * @property {String}			title				顶部标题
 * @property {String}			mode				展示格式 mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择  ( 默认 ‘datetime )
 * @property {Number}			maxDate				可选的最大时间  默认值为后10年
 * @property {Number}			minDate				可选的最小时间  默认值为前10年
 * @property {Number}			minHour				可选的最小小时，仅mode=time有效   ( 默认 0 )
 * @property {Number}			maxHour				可选的最大小时，仅mode=time有效	  ( 默认 23 )
 * @property {Number}			minMinute			可选的最小分钟，仅mode=time有效	  ( 默认 0 )
 * @property {Number}			maxMinute			可选的最大分钟，仅mode=time有效   ( 默认 59 )
 * @property {Function}			filter				选项过滤函数
 * @property {Function}			formatter			选项格式化函数
 * @property {Boolean}			loading				是否显示加载中状态   ( 默认 false )
 * @property {String | Number}	itemHeight			各列中，单个选项的高度   ( 默认 44 )
 * @property {String}			cancelText			取消按钮的文字  ( 默认 '取消' )
 * @property {String}			confirmText			确认按钮的文字  ( 默认 '确认' )
 * @property {String}			cancelColor			取消按钮的颜色  ( 默认 '#909193' )
 * @property {String}			confirmColor		确认按钮的颜色  ( 默认 '#3c9cff' )
 * @property {String | Number}	visibleItemCount	每列中可见选项的数量  ( 默认 5 )
 * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭选择器  ( 默认 false )
 * @property {Array}			defaultIndex		各列的默认索引
 * @event {Function} close 关闭选择器时触发
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @event {Function} change 当选择值变化时触发
 * @event {Function} cancel 点击取消按钮
 * @example  <zx-datetime-picker :show="show" :value="value1"  mode="datetime" ></zx-datetime-picker>
 */

import { ref, getCurrentInstance, onMounted, computed } from 'vue';
import dayjs from '@tanzhenxing/zxui/libs/js/dayjs.js';

const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();
const props = defineProps({
	// 是否打开组件
	show: {
		type: Boolean,
		default: false
	},
	// 是否展示顶部的操作栏
	showToolbar: {
		type: Boolean,
		default: true
	},
	// 绑定值
	value: {
		type: [String, Number],
		default: ''
	},
	// 顶部标题
	title: {
		type: String,
		default: ''
	},
	// 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
	mode: {
		type: String,
		default: 'datetime'
	},
	// 可选的最大时间
	maxDate: {
		type: Number,
		// 最大默认值为后10年
		default: 10
	},
	// 可选的最小时间
	minDate: {
		type: Number,
		// 最小默认值为前10年
		default: 10
	},
	// 可选的最小小时，仅mode=time有效
	minHour: {
		type: Number,
		default: 0
	},
	// 可选的最大小时，仅mode=time有效
	maxHour: {
		type: Number,
		default: 23
	},
	// 可选的最小分钟，仅mode=time有效
	minMinute: {
		type: Number,
		default: 0
	},
	// 可选的最大分钟，仅mode=time有效
	maxMinute: {
		type: Number,
		default: 59
	},
	// 选项过滤函数
	filter: {
		type: [Function, null],
		default: null
	},
	// 选项格式化函数
	formatter: {
		type: [Function, null],
		default: null
	},
	// 是否显示加载中状态
	loading: {
		type: Boolean,
		default: false
	},
	// 各列中，单个选项的高度
	itemHeight: {
		type: String,
		default: '88rpx'
	},
	// 取消按钮的文字
	cancelText: {
		type: String,
		default: '取消'
	},
	// 确认按钮的文字
	confirmText: {
		type: String,
		default: '确认'
	},
	// 取消按钮的颜色
	cancelColor: {
		type: String,
		default: '#909193'
	},
	// 确认按钮的颜色
	confirmColor: {
		type: String,
		default: '#3c9cff'
	},
	// 每列中可见选项的数量
	visibleItemCount: {
		type: [String, Number],
		default: 5
	},
	// 是否允许点击遮罩关闭选择器
	closeOnClickOverlay: {
		type: Boolean,
		default: false
	},
	// 各列的默认索引
	defaultIndex: {
		type: Array,
		default: () => {
			return [];
		}
	}
});

const columns = ref([]);
const innerDefaultIndex = ref([]);
const innerValue = ref(null);

onMounted(() => {
	updateColumnValue(innerValue.value);
	init();
});

const innerFormatter = (type, value) => value;

// 如果以下这些变量发生了变化，意味着需要重新初始化各列的值
const propsChange = computed(() => {
	return [props.mode, props.maxDate, props.minDate, props.minHour, props.maxHour, props.minMinute, props.maxMinute, props.filter];
});

const times = (n, iteratee) => {
	let index = -1;
	const result = [n < 0 ? 0 : n];
	while (++index < n) {
		result[index] = iteratee(index);
	}
	return result;
};

const init = () => {
	innerValue.value = correctValue(props.value);
	updateColumnValue(innerValue.value);
};
// 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
const setFormatter = (e) => {
	innerFormatter = e;
};
// 关闭选择器
const close = () => {
	if (props.closeOnClickOverlay) {
		proxy.$emit('close');
	}
};
// 点击工具栏的取消按钮
const cancel = () => {
	proxy.$emit('cancel');
};
// 点击工具栏的确定按钮
const confirm = () => {
	proxy.$emit('confirm', {
		value: innerValue.value,
		mode: props.mode
	});
	proxy.$emit('input', innerValue.value);
};
//用正则截取输出值,当出现多组数字时,抛出错误
const intercept = (e, type) => {
	let judge = e.match(/\d+/g);
	//判断是否掺杂数字
	if (judge.length > 1) {
		uni.showToast({
			title: '请勿在过滤或格式化函数时添加数字',
			icon: 'none'
		});
		return 0;
	} else if (type && judge[0].length == 4) {
		//判断是否是年份
		return judge[0];
	} else if (judge[0].length > 2) {
		uni.showToast({
			title: '请勿在过滤或格式化函数时添加数字',
			icon: 'none'
		});
		return 0;
	} else {
		return judge[0];
	}
};
// 列发生变化时触发
const change = (e) => {
	const { indexs, values } = e;
	let selectValue = '';
	if (props.mode === 'time') {
		// 根据value各列索引，从各列数组中，取出当前时间的选中值
		selectValue = `${proxy.intercept(values[0][indexs[0]])}:${proxy.intercept(values[1][indexs[1]])}`;
	} else {
		// 将选择的值转为数值，比如'03'转为数值的3，'2019'转为数值的2019
		const year = parseInt(proxy.intercept(values[0][indexs[0]], 'year'));
		const month = parseInt(proxy.intercept(values[1][indexs[1]]));
		let date = parseInt(values[2] ? proxy.intercept(values[2][indexs[2]]) : 1);
		let hour = 0,
			minute = 0;
		// 此月份的最大天数
		const maxDate = dayjs(`${year}-${month}`).daysInMonth();
		// year-month模式下，date不会出现在列中，设置为1，为了符合后边需要减1的需求
		if (props.mode === 'year-month') {
			date = 1;
		}
		// 不允许超过maxDate值
		date = Math.min(maxDate, date);
		if (props.mode === 'datetime') {
			hour = parseInt(proxy.intercept(values[3][indexs[3]]));
			minute = parseInt(proxy.intercept(values[4][indexs[4]]));
		}
		// 转为时间模式
		selectValue = Number(new Date(year, month - 1, date, hour, minute));
	}
	// 取出准确的合法值，防止超越边界的情况
	selectValue = correctValue(selectValue);
	innerValue.value = selectValue;
	updateColumnValue(selectValue);
	// 发出change时间，value为当前选中的时间戳
	proxy.$emit('change', {
		value: selectValue,
		// #ifndef MP-WEIXIN
		// 微信小程序不能传递实例，会因为循环引用而报错
		picker: proxy.$refs.picker,
		// #endif
		mode: props.mode
	});
};
// 更新各列的值，进行补0、格式化等操作
const updateColumnValue = (value) => {
	innerValue.value = value;
	updateColumns();
	updateIndexs(value);
};
// 更新索引
const updateIndexs = (value) => {
	let values = [];
	/* const formatter = props.formatter || innerFormatter.value;
	if (props.mode === 'time') {
		// 将time模式的时间用:分隔成数组
		const timeArr = value.split(':');
		// 使用formatter格式化方法进行管道处理
		values = [formatter('hour', timeArr[0]), formatter('minute', timeArr[1])];
	} else {
		const date = new Date(value);
		values = [
			formatter('year', `${dayjs(value).year()}`),
			// 月份补0
			formatter('month', padZero(dayjs(value).month() + 1))
		];
		if (props.mode === 'date') {
			// date模式，需要添加天列
			values.push(formatter('day', padZero(dayjs(value).date())));
		}
		if (props.mode === 'datetime') {
			// 数组的push方法，可以写入多个参数
			values.push(formatter('day', padZero(dayjs(value).date())), formatter('hour', padZero(dayjs(value).hour())), formatter('minute', padZero(dayjs(value).minute())));
		}
	} */

	// 根据当前各列的所有值，从各列默认值中找到默认值在各列中的索引
	const indexs = columns.value.map((column, index) => {
		// 通过取大值，可以保证不会出现找不到索引的-1情况
		return Math.max(
			0,
			column.findIndex((item) => item === values[index])
		);
	});
	innerDefaultIndex.value = indexs;
};
// 更新各列的值
const updateColumns = () => {
	//const formatter = props.formatter || innerFormatter.value;
	// 获取各列的值，并且map后，对各列的具体值进行补0操作
	//const results = getOriginColumns().map((column) => column.values.map((value) => formatter(column.type, value)));
	//columns.value = results;
};
const getOriginColumns = () => {
	// 生成各列的值
	const results = getRanges().map(({ type, range }) => {
		let values = times(range[1] - range[0] + 1, (index) => {
			let value = range[0] + index;
			value = type === 'year' ? `${value}` : padZero(value);
			return value;
		});
		// 进行过滤
		if (props.filter) {
			values = filter(type, values);
		}
		return { type, values };
	});
	return results;
};
// 通过最大值和最小值生成数组
const generateArray = (start, end) => {
	return Array.from(new Array(end + 1).keys()).slice(start);
};
// 得出合法的时间
const correctValue = (value) => {
	const isDateMode = props.mode !== 'time';
	if (isDateMode && !testDate(value)) {
		// 如果是日期类型，但是又没有设置合法的当前时间的话，使用最小时间为当前时间
		value = props.minDate;
	} else if (!isDateMode && !value) {
		// 如果是时间类型，而又没有默认值的话，就用最小时间
		value = `${padZero(props.minHour)}:${padZero(props.minMinute)}`;
	}
	// 时间类型
	if (!isDateMode) {
		if (String(value).indexOf(':') === -1) {
			uni.showToast({
				title: '时间错误，请传递如12:24的格式',
				icon: 'none'
			});
		}
		let [hour, minute] = value.split(':');
		// 对时间补零，同时控制在最小值和最大值之间
		hour = padZero(range(props.minHour, props.maxHour, Number(hour)));
		minute = padZero(range(props.minMinute, props.maxMinute, Number(minute)));
		return `${hour}:${minute}`;
	} else {
		// 如果是日期格式，控制在最小日期和最大日期之间
		value = dayjs(value).isBefore(dayjs(props.minDate)) ? props.minDate : value;
		value = dayjs(value).isAfter(dayjs(props.maxDate)) ? props.maxDate : value;
		return value;
	}
};
// 获取每列的最大和最小值
const getRanges = () => {
	if (props.mode === 'time') {
		return [
			{
				type: 'hour',
				range: [props.minHour, props.maxHour]
			},
			{
				type: 'minute',
				range: [props.minMinute, props.maxMinute]
			}
		];
	}
	const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary('max', innerValue.value);
	const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary('min', innerValue.value);
	const result = [
		{
			type: 'year',
			range: [minYear, maxYear]
		},
		{
			type: 'month',
			range: [minMonth, maxMonth]
		},
		{
			type: 'day',
			range: [minDate, maxDate]
		},
		{
			type: 'hour',
			range: [minHour, maxHour]
		},
		{
			type: 'minute',
			range: [minMinute, maxMinute]
		}
	];
	if (props.mode === 'date') result.splice(3, 2);
	if (props.mode === 'year-month') result.splice(2, 3);
	return result;
};
// 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
const getBoundary = (type, innerValue) => {
	const value = new Date(innerValue);
	const boundary = new Date(instance[`${type}Date`]);
	const year = dayjs(boundary).year();
	let month = 1;
	let date = 1;
	let hour = 0;
	let minute = 0;
	if (type === 'max') {
		month = 12;
		// 月份的天数
		date = dayjs(value).daysInMonth();
		hour = 23;
		minute = 59;
	}
	// 获取边界值，逻辑是：当年达到了边界值(最大或最小年)，就检查月允许的最大和最小值，以此类推
	if (dayjs(value).year() === year) {
		month = dayjs(boundary).month() + 1;
		if (dayjs(value).month() + 1 === month) {
			date = dayjs(boundary).date();
			if (dayjs(value).date() === date) {
				hour = dayjs(boundary).hour();
				if (dayjs(value).hour() === hour) {
					minute = dayjs(boundary).minute();
				}
			}
		}
	}
	return {
		[`${type}Year`]: year,
		[`${type}Month`]: month,
		[`${type}Date`]: date,
		[`${type}Hour`]: hour,
		[`${type}Minute`]: minute
	};
};

/**
 * @description 日期的月或日补零操作
 * @param {String} value 需要补零的值
 */
const padZero = (value) => {
	return `00${value}`.slice(-2);
};
/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
const range = (min = 0, max = 0, value = 0) => {
	return Math.max(min, Math.min(max, Number(value)));
};
/**
 * 验证日期格式
 */
const testDate=(value)=> {
    if (!value) return false
    // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
    if (number(value)) value = +value
    return !/Invalid|NaN/.test(new Date(value).toString())
}
</script>

<style lang="scss" scoped></style>

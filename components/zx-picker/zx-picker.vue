<template>
	<zx-popup :show="show" @close="closeHandler">
		<view class="zx-picker">
			<zx-toolbar
				v-if="showToolbar"
				:cancelColor="cancelColor"
				:confirmColor="confirmColor"
				:cancelText="cancelText"
				:confirmText="confirmText"
				:title="title"
				@cancel="cancel"
				@confirm="confirm"
			></zx-toolbar>
			<picker-view
				class="zx-picker__view"
				:indicatorStyle="`height: ${itemHeight}`"
				:value="innerIndex"
				:immediateChange="immediateChange"
				:style="{
					height: `${visibleItemCount * parseInt(itemHeight)}rpx`
				}"
				@change="changeHandler"
			>
				<picker-view-column v-for="(item, index) in innerColumns" :key="index" class="zx-picker__view__column">
					<text
						v-if="$u.test.array(item)"
						class="zx-picker__view__column__item zx-line-1"
						v-for="(item1, index1) in item"
						:key="index1"
						:style="{
							height: itemHeight,
							lineHeight: itemHeight,
							fontWeight: index1 === innerIndex[index] ? 'bold' : 'normal'
						}"
					>
						{{ getItemText(item1) }}
					</text>
				</picker-view-column>
			</picker-view>
			<view v-if="loading" class="zx-picker--loading">
				<zx-loading-icon mode="circle"></zx-loading-icon>
			</view>
		</view>
	</zx-popup>
</template>

<script setup>
/**
 * zx-picker
 * @description 选择器
 * @property {Boolean}			show				是否显示picker弹窗（默认 false ）
 * @property {Boolean}			showToolbar			是否显示顶部的操作栏（默认 true ）
 * @property {String}			title				顶部标题
 * @property {Array}			columns				对象数组，设置每一列的数据
 * @property {Boolean}			loading				是否显示加载中状态（默认 false ）
 * @property {String | Number}	itemHeight			各列中，单个选项的高度（默认 44 ）
 * @property {String}			cancelText			取消按钮的文字（默认 '取消' ）
 * @property {String}			confirmText			确认按钮的文字（默认 '确定' ）
 * @property {String}			cancelColor			取消按钮的颜色（默认 '#909193' ）
 * @property {String}			confirmColor		确认按钮的颜色（默认 '#3c9cff' ）
 * @property {String | Number}	visibleItemCount	每列中可见选项的数量（默认 5 ）
 * @property {String}			keyName				选项对象中，需要展示的属性键名（默认 'text' ）
 * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭选择器（默认 false ）
 * @property {Array}			defaultIndex		各列的默认索引
 * @property {Boolean}			immediateChange		是否在手指松开时立即触发change事件（默认 false ）
 * @event {Function} close		关闭选择器时触发
 * @event {Function} cancel		点击取消按钮触发
 * @event {Function} change		当选择值变化时触发
 * @event {Function} confirm	点击确定按钮，返回当前选择的值
 */

import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const instance = getCurrentInstance()

const props = defineProps({
	// 是否展示picker弹窗
	show: {
		type: Boolean,
		default: false
	},
	// 是否展示顶部的操作栏
	showToolbar: {
		type: Boolean,
		default: true
	},
	// 顶部标题
	title: {
		type: String,
		default: ''
	},
	// 对象数组，设置每一列的数据
	columns: {
		type: Array,
		default: () => {
			return [];
		}
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
	// 选项对象中，需要展示的属性键名
	keyName: {
		type: String,
		default: 'text'
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
	},
	// 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
	immediateChange: {
		type: Boolean,
		default: false
	}
});

// 上一次选择的列索引
const lastIndex = ref([]);
// 索引值 ，对应picker-view的value
const innerIndex = ref([]);
// 各列的值
const innerColumns = ref([]);
// 上一次的变化列索引
const columnIndex = ref(0);

// 获取item需要显示的文字，判别为对象还是文本
const getItemText = (item) => {
	if (testObject(item)) {
		return item[props.keyName];
	} else {
		return item;
	}
};
// 关闭选择器
const closeHandler = () => {
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
		indexs: innerIndex.value,
		value: innerColumns.value.map((item, index) => item[innerIndex.value[index]]),
		values: innerColumns.value
	});
};
// 选择器某一列的数据发生变化时触发
const changeHandler = (e) => {
	const { value } = e.detail;
	let index = 0,
		columnIndex = 0;
	// 通过对比前后两次的列索引，得出当前变化的是哪一列
	for (let i = 0; i < value.length; i++) {
		let item = value[i];
		if (item !== (lastIndex.value[i] || 0)) {
			// 把undefined转为合法假值0
			// 设置columnIndex为当前变化列的索引
			columnIndex = i;
			// index则为变化列中的变化项的索引
			index = item;
			break; // 终止循环，即使少一次循环，也是性能的提升
		}
	}
	columnIndex.value = columnIndex;
	const values = innerColumns.value;
	// 将当前的各项变化索引，设置为"上一次"的索引变化值
	setLastIndex(value);
	setIndexs(value);

	proxy.$emit('change', {
		// #ifndef MP-WEIXIN || MP-LARK
		// 微信小程序不能传递,会因为循环引用而报错
		picker: instance,
		// #endif
		value: innerColumns.value.map((item, index) => item[value[index]]),
		index,
		indexs: value,
		// values为当前变化列的数组内容
		values,
		columnIndex
	});
};
// 设置index索引，此方法可被外部调用设置
const setIndexs = (index, setLastIndex) => {
	innerIndex.value = proxy.$util.deepClone(index);
	if (setLastIndex) {
		setLastIndex(index);
	}
};
// 记录上一次的各列索引位置
const setLastIndex = (index) => {
	// 当能进入此方法，意味着当前设置的各列默认索引，即为“上一次”的选中值，需要记录，是因为changeHandler中
	// 需要拿前后的变化值进行对比，得出当前发生改变的是哪一列
	lastIndex.value = proxy.$util.deepClone(index);
};
// 设置对应列选项的所有值
const setColumnValues = (columnIndex, values) => {
	// 替换innerColumns数组中columnIndex索引的值为values，使用的是数组的splice方法
	innerColumns.value.splice(columnIndex, 1, values);
	// 拷贝一份原有的innerIndex做临时变量，将大于当前变化列的所有的列的默认索引设置为0
	let tmpIndex = proxy.$util.deepClone(innerIndex.value);
	for (let i = 0; i < innerColumns.value.length; i++) {
		if (i > columnIndex.value) {
			tmpIndex[i] = 0;
		}
	}
	// 一次性赋值，不能单个修改，否则无效
	setIndexs(tmpIndex);
};
// 获取对应列的所有选项
const getColumnValues = (columnIndex) => {
	// 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
	// 索引如果在外部change的回调中调用getColumnValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
	(async () => {
		await proxy.$util.sleep();
	})();
	return innerColumns.value[columnIndex];
};
// 设置整体各列的columns的值
const setColumns = (columns) => {
	innerColumns.value = proxy.$util.deepClone(columns);
	// 如果在设置各列数据时，没有被设置默认的各列索引defaultIndex，那么用0去填充它，数组长度为列的数量
	if (innerIndex.value.length === 0) {
		innerIndex.value = new Array(columns.length).fill(0);
	}
};
// 获取各列选中值对应的索引
const getIndexs = () => {
	return innerIndex.value;
};
// 获取各列选中的值
const getValues = () => {
	// 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
	// 索引如果在外部change的回调中调用getValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
	(async () => {
		await proxy.$util.sleep();
	})();
	return innerColumns.value.map((item, index) => item[innerIndex.value[index]]);
};
/**
 * 是否数组
 */
const testArray=(value)=> {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 是否对象
 */
const testObject=(value)=> {
    return Object.prototype.toString.call(value) === '[object Object]'
}
</script>

<style lang="scss" scoped>
$zx-main-color: #3c9cff;
.zx-picker {
	position: relative;

	&__view {
		&__column {
			display: flex;
			flex: 1;
			justify-content: center;

			&__item {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 16px;
				text-align: center;
				/* #ifndef APP-NVUE */
				display: block;
				/* #endif */
				color: $zx-main-color;

				&--disabled {
					/* #ifndef APP-NVUE */
					cursor: not-allowed;
					/* #endif */
					opacity: 0.35;
				}
			}
		}
	}

	&--loading {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.87);
		z-index: 1000;
	}
}
</style>

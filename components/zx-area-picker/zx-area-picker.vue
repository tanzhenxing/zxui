<template>
	<zx-popup :show="popupShow" mode="bottom">
		<view class="zx-ap-body zx-bg-white zx-dark-bg-level-3" @tap.stop.prevent="stopfun">
			<view class="zx-ap-header zx-flex zx-row zx-space-between">
				<text class="zx-ap-header-btn zx-block" :class="cancelClass" @tap="close">{{ cancelText }}</text>
				<text class="zx-ap-header-btn zx-block" :class="confirmClass" style="text-align: right" @tap="confirm">{{ confirmText }}</text>
			</view>
			<picker-view :style="{ height: height + 'rpx' }" :indicator-style="indicatorStyle" :value="defaultVal" @change="change">
				<picker-view-column v-if="level >= 1">
					<view class="zx-picker-item" :style="indicatorStyle" v-for="(item, index) in province" :key="index">
						<text :style="indicatorStyle" class="zx-block zx-picker-item">{{ item.label }}</text>
					</view>
				</picker-view-column>
				<picker-view-column v-if="level >= 2">
					<view class="zx-picker-item" :style="indicatorStyle" v-for="(item, index) in city[defaultVal[0]]" :key="index">
						<text :style="indicatorStyle" class="zx-block zx-picker-item">{{ item.label }}</text>
					</view>
				</picker-view-column>
				<picker-view-column v-if="level >= 3">
					<view class="zx-picker-item" :style="indicatorStyle" v-for="(item, index) in area[defaultVal[0]][defaultVal[1]]" :key="index">
						<text :style="indicatorStyle" class="zx-block zx-picker-item">{{ item.label }}</text>
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</zx-popup>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
import provinceData from './province.js';
import cityData from './city.js';
import areaData from './area.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	indicatorStyle: {
		type: String,
		default: 'height:36px; line-height:36px;'
	},
	cancelText: {
		type: String,
		default: '取消'
	},
	cancelClass: {
		type: Array,
		default: () => {
			return ['zx-color-gray'];
		}
	},
	confirmText: {
		type: String,
		default: '确定'
	},
	confirmClass: {
		type: Array,
		default: () => {
			return ['zx-primary-color'];
		}
	},
	value: {
		type: Array,
		default: () => {
			return ['', '', ''];
		}
	},
	level: {
		type: Number,
		default: 3
	},
	height: {
		type: Number,
		default: 550
	},
	zIndex: {
		type: Number,
		default: 1000
	}
});

const province = ref(null);
const city = ref(null);
const area = ref(null);
const defaultVal = ref([0, 0, 0]);
const realshow = ref(false);
const popupShow = ref(false);

onMounted(() => {
	setDefault();

	popupShow.value = props.show;

	province.value = provinceData;
	city.value = cityData;
	area.value = areaData;
});

const setDefault = () => {
	if (props.value[0] == '') {
		return;
	}
	proxy.$nextTick(() => {
		defaultVal.value.splice(0, 1, arrayIndexOf(province.value, props.value[0]));
		if (props.value[1] == '') {
			return;
		}
		proxy.$nextTick(() => {
			defaultVal.value.splice(1, 1, arrayIndexOf(city.value[defaultVal.value[0]], props.value[1]));
			if (props.value[2] == '') {
				return;
			}
			proxy.$nextTick(() => {
				defaultVal.value.splice(2, 1, arrayIndexOf(area.value[defaultVal.value[0]][defaultVal.value[1]], props.value[2]));
			});
		});
	});
};
const arrayIndexOf = (arr, needFind) => {
	let index = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].label == needFind) {
			index = i;
			return i;
		}
	}
	return index;
};
const change = (e) => {
	let res = e.detail.value;
	if (!res[0]) {
		res[0] = 0;
	}
	if (!res[1]) {
		res[1] = 0;
	}
	if (!res[2]) {
		res[2] = 0;
	}
	defaultVal.value = res;
};
const confirm = () => {
	let codes = [
		provinceData[defaultVal.value[0]].value,
		cityData[defaultVal.value[0]][defaultVal.value[1]].value,
		areaData[defaultVal.value[0]][defaultVal.value[1]][defaultVal.value[2]].value ? areaData[defaultVal.value[0]][defaultVal.value[1]][defaultVal.value[2]].value : 0
	];
	let names = [
		provinceData[defaultVal.value[0]].label,
		cityData[defaultVal.value[0]][defaultVal.value[1]].label,
		areaData[defaultVal.value[0]][defaultVal.value[1]][defaultVal.value[2]].label ? areaData[defaultVal.value[0]][defaultVal.value[1]][defaultVal.value[2]].label : ''
	];
	codes = codes.splice(0, props.level);
	names = names.splice(0, props.level);
	let res = { codes: codes, names: names, indexs: defaultVal.value };
	proxy.$emit('confirm', res);
	popupShow.value = false;
};
const open = () => {
	popupShow.value = true;
};
const close = () => {
	popupShow.value = false;
};
const stopfun = (e) => {
	e.stopPropagation();
	return null;
};
</script>
<style lang="scss" scoped>
/* 地区联动 */
.zx-ap-body {
	padding: 0;
}
/* #ifndef APP-NVUE */
.zx-ap-body {
	position: relative;
}
/* #endif */
.zx-ap-header {
	padding: 25rpx;
}
.zx-ap-header-btn {
	width: 200rpx;
	line-height: 38rpx;
	height: 38rpx;
	font-size: 28rpx;
}
.zx-ap-main {
	width: 750rpx;
	height: 500rpx;
}
.zx-ap-item {
	height: 35px;
	font-size: 12px;
	line-height: 35px;
	overflow: hidden;
	text-align: center;
}
.zx-bg-white {
	background-color: #ffffff !important;
}
.zx-dark-bg-level-3 {
	background: rgba(199, 199, 199, 1.0) !important;
}
/* #ifndef APP-NVUE */
.zx-flex {
	display: flex;
}
.zx-border-box {
	box-sizing: border-box;
}
.zx-body {
	width: 750rpx;
	box-sizing: border-box;
}
/* #endif */

/* flex 布局 */
.zx-rows,
.zx-row {
	flex-direction: row !important;
}
.zx-columns,
.zx-column {
	flex-direction: column !important;
}
.zx-wrap {
	flex-direction: row !important;
	flex-wrap: wrap !important;
}
.zx-nowrap {
	flex-direction: row !important;
	flex-wrap: nowrap !important;
}
.zx-space-around {
	justify-content: space-around !important;
}
.zx-space-between {
	justify-content: space-between !important;
}
.zx-justify-content-start {
	justify-content: flex-start !important;
}
.zx-justify-content-center {
	justify-content: center !important;
}
.zx-justify-content-end {
	justify-content: flex-end !important;
}
.zx-align-items-start {
	align-items: flex-start !important;
}
.zx-align-items-center {
	align-items: center !important;
}
.zx-align-items-end {
	align-items: flex-end !important;
}
.zx-flex1 {
	flex: 1 !important;
}
/* #ifndef APP-NVUE */
.zx-flex-shrink0 {
	flex-shrink: 0 !important;
}
.zx-flex-shrink1 {
	flex-shrink: 1 !important;
}
/* #endif */
.zx-block-text,
.zx-block {
	display: block;
}
.zx-picker-item {
	overflow: hidden;
	font-size: 26rpx;
	height: 36px;
	line-height: 36px;
	overflow: hidden;
	text-align: center;
}
</style>

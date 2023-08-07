<template>
	<view class="zx-album">
		<view class="zx-album__row" ref="zx-album__row" v-for="(arr, index) in showUrls" :forComputedUse="albumWidth" :key="index">
			<view
				class="zx-album__row__wrapper"
				v-for="(item, index1) in arr"
				:key="index1"
				:style="[imageStyle(index + 1, index1 + 1)]"
				@tap="previewFullImage ? onPreviewTap(getSrc(item)) : ''"
			>
				<image
					:src="getSrc(item)"
					:mode="urls.length === 1 ? (imageHeight > 0 ? singleMode : 'widthFix') : multipleMode"
					:style="[{ width: imageWidth, height: imageHeight }]"
				></image>
				<view
					v-if="showMore && urls.length > rowCount * showUrls.length && index === showUrls.length - 1 && index1 === showUrls[showUrls.length - 1].length - 1"
					class="zx-album__row__wrapper__text"
				>
					<zx-text :text="`+${urls.length - maxCount}`" color="#fffff" size="70rpx" align="center" customStyle="justify-content: center"></zx-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, watch, computed } from 'vue';

const { proxy } = getCurrentInstance();

// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif

/**
 * Album 相册
 * @description 相册的功能
 * @tutorial https://zxui.org/components/album
 * @property {Array}           urls             图片地址列表 Array<String>|Array<Object>形式
 * @property {String}          keyName          指定从数组的对象元素中读取哪个属性作为图片地址
 * @property {String | Number} singleSize       单图时，图片长边的长度  （默认 180 ）
 * @property {String | Number} multipleSize     多图时，图片边长 （默认 70 ）
 * @property {String | Number} space            多图时，图片水平和垂直之间的间隔 （默认 6 ）
 * @property {String}          singleMode       单图时，图片缩放裁剪的模式 （默认 'scaleToFill' ）
 * @property {String}          multipleMode     多图时，图片缩放裁剪的模式 （默认 'aspectFill' ）
 * @property {String | Number} maxCount         取消按钮的提示文字 （默认 9 ）
 * @property {Boolean}         previewFullImage 是否可以预览图片 （默认 true ）
 * @property {String | Number} rowCount         每行展示图片数量，如设置，singleSize和multipleSize将会无效	（默认 3 ）
 * @property {Boolean}         showMore         超出maxCount时是否显示查看更多的提示 （默认 true ）
 *
 * @event    {Function}        albumWidth       某些特殊的情况下，需要让文字与相册的宽度相等，这里事件的形式对外发送  （回调参数 width ）
 * @example <zx-album :urls="urls" @albumWidth="width => albumWidth = width" multipleSize="68" ></zx-album>
 */

const props = defineProps({
	// 图片地址，Array<String>|Array<Object>形式
	urls: {
		type: Array,
		default: function () {
			return [];
		}
	},
	// 指定从数组的对象元素中读取哪个属性作为图片地址
	keyName: {
		type: String,
		default: ''
	},
	// 单图时，图片长边的长度
	singleSize: {
		type: [String, Number],
		default: '360rpx'
	},
	// 多图时，图片边长
	multipleSize: {
		type: [String, Number],
		default: '140rpx'
	},
	// 多图时，图片水平和垂直之间的间隔
	space: {
		type: [String, Number],
		default: '12rpx'
	},
	// 单图时，图片缩放裁剪的模式
	singleMode: {
		type: String,
		default: 'scaleToFill'
	},
	// 多图时，图片缩放裁剪的模式
	multipleMode: {
		type: String,
		default: 'aspectFill'
	},
	// 最多展示的图片数量，超出时最后一个位置将会显示剩余图片数量
	maxCount: {
		type: [String, Number],
		default: 9
	},
	// 是否可以预览图片
	previewFullImage: {
		type: Boolean,
		default: true
	},
	// 每行展示图片数量，如设置，singleSize和multipleSize将会无效
	rowCount: {
		type: [String, Number],
		default: 3
	},
	// 超出maxCount时是否显示查看更多的提示
	showMore: {
		type: Boolean,
		default: true
	}
});

// 单图的宽度
const singleWidth = ref(0);
// 单图的高度
const singleHeight = ref(0);
// 单图时，如果无法获取图片的尺寸信息，让图片宽度默认为容器的一定百分比
const singlePercent = ref(0.6);

const imageStyle = computed(() => {
	return (index1, index2) => {
		let rowLen = showUrls.value.length;
		let allLen = props.urls.length;
		const style = {
			marginRight: props.space,
			marginBottom: props.space
		};
		// 如果为最后一行，则每个图片都无需下边框
		if (index1 === rowLen) {
			style.marginBottom = 0;
		}
		// 每行的最右边一张和总长度的最后一张无需右边框
		if (index2 === props.rowCount || (index1 === rowLen && index2 === showUrls.value[index1 - 1].length)) {
			style.marginRight = 0;
		}
		return style;
	};
});
// 将数组划分为二维数组
const showUrls = computed(() => {
	const arr = [];
	props.urls.map((item, index) => {
		// 限制最大展示数量
		if (index + 1 <= props.maxCount) {
			// 计算该元素为第几个素组内
			const itemIndex = Math.floor(index / props.rowCount);
			// 判断对应的索引是否存在
			if (!arr[itemIndex]) {
				arr[itemIndex] = [];
			}
			arr[itemIndex].push(item);
		}
	});
	return arr;
});
const imageWidth = computed(() => {
	return props.urls.length === 1 ? singleWidth.value : props.multipleSize;
});
const imageHeight = computed(() => {
	return props.urls.length === 1 ? singleHeight.value : props.multipleSize;
});
// 此变量无实际用途，仅仅是为了利用computed特性，让其在urls长度等变化时，重新计算图片的宽度
// 因为用户在某些特殊的情况下，需要让文字与相册的宽度相等，所以这里事件的形式对外发送
const albumWidth = computed(() => {
	let width = 0;
	if (props.urls.length === 1) {
		width = singleWidth.value;
	} else {
		width = showUrls.value[0].length * props.multipleSize + props.space * (showUrls.value[0].length - 1);
	}
	proxy.$emit('albumWidth', width);
	return width;
});

watch(
	props.urls,
	(newVal) => {
		if (newVal.length === 1) {
			getImageRect();
		}
	},
	{ immediate: true }
);

// 预览图片
const onPreviewTap = (url) => {
	const urls = props.urls.map((item) => {
		return getSrc(item);
	});
	uni.previewImage({
		current: url,
		urls
	});
};
// 获取图片的路径
const getSrc = (item) => {
	return testObject(item) ? (props.keyName && item[props.keyName]) || item.src : item;
};
// 单图时，获取图片的尺寸
// 在小程序中，需要将网络图片的的域名添加到小程序的download域名才可能获取尺寸
// 在没有添加的情况下，让单图宽度默认为盒子的一定宽度(singlePercent)
const getImageRect = () => {
	const src = getSrc(props.urls[0]);
	uni.getImageInfo({
		src,
		success: (res) => {
			// 判断图片横向还是竖向展示方式
			const isHorizotal = res.width >= res.height;
			singleWidth.value = isHorizotal ? props.singleSize : (res.width / res.height) * props.singleSize;
			singleHeight.value = !isHorizotal ? props.singleSize : (res.height / res.width) * singleWidth.value;
		},
		fail: () => {
			getComponentWidth();
		}
	});
};
// 获取组件的宽度
const getComponentWidth = async () => {
	// 延时一定时间，以获取dom尺寸
	await sleep(30);
	// #ifndef APP-NVUE
	$uGetRect('.zx-album__row').then((size) => {
		singleWidth.value = size.width * singlePercent.value;
	});
	// #endif

	// #ifdef APP-NVUE
	// 这里ref="zx-album__row"所在的标签为通过for循环出来，导致$refs['zx-album__row']是一个数组
	const ref = proxy.$refs['zx-album__row'][0];
	ref &&
		dom.getComponentRect(ref, (res) => {
			singleWidth.value = res.size.width * singlePercent.value;
		});
	// #endif
};
const sleep = (value = 30) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, value);
	});
};
const testObject = (value) => {
	return Object.prototype.toString.call(value) === '[object Object]';
};
</script>

<style lang="scss" scoped>
.zx-album {
	display: flex;
	flex-direction: column;

	&__row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		&__wrapper {
			position: relative;

			&__text {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.3);
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>

<template>
	<view class="u-rate" :id="elId" ref="u-rate" :style="[customStyle]">
		<view class="u-rate__content" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
			<view class="u-rate__content__item" v-for="(item, index) in Number(count)" :key="index" :class="[elClass]">
				<view class="u-rate__content__item__icon-wrap" ref="u-rate__content__item__icon-wrap" @tap.stop="clickHandler($event, index + 1)">
					<zx-icon
						:name="value > index ? activeIcon : inactiveIcon"
						:color="disabled ? '#c8c9cc' : value > index ? activeColor : inactiveColor"
						:custom-style="{
							'padding-left': parseInt(gutter) / 2,
							'padding-right': parseInt(gutter) / 2
						}"
						:size="size"
					></zx-icon>
				</view>
				<view
					v-if="allowHalf"
					@tap.stop="clickHandler($event, index + 1)"
					class="u-rate__content__item__icon-wrap u-rate__content__item__icon-wrap--half"
					:style="[
						{
							width: parseInt(rateWidth) / 2
						}
					]"
					ref="u-rate__content__item__icon-wrap"
				>
					<zx-icon
						:name="value > index ? activeIcon : inactiveIcon"
						:color="disabled ? '#c8c9cc' : value > index ? activeColor : inactiveColor"
						:custom-style="{
							'padding-left': parseInt(gutter) / 2,
							'padding-right': parseInt(gutter) / 2
						}"
						:size="size"
					></zx-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, watch } from 'vue';

// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif

const { proxy } = getCurrentInstance();

/**
 * rate 评分
 * @description 该组件一般用于满意度调查，星型评分的场景
 * @tutorial https://zxui.org/components/rate
 * @property {String | Number}	value			用于v-model双向绑定选中的星星数量 (默认 1 )
 * @property {String | Number}	count			最多可选的星星数量 （默认 5 ）
 * @property {Boolean}			disabled		是否禁止用户操作 （默认 false ）
 * @property {Boolean}			readonly		是否只读 （默认 false ）
 * @property {String | Number}	size			星星的大小，单位px （默认 18 ）
 * @property {String}			inactiveColor	未选中星星的颜色 （默认 '#b2b2b2' ）
 * @property {String}			activeColor		选中的星星颜色 （默认 '#FA3534' ）
 * @property {String | Number}	gutter			星星之间的距离 （默认 4 ）
 * @property {String | Number}	minCount		最少选中星星的个数 （默认 1 ）
 * @property {Boolean}			allowHalf		是否允许半星选择 （默认 false ）
 * @property {String}			activeIcon		选中时的图标名，（默认 'star-fill' ）
 * @property {String}			inactiveIcon	未选中时的图标名， （默认 'star' ）
 * @property {Boolean}			touchable		是否可以通过滑动手势选择评分 （默认 'true' ）
 * @property {Object}			customStyle		组件的样式，对象形式
 * @event {Function} change 选中的星星发生变化时触发
 * @example <zx-rate :count="count" :value="2"></zx-rate>
 */

const props = defineProps({
	// 用于v-model双向绑定选中的星星数量
	value: {
		type: [String, Number],
		default: 1
	},
	// 要显示的星星数量
	count: {
		type: [String, Number],
		default: 5
	},
	// 是否不可选中
	disabled: {
		type: Boolean,
		default: false
	},
	// 是否只读
	readonly: {
		type: Boolean,
		default: false
	},
	// 星星的大小，单位rpx
	size: {
		type: [String, Number],
		default: '36rpx'
	},
	// 未选中时的颜色
	inactiveColor: {
		type: String,
		default: '#b2b2b2'
	},
	// 选中的颜色
	activeColor: {
		type: String,
		default: '#FA3534'
	},
	// 星星之间的间距，单位rpx
	gutter: {
		type: [String, Number],
		default: '8rpx'
	},
	// 最少能选择的星星个数
	minCount: {
		type: [String, Number],
		default: 1
	},
	// 是否允许半星
	allowHalf: {
		type: Boolean,
		default: false
	},
	// 选中时的图标(星星)
	activeIcon: {
		type: String,
		default: 'star-fill'
	},
	// 未选中时的图标(星星)
	inactiveIcon: {
		type: String,
		default: 'star'
	},
	// 是否可以通过滑动手势选择评分
	touchable: {
		type: Boolean,
		default: true
	},
	currentIndex: {
		type: Number,
		default: 0
	},
	customStyle: {
		type: Object,
		default: ()=>{
			return {}
		}
	}
});

// 生成一个唯一id，否则一个页面多个评分组件，会造成冲突
const elId = proxy.$util.getNonceStr();
const elClass = proxy.$util.getNonceStr();
const rateBoxLeft = ref(0); // 评分盒子左边到屏幕左边的距离，用于滑动选择时计算距离
const activeIndex = ref(0);
activeIndex.value = props.value;
const rateWidth = ref(0); // 每个星星的宽度
// 标识是否正在滑动，由于iOS事件上touch比click先触发，导致快速滑动结束后，接着触发click，导致事件混乱而出错
const moving = ref(false);

const init = () => {
	proxy.$util.sleep().then(() => {
		getRateItemRect();
		getRateIconWrapRect();
	});
};
// 获取评分组件盒子的布局信息
const getRateItemRect = async () => {
	await proxy.$util.sleep();
	// uView封装的获取节点的方法，详见文档
	// #ifndef APP-NVUE
	/* $uGetRect('#' + elId.value).then(res => {
				rateBoxLeft.value = res.left;
			}); */
	// #endif
	// #ifdef APP-NVUE
	dom.getComponentRect(proxy.$refs['u-rate'], res => {
		rateBoxLeft.value = res.size.left;
	});
	// #endif
};
// 获取单个星星的尺寸
const getRateIconWrapRect = () => {
	// uView封装的获取节点的方法，详见文档
	// #ifndef APP-NVUE
	/* $uGetRect('.' + elClass.value).then(res => {
				rateWidth.value = res.width;
			}); */
	// #endif
	// #ifdef APP-NVUE
	dom.getComponentRect(proxy.$refs['u-rate__content__item__icon-wrap'][0], res => {
		rateWidth.value = res.size.width;
	});
	// #endif
};
// 手指滑动
const touchMove = e => {
	// 如果禁止通过手动滑动选择，返回
	if (!props.touchable) {
		return;
	}
	preventEvent(e);
	const x = e.changedTouches[0].pageX;
	getActiveIndex(x);
};
// 停止滑动
const touchEnd = e => {
	// 如果禁止通过手动滑动选择，返回
	if (!props.touchable) {
		return;
	}
	//preventEvent(e);
	const x = e.changedTouches[0].pageX;
	getActiveIndex(x);
};
// 通过点击，直接选中
const clickHandler = (e, index) => {
	// ios上，moving状态取消事件触发
	if (proxy.$util.os() === 'ios' && moving.value) {
		return;
	}
	//preventEvent(e);
	let x = 0;
	// 点击时，在nvue上，无法获得点击的坐标，所以无法实现点击半星选择
	// #ifndef APP-NVUE
	x = e.changedTouches[0].pageX;
	// #endif
	// #ifdef APP-NVUE
	// nvue下，无法通过点击获得坐标信息，这里通过元素的位置尺寸值模拟坐标
	x = index * rateWidth.value + rateBoxLeft.value;
	// #endif
	getActiveIndex(x, true);
	proxy.$emit('onClick',{index:props.currentIndex,value:index});
};
// 发出事件
const emitEvent = () => {
	// 发出change事件
	props.$emit('change', activeIndex.value);
	// 同时修改双向绑定的value的值
	props.$emit('input', activeIndex.value);
};
// 获取当前激活的评分图标
const getActiveIndex = (x, isClick = false) => {
	if (props.disabled || props.readonly) {
		return;
	}
	// 判断当前操作的点的x坐标值，是否在允许的边界范围内
	const allRateWidth = rateWidth.value * props.count + rateBoxLeft.value;
	// 如果小于第一个图标的左边界，设置为最小值，如果大于所有图标的宽度，则设置为最大值
	x = range(rateBoxLeft.value, allRateWidth, x) - rateBoxLeft.value;
	// 滑动点相对于评分盒子左边的距离
	const distance = x;
	// 滑动的距离，相当于多少颗星星
	let index;
	// 判断是否允许半星
	if (props.allowHalf) {
		index = Math.floor(distance / rateWidth.value);
		// 取余，判断小数的区间范围
		const decimal = distance % rateWidth.value;
		if (decimal <= rateWidth.value / 2 && decimal > 0) {
			index += 0.5;
		} else if (decimal > rateWidth.value / 2) {
			index++;
		}
	} else {
		index = Math.floor(distance / rateWidth.value);
		// 取余，判断小数的区间范围
		const decimal = distance % rateWidth.value;
		// 非半星时，只有超过了图标的一半距离，才认为是选择了这颗星
		if (isClick) {
			if (decimal > 0) index++;
		} else {
			if (decimal > rateWidth.value / 2) index++;
		}
	}
	activeIndex.value = Math.min(index, props.count);
	// 对最少颗星星的限制
	if (activeIndex.value < props.minCount) {
		activeIndex.value = props.minCount;
	}

	// 设置延时为了让click事件在touchmove之前触发
	setTimeout(() => {
		moving.value = true;
	}, 10);
	// 一定时间后，取消标识为移动中状态，是为了让click事件无效
	setTimeout(() => {
		moving.value = false;
	}, 10);
	/**
	 * @description 如果value小于min，取min；如果value大于max，取max
	 * @param {number} min
	 * @param {number} max
	 * @param {number} value
	 */
	
};

const range=(min = 0, max = 0, value = 0)=> {
		return Math.max(min, Math.min(max, Number(value)))
	}
	
init();
</script>

<style lang="scss" scoped>
$u-rate-margin: 0 !default;
$u-rate-padding: 0 !default;
$u-rate-item-icon-wrap-half-top: 0 !default;
$u-rate-item-icon-wrap-half-left: 0 !default;

.u-rate {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: $u-rate-margin;
	padding: $u-rate-padding;
	/* #ifndef APP-NVUE */
	touch-action: none;
	/* #endif */

	&__content {
		display: flex;
		flex-direction: row;

		&__item {
			position: relative;

			&__icon-wrap {
				&--half {
					position: absolute;
					overflow: hidden;
					top: $u-rate-item-icon-wrap-half-top;
					left: $u-rate-item-icon-wrap-half-left;
				}
			}
		}
	}
}

.u-icon {
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	/* #endif */
}
</style>

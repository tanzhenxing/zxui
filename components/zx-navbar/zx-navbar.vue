<template>
	<view class="zx-navbar">
		<!-- 固定在顶部时的占位 -->
		<view v-if="fixed && placeholder" class="zx-navbar__placeholder" :style="{ height: barHeight }"></view>
		<view :class="[fixed && 'zx-navbar--fixed']">
			<zx-status-bar v-if="safeAreaInsetTop" :bgColor="bgColor"></zx-status-bar>
			<view class="zx-navbar__content" :class="[border && 'zx-border-bottom']" :style="{ height: height, backgroundColor: bgColor }">
				<view v-if="autoBack" class="zx-navbar__content__left" hover-class="zx-navbar__content__left--hover" hover-start-time="150" @tap="leftClick">
					<slot name="left">
						<zx-icon v-if="leftIcon" :name="leftIcon" :size="leftIconSize" :color="leftIconColor"></zx-icon>
						<text v-if="leftText" :style="{ color: leftIconColor }" class="zx-navbar__content__left__text">{{ leftText }}</text>
					</slot>
				</view>
				<slot name="center">
					<text class="zx-line-1 zx-navbar__content__title" :style="[{ width: titleWidth }, titleStyle]">{{ title }}</text>
				</slot>
				<view v-if="$slots.right || rightIcon || rightText" class="zx-navbar__content__right" @tap="rightClick">
					<slot name="right">
						<zx-icon v-if="rightIcon" :name="rightIcon" size="20"></zx-icon>
						<text v-if="rightText" class="zx-navbar__content__right__text">{{ rightText }}</text>
					</slot>
				</view>
			</view>
		</view>
		<zx-line v-if="border" :color="borderColor"></zx-line>
	</view>
</template>

<script setup>
/**
 * Navbar 自定义导航栏
 * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uni-app带的导航栏。
 * @tutorial https://zxui.org/components/navbar
 * @property {Boolean}			safeAreaInsetTop	是否开启顶部安全区适配  （默认 true ）
 * @property {Boolean}			placeholder			固定在顶部时，是否生成一个等高元素，以防止塌陷 （默认 false ）
 * @property {Boolean}			fixed				导航栏是否固定在顶部 （默认 false ）
 * @property {Boolean}			border				导航栏底部是否显示下边框 （默认 false ）
 * @property {String}			leftIcon			左边返回图标的名称
 * @property {String}			leftText			左边的提示文字
 * @property {String}			rightText			右边的提示文字
 * @property {String}			rightIcon			右边返回图标的名称
 * @property {String}			title				导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String}			bgColor				导航栏背景设置 （默认 '#ffffff' ）
 * @property {String | Number}	titleWidth			导航栏标题的最大宽度，内容超出会以省略号隐藏 （默认 '400rpx' ）
 * @property {String | Number}	height				导航栏高度(不包括状态栏高度在内，内部自动加上)（默认 '44px' ）
 * @property {String | Number}	leftIconSize		左侧返回图标的大小（默认 20px ）
 * @property {String | Number}	leftIconColor		左侧返回图标的颜色（默认 #303133 ）
 * @property {Boolean}	        autoBack			点击左侧区域(返回图标)，是否自动返回上一页（默认 false ）
 * @property {Object | String}	titleStyle			标题的样式，对象或字符串
 * @event {Function} leftClick		点击左侧区域
 * @event {Function} rightClick		点击右侧区域
 * @example <zx-navbar title="标题内容" left-text="返回" right-text="帮助" @click-left="onClickBack" @click-right="onClickRight"></zx-navbar>
 */
import { ref, getCurrentInstance, onMounted } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 是否开启顶部安全区适配
	safeAreaInsetTop: {
		type: Boolean,
		default: true
	},
	// 固定在顶部时，是否生成一个等高元素，以防止塌陷
	placeholder: {
		type: Boolean,
		default: false
	},
	// 是否固定在顶部
	fixed: {
		type: Boolean,
		default: false
	},
	// 是否显示下边框
	border: {
		type: Boolean,
		default: false
	},
	borderColor: {
		type: String,
		default: '#ececec'
	},
	// 左边的图标
	leftIcon: {
		type: String,
		default: 'arrow-left'
	},
	// 左边的提示文字
	leftText: {
		type: String,
		default: ''
	},
	// 左右的提示文字
	rightText: {
		type: String,
		default: ''
	},
	// 右边的图标
	rightIcon: {
		type: String,
		default: ''
	},
	// 标题
	title: {
		type: [String, Number],
		default: ''
	},
	// 背景颜色
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	// 标题的宽度
	titleWidth: {
		type: [String, Number],
		default: '400rpx'
	},
	// 导航栏高度
	height: {
		type: String,
		default: '44px'
	},
	// 左侧返回图标的大小
	leftIconSize: {
		type: [String, Number],
		default: '36rpx'
	},
	// 左侧返回图标的颜色
	leftIconColor: {
		type: String,
		default: '#303133'
	},
	// 点击左侧区域(返回图标)，是否自动返回上一页
	autoBack: {
		type: Boolean,
		default: true
	},
	// 标题的样式，对象或字符串
	titleStyle: {
		type: [String, Object],
		default: null
	}
});

const barHeight = ref(null);

onMounted(() => {
	let sys = uni.getSystemInfoSync();
	barHeight.value = sys.statusBarHeight + uni.upx2px(parseInt(props.height)) + 'px';
});

// 点击左侧区域
const leftClick = () => {
	// 如果配置了autoBack，自动返回上一页
	proxy.$emit('leftClick');
	if (this.autoBack) {
		uni.navigateBack();
	}
};
// 点击右侧区域
const rightClick = () => {
	proxy.$emit('rightClick');
};
</script>

<style lang="scss" scoped>
.zx-navbar {
	&--fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 11;
	}

	&__content {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 44px;
		background-color: #9acafc;
		position: relative;
		justify-content: center;

		&__left,
		&__right {
			padding: 0 13px;
			position: absolute;
			top: 0;
			bottom: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		&__left {
			left: 0;

			&--hover {
				opacity: 0.7;
			}

			&__text {
				font-size: 32rpx;
				margin-left: 10rpx;
			}
		}

		&__title {
			text-align: center;
			font-size: 16px;
			color: '#333333';
		}

		&__right {
			right: 0;

			&__text {
				font-size: 15px;
				margin-left: 3px;
			}
		}
	}
}
</style>

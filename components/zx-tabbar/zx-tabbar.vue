<template>
	<view>
		<view class="zx-tabbar" :style="[tabbarStyle, customStyle]">
			<template v-for="(item, index) in items" :key="index">
				<view class="zx-tabbar-item" :style="customStyle" @click.stop="clickItem(index)">
					<zx-badge type="primary" max="99" text="" :isDot="false" absolute="rightTop" bgColor="#ff0000">
						<view style="display: flex;flex-direction: column;align-items: center;">
							<zx-icon v-if="item.icon" :name="item.icon" :color="tabbarIndex === index ? activeColor : inactiveColor" size="45rpx"></zx-icon>
							<zx-text :text="item.title" :color="tabbarIndex === index ? activeColor : inactiveColor" lines="1" size="26rpx" lineHeight="40rpx"></zx-text>
						</view>
					</zx-badge>
				</view>
			</template>
		</view>
		<view :style="placeholderStyle"></view>
	</view>
</template>

<script setup>
/**
 * Tabbar 底部导航栏
 * @description 此组件提供了自定义tabbar的能力。
 * @tutorial https://zxui.org/components/tabbar
 * @property {String | Number}	value				当前匹配项的name
 * @property {Boolean}			safeAreaInsetBottom	是否为iPhoneX留出底部安全距离（默认 true ）
 * @property {Boolean}			border				是否显示上方边框（默认 true ）
 * @property {String | Number}	zIndex				元素层级z-index（默认 1 ）
 * @property {String}			activeColor			选中标签的颜色（默认 '#1989fa' ）
 * @property {String}			inactiveColor		未选中标签的颜色（默认 '#7d7e80' ）
 * @property {Boolean}			fixed				是否固定在底部（默认 true ）
 * @property {Boolean}			placeholder			fixed定位固定在底部时，是否生成一个等高元素防止塌陷（默认 true ）
 * @property {Object}			customStyle			定义需要用到的外部样式
 */
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 当前匹配项的name
	value: {
		type: [String, Number, null],
		default: null
	},
	currentIndex: {
		type: Number,
		default: 0
	},
	// 是否为iPhoneX留出底部安全距离
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	},
	// 是否显示上方边框
	border: {
		type: Boolean,
		default: true
	},
	// 元素层级z-index
	zIndex: {
		type: [String, Number],
		default: 100
	},
	// 选中标签的颜色
	activeColor: {
		type: String,
		default: '#ff0000'
	},
	// 未选中标签的颜色
	inactiveColor: {
		type: String,
		default: '#7d7e80'
	},
	// 是否固定在底部
	fixed: {
		type: Boolean,
		default: true
	},
	// fixed定位固定在底部时，是否生成一个等高元素防止塌陷
	placeholder: {
		type: Boolean,
		default: true
	},
	height: {
		type: String,
		default: '100rpx'
	},
	items: {
		type: Array,
		default: () => {
			return [];
		}
	},
	customStyle: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const tabbarIndex = ref(0);
tabbarIndex.value = props.currentIndex;

const tabbarStyle = computed(() => {
	const style = {
		zIndex: props.zIndex,
		height: props.height
	};
	if (props.fixed) {
		style.position = 'fixed';
		style.bottom = 0;
		style.left = 0;
		style.paddingBottom = 'constant(safe-area-inset-bottom)';
		style.paddingBottom = 'env(safe-area-inset-bottom)';
	}
	if (props.border) {
		style.borderTop = '1rpx solid #ececec';
	}
	return style;
});
const placeholderStyle = computed(() => {
	return { height: props.height, paddingBottom: 'constant(safe-area-inset-bottom)', paddingBottom: 'env(safe-area-inset-bottom)' };
});

const clickItem = index => {
	tabbarIndex.value = index;
	proxy.$emit('change', index);
};
</script>

<style lang="scss" scoped>
.zx-tabbar {
	flex: 1;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
	background-color: #ffffff;
}
.zx-tabbar-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex: 1;
}

/* #ifdef MP */
// 小程序都使用shadow DOM形式实现，需要给影子宿主设置flex: 1才能让其撑开
:host {
	flex: 1;
}
/* #endif */
</style>

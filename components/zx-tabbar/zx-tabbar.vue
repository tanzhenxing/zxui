<template>
	<view>
		<view class="zx-tabbar" :style="[tabbarStyle,customStyle]">
			<template v-for="(item,index) in items" :key="index">
				<zx-tabbar-item :text="item.title" :icon="item.icon" :color="tabbarIndex===index?activeColor:inactiveColor" @click="clickItem(index)"></zx-tabbar-item>
			</template>
		</view>
		<view :style="placeholderStyle"></view>
	</view>
</template>

<script>
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
 *
 * @example <zx-tabbar :value="value2" :placeholder="false" @change="name => value2 = name" :fixed="false" :safeAreaInsetBottom="false"><zx-tabbar-item text="首页" icon="home" dot ></zx-tabbar-item></zx-tabbar>
 */
export default {
	name: 'zx-tabbar',
	props: {
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
			default: ()=>{
				return []
			}
		},
		customStyle: {
			type: Object,
			default: ()=>{
				return {}
			}
		}
	},
	data() {
		return {
			tabbarIndex: 0
		};
	},
	created() {
		this.tabbarIndex = this.currentIndex;
	},
	computed: {
		tabbarStyle() {
			const style = {
				zIndex: this.zIndex,
				height: this.height
			};
			if(this.fixed){
				style.position = 'fixed';
				style.bottom = 0;
				style.left = 0;
				style.paddingBottom = 'constant(safe-area-inset-bottom)';
				style.paddingBottom = 'env(safe-area-inset-bottom)';
			}
			if(this.border){
				style.borderTop = '1rpx solid #ececec';
			}
			return style;
		},
		placeholderStyle(){
			return {height: this.height,paddingBottom: 'constant(safe-area-inset-bottom)',paddingBottom: 'env(safe-area-inset-bottom)'}
		}
	},
	methods: {
		clickItem(index){
			this.tabbarIndex = index;
		}
	}
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
</style>

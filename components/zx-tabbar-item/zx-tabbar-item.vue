<template>
	<view class="zx-tabbar-item" :style="customStyle">
		<zx-badge type="primary" max="99" :text="badge" :isDot="false" absolute="rightTop" bgColor="#ff0000">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<zx-icon v-if="icon" :name="icon" :color="color" size="45rpx"></zx-icon>
				<zx-text :text="text" :color="color" lines="1" size="30rpx" lineHeight="40rpx"></zx-text>
			</view>
		</zx-badge>
	</view>
</template>

<script>
/**
 * 列表图标子项
 * @description 。
 * @tutorial https://zxui.org/components/tabbar
 * @property {String | Number}	name		item标签的名称，作为与zx-tabbar的value参数匹配的标识符
 * @property {String}			icon		内置图标或者绝对路径的图片
 * @property {String | Number}	badge		右上角的角标提示信息
 * @property {Boolean}			dot			是否显示圆点，将会覆盖badge参数（默认 false ）
 * @property {String}			text		描述文本
 * @property {Object | String}	badgeStyle	控制徽标的位置，对象或者字符串形式，可以设置top和right属性（默认 'top: 6px;right:2px;' ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @example <zx-tabbar :value="value2" :placeholder="false" @change="name => value2 = name" :fixed="false" :safeAreaInsetBottom="false"><zx-tabbar-item text="首页" icon="home" dot ></zx-tabbar-item></zx-tabbar>
 */
export default {
	name: 'zx-tabbar-item',
	props: {
	    // item标签的名称，作为与zx-tabbar的value参数匹配的标识符
	    name: {
	        type: [String, Number, null],
	        default: ''
	    },
		color: {
			icon: String,
			default: ''
		},
	    // uView内置图标或者绝对路径的图片
	    icon: {
	        icon: String,
	        default: ''
	    },
	    // 右上角的角标提示信息
	    badge: {
	        type: [String, Number, null],
	        default: ''
	    },
	    // 是否显示圆点，将会覆盖badge参数
	    dot: {
	        type: Boolean,
	        default: false
	    },
	    // 描述文本
	    text: {
	        type: String,
	        default: ''
	    },
	    // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
	    badgeStyle: {
	        type: [Object, String],
	        default: ''
	    },
		item: {
			type: Object,
			default: ()=>{
				return {}
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
		return {};
	},
	created() {

	},
	methods: {
		clickHandler(item) {
			this.$emit('click', item);
		}
	}
};
</script>

<style lang="scss" scoped>
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

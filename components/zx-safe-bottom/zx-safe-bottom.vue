<template>
	<view class="zx-safe-bottom" :style="[style]" :class="[!isNvue && 'zx-safe-area-inset-bottom']"></view>
</template>

<script>
	/**
	 * SafeBottom 底部安全区
	 * @description 这个适配，主要是针对IPhone X等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配。
	 * @tutorial https://zxui.org/components/safeAreaInset
	 * @property {type}		prop_name
	 * @property {Object}	customStyle	定义需要用到的外部样式
	 * @event {Function()}
	 * @example <zx-status-bar></zx-status-bar>
	 */
	export default {
		name: "zx-safe-bottom",
		data() {
			return {
				safeAreaBottomHeight: 0,
				isNvue: false,
			};
		},
		props: {
			customStyle: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		computed: {
			style() {
				// #ifdef APP-NVUE
				// nvue下，高度使用js计算填充
				this.customStyle.height = uni.getSystemInfoSync().safeAreaInsets.bottom + 'px';
				// #endif
				return this.customStyle;
			},
		},
		mounted() {
			// #ifdef APP-NVUE
			// 标识为是否nvue
			this.isNvue = true;
			// #endif
		},
	};
</script>

<style lang="scss" scoped>
	.zx-safe-bottom {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}
	.zx-safe-area-inset-bottom {
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>

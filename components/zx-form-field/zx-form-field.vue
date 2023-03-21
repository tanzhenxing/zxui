<template>
	<view :class="{'zx-form__field':hidden}">
		<slot></slot>
	</view>
</template>

<script>
	//此组件只为form表单提交传递数据使用，暂时用于微信/百度小程序
	export default {
		name: "zx-form-field",
		// #ifndef VUE3
		behaviors: ['uni://form-field'],
		// #endif
		props: {
			//是否为隐藏域
			hidden: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.zx-form__field {
		display: none;
		opacity: 0;
	}
</style>

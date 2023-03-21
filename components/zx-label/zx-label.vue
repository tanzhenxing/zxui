<template>
	<view class="zx-label__box" :class="{'zx-label__full':isFull}" :style="{padding:padding,margin:margin}"
		@tap.stop="onClick">
		<slot></slot>
	</view>
</template>

<script>
	//该组件主要用于zx-radio，zx-checkbox，zx-switch组件外层，类似label功能
	export default {
		name: "zx-label",
		props: {
			padding: {
				type: String,
				default: '0'
			},
			margin: {
				type: String,
				default: '0'
			},
			isFull: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.childrens = [];
		},
		methods: {
			onClick() {
				if (this.childrens && this.childrens.length > 0) {
					for (let child of this.childrens) {
						child.labelClick()
					}
				}
			}
		}
	}
</script>

<style scoped>
	.zx-label__box {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.zx-label__full {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}
</style>

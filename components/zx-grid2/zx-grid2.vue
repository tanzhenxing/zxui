<template>
	<view class="zx-grids" :class="{'zx-border-top':unlined}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"zx-grid2",
		props: {
			//是否去掉上线条
			unlined: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.zx-grids {
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.zx-grids::after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1px;
		border-top: 1px solid #eaeef1;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.zx-border-top::after {
		border-top: 0 !important;
	}
</style>

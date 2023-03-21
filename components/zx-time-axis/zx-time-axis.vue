<template>
	<view class="zx-timeaxis-class zx-time-axis">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"zx-time-axis",
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.zx-time-axis {
		padding-left: 20px;
		box-sizing: border-box;
		position: relative;
	}

	.zx-time-axis::before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1px solid #ddd;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}
</style>

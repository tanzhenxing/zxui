<template>
	<view class="zx-keyboard-input zx-pwd-box" :style="{backgroundColor:backgroundColor}">
		<view class="zx-inner-box">
			<view class="zx-input" :class="[inputvalue.length===4?'zx-margin-right':'']" :style="{fontSize:size+'rpx',color:color,width:(inputvalue.length===4?90:70)+'rpx' }"
			 v-for="(item,index) in inputvalue" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-keyboard-input",
		props: {
			//背景颜色
			backgroundColor: {
				type: String,
				default: "#fff"
			},
			size: {
				type: Number,
				default: 32
			},
			color: {
				type: String,
				default: "#333"
			},
			//输入框的值：数组格式，长度即为输入框个数
			inputvalue: {
				type: Array,
				default: ["", "", "", "", "", ""] //密码圆点 ●
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.zx-pwd-box {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		vertical-align: top;
	}

	.zx-inner-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.zx-input {
		height: 80rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
		border-bottom: 2px solid #666;
	}

	.zx-margin-right {
		margin-right: 30rpx;
	}

	.zx-input:last-child {
		margin-right: 0 !important;
	}
</style>

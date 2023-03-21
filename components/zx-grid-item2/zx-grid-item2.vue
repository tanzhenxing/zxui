<template>
	<view class="zx-grid" :class="[bottomLine?'':'zx-grid-bottom',border?'':'zx-grid__unlined','zx-grid-'+(cell<2?3:cell)]" :hover-class="hover?'zx-item-hover':''"
	 :hover-stay-time="150" :style="{backgroundColor:backgroundColor}" @tap="handleClick">
		<view class='zx-grid-bg'>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-grid-item2",
		emits: ['click'],
		props: {
			cell: {
				type: [Number,String],
				default: 3
			},
			backgroundColor: {
				type: String,
				default: "#fff"
			},
			//是否有点击效果
			hover: {
				type: Boolean,
				default: true
			},
			//是否需要底部线条
			bottomLine: {
				type: Boolean,
				default: true
			},
			//是否需要纵向边框线条
			border:{
				type: Boolean,
				default: true
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					index: this.index
				});
			}
		}
	}
</script>

<style scoped>
	.zx-grid {
		position: relative;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		background: #fff;
		float: left;
	}
	/* #ifdef MP-BAIDU */
	.zx-grid:active{
		background-color: #f7f7f9;
	}
	/* #endif */

	.zx-grid-2 {
		width: 50%;
	}

	.zx-grid-3 {
		width: 33.333333333%;
	}

	.zx-grid-4 {
		width: 25%;
		padding: 30rpx 20rpx !important;
	}

	.zx-grid-5 {
		width: 20%;
		padding: 20rpx !important;
	}

	.zx-grid-2:nth-of-type(2n)::before {
		width: 0;
		border-right: 0;
	}

	.zx-grid-3:nth-of-type(3n)::before {
		width: 0;
		border-right: 0;
	}

	.zx-grid-4:nth-of-type(4n)::before {
		width: 0;
		border-right: 0;
	}

	.zx-grid-5:nth-of-type(5n)::before {
		width: 0;
		border-right: 0;
	}

	.zx-grid::before {
		content: " ";
		position: absolute;
		right: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-right: 1px solid #eaeef1;
		-webkit-transform-origin: 100% 0;
		transform-origin: 100% 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}
	
	.zx-grid__unlined::before{
		width: 0 !important;
		border-right: 0 !important;
	}

	.zx-grid::after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #eaeef1;
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.zx-grid-bottom::after {
		height: 0 !important;
		border-bottom: 0 !important
	}

	.zx-grid-bg {
		position: relative;
		padding: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.zx-item-hover {
		background-color: #f7f7f9 !important;
	}
</style>

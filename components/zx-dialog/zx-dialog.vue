<template>
	<view>
		<view v-if="show" class="zx-dialog" :style="{background:backgroundColor,borderRadius:radius}" @tap.stop="stopEvent">
			<view class="zx-dialog__hd">
				<view class="zx-dialog__title" :style="{color:titleColor}">{{title}}
					<slot name="title"></slot>
				</view>
			</view>
			<view class="zx-dialog__bd" :style="{color:contentColor}">
				<slot name="content"></slot>
			</view>
			<view class="zx-dialog__ft">
				<block v-if="buttons && buttons.length">
					<view v-for="(item,index) in buttons" :key="index" :style="{color:item.color || '#333'}" class="zx-dialog__btn" :data-index="index" @tap="buttonTap">{{item.text}}</view>
				</block>
				<slot name="footer" v-else></slot>
			</view>
		</view>
		<view @tap="close" class="zx-dialog__mask" :class="{'zx-mask_hidden':!show}" v-if="mask"></view>
	</view>
</template>

<script>
	export default {
		name:'zx-dialog',
		emits: ['click','close'],
		props: {
			title: {
				type: String,
				default: ''
			},
			maskClosable: {
				type: Boolean,
				default: true
			},
			mask: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: false
			},
			buttons: {
				type: Array,
				default () {
					return []
				}
			},
			backgroundColor:{
				type:String,
				default:'#fff'
			},
			radius:{
				type:String,
				default:'12px'
			},
			titleColor:{
				type:String,
				default:'#333'
			},
			contentColor:{
				type:String,
				default:'#999'
			}
		},
		methods: {
			buttonTap(e) {
				const {
					index
				} = e.currentTarget.dataset;
				this.$emit('click', {
					index,
					item: this.buttons[index]
				});
			},

			close() {
				if (!this.maskClosable) return;
				this.$emit('close', {});
			},

			stopEvent() {}
		}
	}
</script>

<style>
	.zx-dialog {
		position: fixed;
		z-index: 5000;
		top: 50%;
		left: 16px;
		right: 16px;
		transform: translateY(-50%);
		text-align: center;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		max-height: 90%;
	}

	.zx-dialog__hd {
		padding: 32px 24px 16px
	}

	.zx-dialog__title {
		font-weight: 700;
		font-size: 17px;
		line-height: 1.4
	}

	.zx-dialog__bd {
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: 0 24px;
		margin-bottom: 32px;
		font-size: 15px;
		line-height: 1.4;
		word-wrap: break-word;
		-webkit-hyphens: auto;
		hyphens: auto;
	}


	.zx-dialog__ft {
		display: flex;
		position: relative;
		line-height: 56px;
		min-height: 56px;
		font-size: 17px
	}

	.zx-dialog__ft:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid rgba(0, 0, 0, .1);
		transform-origin: 0 0;
		transform: scaleY(.5)
	}

	.zx-dialog__btn {
		display: block;
		flex: 1;
		font-weight: 700;
		text-decoration: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		position: relative
	}

	.zx-dialog__btn:active {
		background-color: #ECECEC
	}

	.zx-dialog__btn:first-child::after {
		width: 0;
		border-left: 0;
	}

	.zx-dialog__btn::after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1px solid rgba(0,0,0,.1);
		transform-origin: 0 0;
		transform: scaleX(.5)
	}

	.zx-dialog__mask.zx-mask_hidden {
		opacity: 0;
		transform: scale3d(1, 1, 0)
	}

	.zx-dialog__mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
		opacity: 1;
		transform: scale3d(1, 1, 1);
		transition: all .2s ease-in
	}
</style>
<template>
	<view class="zx-org__node">
		<view class="zx-node__label"
			:class="['zx-org__text-'+(node.align || ''),node.active || collapsed?'zx-node__label-active':'']"
			@tap="handleClick">
			{{ node.text }}
			<view class="zx-org__collapsable" v-if="node.children && node.children.length > 0 && collapsed"></view>
		</view>
		<template v-if="node.children && node.children.length > 0">
			<view class="zx-node__children" :style="{display:collapsed?'none':'flex'}" v-show="!collapsed">
				<zx-org-node v-for="(item,index) in node.children" :key="index" :node="item" :collapsible="collapsible"
					@click="nodeClick">
				</zx-org-node>
			</view>
		</template>
	</view>
</template>

<script>
	//如果未开启easycom模式，请自行引入zx-org-node组件
	export default {
		name: "zx-org-node",
		emits: ['click'],
		options: {
			// #ifdef MP-WEIXIN
			addGlobalClass: true,
			// #endif
			virtualHost: true
		},
		props: {
			node: {
				type: Object,
				default () {
					return {}
				}
			},
			//是否可折叠
			collapsible: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			node(val) {
				if (val.collapsed !== this.collapsed && this.node.children && this.node.children.length > 0) {
					this.collapsed = val.collapsed || false;
				}
			}
		},
		created() {
			this.collapsed = this.node.collapsed || false;
		},
		data() {
			return {
				collapsed: false
			};
		},
		methods: {
			handleClick: function(e) {
				if (this.collapsible && this.node.children && this.node.children.length > 0) {
					this.collapsed = !this.collapsed
				}
				this.$emit('click', this.node)
			},
			nodeClick: function(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.zx-org__node {
		float: left;
		text-align: center;
		position: relative;
		padding: 48rpx 12rpx 0 12rpx;
		transition: all 0.3s;
		box-sizing: border-box;
	}

	.zx-org__node::before {
		content: ' ';
		position: absolute;
		top: 0;
		right: 50%;
		border-top: 1px solid var(--zx-line-color, #555);
		width: 50%;
		height: 48rpx;
	}

	.zx-org__node::after {
		content: ' ';
		position: absolute;
		top: 0;
		right: 50%;
		border-top: 1px solid var(--zx-line-color, #555);
		width: 50%;
		height: 48rpx;
	}

	.zx-org__node::after {
		right: auto;
		left: 50%;
		border-left: 1px solid var(--zx-line-color, #555);
	}

	.zx-org__node:only-child::before {
		display: none;
	}

	.zx-org__node:only-child::after {
		display: none;
	}

	/* #ifndef MP-BAIDU  || MP-QQ || MP-TOUTIAO */
	.zx-org__node:only-child {
		padding-top: 0;
	}

	/* #endif */

	.zx-org__node:first-child::before {
		border: 0;
	}

	.zx-org__node:last-child::after {
		border: 0;
	}

	.zx-org__node:last-child::before {
		border-right: 1px solid var(--zx-line-color, #555);
		border-radius: 0 12rpx 0 0;
	}

	.zx-org__node:first-child::after {
		border-radius: 12rpx 0 0 0;
	}

	.zx-node__children {
		display: flex;
		padding-top: 48rpx;
		position: relative;
		transition: all 0.3s;
	}

	.zx-node__children::before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 50%;
		border-left: 1px solid var(--zx-line-color, #555);
		width: 0;
		height: 48rpx;
	}

	/* #ifdef MP-BAIDU || MP-QQ || MP-TOUTIAO */
	.zx-node__children::after {
		content: ' ';
		position: absolute;
		top: 48rpx;
		left: 0%;
		border-top: 1px solid var(--zx-line-color, #555);
		border-left: 1px solid var(--zx-line-color, #555);
		border-right: 1px solid var(--zx-line-color, #555);
		height: 48rpx;
		width: 100%;
	}
	
	/* #endif */
	.zx-node__label {
		display: inline-block;
		margin: 0;
		text-align: center;
		font-size: var(--zx-org-label-size, 14px);
		border-radius: var(--zx-org-label-radius, 2px);
		color: var(--zx-org-label-color, #000);
		padding: var(--zx-org-label-padding, 8px);
		border: var(--zx-org-label-border, 1px solid #555);
		background: var(--zx-org-label-bgcolor, #fff);
		font-weight: var(--zx-org-label-weight, 500);
		position: relative;
		transition: all 0.3s;
		flex-shrink: 0;
	}

	.zx-node__label-active {
		background: var(--zx-org-active-bgcolor, #5677fc) !important;
		color: var(--zx-org-active-color, #fff) !important;
		border: var(--zx-org-active-border, 1px solid #5677fc) !important;
	}

	.zx-org__text-vertical {
		/* writing-mode: vertical-lr; */
		width: var(--zx-org-label-width, 20px);
		word-break: break-all;
	}

	.zx-org__text-horizontal {
		white-space: nowrap;
	}

	.zx-org__collapsable {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: var(--zx-collapsable-sign-bgcolor, #fff);
		/* color: var(--zx-collapsable-sign-color, #555); */
		border: var(--zx-collapsable-sign-border, 1px solid #555);
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 100%);
		z-index: 2;
	}

	.zx-org__collapsable::before {
		content: '';
		position: absolute;
		height: 10px;
		width: 1px;
		background-color: var(--zx-collapsable-sign-color, #555);
		left: 50%;
		top: 5px;
		transform: translateX(-50%);
	}

	.zx-org__collapsable::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 1px;
		background-color: var(--zx-collapsable-sign-color, #555);
		top: 50%;
		left: 5px;
		transform: translateY(-50%);
	}
</style>

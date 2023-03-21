<template>
	<view class="zx-collapse" :style="{backgroundColor:bgColor}">
		<view class="zx-collapse-head" :style="{backgroundColor:hdBgColor}" @tap.stop="handleClick">
			<view class="zx-header" :class="{'zx-opacity':disabled}">
				<slot name="title"></slot>
				<view class="zx-collapse-icon zx-icon-arrow" :class="{'zx-icon-active':isOpen}" :style="{color:arrowColor}" v-if="arrow"></view>
			</view>
		</view>
		<view class="zx-collapse-body_box" :style="{backgroundColor:bdBgColor,height:isOpen?height:'0rpx'}">
			<view class="zx-collapse-body" :class="{'zx-collapse-transform':height=='auto','zx-collapse-body_show':isOpen && height=='auto'}">
				<slot name="content"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-collapse",
		emits: ['click'],
		props: {
			//collapse背景颜色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			//collapse-head 背景颜色
			hdBgColor: {
				type: String,
				default: '#fff'
			},
			//collapse-body 背景颜色
			bdBgColor: {
				type: String,
				default: 'transparent'
			},
			//collapse-body实际高度 open时使用
			height: {
				type: String,
				default: 'auto'
			},
			//索引
			index: {
				type: Number,
				default: 0
			},
			//当前索引，index==current时展开
			current: {
				type: Number,
				default: -1
			},
			// 是否禁用
			disabled: {
				type: [Boolean, String],
				default: false
			},
			//是否带箭头
			arrow: {
				type: [Boolean, String],
				default: true
			},
			//箭头颜色
			arrowColor: {
				type: String,
				default: "#333"
			}
		},
		watch: {
			current() {
				this.updateCurrentChange()
			}
		},
		created() {
			this.updateCurrentChange()
		},
		data() {
			return {
				isOpen: false
			};
		},
		methods: {
			updateCurrentChange() {
				this.isOpen = this.index == this.current
			},
			handleClick() {
				if (this.disabled) return;
				this.$emit("click", {
					index: Number(this.index)
				})
			}
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'tuiCollapse';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQ4AA0AAAAABlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEHAAAABoAAAAciRx3B0dERUYAAAP8AAAAHgAAAB4AKQAKT1MvMgAAAaAAAABCAAAAVjxuR/JjbWFwAAAB9AAAAD4AAAFCAA/pq2dhc3AAAAP0AAAACAAAAAj//wADZ2x5ZgAAAkAAAABEAAAARCs1U/toZWFkAAABMAAAADAAAAA2FpaT+mhoZWEAAAFgAAAAHQAAACQHngOFaG10eAAAAeQAAAAPAAAAEAwAAEBsb2NhAAACNAAAAAoAAAAKACIAAG1heHAAAAGAAAAAHwAAACABDwAdbmFtZQAAAoQAAAFJAAACiCnmEVVwb3N0AAAD0AAAACMAAAA1DunpUnjaY2BkYGAAYja/oO54fpuvDNwsDCBwc4/6fzjtwNDNfICpBMjlYGACiQIAGVAKZnjaY2BkYGBu+N/AEMPCAALMBxgYGVABCwBVNgMsAAAAeNpjYGRgYGBhEGQA0QwMTEDMBYQMDP/BfAYACnYBLQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ4xMDf8b2CIYW5gaAAKM4LkANq9C9sAAHjaY2GAABYIdgAAAMAATQB42mNgYGBmgGAZBkYGELAB8hjBfBYGBSDNAoRA/jOG//8hpBQzVCUDIxsDjMnAyAQkmBhQASPDsAcAMCAGoQAAAAAAAAAAAAAAIgAAAAEAQACLA8ACdAAQAAAlASYiBhQXARYyNwE2NCYiBwIA/oYNIBkMAZcNIA0BlwwZIA3uAXoMGSAN/mkMDAGXDSAZDAB42n2QPU4DMRCFn/MHJBJCIKhdUQDa/JQpEyn0CKWjSDbekGjXXnmdSDkBLRUHoOUYHIAbINFyCl6WSZMia+3o85uZ57EBnOMbCv/fJe6EFY7xKFzBETLhKvUX4Rr5XbiOFj6FG9R/hJu4VQPhFi7UGx1U7YS7m9JtywpnGAhXcIon4Sr1lXCN/CpcxxU+hBvUv4SbGONXuIVrZakM4WEwQWCcQWOKDeMCMRwskjIG1qE59GYSzExPN3oRO5s4GyjvV2KXAx5oOeeAKe09t2a+Sif+YMuB1JhuHgVLtimNLiJ0KBtfLJzV3ahzsP2e7ba02L9rgTXH7FENbNT8Pdsz0khsDK+QkjXyMrekElOPaGus8btnKdbzXgiJTrzL9IjHmjR1OvduaeLA4ufyjBx9tLmSPfeoHD5jWQh5v91OxCCKXYY/k9hxGQAAAHjaY2BigAAuMMnIgA5YwKJMjExciUVF+eW6KfnleQAZ0wQyAAAAAAH//wACAAEAAAAMAAAAFgAAAAIAAQADAAMAAQAEAAAAAgAAAAB42mNgYGBkAIKrS9Q5QPTNPer/YTQAQ+0HIAAA) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.zx-collapse-icon {
		font-family: "tuiCollapse" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.zx-icon-arrow:before {
		content: "\e600";
	}

	.zx-icon-arrow {
		font-size: 32rpx;
		transform: rotate(0);
		transform-origin: center center;
		transition: all 0.3s;
		position: absolute;
		top: 50%;
		margin-top: -8px;
		right: 30rpx;
	}

	.zx-arrow-padding {
		padding-right: 62rpx;
		box-sizing: border-box;
	}

	.zx-icon-active {
		transform: rotate(180deg);
		transform-origin: center center;
	}

	.zx-header {
		position: relative;
		z-index: 2;
	}
   .zx-collapse-body_box{
	   transition: all 0.25s;
	   overflow: hidden;
   }
	.zx-collapse-body {
		transition: all 0.25s;
		overflow: hidden;
		position: relative;
		z-index: 1;
	}

	.zx-collapse-transform {
		opacity: 0;
		visibility: hidden;
		-webkit-transform: translateY(-40%);
		transform: translateY(-40%);
	}

	.zx-collapse-body_show {
		opacity: 1;
		visibility: visible;
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}

	.zx-opacity {
		opacity: 0.6;
	}
</style>

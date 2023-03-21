<template>
	<view @touchmove.stop.prevent="stop">
		<view class="zx-select--mask" :class="{'zx-select--mask-show':show}" :style="getStyles" @tap.stop="maskClose">
		</view>
		<view class="zx-select--wrap" :class="{'zx-select--wrap-show':show}"
			:style="{borderTopLeftRadius:radius+'rpx',borderTopRightRadius:radius+'rpx',background:background,zIndex:zIndex}">
			<view class="zx-select--header"
				:style="{background:background,borderTopLeftRadius:radius+'rpx',borderTopRightRadius:radius+'rpx'}">
				<text class="zx-select--header-text"
					:style="{fontSize:titleSize+'rpx',color:titleColor,fontWeight:fontWeight}">{{title}}</text>
				<view class="zx-select--header-close" @tap.stop="handleClose">
					<icon type="clear" color="#ccc" :size="16"></icon>
				</view>
				<view class="zx-select--header-line" :style="{background:dividerColor}"></view>
			</view>
			<scroll-view scroll-y class="zx-select--scroll" :show-scrollbar="false" :style="{height:height+'rpx'}">
				<view class="zx-select--list">
					<view class="zx-select--item" :style="{padding:padding}" @tap="itemClick(index)"
						v-for="(model,index) in itemList" :key="index"
						:class="{'zx-select--reverse':reverse,'zx-select--item-active':highlight}">
						<view class="zx-select--checkbox" :class="{'zx-select--is-checkmark ':isCheckMark}"
							:style="{background:model.checked && !isCheckMark ?checkboxColor:'transparent',borderColor:model.checked && !isCheckMark ?checkboxColor:borderColor}">
							<view class="zx-select--checkmark"
								:style="{borderBottomColor:checkmarkColor,borderRightColor:checkmarkColor}"
								v-if="model.checked"></view>
						</view>
						<view class="zx-select--flex">
							<view class="zx-select--icon-box"
								:class="{'zx-select--icon-ml':!reverse,'zx-select--icon-mr':reverse}"
								:style="{width:iconWidth+'rpx',height:iconWidth+'rpx'}" v-if="model.src">
								<image :src="model.src" :style="{width:iconWidth+'rpx',height:iconWidth+'rpx'}"
									mode="widthFix"></image>
							</view>
							<text class="zx-select--item-text"
								:class="{'zx-select--text-pl':!reverse,'zx-select--text-pr':reverse}"
								:style="{fontSize:size+'rpx',color:color}">{{model.text}}</text>
						</view>
						<view v-if="dividerLine" class="zx-select--item-line"
							:style="{background:dividerColor,left:reverse?0:bottomLeft+'rpx',right:reverse?bottomLeft+'rpx':0}">
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="zx-select--btn-wrap">
				<view class="zx-select--btn" :style="{background:btnBackground}">
					<text class="zx-select--btn" :class="['zx-select--btn-text']" :style="{color:btnColor}"
						@tap.stop="handleClick">{{btnText}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-select",
		emits: ['confirm', 'close'],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			height: {
				type: [Number, String],
				default: 600
			},
			radius: {
				type: [Number, String],
				default: 24
			},
			title: {
				type: String,
				default: '请选择'
			},
			titleSize: {
				type: [Number, String],
				default: 32
			},
			titleColor: {
				type: String,
				default: '#333'
			},
			fontWeight: {
				type: [Number, String],
				default: 400
			},
			multiple: {
				type: Boolean,
				default: false
			},
			background: {
				type: String,
				default: '#fff'
			},
			padding: {
				type: String,
				default: '30rpx'
			},
			//选择框选中后颜色
			checkboxColor: {
				type: String,
				default: '#5677fc'
			},
			borderColor: {
				type: String,
				default: '#ccc'
			},
			isCheckMark: {
				type: Boolean,
				default: false
			},
			checkmarkColor: {
				type: String,
				default: '#fff'
			},
			reverse: {
				type: Boolean,
				default: false
			},
			dividerLine: {
				type: Boolean,
				default: true
			},
			dividerColor: {
				type: String,
				default: '#EEEEEE'
			},
			bottomLeft: {
				type: [Number, String],
				default: 30
			},
			highlight: {
				type: Boolean,
				default: true
			},
			iconWidth: {
				type: [Number, String],
				default: 48
			},
			size: {
				type: [Number, String],
				default: 30
			},
			color: {
				type: String,
				default: '#333'
			},
			btnText: {
				type: String,
				default: '确定'
			},
			btnBackground: {
				type: String,
				default: '#5677fc'
			},
			btnColor: {
				type: String,
				default: '#fff'
			},
			maskBackground: {
				type: String,
				default: 'rgba(0,0,0,.6)'
			},
			maskClosable: {
				type: Boolean,
				default: false
			},
			zIndex: {
				type: [Number, String],
				default: 1000
			}
		},
		computed: {
			getStyles() {
				return `background:${this.maskBackground};z-index:${Number(this.zIndex)-1};`
			}
		},
		watch: {
			list(newVal) {
				this.initData(newVal)
			}
		},
		data() {
			return {
				itemList: [],
				index: -1
			};
		},
		created() {
			this.initData(this.list)
		},
		methods: {
			initData(vals) {
				vals = JSON.parse(JSON.stringify(vals))
				if (vals && vals.length > 0) {
					if (typeof vals[0] !== 'object') {
						vals = vals.map(item => {
							return {
								text: item,
								checked: false
							}
						})
					} else {
						vals.map((item,index) => {
							item.checked = item.checked || false
							if(!this.multiple && item.checked){
								this.index=index
							}
						})
					}
					this.itemList = vals;
				}
			},
			itemClick(index) {
				let vals = [...this.itemList]
				let item = vals[index]
				if (this.multiple) {
					item.checked = !item.checked;
				} else {
					vals.forEach((item, idx) => {
						if (index === idx) {
							item.checked = true
						} else {
							item.checked = false
						}
					})
					this.index = index
				}
				this.itemList = vals;
			},
			handleClick() {
				if (this.multiple) {
					let items = []
					this.itemList.forEach((item, idx) => {
						if (item.checked) {
							items.push(this.list[idx])
						}
					})
					this.$emit('confirm', {
						options: items
					})
				} else {
					let index = this.index;
					this.$emit('confirm', {
						index: index,
						options: index === -1 ? '' : this.list[index]
					})
				}

			},
			maskClose() {
				if (!this.maskClosable) return;
				this.handleClose()
			},
			handleClose() {
				this.$emit('close', {})
			},
			stop() {}
		}
	}
</script>

<style scoped>
	.zx-select--mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		transition: all ease-in-out .3s;
		visibility: hidden;
		opacity: 0;
	}

	.zx-select--mask-show {
		opacity: 1;
		visibility: visible;
	}

	.zx-select--wrap {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
		opacity: 0;
		visibility: hidden;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.zx-select--wrap-show {
		transform: translate3d(0, 0, 0);
		opacity: 1;
		visibility: visible;
	}

	.zx-select--scroll {
		width: 100%;
		flex: 1;
	}

	.zx-select--list {
		width: 100%;
	}

	.zx-select--item {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		flex: 1;
		flex-direction: row;
		align-items: center;
		position: relative;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		position: relative;
	}

	.zx-select--item-line {
		position: absolute;
		bottom: 0;
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 100%;
		z-index: 1;
	}

	.zx-select--item-active:active {
		background: rgba(0, 0, 0, .2);
	}

	.zx-select--flex {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.zx-select--reverse {
		justify-content: space-between;
		flex-direction: row-reverse;
	}

	.zx-select--checkbox {
		font-size: 0;
		color: rgba(0, 0, 0, 0);
		width: 40rpx;
		height: 40rpx;
		border-width: 1px;
		border-style: solid;
		display: inline-flex;
		box-sizing: border-box;
		border-radius: 50%;
		vertical-align: top;
		flex-shrink: 0;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.zx-select--is-checkmark {
		border-width: 0 !important;
		background: transparent !important;
	}

	.zx-select--checkmark {
		width: 20rpx;
		height: 40rpx;
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #FFFFFF;
		border-right-style: solid;
		border-right-width: 3px;
		border-right-color: #FFFFFF;
		box-sizing: border-box;
		transform: rotate(45deg) scale(0.5) translateZ(0);
		transform-origin: 54% 48%;
	}

	.zx-select--item-text {
		word-break: break-all;
		font-weight: normal;
	}

	.zx-select--text-pl {
		padding-left: 20rpx;
	}

	.zx-select--text-pr {
		padding-right: 20rpx;
	}

	.zx-select--icon-box {
		overflow: hidden;
		background-color: #F8F8F8;
		flex-shrink: 0;
	}

	.zx-select--icon-ml {
		margin-left: 20rpx;
	}

	.zx-select--icon-mr {
		margin-right: 20rpx;
	}

	.zx-select--header {
		width: 100%;
		display: flex;
		flex: 1;
		height: 98rpx;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;

	}

	.zx-select--header-line {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 100%;
		z-index: 1;
	}

	.zx-select--header-text {
		text-align: center;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		box-sizing: border-box;
		text-overflow: ellipsis;
		flex: 1;
		padding: 0 88rpx;
	}

	.zx-select--header-close {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 32rpx;
		top: 24rpx;
		text-align: right;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.zx-select--btn-wrap {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 32rpx;
	}

	.zx-select--btn {
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 84rpx;
		border-radius: 44rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		font-size: 30rpx;
		font-weight: normal;
		text-align: center;
	}

	.zx-select--btn-text:active {
		background: rgba(0, 0, 0, .2);
	}
</style>

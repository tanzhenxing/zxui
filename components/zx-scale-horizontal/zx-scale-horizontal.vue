<template>
	<view class="zx-scale__box">
		<view class="zx-scale__pointer"
			:style="{width:pointerWidth+'px',height:pointerWidth+'px',background:pointerColor,top:pointerTop+'px'}"
			v-if="isPointer">
			<view class="zx-scale__triangle"
				:style="{top:pointerWidth+'px',borderLeftWidth:pointerWidth/2+'px',borderRightWidth:pointerWidth/2+'px',borderTopColor:pointerColor,borderTopWidth:pointerWidth+'px'}">
			</view>
		</view>
		<scroll-view :throttle="false" scroll-x scroll-with-animation
			:style="{ width: scrollWidth + 'px', background: backgroundColor, paddingBottom: paddingBottom + 'rpx' }"
			@scroll="handleScroll" :scroll-left="currentLeft">
			<view class="zx-scale__flex">
				<view class="zx-seat__box" :style="{ width: scrollWidth / 2 + 'px' }"></view>
				<view>
					<view class="zx-tickmarks__box" :style="{ height: lHeight + 'rpx',borderLeftColor:lineColor }">
						<view class="zx-scale__flex" v-for="(m, i) in rulerLength" :key="i">
							<view class="zx-tick__marks" v-for="(item, index) in tickMarks" :key="index"
								:style="{ height: getHeight(index, height, mHeight, lHeight), width: singleWidth + 'px',borderRightColor:lineColor }">
							</view>
						</view>
					</view>
					<view class="zx-scale__flex">
						<view class="zx-scale__num"
							:style="{ width: singleWidth * 10 + 'px', fontSize: size + 'rpx', paddingTop: top + 'rpx',color:color }">
							{{ min }}
						</view>
						<view class="zx-scale__num"
							:style="{ width: singleWidth * 10 + 'px', fontSize: size + 'rpx', paddingTop: top + 'rpx',color:color }"
							v-for="(e, i) in rulerLength" :key="i">
							{{ (i + 1) * interval + min }}
						</view>
					</view>
				</view>
				<view class="zx-seat__box" :style="{ width: scrollWidth / 2 - singleWidth * 10 + 'px' }"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'zx-scale-horizontal',
		emits: ['change'],
		props: {
			//默认值
			value: {
				type: Number,
				default: 0
			},
			//刻度尺外层容器宽度/高度 ，默认为屏幕宽度
			width: {
				type: Number,
				default: 0
			},
			//刻度尺外层容器背景色
			backgroundColor: {
				type: String,
				default: '#FEFEFE'
			},
			//刻度尺外层容器 padding-bottom值 rpx
			paddingBottom: {
				type: [Number, String],
				default: 30
			},
			//刻度尺最小值
			min: {
				type: Number,
				default: 0
			},
			//刻度尺最大值
			max: {
				type: Number,
				default: 10
			},
			//标尺每段的间隔，取值必须大于 0，并且可被(max - min)整除
			interval: {
				type: Number,
				default: 1
			},
			//刻度线长度（最短）rpx
			height: {
				type: Number,
				default: 40
			},
			//刻度线长度（中等）rpx
			mHeight: {
				type: Number,
				default: 60
			},
			//刻度线长度（最长）rpx
			lHeight: {
				type: Number,
				default: 80
			},
			//刻度线颜色
			lineColor: {
				type: String,
				default: '#333'
			},
			//单个格子宽度 px
			singleWidth: {
				type: Number,
				default: 8
			},
			//刻度值字体大小
			size: {
				type: [Number, String],
				default: 32
			},
			//刻度值字体颜色
			color: {
				type: String,
				default: '#000'
			},
			//刻度值距离刻度线距离 rpx
			top: {
				type: Number,
				default: 12
			},
			//是否需要指针
			isPointer: {
				type: Boolean,
				default: true
			},
			//刻度尺指针宽度 px
			pointerWidth: {
				type: Number,
				default: 12
			},
			//刻度尺指针颜色
			pointerColor: {
				type: String,
				default: '#5677fc'
			},
			//刻度尺指针top值 px
			pointerTop: {
				type: Number,
				default: -12
			}
		},
		data() {
			return {
				tickMarks: 10,
				rulerLength: 1,
				scrollWidth: 0,
				currentLeft: 0
			};
		},
		created() {
			this.getWidth();
			this.getLength();
		},
		mounted() {
			this.getLeft()
		},
		watch: {
			width(val) {
				this.getWidth();
			},
			max(val) {
				this.getLength();
			},
			min(val) {
				this.getLength();
			},
			value(val) {
				this.getLeft()
			}
		},
		methods: {
			getWidth() {
				if (!this.width) {
					let sys = uni.getSystemInfoSync();
					this.scrollWidth = sys.windowWidth;
				} else {
					this.scrollWidth = this.width;
				}
			},
			getLength() {
				//必须满足整除
				this.rulerLength = parseInt((this.max - this.min) / this.interval);
			},
			getLeft() {
				let value = this.value;
				if (value < this.min) value = this.min;
				if (value > this.max) value = this.max;
				this.currentLeft = this.singleWidth * 10 / this.interval * (value - this.min);
			},
			getHeight(index, height, mHeight, lHeight) {
				let h = height;
				if (index === 4) h = mHeight;
				if (index === 9) h = lHeight;
				return `${h}rpx`;
			},
			handleScroll(e) {
				let scrollLeft = e.detail.scrollLeft;
				let value = this.min + (scrollLeft / this.singleWidth / 10 * this.interval);
				if (value < this.min) value = this.min;
				if (value > this.max) value = this.max;
				this.$emit('change', {
					value: value
				})
			}
		}
	};
</script>

<style scoped>
	.zx-scale__box {
		position: relative;
	}

	.zx-scroll__view {
		display: flex;
	}

	.zx-tickmarks__box {
		display: flex;
		border-left: 1px solid;
		box-sizing: border-box;
		position: relative;
	}

	.zx-scale__flex {
		display: flex;
		box-sizing: border-box;
	}

	.zx-tick__marks {
		border-right: 1px solid;
		box-sizing: border-box;
	}

	.zx-scale__num {
		text-align: center;
		flex-shrink: 0;
		transform: translate(-50%);
		padding-left: 1px;
		box-sizing: border-box;
	}

	.zx-seat__box {
		flex-shrink: 0;
	}

	.zx-scale__pointer {
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		font-size: 0;
		z-index: 10;
	}

	.zx-scale__triangle {
		position: absolute;
		left: 0;
		width: 0;
		height: 0;
		border-top-style: solid;
		border-left-style: solid;
		border-right-style: solid;
		border-left-color: transparent;
		border-right-color: transparent;
		vertical-align: top;
	}
</style>

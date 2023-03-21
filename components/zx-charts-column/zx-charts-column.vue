<template>
	<view class="zx-charts__column-wrap">
		<view class="zx-column__legend" v-if="legend.show">
			<view class="zx-column__legend-item" v-for="(item,index) in dataset" :key="index">
				<view class="zx-legend__circle" :style="{backgroundColor:item.color}"></view>
				<text
					:style="{fontSize:(legend.size || 24)+'rpx',lineHeight:(legend.size || 24)+'rpx',color:legend.color || '#333'}">{{item.name}}</text>
			</view>
		</view>
		<view class="zx-charts__column-box" v-if="xAxis.length>0 && dataset.length>0">
			<scroll-view :scroll-x="scrollable" class="zx-column__scroll-view" :style="{height:scrollViewH+'rpx'}">
				<view :style="{height:(xAxisVal.height || 2) +'rpx'}" v-if="xAxisVal.show"></view>
				<view class="zx-charts__column" :style="{height:height+'rpx'}">
					<view class="zx-column__item"
						:class="{'zx-column__flex-1':!scrollable,'zx-column__flex-column':isStack,'zx-column__item-active':activeIndex===index && clickEffect==1,'zx-column__bar-opacity':clickEffect==2,'zx-column__bar-active':clickEffect==2 && activeIndex==index}"
						:style="{padding:scrollable? (xAxisLine.itemPadding ||'0 30rpx'):'0' }"
						v-for="(item,index) in xAxis" :key="index">
						<view class="zx-column__val"
							v-if="(xAxisVal.show && clickEffect!=2 ) || (xAxisVal.show && clickEffect==2 && activeIndex===index)"
							:style="{color:xAxisVal.color,fontSize:(xAxisVal.size || 24)+'rpx',whiteSpace: xAxisVal.nowrap?'nowrap':'normal'}">
							{{getYAxisVal(index)}}
						</view>
						<view class="zx-column__bar" :class="{'zx-column__bar-round':columnCap==='round'}"
							v-for="(bar,idx) in dataset" :key="idx"
							:style="{width:columnBarWidth+'rpx',borderTopColor:getBarColor(bar.source[index],bar.color,bar.colorFormatter),background:getBarColor(bar.source[index],bar.color,bar.colorFormatter),height:((bar.source[index]-(isStack?(min/dataset.length):min))/splitNumber)*(yAxisLine.itemGap || 60) +'rpx'}"
							@tap.stop="onBarTap(index,idx)">
						</view>
						<view class="zx-column__xAxis-text"
							:style="{color:xAxisLabel.color || '#333',fontSize:(xAxisLabel.size || 24)+'rpx' }">
							{{item}}
						</view>
						<view class="zx-xAxis__tickmarks"
							:style="{height:xAxisTick.height || '12rpx',backgroundColor:xAxisTick.color || '#e3e3e3'}">
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="zx-column__border-left"
				:style="{height:height+(xAxisVal.show?(xAxisVal.height || 2):0)+'rpx',backgroundColor:yAxisLine.color || '#e3e3e3'}">
			</view>
			<view class="zx-xAxis__line" :class="{'zx-line__first':index===0}"
				:style="{bottom:index*(yAxisLine.itemGap || 60)+(xAxisLabel.height || 60)+'rpx',borderTopStyle:index===0?'solid':splitLine.type,borderTopColor:index===0?xAxisLine.color:splitLine.color}"
				v-for="(item,index) in yAxisData" :key="index">
				<text class="zx-yAxis__val"
					:style="{color:item.color || yAxisLabel.color,fontSize:(yAxisLabel.size||24)+'rpx'}"
					v-if="yAxisLabel.show">{{item.value}}</text>
			</view>
		</view>
		<view class="zx-column__tooltip" v-if="tooltip" :class="{'zx-column__tooltip-show':tooltipShow}">
			<view class="zx-tooltip__title">{{xAxis[activeIndex] || ''}}</view>
			<view class="zx-column__tooltip-item" v-for="(item,index) in tooltips" :key="index">
				<view class="zx-legend__circle" :style="{backgroundColor:item.color}"></view>
				<text class="zx-tooltip__val">{{item.name}}</text>
				<text class="zx-tooltip__val zx-tooltip__val-ml">{{item.val}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-charts-column",
		emits: ['click'],
		props: {
			//图例，说明
			legend: {
				type: Object,
				default () {
					return {
						show: false,
						size: 24,
						color: '#333'
					}
				}
			},
			tooltip: {
				type: Boolean,
				default: false
			},
			xAxis: {
				type: Array,
				default () {
					return []
				}
			},
			//默认选中x轴索引
			currentIndex: {
				type: Number,
				default: -1
			},
			//柱状条宽度
			columnBarWidth: {
				type: [Number, String],
				default: 32
			},
			//分割线
			splitLine: {
				type: Object,
				default () {
					return {
						//分割线颜色,不显示则将颜色设置为transparent
						color: "#e3e3e3",
						type: "dashed"
					}
				}
			},
			//x轴刻度线
			xAxisTick: {
				type: Object,
				default () {
					return {
						height: '12rpx',
						//不显示则将颜色设置为transparent
						color: '#e3e3e3'
					}
				}
			},
			//x轴线条
			xAxisLine: {
				type: Object,
				default () {
					return {
						color: '#e3e3e3',
						//x轴item的padding值
						itemPadding: '0 30rpx'
					}
				}
			},
			xAxisLabel: {
				type: Object,
				default () {
					return {
						color: "#333",
						size: 24,
						height: 60
					}
				}
			},
			xAxisVal: {
				type: Object,
				default () {
					return {
						show: false,
						color: "#333",
						size: 24,
						//如果show为true且val显示的时候，height需要设置一定的值保证val能显示完整 rpx
						height: 60
					}
				}
			},
			//y轴数据，如果不传则默认使用min,max值计算
			// {
			// 	value: 0,
			// 	color: "#333"
			// }
			yAxis: {
				type: Array,
				default () {
					return []
				}
			},
			//y轴最小值
			min: {
				type: Number,
				default: 0
			},
			//y轴最大值
			max: {
				type: Number,
				default: 100
			},
			//y轴分段递增数值 
			splitNumber: {
				type: Number,
				default: 20
			},
			yAxisLine: {
				type: Object,
				default () {
					return {
						//不显示则将颜色设置为transparent
						color: '#e3e3e3',
						//y轴item间距 rpx
						itemGap: 60
					}
				}
			},
			yAxisLabel: {
				type: Object,
				default () {
					return {
						show: true,
						color: "#333",
						size: 24
					}
				}
			},
			//是否可滚动
			scrollable: {
				type: Boolean,
				default: false
			},
			//是否堆叠展示
			isStack: {
				type: Boolean,
				default: false
			},
			//柱状条点击效果：1-出现背景，2-高亮显示，其他变暗 3-无效果
			clickEffect: {
				type: Number,
				default: 1
			},
			/*
				 柱状条的端点样式
				 round	向线条的每个末端添加圆形线帽
				 square	向线条的每个末端添加正方形线帽
				*/
			columnCap: {
				type: String,
				default: 'square'
			}
		},
		data() {
			return {
				height: 0,
				scrollViewH: 0,
				sections: 0,
				yAxisData: [],
				activeIndex: -1,
				activeIdx: -1,
				tooltips: [],
				tooltipShow: false,
				timer: null,
				/*========options============*/
				/*
					name: '', 
					color: '',
					source: []
					colorFormatter:Function
				*/
				dataset: [],
				xAxisValFormatter: null
			}
		},
		watch: {
			yAxis(newVal) {
				this.init()
			},
			currentIndex(newVal) {
				if (newVal != this.activeIndex) {
					this.activeIndex = newVal
				}
			}
		},
		created() {
			this.init()
			this.activeIndex = this.currentIndex;
		},
		// #ifndef VUE3
		beforeDestroy() {
			this.clearTimer()
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			this.clearTimer()
		},
		// #endif
		methods: {
			generateArray(start, end) {
				return Array.from(new Array(end + 1).keys()).slice(start);
			},
			getYAxisVal(index) {
				let showVal = '';
				let val = 0;
				if (this.dataset.length === 1) {
					val = this.dataset[0].source[index]
					showVal = val;
				} else if (this.dataset.length > 1) {
					let arr = []
					this.dataset.forEach(item => {
						arr.push(item.source[index])
					})
					val = arr
				}
				if (this.xAxisVal.formatter && typeof this.xAxisVal.formatter === 'function') {
					showVal = this.xAxisVal.formatter(val)
				} else if (this.xAxisValFormatter && typeof this.xAxisValFormatter === 'function') {
					showVal = this.xAxisValFormatter(val)
				}
				return showVal
			},
			getBarColor(val, color, colorFormatter) {
				let bgColor = color;
				if (colorFormatter && typeof colorFormatter === 'function') {
					let formatColor = colorFormatter(val)
					if (formatColor) {
						bgColor = formatColor
					}
				}
				return bgColor
			},
			init() {
				let itemGap = this.yAxisLine.itemGap || 60;
				let sections = this.yAxis.length - 1;
				let yAxis = this.yAxis;
				if (sections <= 0) {
					sections = Math.ceil((this.max - this.min) / this.splitNumber)
					let sectionsArr = this.generateArray(0, sections)

					yAxis = sectionsArr.map(item => {
						return {
							value: item * this.splitNumber + this.min
						}
					})
				}
				this.yAxisData = yAxis;
				this.sections = sections + 1;
				this.height = itemGap * sections;
				const valH = this.xAxisVal.show ? (this.xAxisVal.height || 2) : 0;
				this.scrollViewH = this.height + (this.xAxisLabel.height || 60) + valH;
			},
			clearTimer() {
				clearTimeout(this.timer)
				this.timer = null;
			},
			tooltipHandle(index) {
				let data = [...this.dataset]
				let tooltips = []
				data.forEach(item => {
					let color = item.color;
					if (item.colorFormatter && typeof item.colorFormatter === 'function') {
						color = item.colorFormatter(item.source[index])
					}
					tooltips.push({
						color: color,
						name: item.name,
						val: item.source[index]
					})
				})
				this.tooltips = tooltips;
				this.clearTimer()
				this.tooltipShow = true;
				this.timer = setTimeout(() => {
					this.tooltipShow = false
				}, 5000)
			},
			onBarTap(index, idx) {
				this.activeIndex = index;
				this.activeIdx = idx;
				this.tooltipHandle(index);
				this.$emit('click', {
					datasetIndex: idx,
					sourceIndex: index,
					...this.dataset[idx]
				})
			},
			/*
			dataset：柱状图表数据
			xAxisValFormatter :格式化柱状条顶部value值（此处传值是为了做兼容处理）
			*/
			draw(dataset, xAxisValFormatter) {
				this.xAxisValFormatter = xAxisValFormatter || null;
				this.dataset = dataset || [];
				this.init();
			}
		}
	}
</script>

<style scoped>
	.zx-charts__column-wrap {
		position: relative;
		overflow: visible;
	}

	.zx-charts__column-box {
		position: relative;
		padding-left: 1px;
		box-sizing: border-box;
	}

	.zx-column__scroll-view {
		position: relative;
		z-index: 10;
		box-sizing: border-box;
	}

	.zx-charts__column {
		width: 100%;
		position: relative;
		display: flex;
		align-items: flex-end;
		position: relative;
	}

	.zx-column__between {
		justify-content: space-between;
	}

	.zx-column__item {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		position: relative;
		text-align: center;
		box-sizing: border-box;
		z-index: 10;
		transition: all 0.3s;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-font-smoothing: antialiased;
	}

	.zx-column__bar-opacity {
		opacity: 0.6;
	}

	.zx-column__bar-active {
		/*这里请勿随意将值改为1*/
		opacity: 0.9999;
	}

	.zx-column__flex-1 {
		flex: 1;
	}

	.zx-column__item-active {
		background-color: rgba(0, 0, 0, .1);
		padding-top: 20rpx !important;
	}

	.zx-column__flex-column {
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.zx-xAxis__tickmarks {
		position: absolute;
		right: 0;
		width: 1px;
		transform: translateY(100%);
		bottom: 0;
	}

	.zx-column__bar {
		transition: all 0.3s;
		flex-shrink: 0;
		text-align: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		/* border-top: 1px solid; */
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-font-smoothing: antialiased;
	}

	.zx-column__bar-round {
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
	}

	.zx-column__val {
		width: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		padding-bottom: 12rpx;
		transform: translate(-50%, -100%);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-font-smoothing: antialiased;
		word-break: break-all;
	}

	.zx-column__xAxis-text {
		width: 100%;
		position: absolute;
		left: 50%;
		bottom: 0;
		flex: 1;
		transform: translate(-50%, 100%);
		padding-top: 8rpx;
		word-break: break-all;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-font-smoothing: antialiased;
	}

	.zx-column__border-left {
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		z-index: 11;
	}

	.zx-xAxis__line {
		width: 100%;
		height: 0;
		border-top-width: 1px;
		position: absolute;
		left: 0;
		display: flex;
		align-items: center;
	}

	.zx-line__first {
		z-index: 12;
	}

	.zx-yAxis__val {
		transform: translateX(-100%);
		padding-right: 12rpx;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-font-smoothing: antialiased;
	}

	.zx-column__legend {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.zx-column__legend-item {
		display: flex;
		align-items: center;
		margin-left: 24rpx;
		margin-bottom: 30rpx;
	}

	.zx-legend__circle {
		height: 20rpx;
		width: 20rpx;
		border-radius: 50%;
		margin-right: 8rpx;
		flex-shrink: 0;
	}

	.zx-column__tooltip {
		padding: 30rpx;
		border-radius: 12rpx;
		background-color: rgba(0, 0, 0, .6);
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 20;
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s;
	}

	.zx-column__tooltip-show {
		visibility: visible;
		opacity: 1;
	}

	.zx-tooltip__title {
		font-size: 30rpx;
		color: #fff;
		line-height: 30rpx;
	}

	.zx-column__tooltip-item {
		display: flex;
		align-items: center;
		padding-top: 24rpx;
		white-space: nowrap;
	}

	.zx-tooltip__val {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #fff;
		margin-left: 6rpx;
	}

	.zx-tooltip__val-ml {
		margin-left: 20rpx;
	}
</style>

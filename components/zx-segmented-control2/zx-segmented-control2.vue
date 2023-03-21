<template>
	<view class="zx-segmented__control" :class="{'zx-segmented__disabled':disabled}">
		<view class="zx-segmented__item" v-for="(item,index) in values" :key="index"
			:style="{borderTopLeftRadius:index===0?radius:'0',borderBottomLeftRadius:index===0?radius:'0',borderTopRightRadius:index===values.length - 1?radius:'0',borderBottomRightRadius:index===values.length - 1?radius:'0',borderColor:activeColor,backgroundColor:currentIndex===index?activeColor:'transparent',height:height}"
			:class="{'zx-segmented__first':index===0}" @click="handleClick(index)">
			<text :style="{fontSize:size,color:currentIndex===index?'#fff':activeColor}">{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-segmented-control2",
		emits: ['click'],
		props: {
			values: {
				type: Array,
				default () {
					return []
				}
			},
			current: {
				type: Number,
				default: 0
			},
			activeColor: {
				type: String,
				default: '#5677fc'
			},
			height: {
				type: String,
				default: '56rpx'
			},
			//字体大小
			size: {
				type: String,
				default: '28rpx'
			},
			radius: {
				type: String,
				default: '4px'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				currentIndex: 0
			};
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
				}
			}
		},
		created() {
			this.currentIndex = this.current
		},
		methods: {
			handleClick(index) {
				if (this.currentIndex !== index && !this.disabled) {
					this.currentIndex = index
					this.$emit('click', {
						index: index
					})
				}
			}
		}
	}
</script>

<style scoped>
	.zx-segmented__control {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		overflow: hidden;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
	
	.zx-segmented__item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		transition: all 0.1s linear;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
		border-style: solid;
		border-left-width: 0;
		
		/* #ifdef APP-NVUE */
		border-top-width: 0.5px;
		border-bottom-width: 0.5px;
		border-right-width: 0.5px;
		/* #endif */
		
		/* #ifndef APP-NVUE */
		border-top-width: 1px;
		border-bottom-width: 1px;
		border-right-width: 1px;
		/* #endif */
		
		position: relative;
	}
	
	.zx-segmented__disabled {
		opacity: 0.5;
		/* #ifdef H5 */
		cursor: not-allowed !important;
		/* #endif */
	}
	
	.zx-segmented__first {
		border-left-style: solid;
		/* #ifndef APP-NVUE */
		border-left-width:1px;
		/* #endif */
		
		/* #ifdef APP-NVUE */
		border-left-width: 0.5px;
		/* #endif */
	}
</style>

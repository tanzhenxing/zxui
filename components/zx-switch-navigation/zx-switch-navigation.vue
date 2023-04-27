<template>
	<scroll-view
		:scroll-with-animation="scorllAnimation"
		:scroll-x="true"
		:show-scrollbar="false"
		:class="['zx-scroll-x', isCenter ? 'zx-nav-center' : '']"
		:style="{ width: width + 'rpx' }"
		:scroll-into-view="autoLeft"
		:scroll-left="scrollLeft"
	>
		<view
			class="zx-scroll-x-items zx-columns"
			:id="'tab-' + index + (random + '')"
			:style="{
				width: size == 0 ? 'auto' : size + 'rpx',
				marginRight: margin + 'rpx',
				paddingLeft: padding,
				paddingRight: padding
			}"
			v-for="(item, index) in itemsIn"
			:key="index"
			@tap="change"
			:data-index="index"
		>
			<view class="zx-flex zx-nowrap zx-align-items-start" :class="[textAlign == 'center' ? 'zx-justify-content-center' : '']">
				<text
					class="zx-block zx-border-box"
					:class="[titleClass, index == currentIndexIn ? titleActiveClass : []]"
					:style="{
						textAlign: textAlign,
						lineHeight: lineHeight,
						fontSize: currentIndexIn == index ? activeFontSize : fontSize,
						fontWeight: currentIndexIn == index ? activeFontWeight : ''
					}"
				>
					{{ item.name }}
				</text>
				<view v-if="item.tips">
					<text v-if="item.tips != 'point'" class="zx-nav-tips zx-block" :style="tipsStyle">{{ item.tips }}</text>
					<text v-else class="zx-nav-tips zx-block" :style="tipsStyle + '; width:12rpx; height:12rpx; over-flow:hidden; padding:0rpx; margin-top:10rpx;'"></text>
				</view>
			</view>
			<view class="zx-flex zx-rows" :style="{ justifyContent: activeDirection }">
				<view
					class="nav-active-line"
					:class="currentIndexIn == index ? activeLineClass : []"
					:style="{
						width: activeLineWidth,
						height: activeLineHeight,
						borderRadius: activeLineRadius
					}"
					v-if="currentIndexIn == index"
				></view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
export default {
	name  : "zx-switch-navigation",
	props : {
		width              : {type : Number,  default : 690},
		isCenter           : {type : Boolean, default : false},
		currentIndex       : {type : Number,  default : 0},
		size               : {type : Number,  default : 120},
		fontSize           : {type : String,  default : '28rpx'},
		activeFontSize     : {type : String,  default : '28rpx'},
		items              : {type : Array,   default : function () {return []}},
		activeLineClass    : {type : Array,   default : function () {
			return ['zx-nav-scale','zx-gtbg-blue', 'zx-gtbg-black'];
			}},
		titleClass         : {type : Array,   default : function () {
			return ['zx-primary-text'];
			}},
		titleActiveClass   : {type : Array,   default : function () {
			return ['zx-primary-text'];
			}},
		activeLineHeight   : {type : String,  default : '5rpx'},
		activeLineWidth    : {type : String,  default : "36rpx"},
		activeLineRadius   : {type : String,  default : "0rpx"},
		activeDirection    : {type : String,  default : ""},
		activeFontWeight   : {type : Number,  default : 700},
		margin             : {type : Number,  default : 0},
		textAlign          : {type : String,  default : ''},
		lineHeight         : {type : String,  default : '50rpx'},
		padding            : {type : String,  default : '0rpx'},
		animatie           : {type : Boolean, default : true},
		scorllAnimation    : {type : Boolean, default : true},
		// #ifdef APP-NVUE
		tipsStyle          : {
			type : String,
			default : 'background-color:#FF0000; padding-left:10rpx; padding-right:10rpx; color:#FFFFFF; font-size:22rpx',
		}
		// #endif
		// #ifndef APP-NVUE
		tipsStyle          : {
			type : String,
			default : 'background-color:#FF0000; padding:0 10rpx; color:#FFFFFF; font-size:22rpx'
		}
		// #endif
	},
	data(){
		return {
			currentIndexIn : 0,
			itemsIn        : [],
			random         : 1,
			scrollLeft     : 0,
			scrllTimer     : null,
			autoLeft       : ''
		}
	},
	created:function(){
		this.currentIndexIn = this.currentIndex;
		this.itemsIn        = this.items;
		this.random         = this.randomNum();
	},
	watch:{
		currentIndex : function(value){
			this.currentIndexIn = value;
		},
		currentIndexIn : function(val){
			if(this.scrllTimer != null){clearTimeout(this.scrllTimer);}
			this.scrllTimer = setTimeout(()=>{this.setLeft();}, 200);
		},
		items        : function(value){ this.itemsIn = value; }
	},
	methods:{
		change    : function (e){
			this.currentIndexIn = e.currentTarget.dataset.index;
			this.$emit('change', Number(e.currentTarget.dataset.index))
		},
		randomNum : function () {
			return parseInt(Math.random() * 1000);
		},
		setLeft   : function () {
			if(this.size < 1){
				this.autoLeft = 'tab-'+this.currentIndexIn+''+this.random;
				return ;
			}
			var itemWidth = Number(this.margin) + Number(this.size);
			var left      = (Number(this.currentIndexIn) + 1) * itemWidth - Number(this.width) / 2 - itemWidth / 2;
			var maxLeft   = Number(this.itemsIn.length) * itemWidth - this.width;
			maxLeft       = uni.upx2px(maxLeft - 30);
			left          = uni.upx2px(left);
			if(left > maxLeft){left = maxLeft;}
			if(left < 0){left = 0;}
			this.scrollLeft = left;
		}
	},
	emits : ['change']
}
</script>
<style lang="scss" scoped>
/* 主题色 */
$primaryColor: #008aff;

/* 黑色 */
$dark-l1: rgba(50, 50, 50, 1);
$dark-l2: rgba(55, 55, 55, 1);
$dark-l3: rgba(59, 59, 59, 1);
$dark-l4: rgba(68, 68, 68, 1);
$dark-l5: rgba(100, 100, 100, 1);
$dark-l6: rgba(116, 116, 116, 1);
$dark-l7: rgba(129, 129, 129, 1);
$dark-l8: rgba(150, 150, 150, 1);
$dark-l9: rgba(135, 135, 135, 1);
$dark-l10: rgba(120, 120, 120, 1);

/* 白色 */
$white-l1: rgba(252, 252, 252, 1);
$white-l2: rgba(238, 238, 238, 1);
$white-l3: rgba(222, 222, 222, 1);
$white-l4: rgba(205, 205, 205, 1);
$white-l5: rgba(190, 190, 190, 1);
$white-l6: rgba(175, 175, 175, 1);
$white-l7: rgba(160, 160, 160, 1);
$white-l8: rgba(138, 138, 138, 1);
$white-l9: rgba(120, 120, 120, 1);
$white-l10: rgba(108, 108, 108, 1);

/* 滚动区域 */
/* #ifndef APP-NVUE */
.zx-scroll-x {
	display: flex;
	white-space: nowrap;
}
.zx-scroll-x-item,
.zx-scroll-x-items {
	display: inline-flex;
	vertical-align: top;
}
/* #endif */
/* #ifdef MP-ALIPAY */
.zx-scroll-x {
	display: block;
	white-space: nowrap;
}
/* #endif */
.zx-scroll-x {
	width: 750rpx;
	flex-direction: row;
	overflow: hidden;
}
/* flex 布局 */
.zx-rows,
.zx-row {
	flex-direction: row !important;
}
.zx-columns,
.zx-column {
	flex-direction: column !important;
}
.zx-wrap {
	flex-direction: row !important;
	flex-wrap: wrap !important;
}
.zx-nowrap {
	flex-direction: row !important;
	flex-wrap: nowrap !important;
}
.zx-space-around {
	justify-content: space-around !important;
}
.zx-space-between {
	justify-content: space-between !important;
}
.zx-justify-content-start {
	justify-content: flex-start !important;
}
.zx-justify-content-center {
	justify-content: center !important;
}
.zx-justify-content-end {
	justify-content: flex-end !important;
}
.zx-align-items-start {
	align-items: flex-start !important;
}
.zx-align-items-center {
	align-items: center !important;
}
.zx-align-items-end {
	align-items: flex-end !important;
}
.zx-flex1 {
	flex: 1 !important;
}
/* #ifndef APP-NVUE */
.zx-flex-shrink0 {
	flex-shrink: 0 !important;
}
.zx-flex-shrink1 {
	flex-shrink: 1 !important;
}
/* #endif */
/* 文本对齐 */
.zx-text-left {
	text-align: left;
}
.zx-text-center {
	text-align: center;
}
.zx-text-right {
	text-align: right;
}
.zx-ellipsis {
	overflow: hidden;
}
/* #ifndef APP-NVUE */
.zx-ellipsis {
	white-space: nowrap;
	text-overflow: ellipsis;
}
.zx-block-text,
.zx-block {
	display: block;
}
/* #endif */
/* #ifndef APP-NVUE */
.zx-flex {
	display: flex;
}
.zx-border-box {
	box-sizing: border-box;
}
.zx-body {
	width: 750rpx;
	box-sizing: border-box;
}
/* #endif */
/* 背景色 */
.zx-bg-transparent {
	background-color: rgba(0, 0, 0, 0);
}
.zx-bg-red {
	background-color: #ee0a25 !important;
}
.zx-bg-green {
	background-color: #07c160 !important;
}
.zx-bg-blue {
	background-color: #008aff !important;
}
.zx-bg-orange {
	background-color: #ed6a0c !important;
}
.zx-bg-yellow {
	background-color: #fbde4e !important;
}
.zx-bg-purple {
	background-color: #8a3fd4 !important;
}
.zx-bg-white {
	background-color: #ffffff !important;
}
.zx-bg-black {
	background-color: #2b2e3d !important;
}
.zx-bg-black {
	background-color: #2b2e3d !important;
}
.zx-bg-black2 {
	background-color: #656565 !important;
}
.zx-bg-black3 {
	background-color: #969799 !important;
}
.zx-bg-black4 {
	background-color: #c8c9cc !important;
}
.zx-bg-black-opacity7 {
	background-color: rgba(0, 0, 0, 0.7);
}
.zx-bg-black-opacity5 {
	background-color: rgba(0, 0, 0, 0.5);
}
.zx-bg-black-opacity3 {
	background-color: rgba(0, 0, 0, 0.3);
}
.zx-gtbg-red {
	background-image: linear-gradient(45deg, #ff0066, #d50000) !important;
}
.zx-gtbg-blue {
	background-image: linear-gradient(45deg, #0000ff, #008aff) !important;
}
.zx-gtbg-green {
	background-image: linear-gradient(45deg, #39b55a, #8dc63e) !important;
}
.zx-gtbg-orange {
	background-image: linear-gradient(to right, #f1cf53, #f29c39) !important;
}
.zx-bg-gray {
	background-color: #f8f8f8 !important;
}
.zx-gtbg-black {
	background-image: linear-gradient(to right, #c8c9cc, #333333) !important;
}
.zx-primary-border-color {
	border-color: #ffffff !important;
}
/* 核心文本颜色 */
.zx-primary-text {
	color: $white-l2;
}
.zx-secondary-text {
	color: $white-l3;
}
.zx-third-text {
	color: $white-l5;
}
.zx-primary-color {
	color: rgba(238, 238, 238, 1) !important;
}
.zx-bg-primary {
	background-color: $dark-l4 !important;
}
.zx-color-gray {
	color: $white-l5 !important;
}

.nav-active-line {
	margin-top: 6rpx;
}
.zx-nav-center {
	justify-content: center;
	text-align: center;
}
/* #ifndef APP-NVUE */
@keyframes zx-nav-scale {
	0% {
		transform: scale(0.1);
	}
	100% {
		transform: scale(1);
	}
}
.zx-nav-scale {
	animation: zx-nav-scale 350ms forwards;
}
/* #endif */
.zx-nav-tips {
	text-align: center;
	line-height: 30rpx;
	height: 30rpx;
	border-radius: 50rpx;
	margin-top: 5rpx;
	margin-left: 8rpx;
}
</style>

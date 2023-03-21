<template>
	<zx-popup :show="popupShow" mode="bottom">
		<view class="zx-ap-body zx-bg-white zx-dark-bg-level-3" @tap.stop.prevent="stopfun">
			<view class="zx-ap-header zx-flex zx-row zx-space-between">
				<text class="zx-ap-header-btn zx-block" :class="cancelClass" @tap="close">{{ cancelText }}</text>
				<text class="zx-ap-header-btn zx-block" :class="confirmClass" style="text-align:right;" @tap="confirm">{{ confirmText }}</text>
			</view>
			<picker-view :style="{ height: height + 'rpx' }" :indicator-style="indicatorStyle" :value="defaultVal" @change="change">
				<picker-view-column v-if="level >= 1">
					<view class="zx-picker-item" :style="indicatorStyle" v-for="(item, index) in province" :key="index">
						<text :style="indicatorStyle" class="zx-block zx-picker-item">{{ item.label }}</text>
					</view>
				</picker-view-column>
				<picker-view-column v-if="level >= 2">
					<view class="zx-picker-item" :style="indicatorStyle" v-for="(item, index) in city[defaultVal[0]]" :key="index">
						<text :style="indicatorStyle" class="zx-block zx-picker-item">{{ item.label }}</text>
					</view>
				</picker-view-column>
				<picker-view-column v-if="level >= 3">
					<view class="zx-picker-item" :style="indicatorStyle" v-for="(item, index) in area[defaultVal[0]][defaultVal[1]]" :key="index">
						<text :style="indicatorStyle" class="zx-block zx-picker-item">{{ item.label }}</text>
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</zx-popup>
</template>
<script>
import provinceData from './province.js';
import cityData from './city.js';
import areaData from './area.js';
export default {
	name: 'zx-area-picker',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		indicatorStyle: { type: String, default: 'height:36px; line-height:36px;' },
		cancelText: { type: String, default: '取消' },
		cancelClass: {
			type: Array,
			default: function() {
				return ['zx-color-gray'];
			}
		},
		confirmText: { type: String, default: '确定' },
		confirmClass: {
			type: Array,
			default: function() {
				return ['zx-primary-color'];
			}
		},
		value: {
			type: Array,
			default: function() {
				return ['', '', ''];
			}
		},
		level: { type: Number, default: 3 },
		height: { type: Number, default: 550 },
		zIndex: { type: Number, default: 1000 }
	},
	data() {
		return {
			province: provinceData,
			city: cityData,
			area: areaData,
			defaultVal: [0, 0, 0],
			realshow: false,
			popupShow: false
		};
	},
	watch: {
		value: function(nv, ov) {
			this.setDefault();
		},
		defaultVal: function(nv, ov) {
			if (ov[0] != nv[0]) {
				this.defaultVal.splice(1, 1, 0);
				this.defaultVal.splice(2, 1, 0);
			} else if (ov[1] != nv[1]) {
				this.defaultVal.splice(2, 1, 0);
			}
		}
	},
	created() {
		this.setDefault();
		
		this.popupShow = this.show;
	},
	methods: {
		setDefault: function() {
			if (this.value[0] == '') {
				return;
			}
			this.$nextTick(() => {
				this.defaultVal.splice(0, 1, this.arrayIndexOf(this.province, this.value[0]));
				if (this.value[1] == '') {
					return;
				}
				this.$nextTick(() => {
					this.defaultVal.splice(1, 1, this.arrayIndexOf(this.city[this.defaultVal[0]], this.value[1]));
					if (this.value[2] == '') {
						return;
					}
					this.$nextTick(() => {
						this.defaultVal.splice(2, 1, this.arrayIndexOf(this.area[this.defaultVal[0]][this.defaultVal[1]], this.value[2]));
					});
				});
			});
		},
		arrayIndexOf: function(arr, needFind) {
			var index = 0;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].label == needFind) {
					index = i;
					return i;
				}
			}
			return index;
		},
		change: function(e) {
			var res = e.detail.value;
			if (!res[0]) {
				res[0] = 0;
			}
			if (!res[1]) {
				res[1] = 0;
			}
			if (!res[2]) {
				res[2] = 0;
			}
			this.defaultVal = res;
		},
		confirm: function() {
			var codes = [
				provinceData[this.defaultVal[0]].value,
				cityData[this.defaultVal[0]][this.defaultVal[1]].value,
				areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].value ? areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].value : 0
			];
			var names = [
				provinceData[this.defaultVal[0]].label,
				cityData[this.defaultVal[0]][this.defaultVal[1]].label,
				areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].label ? areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].label : ''
			];
			codes = codes.splice(0, this.level);
			names = names.splice(0, this.level);
			var res = { codes: codes, names: names, indexs: this.defaultVal };
			this.$emit('confirm', res);
			this.popupShow = false;
		},
		open: function() {
			this.popupShow = true;
		},
		close: function() {
			this.popupShow = false;
		},
		stopfun: function(e) {
			e.stopPropagation();
			return null;
		}
	},
	emits: ['confirm']
};
</script>
<style scoped>
	/* 地区联动 */
	.zx-ap-body{padding:0;}
	/* #ifndef APP-NVUE */
	.zx-ap-body{position: relative;}
	/* #endif */
	.zx-ap-header{padding:25rpx;}
	.zx-ap-header-btn{width:200rpx; line-height:38rpx; height:38rpx; font-size:28rpx;}
	.zx-ap-main{width:750rpx; height:500rpx;}
	.zx-ap-item{height:35px; font-size:12px; line-height:35px; overflow:hidden; text-align:center;}
	.zx-bg-white{background-color:#FFFFFF !important;}
	.zx-dark-bg-level-3{background:rgba(127, 127, 127, 1.0) !important;}
	/* #ifndef APP-NVUE */
	.zx-flex{display:flex;}
	.zx-border-box{box-sizing:border-box;}
	.zx-body{width:750rpx; box-sizing:border-box;}
	/* #endif */
	
	/* flex 布局 */
	.zx-rows, .zx-row{flex-direction:row !important;}
	.zx-columns, .zx-column{flex-direction:column !important;}
	.zx-wrap{flex-direction:row !important; flex-wrap:wrap !important;}
	.zx-nowrap{flex-direction:row !important; flex-wrap:nowrap !important;}
	.zx-space-around{justify-content:space-around !important;}
	.zx-space-between{justify-content:space-between !important;}
	.zx-justify-content-start{justify-content:flex-start !important;}
	.zx-justify-content-center{justify-content:center !important;}
	.zx-justify-content-end{justify-content:flex-end !important;}
	.zx-align-items-start{align-items:flex-start !important;}
	.zx-align-items-center{align-items:center !important;}
	.zx-align-items-end{align-items:flex-end !important;}
	.zx-flex1{flex:1 !important;}
	/* #ifndef APP-NVUE */
	.zx-flex-shrink0{flex-shrink:0 !important;}
	.zx-flex-shrink1{flex-shrink:1 !important;}
	/* #endif */
	.zx-block-text, .zx-block{display:block;}
	.zx-picker-item{overflow:hidden; font-size:26rpx; height:36px; line-height:36px; overflow:hidden; text-align:center;}
</style>

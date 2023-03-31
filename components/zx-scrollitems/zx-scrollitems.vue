<template>
	<view :style="{ width: width + 'rpx', overflow: 'hidden' }">
		<zx-touch @thStart="thStart" @thMove="thMove" @thEnd="thEnd">
			<view style="display: flex; flex-direction: row;flex-wrap: nowrap;"
				:style="{
					width: wrapWidth + 'px',
					transform: 'translateX(' + scLeft + 'px)'
				}"
			>
				<view
					class="zx-scrollitems zx-img-in"
					hover-class="zx-tap"
					:style="{
						width: itemWidth + 'rpx',
						height: itemHeight + 'rpx',
						marginRight: itemMargin + 'rpx'
					}"
					v-for="(item, idx) in itemsIn"
					:key="idx"
					@tap="tapme(idx)"
				>
					<image
						:style="{
							width: itemWidth + 'rpx',
							height: itemHeight + 'rpx'
						}"
						:src="item.img"
					></image>
					<text class="zx-scrollitems-title zx-block zx-bg-black-opacity3 zx-border-box" :style="{ width: width + 'rpx' }">{{ item.title }}</text>
				</view>
			</view>
		</zx-touch>
	</view>
</template>
<script>
	
export default {
	name: 'zx-scrollitems',
	props: {
		width: { type: Number, default: 690 },
		itemWidth: { type: Number, default: 345 },
		itemHeight: { type: Number, default: 200 },
		itemMargin: { type: Number, default: 10 },
		items: {
			type: Array,
			default: function() {
				return [];
			}
		},
		duration: { type: Number, default: 25 }
	},
	data() {
		return {
			scLeft: 0,
			resetWidth: 0,
			itemsIn: [],
			timer: null,
			timer2: null,
			speed: 1,
			timer3: null,
			wrapWidth: 5000,
			oX: 0
		};
	},
	created: function() {
		var len = this.items.length;
		this.itemsIn = this.items;
		this.resetWidth = len * (this.itemWidth + this.itemMargin);
		this.resetWidth = uni.upx2px(this.resetWidth);
		this.resetWidth *= -1;
		this.itemsIn = this.itemsIn.concat(this.items);
		this.wrapWidth = len * (this.itemWidth + this.itemMargin) * 2 + 80;
		this.scrollAnimate();
	},
	methods: {
		scrollAnimate: function() {
			if (this.scLeft <= this.resetWidth) {
				this.scLeft = 0;
				this.timer = setTimeout(() => {
					this.scrollAnimate();
				}, this.duration + 200);
			} else {
				this.scLeft -= this.speed;
				this.timer = setTimeout(() => {
					this.scrollAnimate();
				}, this.duration);
			}
		},
		thStart: function(e) {
			clearTimeout(this.timer);
			this.timer = null;
			this.oX = this.scLeft;
		},
		thMove: function(e) {
			clearTimeout(this.timer);
			var tmpleft = this.oX + e[0][0];
			if (tmpleft < this.resetWidth) {
				tmpleft = this.resetWidth;
			}
			if (tmpleft > 0) {
				tmpleft = 0;
			}
			this.scLeft = tmpleft;
		},
		thEnd: function(e) {
			this.timer = null;
			if (this.timer3 != null) {
				clearTimeout(this.timer3);
			}
			this.timer3 = setTimeout(() => {
				this.scrollAnimate();
			}, 500);
		},
		tapme: function(idx) {
			this.$emit('itemTap', this.itemsIn[idx]);
		}
	},
	emits: ['itemTap']
};
</script>
<style lang="scss" scoped>
.zx-scrollitems {
	overflow: hidden;
	position: relative;
}
.zx-scrollitems-title {
	position: absolute;
	z-index: 1;
	left: 0;
	bottom: 0;
	height: 44rpx;
	line-height: 44rpx;
	padding: 0 15rpx;
	overflow: hidden;
	font-size: 22rpx;
	color: #ffffff;
}
.zx-img-in{font-size:0;}
.zx-tap{opacity:0.88;}
.zx-block-text, .zx-block{display:block;}
.zx-bg-black-opacity3{background-color:rgba(0,0,0,0.3);}
.zx-border-box{box-sizing:border-box;}
</style>

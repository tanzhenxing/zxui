<template>
	<view class="content">
		<view class="zx-accordion" :style="{backgroundColor:bgColor}">
			<view hover-class="zx-tap" @tap="toggle">
				<slot name="title">
					<view class="zx-title">
						<view class="zx-flex1">
							<zx-text lines="1" :text="title" :size="titleSize" :color="titleColor"></zx-text>
						</view>
						<view class="zx-icon">
							<zx-icon :name="icon" :color="show?iconColorActive:iconColor" size="50rpx"></zx-icon>
						</view>
					</view>
				</slot>
			</view>
			<view class="zx-fade-in zx-accordion-card-body" v-if="show">
				<slot name="body">
					<view class="zx-item" v-for="(item,index) in items" :key="index" @click="goLink(item)">
						<zx-text :text="title" :color="itemColor" :size="itemSize" :lineHeight="itemLineHeight" lines="1"></zx-text>
						<zx-icon name="arrow-right" :color="iconColor" size="28rpx"></zx-icon>
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'zx-accordion-card',
	props: {
		// 是否为展开状态
		status: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		titleSize: {
			type: Object,
			default: '34rpx'
		},
		titleColor: {
			type: String,
			default: '#303133'
		},
		icon: {
			type: String,
			default: 'list'
		},
		iconColor: {
			type: String,
			default: '#435862'
		},
		iconColorActive: {
			type: String,
			default: '#3c9cff'
		},
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		itemSize: {
			type: String,
			default: '28rpx'
		},
		itemColor: {
			type: String,
			default: '#303133'
		},
		itemLineHeight: {
			type: String,
			default: '100rpx'
		},
		items: {
			type: Array,
			default: function(){
				return [];
			}
		}
	},
	data() {
		return {
			show: false
		};
	},
	mounted: function() {
		this.show = this.status;
	},
	watch: {
		status: function(val) {
			this.show = val;
		}
	},
	methods: {
		toggle: function() {
			if (this.show) {
				this.close();
			} else {
				this.open();
			}
		},
		open: function() {
			this.show = true;
			this.$emit('open');
		},
		close: function() {
			this.show = false;
			this.$emit('close');
		},
		goLink: function(item){
			uni.navigateTo({
				url: item.url
			});
		}
	},
	emits: ['open', 'close']
};
</script>
<style scoped lang="scss">
	.content {
		padding: 20rpx;
	}
	.zx-accordion {
		padding: 20rpx;
		border-radius: 15rpx;
	}
.zx-tap {
	opacity: 0.88;
}
.zx-accordion-card-body {
	padding-bottom: 10rpx;
	padding-top: 10rpx;
}
.zx-title {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
}
.zx-item {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #F2F2F2 !important;
}
.zx-flex1 {
	flex: 1;
}
.zx-icon {
	width: 80rpx;
}
@keyframes zx-fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.zx-fade-in {
	animation: zx-fade-in 200ms ease-in forwards;
}
</style>

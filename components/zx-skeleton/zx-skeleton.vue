<template>
	<view class="zx-skeleton">
		<view v-if="loading" class="wrapper">
			<view v-if="image" class="image" :class="[animate && 'animate']"
				:style="{height: imageSize,width: imageSize,borderRadius:imageRadius}">
			</view>
			<view class="content">
				<view v-if="title" class="title"
					:style="{width: titleWidth,height: titleHeight}"
					:class="[animate && 'animate']">
				</view>
				<view class="rows" :class="[animate && 'animate']"
				v-for="(item, index) in rows" :key="index"
				:style="{width: rowsWidth,height: rowsHeight,marginTop: '10rpx'}">
				</view>
			</view>
		</view>
		<slot v-else />
	</view>
</template>

<script>
/**
 * Skeleton 骨架屏
 * @description 骨架屏用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。
 * @tutorial https://zxui.org/components/skeleton.html
 * @property {Boolean}					loading		是否显示骨架占位图
 * @property {Boolean}					animate		是否开启动画效果
 * @property {String | Number}			rows		段落占位图行数
 * @property String	                    rowsWidth	段落占位图的宽度
 * @property String 	                rowsHeight	段落的高度
 * @property {Boolean}					title		是否展示标题占位图
 * @property {String | Number}			titleWidth	标题的宽度
 * @property {String | Number}			titleHeight	标题的高度
 * @property {Boolean}					image		是否展示图片占位图
 * @property {String | Number}			imageSize	头像占位图大小
 * @property {String}					imageRadius	头像占位图的形状
 * @example 
 */
export default {
	name: 'zx-skeleton',
	data() {
		return {
			width: 0
		};
	},
	props: {
	    // 是否展示骨架组件
	    loading: {
	        type: Boolean,
	        default: true
	    },
	    // 是否开启动画效果
	    animate: {
	        type: Boolean,
	        default: true
	    },
	    // 段落占位图行数
	    rows: {
	        type: [String, Number],
	        default: 0
	    },
	    // 段落占位图的宽度
	    rowsWidth: {
	        type: String,
	        default: '100%'
	    },
	    // 段落占位图的高度
	    rowsHeight: {
	        type: String,
	        default: '40rpx'
	    },
	    // 是否展示标题占位图
	    title: {
	        type: Boolean,
	        default: true
	    },
	    // 段落标题的宽度
	    titleWidth: {
	        type: [String, Number],
	        default: '70%'
	    },
	    // 段落标题的高度
	    titleHeight: {
	        type: String,
	        default: '60rpx'
	    },
	    // 是否展示图片占位图
	    image: {
	        type: Boolean,
	        default: false
	    },
	    // 图片占位图大小
	    imageSize: {
	        type: String,
	        default: '120rpx'
	    },
	    // 图片占位图的圆角
	    imageRadius: {
	        type: String,
	        default: '50%'
	    }
	}
};
</script>

<style lang="scss" scoped>
	@mixin background {
		/* #ifdef APP-NVUE */
		background-color: #F1F2F4;
		/* #endif */
		/* #ifndef APP-NVUE */
		background: linear-gradient(90deg, #F1F2F4 25%, #e6e6e6 37%, #F1F2F4 50%);
		background-size: 400% 100%;
		/* #endif */
	}
	
// #ifndef APP-NVUE
view, scroll-view, swiper-item {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	flex-grow: 0;
	flex-basis: auto;
	align-items: stretch;
	align-content: flex-start;
}
// #endif

.zx-skeleton {
	flex: 1;
	.wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		.image {
			@include background;
			margin-right: 20rpx;
		}

		.content {
			flex: 1;

			.rows {
				@include background;
				border-radius: 5rpx;
			}
			.title {
				@include background;
				border-radius: 10rpx;
				margin-bottom: 15rpx;
			}
		}
	}
}

/* #ifndef APP-NVUE */
.animate {
	animation: skeleton 1.8s ease infinite;
}

@keyframes skeleton {
	0% {
		background-position: 100% 50%;
	}

	100% {
		background-position: 0 50%;
	}
}

/* #endif */
</style>

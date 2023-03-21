<template>
	<view v-if="item" class="zx-product__item" :class="{'zx-flex__list':isList}" hover-class="zx-hover" :hover-start-time="150" @tap="detail(item)">
		<image :src="item.images" class="zx-product__img" :class="{'zx-img__list':isList}" mode="widthFix"></image>
		<view class="zx-product__content">
			<view class="zx-product__title">
				<zx-text :text="item.title" size="32rpx" color="#333333"></zx-text>
			</view>
			<view>
				<view class="zx-product__price">
					<zx-text symbol="$" mode="price" :text="item.price" size="34rpx" :bold="true" color="#e41f19"></zx-text>
					<!-- <zx-text symbol="" mode="price" :text="item.price" decoration="line-through" size="24rpx" color="#a0a0a0"></zx-text> -->
				</view>
				<!-- <view class="zx-product__pay">{{ item.payNum || 0 }}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'zx-goods-item',
		props: {
			// 商品数据对象
			item: {
				type: Object,
				default () {
					return {};
				}
			},
			//是否为列表展示
			isList: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			detail(item) {
				this.$emit('detail',item);
			}
		}
	};
</script>

<style>
	.zx-product__item {
		width: 48.5%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 15rpx;
		overflow: hidden;
		transition: all 0.15s linear;
		margin-bottom: 20rpx;
		padding-top: 10rpx;
	}

	.zx-flex__list {
		display: flex !important;
		margin-bottom: 0 !important;
		position: relative;
	}

	.zx-flex__list::after {
		content: " ";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		z-index: 2;
	}

	.zx-product__img {
		width: 98%;
		display: block;
		background-color: #F1F1F1;
	}

	.zx-img__list {
		width: 260rpx !important;
		height: 260rpx !important;
		border-radius: 12rpx;
		flex-shrink: 0;
	}

	.zx-product__content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.zx-product__title {
		color: #2e2e2e;
		font-size: 26rpx;
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.zx-product__price {
		padding-top: 18rpx;
		display: flex;
	}

	.zx-sale__price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.zx-factory__price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.zx-product__pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>

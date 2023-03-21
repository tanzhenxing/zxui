<template>
	<view class="zx-fav"
		:class="[circle === true || circle === 'true' ? 'circle' : '']"
		:style="[{ backgroundColor: checked ? bgColorChecked : bgColor }]"
		@click="onClick">
		<!-- #ifdef MP-ALIPAY -->
		<view v-if="!checked" class="star">
			<zx-icon :color="fgColor" :style="{ color: checked ? fgColorChecked : fgColor }" size="14" name="star-fill"></zx-icon>
		</view>
		<!-- #endif -->

		<!-- #ifndef MP-ALIPAY -->
		<zx-icon v-if="!checked" :color="fgColor" :style="{ color: checked ? fgColorChecked : fgColor }" class="star" size="14" name="star-fill"></zx-icon>
		<!-- #endif -->

		<text :style="{ color: checked ? fgColorChecked : fgColor }" class="text">{{ checked ? '已收藏' : '收藏' }}</text>
	</view>
</template>

<script>
/**
 * Fav 收藏按钮
 * @description 用于收藏功能，可点击切换选中、不选中的状态
 * @tutorial
 * @property {Boolean}     star             按钮是否带星星
 * @property {String}      bgColor          未收藏时的背景色
 * @property {String}      bgColorChecked   已收藏时的背景色
 * @property {String}      fgColor          未收藏时的文字颜色
 * @property {String}      fgColorChecked   已收藏时的文字颜色
 * @property {Boolean}     circle           是否为圆角
 * @property {Boolean}     checked          是否为已收藏
 * @property {Object}      contentText      收藏按钮文字
 * @event {Function}       click            点击 fav按钮触发事件
 * @example                <zx-fav :checked="true"></zx-fav>
 */
export default {
	name: 'zx-fav',
	emits: ['click'],
	props: {
		star: {
			type: [Boolean, String],
			default: true
		},
		bgColor: {
			type: String,
			default: '#eeeeee'
		},
		fgColor: {
			type: String,
			default: '#666666'
		},
		bgColorChecked: {
			type: String,
			default: '#007aff'
		},
		fgColorChecked: {
			type: String,
			default: '#FFFFFF'
		},
		circle: {
			type: [Boolean, String],
			default: false
		},
		checked: {
			type: Boolean,
			default: false
		},
		contentText: {
			type: Object,
			default() {
				return {
					contentDefault: '',
					contentFav: ''
				};
			}
		}
	},
	computed: {},
	watch: {},
	methods: {
		onClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
$fav-height: 25px;

.zx-fav {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 80px;
	height: $fav-height;
	line-height: $fav-height;
	text-align: center;
	border-radius: 3px;
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */

	.circle {
		border-radius: 30px;
	}

	.star {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: $fav-height;
		line-height: 24px;
		margin-right: 3px;
		align-items: center;
		justify-content: center;
	}

	.text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: $fav-height;
		line-height: $fav-height;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}
}
</style>

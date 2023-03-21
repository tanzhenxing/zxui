<template>
	<view class="zx-cursor-point">
		<view v-if="popMenu && (leftBottom || rightBottom || leftTop || rightTop) && content.length > 0"
			:class="{'zx-fab--leftBottom': leftBottom,'zx-fab--rightBottom': rightBottom,'zx-fab--leftTop': leftTop,'zx-fab--rightTop': rightTop}"
			class="zx-fab" :style="nvueBottom">
			<view :class="{
					'zx-fab__content--left': horizontal === 'left',
					'zx-fab__content--right': horizontal === 'right',
					'zx-fab__content--flexDirection': direction === 'vertical',
					'zx-fab__content--flexDirectionStart': flexDirectionStart,
					'zx-fab__content--flexDirectionEnd': flexDirectionEnd,
					'zx-fab__content--other-platform': !isAndroidNvue
				}"
				:style="{ width: boxWidth, height: boxHeight, backgroundColor: styles.backgroundColor }"
				class="zx-fab__content" elevation="5">
				<view v-if="flexDirectionStart || horizontalLeft" class="zx-fab__item zx-fab__item--first" />
				<view v-for="(item, index) in content" :key="index" :class="{ 'zx-fab__item--active': isShow }" class="zx-fab__item" @click="_onItemClick(index, item)">
					<zx-icon :name="item.active ? item.selectedIcon : item.icon" 
					size="55rpx"
					:color="item.active ? styles.selectedColor : styles.color"
					:labelColor="item.active ? styles.selectedColor : styles.color"
					:label="item.text" space="15rpx"></zx-icon>
				</view>
				<view v-if="flexDirectionEnd || horizontalRight" class="zx-fab__item zx-fab__item--first" />
			</view>
		</view>
		<view :class="{
				'zx-fab__circle--leftBottom': leftBottom,
				'zx-fab__circle--rightBottom': rightBottom,
				'zx-fab__circle--leftTop': leftTop,
				'zx-fab__circle--rightTop': rightTop,
				'zx-fab__content--other-platform': !isAndroidNvue
			}"
			class="zx-fab__circle zx-fab__plus"
			:style="{ 'background-color': styles.buttonColor, bottom: nvueBottom }"
			@click="_onClick"
		>
			<zx-icon class="fab-circle-icon" name="plus" :color="styles.iconColor" size="30" :class="{ 'zx-fab__plus--active': isShow && content.length > 0 }"></zx-icon>
		</view>
	</view>
</template>

<script>
let platform = 'other';
// #ifdef APP-NVUE
platform = uni.getSystemInfoSync().platform;
// #endif

/**
 * Fab 悬浮按钮
 * @description 点击可展开一个图形按钮菜单
 * @tutorial 
 * @property {Object} pattern 可选样式配置项
 * @property {Object} horizontal = [left | right] 水平对齐方式
 * @property {Object} vertical = [bottom | top] 垂直对齐方式
 * @property {Object} direction = [horizontal | vertical] 展开菜单显示方式
 * @property {Array} content 展开菜单内容配置项
 * @property {Boolean} popMenu 是否使用弹出菜单
 * @event {Function} trigger 展开菜单点击事件，返回点击信息
 * @event {Function} fabClick 悬浮按钮点击事件
 */
export default {
	name: 'zx-fab',
	emits: ['fabClick', 'trigger'],
	props: {
		pattern: {
			type: Object,
			default() {
				return {};
			}
		},
		horizontal: {
			type: String,
			default: 'left'
		},
		vertical: {
			type: String,
			default: 'bottom'
		},
		direction: {
			type: String,
			default: 'horizontal'
		},
		content: {
			type: Array,
			default() {
				return [];
			}
		},
		show: {
			type: Boolean,
			default: false
		},
		popMenu: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			fabShow: false,
			isShow: false,
			isAndroidNvue: platform === 'android',
			styles: {
				color: '#3c3e49',
				selectedColor: '#007AFF',
				backgroundColor: '#fff',
				buttonColor: '#007AFF',
				iconColor: '#fff'
			}
		};
	},
	computed: {
		contentWidth(e) {
			return (this.content.length + 1) * 55 + 15 + 'px';
		},
		contentWidthMin() {
			return '55px';
		},
		// 动态计算宽度
		boxWidth() {
			return this.getPosition(3, 'horizontal');
		},
		// 动态计算高度
		boxHeight() {
			return this.getPosition(3, 'vertical');
		},
		// 计算左下位置
		leftBottom() {
			return this.getPosition(0, 'left', 'bottom');
		},
		// 计算右下位置
		rightBottom() {
			return this.getPosition(0, 'right', 'bottom');
		},
		// 计算左上位置
		leftTop() {
			return this.getPosition(0, 'left', 'top');
		},
		rightTop() {
			return this.getPosition(0, 'right', 'top');
		},
		flexDirectionStart() {
			return this.getPosition(1, 'vertical', 'top');
		},
		flexDirectionEnd() {
			return this.getPosition(1, 'vertical', 'bottom');
		},
		horizontalLeft() {
			return this.getPosition(2, 'horizontal', 'left');
		},
		horizontalRight() {
			return this.getPosition(2, 'horizontal', 'right');
		},
		// 计算 nvue bottom
		nvueBottom() {
			const safeBottom = uni.getSystemInfoSync().windowBottom;
			// #ifdef APP-NVUE
			return 30 + safeBottom;
			// #endif
			// #ifndef APP-NVUE
			return 30;
			// #endif
		}
	},
	watch: {
		pattern: {
			handler(val, oldVal) {
				this.styles = Object.assign({}, this.styles, val);
			},
			deep: true
		}
	},
	created() {
		this.isShow = this.show;
		if (this.top === 0) {
			this.fabShow = true;
		}
		// 初始化样式
		this.styles = Object.assign({}, this.styles, this.pattern);
	},
	methods: {
		_onClick() {
			this.$emit('fabClick');
			if (!this.popMenu) {
				return;
			}
			this.isShow = !this.isShow;
		},
		open() {
			this.isShow = true;
		},
		close() {
			this.isShow = false;
		},
		/**
		 * 按钮点击事件
		 */
		_onItemClick(index, item) {
			if (!this.isShow) {
				return;
			}
			this.$emit('trigger', {
				index,
				item
			});
		},
		/**
		 * 获取 位置信息
		 */
		getPosition(types, paramA, paramB) {
			if (types === 0) {
				return this.horizontal === paramA && this.vertical === paramB;
			} else if (types === 1) {
				return this.direction === paramA && this.vertical === paramB;
			} else if (types === 2) {
				return this.direction === paramA && this.horizontal === paramB;
			} else {
				return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
$zx-shadow-base: 0 1px 5px 2px
	rgba(
		$color: #000000,
		$alpha: 0.3
	) !default;

.zx-fab {
	position: fixed;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	z-index: 10;
	border-radius: 45px;
	box-shadow: $zx-shadow-base;
}

.zx-cursor-point {
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
}

.zx-fab--active {
	opacity: 1;
}

.zx-fab--leftBottom {
	left: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
	// padding: 10px;
}

.zx-fab--leftTop {
	left: 15px;
	top: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	top: calc(30px + var(--window-top));
	/* #endif */
	// padding: 10px;
}

.zx-fab--rightBottom {
	right: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
	// padding: 10px;
}

.zx-fab--rightTop {
	right: 15px;
	top: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	top: calc(30px + var(--window-top));
	/* #endif */
	// padding: 10px;
}

.zx-fab__circle {
	position: fixed;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	width: 55px;
	height: 55px;
	background-color: #3c3e49;
	border-radius: 45px;
	z-index: 11;
	// box-shadow: $zx-shadow-base;
}

.zx-fab__circle--leftBottom {
	left: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
}

.zx-fab__circle--leftTop {
	left: 15px;
	top: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	top: calc(30px + var(--window-top));
	/* #endif */
}

.zx-fab__circle--rightBottom {
	right: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
}

.zx-fab__circle--rightTop {
	right: 15px;
	top: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	top: calc(30px + var(--window-top));
	/* #endif */
}

.zx-fab__circle--left {
	left: 0;
}

.zx-fab__circle--right {
	right: 0;
}

.zx-fab__circle--top {
	top: 0;
}

.zx-fab__circle--bottom {
	bottom: 0;
}

.zx-fab__plus {
	font-weight: bold;
}


.fab-circle-icon {
	transform: rotate(0deg);
	transition: transform 0.3s;
	font-weight: 200;
}

.zx-fab__plus--active {
	transform: rotate(135deg);
}

.zx-fab__content {
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	display: flex;
	/* #endif */
	flex-direction: row;
	border-radius: 55px;
	overflow: hidden;
	transition-property: width, height;
	transition-duration: 0.2s;
	width: 55px;
	border-color: #dddddd;
	border-width: 1rpx;
	border-style: solid;
}

.zx-fab__content--other-platform {
	border-width: 0px;
	box-shadow: $zx-shadow-base;
}

.zx-fab__content--left {
	justify-content: flex-start;
}

.zx-fab__content--right {
	justify-content: flex-end;
}

.zx-fab__content--flexDirection {
	flex-direction: column;
	justify-content: flex-end;
}

.zx-fab__content--flexDirectionStart {
	flex-direction: column;
	justify-content: flex-start;
}

.zx-fab__content--flexDirectionEnd {
	flex-direction: column;
	justify-content: flex-end;
}

.zx-fab__item {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 55px;
	height: 45px;
	opacity: 0;
	transition: opacity 0.2s;
}

.zx-fab__item--active {
	opacity: 1;
}

.zx-fab__item-image {
	width: 20px;
	height: 20px;
	margin-bottom: 4px;
}

.zx-fab__item-text {
	color: #ffffff;
	font-size: 12px;
	line-height: 12px;
	margin-top: 2px;
}

.zx-fab__item--first {
	width: 55px;
}
</style>

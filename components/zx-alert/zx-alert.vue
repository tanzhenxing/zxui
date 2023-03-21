<template>
	<zx-transition mode="fade" :show="isShow">
		<view class="zx-alert__wrap" :class="getColorClass"
			:style="{
				backgroundColor: backgroundColor?backgroundColor:'',
				borderRadius: radius,
				paddingTop: padding[0] || 0,
				paddingRight: padding[1] || 0,
				paddingBottom: padding[2] || padding[0] || 0,
				paddingLeft: padding[3] || padding[1] || 0
			}">
			<view class="zx-alert__shrink" @tap.stop="leftClick">
				<slot name="left">
					<zx-icon v-if="iconShow" :name="getIconName" :size="iconSize" :color="effect==='light'?lightColor:iconColor"></zx-icon>
				</slot>
			</view>
			<slot name="content">
				<view v-if="title || desc" class="zx-alert__content" @tap.stop="onClick">
					<zx-text :text="title" :size="titleSize" :color="effect==='light'?lightColor:titleColor" :align="align" :lines="titleLines"></zx-text>
					<zx-text :text="desc" :lines="descLines" :size="descSize" :color="effect==='light'?lightColor:descColor" :lineHeight="descLineHeight" :align="align"></zx-text>
				</view>
			</slot>
			<slot name="right">
				<view v-if="closable" class="zx-alert__shrink">
					<zx-icon name="close" :size="closeSize" :color="effect==='light'?lightColor:closeColor" @click="close"></zx-icon>
				</view>
			</slot>
		</view>
	</zx-transition>
</template>

<script>
/**
 * Alert  警告提示
 * @description 警告提示，展现需要关注的信息。
 * @tutorial https://zxui.org/components/alert-tips
 * @property {String}			show        是否显示组件
 * @property {String}			type        主题名称
 * @property {String}			title       显示的文字
 * @property {String | Number}	titleSize   字体大小
 * @property {String}			desc        辅助性文字
 * @property {Boolean}			iconName    图标名称
 * @property {Boolean}			iconShow    是否显示图标
 * @property {Boolean}			iconColor   图标颜色
 * @property {Boolean}			closable    关闭按钮
 * @property {String | Number}	closeSize
 * @property {Boolean}			align		文字对齐方式
 * @property {String}	        backgroundColor 背景色
 * @property {Array}	        padding     边距
 * @property {Array}	        radius      圆角
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event    {Function}         click       点击组件时触发
 * @example  <zx-alert :title="title" type="warning" :closable="closable" :description="description"></zx-alert>
 */
export default {
	name: 'zx-alert-tips',
	data() {
		return {
			isShow: true,
			lightColor: '#909399'
		}
	},
	emits: ['leftClick', 'click', 'close'],
	props: {
		show: {
			type: Boolean,
			default: true
		},
		// 主题名称
		type: {
			type: String,
			default: 'warning'
		},
		effect: {
			type: String,
			default: ''
		},
		// 背景色
		backgroundColor: {
			type: String,
			default: ''
		},
		// 边距
		padding: {
			type: Array,
			default() {
				return ['20rpx','30rpx','20rpx','30rpx'];
			}
		},
		radius: {
			type: String,
			default: '10rpx'
		},
		iconName: {
			type: String,
			default: ''
		},
		iconColor: {
			type: String,
			default: '#ffffff'
		},
		//icon字体大小
		iconSize: {
			type: String,
			default: '50rpx'
		},
		iconShow: {
			type: Boolean,
			default: true
		},
		// 是否显示关闭按钮
		closable: {
			type: Boolean,
			default: false
		},
		closeColor: {
			type: String,
			default: '#ffffff'
		},
		//关闭icon字体大小
		closeSize: {
			type: String,
			default: '36rpx'
		},
		title: {
			type: String,
			default: ''
		},
		titleColor: {
			type: String,
			default: '#ffffff'
		},
		titleSize: {
			type: String,
			default: '34rpx'
		},
		titleLines: {
			type: Number,
			default: 1
		},
		align: {
			type: String,
			default: 'left'
		},
		desc: {
			type: String,
			default: ''
		},
		descColor: {
			type: String,
			default: '#ffffff'
		},
		descSize: {
			type: String,
			default: '26rpx'
		},
		// 描述文字显示行数，超出隐藏
		descLines: {
			type: [Number,String],
			default: 1
		},
		descLineHeight: {
			type: String,
			default: '40rpx'
		},
		// 显示时长，单位秒, 默认为0一直显示
		duration: {
			type: Number,
			default: 0
		},
		customStyle: {
			type: Object,
			default: function(){
				return {};
			}
		}
	},
	created() {
		this.isShow = this.show;
		// 显示多少秒之后自动消失
		if(this.duration>0){
			setTimeout(()=>{
				this.isShow = false;
			},this.duration*1000);
		}
	},
	computed: {
		// 不同主题对应不同的图标
		getIconName() {
			if(this.iconName!==''){
				return this.iconName;
			}
			// 匹配主题图标
			switch (this.type) {
				case 'success':
					return 'checkmark-circle-fill';
					break;
				case 'error':
					return 'close-circle-fill';
					break;
				case 'warning':
					return 'error-circle-fill';
					break;
				case 'info':
					return 'info-circle-fill';
					break;
				case 'primary':
					return 'more-circle-fill';
					break;
				default:
					return 'error-circle-fill';
			}
		},
		getColorClass() {
			let colorClass = 'zx';
			if(this.type){
				colorClass += '-' + this.type;
			}
			if(this.effect){
				colorClass += '-' + this.effect;
			}
			return colorClass;
		}
	},
	methods: {
		leftClick() {
			this.$emit('leftClick', {});
		},
		onClick() {
			this.$emit('click', {});
		},
		close() {
			this.isShow = false;
			this.$emit('close', {});
		}
	}
};
</script>

<style lang="scss" scoped>
.zx-alert__wrap {
	flex: 1;
	/* #ifndef APP-NVUE */
	display: flex;
	width: 100%;
	box-sizing: border-box;
	/* #endif */
	flex-direction: row;
	align-items: center;
	position: relative;
}

.zx-alert__shrink {
	/* #ifndef APP-NVUE */
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	/* #endif */
}

.zx-alert__content {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	padding-left: 20rpx;
	padding-right: 20rpx;
}

.zx-alert__text {
	/* #ifndef APP-NVUE */
	word-break: break-all;
	display: block;
	box-sizing: border-box;
	/* #endif */
}
.zx-desc__padding {
	padding-top: 6rpx;
}

.zx-text__p-left {
	padding-left: 20rpx;
}

.zx-text__p-right {
	padding-right: 60rpx;
}

.zx-alert__single {
	/* #ifdef APP-NVUE */
	lines: 1;
	/* #endif */
	/* #ifndef APP-NVUE */
	display: block;
	width: 100%;
	white-space: nowrap;
	/* #endif */
	flex-direction: row;
	overflow: hidden;
	text-overflow: ellipsis;
}

.zx-alert__icon-close {
	position: absolute;
	right: 30rpx;
	top: 16rpx;
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
}
// 主题颜色
.zx-primary{background-color: #3c9cff;}
.zx-primary-dark{background-color: #398ade;}
.zx-primary-disabled{background-color: #9acafc;}
.zx-primary-light{background-color: #ecf5ff;}

.zx-warning{background-color:#f9ae3d;}
.zx-warning-dark{background-color:#f1a532;}
.zx-warning-disabled{background-color:#f9d39b;}
.zx-warning-light {background-color:#fdf6ec;}

.zx-success{background-color:#5ac725;}
.zx-success-dark {background-color:#53c21d;}
.zx-success-disabled {background-color:#a9e08f;}
.zx-success-light {background-color:#f5fff0;}

.zx-error{background-color:#f56c6c;}
.zx-error-dark{background-color:#e45656;}
.zx-error-disabled{background-color:#f7b2b2;}
.zx-error-light {background-color:#fef0f0;}

.zx-info {background-color:#909399;}
.zx-info-dark {background-color:#767a82;}
.zx-info-disabled {background-color:#c4c6c9;}
.zx-info-light {background-color:#f4f4f5;}

</style>

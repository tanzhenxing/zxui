<template>
	<view
		class="grace-box-banner gui-flex gui-rows gui-nowrap"
		:class="customClass"
		:style="{
			paddingTop: padding,
			paddingBottom: padding,
			borderRadius: borderRadius
		}"
	>
		<view
			class="grace-box-items gui-flex gui-rows gui-nowrap gui-align-items-center"
			hover-class="gui-tap"
			v-for="(item, index) in items"
			:key="index"
			@tap.stop="taped(index)"
		>
			<view class="gui-flex1">
				<view class="gui-flex gui-rows gui-nowrap gui-justify-content-center gui-align-items-center">
					<text
						class="gui-block"
						:class="colors[0]"
						:style="{
							lineHeight: lineHeight,
							fontSize: fontSize[0]
						}"
					>
						{{ item[0] }}
					</text>
					<text
						class="gui-block"
						:class="colors[1]"
						:style="{
							fontSize: fontSize[1],
							marginLeft: '5rpx'
						}"
					>
						{{ item[1] }}
					</text>
				</view>
				<text
					class="gui-block gui-text-center"
					:class="colors[2]"
					:style="{
						fontSize: fontSize[2]
					}"
				>
					{{ item[2] }}
				</text>
			</view>
			<view
				class="grace-box-line"
				:style="{
					height: borderHeight,
					'border-right-width': borderWidth,
					'border-right-style': borderStyle,
					'border-right-color': borderColor
				}"
				v-if="index < items.length - 1"
			></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'zx-box-banner',
	props: {
		items: {
			type: Array,
			default: function() {
				return [];
			}
		},
		colors: {
			type: Array,
			default: function() {
				return [['gui-primary-text'], ['gui-color-gray'], ['gui-color-gray']];
			}
		},
		fontSize: {
			type: Array,
			default: function() {
				return ['36rpx', '24rpx', '24rpx'];
			}
		},
		customClass: {
			type: Array,
			default: function() {
				return ['gui-bg-white', 'gui-dark-bg-level-3'];
			}
		},
		padding: {
			type: String,
			default: '20rpx'
		},
		borderRadius: {
			type: String,
			default: '10rpx'
		},
		lineHeight: {
			type: String,
			default: '60rpx'
		},
		borderColor: { type: String, default: '#F1F1F1' },
		borderWidth: { type: String, default: '1px' },
		borderStyle: { type: String, default: 'solid' },
		borderHeight: { type: String, default: '60rpx' }
	},
	methods: {
		taped: function(index) {
			this.$emit('taped', index);
		}
	},
	emits: ['taped']
};
</script>
<style scoped>
.grace-box-banner {
	overflow: hidden;
}
.grace-box-items {
	width: 100rpx;
	flex: 1;
}
.grace-box-line {
	width: 1px;
	height: 50rpx;
}
/* #ifndef APP-NVUE */
.gui-flex{display:flex;}
.gui-border-box{box-sizing:border-box;}
.gui-body{width:750rpx; box-sizing:border-box;}
/* #endif */

/* flex 布局 */
.gui-rows, .gui-row{flex-direction:row !important;}
.gui-columns, .gui-column{flex-direction:column !important;}
.gui-wrap{flex-direction:row !important; flex-wrap:wrap !important;}
.gui-nowrap{flex-direction:row !important; flex-wrap:nowrap !important;}
.gui-space-around{justify-content:space-around !important;}
.gui-space-between{justify-content:space-between !important;}
.gui-justify-content-start{justify-content:flex-start !important;}
.gui-justify-content-center{justify-content:center !important;}
.gui-justify-content-end{justify-content:flex-end !important;}
.gui-align-items-start{align-items:flex-start !important;}
.gui-align-items-center{align-items:center !important;}
.gui-align-items-end{align-items:flex-end !important;}
.gui-flex1{flex:1 !important;}
/* #ifndef APP-NVUE */
.gui-flex-shrink0{flex-shrink:0 !important;}
.gui-flex-shrink1{flex-shrink:1 !important;}
/* #endif */

/* 文本对齐 */
.gui-text-left{text-align:left;}
.gui-text-center{text-align:center;}
.gui-text-right{text-align:right;}
.gui-ellipsis{overflow:hidden;}
/* #ifndef APP-NVUE */
.gui-ellipsis{white-space:nowrap; text-overflow:ellipsis;}
.gui-block-text, .gui-block{display:block;}
/* #endif */
/* 背景色 */
.gui-bg-transparent{background-color:rgba(0,0,0,0);}
.gui-bg-red{background-color:#EE0A25 !important;}
.gui-bg-green{background-color:#07C160 !important;}
.gui-bg-blue{background-color:#008AFF !important;}
.gui-bg-orange{background-color:#ED6A0C !important;}
.gui-bg-yellow{background-color:#FBDE4E !important;}
.gui-bg-purple{background-color:#8A3FD4 !important;}
.gui-bg-white{background-color:#FFFFFF !important;}
.gui-bg-black{background-color:#2B2E3D !important;}
.gui-bg-black{background-color:#2B2E3D !important;}
.gui-bg-black2{background-color:#656565 !important;}
.gui-bg-black3{background-color:#969799 !important;}
.gui-bg-black4{background-color:#C8C9CC !important;}
.gui-bg-black-opacity7{background-color:rgba(0,0,0,0.7);}
.gui-bg-black-opacity5{background-color:rgba(0,0,0,0.5);}
.gui-bg-black-opacity3{background-color:rgba(0,0,0,0.3);}
.gui-gtbg-red{background-image:linear-gradient(45deg, #FF0066 , #D50000) !important;}
.gui-gtbg-blue{background-image:linear-gradient(45deg, #0000FF , #008AFF) !important;}
.gui-gtbg-green{background-image:linear-gradient(45deg, #39B55A , #8DC63E) !important;}
.gui-gtbg-orange{background-image:linear-gradient(to right, #F1CF53,#F29C39) !important;}
.gui-bg-gray{background-color:#F8F8F8 !important;}
</style>

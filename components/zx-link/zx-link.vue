<template>
	<!-- #ifdef APP-PLUS -->
	<text :data-url="url" @tap="openUrlForApp" :style="getMyStyle">{{ text }}</text>
	<!-- #endif -->
	
	<!-- #ifdef H5 -->
	<a
		:href="url"
		class="link"
		target="_blank"
		:style="{
			color: color,
			lineHeight: lineHeight,
			fontSize: fontSize
		}"
	>
		{{ text }}
	</a>
	<!-- #endif -->
	<!-- #ifdef MP -->
	<text class="link" :style="{ color: color, lineHeight: lineHeight, fontSize: fontSize }">{{ url }}</text>
	<!-- #endif -->
</template>
<script>
/**
 * link 超链接
 * @description 该组件为超链接组件，在不同平台有不同表现形式：在APP平台会通过plus环境打开内置浏览器，在小程序中把链接复制到粘贴板，同时提示信息，在H5中通过window.open打开链接。
 * @tutorial https://zxui.org/components/link
 * @property {String}			url		    跳转的链接
 * @property {String}			color		文字颜色 （默认 color['u-primary'] ）
 * @property {String ｜ Number}	fontSize	字体大小，单位px （默认 15 ）
 * @property {Boolean}			underLine	是否显示下划线 （默认 false ）

 * @property {String}			mpTips		各个小程序平台把链接复制到粘贴板后的提示语（默认“链接已复制，请在浏览器打开”）
 * @property {String}			lineColor	下划线颜色，默认同color参数颜色
 * @property {String}			text		超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @example
 */
export default {
	name: 'zx-link',
	props: {
		url: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: '#008AFF'
		},
		fontSize: {
			type: [String,Number],
			default: '28rpx'
		},
		lineHeight: {
			type: [String,Number],
			default: '50rpx'
		},
		customStyle: {
			type: Object,
			default: function(){
				return {}
			}
		}
	},
	computed: {
		getMyStyle(){
			let myStyle = {color:this.color,fontSize:this.fontSize,lineHeight:this.lineHeight};
			
			return myStyle;
		}
	},
	methods: {
		
	}
};
</script>
<style scoped>
/* #ifdef H5 */
.link {
	text-decoration: none;
}
/* #endif */
</style>

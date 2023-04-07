<template>
	<view :style="getStyle">
		<!-- 图标在左侧或者上方 -->
		<zx-icon v-if="position==='left' || position==='top'" :name="icon" :size="iconSize" :color="iconColor" :customStyle="iconStyle" style="padding-right: 20rpx;"></zx-icon>
		<!-- 文字内容 -->
		<zx-text :text="text" :lines="lines" :size="textSize" :color="textColor" :lineHeight="lineHeight" :fontFamily="fontFamily"></zx-text>
		<!-- 图标在右侧 或 下方 -->
		<zx-icon v-if="position==='right' || position==='bottom'" :name="icon" :size="iconSize" :color="iconColor" :customStyle="iconStyle"></zx-icon>
	</view>
</template>

<script>
	export default {
		name:"zx-text-icon",
		data() {
			return {
				
			};
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			iconSize: {
				type: String,
				default: '32rpx'
			},
			iconColor: {
				type: String,
				default: '#3c9cff'
			},
			iconTop: {
				type: String,
				default: ''
			},
			iconStyle: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			// 图标位置 left、right、 top、 bottom
			position: {
				type: String,
				default: 'left'
			},
			text: {
				type: String,
				default: ''
			},
			textSize: {
				type: String,
				default: '30rpx'
			},
			textColor: {
				type: String,
				default: '#606266'
			},
			fontFamily: {
				type: String,
				default: ''
			},
			lineHeight: {
				type: String,
				default: '50rpx'
			},
			lines:{
				type: [String,Number],
				default: 1
			},
			space: {
				type: String,
				default: '5rpx'
			},
			center: {
				type:Boolean,
				default: false
			},
			bgColor: {
				type: String,
				default: ''
			}
		},
		computed: {
			getIconStyle(){
				let style = {width:this.space,height:'100%'};
				if(this.space!==''){
					style.paddingRight = this.space;
				}
				return style;
			},
			getStyle(){
				let style = {display:'flex',alignItems: 'center'};
				if(this.center){
					style.justifyContent = 'center';
				}
				if(this.bgColor!==''){
					style.backgroundColor = this.bgColor;
				}
				switch(this.position){
					case 'left':
					case 'right':
					style.flexDirection = 'row';
					break;
					case 'top':
					case 'bottom':
					style.flexDirection = 'column';
					break;
				}
				return style;
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.flex-row {
	display: flex;
	flex-direction: row;
}
.flex-column {
	display: flex;
	flex-direction: column;
}
</style>
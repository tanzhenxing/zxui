<template>
	<view :style="{textAlign:'justify',fontFamily:getFontFamily,fontSize:fontSize,color:color,lineHeight:lineHeight,textIndent:textIndent?'2em':'0em'}">
		<zx-parse v-if="content!==''" :content="getContent" :selectable="true"></zx-parse>
	</view>
</template>

<script>
	export default {
		name:"zx-richtext",
		props: {
			content: {
				type: String,
				default: ''
			},
			fontFamily: {
				type: String,
				default: 'light'
			},
			fontSize: {
				type: String,
				default: '28rpx'
			},
			color: {
				type: String,
				default: '#333333'
			},
			lineHeight: {
				type: String,
				default: '50rpx'
			},
			textIndent: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 设置文章内容样式
				style: {
					p: 'text-indent:2em',
				},
			};
		},
		computed:{
			getFontFamily(){
				return 'PingFangSC-'+ this.fontFamily;
			},
			getContent(){
				let new_content = this.content;
				if(new_content!==""){
					// 删除元素自动高度
					new_content = new_content.replace("height: auto;", "");
					// 把正文的2号字，修改为4号字
					new_content = new_content.replace(/size="2"/g,'size="4"');
					// 缩放图片 ?imageMogr2/thumbnail/750x
					new_content = new_content.replace(/<img(.*?)src="(.*?)"(.*?)>/g,'<img$1src="$2"$3 style="max-width:100%;width:100%;">');
					// 视频自适应宽度
					new_content = new_content.replace(/http:/g,'https:');
					new_content = new_content.replace(/<video(.*?)src="(.*?)"(.*?)>/g,'<video src="$2" poster="$2?vframe/jpg/offset/2/w/750/h/490" controls="controls" style="max-width:100%;width:100%;">');
				}
				return new_content;
			}
		},
		methods: {
			imgTap(e){
				console.log('imgTap'+JSON.stringify(e))
			}
		}
	}
</script>

<style scoped>
	
</style>
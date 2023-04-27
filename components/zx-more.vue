<template>
	<view style="display: flex;flex-direction: row;align-items: center;">
		<zx-text :text="text" :color="color" fontFamily="PingFangSC-regular" size="28rpx" @click="goLink"></zx-text>
		<zx-icon :name="suffixIcon"></zx-icon>
	</view>
</template>

<script>
	export default {
		name:"zx-more",
		data() {
			return {
				
			};
		},
		props: {
			color: {
				type: String,
				default: '#555555'
			},
			suffixIcon: {
				type: String,
				default: 'arrow-right-double'
			},
			text: {
				type: String,
				default: '更多'
			},
			link: {
				type: String,
				default: ''
			}
		},
		methods: {
			goLink(){
				if(this.link!==null && this.link!==''){
					uni.navigateTo({
						url: this.link
					});
				}
			}
		}
	}
</script>

<style>

</style>
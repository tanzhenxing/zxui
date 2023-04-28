<template>
	<view style="display: flex;flex-direction: row;align-items: center;">
		<zx-text :text="text" :color="color" size="28rpx" @click.stop="onClick"></zx-text>
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
			onClick(){
				this.$emit('click');
			}
		}
	}
</script>

<style>

</style>
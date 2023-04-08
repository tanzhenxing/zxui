<template>
	<view style="display: flex;flex-direction: row;flex-wrap: wrap;align-content: space-between;"
	:style="{paddingTop:padding,paddingBottom:padding,backgroundColor:bgColor}">
		<view :style="{width:getWidth,paddingTop:padding,paddingBottom:padding}" v-for="(item, index) in items" :key="index" @click="clickItem(item)">
			<zx-icon-text v-if="item.show"
				:icon="item.icon"
				:iconSize="iconSize"
				:text="item.title"
				position="top"
				line-height="45rpx"
				:center="false"
				space="0rpx"
				shape="circle"
			></zx-icon-text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-icon-list",
		data() {
			return {
				
			};
		},
		computed: {
			getWidth(){
				return (750 / this.column) + 'rpx';
			}
		},
		props: {
			items: {
				type: Array,
				default() {
					return [];
				}
			},
			column: {
				type: Number,
				default: 4
			},
			iconSize: {
				type: String,
				default: '80rpx'
			},
			padding: {
				type: String,
				default: '15rpx'
			},
			bgColor: {
				type: String,
				default: '#ffffff'
			}
		},
		methods: {
			clickItem(item) {
			    uni.navigateTo({
			    	url: item.url
			    });
			}
		}
	}
</script>

<style lang="scss">
.nav-box {
	flex-direction: row;
	background-color: #ffffff;
}

.nav-text {
	color: #333333;
	font-size: 28rpx;
	line-height: 50rpx;
}
</style>
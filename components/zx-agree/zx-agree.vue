<template>
	<view>
		<zx-popup :show="show" :mode="mode" :closeable="isClose" :closeOnClickOverlay="false" @close="close">
			<view :style="{width: width,backgroundColor:bgColor,border:border?'1px solid #cccccc':'',borderRadius:radius}">
				<view class="title">
					<zx-text :text="title" lineHeight="100rpx" size="34rpx" lines="1"></zx-text>
				</view>
				<zx-line></zx-line>
				<scroll-view scroll-y slot="content" :style="{ height: contentHeight+'px'}">
					<view class="content">
						<rich-text :nodes="content"></rich-text>
					</view>
				</scroll-view>
				<zx-line></zx-line>
				<view class="button-box">
					<button type="default" :style="disagreeStyle" @click="disagree">不同意</button>
					<button type="primary" :style="agreeStyle" @click="agree">同意</button>
				</view>
			</view>
		</zx-popup>
	</view>
</template>

<script>

export default {
	name: 'zx-agree',
	data() {
		return {
			contentHeight: 0
		};
	},
	created() {
		let sys = uni.getSystemInfoSync();
		this.contentHeight = (sys.safeArea.height - uni.upx2px(300)) * this.height * 0.01;
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		mode: {
			type:String,
			default: 'center'
		},
		isClose: {
			type: Boolean,
			default: true
		},
		bgColor: {
			type:String,
			default: '#ffffff'
		},
		width: {
			type:String,
			default: '700rpx'
		},
		border: {
			type:Boolean,
			default: true
		},
		radius: {
			type: String,
			default: '20rpx'
		},
		height: {
			type: Number,
			default: 80
		},
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		agreeStyle: {
			type: Object,
			default: () => {
				return {width:'250rpx'};
			}
		},
		disagreeStyle: {
			type: Object,
			default: () => {
				return {width:'250rpx'};
			}
		}
	},
	methods: {
		close(){
			this.$emit('close');
		},
		disagree(){
			this.$emit('disagree');
		},
		agree(){
			this.$emit('agree');
		}
	}
};
</script>

<style lang="scss" scoped>
	.title {
		margin-left: 30rpx;margin-right: 80rpx;
		height: 100rpx;
	}
	.content {
		padding: 20rpx;text-align: justify;font-size: 26rpx;color: #8d8d8d;
	}
	.button-box {
		display: flex;flex-direction: row;padding-top: 30rpx;padding-bottom: 30rpx;
	}
</style>
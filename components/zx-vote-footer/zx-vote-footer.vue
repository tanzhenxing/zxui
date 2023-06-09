<template>
	<view style="width: 750rpx;position: fixed;bottom: 0rpx;background-color: #ffffff;">
		<zx-line></zx-line>
		<view style="display: flex;flex-direction: row;justify-content: space-around;">
			<template v-for="(item, index) in items" :key="index">
				<view style="display: flex;flex-direction: column;align-items: center;" @click="$util.navigate(item.path+'?id='+voteId)">
					<view>
						<zx-icon :name="index === currentIndex ? item.icon : item.activeIcon" width="60rpx" height="60rpx" shape="square"></zx-icon>
					</view>
					<view >
						<zx-text :text="item.title" size="28rpx" lineHeight="40rpx" :color="index === currentIndex ? '#ff0000':'#333333'"></zx-text>
					</view>
				</view>
			</template>
		</view>
		<zx-safe-bottom></zx-safe-bottom>
	</view>
</template>

<script>
export default {
	name: 'zx-vote-footer',
	data() {
		return {
			items: [
				{ title: '首页', path: './vote', icon: 'https://files.wufu-app.com/images/icon/index.png', activeIcon: 'https://files.wufu-app.com/images/icon/index2.png' },
				{ title: '排行榜', path: './rank', icon: 'https://files.wufu-app.com/images/icon/live.png', activeIcon: 'https://files.wufu-app.com/images/icon/live2.png' },
				{ title: '说明', path: './desc', icon: 'https://files.wufu-app.com/images/icon/family.png', activeIcon: 'https://files.wufu-app.com/images/icon/family2.png' }
			]
		};
	},
	props: {
		currentIndex: {
			type: Number,
			default: 0
		},
		voteId: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style lang="scss" scoped>

</style>

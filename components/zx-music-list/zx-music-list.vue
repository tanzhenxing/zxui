<template>
	<view>
		<!-- 数据列表-->
		<template v-for="(item, index) in lists" :key="index">
			<view class="list-item flex-center" :style="{backgroundColor:currentIndex === index ? activeBgColor:bgColor}" @click="onClick(item,index)">
				<view style="flex: 1;">
					<zx-text
						:text="item.sort + '. ' + item.title"
						size="32rpx"
						lineHeight="40rpx"
						lines="2"
						:color="currentIndex === index ? '#ffffff' : '#303133'"
					></zx-text>
				</view>
				<view style="width: 100rpx;">
					<zx-avatar :src="item.coverImgUrl" width="85rpx" height="85rpx"></zx-avatar>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	name: 'zx-music-list',
	data() {
		return {
			pageCount: 0,
			page:1,
			maxPage:1,
			status: 'loadmore',
			currentAudio: null,
			sortInfo: { text: '排序', status: 0, icon: 'arrow-upward' },
			current_index: 0
		};
	},
	props: {
		title: {
			type: String,
			default: '列表'
		},
		lists: {
			type: Array,
			default: function() {
				return [];
			}
		},
		currentIndex: {
			type: Number,
			default: 0
		},
		sort: {
			type: String,
			default: 'desc'
		},
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		activeBgColor:{
			type: String,
			default: '#e62626'
		},
		
	},
	created() {
		
	},
	computed: {
		
	},
	methods: {
		// 设置排序
		setSort() {
			if (this.sortInfo.status === 0) {
				this.lists.sort(function(a, b) {
					return a.id - b.id;
				});
				this.sortInfo = { text: '正序', status: 1, icon: 'arrow-upward' };
			} else {
				this.lists.reverse(function(a, b) {
					return a.id - b.id;
				});
				this.sortInfo = { text: '倒序', status: 0, icon: 'arrow-downward' };
			}
		},
		onClick(item,index){
			this.$emit('clickItem',index);
		},
		
	}
};
</script>

<style scoped>
.list-item {
	border-radius: 70rpx;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	height: 110rpx;
	padding: 5rpx 15rpx 5rpx 30rpx;
}
.flex-center {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
</style>

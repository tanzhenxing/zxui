<template>
	<view>
		<!-- #ifdef H5 -->
		<zx-popup :show="showMsg" mode="top" bgColor="transparent" :overlayOpacity="0.7" :closeOnClickOverlay="true" @close="close">
			<view class="box">
				<image style="width: 500rpx" src="https://files.wufu-app.com/images/gift/msg.png" mode="widthFix"></image>
				<view class="content zx-flex-column zx-flex-align-xy" style="padding-top: 20rpx;">
					<view>
						<text>{{ tips }}</text>
						<zx-icon type="more-filled" size="55rpx"></zx-icon>
					</view>
					<view>
						<text>{{ msg }}</text>
					</view>
				</view>
			</view>
		</zx-popup>
		<!-- #endif -->
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	desc: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	msg: {
		type: String,
		default: '分享给微信好友'
	},
	tips: {
		type: String,
		default: '点击右上角 ...'
	},
	imageUrl: {
		type: String,
		default: ''
	},
	urlParam: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const shareData = ref(null);
const showMsg = ref(false);

onMounted(async () => {
	showMsg.value = props.show;
});

const close = () => {
	showMsg.value = false;
};
const open = () => {
	showMsg.value = true;
};

const setShare = async () => {
	// 设置分享信息
	// #ifdef H5
	await proxy.$util.setShare(shareData.value);
	// #endif
};

/**
 * 获取分享数据
 */
const getShare = () => {
	let share_data = {};
	// 分享标题
	if (!props.title) {
		share_data.title = ' ';
	} else {
		share_data.title = props.title;
	}
	// 分享描述
	if (!props.desc) {
		share_data.desc = props.title;
	} else {
		share_data.desc = props.desc;
	}
	// 分享内容
	if (!props.content) {
		share_data.content = props.desc;
	} else {
		share_data.content = props.content;
	}
	// 分享图标
	if (!props.imageUrl) {
		share_data.imageUrl = 'https://files.wufu-app.com/images/img/nopic.jpg';
	} else {
		share_data.imageUrl = props.imageUrl;
	}
	share_data.imgUrl = share_data.imageUrl;

	// 分享参数
	let url_param = props.urlParam;
	url_param.r_id = 0;
	let userInfo = proxy.$store.getters.userInfo;
	if (userInfo && userInfo.id) {
		url_param.r_id = userInfo.id;
	}
	url_param.s_id = 0;
	let schoolInfo = proxy.$store.getters.schoolInfo;
	if (schoolInfo && schoolInfo.school_id) {
		url_param.s_id = schoolInfo.school_id;
	}
	let params = '';
	for (const key in url_param) {
		if (!params) {
			params += key + '=' + url_param[key];
		} else {
			params += '&' + key + '=' + url_param[key];
		}
	}
	share_data.query = params;

	// 当前页面路径
	let pages = getCurrentPages();
	share_data.path = '/' + pages[pages.length - 1].route;

	if (share_data.query) {
		share_data.path += '?' + share_data.query;
	}
	if (!share_data.mpPath) {
		share_data.mpPath = share_data.path;
	}

	// #ifdef H5
	share_data.link = window.location.origin + '/?' + Date.now() + '#' + share_data.path;
	if (!share_data.url) {
		share_data.url = share_data.link;
	}
	// #endif

	shareData.value = share_data;

	proxy.$emit('get', shareData.value);
	return shareData.value;
};

defineExpose({ close,open });
</script>

<style lang="scss" scoped>
.content {
	position: absolute;
	top: 160rpx;
	width: 410rpx;
	font-size: 32rpx;
	line-height: 50rpx;
	font-weight: bold;
	color: #333333;
}
.box {
	margin: 30rpx 200rpx;
	width: 500rpx;
}
</style>

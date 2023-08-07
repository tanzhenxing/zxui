<template>
	<view class="zx-top-message" ref="topmsg" v-if="show" :style="{ top: navHeight + 'px' }" :class="[out ? 'zx-top-message-out' : 'zx-top-message-in']">
		<slot></slot>
	</view>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';

// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif
const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();

const props = defineProps({
	duration: {
		type: Number,
		default: 2000
	},
	customNav: {
		type: Boolean,
		default: false
	}
});

const show = ref(false);
const out = ref(false);
const navHeight = ref(0);

onMounted(() => {
	customNavSet();
});

const customNavSet = () => {
	if (!props.customNav) {
		// #ifdef H5
		navHeight.value = 44;
		// #endif
		// #ifndef H5
		navHeight.value = 0;
		// #endif
	} else {
		let system = system();
		navHeight.value = system.statusBarHeight;
	}
};
const open = () => {
	out.value = false;
	show.value = true;
	// #ifdef APP-NVUE
	weexAnimateIn();
	// #endif
	setTimeout(() => {
		close();
	}, props.duration);
};
const close = () => {
	out.value = true;
	// #ifdef APP-NVUE
	weexAnimateOut();
	// #endif
	setTimeout(() => {
		show.value = false;
	}, 350);
};
// #ifdef APP-NVUE
const weexAnimateIn = () => {
	getRefs('topmsg', instance, 0, (popupref) => {
		animation.transition(popupref, {
			styles: { transform: 'translateY(0px)', opacity: 1 },
			duration: 350, //ms
			timingFunction: 'ease',
			delay: 0 //ms
		});
	});
};
const weexAnimateOut = () => {
	getRefs('topmsg', instance, 0, (popupref) => {
		animation.transition(popupref, {
			styles: { transform: 'translateY(-200px)', opacity: 0 },
			duration: 350, //ms
			timingFunction: 'ease',
			delay: 0 //ms
		});
	});
};
// #endif

const getRefs = (ref, _this, count, fun) => {
	if (count >= 50) {
		fun(_this.$refs[ref]);
		return false;
	}
	var refReturn = _this.$refs[ref];
	if (refReturn) {
		fun(refReturn);
	} else {
		count++;
		setTimeout(() => {
			this.getRefs(ref, _this, count, fun);
		}, 100);
	}
};
const system = () => {
	try {
		let res = uni.getSystemInfoSync();
		let iPhoneXBottom = 0;
		if (!res.model) {
			res.model = 'no';
		}
		res.model = res.model.replace(' ', '');
		res.model = res.model.toLowerCase();
		let res1 = res.model.indexOf('iphonex');
		if (res1 > 5) {
			res1 = -1;
		}
		let res2 = res.model.indexOf('iphone1');
		if (res2 > 5) {
			res2 = -1;
		}
		if (res1 != -1 || res2 != -1) {
			res.iPhoneXBottomHeightRpx = 60;
			res.iPhoneXBottomHeightPx = uni.upx2px(60);
		} else {
			res.iPhoneXBottomHeightRpx = 0;
			res.iPhoneXBottomHeightPx = 0;
		}
		return res;
	} catch (e) {
		return null;
	}
};
</script>
<style lang="scss" scoped>
.zx-top-message {
	position: fixed;
	left: 0;
	top: 0;
	width: 750rpx;
	z-index: 900;
	transform: translateY(-200px);
	opacity: 0.1;
}
/* #ifdef H5 */
.zx-top-message {
	top: 44px;
}
/* #endif */
/* #ifndef APP-NVUE */
@keyframes zx-top-message-in {
	0% {
		transform: translateY(-200px);
		opacity: 0.1;
	}
	100% {
		transform: translateY(0px);
		opacity: 1;
	}
}
.zx-top-message-in {
	animation: zx-top-message-in 350ms linear forwards;
}
@keyframes zx-top-message-out {
	0% {
		transform: translateY(0px);
		opacity: 1;
	}
	100% {
		transform: translateY(-200px);
		opacity: 1;
	}
}
.zx-top-message-out {
	animation: zx-top-message-out 350ms linear forwards;
}
/* #endif */
</style>

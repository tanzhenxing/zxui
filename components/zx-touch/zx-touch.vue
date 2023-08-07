<template>
	<view @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
		<slot></slot>
	</view>
</template>
<script setup>
import 'default-passive-events';
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	show:{
		type: Boolean,
		default: true
	}
});

const toucheTimer = ref(0);
const fingerRes = ref([]);
const distance = ref(0);
const taptimer = ref(100);
const isTap = ref(false);

defineEmits(['start', 'move', 'scale', 'tapme', 'end', 'swipe']);

const touchstart = (e) => {
	console.log(JSON.stringify(e))
	toucheTimer.value = new Date().getTime();
	fingerRes.value = e.touches[0] || e.changedTouches[0];
	proxy.$emit('start', fingerRes.value);
};
const touchmove = (e) => {
	if (toucheTimer.value < 50) {
		return;
	}
	let timer = new Date().getTime() - toucheTimer.value;
	if (timer < taptimer.value) {
		return;
	}
	let touches = e.touches[0] || e.changedTouches[0];
	if (touches.length > 2) {
		return;
	}
	if (touches.length == 1) {
		let i = 0,
			moves = [];
		touches.forEach((finger) => {
			let xTouch = finger.pageX - fingerRes.value[i].pageX;
			let yTouch = finger.pageY - fingerRes.value[i].pageY;
			moves.push([xTouch, yTouch]);
			i++;
		});
		proxy.$emit('move', touches);
	} else if (touches.length == 2) {
		if (distance.value == 0) {
			distance.value = parseInt(getDistance(touches[0].pageX, touches[0].pageY, touches[1].pageX, touches[1].pageY));
		} else {
			let distance1 = parseInt(getDistance(touches[0].pageX, touches[0].pageY, touches[1].pageX, touches[1].pageY));
			let scale = distance1 / distance.value;
			scale = Math.floor(scale * 100) / 100;
			proxy.$emit('scale', scale);
		}
	}
};
const touchend = (e) => {
	let timer = new Date().getTime() - toucheTimer.value;
	if (timer < taptimer.value) {
		proxy.$emit('tapme');
		return;
	}
	let touches = getTouches(e.changedTouches);
	distance.value = 0;
	if (touches.length == 1) {
		let i = 0,
			moves = [];
		touches.forEach((finger) => {
			let xTouch = finger.pageX - fingerRes.value[i].pageX;
			let yTouch = finger.pageY - fingerRes.value[i].pageY;
			moves.push([xTouch, yTouch]);
			i++;
		});
		moves.push(timer);
		proxy.$emit('end', moves);
		// 根据时间及距离决定滑动时间
		if (timer < 300) {
			let mx = Math.abs(moves[0][0]);
			let my = Math.abs(moves[0][1]);
			if (mx > my) {
				if (mx >= 50) {
					if (moves[0][0] > 0) {
						proxy.$emit('swipe', 'right');
					} else {
						proxy.$emit('swipe', 'left');
					}
				}
			} else {
				if (my >= 50) {
					if (moves[0][1] > 0) {
						proxy.$emit('swipe', 'down');
					} else {
						proxy.$emit('swipe', 'up');
					}
				}
			}
		}
	}
};
const getDistance = (lat1, lng1, lat2, lng2) => {
	let radLat1 = (lat1 * Math.PI) / 180.0;
	let radLat2 = (lat2 * Math.PI) / 180.0;
	let a = radLat1 - radLat2;
	let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137;
	return Math.round(s * 10000) / 10000;
};
const tapme = () => {
	isTap.value = true;
};
</script>
<style scoped></style>

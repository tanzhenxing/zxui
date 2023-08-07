<template>
	<view class="zx-title">
		<view v-if="iconShow" :style="iconWidth">
			<zx-icon v-if="icon" :name="icon" :color="iconColor" :size="iconSize"></zx-icon>
			<text v-else class="linefont linefont-line" :style="{ color: iconColor, fontSize: iconSize }"></text>
		</view>
		<view style="flex: 1">
			<zx-text :text="title" :size="getSize" :align="align" :color="color" :bold="bold"></zx-text>
		</view>
	</view>
</template>

<script setup>
/**
 * Title 标题
 * @description 标题组件
 * @tutorial
 * @property {String} type  标题类型 [h1|h2|h3|h4|h5] 标题类型
 * @property {String} title 标题内容
 * @property {String} align 对齐方式 [left|center|right]
 * @property {String} color 字体颜色
 * @property {String} bold  是否为粗体
 */
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	type: {
		type: String,
		default: 'h2'
	},
	title: {
		type: String,
		default: ''
	},
	align: {
		type: String,
		default: 'left'
	},
	color: {
		type: String,
		default: '#333333'
	},
	bold: {
		type: Boolean,
		default: true
	},
	icon: {
		type: String,
		default: ''
	},
	iconShow: {
		type: Boolean,
		default: false
	},
	iconColor: {
		type: String,
		default: '#3c9cff'
	},
	iconSize: {
		type: String,
		default: '40rpx'
	},
	iconWidth: {
		type: String,
		default: ''
	}
});

const getSize = computed(() => {
	let fontSize = '30rpx';
	switch (props.type.toLowerCase()) {
		case 'h1':
			fontSize = '44rpx';
			break;
		case 'h2':
			fontSize = '40rpx';
			break;
		case 'h3':
			fontSize = '36rpx';
			break;
		case 'h4':
			fontSize = '32rpx';
			break;
		case 'h5':
			fontSize = '28rpx';
			break;
	}
	return fontSize;
});
</script>

<style scoped lang="scss">
@font-face {
	font-family: 'linefont'; /* Project id 4017099 */
	src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAJ8AAsAAAAABkQAAAIxAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACCcAo0UgE2AiQDCAsGAAQgBYRnBzsbmQURBfTJfh7YLtOWYmpHqfx0UzwyiUaT3ud4eBr337kz82EsmIUkJIBtHaFWoRSMtvnlXgHz1nRVMj2/ZS3LT/8j/935S9OlcQqlEBIhMYqcY3U36lL+BvTAC2JfS0K9UoIVDyjvAcmDpnZLKBOiTARiHAX1Wl8DkBGPCNRbbIW0bsPGnZrPHLxyTr/CDgZZZ5w5efygWp1TFNqsFarRnUU8VkW6k8aj6PPx29KoJanK7HO2Hlt/xOtvvsm3KrfIbwQBgd6XUIWM+SjEzu7aZlk08Vl9rBin3UXwTaUSRMWuPaH+Oru9EQzSevCNt1CABLc1URNaR72BaLp674Vy6/ndl9HtV2OHeOzdGHi3ZhD/s4r+LB3JYwLB5d9kf8uy/7UNBXzY38fILbAEtStHwp8w9oDEYuRJpUnQo0nTztV6p0iFnWr3bqzdccZWqNUxIlFjIENWa5wq3FxUabAU1WotR7151u9v0OGCLEpVh2kvgtDqjaTZE2StPlThvqjS7Ydqrf6otzuaTmswHebAqAQt6B0aQ6NzLYnCXtHPveK68hN5amgRijQvNy84Ik+xZlp8KeLAMQ1wlvdh3xMEphaNpLVIqLLMNb0kNTREBwwpAllA24GGQUYuIEvx+66QN+spDFLPGps0NDwopHKAuugjNHQnz0wWXkkIBziMDMBZT0O9HgGheVoLGSJVj6gElcwhOVRP1zeHTzsG9WwnhbMta7tcz1ujxsRQ2H0vigAA')
		format('woff2');
}

.linefont {
	font-family: 'linefont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.linefont-line:before {
	content: '\e600';
}

.zx-title {
	display: flex;
	flex-direction: row;
	padding: 15rpx 0;
	flex: 1;
	align-items: center;
}
</style>

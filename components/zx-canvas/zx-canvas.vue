<template>
	<view>
		<canvas
			:id="canvasId"
			:canvas-id="canvasId"
			:type="type"
			:disable-scroll="disableScroll"
			:hidpi="hidpi"
			:style="{ width: parseInt(width) + 'px', height: parseInt(height) + 'px', backgroundColor: backgroundColor }"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			@touchcancel="touchCancel"
			@longtap="longTap"
			@error="error"
		></canvas>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, watch } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// canvas 组件的唯一标识符
	canvasId: {
		type: String,
		default: 'canvas-id'
	},
	// 指定 canvas 类型，支持 2d 、webgl
	type: {
		type: String,
		default: '2d'
	},
	// 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新
	disableScroll: {
		type: Boolean,
		default: false
	},
	// 是否启用高清处理
	hidpi: {
		type: Boolean,
		default: true
	},
	// 画布宽度
	width: {
		type: [Number, String],
		default: 300
	},
	// 画布高度
	height: {
		type: [Number, String],
		default: 225
	},
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	items: {
		type: Array,
		default: () => {
			return {};
		}
	}
});

const context = ref(null);
const canvasData = ref([]);

onMounted(() => {
	context.value = uni.createCanvasContext(props.canvasId);
	canvasData.value = props.items;
	canvasDraw();
});

watch(canvasData, async (newData, oldData) => {});

/* 手指触摸动作开始 */
const touchStart = (e) => {
	console.log(JSON.stringify(e));
	proxy.$emit('touchStart', e);
};
/* 手指触摸后移动 */
const touchMove = (e) => {
	console.log(JSON.stringify(e));
	proxy.$emit('touchMove', e);
};
/* 手指触摸动作结束 */
const touchEnd = (e) => {
	console.log(JSON.stringify(e));
	proxy.$emit('touchEnd', e);
};
/*
 手指触摸动作被打断，如来电提醒，弹窗
*/
const touchCancel = (e) => {
	console.log(JSON.stringify(e));
	proxy.$emit('touchCancel', e);
};
/*
  手指长按 500ms 之后触发
  触发了长按事件后进行移动不会触发屏幕的滚动
  抖音小程序与飞书小程序不支持
*/
const longTap = (e) => {
	console.log(JSON.stringify(e));
	proxy.$emit('longTap', e);
};
/*
  发生错误时触发
  抖音小程序与飞书小程序不支持
*/
const error = (e) => {
	console.log(JSON.stringify(e));
	proxy.$emit('error', e);
};

const canvasToTempFilePath = () => {
	uni.canvasToTempFilePath({
		canvasId: props.canvasId,
		success: (res) => {
			proxy.$emit('filePath', res.tempFilePath);
		}
	});
};
const canvasDraw = () => {
	canvasData.value.forEach((item, index) => {
		switch (item.type) {
			case 'image':
				drawImage(item.data);
				break;
			case 'avatar':
				drawAvatar(item.data);
				break;
			case 'text':
				drawText(item.data);
				break;
		}
	});
	context.value.draw();
	setTimeout(() => {
		canvasToTempFilePath();
	}, 500);
};
/* 绘制文字
 text: {content,fontSize,align,color,x,y,width,baseline}
 */
const drawText = (text) => {
	if (!text.baseline) {
		text.baseline = 'normal';
	}
	context.value.setTextBaseline(text.baseline);

	if (!text.color) {
		text.color = '#000000';
	}
	context.value.setFillStyle(text.color);

	if (!text.fontSize) {
		text.fontSize = 14;
	}
	context.value.setFontSize(text.fontSize);

	if (!text.align) {
		text.align = 'left';
	}
	context.value.setTextAlign(text.align);

	if (!text.x) {
		text.x = 0;
	}
	if (!text.y) {
		text.y = 0;
	}
	let text_width = context.value.measureText(text.content).width
	console.log(text_width)
	
	context.value.fillText(text.content, text.x, text.y);
};
/*
绘制圆形头像到画布
avatar: {resource,size}
 */
const drawAvatar = (avatar) => {
	if (!avatar.resource) {
		console.log('avatar resource error');
		return;
	}
	if (!avatar.size) {
		avatar.size = 50;
	}
	context.value.save();
	context.value.beginPath();
	context.value.arc(avatar.size * 2, avatar.size * 2, avatar.size, 0, 2 * Math.PI);
	context.value.clip();
	drawImage(avatar);
	//context.value.drawImage(avatar.resource, avatar.size, avatar.size);
	context.value.restore();
};

const drawQrCode = () => {};

/*
绘制图像到画布
image: {resource,x,y,width,height}
 */
const drawImage = (image) => {
	if (!image.resource) {
		console.log('image resource error');
		return;
	}
	if (!image.x) {
		image.x = 0;
	}
	if (!image.y) {
		image.y = 0;
	}
	if (!image.width) {
		image.width = 100;
	}
	if (!image.height) {
		image.height = 100;
	}
	context.value.drawImage(image.resource, image.x, image.y, image.width, image.height);
};
</script>

<style lang="scss" scoped></style>

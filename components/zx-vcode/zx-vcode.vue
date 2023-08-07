<template>
	<canvas class="zx-vcode--box" :canvas-id="canvasId" :id="canvasId"
		:style="{width:width + 'px',height: height + 'px'}" @tap="draw"></canvas>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		computed
	} from 'vue';
	
	const { proxy } = getCurrentInstance();
	
	const props = defineProps({
		//验证码范围字符串
		vcodeStr: {
			type: String,
			default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		},
		//验证码长度
		length: {
			type: [Number, String],
			default: 4,
		},
		//画布宽度
		width: {
			type: [Number, String],
			default: 100,
		},
		//画布高度
		height: {
			type: [Number, String],
			default: 36,
		},
		//画布背景色
		bgColor: {
			type: String,
			default: '',
		},
		//画布字体颜色
		fontColor: {
			type: String,
			default: '',
		},
		//是否显示干扰点
		hasPoint: {
			type: Boolean,
			default: true,
		},
		//是否显示干扰线
		hasLine: {
			type: Boolean,
			default: true
		}
	});

	const ctx = ref(null);
	const canvasId = ref(null);
	canvasId.value = `zx_${Math.ceil(Math.random() * 10e5).toString(36)}`;

	/**
	 * 获取范围内的随机数
	 * @param {Number} min 最小值
	 * @param {Number} max 最大值
	 */
	const randomNum = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min)
	}
	/**
	 * 获取范围内的随机颜色值
	 * @param {Number} min 最小值
	 * @param {Number} max 最大值
	 */
	const randomColor = (min, max) => {
		const _r = randomNum(min, max)
		const _g = randomNum(min, max)
		const _b = randomNum(min, max)
		return `rgb(${_r}, ${_g}, ${_b})`
	}

	const render = (ctx) => {
		let vcode = ''
		if (typeof ctx.setTextBaseline === 'function') {
			ctx.setTextBaseline('bottom')
		}
		let width = Number(props.width)
		let height = Number(props.height)
		// 绘制矩形，并设置填充色
		ctx.setFillStyle(props.bgColor ? props.bgColor : randomColor(180, 240))
		ctx.fillRect(0, 0, width, height)

		let num = Number(props.length) || 4
		// 绘制随机生成 n 位的验证码
		for (let i = 0; i < num; i++) {
			const x = (width - 10) / num * i + 10
			const y = randomNum(height / 2, height)
			const deg = randomNum(-45, 45)
			const txt = props.vcodeStr[randomNum(0, props.vcodeStr.length)]
			const fontSize = randomNum(16, 40)
			const halfHeight = parseInt(height / 2)

			vcode += txt
			ctx.setFillStyle(props.fontColor ? props.fontColor : randomColor(10, 100))
			ctx.setFontSize(fontSize > halfHeight ? halfHeight : fontSize)
			ctx.translate(x, y)
			ctx.rotate(deg * Math.PI / 180)
			ctx.fillText(txt, 0, 0)
			ctx.rotate(-deg * Math.PI / 180)
			ctx.translate(-x, -y)
		}
		// 绘制干扰线
		if (!!props.hasLine) {
			for (let i = 0; i < num; i++) {
				ctx.setStrokeStyle(randomColor(90, 180))
				ctx.beginPath()
				ctx.moveTo(randomNum(0, width), randomNum(0, height))
				ctx.lineTo(randomNum(0, width), randomNum(0, height))
				ctx.stroke()
			}
		}
		// 绘制干扰点
		if (!!props.hasPoint) {
			for (let i = 0; i < num * 10; i++) {
				ctx.setFillStyle(randomColor(0, 255))
				ctx.beginPath()
				ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
				ctx.fill()
			}
		}
		return vcode
	}
	const draw = () => {
		if (!ctx.value) {
			ctx.value = uni.createCanvasContext(canvasId.value)
		}
		ctx.value.clearRect(0, 0, props.width, props.height)
		const value = render(ctx.value)
		ctx.value.draw(false, () => proxy.$emit('change', {
			value
		}))
	}
	
	setTimeout(() => {
		draw();
	}, 300)
	
</script>

<style scoped>

</style>
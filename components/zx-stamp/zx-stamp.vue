<template>
	<view :class="show?'':'stamp'">
		<canvas :style="{width: size+'px',height: size+'px'}" type="2d" :canvas-id="stampId" :id="stampId"></canvas>
	</view>
</template>

<script>
	
export default {
	name: 'my-stamp',
	data() {
		return {

		};
	},
	props: {
		show: {
			type:Boolean,
			default: false
		},
		stampId: {
			type: String,
			default: 'stamp'
		},
		color: {
			type: String,
			default: '#ff0000'
		},
		size: {
			type: Number,
			default: 200
		},
		lineWidth: {
			type: Number,
			default: 5
		},
		companyName: {
			type: String,
			default: '广东XX教育科技有限公司'
		},
		stampName: {
			type: String,
			default: '印章'
		}
	},
	mounted(){
	    this.makeStamp();
		this.getImg();
	},
	methods: {
		makeStamp(){
			let context = uni.createCanvasContext('stamp');
			// 绘制印章边框
			let stampSize = this.size / 2;
			
			context.lineWidth = this.lineWidth;
			context.strokeStyle = this.color;
			context.beginPath();
			context.arc(stampSize, stampSize, 90, 0, Math.PI * 2); //宽、高、半径
			context.stroke();
			
			//画五角星
			this.createStar(context, stampSize, stampSize, 25, this.color, 0);
			
			// 绘制印章名称
			context.font = "16px 宋体";
			context.textBaseline = "middle"; //设置文本的垂直对齐方式
			context.textAlign = "center"; //设置文本的水平对对齐方式
			context.lineWidth = 1;
			context.strokeStyle = this.color;
			context.strokeText(this.stampName, stampSize, stampSize + 60);
			
			// 绘制印章单位
			context.translate(stampSize, stampSize); // 平移到此位置,
			context.font = "23px 宋体";
			let count = this.companyName.length; // 字数
			let angle = (4 * Math.PI) / (3 * (count - 1)); // 字间角度
			let chars = this.companyName.split("");
			let c;
			for (let i = 0; i < count; i++) {
				c = chars[i]; // 需要绘制的字符
				if (i == 0) {
					context.rotate((5 * Math.PI) / 6);
				} else {
					context.rotate(angle);
				}
				context.save();
				context.translate(70, 0); // 平移到此位置,此时字和x轴垂直，公司名称和最外圈的距离
				context.rotate(Math.PI / 2); // 旋转90度,让字平行于x轴
				context.strokeText(c, 0, 0); // 此点为字的中心点
				context.restore();
			}
			context.draw();
		},
		getImg() {
			uni.canvasToTempFilePath({
			  x: 0,
			  y: 0,
			  width: this.size,
			  height: this.size,
			  destWidth: this.size,
			  destHeight: this.size,
			  canvasId: this.stampId,
			  success: (res) => {
			    // 在H5平台下，tempFilePath 为 base64
				this.$emit('getImg', res.tempFilePath);
			  } 
			});
			
		},
		/** 
		 * 绘制五角星 
		 * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上 
		 * rotate:绕对称轴旋转rotate弧度 
		*/
		createStar(context, sx, sy, radius, color, rotato) {
			context.save();
			context.fillStyle = color;
			context.translate(sx, sy); //移动坐标原点
			context.rotate(Math.PI + rotato); //旋转
			context.beginPath(); //创建路径
			// let x = Math.sin(0);
			// let y = Math.cos(0);
			let dig = (Math.PI / 5) * 4;
			for (let i = 0; i < 5; i++) {
				//画五角星的五条边
				let x = Math.sin(i * dig);
				let y = Math.cos(i * dig);
				context.lineTo(x * radius, y * radius);
			}
			context.closePath();
			context.stroke();
			context.fill();
			context.restore();
		}
	}
};
</script>

<style>
	.stamp {
		position: absolute;
		left: 1500rpx;
	}
</style>

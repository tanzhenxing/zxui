<template>
	<view style="display: flex;flex-direction: row;flex-wrap: nowrap;align-items: center;justify-content: center;" :style="{ width: width }">
		<view hover-class="zx-tap" @tap.stop="reduce">
			<zx-icon name="minus-square-fill" color="#999999" size="45rpx"></zx-icon>
		</view>
		<input class="zx-form-input zx-text-center" style="flex: 1;" :class="inputClass" :disabled="disabled" v-model="inputNumber" type="number" @blur="inputval" />
		<view hover-class="zx-tap" @tap.stop="add">
			<zx-icon name="plus-square-fill" color="#999999" size="45rpx"></zx-icon>
		</view>
	</view>
</template>
<script>
export default {
	name: 'zx-step-box',
	props: {
		width: { type: String, default: '150rpx' },
		value: { type: Number, default: 0 },
		step: { type: Number, default: 1 },
		maxNum: { type: Number, default: 9999 },
		minNum: { type: Number, default: 0 },
		buttonClass: {
			type: Array,
			default: function() {
				return ['zx-step-box-button', 'zx-color-gray'];
			}
		},
		inputClass: {
			type: Array,
			default: function() {
				return ['zx-step-box-input', 'zx-border-radius'];
			}
		},
		disabled: { type: Boolean, default: false },
		index: { type: Number, default: 0 },
		datas: {
			type: Array,
			default: function() {
				return [];
			}
		},
		decimal: { type: Number, default: 2 }
	},
	data() {
		return {
			inputNumber: 0,
			callbackNumber: 0
		};
	},
	created: function() {
		this.inputNumber = Number(this.value);
	},
	watch: {
		value: function(val, vo) {
			this.inputNumber = Number(val);
		},
		inputNumber: function(val, vo) {
			if (val == '') {
				return;
			}
			val = Number(val);
			if (isNaN(val)) {
				setTimeout(() => {
					this.inputNumber = Number(vo);
				}, 200);
				return;
			}
			var newVal = this.decimalVal(val);
			if (newVal != val) {
				setTimeout(() => {
					this.inputNumber = Number(newVal);
				}, 200);
				return;
			}
			if (val > this.maxNum) {
				setTimeout(() => {
					this.inputNumber = this.maxNum;
				}, 200);
				return;
			}
			if (val < this.minNum) {
				setTimeout(() => {
					this.inputNumber = this.minNum;
				}, 200);
				return;
			}
		}
	},
	methods: {
		add: function() {
			var newVal = Number(this.inputNumber) + Number(this.step);
			newVal = this.decimalVal(newVal);
			if (newVal > this.maxNum) {
				return;
			}
			this.inputNumber = Number(newVal);
			setTimeout(() => {
				this.$emit('change', [this.inputNumber, this.index, this.datas]);
			}, 300);
		},
		reduce: function() {
			var newVal = Number(this.inputNumber) - Number(this.step);
			newVal = this.decimalVal(newVal);
			if (newVal < this.minNum) {
				return;
			}
			this.inputNumber = newVal;
			setTimeout(() => {
				this.$emit('change', [this.inputNumber, this.index, this.datas]);
			}, 300);
		},
		inputval: function(e) {
			this.inputNumber = e.detail.value;
			setTimeout(() => {
				this.$emit('change', [this.inputNumber, this.index, this.datas]);
			}, 300);
		},
		decimalVal: function(val) {
			var isDecimal = String(val).indexOf('.');
			if (isDecimal != -1) {
				val = val.toFixed(this.decimal);
				var valArr = String(val).split('.');
				if (valArr[1].length > this.decimal) {
					valArr[1] = valArr[1].substr(0, this.decimal);
					val = Number(valArr.join('.'));
				}
			}
			return val;
		}
	},
	emits: ['change']
};
</script>
<style scoped>
.zx-tap {
	opacity: 0.88;
	background-color: #ececec;
}
.zx-block-text,
.zx-block {
	display: block;
}
.zx-text-center {
	text-align: center;
}
.zx-form-input {
	height: 40rpx;
	line-height: 40rpx;
	margin: 25rpx 0;
	background-color: rgba(255, 255, 255, 0);
	border-width: 0px;
	font-size: 28rpx;
}
.zx-step-box-button {
	width: 60rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 38rpx;
}
.zx-step-box-input {
	width: 60rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	margin: 0rpx;
}
.zx-color-gray{color:rgba(69, 90, 100, 0.6) !important;}
</style>

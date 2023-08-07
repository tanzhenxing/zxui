<template>
	<view v-if="show">
		<zx-navbar :bgColor="bgColor" :border="border" :autoBack="autoBack">
			<template v-slot:center>
				<view :style="{ width: 750 - 2 * space + 'rpx' }">
					<zx-text :text="title" :size="size" :bold="bold" :lines="lines" :align="align" :color="color"></zx-text>
				</view>
			</template>
			<template v-slot:right>
				<view :style="{ width: space + 'rpx' }"></view>
			</template>
		</zx-navbar>
	</view>
</template>

<script setup>
import { ref} from 'vue';

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	autoBack: {
		type: Boolean,
		default: true
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	border: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: '#333333'
	},
	size: {
		type: String,
		default: '34rpx'
	},
	bold: {
		type: Boolean,
		default: true
	},
	lines: {
		type: [Number, String],
		default: 1
	},
	align: {
		type: String,
		default: 'left'
	},
	space: {
		type: Number,
		default: 30
	}
});

</script>

<style lang="scss" scoped>
	
</style>

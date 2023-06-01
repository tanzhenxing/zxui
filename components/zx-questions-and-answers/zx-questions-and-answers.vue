<template>
	<view style="padding: 10rpx 30rpx;">
		<view v-for="(item, index) in items" :key="index">
			<view style="display: flex;flex-direction: column;">
				<!-- 题目 -->
				<view style="text-align: justify;font-size: 32rpx;">
					<text>{{ (index + 1) + '. ' + item.title }}</text>
					<text v-if="item.type === 0" style="font-weight: bold;">[多选题]</text>
					<text v-if="item.type === 1" style="font-weight: bold;">[判断题]</text>
					<text v-if="item.type === 2" style="font-weight: bold;">[单选题]</text>
					<text v-if="show" style="margin-left: 40rpx;" :style="item.correct ? { color: '#4bb368' } : { color: '#ff0000' }">({{ item.correct ? '正确' : '错误' }})</text>
				</view>
				<!-- 多选题 -->
				<view v-if="item.type === 0">
					<checkbox-group :name="'option' + item.id" @change="checkboxChange" :data-index="index">
						<label class="answer-label" v-for="(answer, answer_index) in item.option" :key="answer_index">
							<checkbox color="#008AFF" :value="(answer_index + 1).toString()"></checkbox>
							<text class="gui-text" :class="answer.class">{{ letters[answer_index] }}. {{ answer.content }}</text>
						</label>
					</checkbox-group>
				</view>
				<!-- 单选题/判断题 -->
				<view v-if="item.type === 1 || item.type === 2">
					<radio-group :name="'option' + item.id" :data-index="index" @change="checkboxChange">
						<label style="display: flex;flex-direction: row;padding-top: 10rpx;padding-bottom: 10rpx;align-items: center;" v-for="(answer, answer_index) in item.option" :key="answer_index">
							<radio color="#008AFF" :value="(answer_index + 1).toString()"></radio>
							<zx-text :color="(answer.correct && show)?'#4bb368':''" :text="letters[answer_index]+'.'+answer.content"></zx-text>
						</label>
					</radio-group>
					<zx-line style="margin-top: 20rpx;margin-bottom: 20rpx;"></zx-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	items: {
		type: Array,
		default: function() {
			return [];
		}
	},
	show: {
		type: Boolean,
		default: false
	}
});

const letters = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']);

const checkboxChange = e => {
	let result = null;
	if(typeof e.detail.value==='string'){
		result = parseInt(e.detail.value);
	}
	if(typeof e.detail.value==='object'){
		let arr = [];
		e.detail.value.forEach(item=>{
			arr.push(parseInt(item))
		});
		result = arr;
	}
	props.items[e.target.dataset.index].value = result;
};
</script>

<style scoped>
.answer-red {
	color: #ff0000;
}
.answer-green {
	color: #4bb368;
}
.answer-correct {
	color: #4bb368;
}
.answer-label {
	display: flex;flex-direction: row;padding-top: 10rpx;padding-bottom: 10rpx;align-items: center;
}
</style>

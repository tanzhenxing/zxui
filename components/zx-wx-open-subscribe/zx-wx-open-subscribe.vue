<template>
	<view>
		<wx-open-subscribe :id="id" :template="template">
			<script v-is="script" type="text/wxtag-template" slot="default">
			  <button class="subscribe-btn">
			    一次性模版消息订阅              
			  </button>
			</script>
			<script v-is="script" type="text/wxtag-template" slot="style">
			  <style>
			    .subscribe-btn {
			      color: #fff;
			      background-color: #07c160;
			    }
			  </style>
			</script>
		</wx-open-subscribe>
	</view>
</template>

<script setup>
import {ref,getCurrentInstance} from 'vue'

const {proxy}=getCurrentInstance()

const props = defineProps({
	id: {
		type: String,
		default: 'subscribe'
	},
	template: {
		type: String,
		default: ''
	}
})
</script>

<style>

</style>
<template>
	<view>
		<wx-open-launch-app :id="id" :appid="appid" :extinfo="extinfo">
		  <script v-is="script" type="text/wxtag-template">
		    <style>.btn { padding: 12px }</style>
		    <button class="btn">App内查看</button>
		  </script>
		</wx-open-launch-app>
	</view>
</template>

<script setup>
import {ref,getCurrentInstance} from 'vue'

const {proxy}=getCurrentInstance()

const props = defineProps({
	id: {
		type: String,
		default: 'launch-app'
	},
	appid: {
		type: String,
		default: ''
	},
	extinfo: {
		type: String,
		default: ''
	}
})
</script>

<style>

</style>
<template>
	<view>
		<wx-open-launch-weapp :id="id" :appid="appid" :path="path">
		  <script v-is="script" type="text/wxtag-template" slot="default">
			  <button class="btn">打开小程序</button>
		  </script>
		  <script v-is="script" type="text/wxtag-template" slot="style">
			  <style v-is="style">.btn { padding: 18px }</style>
		  </script>
		</wx-open-launch-weapp>
	</view>
</template>

<script setup>
import {ref,getCurrentInstance} from 'vue'

const {proxy}=getCurrentInstance()

const props = defineProps({
	id: {
		type: String,
		default: 'launch-weapp'
	},
	appid: {
		type: String,
		default: ''
	},
	path: {
		type: String,
		default: ''
	}
})
</script>

<style>

</style>
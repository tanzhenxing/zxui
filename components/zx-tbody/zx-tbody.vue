<template>
	<!-- #ifdef H5 -->
	<tbody>
		<slot></slot>
	</tbody>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view><slot></slot></view>
	<!-- #endif -->
</template>

<script setup>
import {ref} from 'vue'

</script>

<style>
</style>

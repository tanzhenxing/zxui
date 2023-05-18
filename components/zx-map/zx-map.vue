<template>
	<view class="map-box">
		<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
			<view style="width: 30rpx;"><view style="width: 10rpx;height: 10rpx;background-color: #ff0000;"></view></view>
			<view style="flex: 1;"><zx-text :text="'联系电话：' + mapData.phone" size="32rpx" color="#313131"></zx-text></view>
		</view>
		<view style="display: flex;flex-direction: row;justify-content: center;">
			<view style="width: 30rpx;margin-top: 20rpx;"><view style="width: 10rpx;height: 10rpx;background-color: #ff0000;"></view></view>
			<view style="flex: 1;"><zx-text :text="'地址：' + mapData.address" size="32rpx" color="#313131"></zx-text></view>
		</view>
		<view style="margin-top: 20rpx;">
			<map
				style="width: 100%; height: 350rpx;"
				:latitude="getLatitude"
				:scale="15"
				:longitude="getLongitude"
				:show-location="false"
				:markers="covers"
				:enable-zoom="false"
				:enable-scroll="false"
				@tap="mapTap"
			></map>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
import {encode} from '@tanzhenxing/zxui/libs/js/base64.js';

const { proxy } = getCurrentInstance();

const covers = ref([
	{
		id: 1,
		title: '',
		label: { content: '', color: '#333333', padding: 5, anchorX: 20, anchorY: -35, fontSize: 18, textAlign: 'center' },
		alpha: 0.5,
		iconPath: 'https://files.wufu-app.com/images/other/map.png',
		width: 35,
		height: 35,
		latitude: 0,
		longitude: 0
	}
]);

const props = defineProps({
	mapKey: {
		type: String,
		default: ''
	},
	mapData: {
		type: Object,
		default: () => {
			return {};
		}
	}
});


const getMapData = () => {
	if (props.mapData.logo !== '') {
		covers.value[0].iconPath = props.mapData.logo;
	}
	covers.value[0].title = props.mapData.name;
	covers.value[0].label.content = props.mapData.name;

	if (props.mapData.latitude === 0 || props.mapData.longitude === 0) {
		mapInfo();
	} else {
		covers.value.forEach(item => {
			item.latitude = props.mapData.latitude;
			item.longitude = props.mapData.longitude;
		});
	}
};


const mapTap = () => {
	let marker = 'coord:' + getLatitude.value + ',' + getLongitude.value + ';title:' + props.mapData.name + ';addr:' + props.mapData.address;
	marker = encodeURIComponent(marker);
	let marker_base64 = encode(marker);
	marker_base64 = marker_base64.replace('==','@@').replace('=','@');

	let url = 'https://apis.map.qq.com/tools/poimarker?type=0&referer=myapp&marker=' + marker_base64;
	let url_base64 = encode(url);
	url_base64 = url_base64.replace('==','@@').replace('=','@');
	
	// #ifdef H5
	uni.navigateTo({
		url: '/pages/package02/map/index?url=' + url_base64
	});
	// #endif
	
};

const mapInfo = async () => {
	const geocoder = uniCloud.importObject('geocoder');
	try {
		const res = await geocoder.get(props.mapData.address);
		this.covers.forEach(item => {
			item.latitude = res.data.result.location.lat;
			item.longitude = res.data.result.location.lng;
		});
		console.log('covers:' + JSON.stringify(covers));
	} catch (e) {
		console.log(JSON.stringify(e))
	}
};

const getLatitude = computed(() => {
	let latitude = 0;
	if (props.mapData.latitude > 0) {
		latitude = props.mapData.latitude;
	}
	return latitude;
});

const getLongitude = computed(() => {
	let longitude = 0;
	if (props.mapData.longitude > 0) {
		longitude = props.mapData.longitude;
	}
	return longitude;
});

// 读取地图信息
getMapData();

</script>

<style lang="scss">
.map-box {
	padding: 30rpx;
	font-size: 30rpx;
	line-height: 50rpx;
	text-align: justify;
}
</style>

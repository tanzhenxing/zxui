## 说明
#### zxUI是一套基于Vue.js开发的uni-app跨平台UI框架，提供了丰富的组件、布局及界面库，可以显著的提升您的前端布局速度。
#### 实现开发一套代码，可以发布到14个平台，iOS、Android、H5、微信小程序等各种小程序。
#### 自发布以来，我们是一线开发者，深度地参与项目开发，一直快速更新迭代，框架已经非常稳定。
#### [https://zxui.org/](https://zxui.org/)

## 安装
npm install @tanzhenxing/zxui

## 自动加载
打开pages.json文件，增加easycom 自动加载

"easycom": {
	"autoscan" : true,
	"custom": {
		"^zx-(.*)": "@tanzhenxing/zxui/components/zx-$1/zx-$1.vue"
	}
}



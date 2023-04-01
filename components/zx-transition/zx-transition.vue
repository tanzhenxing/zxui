<template>
	<view v-if="inited" class="zx-transition" ref="zx-transition" :class="classes" :style="[mergeStyle]" @tap="clickHandler" @touchmove="noop">
		<slot />
	</view>
</template>

<script>
	// 定义一个一定时间后自动成功的promise，让调用nextTick方法处，进入下一个then方法
	const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 50))
	// nvue动画模块实现细节
	const animationMap = {
	    fade: {
	        enter: { opacity: 0 },
	        'enter-to': { opacity: 1 },
	        leave: { opacity: 1 },
	        'leave-to': { opacity: 0 }
	    },
	    'fade-up': {
	        enter: { opacity: 0, transform: 'translateY(100%)' },
	        'enter-to': { opacity: 1, transform: 'translateY(0)' },
	        leave: { opacity: 1, transform: 'translateY(0)' },
	        'leave-to': { opacity: 0, transform: 'translateY(100%)' }
	    },
	    'fade-down': {
	        enter: { opacity: 0, transform: 'translateY(-100%)' },
	        'enter-to': { opacity: 1, transform: 'translateY(0)' },
	        leave: { opacity: 1, transform: 'translateY(0)' },
	        'leave-to': { opacity: 0, transform: 'translateY(-100%)' }
	    },
	    'fade-left': {
	        enter: { opacity: 0, transform: 'translateX(-100%)' },
	        'enter-to': { opacity: 1, transform: 'translateY(0)' },
	        leave: { opacity: 1, transform: 'translateY(0)' },
	        'leave-to': { opacity: 0, transform: 'translateX(-100%)' }
	    },
	    'fade-right': {
	        enter: { opacity: 0, transform: 'translateX(100%)' },
	        'enter-to': { opacity: 1, transform: 'translateY(0)' },
	        leave: { opacity: 1, transform: 'translateY(0)' },
	        'leave-to': { opacity: 0, transform: 'translateX(100%)' }
	    },
	    'slide-up': {
	        enter: { transform: 'translateY(100%)' },
	        'enter-to': { transform: 'translateY(0)' },
	        leave: { transform: 'translateY(0)' },
	        'leave-to': { transform: 'translateY(100%)' }
	    },
	    'slide-down': {
	        enter: { transform: 'translateY(-100%)' },
	        'enter-to': { transform: 'translateY(0)' },
	        leave: { transform: 'translateY(0)' },
	        'leave-to': { transform: 'translateY(-100%)' }
	    },
	    'slide-left': {
	        enter: { transform: 'translateX(-100%)' },
	        'enter-to': { transform: 'translateY(0)' },
	        leave: { transform: 'translateY(0)' },
	        'leave-to': { transform: 'translateX(-100%)' }
	    },
	    'slide-right': {
	        enter: { transform: 'translateX(100%)' },
	        'enter-to': { transform: 'translateY(0)' },
	        leave: { transform: 'translateY(0)' },
	        'leave-to': { transform: 'translateX(100%)' }
	    },
	    zoom: {
	        enter: { transform: 'scale(0.95)' },
	        'enter-to': { transform: 'scale(1)' },
	        leave: { transform: 'scale(1)' },
	        'leave-to': { transform: 'scale(0.95)' }
	    },
	    'fade-zoom': {
	        enter: { opacity: 0, transform: 'scale(0.95)' },
	        'enter-to': { opacity: 1, transform: 'scale(1)' },
	        leave: { opacity: 1, transform: 'scale(1)' },
	        'leave-to': { opacity: 0, transform: 'scale(0.95)' }
	    }
	}
	
	// #ifndef APP-NVUE
	// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
	const getClassNames = (name) => ({
	    enter: `zx-${name}-enter zx-${name}-enter-active`,
	    'enter-to': `zx-${name}-enter-to zx-${name}-enter-active`,
	    leave: `zx-${name}-leave zx-${name}-leave-active`,
	    'leave-to': `zx-${name}-leave-to zx-${name}-leave-active`
	})
	// #endif
	
	// #ifdef APP-NVUE
	// 引入nvue(weex)的animation动画模块，文档见：
	// https://weex.apache.org/zh/docs/modules/animation.html#transition
	const animation = uni.requireNativePlugin('animation')
	const getStyle = (name) => animationMap[name]
	// #endif
	

/**
 * transition  动画组件
 * @description
 * @tutorial
 * @property {String}			show			是否展示组件 （默认 false ）
 * @property {String}			mode			使用的动画模式 （默认 'fade' ）
 * @property {String | Number}	duration		动画的执行时间，单位ms （默认 '300' ）
 * @property {String}			timingFunction	使用的动画过渡函数 （默认 'ease-out' ）
 * @property {Object}			customStyle		自定义样式
 * @event {Function}            before-enter	进入前触发
 * @event {Function}            enter			进入中触发
 * @event {Function}            after-enter	    进入后触发
 * @event {Function}            before-leave	离开前触发
 * @event {Function}            leave			离开中触发
 * @event {Function}            after-leave	    离开后触发
 * @example
 */
export default {
	name: 'zx-transition',
	data() {
		return {
			inited: false, // 是否显示/隐藏组件
			viewStyle: {}, // 组件内部的样式
			status: '', // 记录组件动画的状态
			transitionEnded: false, // 组件是否结束的标记
			display: false, // 组件是否展示
			classes: '' // 应用的类名
		};
	},
	props: {
		// 是否展示组件
		show: {
			type: Boolean,
			default: false
		},
		// 使用的动画模式
		mode: {
			type: String,
			default: 'fade'
		},
		// 动画的执行时间，单位ms
		duration: {
			type: [String, Number],
			default: 500
		},
		// 使用的动画过渡函数
		timingFunction: {
			type: String,
			default: 'ease-out'
		},
		customStyle: {
			type: Object,
			default: function(){
				return {};
			}
		}
	},
	computed: {
		mergeStyle() {
			const { viewStyle, customStyle } = this;
			return {
				// #ifndef APP-NVUE
				transitionDuration: `${this.duration}ms`,
				// display: `${this.display ? '' : 'none'}`,
				transitionTimingFunction: this.timingFunction,
				// #endif
				// 避免自定义样式影响到动画属性，所以写在viewStyle前面
				...customStyle,
				...viewStyle
			};
		}
	},
	watch: {
		show: {
			handler(newVal) {
				// vue和nvue分别执行不同的方法
				// #ifdef APP-NVUE
				newVal ? this.nvueEnter() : this.nvueLeave();
				// #endif
				// #ifndef APP-NVUE
				newVal ? this.vueEnter() : this.vueLeave();
				// #endif
			},
			// 表示同时监听初始化时的props的show的意思
			immediate: true
		}
	},
	methods: {
	    // 组件被点击发出事件
	    clickHandler() {
	        this.$emit('click')
	    },
	    // #ifndef APP-NVUE
	    // vue版本的组件进场处理
	     vueEnter() {
	        // 动画进入时的类名
	        const classNames = getClassNames(this.mode)
	        // 定义状态和发出动画进入前事件
	        this.status = 'enter'
	        this.$emit('beforeEnter')
	        this.inited = true
	        this.display = true
	        this.classes = classNames.enter
	        this.$nextTick(async () => {
				// #ifdef H5
				await this.sleep(20)
				// #endif
	            // 标识动画尚未结束
	            this.$emit('enter')
	            this.transitionEnded = false
				// 组件动画进入后触发的事件
	            this.$emit('afterEnter')
	            // 赋予组件enter-to类名
	            this.classes = classNames['enter-to']
	        })
	    },
	    // 动画离场处理
	    vueLeave() {
	        // 如果不是展示状态，无需执行逻辑
	        if (!this.display) return
	        const classNames = getClassNames(this.mode)
	        // 标记离开状态和发出事件
	        this.status = 'leave'
	        this.$emit('beforeLeave')
	        // 获得类名
	        this.classes = classNames.leave
	
	        this.$nextTick(() => {
	           // 动画正在离场的状态
	           this.transitionEnded = false
	           this.$emit('leave')
	            // 组件执行动画，到了执行的执行时间后，执行一些额外处理
	            setTimeout(this.onTransitionEnd, this.duration)
	            this.classes = classNames['leave-to']
	        })
	    },
	    // #endif
	    // #ifdef APP-NVUE
	    // nvue版本动画进场
	    nvueEnter() {
	        // 获得样式的名称
	        const currentStyle = getStyle(this.mode)
	        // 组件动画状态和发出事件
	        this.status = 'enter'
	        this.$emit('beforeEnter')
	        // 展示生成组件元素
	        this.inited = true
	        this.display = true
	        // 在nvue安卓上，由于渲染速度慢，在弹窗，键盘，日历等组件中，渲染其中的内容需要时间
	        // 导致出现弹窗卡顿，这里让其一开始为透明状态，等一定时间渲染完成后，再让其隐藏起来，再让其按正常逻辑出现
	        this.viewStyle = {
	            opacity: 0
	        }
	        // 等待弹窗内容渲染完成
	        this.$nextTick(() => {
	            // 合并样式
	            this.viewStyle = currentStyle.enter
	            Promise.resolve()
	                .then(nextTick)
	                .then(() => {
	                    // 组件开始进入前的事件
	                    this.$emit('enter')
	                    // nvue的transition动画模块需要通过ref调用组件，注意此处的ref不同于vue的this.$refs['zx-transition']用法
	                    animation.transition(this.$refs['zx-transition'].ref, {
	                        styles: currentStyle['enter-to'],
	                        duration: this.duration,
	                        timingFunction: this.timingFunction,
	                        needLayout: false,
	                        delay: 0
	                    }, () => {
	                        // 动画执行完毕，发出事件
	                        this.$emit('afterEnter')
	                    })
	                })
	                .catch(() => {})
	        })
	    },
	    nvueLeave() {
	        if (!this.display) {
	            return
	        }
	        const currentStyle = getStyle(this.mode)
	        // 定义状态和事件
	        this.status = 'leave'
	        this.$emit('beforeLeave')
	        // 合并样式
	        this.viewStyle = currentStyle.leave
	        // 放到promise中处理执行过程
	        Promise.resolve()
	            .then(nextTick) // 等待几十ms
	            .then(() => {
	                this.transitionEnded = false
	                // 动画正在离场的状态
	                this.$emit('leave')
	                animation.transition(this.$refs['zx-transition'].ref, {
	                    styles: currentStyle['leave-to'],
	                    duration: this.duration,
	                    timingFunction: this.timingFunction,
	                    needLayout: false,
	                    delay: 0
	                }, () => {
	                    this.onTransitionEnd()
	                })
	            })
	            .catch(() => {})
	    },
	    // #endif
	    // 完成过渡后触发
	    onTransitionEnd() {
	        // 如果已经是结束的状态，无需再处理
	        if (this.transitionEnded) return
	        this.transitionEnded = true
	        // 发出组件动画执行后的事件
	        this.$emit(this.status === 'leave' ? 'afterLeave' : 'afterEnter')
	        if (!this.show && this.display) {
	            this.display = false
	            this.inited = false
	        }
	    },
		sleep(value = 30) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve()
				}, value)
			})
		},
		noop(){
			
		}
	}
};
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
// vue版本动画相关的样式抽离在外部文件
/**
 * vue版本动画内置的动画模式有如下：
 * fade：淡入
 * zoom：缩放
 * fade-zoom：缩放淡入
 * fade-up：上滑淡入
 * fade-down：下滑淡入
 * fade-left：左滑淡入
 * fade-right：右滑淡入
 * slide-up：上滑进入
 * slide-down：下滑进入
 * slide-left：左滑进入
 * slide-right：右滑进入
 */

.zx-fade-enter-active,
.zx-fade-leave-active {
	transition-property: opacity;
}

.zx-fade-enter,
.zx-fade-leave-to {
	opacity: 0
}

.zx-fade-zoom-enter,
.zx-fade-zoom-leave-to {
	transform: scale(0.95);
	opacity: 0;
}

.zx-fade-zoom-enter-active,
.zx-fade-zoom-leave-active {
	transition-property: transform, opacity;
}

.zx-fade-down-enter-active,
.zx-fade-down-leave-active,
.zx-fade-left-enter-active,
.zx-fade-left-leave-active,
.zx-fade-right-enter-active,
.zx-fade-right-leave-active,
.zx-fade-up-enter-active,
.zx-fade-up-leave-active {
	transition-property: opacity, transform;
}

.zx-fade-up-enter,
.zx-fade-up-leave-to {
	transform: translate3d(0, 100%, 0);
	opacity: 0
}

.zx-fade-down-enter,
.zx-fade-down-leave-to {
	transform: translate3d(0, -100%, 0);
	opacity: 0
}

.zx-fade-left-enter,
.zx-fade-left-leave-to {
	transform: translate3d(-100%, 0, 0);
	opacity: 0
}

.zx-fade-right-enter,
.zx-fade-right-leave-to {
	transform: translate3d(100%, 0, 0);
	opacity: 0
}

.zx-slide-down-enter-active,
.zx-slide-down-leave-active,
.zx-slide-left-enter-active,
.zx-slide-left-leave-active,
.zx-slide-right-enter-active,
.zx-slide-right-leave-active,
.zx-slide-up-enter-active,
.zx-slide-up-leave-active {
	transition-property: transform;
}

.zx-slide-up-enter,
.zx-slide-up-leave-to {
	transform: translate3d(0, 100%, 0)
}

.zx-slide-down-enter,
.zx-slide-down-leave-to {
	transform: translate3d(0, -100%, 0)
}

.zx-slide-left-enter,
.zx-slide-left-leave-to {
	transform: translate3d(-100%, 0, 0)
}

.zx-slide-right-enter,
.zx-slide-right-leave-to {
	transform: translate3d(100%, 0, 0)
}

.zx-zoom-enter-active,
.zx-zoom-leave-active {
	transition-property: transform
}

.zx-zoom-enter,
.zx-zoom-leave-to {
	transform: scale(0.95)
}
/* #endif */

.zx-transition {
}
</style>
